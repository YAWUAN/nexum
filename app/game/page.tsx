import Game from "@/components/Game";

export default function Page() {
  return (
    <>
      <h1>Game</h1>
      <p className="mb-6 max-w-prose text-dim">
        Uji pemahamanmu dengan flashcard dan Port Match. Skor terbaikmu tersimpan otomatis.
      </p>
      <Game />
    </>
  );
}
