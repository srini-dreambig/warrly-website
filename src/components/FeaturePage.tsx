import { Link } from "react-router-dom";
import type { FeatureBlock, FeatureFaq, FeaturePageContent } from "../content/features";
import { config } from "../config";
import { CtaBand } from "./CtaBand";

type Layout = "hub" | "steps" | "timeline" | "story" | "record" | "ops" | "trust";

function resolveLayout(page: FeaturePageContent): Layout {
  if (page.layout) return page.layout;
  const p = page.path;
  if (p === "/personal" || p === "/business") return "hub";
  if (p.includes("reminders") || p.includes("expiring") || p.includes("coverage")) return "timeline";
  if (p.includes("claim") || p.includes("evidence")) return "story";
  if (p.includes("camera") || p.includes("email") || p.includes("receipt") || p.includes("manual"))
    return "steps";
  if (p.startsWith("/business/")) return "ops";
  if (p.startsWith("/security")) return "trust";
  return "record";
}

function Hero({
  page,
  secondaryTo,
  secondaryLabel,
}: {
  page: FeaturePageContent;
  secondaryTo: string;
  secondaryLabel: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        <div className="page-hero-copy">
          <p className="page-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.lead}</p>
          <div className="hero-actions">
            <Link className="btn btn-amber" to={config.getAppPath}>
              {config.getAppLabel}
            </Link>
            <Link className="btn btn-forest" to={secondaryTo}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
        <div className="page-hero-art">
          <img src={page.image} alt={page.imageAlt} />
        </div>
      </div>
    </section>
  );
}

function Related({ page }: { page: FeaturePageContent }) {
  if (!page.related?.length) return null;
  return (
    <nav className="related-rail wrap" aria-label="Related pages">
      {page.related.map((r) => (
        <Link key={r.to} to={r.to}>
          {r.label}
        </Link>
      ))}
    </nav>
  );
}

function ScenarioStrip({
  title,
  lede,
  items,
  tone = "default",
}: {
  title: string;
  lede?: string;
  items: FeatureBlock[];
  tone?: "default" | "forest" | "amber";
}) {
  return (
    <section className={`feat-band feat-scenarios feat-scenarios--${tone}`}>
      <div className="wrap">
        <h2 className="feat-h2">{title}</h2>
        {lede ? <p className="feat-lede">{lede}</p> : null}
        <div className="feat-scenario-grid">
          {items.map((s) => (
            <article key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid({
  title,
  lede,
  items,
  variant = "cards",
}: {
  title: string;
  lede?: string;
  items: FeatureBlock[];
  variant?: "cards" | "rows" | "tiles";
}) {
  return (
    <section className="feat-band feat-band-alt">
      <div className="wrap">
        <h2 className="feat-h2">{title}</h2>
        {lede ? <p className="feat-lede">{lede}</p> : null}
        <div className={`feat-cap-grid feat-cap-grid--${variant}`}>
          {items.map((c) => (
            <article key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StagesRail({ title, lede, items }: { title: string; lede?: string; items: FeatureBlock[] }) {
  return (
    <section className="feat-band">
      <div className="wrap">
        <h2 className="feat-h2">{title}</h2>
        {lede ? <p className="feat-lede">{lede}</p> : null}
        <ol className="feat-stages">
          {items.map((s, i) => (
            <li key={s.title}>
              <span className="feat-stages-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqBlock({ items }: { items: FeatureFaq[] }) {
  return (
    <section className="feat-band feat-faq-band">
      <div className="wrap feat-faq-wrap">
        <h2 className="feat-h2">Questions people ask</h2>
        <div className="feat-faq-list">
          {items.map((f) => (
            <details key={f.q} className="feat-faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function HonestNote({ note }: { note?: string }) {
  if (!note) return null;
  return (
    <section className="feat-band feat-honest-band">
      <div className="wrap">
        <aside className="feat-honest">
          <p className="feat-honest-label">Straight talk</p>
          <p>{note}</p>
        </aside>
      </div>
    </section>
  );
}

function AfterThought({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section className="feat-band feat-band-alt">
      <div className="wrap">
        <p className="feat-after">{text}</p>
      </div>
    </section>
  );
}

function DepthTail({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <HonestNote note={page.honestNote} />
      <FaqBlock items={page.faqs} />
      <AfterThought text={page.afterThought} />
      <Related page={page} />
    </>
  );
}

function HubBody({ page }: { page: FeaturePageContent }) {
  const journey = page.bullets.slice(0, 4);
  return (
    <>
      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">The path through {page.eyebrow.toLowerCase()}</h2>
          <p className="feat-lede">{page.solution}</p>
          <ol className="feat-journey">
            {journey.map((b, i) => (
              <li key={b}>
                <span className="feat-journey-n">{String(i + 1).padStart(2, "0")}</span>
                <p>{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ScenarioStrip title="Who this is for" items={page.scenarios} tone="amber" />
      <CapabilityGrid
        title="What stays together in the vault"
        lede="Coverage only works when proof, dates, and people share one record."
        items={page.capabilities}
        variant="tiles"
      />
      {page.stages?.length ? (
        <StagesRail title="How a typical week looks" items={page.stages} />
      ) : null}
      <section className="feat-band feat-band-alt">
        <div className="wrap">
          <h2 className="feat-h2">Where to go next</h2>
          <div className="feat-destinations">
            {(page.related || []).map((r) => (
              <Link key={r.to} to={r.to} className="feat-destination">
                <strong>{r.label}</strong>
                <span>Open this area of the product →</span>
              </Link>
            ))}
          </div>
          <p className="feat-footnote">{page.problem}</p>
        </div>
      </section>
      <DepthTail page={page} />
    </>
  );
}

function StepsBody({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <section className="feat-band">
        <div className="wrap feat-split">
          <div>
            <h2 className="feat-h2">When you need this</h2>
            <p className="feat-lede">{page.problem}</p>
          </div>
          <div className="feat-callout">
            <h3>What you get</h3>
            <p>{page.solution}</p>
          </div>
        </div>
      </section>
      <section className="feat-band feat-band-alt">
        <div className="wrap">
          <h2 className="feat-h2">Capture flow</h2>
          <ol className="feat-steps">
            {page.bullets.map((b, i) => {
              const [head, ...rest] = b.split(" — ");
              return (
                <li key={b}>
                  <span className="feat-steps-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{head}</strong>
                    {rest.length ? <p>{rest.join(" — ")}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <CapabilityGrid
        title="What you confirm before save"
        lede="Extract proposes fields. You approve the record the vault will trust for years."
        items={page.capabilities}
        variant="rows"
      />
      <ScenarioStrip
        title="Moments this path is built for"
        items={page.scenarios}
        tone="default"
      />
      {page.stages?.length ? (
        <StagesRail
          title="After it lands in the vault"
          lede="Capture is not the finish line — it is how reminders and claims stay honest."
          items={page.stages}
        />
      ) : null}
      <DepthTail page={page} />
    </>
  );
}

function TimelineBody({ page }: { page: FeaturePageContent }) {
  const marks = page.path.includes("reminders")
    ? [
        {
          n: "30",
          label: "days out",
          body: "Plan renewals and check documents while there is still time.",
        },
        {
          n: "7",
          label: "days out",
          body: "Act — claim, renew, or replace before the window tightens.",
        },
        {
          n: "1",
          label: "day out",
          body: "Last chance reminder with the item and proof one tap away.",
        },
      ]
    : page.path.includes("coverage")
      ? [
          { n: "₹", label: "protected", body: "Purchase-backed total across active and expiring coverages." },
          { n: "3", label: "statuses", body: "Active, expiring soon, and expired — readable at a glance." },
          { n: "1", label: "source", body: "One vault rolls up the numbers finance and family both understand." },
        ]
      : [
          { n: "01", label: "urgent", body: "Items inside the near-term window rise to the top." },
          { n: "02", label: "decide", body: "Claim, renew extended cover, or archive with eyes open." },
          { n: "03", label: "prove", body: "Documents stay attached so urgency does not become a scavenger hunt." },
        ];

  return (
    <>
      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Time is the product</h2>
          <p className="feat-lede">{page.solution}</p>
          <div className="feat-timeline">
            {marks.map((m) => (
              <article key={m.n + m.label}>
                <strong className="feat-timeline-n">{m.n}</strong>
                <span className="feat-timeline-label">{m.label}</span>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="feat-band feat-band-alt">
        <div className="wrap feat-split">
          <div>
            <h2 className="feat-h2">Why quiet expiry hurts</h2>
            <p className="feat-lede">{page.problem}</p>
          </div>
          <ul className="feat-outcome-list">
            {page.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityGrid
        title="What you can do while there is still time"
        items={page.capabilities}
        variant="cards"
      />
      <ScenarioStrip title="Familiar situations" items={page.scenarios} tone="forest" />
      {page.stages?.length ? <StagesRail title="From notice to decision" items={page.stages} /> : null}
      <DepthTail page={page} />
    </>
  );
}

function StoryBody({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <section className="feat-story">
        <div className="wrap feat-story-grid">
          <article>
            <p className="page-eyebrow">Under pressure</p>
            <h2>{page.problemTitle || "The stall"}</h2>
            <p>{page.problem}</p>
          </article>
          <article>
            <p className="page-eyebrow">With Warrly</p>
            <h2>{page.solutionTitle || "The pack"}</h2>
            <p>{page.solution}</p>
          </article>
        </div>
      </section>
      {page.stages?.length ? (
        <StagesRail
          title="Claim path, step by step"
          lede="Start from the failed item. Stay attached to evidence. Update status as the centre replies."
          items={page.stages}
        />
      ) : null}
      <section className="feat-band feat-band-alt">
        <div className="wrap">
          <h2 className="feat-h2">Claim checklist</h2>
          <ul className="feat-checklist">
            {page.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityGrid
        title="What travels with the claim"
        items={page.capabilities}
        variant="tiles"
      />
      <ScenarioStrip title="When this page earns its keep" items={page.scenarios} tone="amber" />
      <DepthTail page={page} />
    </>
  );
}

function RecordBody({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Anatomy of the record</h2>
          <p className="feat-lede">{page.solution}</p>
          <div className="feat-anatomy">
            {page.bullets.map((b, i) => (
              <article key={b}>
                <span className="feat-anatomy-n">{String(i + 1).padStart(2, "0")}</span>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CapabilityGrid
        title="Fields that keep coverage honest"
        lede="A vault is only as useful as the details you can trust under stress."
        items={page.capabilities}
        variant="rows"
      />
      <section className="feat-band">
        <div className="wrap feat-split">
          <div>
            <h2 className="feat-h2">Without a durable record</h2>
            <p className="feat-lede">{page.problem}</p>
          </div>
          <div className="feat-callout">
            <h3>What changes</h3>
            <p>
              Searchable items, attached documents, and status you can read — instead of a scavenger hunt across
              email, WhatsApp, and drawers.
            </p>
          </div>
        </div>
      </section>
      <ScenarioStrip title="Household moments" items={page.scenarios} tone="default" />
      {page.stages?.length ? <StagesRail title="How the record grows" items={page.stages} /> : null}
      <DepthTail page={page} />
    </>
  );
}

function OpsBody({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <section className="feat-band">
        <div className="wrap feat-split">
          <div>
            <h2 className="feat-h2">On the floor</h2>
            <p className="feat-lede">{page.problem}</p>
          </div>
          <div>
            <h2 className="feat-h2">In the vault</h2>
            <p className="feat-lede">{page.solution}</p>
          </div>
        </div>
      </section>
      <ScenarioStrip title="Tuesday failure stories" items={page.scenarios} tone="forest" />
      <CapabilityGrid
        title="Who gets a clearer answer"
        lede="Ops, finance, and technicians should not invent three different truths."
        items={page.capabilities}
        variant="cards"
      />
      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Ops outcomes</h2>
          <div className="feat-ops-grid">
            {page.bullets.map((b) => (
              <article key={b}>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {page.stages?.length ? (
        <StagesRail title="From failure to decision" items={page.stages} />
      ) : null}
      <DepthTail page={page} />
    </>
  );
}

function TrustBody({ page }: { page: FeaturePageContent }) {
  return (
    <>
      <section className="feat-band">
        <div className="wrap">
          <h2 className="feat-h2">Principles</h2>
          <p className="feat-lede">{page.solution}</p>
          <ul className="feat-principles">
            {page.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
      <CapabilityGrid
        title="Controls that stay with you"
        items={page.capabilities}
        variant="tiles"
      />
      <section className="feat-band">
        <div className="wrap feat-callout feat-callout-wide">
          <h3>Why this matters</h3>
          <p>{page.problem}</p>
        </div>
      </section>
      <ScenarioStrip title="Trust moments" items={page.scenarios} tone="default" />
      {page.stages?.length ? <StagesRail title="Your data lifecycle" items={page.stages} /> : null}
      <DepthTail page={page} />
    </>
  );
}

export function FeaturePage({ page }: { page: FeaturePageContent }) {
  const layout = resolveLayout(page);
  const secondaryTo = layout === "ops" ? "/plans#pro" : "/plans";
  const secondaryLabel =
    layout === "ops" ? "See Pro plans" : layout === "hub" ? "Compare plans" : "See plans";

  return (
    <main className={`page feat-page feat-page--${layout}`}>
      <Hero page={page} secondaryTo={secondaryTo} secondaryLabel={secondaryLabel} />
      {layout === "hub" ? <HubBody page={page} /> : null}
      {layout === "steps" ? <StepsBody page={page} /> : null}
      {layout === "timeline" ? <TimelineBody page={page} /> : null}
      {layout === "story" ? <StoryBody page={page} /> : null}
      {layout === "record" ? <RecordBody page={page} /> : null}
      {layout === "ops" ? <OpsBody page={page} /> : null}
      {layout === "trust" ? <TrustBody page={page} /> : null}
      <CtaBand
        title={
          layout === "ops"
            ? "Ready for a Pro workspace?"
            : layout === "story"
              ? "Be claim-ready before the next failure"
              : layout === "timeline"
                ? "Put one warranty on a clock"
                : "Ready when the unexpected happens"
        }
        lead={
          layout === "timeline"
            ? "Capture one purchase today — reminders only work on items that live in the vault."
            : layout === "steps"
              ? "The best time to capture proof is the day you buy — camera up, confirm fields, done."
              : undefined
        }
      />
    </main>
  );
}
