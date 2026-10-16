# Nexum

Platform belajar jaringan, sistem, dan infrastruktur IT. Dibuat oleh Yuan.

Fitur: materi ASJ & AIJ (MDX + kuis), roadmap karier (React Flow), chat AI (provider bisa diganti),
terminal simulasi, game (flashcard + Port Match), kalkulator subnet, pencarian Ctrl/Cmd+K, XP & badge,
mode terang/gelap.

## Cara menjalankan

1. Salin contoh konfigurasi (Windows CMD):

   ```
   copy .env.example .env.local
   ```

2. Isi key di `.env.local` (jangan pernah menaruh key asli di `.env.example`):

   ```
   AI_PROVIDER=google
   GOOGLE_GENERATIVE_AI_API_KEY=key_kamu
   GOOGLE_MODEL=gemini-3.8-flash
   NEXT_PUBLIC_CONTACT_EMAIL=emailmu@gmail.com
   ```

   Untuk memakai Anthropic, ubah `AI_PROVIDER=anthropic` dan isi `ANTHROPIC_API_KEY`.

3. Install dan jalankan:

   ```
   npm install
   npm run dev
   ```

4. Buka http://localhost:3000

## Jika PowerShell memblokir npm

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

## Menambah materi

Buat file `.mdx` di `content/asj` atau `content/aij` dengan frontmatter `title`, `order`, dan `quiz`
(lihat contoh yang ada). Roadmap diedit di `content/roadmap/*.json`.

## Struktur

```
app/                 halaman (App Router)
  api/chat/route.ts  endpoint AI (multi-provider + fallback model)
  materi/[track]/    daftar bab & halaman baca
components/          UI (top bar, panel menu, hero, game, terminal, chat, dll.)
content/             materi MDX & data roadmap
lib/                 helper konten & penyimpanan localStorage
```

## Tema

Dua mode (terang "cream", gelap "wine") dikendalikan CSS variables di `app/globals.css`
dan `components/ThemeProvider.tsx`. Pilihan disimpan di `localStorage` (`nexum:theme`).

## Aksesibilitas

- Panel menu terkunci fokus saat terbuka, ditutup dengan Esc.
- Semua animasi berhenti otomatis saat `prefers-reduced-motion`.
- Ilustrasi dekoratif memakai `aria-hidden`.
