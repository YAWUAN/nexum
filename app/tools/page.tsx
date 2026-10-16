import Subnet from "@/components/Subnet";

export default function Page() {
  return (
    <>
      <h1>Kalkulator Subnet / CIDR</h1>
      <p className="mb-6 max-w-prose text-dim">
        Masukkan alamat dalam notasi CIDR untuk melihat network, broadcast, subnet mask, dan rentang host.
      </p>
      <Subnet />
    </>
  );
}
