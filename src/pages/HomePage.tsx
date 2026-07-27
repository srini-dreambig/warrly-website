import { Link } from "react-router-dom";
import { ART } from "../brand";
import { config } from "../config";
import { CtaBand } from "../components/CtaBand";
import { DownloadQr } from "../components/DownloadQr";

const appPath = config.getAppPath;
const appLabel = config.getAppLabel;

const capabilities = [
  {
    to: "/personal/camera-extract",
    title: "Extract from receipts & invoices",
    body: "Camera, PDF, or email — confirm brand, dates, and warranty fields without retyping your life into a spreadsheet.",
    image: ART.welcomePersonal,
  },
  {
    to: "/personal/reminders",
    title: "Reminders before expiry",
    body: "30, 7, and 1 day out. Act while you can still renew, claim, or replace — not after the window closes.",
    image: ART.allClear,
  },
  {
    to: "/personal/claims",
    title: "Claim with evidence ready",
    body: "Start from the item. Pull invoices, serials, and photos into an evidence pack instead of hunting under pressure.",
    image: ART.emptyWarrly,
  },
  {
    to: "/business",
    title: "Sites, QR tags, vendors",
    body: "Multi-site teams get a vault ops can scan on the floor and finance can report from — same source of truth.",
    image: ART.welcomeCorporate,
  },
];

export function HomePage() {
  return (
    <main id="top">
      <section className="hero" aria-label="Hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Stop losing warranty proof before the product fails</h1>
            <p className="hero-lead">
              Built for Indian households and teams. Capture the GST bill or e-comm invoice at purchase, track every
              warranty window, and assemble claim-ready evidence before the service centre asks for it.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-amber" to={appPath}>
                {appLabel}
              </Link>
              <Link className="btn btn-forest" to="/personal">
                See how it works
              </Link>
            </div>
            <p className="hero-note">Free for your first 5 items. No card required. Launch market: India.</p>
          </div>
          <div className="hero-art">
            <img src={ART.welcomeAccount} alt="Warrly vault on your phone with coverage at a glance" />
          </div>
        </div>
      </section>

      <section className="problem-strip">
        <div className="wrap">
          <h2 className="problem-strip-title">In India, “no bill, no service” is still the rule</h2>
          <div className="problem-cost-grid">
            <article>
              <h3>Proof scatters.</h3>
              <p>
                Flipkart and Amazon invoices, UPI screenshots, WhatsApp forwards, paper GST bills — none of it is
                searchable when an authorised centre asks for proof.
              </p>
            </article>
            <article>
              <h3>Dates disappear.</h3>
              <p>
                Without reminders, coverage expires while life is busy. You discover the gap only when the fridge,
                TV, or phone fails.
              </p>
            </article>
            <article>
              <h3>Claims stall.</h3>
              <p>
                Support asks for invoice, serial, and purchase date. Gathering that under stress costs evenings — and
                often means paying cash for a repair that should have been covered.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-center" id="capabilities">
        <div className="wrap">
          <h2>Built for the full warranty lifecycle</h2>
          <p className="lead">
            Capture → track → remind → claim. Personal households and business workspaces share the same discipline:
            proof stays with the product.
          </p>
        </div>
      </section>

      <div className="illu-strip">
        <div className="wrap capability-cards">
          {capabilities.map((c) => (
            <Link key={c.to} to={c.to} className="capability-card">
              <div className="capability-card-art">
                <img src={c.image} alt="" />
              </div>
              <div className="copy">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="card-link">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <section className="split" id="secure">
        <div className="wrap split-grid">
          <div>
            <h2>A vault, not another notes app</h2>
            <p>
              Notes apps store files. Warrly understands items, warranty windows, reminders, household sharing, and claim
              packs. Business teams add sites, QR asset tags, vendors, and book-value reporting — without leaving the same
              product family.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-forest" to="/personal">
                Personal
              </Link>
              <Link className="btn btn-forest" to="/business">
                Business
              </Link>
            </div>
          </div>
          <div className="split-art">
            <img src={ART.allClear} alt="Clear coverage status across your vault" />
          </div>
        </div>
      </section>

      <section className="section-center launch-market-strip" id="why-warrly">
        <div className="wrap">
          <h2>One avoided repair can fund years of Warrly</h2>
          <p className="lead">
            A major fridge or TV out-of-pocket repair in India often runs ₹6–15k. Smartphones commonly land in the ₹2–8k
            range for screens and boards. Keeping proof alive is not admin theatre — it is money you do not have to
            spend twice.
          </p>
          <div className="problem-cost-grid launch-market-grid">
            <article>
              <h3>Win at purchase</h3>
              <p>Install where the Flipkart / Amazon / UPI receipt already lives — on the phone in your hand.</p>
            </article>
            <article>
              <h3>Free → Plus → Pro</h3>
              <p>Start with 5 items. Grow with referrals. Upgrade when capacity or business tooling matters.</p>
            </article>
            <article>
              <h3>Household → workspace</h3>
              <p>Same product family for families and multi-site teams — sites, QR tags, vendors, exports.</p>
            </article>
          </div>
          <div className="hero-actions launch-market-actions">
            <Link className="btn btn-forest" to="/plans">
              Compare plans
            </Link>
            <Link className="btn btn-amber" to="/faq">
              Read FAQs
            </Link>
          </div>
        </div>
      </section>

      <section className="referral" id="referral">
        <div className="referral-inner">
          <div className="referral-art">
            <img src={ART.referral} alt="Five free items plus one more for each referral" />
          </div>
          <div className="referral-copy">
            <h2>5 free items. +1 for every referral.</h2>
            <p>
              Start with five warranties on us. When someone you invite joins, unlock another item slot — so coverage can
              grow with your household.
            </p>
            <ul className="referral-points">
              <li>First 5 items free on the Free plan — no card</li>
              <li>Each successful referral adds one more item slot</li>
              <li>Upgrade to Plus or Pro when your vault outgrows free</li>
            </ul>
            <Link className="btn btn-amber" to="/referral">
              How referrals work
            </Link>
          </div>
        </div>
      </section>

      <section className="plans" id="plans-teaser">
        <div className="wrap">
          <h2>Start free. Scale when the vault grows.</h2>
          <p className="lead">Households begin on Free. Teams move to Pro when sites, vendors, and reporting matter.</p>
          <div className="plans-grid">
            <article className="plan">
              <h3>Free</h3>
              <div className="price">
                ₹0 <small>/ forever</small>
              </div>
              <p className="desc">5 items, reminders, basic claims. Grow slots with referrals.</p>
              <Link className="btn btn-forest" to={appPath}>
                {appLabel}
              </Link>
            </article>
            <article className="plan featured">
              <h3>Plus</h3>
              <div className="price">
                Yearly <small>in-app</small>
              </div>
              <p className="desc">More capacity, richer reminders, priority extract for households.</p>
              <Link className="btn btn-amber" to="/plans">
                Compare Plus
              </Link>
            </article>
            <article className="plan">
              <h3>Pro</h3>
              <div className="price">
                Yearly <small>in-app</small>
              </div>
              <p className="desc">Business tools: sites, QR tags, vendors, book value, higher limits.</p>
              <Link className="btn btn-forest" to="/plans">
                Compare Pro
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="download">
        <div className="wrap download-grid">
          <div>
            <h2>{config.appLive ? "Get Warrly before the next failure" : "Join before launch day"}</h2>
            <p>
              {config.appLive
                ? "Scan the QR on your phone, or open the stores and web app directly."
                : "The app is not on the stores yet. Scan the QR to join the waitlist — we will notify you at launch."}
            </p>
            <div className="store-row">
              <Link className="btn btn-amber" to={appPath}>
                {config.appLive ? "Download page" : "Join the waitlist"}
              </Link>
              {config.appLive ? (
                <a className="btn btn-ghost-light" href={config.webAppUrl} target="_blank" rel="noreferrer">
                  Web app
                </a>
              ) : config.webAppEnabled ? (
                <Link className="btn btn-ghost-light" to="/login">
                  Log in to vault
                </Link>
              ) : (
                <Link className="btn btn-ghost-light" to="/plans">
                  See plans
                </Link>
              )}
            </div>
          </div>
          <DownloadQr id="home-download" />
        </div>
      </section>

      <CtaBand
        title="Your next purchase deserves a home"
        lead="Capture the receipt today. Thank yourself when something fails tomorrow."
      />
    </main>
  );
}
