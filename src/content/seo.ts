import { featurePages } from "./features";
import { config } from "../config";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

const DEFAULT_OG = "/brand/illustrations/welcome_account.png";

export const defaultSeo = {
  siteName: "Warrly",
  title: "Every warranty, kept | Warrly",
  description:
    "Warrly is the warranty vault for Indian households and teams. Capture GST bills and e-comm invoices, track coverage, get reminders before expiry, and assemble claim-ready evidence.",
  ogImage: DEFAULT_OG,
  twitterHandle: "",
  locale: "en_IN",
};

export const staticPagesSeo: PageSeo[] = [
  {
    path: "/",
    title: "Every warranty, kept | Warrly",
    description: defaultSeo.description,
  },
  {
    path: "/plans",
    title: "Plans — Free, Plus & Pro | Warrly",
    description:
      "Compare Free, Plus, and Pro. Start with 5 free items, then unlock higher limits and business tooling for multi-site teams.",
  },
  {
    path: "/waitlist",
    title: "Join the Warrly waitlist",
    description:
      "The Warrly app is launching soon. Join the waitlist with your name, email, phone, and platform preference so we can notify you at launch.",
  },
  {
    path: "/download",
    title: "Download Warrly | iOS, Android & Web",
    description:
      "Get Warrly on iPhone, Android, or the web. Capture receipts, track warranties, and stay claim-ready.",
  },
  {
    path: "/about",
    title: "About Warrly — make warranty proof impossible to lose",
    description:
      "Warrly is built by Dataplexor for Indian households and teams. Learn our mission, data-stewardship principles, and product standards.",
  },
  {
    path: "/faq",
    title: "FAQs | Warrly",
    description:
      "Answers about the vault, Free / Plus / Pro, capture, claims, privacy, and how Warrly helps keep warranty proof ready.",
  },
  {
    path: "/investors",
    title: "For Investors | Warrly",
    description:
      "Investor overview for Warrly — the warranty vault with an India-first launch market. Mission, market, product, and go-to-market.",
  },
  {
    path: "/contact",
    title: "Contact Warrly",
    description:
      "Reach Warrly for product help, privacy requests, security reports, Pro pilots, or investor inquiries.",
  },
  {
    path: "/privacy",
    title: "Privacy policy | Warrly",
    description:
      "How Warrly collects, uses, shares, and protects vault data — written for a product that stores invoices, serials, and household records.",
  },
  {
    path: "/terms",
    title: "Terms of use | Warrly",
    description:
      "Terms governing use of the Warrly warranty vault for households and business workspaces.",
  },
  {
    path: "/referral",
    title: "Share Warrly | Invite friends & family",
    description:
      "Invite people who also lose bills. Start free with five items, then grow capacity with Plus or Pro.",
  },
];

export function absoluteUrl(path: string) {
  const base = config.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base + "/";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteAsset(path: string) {
  if (path.startsWith("http")) return path;
  return absoluteUrl(path);
}

export function resolvePageSeo(pathname: string): PageSeo {
  const staticHit = staticPagesSeo.find((p) => p.path === pathname);
  if (staticHit) {
    return { ...staticHit, ogImage: staticHit.ogImage || DEFAULT_OG };
  }

  const feature = featurePages.find((p) => p.path === pathname);
  if (feature) {
    return {
      path: feature.path,
      title: `${feature.title} | Warrly`,
      description: feature.lead,
      ogImage: feature.image || DEFAULT_OG,
    };
  }

  return {
    path: pathname,
    title: defaultSeo.title,
    description: defaultSeo.description,
    ogImage: DEFAULT_OG,
  };
}

/** All indexable paths for sitemap generation */
export function allIndexablePaths(): string[] {
  const paths = new Set<string>([
    ...staticPagesSeo.filter((p) => !p.noindex).map((p) => p.path),
    ...featurePages.map((p) => p.path),
  ]);
  return Array.from(paths).sort((a, b) => a.localeCompare(b));
}
