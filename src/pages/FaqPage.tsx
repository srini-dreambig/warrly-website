import { Link } from "react-router-dom";
import { faqGroups } from "../content/faq";
import { CtaBand } from "../components/CtaBand";

export function FaqPage() {
  return (
    <main className="page">
      <section className="page-hero page-hero-solo">
        <div className="wrap page-hero-copy">
          <h1>Frequently asked questions</h1>
          <p className="lead">
            Straight answers about the vault, Free / Plus / Pro, referrals, and how Warrly helps Indian households and
            teams keep warranty proof ready.
          </p>
        </div>
      </section>

      <section className="prose-section">
        <div className="wrap faq-list">
          {faqGroups.map((group) => (
            <div className="faq-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
          <p className="faq-more">
            Still stuck? <Link to="/contact">Contact us</Link> or <Link to="/download">download the app</Link>.
          </p>
        </div>
      </section>

      <CtaBand title="Ready to keep the next bill?" lead="Download free, capture one purchase, and see why the vault sticks." />
    </main>
  );
}
