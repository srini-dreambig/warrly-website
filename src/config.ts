/** Store / download / waitlist / API targets — override via VITE_* env for each deploy. */
const siteUrl = (import.meta.env.VITE_SITE_URL || "https://www.warrly.in").replace(/\/$/, "");
const appUrl = (import.meta.env.VITE_APP_URL || "https://app.warrly.in").replace(/\/$/, "");

/** Set VITE_APP_LIVE=true when stores / native apps are publicly available. */
const appLive = import.meta.env.VITE_APP_LIVE === "true";

/** Web vault against the same FastAPI + Neon backend. Default on. */
const webAppEnabled = import.meta.env.VITE_WEBAPP_ENABLED !== "false";

export const config = {
  siteName: "Warrly",
  siteUrl,
  /** Product vault origin (dashboard). */
  appUrl,
  appLive,
  webAppEnabled,
  apiUrl: (import.meta.env.VITE_API_URL || "https://warrly-api.onrender.com").replace(/\/$/, ""),
  /** Primary QR / CTA destination — waitlist until the app is live */
  waitlistUrl: `${siteUrl}/waitlist`,
  downloadUrl: appLive
    ? import.meta.env.VITE_DOWNLOAD_URL || `${siteUrl}/download`
    : import.meta.env.VITE_DOWNLOAD_URL || `${siteUrl}/waitlist`,
  getAppPath: appLive ? "/download" : "/waitlist",
  getAppLabel: appLive ? "Download free" : "Join the waitlist",
  getAppCta: appLive ? "Download Warrly" : "Join the waitlist",
  loginPath: webAppEnabled ? `${appUrl}/login` : "/waitlist",
  appStoreUrl:
    import.meta.env.VITE_APP_STORE_URL || "https://apps.apple.com/app/warrly",
  playStoreUrl:
    import.meta.env.VITE_PLAY_STORE_URL ||
    "https://play.google.com/store/apps/details?id=com.warrly.app",
  /** Prefer app subdomain vault when enabled */
  webAppUrl: webAppEnabled ? `${appUrl}/login` : import.meta.env.VITE_WEB_APP_URL || `${appUrl}/login`,
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "info@dataplexor.com",
};
