"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TerminalSquare } from "lucide-react";
import HeroTopology from "./HeroTopology";
import Boot from "./Boot";

const ROTATE = ["Subnetting", "Linux server", "Keamanan", "Roadmap karier"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROTATE[i];
    const speed = del ? 45 : 85;
    if (!del && txt === full) {
      const t = setTimeout(() => setDel(true), 1400);
      return () => clearTimeout(t);
    }
    if (del && txt === "") {
      setDel(false);
      setI((v) => (v + 1) % ROTATE.length);
      return;
    }
    const t = setTimeout(() => {
      setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i]);

  return (
    <span className="text-accent">
      {txt}
      <span className="cursor" />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-10 shadow-warm sm:px-10 sm:py-12">
      {/* Blob latar bergerak sangat pelan, hanya di hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-maroon/25 blur-3xl animate-blob" />
        <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl animate-blob [animation-delay:-6s]" />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="chip mb-4">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Platform belajar ASJ · AIJ · Cybersecurity · AI
          </span>

          <h1 className="!mb-3 font-display !text-[40px] !leading-[1.1] sm:!text-[52px]">
            Belajar jaringan,
            <br />
            selangkah demi selangkah
          </h1>

          <p className="mb-6 max-w-prose text-ink/85">
            Baca materi, kerjakan kuis, lalu uji pemahaman di terminal dan game. Mulai dari{" "}
            <Typewriter />
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/materi/asj" className="btn">
              Mulai belajar <ArrowRight size={18} />
            </Link>
            <Link href="/terminal" className="btn-ghost">
              <TerminalSquare size={18} /> Coba terminal
            </Link>
          </div>

          <Boot />
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HeroTopology className="h-auto w-full animate-floaty" />
        </motion.div>
      </div>
    </section>
  );
}
