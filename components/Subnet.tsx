"use client";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

const toInt = (ip: string) => ip.split(".").reduce((a, o) => a * 256 + Number(o), 0);
const toIp = (n: number) => [24, 16, 8, 0].map((s) => Math.floor(n / 2 ** s) % 256).join(".");

export default function Subnet() {
  const [v, setV] = useState("192.168.10.0/26");
  const [ip, c] = v.trim().split("/");
  const n = Number(c);
  const ok =
    /^(\d{1,3}\.){3}\d{1,3}$/.test(ip ?? "") &&
    (ip ?? "").split(".").every((o) => Number(o) <= 255) &&
    Number.isInteger(n) &&
    n >= 0 &&
    n <= 32;

  let rows: [string, string][] = [];
  if (ok) {
    const size = 2 ** (32 - n);
    const net = Math.floor(toInt(ip) / size) * size;
    const bc = net + size - 1;
    rows = [
      ["Network", toIp(net)],
      ["Broadcast", toIp(bc)],
      ["Subnet mask", toIp(2 ** 32 - size)],
      ["Host pertama", n >= 31 ? "-" : toIp(net + 1)],
      ["Host terakhir", n >= 31 ? "-" : toIp(bc - 1)],
      ["Host usable", String(n >= 31 ? (n === 31 ? 2 : 1) : size - 2)],
      ["Total alamat", String(size)],
    ];
  }

  return (
    <div className="max-w-xl">
      <label className="mb-2 block text-label text-dim" htmlFor="cidr">
        Masukkan alamat CIDR
      </label>
      <input
        id="cidr"
        className="input mb-4 font-mono"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="192.168.1.0/24"
        aria-label="Alamat CIDR"
      />

      {ok ? (
        <div className="panel overflow-hidden p-0">
          <table className="w-full">
            <tbody>
              {rows.map(([k, x], i) => (
                <tr key={k} className={i % 2 ? "bg-surface2/40" : ""}>
                  <td className="px-4 py-3 text-dim">{k}</td>
                  <td className="px-4 py-3 font-mono text-ink">{x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="flex items-center gap-2 text-accent">
          <AlertCircle size={18} /> Format tidak valid. Gunakan bentuk 192.168.1.0/24.
        </p>
      )}
    </div>
  );
}
