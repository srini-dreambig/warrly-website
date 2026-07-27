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
VITE_DOWNLOAD_URL=https://www.warrly.in/waitlist
VITE_APP_LIVE=false
VITE_WEBAPP_ENABLED=true
VITE_API_URL=https://api.warrly.app
VITE_APP_STORE_URL=https://apps.apple.com/app/warrly
VITE_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.warrly.app
VITE_WEB_APP_URL=https://app.warrly.app
VITE_SUPPORT_EMAIL=info@dataplexor.com
WAITLIST_NOTIFY_EMAIL=info@dataplexor.com
# optional:
# WAITLIST_WEBHOOK_URL=https://...
# DATABASE_URL=postgresql://...   # Neon — creates website_waitlist on first signup
```

5. Add custom domain `www.warrly.in` (and apex if needed) in Vercel → Domains.
6. After go-live, submit `https://www.warrly.in/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Waitlist (until the app is live)

`VITE_APP_LIVE` defaults to off. QR codes and Download CTAs go to `/waitlist`.

Serverless endpoint: `POST /api/waitlist` (`api/waitlist.js`).

On first FormSubmit delivery, confirm the activation email sent to `WAITLIST_NOTIFY_EMAIL`. After that, each signup arrives as email with a JSON payload you can import later.

When stores ship, set `VITE_APP_LIVE=true` and point `VITE_DOWNLOAD_URL` back to `/download` (or store smart-link).

## Web vault (same Neon backend)

With `VITE_WEBAPP_ENABLED=true` (default):

- **Log in** → `/login` (register at `/register`)
- Authenticated inventory → `/app` (item detail `/app/items/:id`)
- Calls `VITE_API_URL` (`https://api.warrly.app`) with Bearer tokens

**Required on the API host:** add every marketing origin to `CORS_ORIGINS`, e.g.

```
CORS_ORIGINS=https://www.warrly.in,https://warrly.in,https://warrly.vercel.app
```

Without those origins, the browser will block login/register/vault requests.

Set `VITE_WEBAPP_ENABLED=false` to send **Log in** to `/waitlist` instead.

## Verify

- `/` loads
- `/waitlist` form submits with a clear human-readable error if something fails (never `[object Object]`)
- `/login` → register → `/app` loads stats/items (empty vault is OK)
- `/privacy`, `/personal/claims`, `/business/sites` deep-link without 404
- `/robots.txt` and `/sitemap.xml` return text/xml
- OG image resolves: `/brand/illustrations/welcome_account.png`
