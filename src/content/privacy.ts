export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const privacyMeta = {
  title: "Privacy policy",
  lead:
    "Warrly stores invoices, serial numbers, household membership, and workspace asset records. This policy explains what we collect, why we process it, who can see it, and the controls you have — written for a product that treats warranty proof as sensitive customer data.",
  effectiveDate: "24 July 2026",
  version: "2026.07",
};

export const privacySections: LegalSection[] = [
  {
    id: "who",
    title: "1. Who we are",
    blocks: [
      {
        type: "p",
        text: "Warrly is operated by Dataplexor (“we”, “us”, “our”). We provide a warranty vault for households and business workspaces, with an India-first launch market. For privacy and data-protection requests, contact us at the email published on our Contact page (default: info@dataplexor.com).",
      },
      {
        type: "p",
        text: "This policy covers the Warrly mobile apps, web app, marketing site, and related services that store or process vault data. Product behaviour for export and delete is also described on our Security pages.",
      },
      {
        type: "note",
        text: "This document is a public-facing privacy notice for users and prospects. It is not a substitute for advice from qualified counsel. We will refine it as product features, processors, and jurisdictions expand.",
      },
    ],
  },
  {
    id: "scope",
    title: "2. Scope of this notice",
    blocks: [
      {
        type: "p",
        text: "This notice applies when you create an account, upload vault content, invite household or workspace members, use claim workflows, interact with vendor-portal invites (business), or visit our marketing site.",
      },
      {
        type: "ul",
        items: [
          "Personal vaults — household items, documents, reminders, claims",
          "Business workspaces — sites, assets, vendors, service logs, reports",
          "Account and billing signals needed to operate Free / Plus / Pro",
          "Support and investor inquiries you send by email",
        ],
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "3. Data we collect",
    blocks: [
      {
        type: "p",
        text: "We collect only what is needed to run a warranty vault. Categories include:",
      },
      {
        type: "ul",
        items: [
          "Account data — name, email, authentication identifiers, plan tier, and workspace membership roles",
          "Vault content you choose to store — item fields (brand, model, serial, purchase date, price, warranty terms), document files (invoices, warranty cards, serial photos, PDFs), notes, claim drafts, evidence packs, and service logs",
          "Household and workspace structure — invite codes, member lists, sites, departments, asset tags, vendor contacts",
          "Communications — messages you send to support, and transactional notices we send about the product",
          "Technical and usage data — device type, app version, approximate diagnostics, security logs, and interaction events needed to operate, secure, and improve the service",
          "Payment metadata — processed by Apple, Google, or other storefronts when you buy Plus/Pro; we receive entitlement signals, not your full card number",
        ],
      },
      {
        type: "note",
        text: "Vault content can include financial and identity-adjacent documents (for example GST invoices and serial numbers). Treat uploads intentionally. Do not store government ID scans or unrelated sensitive files in the vault unless you accept that they will be processed as vault content under this policy.",
      },
    ],
  },
  {
    id: "sources",
    title: "4. How data enters Warrly",
    blocks: [
      {
        type: "ul",
        items: [
          "Directly from you — camera, gallery, PDF upload, manual entry, claim forms, and settings",
          "From people you invite — household members or workspace colleagues who add items and documents",
          "From email forwards — when you send invoices to a Warrly capture address (where email ingest is configured)",
          "From vendors you invite (business) — service-log submissions through a time-bounded portal token",
          "From devices and infrastructure — security and reliability telemetry typical of cloud software",
        ],
      },
    ],
  },
  {
    id: "purposes",
    title: "5. Why we process data (purposes)",
    blocks: [
      {
        type: "p",
        text: "We process personal data to:",
      },
      {
        type: "ul",
        items: [
          "Provide the core product — capture, confirm-before-save extract, inventory, reminders, coverage status, claims tooling, and business ops features you enable",
          "Secure accounts and vaults — authentication, abuse prevention, scoped access enforcement, and incident response",
          "Operate plans — Free limits, Plus/Pro entitlements, and storefront subscription state",
          "Communicate — service notices, security messages, and product updates you can reasonably expect as a user",
          "Improve reliability — aggregated diagnostics and product analytics that help us fix failures (not selling vault contents)",
          "Comply with law — respond to lawful requests and enforce our Terms",
        ],
      },
      {
        type: "p",
        text: "We do not sell your vault contents as a data product. We do not use your invoices to build advertising profiles for third-party ad networks.",
      },
    ],
  },
  {
    id: "legal-bases",
    title: "6. Legal bases (India DPDP-oriented)",
    blocks: [
      {
        type: "p",
        text: "Our launch market is India. Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and rules as they apply, we rely on:",
      },
      {
        type: "ul",
        items: [
          "Consent — for voluntary uploads and optional features you turn on",
          "Contractual necessity — to deliver the vault, reminders, sharing, and plan features you request",
          "Legitimate uses permitted by law — such as employment/business contexts inside a workspace you administer, security, fraud prevention, and certain compliance needs",
          "Employment / business purpose where you are a workspace admin processing colleague or vendor-related operational data inside your organisation’s instructions",
        ],
      },
      {
        type: "p",
        text: "Where consent is the basis, you may withdraw it by deleting content, leaving a household/workspace, or closing your account — noting that some processing may continue where another lawful basis applies (for example security logs for a limited period).",
      },
    ],
  },
  {
    id: "sharing",
    title: "7. Who can see your data",
    blocks: [
      {
        type: "p",
        text: "Access is scoped by design:",
      },
      {
        type: "ul",
        items: [
          "You — full access to your personal vault within product controls",
          "Household members you invite — shared visibility of the household vault",
          "Workspace members you invite — access according to business membership",
          "Vendors you invite (business portal) — time-bounded, asset-scoped context and service-log submission — not your entire estate by default",
          "Processors — infrastructure and service providers who help us host, deliver email, extract text, send notifications, or process subscriptions under contractual obligations",
          "Authorities — when required by applicable law, following a lawful request process",
        ],
      },
      {
        type: "p",
        text: "Warrly does not operate a universal manufacturer “file my claim for me” API. When you contact a brand, you choose what to send. Evidence packs are generated for you to share through brand channels.",
      },
    ],
  },
  {
    id: "processors",
    title: "8. Processors and subprocessors",
    blocks: [
      {
        type: "p",
        text: "We use carefully chosen service providers to run Warrly. Categories typically include:",
      },
      {
        type: "ul",
        items: [
          "Cloud hosting and object storage for application data and document blobs",
          "Email delivery and inbound ingest for transactional mail and invoice forwards",
          "Push notification providers for reminder delivery",
          "Optional model/OCR assistance for receipt field proposals (you confirm before save)",
          "App storefronts (Apple, Google) for identity of purchase and billing",
          "Error monitoring and analytics limited to operating and improving the service",
        ],
      },
      {
        type: "p",
        text: "Processors are bound to process data on our instructions and to apply appropriate security. A current subprocessor list can be requested at our support email for enterprise diligence.",
      },
    ],
  },
  {
    id: "transfers",
    title: "9. Cross-border processing",
    blocks: [
      {
        type: "p",
        text: "Infrastructure may process or store data in regions outside India depending on hosting configuration. Where cross-border transfers occur, we use contractual and organisational safeguards appropriate to the risk and to applicable Indian law.",
      },
      {
        type: "p",
        text: "If you require India-only residency for a business deployment, contact us before rollout — residency is a deployment choice, not an assumed default for every environment.",
      },
    ],
  },
  {
    id: "retention",
    title: "10. Retention",
    blocks: [
      {
        type: "ul",
        items: [
          "Vault content — retained until you delete the item/document or close the account, subject to short backup windows",
          "Account data — retained while the account is active; deleted or anonymised after closure according to product delete flows",
          "Security and audit logs — retained for a limited period needed to investigate abuse and secure the service",
          "Billing entitlements — retained as required for storefront reconciliation and accounting",
          "Support emails — retained as needed to resolve your request and maintain a minimal service record",
        ],
      },
      {
        type: "p",
        text: "Backups may lag live deletes by a short operational window. After that window, deleted vault content is not kept for product use.",
      },
    ],
  },
  {
    id: "security",
    title: "11. Security measures",
    blocks: [
      {
        type: "p",
        text: "We apply layered controls proportionate to a vault that holds financial documents:",
      },
      {
        type: "ul",
        items: [
          "Account authentication and session controls",
          "Authorisation scoped to personal, household, and workspace boundaries",
          "Encrypted transport (HTTPS/TLS) for client–server communication",
          "Access logging and operational monitoring for abuse and reliability",
          "Least-privilege practices for staff access to production systems",
          "Document and account deletion paths you can trigger from the product",
        ],
      },
      {
        type: "note",
        text: "We do not claim SOC 2, ISO 27001, or similar certifications on this site unless and until they are formally attained. Security is described by controls we ship — not by badges we have not earned.",
      },
    ],
  },
  {
    id: "rights",
    title: "12. Your rights and controls",
    blocks: [
      {
        type: "p",
        text: "Depending on applicable law (including the DPDP Act for individuals in India), you may have rights to:",
      },
      {
        type: "ul",
        items: [
          "Access — know what personal data we hold about you",
          "Correction — fix inaccurate account or vault fields",
          "Erasure — delete items, documents, or your account as the product allows",
          "Data portability — export your data (JSON export and document/claim pack exports)",
          "Withdraw consent — stop optional processing by disabling features or deleting content",
          "Grievance redressal — raise a privacy complaint to our contact email",
        ],
      },
      {
        type: "p",
        text: "In-product controls: edit item fields; delete documents; leave household/workspace; export my data; delete account. See Export & delete and How we protect data for behaviour detail.",
      },
      {
        type: "p",
        text: "To exercise rights that are not available in-app, email us with the subject “Warrly privacy request” and enough detail to verify the account. We will respond within a reasonable period consistent with applicable law.",
      },
    ],
  },
  {
    id: "children",
    title: "13. Children",
    blocks: [
      {
        type: "p",
        text: "Warrly is intended for adults who manage purchases and business assets. We do not knowingly create accounts for children. If you believe a child has provided personal data, contact us and we will take appropriate steps to delete it.",
      },
    ],
  },
  {
    id: "cookies",
    title: "14. Cookies and similar technologies",
    blocks: [
      {
        type: "p",
        text: "The marketing site and web app may use necessary cookies for session integrity and security, and limited analytics cookies or similar technologies to understand site performance. You can control cookies through your browser settings. Essential cookies may be required for login and security features to work.",
      },
    ],
  },
  {
    id: "automated",
    title: "15. Automated processing and extract",
    blocks: [
      {
        type: "p",
        text: "Receipt extract may use optical character recognition, heuristics, and optional model assistance to propose fields such as brand, dates, and amounts. Proposals are drafts. You confirm before save. Reminders and claim packs inherit the confirmed record — not an unreviewed machine guess.",
      },
      {
        type: "p",
        text: "We do not make solely automated legal or credit decisions about you based on vault contents.",
      },
    ],
  },
  {
    id: "business-customers",
    title: "16. Business / workspace customers",
    blocks: [
      {
        type: "p",
        text: "If you administer a Pro workspace, you determine what asset and vendor data enters the workspace and who is invited. You are responsible for providing appropriate notices to your personnel and for using Warrly in line with your organisation’s policies and applicable law.",
      },
      {
        type: "p",
        text: "Where Dataplexor processes personal data on behalf of a business customer as a data processor / fiduciary relationship under contract, a separate data processing agreement may apply on request for qualified deployments.",
      },
    ],
  },
  {
    id: "changes",
    title: "17. Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy as the product, processors, or law changes. We will revise the effective date above and, for material changes, provide additional notice through the app or email when appropriate. Continued use after notice constitutes acceptance of the updated policy where permitted by law.",
      },
    ],
  },
  {
    id: "contact",
    title: "18. Contact and grievance",
    blocks: [
      {
        type: "p",
        text: "Privacy and grievance contact: email the address on our Contact page with subject “Warrly privacy request” or “Warrly grievance”. Include your account email and a clear description of the request.",
      },
      {
        type: "p",
        text: "Related pages: Security (how we protect data), Export & delete, Terms of use, and Contact.",
      },
    ],
  },
];
