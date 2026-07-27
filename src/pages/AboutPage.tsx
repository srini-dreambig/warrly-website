import { Link } from "react-router-dom";
import { ART } from "../brand";
import { config } from "../config";
import { CtaBand } from "../components/CtaBand";

const principles = [
  {
    title: "Proof is customer data",
    body: "GST bills, serials, and household membership are not marketing collateral. We design capture, sharing, and delete paths as if a service-centre call depends on them — because it does.",
  },
  {
    title: "Confirm before the vault trusts it",
    body: "Extract proposes fields. Humans approve. Reminders and claim packs inherit confirmed records, not silent machine guesses.",
  },
  {
    title: "Scope access on purpose",
    body: "Personal, household, and business workspaces are separate contexts. Invites are membership — not public links to invoices.",
  },
  {
    title: "Exit is a feature",
    body: "Export and delete ship in the product. A vault that holds your documents must let you leave with them.",
  },
];

const standards = [
  {
    title: "India-first, honest scope",
    body: "We build first for Indian households and multi-site teams — authorised centres, e-comm invoices, GST bills — without pretending we are a global compliance platform on day one.",
  },
  {
    title: "No fake trust badges",
    body: "We describe controls we ship: scoped vaults, TLS in transit, export, delete. We do not invent SOC 2 / ISO claims or a universal OEM claim API.",
  },
  {
    title: "Plans that match reality",
    body: "Free starts at five items. Plus and Pro raise limits and unlock business tooling in-app. Marketing does not invent storefront prices.",
  },
  {
    title: "Claims tooling, not outcomes",
    body: "We assemble evidence and help you reach brand channels. Manufacturers still decide. That honesty belongs on the company page, not only in legal footnotes.",
  },
];

export function AboutPage() {
  return (
    <main className="page about-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <p className="page-eyebrow">Company</p>
            <h1>Our mission: make warranty proof impossible to lose</h1>
            <p className="lead">
              Warrly is the warranty vault for Indian households and teams — capture proof at purchase, track coverage,
              and assemble claim-ready evidence before the service centre asks for the bill. Because the vault holds
              real customer data, product standards and data stewardship are part of the mission — not a side policy.
            </p>
          </div>
          <div className="page-hero-art">
            <img src={ART.welcomeAccount} alt="Warrly product illustration" />
          </div>
        </div>
      </section>

      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Why we built this</h2>
          <div className="about-split">
            <p className="feat-lede about-lede-wide">
              People do not lose warranties because they are careless. They lose them because modern buying scatters
              proof across e-comm inboxes, UPI screenshots, WhatsApp forwards, and paper GST bills — none of which were
              designed for the day a refrigerator fails or a clinic scanner dies mid-shift.
            </p>
            <p className="feat-lede about-lede-wide">
              In our India launch market, authorised service often still means “no bill, no service,” even when coverage
              is live. Every meaningful purchase deserves a durable record: what it was, when it was bought, how long it
              is covered, and where the documents live. Reminders should arrive while you can still act. Claims should
              start from evidence you already have.
            </p>
          </div>
        </div>
      </section>

      <section className="feat-band feat-band-alt">
        <div className="wrap">
          <h2 className="feat-h2">Data stewardship principles</h2>
          <p className="feat-lede">
            Warrly is not a casual notes app. It holds invoices and identity-adjacent fields. These are the standards we
            build against:
          </p>
          <div className="feat-cap-grid feat-cap-grid--tiles">
            {principles.map((p) => (
              <article key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Product standards we hold ourselves to</h2>
          <div className="feat-scenario-grid">
            {standards.map((s) => (
              <article key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="feat-band feat-band-alt">
        <div className="wrap">
          <h2 className="feat-h2">What we are building</h2>
          <ul className="about-build-list">
            <li>
              <strong>Personal vault</strong> — phones, appliances, electronics for households, with sharing and
              reminders at 30 / 7 / 1 day.
            </li>
            <li>
              <strong>Claim packs</strong> — invoice, serial, and photos assembled from the item when you need them —
              you still submit through the brand’s process.
            </li>
            <li>
              <strong>Business workspace</strong> — sites, QR tags, vendors, service logs, and book-value exports on the
              same product family.
            </li>
            <li>
              <strong>Trust surfaces</strong> — scoped access, export, delete, and plain-language{" "}
              <Link to="/privacy">privacy</Link> / <Link to="/terms">terms</Link> written for a data-holding product.
            </li>
          </ul>
        </div>
      </section>

      <section className="feat-band">
        <div className="wrap about-company-grid">
          <div>
            <h2 className="feat-h2">Who we build for</h2>
            <p className="feat-lede about-lede-wide">
              Households that want peace of mind without a filing cabinet. Clinics, cafés, and offices that manage real
              equipment across sites and cannot afford tribal knowledge. Both deserve software that treats warranties as
              operational truth — not forgotten fine print.
            </p>
          </div>
          <div>
            <h2 className="feat-h2">Built by Dataplexor</h2>
            <p className="feat-lede about-lede-wide">
              Warrly is proudly built by Dataplexor — product craft focused on practical systems that survive contact
              with messy, real-world paperwork. Site:{" "}
              <a href="https://www.warrly.in" target="_blank" rel="noreferrer">
                www.warrly.in
              </a>
              .
            </p>
            <p className="feat-lede about-lede-wide">
              Questions? <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a> ·{" "}
              <Link to="/contact">Contact</Link> · <Link to="/investors">Investors</Link> ·{" "}
              <Link to="/security">Security</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Start with one purchase" lead="Download free, capture a bill, and see how a vault should treat your documents." />
    </main>
  );
}
