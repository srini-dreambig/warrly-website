/**
 * Writes public/sitemap.xml from marketing routes.
 * Run before vite build so crawlers get a complete map.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const siteUrl = (process.env.VITE_SITE_URL || "https://www.warrly.in").replace(/\/$/, "");

const staticPaths = [
  "/",
  "/plans",
  "/download",
  "/waitlist",
  "/about",
  "/faq",
  "/investors",
  "/contact",
  "/privacy",
  "/terms",
  "/referral",
];

const featurePaths = [
  "/personal",
  "/personal/items",
  "/personal/receipts",
  "/personal/documents",
  "/personal/household",
  "/personal/reminders",
  "/personal/expiring",
  "/personal/coverage",
  "/personal/claims",
  "/personal/evidence",
  "/personal/claims-inbox",
  "/personal/camera-extract",
  "/personal/email-inbox",
  "/personal/manual-entry",
  "/security",
  "/security/export",
  "/business",
  "/business/vault",
  "/business/sites",
  "/business/asset-tags",
  "/business/vendors",
  "/business/vendor-portal",
  "/business/service-logs",
  "/business/book-value",
  "/business/audits",
  "/business/depreciation",
];

const paths = [...new Set([...staticPaths, ...featurePaths])];
const lastmod = new Date().toISOString().slice(0, 10);

const body = paths
  .map((path) => {
    const loc = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
    const priority = path === "/" ? "1.0" : path.split("/").length <= 2 ? "0.8" : "0.6";
    const changefreq = path === "/" || path === "/plans" ? "weekly" : "monthly";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`Wrote sitemap.xml with ${paths.length} URLs → ${siteUrl}`);
