/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Materi AIJ lama -> bab baru (struktur 6 bab menjadi 9 bab)
      { source: "/materi/aij/01-osi-tcpip", destination: "/materi/aij/01-dasar-jaringan", permanent: true },
      { source: "/materi/aij/02-ipv4-subnetting", destination: "/materi/aij/02-pengalamatan-ip", permanent: true },
      { source: "/materi/aij/03-ipv6-dasar", destination: "/materi/aij/02-pengalamatan-ip", permanent: true },
      { source: "/materi/aij/05-vlan-switching", destination: "/materi/aij/05-switching", permanent: true },
      { source: "/materi/aij/06-troubleshooting", destination: "/materi/aij/08-troubleshooting", permanent: true },
    ];
  },
};

export default nextConfig;
