import type { LucideIcon } from "lucide-react";

type KpiProps = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: "default" | "emphasis" | "alert";
  href?: string;
};

/** Primary dashboard metric — larger than body/nav type on purpose. */
export function KpiCard({ label, value, icon: Icon, tone = "default" }: KpiProps) {
  return (
    <article className={`app-kpi app-kpi--${tone}`}>
      <div className="app-kpi-top">
        <span className="app-kpi-label">{label}</span>
        {Icon ? (
          <span className="app-kpi-icon" aria-hidden="true">
            <Icon size={18} strokeWidth={1.75} />
          </span>
        ) : null}
      </div>
      <strong className="app-kpi-value">{value}</strong>
    </article>
  );
}
