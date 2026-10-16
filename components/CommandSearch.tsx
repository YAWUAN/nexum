"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { PAGES } from "./TopBar";

export default function CommandSearch({ index }: { index: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const r = useRouter();

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQ("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const all = [
    ...PAGES.map((p) => ({ label: `Halaman · ${p.label}`, href: p.href })),
    ...index,
  ];
  const res = q
    ? all.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
    : all.slice(0, 6);
  const go = (h: string) => {
    setOpen(false);
    r.push(h);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Pencarian"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-warm-lg"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <SearchIcon size={18} className="text-dim" />
              <input
                autoFocus
                className="w-full bg-transparent text-ink outline-none placeholder:text-dim"
                placeholder="Cari halaman atau bab…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && res[0] && go(res[0].href)}
                aria-label="Kata kunci pencarian"
              />
              <kbd className="rounded-md border border-line bg-surface2 px-1.5 py-0.5 text-[11px] text-dim">Esc</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {res.length === 0 && <p className="px-3 py-6 text-center text-dim">Tidak ada hasil untuk “{q}”.</p>}
              {res.map((i) => (
                <button
                  key={i.href + i.label}
                  onClick={() => go(i.href)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-ink transition-colors hover:bg-surface2"
                >
                  {i.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
