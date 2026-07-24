/** Store / download / waitlist targets — override via VITE_* env for each deploy. */
const siteUrl = (import.meta.env.VITE_SITE_URL || "https://www.warrly.in").replace(/\/$/, "");

/** Set VITE_APP_LIVE=true when stores / web app are publicly available. */
const appLive = import.meta.env.VITE_APP_LIVE === "true";

export const config = {
  siteName: "Warrly",
  siteUrl,
  appLive,
  /** Primary QR / CTA destination — waitlist until the app is live */
  waitlistUrl: `${siteUrl}/waitlist`,
  downloadUrl: appLive
    ? import.meta.env.VITE_DOWNLOAD_URL || `${siteUrl}/download`
    : import.meta.env.VITE_DOWNLOAD_URL || `${siteUrl}/waitlist`,
  getAppPath: appLive ? "/download" : "/waitlist",
  getAppLabel: appLive ? "Download free" : "Join the waitlist",
  getAppCta: appLive ? "Download Warrly" : "Join the waitlist",
  appStoreUrl:
    import.meta.env.VITE_APP_STORE_URL || "https://apps.apple.com/app/warrly",
  playStoreUrl:
    import.meta.env.VITE_PLAY_STORE_URL ||
    "https://play.google.com/store/apps/details?id=com.warrly.app",
  webAppUrl: import.meta.env.VITE_WEB_APP_URL || "https://app.warrly.app",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "info@dataplexor.com",
};
