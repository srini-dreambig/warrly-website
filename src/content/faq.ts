export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "What is Warrly?",
        a: "Warrly is a warranty vault for Indian households and teams. You capture proof at purchase, track coverage windows, get reminders before expiry, and assemble claim-ready evidence when something fails.",
      },
      {
        q: "Is Warrly free?",
        a: "Yes to start. Free includes 5 items, capture, reminders, and basic claims — no card required. Plus and Pro are yearly in-app upgrades for higher limits and business tooling. Live prices appear in the storefront.",
      },
      {
        q: "Where can I download it?",
        a: "The app is launching soon. Join the waitlist on this site (scan the QR or open Waitlist). When iOS, Android, and web go live, we will email everyone on the list — then Download will open the stores directly.",
      },
    ],
  },
  {
    title: "How it works",
    items: [
      {
        q: "What should I capture?",
        a: "The purchase proof: GST bill, e-comm invoice PDF, packing slip, serial photo, and any warranty card. The easiest moment is right after you buy — Flipkart, Amazon, showroom, or UPI checkout.",
      },
      {
        q: "How do reminders work?",
        a: "Warrly reminds you at 30, 7, and 1 day before a warranty ends so you can renew, claim, or replace while coverage is still alive. You can snooze or mark done from the reminder.",
      },
      {
        q: "What is a claim pack?",
        a: "A claim pack assembles a claim letter, item identity, and invoice imagery from the vault so you are not hunting files when a service centre asks for proof. Warrly does not file claims through a universal OEM API — you still submit via the brand’s channels.",
      },
    ],
  },
  {
    title: "Plans",
    items: [
      {
        q: "When should I choose Plus or Pro?",
        a: "Plus is for households that outgrow free capacity and want richer sharing and vault limits. Pro is for teams that need sites, QR tags, vendors, audits, and book-value / depreciation exports.",
      },
      {
        q: "Why are Plus / Pro prices shown as “in-app”?",
        a: "Checkout prices are finalized in the app storefront for your region. Marketing pages describe capability tiers; the live price appears at purchase.",
      },
      {
        q: "Do referrals unlock extra item slots?",
        a: "Referral invites help friends discover Warrly. Free capacity is defined by the in-app Free tier (starting at 5 items). Use Plus or Pro when you need higher limits — do not rely on marketing claims of automatic +1 unlocks unless shown in the live app.",
      },
    ],
  },
  {
    title: "Privacy, security & your data",
    items: [
      {
        q: "What kind of data does Warrly hold?",
        a: "Account details, vault content you upload (invoices, serials, item fields), household/workspace membership, and technical data needed to run the service. We treat warranty documents as sensitive customer data.",
      },
      {
        q: "Do you sell vault contents?",
        a: "No. We do not sell your invoices or serials as a data product, and we do not build third-party advertising profiles from vault contents.",
      },
      {
        q: "How do I export or delete my data?",
        a: "Use in-app export and delete controls, or see Export & delete. For rights requests under Indian DPDP-oriented paths, email a privacy request from the Contact page.",
      },
      {
        q: "Are you SOC 2 / ISO certified?",
        a: "We describe controls we ship — scoped vaults, TLS, export, delete — and do not advertise compliance badges we have not earned.",
      },
    ],
  },
  {
    title: "Business & company",
    items: [
      {
        q: "Can businesses use Warrly?",
        a: "Yes. Pro workspaces support multi-site vaults, QR asset tags, vendors, service logs, and finance-ready exports — on the same product family as the household vault.",
      },
      {
        q: "Is Warrly insurance or legal advice?",
        a: "No. Warrly helps you keep warranty proof and coverage dates organized. It does not sell insurance policies or provide legal advice.",
      },
      {
        q: "How do I contact the team?",
        a: "Use the Contact page paths for support, privacy, security, Pro, or investors. Default email: info@dataplexor.com (or the address configured for your deploy).",
      },
    ],
  },
];
