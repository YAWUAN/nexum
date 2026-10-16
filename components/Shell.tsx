"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import CommandSearch from "./CommandSearch";
import ChatWidget from "./ChatWidget";

export default function Shell({
  children,
  searchIndex,
}: {
  children: React.ReactNode;
  searchIndex: { label: string; href: string }[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const path = usePathname();

  // CommandSearch punya listener sendiri untuk Ctrl+K; Shell hanya menyediakan
  // tombol pembuka dengan cara memicu event keydown sintetis.
  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
  };

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-maroon focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>
      <TopBar onOpenSearch={openSearch} />
      <CommandSearch index={searchIndex} />
      <AnimatePresence mode="wait">
        <motion.main
          id="konten"
          key={path}
          className="mx-auto max-w-[1100px] px-4 py-8 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <ChatWidget />
    </>
  );
}
