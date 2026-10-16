import RoadmapFlow from "@/components/RoadmapFlow";
import { roadmap } from "@/lib/content";

export default function Page() {
  const data = {
    network: roadmap("network"),
    cybersecurity: roadmap("cybersecurity"),
    ai: roadmap("ai"),
  };
  return (
    <>
      <h1>Roadmap</h1>
      <p className="mb-6 max-w-prose text-dim">
        Peta jalur karier langkah demi langkah. Klik salah satu langkah untuk melihat detailnya.
      </p>
      <RoadmapFlow data={data} />
    </>
  );
}
