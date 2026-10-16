import "./globals.css";
import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Shell from "@/components/Shell";
import { chapters, TRACKS } from "@/lib/content";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jakarta", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Nexum — Belajar jaringan, sistem, dan infrastruktur IT",
  description:
    "Platform belajar interaktif untuk ASJ, AIJ, cybersecurity, dan AI engineering. Dibuat oleh Yuan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const index = Object.keys(TRACKS).flatMap((t) =>
    chapters(t).map((c) => ({ label: `${t.toUpperCase()} · ${c.title}`, href: `/materi/${t}/${c.slug}` }))
  );
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Set tema sebelum paint untuk menghindari flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nexum:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className={`${sora.variable} ${jakarta.variable} ${mono.variable}`}>
        <ThemeProvider>
          <Shell searchIndex={index}>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
