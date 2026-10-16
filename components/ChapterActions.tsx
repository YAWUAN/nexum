"use client";
import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/store";
import type { Quiz } from "@/lib/content";
import { Check, Bookmark, BookmarkCheck, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChapterActions({
  id,
  quiz,
  next,
  last,
}: {
  id: string;
  quiz: Quiz[];
  next: string;
  last: boolean;
}) {
  const [p, setP] = useProgress();
  const [ans, setAns] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const score = quiz.filter((q, i) => ans[i] === q.answer).length;

  const toggle = (k: "done" | "bookmarks") =>
    setP((x) => ({
      ...x,
      [k]: x[k].includes(id) ? x[k].filter((y) => y !== id) : [...x[k], id],
    }));

  const done = p.done.includes(id);
  const bm = p.bookmarks.includes(id);

  return (
    <section className="mt-12 border-t border-line pt-8">
      {quiz.length > 0 && (
        <div className="panel mb-6 p-5 sm:p-6">
          <h2 className="!mt-0 !mb-4 !text-[22px]">Kuis akhir bab</h2>
          {quiz.map((q, i) => {
            const chosen = ans[i];
            return (
              <fieldset key={i} className="mb-5">
                <legend className="mb-2 font-medium text-ink">
                  {i + 1}. {q.q}
                </legend>
                <div className="space-y-1.5">
                  {q.options.map((o, j) => {
                    const isAnswer = j === q.answer;
                    const isChosen = chosen === j;
                    let cls = "border-line bg-surface hover:border-accent";
                    if (checked) {
                      if (isAnswer) cls = "border-accent bg-accentsoft/50";
                      else if (isChosen) cls = "border-line bg-surface2 opacity-70";
                      else cls = "border-line bg-surface opacity-60";
                    } else if (isChosen) {
                      cls = "border-accent bg-surface2";
                    }
                    return (
                      <label
                        key={j}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors ${cls} ${
                          checked ? "cursor-default" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${i}`}
                          className="accent-accent"
                          disabled={checked}
                          checked={isChosen}
                          onChange={() => setAns({ ...ans, [i]: j })}
                        />
                        <span className="flex-1 text-ink">{o}</span>
                        {checked && isAnswer && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-accent">
                            <Check size={18} />
                          </motion.span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          {!checked ? (
            <button className="btn" disabled={Object.keys(ans).length < quiz.length} onClick={() => {
              setChecked(true);
              setP((x) => ({ ...x, quiz: { ...x.quiz, [id]: Math.max(x.quiz[id] ?? 0, score) } }));
            }}>
              Periksa jawaban
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-ink">
                Skor: <b className="text-accent">{score}</b>/{quiz.length}
              </span>
              <button
                className="btn-ghost !py-2"
                onClick={() => {
                  setChecked(false);
                  setAns({});
                }}
              >
                <RotateCcw size={16} /> Coba lagi
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button className={done ? "btn-ghost" : "btn"} onClick={() => toggle("done")}>
          {done ? <Check size={18} /> : null}
          {done ? "Ditandai selesai" : "Tandai selesai (+50 XP)"}
        </button>
        <button className="btn-ghost" onClick={() => toggle("bookmarks")}>
          {bm ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {bm ? "Hapus bookmark" : "Bookmark"}
        </button>
        <Link className="btn-ghost" href={next}>
          {last ? "Kembali ke daftar bab" : "Bab berikutnya"} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
