"use client";
import { useEffect, useState } from "react";
export function useLS<T>(key: string, init: T) {
  const [v, setV] = useState<T>(init);
  useEffect(() => { try { const r = localStorage.getItem(key); if (r) setV(JSON.parse(r)); } catch {} }, [key]);
  const set = (n: T | ((p: T) => T)) => setV((p) => {
    const x = typeof n === "function" ? (n as any)(p) : n;
    try { localStorage.setItem(key, JSON.stringify(x)); } catch {}
    return x;
  });
  return [v, set] as const;
}
export type Progress = { done: string[]; bookmarks: string[]; quiz: Record<string, number> };
export const useProgress = () => useLS<Progress>("nexum:progress", { done: [], bookmarks: [], quiz: {} });
export const xp = (p: Progress) => p.done.length * 50 + Object.values(p.quiz).reduce((a, b) => a + b * 10, 0);
export const level = (x: number) => Math.floor(x / 100) + 1;
export const badges = (p: Progress) => [
  { name: "Boot Up", ok: p.done.length >= 1 },
  { name: "Quiz Perfect", ok: Object.values(p.quiz).some((s) => s >= 2) },
  { name: "Collector", ok: p.bookmarks.length >= 2 },
  { name: "Veteran", ok: xp(p) >= 300 },
];
