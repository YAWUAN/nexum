import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, TRACKS } from "@/lib/content";
import Done from "@/components/Done";
import { IconRouter, IconServer } from "@/components/Illustrations";
import { ArrowRight } from "lucide-react";

export default async function Page({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  if (!TRACKS[track]) notFound();
  const list = chapters(track);
  const Icon = track === "asj" ? IconServer : IconRouter;

  return (
    <>
      {/* Header berilustrasi sesuai jalur */}
      <header className="mb-8 flex items-center gap-5 rounded-3xl border border-line bg-surface p-6 shadow-warm sm:p-8">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-surface2">
          <Icon size={56} />
        </div>
        <div>
          <p className="text-label uppercase tracking-wide text-accent">{track.toUpperCase()}</p>
          <h1 className="!mb-1">{TRACKS[track]}</h1>
          <p className="text-dim">{list.length} bab tersedia</p>
        </div>
      </header>

      <div className="space-y-3">
        {list.map((c, i) => (
          <Link
            key={c.slug}
            href={`/materi/${track}/${c.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 no-underline shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-warm"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface2 font-display font-bold text-accent">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display font-bold text-ink">{c.title}</span>
              <span className="text-label text-dim">{c.quiz.length} soal kuis</span>
              <Done id={`${track}/${c.slug}`} />
            </span>
            <ArrowRight size={18} className="text-dim transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
        {list.length === 0 && (
          <p className="panel p-6 text-dim">
            Belum ada bab. Tambahkan file <code>.mdx</code> ke <code>content/{track}</code>.
          </p>
        )}
      </div>
    </>
  );
}
