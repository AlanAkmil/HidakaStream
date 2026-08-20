# HidakaStream

Web index pencarian channel streaming, ngambil data dari tbcpl.lol (port dari CLI scraper ke API route Next.js).

## Jalanin lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur penting

- `app/api/scrape/route.ts` — endpoint `GET /api/scrape?q=<keyword>`, scrape + filter tbcpl.lol
- `lib/scraper.ts` — logic fetch & parsing HTML (regex sama kayak CLI aslinya) + cache 5 menit di memory
- `lib/utils.ts` — heuristik kategori (Sports/Live TV/Movies/News/General) berdasarkan nama & url
- `app/page.tsx` — halaman utama, search + filter kategori, fetch ke `/api/scrape`

## Catatan deploy (Vercel)

Cache hasil scrape sekarang cuma in-memory per instance (hilang tiap cold start / redeploy). Kalau mau lebih awet di serverless, gampang tinggal ganti ke KV/Upstash Redis — bilang aja kalau mau gua tambahin.
