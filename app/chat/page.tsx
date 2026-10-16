import ChatBox from "@/components/ChatBox";

export default function Page() {
  return (
    <>
      <h1>Chat AI</h1>
      <p className="mb-6 max-w-prose text-dim">
        Tanyakan apa saja soal jaringan, server, atau keamanan. Nexi akan memandumu belajar.
      </p>
      <ChatBox />
    </>
  );
}
