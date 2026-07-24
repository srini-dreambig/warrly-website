import type { LegalSection } from "./privacy";

export const termsMeta = {
  title: "Terms of use",
  lead:
    "These terms govern access to Warrly — a warranty vault that stores purchase proof, coverage dates, and claim workflows for households and business workspaces. By creating an account or using the service, you agree to them.",
  effectiveDate: "24 July 2026",
  version: "2026.07",
};

export const termsSections: LegalSection[] = [
  {
    id: "agreement",
    title: "1. Agreement to these terms",
    blocks: [
      {
        type: "p",
        text: "These Terms of use (“Terms”) are an agreement between you and Dataplexor, operator of Warrly (“Warrly”, “we”, “us”). If you use Warrly on behalf of an organisation, you represent that you have authority to bind that organisation, and “you” includes that organisation.",
      },
      {
        type: "p",
        text: "If you do not agree, do not create an account or upload documents. Our Privacy policy explains how we handle personal data.",
      },
      {
        type: "note",
        text: "These Terms are a public product agreement. They are not a substitute for legal advice. Enterprise customers may require a negotiated order form or data processing addendum.",
      },
    ],
  },
  {
    id: "service",
    title: "2. The service",
    blocks: [
      {
        type: "p",
        text: "Warrly helps you capture and organise warranty-related records, track coverage windows, receive reminders, assemble claim-oriented evidence, and — on business plans — manage sites, asset tags, vendors, service history, and related reports.",
      },
      {
        type: "ul",
        items: [
          "Features vary by Free, Plus, and Pro entitlements shown in-app",
          "Store pricing and subscription state control paid access",
          "We may improve, add, or retire features with reasonable notice when material",
          "Beta or preview features may be less stable and can change without notice",
        ],
      },
    ],
  },
  {
    id: "accounts",
    title: "3. Accounts and eligibility",
    blocks: [
      {
        type: "ul",
        items: [
          "You must provide accurate account information and keep credentials confidential",
          "You are responsible for activity under your account, household invites, and workspace memberships you administer",
          "Warrly is intended for adults; you must be legally able to enter this agreement in your jurisdiction",
          "Notify us promptly of unauthorised access you become aware of",
        ],
      },
    ],
  },
  {
    id: "your-content",
    title: "4. Your content and documents",
    blocks: [
      {
        type: "p",
        text: "You retain ownership of documents and data you upload (“Your Content”). You grant us a limited licence to host, process, transmit, display, and create operational derivatives (for example extract field proposals, reminders, and evidence PDFs) solely to provide and secure the service.",
      },
      {
        type: "ul",
        items: [
          "You must have the rights to upload Your Content",
          "You are responsible for the accuracy of dates, serials, and other fields you confirm",
          "Confirm-before-save extract proposals are drafts until you approve them",
          "Do not upload unlawful content, malware, or documents you are not allowed to share",
        ],
      },
      {
        type: "p",
        text: "Vault content may include financial documents. You decide what to store. We process it as product data under the Privacy policy — not as a public filing system.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable use",
    blocks: [
      {
        type: "p",
        text: "You agree not to:",
      },
      {
        type: "ul",
        items: [
          "Probe, scan, or breach security or authentication measures",
          "Interfere with or disrupt the service, or attempt unauthorised access to other vaults",
          "Use Warrly to store or distribute illegal content",
          "Misrepresent identity when inviting members or vendors",
          "Resell the service or scrape the product in a way that harms operations, except as allowed by a written agreement",
          "Use extract, messaging, or portal features to spam or harass third parties",
        ],
      },
      {
        type: "p",
        text: "We may suspend or terminate accounts that reasonably appear to violate these Terms or create risk for other customers.",
      },
    ],
  },
  {
    id: "sharing",
    title: "6. Households, workspaces, and vendors",
    blocks: [
      {
        type: "ul",
        items: [
          "Household sharing and workspace membership are invite-based; admins/owners control invites and removals within plan limits",
          "Members can see shared vault context according to product rules — invite carefully",
          "Business vendor portal access is time-bounded and scoped; you are responsible for which vendors you invite",
          "When a member leaves, revoke access promptly if they should no longer see documents",
        ],
      },
    ],
  },
  {
    id: "claims",
    title: "7. Claims tooling — important limits",
    blocks: [
      {
        type: "p",
        text: "Warrly helps you organise proof and draft communications. It does not:",
      },
      {
        type: "ul",
        items: [
          "Guarantee that a manufacturer, retailer, insurer, or authorised centre will accept a claim",
          "File claims automatically through a universal OEM or insurer API",
          "Provide legal, insurance, or tax advice",
          "Replace the brand’s own portals, policies, or eligibility rules",
        ],
      },
      {
        type: "p",
        text: "Evidence packs and claim messages are tools you choose to send. Outcomes remain with the counterparty.",
      },
    ],
  },
  {
    id: "plans",
    title: "8. Plans, trials, and billing",
    blocks: [
      {
        type: "ul",
        items: [
          "Free tiers include published limits (for example item caps and document limits)",
          "Plus and Pro are paid entitlements purchased through Apple, Google, or other authorised storefronts unless otherwise agreed in writing",
          "Prices, taxes, renewal, and cancellation follow the storefront’s terms and the in-app purchase screen",
          "We may change Free limits or paid entitlements prospectively with notice; material paid changes will respect applicable storefront rules",
        ],
      },
      {
        type: "p",
        text: "Unless required by law or storefront policy, fees are non-refundable once the billing period starts. Manage subscriptions in your App Store / Play account settings.",
      },
    ],
  },
  {
    id: "ip",
    title: "9. Warrly intellectual property",
    blocks: [
      {
        type: "p",
        text: "The Warrly product, branding, software, and documentation are owned by Dataplexor and its licensors. These Terms do not transfer ownership to you. You may not copy, reverse engineer (except where prohibited by law), or create derivative works of the service except as allowed by a separate written licence.",
      },
    ],
  },
  {
    id: "third-parties",
    title: "10. Third-party services",
    blocks: [
      {
        type: "p",
        text: "The service may link to brand support sites, storefronts, or other third parties. Their terms and privacy practices apply to those services. Warrly is not responsible for third-party sites or for manufacturer decisions.",
      },
    ],
  },
  {
    id: "disclaimer",
    title: "11. Disclaimers",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by law, Warrly is provided “as is” and “as available.” We do not warrant uninterrupted or error-free operation, perfect extract accuracy, or that reminders will overcome device notification settings you disable.",
      },
      {
        type: "p",
        text: "Protected value and book-value figures are derived from data you enter and configured methods — they are not appraisals or audited financial statements.",
      },
    ],
  },
  {
    id: "liability",
    title: "12. Limitation of liability",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by applicable law, Dataplexor and its affiliates will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost data, or claim denials by third parties, arising from your use of Warrly.",
      },
      {
        type: "p",
        text: "Our aggregate liability for claims relating to the service in any twelve-month period is limited to the greater of (a) amounts you paid us for Warrly entitlements in that period (excluding app-store commissions where not received by us), or (b) INR 5,000 — except where liability cannot be limited under applicable law (including proven wilful misconduct where such carve-outs apply).",
      },
    ],
  },
  {
    id: "indemnity",
    title: "13. Indemnity",
    blocks: [
      {
        type: "p",
        text: "You will defend and indemnify Dataplexor against claims arising from Your Content, your misuse of the service, or your violation of these Terms or applicable law, except to the extent caused by our wilful misconduct.",
      },
    ],
  },
  {
    id: "suspension",
    title: "14. Suspension and termination",
    blocks: [
      {
        type: "ul",
        items: [
          "You may stop using Warrly at any time and delete data as the product allows",
          "We may suspend or terminate access for violations, legal risk, non-payment of entitlements, or prolonged inactivity on Free accounts after notice where reasonable",
          "After termination, your licence to access the service ends; clauses that should survive (IP, disclaimers, liability, indemnity, governing law) continue",
        ],
      },
    ],
  },
  {
    id: "law",
    title: "15. Governing law and disputes",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of India, without regard to conflict-of-law rules. Courts in India shall have exclusive jurisdiction, subject to any mandatory consumer protections that apply to you personally.",
      },
      {
        type: "p",
        text: "Before filing a claim, please contact us and attempt good-faith resolution. Nothing in these Terms limits rights that cannot be waived under applicable consumer law.",
      },
    ],
  },
  {
    id: "changes",
    title: "16. Changes to these Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms as the product and law evolve. We will revise the effective date and provide notice for material changes through the app or email when appropriate. If you continue using Warrly after the effective date of updated Terms, you accept them where permitted by law. If you do not agree, stop using the service and delete your account.",
      },
    ],
  },
  {
    id: "contact",
    title: "17. Contact",
    blocks: [
      {
        type: "p",
        text: "Questions about these Terms: use the Contact page email with subject “Warrly terms”. Privacy questions belong under the Privacy policy grievance path. Security-sensitive reports should be marked “Warrly security”.",
      },
    ],
  },
];
