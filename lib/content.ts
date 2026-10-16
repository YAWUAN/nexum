import fs from "fs";
import path from "path";
import matter from "gray-matter";
export type Quiz = { q: string; options: string[]; answer: number };
export type Chapter = { slug: string; title: string; order: number; quiz: Quiz[]; body: string };
export function chapters(track: string): Chapter[] {
  const dir = path.join(process.cwd(), "content", track);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    return { slug: f.replace(".mdx", ""), title: data.title, order: data.order ?? 0, quiz: data.quiz ?? [], body: content };
  }).sort((a, b) => a.order - b.order);
}
export function roadmap(name: string): { id: string; label: string; desc: string }[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "roadmap", `${name}.json`), "utf8"));
}
export const TRACKS: Record<string, string> = { asj: "Administrasi Sistem Jaringan (ASJ)", aij: "Administrasi Infrastruktur Jaringan (AIJ)" };
