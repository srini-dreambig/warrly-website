import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems, fetchStats, type VaultItem, type VaultStats } from "../../lib/api";

function money(value: number, currency = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value || 0);
  } catch {
    return `₹${Math.round(value || 0).toLocaleString("en-IN")}`;
  }
}

function statusLabel(status?: string) {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function VaultHomePage() {
  const [stats, setStats] = useState<VaultStats | null>(null);
  const [items, setItems] = useState<VaultItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [s, list] = await Promise.all([fetchStats(), fetchItems()]);
        if (cancelled) return;
        setStats(s);
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load vault.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="app-main">
      <div className="wrap">
        <div className="app-page-head">
          <div>
            <p className="page-eyebrow">Web vault</p>
            <h1>Your inventory</h1>
            <p className="lead">Same Neon-backed API as the mobile app — browse coverage while stores catch up.</p>
          </div>
        </div>

        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : null}

        {loading ? <p className="app-muted">Loading…</p> : null}

        {stats ? (
          <div className="app-stats">
            <article>
              <strong>{stats.total_items}</strong>
              <span>Items</span>
            </article>
            <article>
              <strong>{money(stats.protected_value, stats.currency)}</strong>
              <span>Protected value</span>
            </article>
            <article>
              <strong>{stats.active_coverage}</strong>
              <span>Active cover</span>
            </article>
            <article>
              <strong>{stats.needs_attention}</strong>
              <span>Needs attention</span>
            </article>
          </div>
        ) : null}

        <section className="app-items">
          <div className="app-items-head">
            <h2>Items</h2>
            <span>{items.length} in vault</span>
          </div>
          {!loading && items.length === 0 ? (
            <div className="app-empty">
              <p>No items yet. Add purchases from the mobile app when it launches — or keep this account ready.</p>
              <Link className="btn btn-amber" to="/waitlist">
                Stay on the waitlist
              </Link>
            </div>
          ) : (
            <ul className="app-item-list">
              {items.map((item) => (
                <li key={item.item_id}>
                  <Link to={`/app/items/${item.item_id}`}>
                    <div>
                      <strong>{item.name || "Untitled item"}</strong>
                      <span>
                        {[item.brand, item.category].filter(Boolean).join(" · ") || "No brand"}
                      </span>
                    </div>
                    <em className={`app-status app-status--${item.status || "unknown"}`}>
                      {statusLabel(item.status)}
                    </em>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
