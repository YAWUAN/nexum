"use client";
/* Topologi jaringan animasi untuk hero dashboard.
   - Garis penghubung antar node
   - Titik "paket data" bergerak sepanjang jalur (animateMotion)
   - LED node berkedip lembut
   Semua dekoratif → aria-hidden. Menghormati prefers-reduced-motion via CSS. */

type Node = { x: number; y: number; kind: "cloud" | "router" | "switch" | "server" | "laptop" };

const NODES: Node[] = [
  { x: 320, y: 44, kind: "cloud" },
  { x: 320, y: 140, kind: "router" },
  { x: 150, y: 240, kind: "switch" },
  { x: 490, y: 240, kind: "switch" },
  { x: 60, y: 350, kind: "laptop" },
  { x: 240, y: 350, kind: "laptop" },
  { x: 400, y: 350, kind: "server" },
  { x: 580, y: 350, kind: "server" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [3, 7],
];

function NodeIcon({ n }: { n: Node }) {
  const common = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (n.kind) {
    case "cloud":
      return (
        <g transform={`translate(${n.x - 22} ${n.y - 16})`} className="stroke-maroon" {...common}>
          <path d="M14 30a8 8 0 0 1 0-16 11 11 0 0 1 21 3 7 7 0 0 1-1 13z" />
        </g>
      );
    case "router":
      return (
        <g transform={`translate(${n.x - 22} ${n.y - 14})`} className="stroke-maroon" {...common}>
          <rect x="2" y="8" width="40" height="16" rx="4" />
          <path d="M10 24v-4M32 24v-4" />
          <path d="M12 4c6-4 14-4 20 0" className="stroke-accent" />
        </g>
      );
    case "switch":
      return (
        <g transform={`translate(${n.x - 20} ${n.y - 12})`} className="stroke-maroon" {...common}>
          <rect x="2" y="6" width="36" height="14" rx="3" />
          <path d="M9 13h18" />
        </g>
      );
    case "server":
      return (
        <g transform={`translate(${n.x - 14} ${n.y - 20})`} className="stroke-maroon" {...common}>
          <rect x="2" y="2" width="24" height="38" rx="4" />
          <path d="M7 11h14M7 19h14M7 27h14" />
        </g>
      );
    case "laptop":
      return (
        <g transform={`translate(${n.x - 20} ${n.y - 14})`} className="stroke-maroon" {...common}>
          <rect x="4" y="2" width="32" height="20" rx="3" />
          <path d="M0 26h40" />
        </g>
      );
  }
}

export default function HeroTopology({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      role="img"
      aria-label="Ilustrasi topologi jaringan dengan paket data bergerak"
    >
      <defs>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-maroon))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--c-accent))" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Garis penghubung */}
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        return (
          <line
            key={`l${i}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="url(#heroLine)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
            opacity="0.7"
          />
        );
      })}

      {/* Paket data bergerak sepanjang tiap jalur */}
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        const dur = 2.4 + (i % 3) * 0.5;
        return (
          <circle key={`p${i}`} r="4" fill="rgb(var(--c-accent))">
            <animateMotion
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${i * 0.35}s`}
              path={`M${n1.x},${n1.y} L${n2.x},${n2.y}`}
            />
            <animate attributeName="opacity" values="0.35;1;1;0.35" dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
          </circle>
        );
      })}

      {/* Node + LED berkedip */}
      {NODES.map((n, i) => (
        <g key={`n${i}`}>
          <NodeIcon n={n} />
          <circle cx={n.x + 16} cy={n.y - 14} r="3" fill="rgb(var(--c-accent))">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${1.6 + (i % 4) * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.25}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
