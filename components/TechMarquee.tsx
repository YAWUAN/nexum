"use client";
const TECH = ["Linux", "TCP/IP", "DNS", "Nginx", "Docker", "Wireshark", "Python", "OSPF", "VLAN", "Bash"];

export default function TechMarquee() {
  const row = [...TECH, ...TECH];
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line bg-surface2/50 py-4"
      aria-label="Teknologi yang dipelajari"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max animate-marquee gap-3">
        {row.map((t, i) => (
          <span key={i} className="chip whitespace-nowrap text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
