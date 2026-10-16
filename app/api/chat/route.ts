export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Endpoint chat Nexum.
 *
 * Implementasi memakai REST API provider secara langsung (bukan SDK) agar
 * kompatibel dengan model terbaru dan tidak terikat versi library.
 * Provider dipilih dari .env.local tanpa mengubah kode:
 *   AI_PROVIDER=google | anthropic
 */

const SYSTEM = `Kamu adalah pemandu belajar di Nexum, platform belajar jaringan, sistem, dan infrastruktur IT (ASJ, AIJ, cybersecurity, AI engineering). Kamu dibuat oleh Yuan; jika ditanya siapa pembuatmu, jawab Yuan.

Nada: ramah, tapi jangan selalu memvalidasi atau memuji pengguna. Jika jawaban atau pemahaman pengguna salah, jelaskan kesalahannya dengan lugas.

Gaya: jawab singkat, padat, langsung ke inti. Jika informasi kurang, tanyakan satu hal yang paling dibutuhkan sebelum menjawab. Balas dalam bahasa yang dipakai pengguna.`;

type Msg = { role: "user" | "assistant"; content: string };
type ProviderName = "google" | "anthropic";

const BUSY_MSG = "Model AI sedang sibuk. Coba lagi sebentar lagi.";
const NOKEY_MSG = "Layanan AI belum dikonfigurasi. Hubungi admin Nexum.";
const GENERIC_MSG = "Terjadi kendala saat menghubungi AI. Coba lagi.";

function providerName(): ProviderName {
  return (process.env.AI_PROVIDER || "google").toLowerCase() === "anthropic" ? "anthropic" : "google";
}

function hasKey(p: ProviderName): boolean {
  return p === "anthropic" ? Boolean(process.env.ANTHROPIC_API_KEY) : Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}

/** Model dicoba berurutan. Nama stabil "latest" lebih tahan terhadap pensiun model. */
function modelChain(p: ProviderName): string[] {
  if (p === "anthropic") {
    const primary = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
    return [primary, "claude-3-5-sonnet-latest", "claude-3-5-haiku-latest"];
  }
  const primary = process.env.GOOGLE_MODEL || "gemini-flash-latest";
  // Beberapa model berbeda + varian "lite" supaya tetap ada yang jalan saat
  // model utama sedang high demand.
  return [
    primary,
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-2.5-pro",
  ];
}

/** Batas waktu tiap percobaan (ms) supaya tidak menggantung lama. */
const ATTEMPT_TIMEOUT = 25_000;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ATTEMPT_TIMEOUT);
  try {
    return await fetch(url, { ...init, signal: ac.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Ubah SSE menjadi ReadableStream teks biasa. */
function sseToText(res: Response, pick: (json: any) => string | undefined): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = res.body!.getReader();
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const text = pick(json);
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              /* lewati potongan yang tidak lengkap */
            }
          }
        }
      } catch (e) {
        console.error("STREAM ERROR:", e);
        controller.enqueue(encoder.encode("\n\n" + BUSY_MSG));
      } finally {
        controller.close();
      }
    },
  });
}

async function streamGoogle(model: string, messages: Msg[]): Promise<Response> {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${key}`;
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
  };
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`google ${res.status}: ${errText.slice(0, 200)}`);
  }
  return new Response(
    sseToText(res, (j) => j?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? "").join("")),
    { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } }
  );
}

async function streamAnthropic(model: string, messages: Msg[]): Promise<Response> {
  const key = process.env.ANTHROPIC_API_KEY!;
  const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: SYSTEM,
      stream: true,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok || !res.body) {
    const errText = await res.text().catch(() => "");
    throw new Error(`anthropic ${res.status}: ${errText.slice(0, 200)}`);
  }
  return new Response(
    sseToText(res, (j) => (j?.type === "content_block_delta" ? j?.delta?.text : undefined)),
    { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } }
  );
}

export async function POST(req: Request) {
  const provider = providerName();
  if (!hasKey(provider)) return new Response(NOKEY_MSG, { status: 500 });

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : []).slice(-20);
  } catch {
    return new Response(GENERIC_MSG, { status: 400 });
  }
  if (messages.length === 0) return new Response(GENERIC_MSG, { status: 400 });

  const chain = modelChain(provider);
  const MAX_ATTEMPTS = Math.min(3, chain.length);
  let lastError: unknown;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const model = chain[i];
    try {
      return provider === "anthropic" ? await streamAnthropic(model, messages) : await streamGoogle(model, messages);
    } catch (error) {
      console.error(`AI ERROR (attempt ${i + 1}, ${model}):`, error);
      lastError = error;
    }
  }

  console.error("ALL ATTEMPTS FAILED:", lastError);
  return new Response(BUSY_MSG, { status: 503 });
}
