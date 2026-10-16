"use client";
import { useProgress } from "@/lib/store";
import { Check, Bookmark } from "lucide-react";
export default function Done({ id }: { id: string }) {
  const [p] = useProgress();
  const done = p.done.includes(id);
  const bm = p.bookmarks.includes(id);
  if (!done && !bm) return null;
  return (
    <span className="ml-2 inline-flex items-center gap-2 align-middle">
      {done && (
        <span className="inline-flex items-center gap-1 rounded-full bg-accentsoft/60 px-2 py-0.5 text-[12px] text-accent">
          <Check size={12} /> selesai
        </span>
      )}
      {bm && (
        <span className="inline-flex items-center gap-1 rounded-full bg-surface2 px-2 py-0.5 text-[12px] text-dim">
          <Bookmark size={12} /> bookmark
        </span>
      )}
    </span>
  );
}
