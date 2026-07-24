import { type ReactNode, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ART } from "../brand";
import { config } from "../config";
import { investorSlides, type DeckSlide } from "../content/investorDeck";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`ppt-logo ${className}`}>
      <img src={ART.mark} alt="" width={28} height={28} />
      <span>warrly</span>
    </div>
  );
}

function BrandLockup() {
  return (
    <div className="ppt-brand-lockup" aria-hidden={false}>
      <LogoMark className="ppt-logo--slide" />
      <span className="ppt-brand-tagline">EVERY WARRANTY, KEPT</span>
    </div>
  );
}

function BrandBar({ section }: { section: string }) {
  return (
    <div className="ppt-brand-bar">
      <p className="ppt-section">{section}</p>
    </div>
  );
}

/** One chrome system for every content slide — logo top-right, shared header rhythm. */
function Frame({
  slide,
  split,
  children,
}: {
  slide: DeckSlide;
  split?: boolean;
  children: ReactNode;
}) {
  if (split && slide.image) {
    return (
      <div className="ppt-shell ppt-shell--split">
        <BrandBar section={slide.section} />
        <div className="ppt-col">
          <div className="ppt-top">
            <h1 className="ppt-title">{slide.title}</h1>
            {slide.subtitle ? <p className="ppt-subtitle">{slide.subtitle}</p> : null}
            {slide.body ? <p className="ppt-lede">{slide.body}</p> : null}
          </div>
          <div className="ppt-main">{children}</div>
          {slide.note ? <p className="ppt-note">{slide.note}</p> : null}
        </div>
        <div className="ppt-art">
          <img src={slide.image} alt={slide.imageAlt || ""} />
        </div>
      </div>
    );
  }

  return (
    <div className="ppt-shell">
      <BrandBar section={slide.section} />
      <div className="ppt-top">
        <h1 className="ppt-title">{slide.title}</h1>
        {slide.subtitle ? <p className="ppt-subtitle">{slide.subtitle}</p> : null}
        {slide.body && !split ? <p className="ppt-lede">{slide.body}</p> : null}
      </div>
      <div className="ppt-main">{children}</div>
      {slide.policy ? (
        <div className="ppt-policy">
          <strong>Referral policy</strong>
          <p>{slide.policy}</p>
        </div>
      ) : null}
      {slide.note ? <p className="ppt-note">{slide.note}</p> : null}
    </div>
  );
}

function SlideBody({ slide }: { slide: DeckSlide }) {
  switch (slide.layout) {
    case "cover":
      return (
        <div className="ppt-shell ppt-shell--split ppt-shell--cover">
          <BrandBar section={slide.section} />
          <div className="ppt-col ppt-col--cover">
            <div className="ppt-cover-copy">
              <h1 className="ppt-title ppt-title--hero">{slide.title}</h1>
              {slide.subtitle ? <p className="ppt-cover-lead">{slide.subtitle}</p> : null}
              {slide.body ? <p className="ppt-cover-body">{slide.body}</p> : null}
            </div>
            {slide.bullets?.length ? (
              <ul className="ppt-cover-meta">
                {slide.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
          {slide.image ? (
            <div className="ppt-art">
              <img src={slide.image} alt={slide.imageAlt || ""} />
            </div>
          ) : null}
        </div>
      );

    case "agenda":
      return (
        <Frame slide={slide}>
          <div className="ppt-card-grid ppt-card-grid--agenda">
            {slide.steps?.map((s) => (
              <div className="ppt-card ppt-card--agenda" key={s.n}>
                <span className="ppt-idx">{s.n}</span>
                <div className="ppt-agenda-copy">
                  <strong className="ppt-key">{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case "problem":
      return (
        <Frame slide={slide} split>
          <div className="ppt-insight ppt-insight--problem">
            <div className="ppt-hero-stat">
              <div className="ppt-hero-stat-value ppt-num">{slide.hero?.value}</div>
              <div className="ppt-hero-stat-label">{slide.hero?.label}</div>
              {slide.hero?.source ? <div className="ppt-cite">{slide.hero.source}</div> : null}
            </div>
            <div className="ppt-card-grid ppt-card-grid--3 ppt-card-grid--stats">
              {slide.stats?.map((s) => (
                <div className="ppt-card ppt-card--stat" key={s.label}>
                  <strong className="ppt-num">{s.value}</strong>
                  <span>{s.label}</span>
                  {s.source ? <em>{s.source}</em> : null}
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );

    case "insight":
      return (
        <Frame slide={slide} split>
          <div className="ppt-insight">
            <div className="ppt-list-stack ppt-list-stack--cost">
              {slide.costs?.map((c) => (
                <div className="ppt-cost-row" key={c.title}>
                  <strong className="ppt-num">{c.amount}</strong>
                  <div>
                    <h2>{c.title}</h2>
                    <p>{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ppt-card-grid ppt-card-grid--2 ppt-card-grid--stats">
              {slide.stats?.map((s) => (
                <div className="ppt-card ppt-card--stat" key={s.label}>
                  <strong className="ppt-num">{s.value}</strong>
                  <span>{s.label}</span>
                  {s.source ? <em>{s.source}</em> : null}
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );

    case "solution":
    case "product":
    case "gtm":
      return (
        <Frame slide={slide} split>
          <div className="ppt-card-grid ppt-card-grid--2x2">
            {slide.steps?.map((s) => {
              const numeric = /^\d+$/.test(s.n.trim());
              return (
                <div className="ppt-card ppt-card--step" key={s.n + s.title}>
                  {numeric ? (
                    <>
                      <span className="ppt-kicker">{s.n.padStart(2, "0")}</span>
                      <strong className="ppt-key">{s.title}</strong>
                    </>
                  ) : (
                    <>
                      <span className="ppt-idx is-word">{s.n}</span>
                      <strong className="ppt-key ppt-key--sub">{s.title}</strong>
                    </>
                  )}
                  <p>{s.body}</p>
                </div>
              );
            })}
          </div>
        </Frame>
      );

    case "whyNow":
      return (
        <Frame slide={slide} split>
          <div className="ppt-card-grid ppt-card-grid--2x2">
            {slide.stats?.map((s) => (
              <div className="ppt-card ppt-card--stat" key={s.label}>
                <strong className="ppt-num">{s.value}</strong>
                <span>{s.label}</span>
                {s.source ? <em>{s.source}</em> : null}
              </div>
            ))}
          </div>
        </Frame>
      );

    case "market":
      return (
        <Frame slide={slide}>
          <div className="ppt-card-grid ppt-card-grid--2x2">
            {slide.market?.map((m) => (
              <div className="ppt-card ppt-card--market" key={m.label}>
                <span className="ppt-kicker">{m.label}</span>
                <strong className="ppt-num">{m.value}</strong>
                <p>{m.math}</p>
              </div>
            ))}
          </div>
        </Frame>
      );

    case "model":
      return (
        <Frame slide={slide}>
          <div className="ppt-card-grid ppt-card-grid--3 ppt-card-grid--tiers">
            {slide.tiers?.map((t) => (
              <div className={`ppt-card ppt-card--tier${t.accent ? " is-accent" : ""}`} key={t.name}>
                <div className="ppt-tier-top">
                  <strong className="ppt-num">{t.price}</strong>
                  <span className="ppt-kicker">{t.name}</span>
                </div>
                <ul>
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Frame>
      );

    case "compete":
      return (
        <Frame slide={slide}>
          <div className="ppt-table">
            <div className="ppt-table-row ppt-table-row--head">
              <div>Capability</div>
              <div>Status quo</div>
              <div className="is-win">Warrly</div>
            </div>
            {slide.rows?.map((r) => (
              <div className="ppt-table-row" key={r.feature}>
                <div className="ppt-table-feature">{r.feature}</div>
                <div>{r.others}</div>
                <div className="is-win">{r.warrly}</div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case "status":
      return (
        <Frame slide={slide}>
          <div className="ppt-card-grid ppt-card-grid--3">
            {slide.steps?.map((s) => (
              <div className="ppt-card ppt-card--step" key={s.n}>
                <strong className="ppt-key">{s.title}</strong>
                <span className="ppt-kicker">{s.n}</span>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          {slide.bullets?.length ? (
            <ul className="ppt-meta-list ppt-meta-list--block">
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </Frame>
      );

    case "ask":
      return (
        <Frame slide={slide} split>
          {slide.ask ? (
            <>
              <p className="ppt-kicker ppt-kicker--block">{slide.ask.amount}</p>
              <div className="ppt-card-grid ppt-card-grid--2x2">
                {slide.ask.use.map((u, i) => {
                  const [label, ...rest] = u.split(": ");
                  const detail = rest.join(": ") || u;
                  return (
                    <div className="ppt-card ppt-card--step" key={u}>
                      <span className="ppt-kicker">{String(i + 1).padStart(2, "0")}</span>
                      <strong className="ppt-key">{label}</strong>
                      <p>{detail === label ? "" : detail}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
          {slide.bullets?.length ? (
            <ul className="ppt-meta-list ppt-meta-list--block">
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </Frame>
      );

    case "sources":
      return (
        <Frame slide={slide}>
          <div className="ppt-card-grid ppt-card-grid--2 ppt-card-grid--sources">
            {slide.steps?.map((s) => (
              <div className="ppt-card ppt-card--source" key={s.n}>
                <span className="ppt-idx">{s.n}</span>
                <div>
                  <strong className="ppt-key">{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    default:
      return null;
  }
}

export function InvestorsPage() {
  const [index, setIndex] = useState(0);
  const total = investorSlides.length;
  const slide = investorSlides[index];

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total]);

  return (
    <main className="page investors-page">
      <section className="deck" aria-roledescription="carousel" aria-label="Warrly investor pitch deck">
        <div className="deck-chrome wrap">
          <div className="deck-meta">
            <span>
              {index + 1} / {total}
            </span>
            <span>16:9 · ← → navigate</span>
          </div>
          <div className="deck-actions">
            <a className="btn btn-forest btn-sm" href={`mailto:${config.supportEmail}?subject=Warrly%20investor%20inquiry`}>
              Contact investors desk
            </a>
            <Link className="btn btn-amber btn-sm" to="/download">
              Try the product
            </Link>
          </div>
        </div>

        <div className="deck-stage wrap">
          <div className="ppt-frame" key={slide.id}>
            <article className={`ppt-slide ppt-slide--${slide.layout}`} aria-live="polite">
              <BrandLockup />
              <SlideBody slide={slide} />
              <footer className="ppt-footer">
                <a className="ppt-footer-site" href="https://www.warrly.in" target="_blank" rel="noreferrer">
                  www.warrly.in
                </a>
                <span className="ppt-footer-conf">Confidential</span>
                <span className="ppt-footer-num">
                  {index + 1} / {total}
                </span>
              </footer>
            </article>
          </div>
        </div>

        <div className="deck-controls wrap">
          <button type="button" className="deck-nav" onClick={() => go(index - 1)} aria-label="Previous slide">
            ← Prev
          </button>
          <div className="deck-dots" role="tablist" aria-label="Slides">
            {investorSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`deck-dot${i === index ? " is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
              />
            ))}
          </div>
          <button type="button" className="deck-nav" onClick={() => go(index + 1)} aria-label="Next slide">
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}
