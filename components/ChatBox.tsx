"use client";
import { useEffect, useRef, useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import { Mascot } from "./Illustrations";

type M = { role: "user" | "assistant"; content: string };

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent animate-blink"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
        />
      ))}
    </span>
  );
}

export default function ChatBox({ height = "h-[62vh]" }: { height?: string }) {
  const [msgs, setMsgs] = useState<M[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs]);

  async function send() {
    const t = input.trim();
    if (!t || busy) return;
    const next: M[] = [...msgs, { role: "user", content: t }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!r.ok || !r.body) {
        const msg = await r.text();
        setMsgs([...next, { role: "assistant", content: msg || "Model AI sedang sibuk. Coba lagi sebentar lagi." }]);
        setBusy(false);
        return;
      }
      const rd = r.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await rd.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setMsgs([
        ...next,
        {
          role: "assistant",
          content: "Gagal menghubungi layanan AI. Periksa koneksi lalu coba lagi.",
        },
      ]);
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className={`${height} space-y-4 overflow-y-auto rounded-2xl border border-line bg-surface p-4 shadow-warm`} aria-live="polite">
        {msgs.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <Mascot size={64} />
            <p className="max-w-xs text-dim">
              Halo! Aku Nexi, pemandu belajarmu. Tanyakan apa saja soal jaringan, server, atau keamanan.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Apa beda switch dan router?", "Jelaskan subnetting /26", "Cara cek service Linux?"].map((s) => (
                <button key={s} className="chip hover:border-accent hover:text-ink" onClick={() => setInput(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((m, i) => {
          const isUser = m.role === "user";
          const empty = !isUser && m.content === "" && busy && i === msgs.length - 1;
          return (
            <div key={i} className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
              {!isUser && (
                <span className="mb-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface2">
                  <Mascot size={24} />
                </span>
              )}
              <div
                className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 ${
                  isUser
                    ? "rounded-br-md bg-maroon text-white"
                    : "rounded-bl-md border border-line bg-surface2 text-ink"
                }`}
              >
                {empty ? <TypingDots /> : m.content}
                {!isUser && m.content === "" && !busy && (
                  <span className="inline-flex items-center gap-1 text-dim">
                    <AlertCircle size={14} /> Tidak ada balasan.
                  </span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={end} />
      </div>

      <div className="flex gap-2">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Tulis pertanyaan…"
          aria-label="Pertanyaan untuk AI"
        />
        <button className="btn" onClick={send} disabled={busy} aria-label="Kirim">
          <Send size={18} />
          <span className="hidden sm:inline">Kirim</span>
        </button>
      </div>
    </div>
  );
}
