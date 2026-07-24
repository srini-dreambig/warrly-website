import { Link } from "react-router-dom";

type Props = {
  title?: string;
  lead?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
};

export function CtaBand({
  title = "Ready when the unexpected happens",
  lead = "Start free with five items. Build your vault before you need it.",
  primary = { to: "/download", label: "Download Warrly" },
  secondary = { to: "/plans", label: "Compare plans" },
}: Props) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p>{lead}</p>
        </div>
        <div className="cta-band-actions">
          <Link className="btn btn-amber" to={primary.to}>
            {primary.label}
          </Link>
          {secondary ? (
            <Link className="btn btn-ghost-dark" to={secondary.to}>
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
