# Deploy Warrly website (Vercel)

## One-time

1. Push this repo to GitHub (`srini-dreambig/warrly-website`).
2. In [Vercel](https://vercel.com): **Add New Project** → import `warrly-website`.
3. Settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Environment variables (Production):

```
VITE_SITE_URL=https://www.warrly.in
VITE_DOWNLOAD_URL=https://www.warrly.in/download
VITE_APP_STORE_URL=https://apps.apple.com/app/warrly
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.warrly.app
VITE_WEB_APP_URL=https://app.warrly.app
VITE_SUPPORT_EMAIL=info@dataplexor.com
```

5. Add custom domain `www.warrly.in` (and apex if needed) in Vercel → Domains.
6. After go-live, submit `https://www.warrly.in/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Verify

- `/` loads
- `/privacy`, `/personal/claims`, `/business/sites` deep-link without 404
- `/robots.txt` and `/sitemap.xml` return text/xml
- View source shows title + description; client navigation updates them
- OG image resolves: `/brand/illustrations/welcome_account.png`
