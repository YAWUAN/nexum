"use client";
import { useEffect, useRef, useState } from "react";

const FS: Record<string, string[]> = {
  "/": ["materi", "roadmap", "game", "contact"],
  "/materi": ["asj", "aij"],
  "/roadmap": ["network", "cybersecurity", "ai"],
  "/game": ["flashcard", "port-match"],
  "/contact": ["email.txt"],
};
const CMDS = ["help", "?", "whoami", "ip", "about", "ls", "cd", "contact", "clear"];
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ganti@email.kamu";

export default function Terminal() {
  const [out, setOut] = useState<string[]>(["Nexum shell 2.0 — ketik 'help' untuk daftar perintah."]);
  const [cwd, setCwd] = useState("/");
  const [inp, setInp] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView();
  }, [out]);

  function norm(p: string) {
    if (p === "/" || p === "~") return "/";
    if (p === "..") return cwd.split("/").slice(0, -1).join("/") || "/";
    return p.startsWith("/") ? p : (cwd === "/" ? "" : cwd) + "/" + p;
  }

  function run(raw: string): string[] {
    const [c, ...a] = raw.trim().split(/\s+/);
    const line = (s: string) => s.split("\n");
    switch (c) {
      case "help":
      case "?":
        return line(
          "help, ?     daftar perintah\nwhoami      siapa kamu di sini\nip a        info antarmuka jaringan\nabout       tentang Nexum\nls, cd      jelajahi direktori\ncontact     kontak Yuan\nclear       bersihkan layar"
        );
      case "whoami":
        return ["guest@nexum"];
      case "ip":
        return a[0] === "a"
          ? line("1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP> inet 192.168.1.10/24 brd 192.168.1.255")
          : ["Pemakaian: ip a"];
      case "about":
        return ["Nexum: platform belajar jaringan, sistem, dan infrastruktur IT. Dibuat oleh Yuan."];
      case "ls":
        return [(FS[a[0] ? norm(a[0]) : cwd] ?? []).join("  ") || "(kosong)"];
      case "cd": {
        const t = norm(a[0] ?? "/");
        if (FS[t]) {
          setCwd(t);
          return [];
        }
        return [`cd: ${a[0]}: direktori tidak ditemukan`];
      }
      case "contact":
        return [`Email: ${EMAIL}`];
      default:
        return [`${c}: perintah tidak dikenal. Ketik 'help'.`];
    }
  }

  function submit() {
    const t = inp.trim();
    setInp("");
    setHi(-1);
    if (!t) return;
    setHist([t, ...hist]);
    if (t === "clear") return setOut([]);
    setOut((o) => [...o, `${cwd}$ ${t}`, ...run(t)]);
  }

  function key(e: React.KeyboardEvent) {
    if (e.key === "Enter") submit();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hi + 1, hist.length - 1);
      setHi(i);
      setInp(hist[i] ?? inp);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hi - 1;
      setHi(i);
      setInp(i >= 0 ? hist[i] : "");
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const m = CMDS.filter((c) => c.startsWith(inp));
      if (m.length === 1) setInp(m[0] + " ");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-warm">
      {/* Title bar gaya jendela aplikasi */}
      <div className="flex items-center gap-2 border-b border-line bg-surface2 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-accent/80" />
        <span className="h-3 w-3 rounded-full bg-maroon/60" />
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="ml-2 text-label text-dim">guest@nexum: {cwd}</span>
      </div>
      <div
        className="h-[58vh] overflow-y-auto bg-bg px-4 py-3 font-mono text-[15px] leading-relaxed"
        onClick={() => document.getElementById("term-in")?.focus()}
      >
        {out.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap text-ink">
            {l}
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-accent">{cwd}$</span>
          <input
            id="term-in"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-label="Perintah terminal"
            className="flex-1 bg-transparent text-ink outline-none"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={key}
          />
        </div>
        <div ref={end} />
      </div>
    </div>
  );
}
