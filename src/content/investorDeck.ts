import { ART } from "../brand";
import { config } from "../config";

/**
 * Investor pitch deck.
 * Launch market = India (market, GTM, sizing). Investors = open audience.
 * No global software TAM. No fictional traction.
 */

export type DeckLayout =
  | "cover"
  | "agenda"
  | "problem"
  | "insight"
  | "solution"
  | "whyNow"
  | "market"
  | "product"
  | "model"
  | "gtm"
  | "compete"
  | "status"
  | "ask"
  | "sources";

export type DeckSlide = {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  layout: DeckLayout;
  image?: string;
  imageAlt?: string;
  hero?: { value: string; label: string; source?: string };
  stats?: { value: string; label: string; source?: string }[];
  costs?: { amount: string; title: string; detail: string }[];
  steps?: { n: string; title: string; body: string }[];
  tiers?: { name: string; price: string; points: string[]; accent?: boolean }[];
  market?: { label: string; value: string; math: string }[];
  rows?: { feature: string; others: string; warrly: string }[];
  bullets?: string[];
  body?: string;
  policy?: string;
  note?: string;
  ask?: { amount: string; use: string[] };
};

export const investorSlides: DeckSlide[] = [
  {
    id: "cover",
    section: "Confidential · Investor overview",
    title: "Warrly",
    subtitle: "The warranty vault for Indian households and teams",
    layout: "cover",
    image: ART.welcomeAccount,
    imageAlt: "Warrly",
    body: "Capture proof at purchase. Track coverage across brands. Assemble claim-ready evidence before the service centre asks for the bill.",
    bullets: ["Built by Dataplexor", "Launch market: India", "Free → Plus → Pro"],
  },
  {
    id: "agenda",
    section: "Agenda",
    title: "What we will cover",
    layout: "agenda",
    steps: [
      { n: "01", title: "The problem", body: "Invoices vanish. Claims fail. Families pay cash for repairs that should have been covered." },
      { n: "02", title: "Why now", body: "Phones + e-comm receipts already exist in India — coverage still does not." },
      { n: "03", title: "Market (India launch)", body: "Bottom-up sizing on households and extended-warranty demand — not global software TAM." },
      { n: "04", title: "Product & model", body: "Free → Plus → Pro, referral capacity, unit thesis in ₹." },
      { n: "05", title: "Path & ask", body: "Honest stage, near-term plan, what capital unlocks." },
    ],
  },
  {
    id: "problem",
    section: "Problem",
    title: "People lose the bill before the product fails",
    layout: "problem",
    image: ART.deckLostPaper,
    imageAlt: "Lost invoices and warranty paperwork",
    hero: {
      value: "70%",
      label: "failed to file a warranty claim because they could not find warranty details in time",
      source: "OnePoll survey · widely cited in warranty-management research",
    },
    stats: [
      {
        value: "28%",
        label: "have lost track of warranty information",
        source: "SquareTrade",
      },
      {
        value: "36%",
        label: "have thrown warranty documents away by mistake",
        source: "SquareTrade",
      },
      {
        value: "44%",
        label: "did not know how long their warranties lasted",
        source: "YouGov",
      },
    ],
    note: "In our India launch market this shows up as “no GST bill, no service” at authorised centres — even when coverage is still live.",
  },
  {
    id: "cost",
    section: "Problem",
    title: "When proof is missing, households pay cash",
    layout: "insight",
    image: ART.deckIndiaRepairs,
    imageAlt: "Appliance and phone repair costs in India",
    costs: [
      {
        amount: "₹6–12k",
        title: "Fridge major repair",
        detail: "Compressor / major part — typical cash outlay when warranty proof fails",
      },
      {
        amount: "₹8–15k",
        title: "LED TV major repair",
        detail: "Panel / board work often exceeds years of a Plus subscription",
      },
      {
        amount: "₹2–8k",
        title: "Smartphone repair",
        detail: "Screen / board — the most common “I thought it was still under warranty” moment",
      },
    ],
    stats: [
      {
        value: "~25%",
        label: "of warranty denials tied to documentation errors",
        source: "WorldMetrics",
      },
      {
        value: "~42%",
        label: "of claims fail for lack of valid documentation (reported)",
        source: "Digital warranty analyses",
      },
    ],
    note: "One avoided repair pays for years of Warrly. That is the unit thesis.",
  },
  {
    id: "solution",
    section: "Solution",
    title: "A system of record for every warranty in the house",
    layout: "solution",
    image: ART.welcomePersonal,
    imageAlt: "Capture into the Warrly vault",
    body: "Warrly turns a purchase into lasting coverage — starting with Indian households, then multi-site SMBs on the same product family.",
    steps: [
      { n: "1", title: "Capture", body: "Camera / PDF / email extract with human confirm" },
      { n: "2", title: "Track", body: "Coverage status + reminders at 30 / 7 / 1 day" },
      { n: "3", title: "Claim", body: "Invoice, serial, photos packed from the item record" },
      { n: "4", title: "Operate", body: "Business: sites, QR tags, vendors, book-value PDF" },
    ],
  },
  {
    id: "why-now",
    section: "Why now",
    title: "Purchase is already on the phone. Coverage still is not.",
    layout: "whyNow",
    image: ART.deckMobilePurchase,
    imageAlt: "Mobile purchase into warranty vault",
    stats: [
      {
        value: "85.5%",
        label: "of Indian households own at least one smartphone",
        source: "MoSPI CMS Telecom, 2025",
      },
      {
        value: "~$65B",
        label: "online smartphones + electronics & appliances (2024 basket)",
        source: "NITI Aayog Trade Watch",
      },
      {
        value: "35–40%",
        label: "of India e-commerce GMV is consumer electronics",
        source: "Credence / trade analyses",
      },
      {
        value: "~75–78%",
        label: "of India e-commerce journeys start on mobile",
        source: "India e-commerce industry analyses",
      },
    ],
    note: "The receipt is already digital in our launch market. The warranty lifecycle is not — that gap is the wedge.",
  },
  {
    id: "market",
    section: "Market",
    title: "India launch-market sizing — bottom-up",
    layout: "market",
    subtitle: "We size from Indian households and the extended-warranty / after-sales stack they already pay into — not a global enterprise software TAM.",
    market: [
      {
        label: "Demand pool",
        value: "$4.4B",
        math: "India extended warranty market (2025) · IMARC · ~9.6% CAGR to ~$10B by 2034",
      },
      {
        label: "After-sales stack",
        value: "$5.3B",
        math: "India after-sales / device protection services (FY24) · industry estimates via DQ India",
      },
      {
        label: "CE extended warranty",
        value: "$3.6B→$8.8B",
        math: "India consumer-electronics EW (2023→2032) · Credence · ~10.5% CAGR",
      },
      {
        label: "Durables growth",
        value: "~11% CAGR",
        math: "India consumer durables toward ~INR 3 lakh crore by FY29 · EY Vision 2030",
      },
    ],
    note: "Warrly does not “take” the EW market. We sit under it — the consumer/SMB layer that keeps proof alive so EW and OEM warranties can actually be used.",
  },
  {
    id: "som",
    section: "Market",
    title: "Launch-market math (directional)",
    layout: "market",
    subtitle: "Bottom-up thesis for the India product scope — labelled as directional, not an audited forecast.",
    market: [
      {
        label: "SAM",
        value: "~20–30M hh",
        math: "Urban / digitising households that buy multi-brand durables and feel invoice/warranty friction",
      },
      {
        label: "Near-term SOM",
        value: "0.5–1M users",
        math: "5-year active vault users if we win a low-single-digit % of SAM with free + referral loops",
      },
      {
        label: "Paid conversion",
        value: "5–10%",
        math: "Of actives converting to Plus / Pro once vaults exceed free capacity — target to prove in this raise",
      },
      {
        label: "Illustrative ARR",
        value: "₹6–15 Cr",
        math: "At ~50–100k paid × ~₹1,200–1,500 blended annual ARPU — a scale case, not a year-1 claim",
      },
    ],
    note: "We will diligence cohort retention and paid conversion before scaling paid acquisition.",
  },
  {
    id: "product",
    section: "Product",
    title: "One product family. Household → workspace.",
    layout: "product",
    image: ART.welcomeCorporate,
    imageAlt: "Business and household vault",
    steps: [
      { n: "Personal", title: "Household vault", body: "Phones, appliances, electronics — shared coverage for the family." },
      { n: "Business", title: "Pro workspace", body: "Sites, QR tags, vendors, service logs, depreciation exports." },
      { n: "Growth", title: "Referral capacity", body: "Free = 5 items. Each successful invite unlocks +1 slot." },
      { n: "Trust", title: "Claim packs", body: "Evidence assembled when the service centre asks — not after." },
    ],
  },
  {
    id: "model",
    section: "Model",
    title: "Land free. Monetize when the vault hurts to lose.",
    layout: "model",
    tiers: [
      {
        name: "Free",
        price: "₹0",
        points: ["5 items", "Reminders + basic claims", "+1 slot per referral", "Acquisition engine"],
      },
      {
        name: "Plus",
        price: "In-app",
        points: ["Higher limits", "Priority extract", "Household sharing", "Richer reminders"],
      },
      {
        name: "Pro",
        price: "In-app",
        accent: true,
        points: ["Sites & QR tags", "Vendors & audits", "Book value PDF", "Team workspaces"],
      },
    ],
    policy:
      "Free starts at 5 items. When an invited friend creates a vault, the referrer unlocks +1 item slot — no card required to begin. Referrals grow capacity; Plus / Pro unlock richer limits and business tooling.",
    note: "Unit thesis: one fridge or TV out-of-pocket repair (₹6–15k) can fund years of subscription.",
  },
  {
    id: "gtm",
    section: "Go-to-market",
    title: "Win at the purchase moment",
    layout: "gtm",
    image: ART.referral,
    imageAlt: "Referral growth",
    steps: [
      { n: "01", title: "Mobile capture", body: "Install where the Flipkart / Amazon / UPI receipt already lives." },
      { n: "02", title: "Pain conversion", body: "One denied service-centre visit turns a household into a vault habit." },
      { n: "03", title: "Referral loop", body: "Capacity unlocks = social distribution before paid CAC." },
      { n: "04", title: "SMB expand", body: "Same brand into clinics, cafés, offices needing QR + sites." },
    ],
  },
  {
    id: "compete",
    section: "Competition",
    title: "Default “solutions” store files. They do not run warranties.",
    layout: "compete",
    rows: [
      { feature: "Cross-brand household vault", others: "No — WhatsApp / Drive / Photos are files only", warrly: "Yes" },
      { feature: "Expiry reminders", others: "No — calendar hacks at best", warrly: "Yes · 30/7/1 day" },
      { feature: "Claim evidence pack", others: "Manual chase under stress", warrly: "Assembled from item" },
      { feature: "OEM / retailer apps", others: "Per-brand silos; die on switch", warrly: "Cross-brand" },
      { feature: "SMB sites + QR tags", others: "Heavy EAM or spreadsheets", warrly: "Pro layer" },
    ],
    note: "Status quo = files and brand silos. Warrly = coverage lifecycle across brands.",
  },
  {
    id: "status",
    section: "Status",
    title: "Early-stage. Honest. Measurable.",
    layout: "status",
    body: "Product and marketing surface are live. This raise is to prove retention and paid conversion in the India launch market — not to sell a fictional ARR chart.",
    steps: [
      { n: "Now", title: "Shipped", body: "Consumer + business vault flows · Free / Plus / Pro packaging · referral capacity." },
      { n: "Next 2 qtrs", title: "Prove", body: "Activation → first receipt → reminder value · cohort retention · Plus conversion · Pro design partners." },
      { n: "Then", title: "Scale", body: "Double down on channels that show payback · city density before national spray." },
    ],
    bullets: [
      "North-star metrics for diligence: D7/D30 retention, % vaults with ≥3 items, reminder open→action, Free→Plus conversion, referral invite→join rate",
      "We will not invent traction numbers for a public marketing deck",
    ],
  },
  {
    id: "ask",
    section: "The ask",
    title: "Prove the India habit — then expand monetisation",
    layout: "ask",
    image: ART.allClear,
    imageAlt: "Coverage clarity",
    body: "We are raising to turn warranty chaos into a retained habit in our India launch market — then expand monetisation on the same product.",
    ask: {
      amount: "Use of capital",
      use: [
        "Product: extract quality, claims packs, Hindi/regional UX polish",
        "Growth: organic + referral loops; measured paid tests in top cities",
        "Proof: analytics, cohort instrumentation, Pro design-partner program",
        "Team: India GTM and customer success capacity",
      ],
    },
    bullets: [
      `Email ${config.supportEmail} — subject: Warrly investor inquiry`,
      "Ask for a live product walkthrough (personal + business)",
      "Built by Dataplexor · EVERY WARRANTY, KEPT",
    ],
  },
  {
    id: "sources",
    section: "Appendix",
    title: "Selected references",
    layout: "sources",
    subtitle: "Third-party estimates vary by scope. Directional for diligence — not audited Warrly financials. Market figures are India launch market unless noted.",
    steps: [
      { n: "01", title: "IMARC", body: "India Extended Warranty ~USD 4.40B (2025); ~USD 10.04B by 2034; ~9.6% CAGR" },
      { n: "02", title: "Credence", body: "India CE Extended Warranty ~USD 3.58B (2023) → ~USD 8.80B (2032); ~10.5% CAGR" },
      { n: "03", title: "DQ India", body: "India after-sales / device protection stack ≈USD 5.3B (FY24)" },
      { n: "04", title: "EY Vision 2030", body: "India consumer durables ~11% CAGR; ~INR 3 lakh crore by FY29" },
      { n: "05", title: "MoSPI CMS Telecom 2025", body: "~85.5% of Indian households own a smartphone" },
      { n: "06", title: "NITI Aayog Trade Watch", body: "Online smartphones + electronics/appliances ≈USD 65B (2024 basket)" },
      { n: "07", title: "SquareTrade / OnePoll / YouGov", body: "Lost warranty docs, unknown duration, failed claims for missing details" },
      { n: "08", title: "WorldMetrics + claim analyses", body: "Documentation-linked denials ~25%; missing-doc claim failures ~42% (reported)" },
      { n: "09", title: "India repair cost guides", body: "Fridge ₹6–12k; TV ₹8–15k; smartphone ₹2–8k (major component ranges)" },
      { n: "10", title: "India e-comm analyses", body: "CE share of GMV ~35–40%; majority of journeys mobile-first (~75–78%)" },
    ],
  },
];
