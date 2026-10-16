"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
export default function CopyEmail() {
  const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ganti@email.kamu";
  const [ok, setOk] = useState(false);
  return (
    <button
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
        } catch {}
        setOk(true);
        setTimeout(() => setOk(false), 1600);
      }}
    >
      {ok ? <Check size={18} /> : <Copy size={18} />}
      {ok ? "Tersalin!" : EMAIL}
    </button>
  );
}
