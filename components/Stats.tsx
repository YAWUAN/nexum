"use client";
import { useEffect, useState } from "react";
import { useProgress, xp, level, badges } from "@/lib/store";
import { Lock, Check } from "lucide-react";

function Count({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const k = Math.min(1, (t - t0) / 800);
      setV(Math.round(to * k));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}

/** Cincin progres melingkar beranimasi */
export function ProgressRing({
  value,
  max,
  label,
  sub,
}: {
  value: number;
  max: number;
  label: string;
  sub?: string;
}) {
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const R = 34;
  const C = 2 * Math.PI * R;
  const [off, setOff] = useState(C);
  useEffect(() => {
    const t = setTimeout(() => setOff(C * (1 - pct)), 120);
    return () => clearTimeout(t);
  }, [pct, C]);
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-20 w-20 shrink-0">
        <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r={R} fill="none" stroke="rgb(var(--c-surface2))" strokeWidth="8" />
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke="rgb(var(--c-accent))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={off}
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold text-ink">
          {Math.round(pct * 100)}%
        </span>
      </div>
      <div className="min-w-0">
        <div className="font-display font-bold text-ink">{label}</div>
        <div className="text-label text-dim">{sub ?? `${value} / ${max} bab`}</div>
      </div>
    </div>
  );
}

export default function Stats({
  total,
  asjIds,
  aijIds,
}: {
  total: number;
  asjIds: string[];
  aijIds: string[];
}) {
  const [p] = useProgress();
  const asjTotal = asjIds.length;
  const aijTotal = aijIds.length;
  const asjDone = asjIds.filter((id) => p.done.includes(id)).length;
  const aijDone = aijIds.filter((id) => p.done.includes(id)).length;
  const x = xp(p);
  const lv = level(x);
  const toNext = 100 - (x % 100);

  const items: [string, number][] = [
    ["Bab selesai", p.done.length],
    ["Total bab", total],
    ["XP", x],
    ["Level", lv],
  ];

  return (
    <div className="space-y-6">
      {/* Kartu statistik count-up */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(([l, v]) => (
          <div key={l} className="panel p-4">
            <div className="font-display text-3xl font-extrabold text-accent">
              <Count to={v} />
            </div>
            <div className="text-label text-dim">{l}</div>
          </div>
        ))}
      </div>

      {/* Progress ring + XP bar */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="panel space-y-4 p-5">
          <h3 className="!mt-0 !mb-1 !text-[18px]">Progres jalur</h3>
          <ProgressRing value={asjDone} max={asjTotal} label="ASJ" sub={`${asjDone} / ${asjTotal} bab selesai`} />
          <ProgressRing value={aijDone} max={aijTotal} label="AIJ" sub={`${aijDone} / ${aijTotal} bab selesai`} />
        </div>

        <div className="panel flex flex-col justify-between p-5">
          <div>
            <h3 className="!mt-0 !mb-1 !text-[18px]">Level {lv}</h3>
            <p className="text-label text-dim">XP bar menuju level berikutnya</p>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-label">
              <span className="text-ink">{x % 100} / 100 XP</span>
              <span className="text-dim">{toNext} XP lagi</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface2">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: `${x % 100}%` }}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="mt-5">
            <p className="mb-2 text-label text-dim">Badge</p>
            <div className="flex flex-wrap gap-2">
              {badges(p).map((b) => (
                <span
                  key={b.name}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-label ${
                    b.ok ? "border-accent bg-accentsoft/50 text-accent animate-pop" : "border-line bg-surface2 text-dim"
                  }`}
                >
                  {b.ok ? <Check size={14} /> : <Lock size={14} />}
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
