"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconRouter, IconServer, IconShield, IconChip } from "./Illustrations";
import { ArrowRight } from "lucide-react";

type Card = {
  href: string;
  title: string;
  desc: string;
  Icon: (p: { className?: string; size?: number }) => React.ReactElement;
  meta: string;
};

const CARDS: Card[] = [
  {
    href: "/materi/asj",
    title: "ASJ",
    desc: "Administrasi Sistem Jaringan",
    Icon: IconServer,
    meta: "Linux, DNS/DHCP, web server, container",
  },
  {
    href: "/materi/aij",
    title: "AIJ",
    desc: "Administrasi Infrastruktur Jaringan",
    Icon: IconRouter,
    meta: "OSI, subnetting, routing, VLAN",
  },
  {
    href: "/roadmap",
    title: "Cybersecurity",
    desc: "Jalur keamanan siber",
    Icon: IconShield,
    meta: "Fondasi, web security, pentest, blue team",
  },
  {
    href: "/roadmap",
    title: "AI Engineering",
    desc: "Jalur rekayasa AI",
    Icon: IconChip,
    meta: "Python, ML, LLM, MLOps",
  },
];

export default function PathCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
        >
          <Link
            href={c.href}
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 no-underline shadow-warm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-warm-lg"
          >
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-surface2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
              <c.Icon size={44} />
            </div>
            <div className="font-display text-xl font-extrabold text-ink">{c.title}</div>
            <div className="text-label text-dim">{c.desc}</div>
            <p className="mt-2 flex-1 text-label text-ink/70">{c.meta}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-label font-semibold text-accent">
              Jelajahi <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
