import Terminal from "@/components/Terminal";

export default function Page() {
  return (
    <>
      <h1>Terminal</h1>
      <p className="mb-6 max-w-prose text-dim">
        Coba perintah CLI tanpa risiko. Tekan <kbd className="rounded border border-line bg-surface2 px-1.5">Tab</kbd> untuk
        autocomplete, dan panah atas/bawah untuk riwayat perintah.
      </p>
      <Terminal />
    </>
  );
}
