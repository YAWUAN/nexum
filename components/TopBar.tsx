"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search as SearchIcon, Sun, Moon, ChevronRight } from "lucide-react";
import { IconMenu } from "./Illustrations";
import { useTheme } from "./ThemeProvider";
import { useProgress, xp, level } from "@/lib/store";

export type PageItem = { key: string; label: string; href: string; desc: string };

export const PAGES: PageItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", desc: "Ringkasan progres" },
  { key: "asj", label: "Materi ASJ", href: "/materi/asj", desc: "Sistem dan layanan server" },
  { key: "aij", label: "Materi AIJ", href: "/materi/aij", desc: "Infrastruktur jaringan" },
  { key: "roadmap", label: "Roadmap", href: "/roadmap", desc: "Peta jalur karier" },
  { key: "chat", label: "Chat AI", href: "/chat", desc: "Tanya pemandu belajar" },
  { key: "terminal", label: "Terminal", href: "/terminal", desc: "Coba perintah CLI" },
  { key: "game", label: "Game", href: "/game", desc: "Flashcard dan Port Match" },
  { key: "subnet", label: "Subnet", href: "/tools", desc: "Kalkulator CIDR" },
  { key: "contact", label: "Kontak", href: "/contact", desc: "Hubungi Yuan" },
];

export default function TopBar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { theme, toggle } = useTheme();
  const [p] = useProgress();
  const x = xp(p);

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Tutup saat pindah halaman
  useEffect(() => setOpen(false), [path]);

  // Esc + kunci fokus di dalam panel
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // fokus awal
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1100px] items-center gap-3 px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-ink no-underline">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-maroon text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="3" className="fill-white" />
                <circle cx="5" cy="5" r="2" className="fill-white/70" />
                <circle cx="19" cy="5" r="2" className="fill-white/70" />
                <circle cx="5" cy="19" r="2" className="fill-white/70" />
                <circle cx="19" cy="19" r="2" className="fill-white/70" />
                <path d="M12 12L5 5M12 12l7-7M12 12l-7 7M12 12l7 7" stroke="#fff" strokeWidth="1.4" opacity="0.6" />
              </svg>
            </span>
            nexum
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="btn-ghost !px-3 !py-2"
              aria-label="Cari (Ctrl+K)"
              title="Cari (Ctrl/Cmd+K)"
            >
              <SearchIcon size={18} />
              <span className="hidden text-label text-dim sm:inline">Cari</span>
              <kbd className="ml-1 hidden rounded-md border border-line bg-surface2 px-1.5 py-0.5 text-[11px] text-dim md:inline">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggle}
              className="btn-ghost !px-3 !py-2"
              aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
              title="Ganti tema"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              ref={menuBtnRef}
              onClick={() => setOpen(true)}
              className="btn !py-2"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="nexum-menu"
            >
              <Menu size={18} />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="nexum-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu halaman"
              className="fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-line bg-surface shadow-warm-lg sm:w-[340px]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-display text-lg font-extrabold text-ink">
                  nexum<span className="text-accent">.</span>
                </span>
                <button onClick={() => setOpen(false)} className="btn-ghost !px-2.5 !py-2" aria-label="Tutup menu">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-3">
                {PAGES.map((it, i) => {
                  const active = path === it.href || path.startsWith(it.href + "/");
                  return (
                    <motion.div
                      key={it.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className={`group relative mb-1 flex items-center gap-3 rounded-xl px-3 py-3 no-underline transition-colors ${
                          active ? "bg-maroon text-white" : "text-ink hover:bg-surface2"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-accent" />}
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${active ? "bg-white/15" : "bg-surface2"}`}>
                          <IconMenu name={it.key} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display font-bold leading-tight">{it.label}</span>
                          <span className={`block text-label leading-snug ${active ? "text-white/75" : "text-dim"}`}>{it.desc}</span>
                        </span>
                        <ChevronRight size={16} className={active ? "text-white/70" : "text-dim"} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="border-t border-line px-5 py-4">
                <div className="mb-2 flex items-center justify-between text-label">
                  <span className="text-dim">Level {level(x)}</span>
                  <span className="text-dim">{x} XP</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface2">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${x % 100}%` }}
                  />
                </div>
                <p className="mt-3 text-label text-dim">Dibuat oleh Yuan</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
