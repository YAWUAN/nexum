"use client";
import { useEffect, useState } from "react";

/** Bar progres baca yang menempel di atas halaman materi. */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed left-0 top-16 z-30 h-1 w-full bg-transparent" aria-hidden>
      <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${pct * 100}%` }} />
    </div>
  );
}
