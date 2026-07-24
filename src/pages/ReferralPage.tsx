import { Link } from "react-router-dom";
import { ART } from "../brand";
import { CtaBand } from "../components/CtaBand";

export function ReferralPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <p className="page-eyebrow">Share Warrly</p>
            <h1>Invite people who also lose bills</h1>
            <p className="lead">
              Coverage spreads when households and teams stop forwarding GST PDFs forever. Start free with five items,
              feel the vault, then invite someone who should keep their own proof — partners, parents, or a facilities
              lead.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-amber" to="/download">
                Start free
              </Link>
              <Link className="btn btn-forest" to="/plans">
                See plans
              </Link>
            </div>
          </div>
          <div className="page-hero-art">
            <img src={ART.referral} alt="Share Warrly with people who buy things that matter" />
          </div>
        </div>
      </section>

      <section className="capability-section">
        <div className="wrap">
          <div className="section-intro">
            <h2>How sharing works today</h2>
            <p>Honest rules — discovery first, capacity through plans.</p>
          </div>
          <ol className="steps-list">
            <li>
              <strong>Start on Free.</strong> Five item slots, capture, reminders, and basic claims — no card.
            </li>
            <li>
              <strong>Capture a few purchases</strong> so you know the product is worth recommending.
            </li>
            <li>
              <strong>Share an invite</strong> from the app with someone who also buys appliances, phones, or kit.
            </li>
            <li>
              <strong>Need more capacity?</strong> Plus and Pro raise limits and unlock business tooling in-app — that is
              the durable path beyond Free.
            </li>
          </ol>
        </div>
      </section>

      <section className="feat-band feat-honest-band">
        <div className="wrap">
          <aside className="feat-honest">
            <p className="feat-honest-label">Straight talk</p>
            <p>
              Invites help people discover Warrly. Free capacity is defined by the live Free tier in the app. Do not
              assume automatic +1 item unlocks from referrals unless the installed app shows that reward clearly — plans
              remain the reliable way to grow a vault or workspace.
            </p>
          </aside>
        </div>
      </section>

      <section className="problem-solution">
        <div className="wrap problem-solution-grid">
          <article>
            <h2>Why invite at all</h2>
            <p>
              Partners handle service calls. Parents hold older appliances. Facilities leads inherit kit without
              invoices. Sharing the habit beats forwarding WhatsApp folders for years.
            </p>
          </article>
          <article>
            <h2>Household vs business</h2>
            <p>
              For home, use household sharing inside one vault. For company assets, use a Pro workspace — do not mix
              office kit into a family vault. See <Link to="/faq">FAQs</Link> and <Link to="/plans">Plans</Link>.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        title="Invite after you feel the product"
        lead="Add a few receipts first. Share when you know Warrly is worth recommending."
      />
    </main>
  );
}
