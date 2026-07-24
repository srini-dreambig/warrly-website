/** Store / download targets — override via VITE_* env for each deploy. */
export const config = {
  siteName: "Warrly",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://www.warrly.in",
  /** Smart download / landing URL encoded in QR codes */
  downloadUrl:
    import.meta.env.VITE_DOWNLOAD_URL ||
    `${(import.meta.env.VITE_SITE_URL || "https://www.warrly.in").replace(/\/$/, "")}/download`,
  appStoreUrl:
    import.meta.env.VITE_APP_STORE_URL ||
    "https://apps.apple.com/app/warrly",
  playStoreUrl:
    import.meta.env.VITE_PLAY_STORE_URL ||
    "https://play.google.com/store/apps/details?id=com.warrly.app",
  webAppUrl: import.meta.env.VITE_WEB_APP_URL || "https://app.warrly.app",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "info@dataplexor.com",
};
