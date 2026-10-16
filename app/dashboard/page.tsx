import Hero from "@/components/Hero";
import PathCards from "@/components/PathCards";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import { chapters } from "@/lib/content";

export default function Page() {
  const asj = chapters("asj");
  const aij = chapters("aij");
  const total = asj.length + aij.length;
  const asjIds = asj.map((c) => `asj/${c.slug}`);
  const aijIds = aij.map((c) => `aij/${c.slug}`);
  return (
    <div className="space-y-12">
      <Hero />

      <section>
        <h2 className="!mt-0">Jalur belajar</h2>
        <p className="mb-5 max-w-prose text-dim">
          Pilih jalur yang ingin kamu dalami. Setiap jalur punya bab terstruktur, kuis, dan praktik.
        </p>
        <PathCards />
      </section>

      <section>
        <h2>Progres kamu</h2>
        <Stats total={total} asjIds={asjIds} aijIds={aijIds} />
      </section>

      <section>
        <h2>Teknologi yang dipelajari</h2>
        <TechMarquee />
      </section>
    </div>
  );
}
