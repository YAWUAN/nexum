"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ChatBox from "./ChatBox";
import { Mascot } from "./Illustrations";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  if (path === "/chat") return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(92vw,400px)] overflow-hidden rounded-2xl border border-line bg-bg p-3 shadow-warm-lg"
            role="dialog"
            aria-label="Chat AI"
          >
            <div className="mb-2 flex items-center gap-2 px-1">
              <Mascot size={28} />
              <span className="font-display font-bold text-ink">Nexi</span>
              <button
                onClick={() => setOpen(false)}
                className="btn-ghost ml-auto !px-2 !py-1.5"
                aria-label="Tutup chat"
              >
                <X size={16} />
              </button>
            </div>
            <ChatBox height="h-72" />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="grid h-16 w-16 place-items-center rounded-full border-2 border-maroon bg-surface shadow-warm-lg ring-4 ring-accentsoft/50 transition-transform hover:scale-105 active:scale-95"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Tutup chat AI" : "Buka chat AI"}
      >
        {open ? <X size={24} className="text-maroon" /> : <Mascot size={42} />}
      </button>
    </div>
  );
}
