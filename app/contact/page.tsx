import CopyEmail from "@/components/CopyEmail";
import { Mail } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <h1>Kontak</h1>
      <p className="mb-6 max-w-prose text-dim">
        Punya saran materi atau menemukan kesalahan? Kirim email ke Yuan.
      </p>

      <div className="panel max-w-md space-y-4 p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface2 text-accent">
            <Mail size={22} />
          </span>
          <div>
            <div className="font-display font-bold text-ink">Email</div>
            <div className="text-label text-dim">Balas dalam 1–2 hari</div>
          </div>
        </div>
        <CopyEmail />
      </div>

      <h2>Media sosial</h2>
      <ul className="flex flex-wrap gap-3">
        <li>
          <a
            href="https://github.com/YAWUAN?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost no-underline"
          >
            <GithubIcon /> GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/yutaaa.ei/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost no-underline"
          >
            <InstagramIcon /> Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/yuanadi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost no-underline"
          >
            <LinkedinIcon /> LinkedIn
          </a>
        </li>
      </ul>
    </>
  );
}
