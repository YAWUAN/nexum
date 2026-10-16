"use client";
import { useState } from "react";
import { ReactFlow, Background, Controls, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IconRouter, IconShield, IconChip, IconServer } from "./Illustrations";

type Step = { id: string; label: string; desc: string };

const ICONS: Record<string, (p: { size?: number; className?: string }) => React.ReactElement> = {
  network: IconRouter,
  cybersecurity: IconShield,
  ai: IconChip,
};

export default function RoadmapFlow({ data }: { data: Record<string, Step[]> }) {
  const keys = Object.keys(data);
  const [k, setK] = useState(keys[0]);
  const [sel, setSel] = useState<Step | null>(null);
  const steps = data[k];
  const Icon = ICONS[k] ?? IconServer;

  const nodes: Node[] = steps.map((s, i) => ({
    id: s.id,
    position: { x: (i % 2) * 260, y: i * 110 },
    data: { label: s.label },
    style: {
      background: "rgb(var(--c-surface))",
      color: "rgb(var(--c-ink))",
      border: "1px solid rgb(var(--c-line))",
      borderRadius: 14,
      width: 220,
      padding: "12px 14px",
      fontSize: 15,
      fontWeight: 600,
      boxShadow: "0 8px 24px -8px rgba(60,10,20,0.25)",
    },
  }));

  const edges: Edge[] = steps.slice(1).map((s, i) => ({
    id: `e${i}`,
    source: steps[i].id,
    target: s.id,
    animated: true,
    style: { stroke: "rgb(var(--c-accent))", strokeWidth: 2 },
  }));

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {keys.map((x) => (
          <button
            key={x}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-label font-semibold transition-colors ${
              x === k ? "border-maroon bg-maroon text-white" : "border-line bg-surface text-dim hover:text-ink"
            }`}
            onClick={() => {
              setK(x);
              setSel(null);
            }}
          >
            {(() => {
              const I = ICONS[x] ?? IconServer;
              return <I size={18} />;
            })()}
            {x === "ai" ? "AI Engineer" : x === "cybersecurity" ? "Cybersecurity" : "Network Engineer"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="h-[460px] overflow-hidden rounded-2xl border border-line shadow-warm">
          <ReactFlow
            key={k}
            nodes={nodes}
            edges={edges}
            fitView
            colorMode="light"
            nodesDraggable={false}
            onNodeClick={(_, n) => setSel(steps.find((s) => s.id === n.id) ?? null)}
          >
            <Background color="rgb(var(--c-line))" gap={20} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <aside className="panel h-fit p-5">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-surface2">
            <Icon size={32} />
          </div>
          {sel ? (
            <>
              <h3 className="!mt-0 !mb-1 !text-[20px]">{sel.label}</h3>
              <p className="text-ink/80">{sel.desc}</p>
            </>
          ) : (
            <p className="text-dim">Klik salah satu langkah pada peta untuk melihat detailnya.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
