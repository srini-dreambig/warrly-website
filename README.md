# Warrly website

Marketing site for [Warrly](https://www.warrly.in) — warranty vault for Indian households and teams.

## Stack

- Vite + React + TypeScript
- React Router
- Deployed on Vercel

## Local development

```bash
npm install
cp .env.example .env   # optional overrides
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

`prebuild` regenerates `public/sitemap.xml` from all marketing routes.

## Vercel

1. Import this repo in Vercel (root = repository root).
2. Framework preset: Vite (or leave auto).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variables from `.env.example` (especially `VITE_SITE_URL`).

`vercel.json` handles SPA rewrites so deep links like `/privacy` and `/business/sites` work.

## SEO

- Per-route titles/descriptions via `react-helmet-async` (`src/components/Seo.tsx`)
- `public/robots.txt` + generated `public/sitemap.xml`
- Open Graph / Twitter cards + JSON-LD in `index.html` (defaults) and Helmet (per page)
- Brand assets under `public/brand/`

## Notes

- Do not commit `.env` (secrets / deploy-specific URLs).
- App binary / backend live in a separate repository — this repo is website-only.
