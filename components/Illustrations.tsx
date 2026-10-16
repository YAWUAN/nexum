/* Ilustrasi SVG v2 — gaya konsisten: garis tebal 2px, sudut membulat,
   maksimal dua warna dari palet (maroon + accent). Semua dekoratif. */

type P = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 64 64",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
});

const S = { strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** ASJ — router dengan gelombang sinyal */
export function IconRouter({ className, size = 64 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="10" y="26" width="44" height="20" rx="4" className="stroke-maroon" {...S} />
      <circle cx="18" cy="36" r="2" className="fill-accent" />
      <circle cx="26" cy="36" r="2" className="fill-accent" />
      <path d="M40 34h8M40 39h5" className="stroke-maroon" {...S} />
      <path d="M22 20c6-6 14-6 20 0" className="stroke-accent" {...S} />
      <path d="M27 14c4-4 10-4 14 0" className="stroke-accent" {...S} />
    </svg>
  );
}

/** AIJ — rak server */
export function IconServer({ className, size = 64 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="16" y="10" width="32" height="44" rx="4" className="stroke-maroon" {...S} />
      {[18, 26, 34, 42].map((y) => (
        <path key={y} d={`M22 ${y}h20`} className="stroke-maroon" {...S} />
      ))}
      <circle cx="42" cy="18" r="1.6" className="fill-accent" />
      <circle cx="42" cy="26" r="1.6" className="fill-accent" />
      <circle cx="42" cy="34" r="1.6" className="fill-accent" />
      <circle cx="42" cy="42" r="1.6" className="fill-accent" />
    </svg>
  );
}

/** Cybersecurity — perisai dengan gembok */
export function IconShield({ className, size = 64 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M32 8l18 7v16c0 12-8 20-18 25-10-5-18-13-18-25V15l18-7z" className="stroke-maroon" {...S} />
      <rect x="24" y="30" width="16" height="13" rx="3" className="stroke-accent" {...S} />
      <path d="M27 30v-4a5 5 0 0 1 10 0v4" className="stroke-accent" {...S} />
      <circle cx="32" cy="36" r="1.6" className="fill-accent" />
    </svg>
  );
}

/** AI Engineering — chip dengan simpul saraf */
export function IconChip({ className, size = 64 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="18" y="18" width="28" height="28" rx="4" className="stroke-maroon" {...S} />
      {[24, 32, 40].map((y) => (
        <g key={y}>
          <path d={`M18 ${y}h-6`} className="stroke-maroon" {...S} />
          <path d={`M46 ${y}h6`} className="stroke-maroon" {...S} />
        </g>
      ))}
      {[24, 32, 40].map((x) => (
        <g key={x}>
          <path d={`M${x} 18v-6`} className="stroke-maroon" {...S} />
          <path d={`M${x} 46v6`} className="stroke-maroon" {...S} />
        </g>
      ))}
      <circle cx="27" cy="27" r="2" className="fill-accent" />
      <circle cx="37" cy="32" r="2" className="fill-accent" />
      <circle cx="28" cy="38" r="2" className="fill-accent" />
      <path d="M27 27l10 5M37 32l-9 6" className="stroke-accent" strokeWidth={1.5} />
    </svg>
  );
}

/** Maskot "Nexi" — router lucu untuk chat */
export function Mascot({ className, size = 40 }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="8" y="22" width="48" height="26" rx="9" className="stroke-maroon" {...S} />
      <path d="M20 16c4-5 20-5 24 0" className="stroke-maroon" {...S} />
      <circle cx="22" cy="34" r="3.4" className="fill-accent" />
      <circle cx="42" cy="34" r="3.4" className="fill-accent" />
      <path d="M27 42c3 3 7 3 10 0" className="stroke-accent" {...S} />
      <circle cx="22" cy="33" r="1.1" fill="#fff" />
      <circle cx="42" cy="33" r="1.1" fill="#fff" />
    </svg>
  );
}

/** Ikon kecil untuk item menu */
export function IconMenu({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const common = { ...base(size), viewBox: "0 0 24 24" };
  const sw = { strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "stroke-current" };
  switch (name) {
    case "dashboard":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="3" width="7" height="9" rx="2" {...sw} />
          <rect x="14" y="3" width="7" height="5" rx="2" {...sw} />
          <rect x="14" y="12" width="7" height="9" rx="2" {...sw} />
          <rect x="3" y="16" width="7" height="5" rx="2" {...sw} />
        </svg>
      );
    case "asj":
      return (
        <svg {...common} className={className}>
          <rect x="5" y="3" width="14" height="18" rx="3" {...sw} />
          <path d="M9 7h6M9 11h6M9 15h6" {...sw} />
        </svg>
      );
    case "aij":
      return (
        <svg {...common} className={className}>
          <rect x="2" y="9" width="20" height="8" rx="3" {...sw} />
          <circle cx="7" cy="13" r="1.4" className="fill-current" />
          <path d="M15 11.5h4" {...sw} />
          <path d="M8 6c2-2 6-2 8 0" {...sw} />
        </svg>
      );
    case "roadmap":
      return (
        <svg {...common} className={className}>
          <circle cx="6" cy="6" r="2.4" {...sw} />
          <circle cx="18" cy="18" r="2.4" {...sw} />
          <path d="M8 7.5l8 9" {...sw} />
          <path d="M6 8.5V15a3 3 0 0 0 3 3h6" {...sw} />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} className={className}>
          <path d="M4 5h16v11H9l-5 4z" {...sw} />
          <path d="M8 10h8" {...sw} />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="4" width="18" height="16" rx="3" {...sw} />
          <path d="M7 9l3 3-3 3M13 15h4" {...sw} />
        </svg>
      );
    case "game":
      return (
        <svg {...common} className={className}>
          <rect x="2" y="7" width="20" height="11" rx="4" {...sw} />
          <path d="M7 11v4M5 13h4" {...sw} />
          <circle cx="16" cy="12" r="1.2" className="fill-current" />
          <circle cx="18.5" cy="14.5" r="1.2" className="fill-current" />
        </svg>
      );
    case "subnet":
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="9" {...sw} />
          <path d="M12 3v18M3 12h18" {...sw} />
        </svg>
      );
    case "contact":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="5" width="18" height="14" rx="3" {...sw} />
          <path d="M4 7l8 6 8-6" {...sw} />
        </svg>
      );
    default:
      return null;
  }
}
