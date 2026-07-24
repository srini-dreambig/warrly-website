import { Link } from "react-router-dom";
import type { LegalBlock, LegalSection } from "../content/privacy";

function BlockView({ block }: { block: LegalBlock }) {
  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "note") {
    return <aside className="legal-note">{block.text}</aside>;
  }
  return <p>{block.text}</p>;
}

export function LegalDoc({
  title,
  lead,
  effectiveDate,
  version,
  sections,
  related,
}: {
  title: string;
  lead: string;
  effectiveDate: string;
  version: string;
  sections: LegalSection[];
  related?: { to: string; label: string }[];
}) {
  return (
    <main className="page legal-page">
      <section className="page-hero page-hero-solo">
        <div className="wrap page-hero-copy legal-hero-copy">
          <p className="page-eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <p className="legal-meta">
            Effective {effectiveDate} · Version {version}
          </p>
        </div>
      </section>

      <section className="prose-section legal-body">
        <div className="wrap legal-layout">
          <div className="prose legal-prose">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={`${s.id}-${i}`} block={b} />
                ))}
              </section>
            ))}
          </div>

          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc-title">On this page</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title.replace(/^\d+\.\s*/, "")}</a>
                </li>
              ))}
            </ol>
            {related?.length ? (
              <div className="legal-related">
                <p className="legal-toc-title">Related</p>
                <ul>
                  {related.map((r) => (
                    <li key={r.to}>
                      <Link to={r.to}>{r.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </nav>
        </div>
      </section>
    </main>
  );
}
