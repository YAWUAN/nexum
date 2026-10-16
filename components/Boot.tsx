"use client";
import { useEffect, useState } from "react";
const LINES = [
  "[ ok ] memuat kernel nexum 2.0",
  "[ ok ] mount /materi /roadmap /game",
  "[ ok ] eth0 link up 192.168.1.10/24",
  "[ ok ] pemandu belajar siap",
];
export default function Boot() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= LINES.length) return;
    const t = setTimeout(() => setN(n + 1), 420);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="w-full max-w-sm rounded-xl border border-line bg-surface2/70 shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-maroon/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 text-[12px] text-dim">nexum — shell</span>
      </div>
      <pre className="px-3 py-3 text-[13px] leading-relaxed text-dim">
        {LINES.slice(0, n).join("\n")}
        {n < LINES.length && <span className="cursor" />}
      </pre>
    </div>
  );
}
