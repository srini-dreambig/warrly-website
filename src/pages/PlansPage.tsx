import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";

export function PlansPage() {
  return (
    <main className="page">
      <section className="page-hero page-hero-solo">
        <div className="wrap page-hero-copy">
          <h1>Choose capacity that matches your vault</h1>
          <p className="lead">
            Start free with five items. Unlock more with referrals, or upgrade when your household or team needs higher limits and business tooling.
          </p>
        </div>
      </section>

      <section className="plans plans-page">
        <div className="wrap">
          <div className="plans-grid">
            <article className="plan" id="free">
              <h3>Free</h3>
              <div className="price">
                ₹0 <small>/ forever</small>
              </div>
              <p className="desc">For households starting a vault.</p>
              <ul className="plan-features">
                <li>Up to 5 items</li>
                <li>+1 item slot per successful referral</li>
                <li>Camera & document capture</li>
                <li>Reminders at 30 / 7 / 1 day</li>
                <li>Basic claims workflow</li>
              </ul>
              <Link className="btn btn-forest" to="/download">
                Download free
              </Link>
            </article>
            <article className="plan featured" id="plus">
              <h3>Plus</h3>
              <div className="price">
                Yearly <small>in-app</small>
              </div>
              <p className="desc">For growing households that outgrow free.</p>
              <ul className="plan-features">
                <li>Higher item capacity</li>
                <li>Richer reminder controls</li>
                <li>Priority extract</li>
                <li>Household sharing</li>
                <li>Evidence packs for claims</li>
              </ul>
              <Link className="btn btn-amber" to="/download">
                Start Plus
              </Link>
            </article>
            <article className="plan" id="pro">
              <h3>Pro</h3>
              <div className="price">
                Yearly <small>in-app</small>
              </div>
              <p className="desc">For teams that manage assets across sites.</p>
              <ul className="plan-features">
                <li>Business vault & workspaces</li>
                <li>Sites & departments</li>
                <li>QR asset tags</li>
                <li>Vendors & vendor portal</li>
                <li>Book value & depreciation exports</li>
              </ul>
              <Link className="btn btn-forest" to="/download">
                Start Pro
              </Link>
            </article>
          </div>

          <div className="compare-block" id="compare">
            <h2>How to choose</h2>
            <div className="compare-grid">
              <article>
                <h3>Stay on Free if…</h3>
                <p>You are digitizing a starter set of appliances and gadgets, and referrals can grow your slots naturally.</p>
              </article>
              <article>
                <h3>Move to Plus if…</h3>
                <p>Your household buys often, shares a vault, and needs more capacity without running a business register.</p>
              </article>
              <article>
                <h3>Choose Pro if…</h3>
                <p>You manage equipment across rooms or sites, need QR tags, vendors, audits, or finance-ready exports.</p>
              </article>
            </div>
            <p className="compare-note">
              Unit thesis: one avoided fridge or TV out-of-pocket repair (often ₹6–15k in India) can fund years of a
              subscription. Pricing for Plus / Pro is finalized in-app by region — marketing pages describe capability
              tiers; checkout shows the live storefront price.
            </p>
            <p className="compare-note">
              Referral policy: Free starts at 5 items. When an invited friend creates a vault, the referrer unlocks +1
              item slot — no card required to begin. See <Link to="/referral">how referrals work</Link> or{" "}
              <Link to="/faq">FAQs</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Pick a plan after you feel the vault" lead="Download free, add a few receipts, then upgrade only when limits get in the way." />
    </main>
  );
}
