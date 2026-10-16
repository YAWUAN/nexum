"use client";
import { useEffect, useRef, useState } from "react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core";
import { useLS } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Trophy } from "lucide-react";

const CARDS: [string, string][] = [
  ["Port default SSH?", "22"],
  ["Port default HTTPS?", "443"],
  ["Layer OSI tempat router bekerja?", "Layer 3 (Network)"],
  ["Singkatan DHCP?", "Dynamic Host Configuration Protocol"],
  ["Host usable pada /30?", "2"],
  ["Protokol untuk resolusi IP ke MAC?", "ARP"],
];

const PORTS: [string, string][] = [
  ["SSH", "22"],
  ["HTTP", "80"],
  ["HTTPS", "443"],
  ["DNS", "53"],
  ["FTP", "21"],
  ["SMTP", "25"],
];

/** Konfeti sederhana berbasis DOM, dimatikan oleh prefers-reduced-motion. */
function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; delay: number; rot: number; color: string }[]>([]);
  useEffect(() => {
    if (!fire) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#9B2335", "#F2727B", "#F7B1B1", "#B52E42"];
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        rot: Math.random() * 360,
        color: colors[i % colors.length],
      }))
    );
    const t = setTimeout(() => setPieces([]), 2600);
    return () => clearTimeout(t);
  }, [fire]);
  if (!pieces.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 h-3 w-2 rounded-sm"
          style={{ left: `${p.x}%`, background: p.color, rotate: p.rot }}
          initial={{ y: -20, opacity: 1 }}
          animate={{ y: "100vh", rotate: p.rot + 360, opacity: 0 }}
          transition={{ duration: 2.2, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

function Flash() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  return (
    <div>
      <div className="flip-scene h-56 sm:h-64">
        <button
          className={`flip-inner relative h-full w-full ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Balik ke pertanyaan" : "Balik untuk melihat jawaban"}
        >
          <span className="flip-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-6 text-center shadow-warm">
            <span className="mb-3 text-label text-dim">Pertanyaan</span>
            <span className="font-display text-2xl font-bold text-ink">{CARDS[i][0]}</span>
            <span className="mt-4 inline-flex items-center gap-1 text-label text-accent">
              <RotateCw size={14} /> klik untuk jawaban
            </span>
          </span>
          <span className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-accent bg-maroon p-6 text-center shadow-warm-lg">
            <span className="mb-3 text-label text-white/70">Jawaban</span>
            <span className="font-display text-2xl font-bold text-white">{CARDS[i][1]}</span>
          </span>
        </button>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          className="btn-ghost"
          onClick={() => {
            setI((v) => (v + 1) % CARDS.length);
            setFlipped(false);
          }}
        >
          Kartu berikutnya
        </button>
        <span className="text-label text-dim">
          {i + 1}/{CARDS.length}
        </span>
      </div>
    </div>
  );
}

function Chip({ id, ok }: { id: string; ok?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`btn-ghost select-none ${isDragging ? "opacity-50" : ""} ${ok ? "!border-accent" : ""}`}
      style={{ transform: transform ? `translate(${transform.x}px,${transform.y}px)` : undefined, touchAction: "none" }}
    >
      {id}
    </button>
  );
}

function Slot({ svc, filled, ok }: { svc: string; filled?: string; ok?: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: svc });
  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-between rounded-xl border bg-surface px-4 py-3 transition-colors ${
        isOver ? "border-accent bg-surface2" : ok ? "border-accent" : "border-line"
      }`}
    >
      <span className="font-medium text-ink">{svc}</span>
      <span className={`font-mono ${filled ? "text-accent" : "text-dim"}`}>{filled ?? "…"}</span>
    </div>
  );
}

function PortMatch() {
  const [pool, setPool] = useState<string[]>([]);
  const [m, setM] = useState<Record<string, string>>({});
  const [t0, setT0] = useState(0);
  const [now, setNow] = useState(0);
  const [miss, setMiss] = useState(0);
  const [shake, setShake] = useState(0);
  const [best, setBest] = useLS<number | null>("nexum:portmatch:best", null);

  const done = Object.keys(m).length === PORTS.length;
  const reset = () => {
    setPool(PORTS.map((p) => p[1]).sort(() => Math.random() - 0.5));
    setM({});
    setMiss(0);
    setT0(Date.now());
    setNow(Date.now());
  };
  useEffect(reset, []);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, [done]);
  const secs = (now - t0) / 1000;
  useEffect(() => {
    if (done && (best === null || secs < best)) setBest(secs);
  }, [done]);

  function end(e: DragEndEvent) {
    if (!e.over) return;
    const svc = String(e.over.id);
    const port = String(e.active.id);
    if (PORTS.find((p) => p[0] === svc)?.[1] === port) {
      setM({ ...m, [svc]: port });
      setPool(pool.filter((p) => p !== port));
    } else {
      setMiss((v) => v + 1);
      setShake((v) => v + 1);
    }
  }

  return (
    <DndContext onDragEnd={end}>
      <Confetti fire={done} />
      <div className="mb-4 flex flex-wrap gap-3 text-label">
        <span className="chip">Waktu: {secs.toFixed(1)} dtk</span>
        <span className="chip">Salah: {miss}</span>
        <span className="chip">
          <Trophy size={14} /> Terbaik: {best === null ? "-" : best.toFixed(1) + " dtk"}
        </span>
      </div>

      <motion.div key={shake} className={shake ? "animate-shake" : ""}>
        <div className="mb-4 grid gap-2 sm:grid-cols-2">
          {PORTS.map(([s]) => (
            <Slot key={s} svc={s} filled={m[s]} ok={Boolean(m[s])} />
          ))}
        </div>
      </motion.div>

      <div className="flex min-h-12 flex-wrap gap-2">
        <AnimatePresence>
          {pool.map((p) => (
            <motion.div key={p} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
              <Chip id={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {done && (
        <p className="mt-4 font-display text-lg font-bold text-accent">
          🎉 Selesai dalam {secs.toFixed(1)} dtk dengan {miss} kesalahan!
        </p>
      )}

      <button className="btn-ghost mt-4" onClick={reset}>
        Ulangi
      </button>
    </DndContext>
  );
}

export default function Game() {
  const [tab, setTab] = useState<"f" | "p">("f");
  return (
    <div>
      <div className="mb-6 inline-flex gap-1 rounded-xl border border-line bg-surface2 p-1">
        <button
          className={`rounded-lg px-4 py-2 text-label font-semibold transition-colors ${
            tab === "f" ? "bg-maroon text-white" : "text-dim hover:text-ink"
          }`}
          onClick={() => setTab("f")}
        >
          Flashcard
        </button>
        <button
          className={`rounded-lg px-4 py-2 text-label font-semibold transition-colors ${
            tab === "p" ? "bg-maroon text-white" : "text-dim hover:text-ink"
          }`}
          onClick={() => setTab("p")}
        >
          Port Match
        </button>
      </div>
      {tab === "f" ? <Flash /> : <PortMatch />}
    </div>
  );
}
