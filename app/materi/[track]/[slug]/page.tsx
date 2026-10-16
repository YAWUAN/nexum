import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { chapters, TRACKS } from "@/lib/content";
import ChapterActions from "@/components/ChapterActions";
import ReadingProgress from "@/components/ReadingProgress";
import { IconRouter, IconServer } from "@/components/Illustrations";
import { ChevronLeft } from "lucide-react";

/** Bungkus tabel agar bisa digeser horizontal di layar kecil */
const mdxComponents = {
  table: (props: React.ComponentProps<"table">) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};

export default async function Page({ params }: { params: Promise<{ track: string; slug: string }> }) {
  const { track, slug } = await params;
  if (!TRACKS[track]) notFound();
  const list = chapters(track);
  const i = list.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const c = list[i];
  const next = list[i + 1];
  const Icon = track === "asj" ? IconServer : IconRouter;

  return (
    <>
      <ReadingProgress />
      <article>
        <Link
          href={`/materi/${track}`}
          className="mb-5 inline-flex items-center gap-1.5 text-label text-dim no-underline hover:text-accent"
        >
          <ChevronLeft size={16} /> {TRACKS[track]}
        </Link>

        {/* Header berilustrasi */}
        <header className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-warm">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-surface2">
            <Icon size={40} />
          </div>
          <div>
            <p className="text-label text-accent">
              Bab {i + 1} dari {list.length} · {track.toUpperCase()}
            </p>
            <h1 className="!mb-0 !text-[32px]">{c.title}</h1>
          </div>
        </header>

        <div className="prose-nx">
          <MDXRemote
            source={c.body}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <ChapterActions
          id={`${track}/${c.slug}`}
          quiz={c.quiz}
          next={next ? `/materi/${track}/${next.slug}` : `/materi/${track}`}
          last={!next}
        />
      </article>
    </>
  );
}
