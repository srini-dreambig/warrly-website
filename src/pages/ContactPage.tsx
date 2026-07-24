import { Link } from "react-router-dom";
import { config } from "../config";
import { CtaBand } from "../components/CtaBand";

type ContactLink = { to: string; label: string };
type MailAction = { href: string; label: string };
type RouteAction = { to: string; label: string };
type ContactAction = MailAction | RouteAction;

type ContactChannel = {
  title: string;
  body: string;
  action?: ContactAction;
  links?: ContactLink[];
  hint?: string;
};

const channels: ContactChannel[] = [
  {
    title: "Product & account help",
    body: "Vault questions, plan entitlements, household invites, or a walkthrough request. Include your account email and what you were trying to do.",
    action: { href: `mailto:${config.supportEmail}?subject=Warrly%20support`, label: config.supportEmail },
    hint: "Typical reply: within 1–2 business days.",
  },
  {
    title: "Privacy & data rights",
    body: "Access, correction, export help, erasure, or a DPDP-oriented grievance. We treat vault documents as sensitive customer data — use this path for rights requests.",
    action: {
      href: `mailto:${config.supportEmail}?subject=Warrly%20privacy%20request`,
      label: "Email a privacy request",
    },
    hint: "Subject: “Warrly privacy request” or “Warrly grievance”.",
    links: [
      { to: "/privacy", label: "Privacy policy" },
      { to: "/security/export", label: "Export & delete" },
    ],
  },
  {
    title: "Security reports",
    body: "Suspected unauthorised access, vulnerability reports, or something that does not look right with account login. Do not attach unnecessary vault documents in the first email.",
    action: {
      href: `mailto:${config.supportEmail}?subject=Warrly%20security`,
      label: "Report a security concern",
    },
    hint: "Subject: “Warrly security”.",
    links: [{ to: "/security", label: "How we protect data" }],
  },
  {
    title: "Business / Pro design partners",
    body: "Multi-site rollouts, vendor portal pilots, or finance reporting needs. Tell us your site count and what “Tuesday failure” looks like today.",
    action: {
      href: `mailto:${config.supportEmail}?subject=Warrly%20Pro%20inquiry`,
      label: "Talk about Pro",
    },
    links: [
      { to: "/business", label: "Business" },
      { to: "/plans#pro", label: "Pro plans" },
    ],
  },
  {
    title: "Investors",
    body: "For investor conversations, open the deck first, then email with subject “Warrly investor inquiry.”",
    action: { to: "/investors", label: "Investor overview" },
  },
  {
    title: "Legal & policies",
    body: "Terms, privacy, and product trust pages — written for a vault that holds invoices and household data.",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/faq", label: "FAQs" },
    ],
  },
];

function isMailAction(action: ContactAction): action is MailAction {
  return "href" in action;
}

export function ContactPage() {
  return (
    <main className="page">
      <section className="page-hero page-hero-solo">
        <div className="wrap page-hero-copy">
          <p className="page-eyebrow">Company</p>
          <h1>Contact Warrly</h1>
          <p className="lead">
            Product help, privacy rights, security reports, Pro pilots, or investor questions — pick the path that
            matches your request. For the fastest path into the product, download the app and start a vault.
          </p>
        </div>
      </section>

      <section className="capability-section">
        <div className="wrap contact-grid contact-grid-rich">
          {channels.map((c) => (
            <article className="contact-card" key={c.title}>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {c.action && isMailAction(c.action) ? (
                <a className="btn btn-forest" href={c.action.href}>
                  {c.action.label}
                </a>
              ) : null}
              {c.action && !isMailAction(c.action) ? (
                <Link className="btn btn-amber" to={c.action.to}>
                  {c.action.label}
                </Link>
              ) : null}
              {c.links?.length ? (
                <div className="related-row">
                  {c.links.map((l) => (
                    <Link key={l.to} to={l.to}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
              {c.hint ? <p className="contact-hint">{c.hint}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="feat-band feat-honest-band">
        <div className="wrap">
          <aside className="feat-honest">
            <p className="feat-honest-label">What to include</p>
            <p>
              Account email, product surface (iOS / Android / web), and whether the request is about a personal vault or
              a business workspace. For privacy requests, tell us whether you need access, correction, export help, or
              deletion. Website: www.warrly.in
            </p>
          </aside>
        </div>
      </section>

      <CtaBand secondary={undefined} />
    </main>
  );
}
