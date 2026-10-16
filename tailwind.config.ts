import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "6px",
      DEFAULT: "10px",
      md: "10px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      full: "9999px",
    },
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        surface2: "rgb(var(--c-surface2) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        maroon: "rgb(var(--c-maroon) / <alpha-value>)",
        maroonhover: "rgb(var(--c-maroonhover) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        accentsoft: "rgb(var(--c-accentsoft) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        dim: "rgb(var(--c-dim) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        base: ["17px", { lineHeight: "1.7" }],
        label: ["14px", { lineHeight: "1.5" }],
      },
      boxShadow: {
        warm: "0 8px 24px -8px rgba(60,10,20,0.25)",
        "warm-lg": "0 18px 48px -12px rgba(60,10,20,0.35)",
        soft: "0 2px 8px -2px rgba(60,10,20,0.18)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "70%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(24px,-18px) scale(1.08)" },
          "66%": { transform: "translate(-18px,14px) scale(0.95)" },
        },
        blink: { "50%": { opacity: "0" } },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
        pop: "pop 0.35s ease-out",
        blob: "blob 22s ease-in-out infinite",
        blink: "blink 1s steps(1) infinite",
        shake: "shake 0.35s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
