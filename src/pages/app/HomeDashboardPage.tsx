import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchClaims,
  fetchItems,
  fetchReminders,
  fetchStats,
  type Claim,
  type Reminder,
  type VaultItem,
  type VaultStats,
} from "../../lib/api";
import { useAuth } from "../../lib/auth";
import {
  vaultClaimPath,
  vaultClaimsPath,
  vaultInventoryPath,
  vaultItemPath,
  vaultRemindersPath,
} from "../../lib/hosts";

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

export function HomeDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<VaultStats | null>(null);
  const [items, setItems] = useState<VaultItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [s, list, rems, claimList] = await Promise.all([
        fetchStats(),
        fetchItems(),
        fetchReminders(),
        fetchClaims(),
      ]);
      setStats(s);
      setItems(Array.isArray(list) ? list : []);
      setReminders(Array.isArray(rems) ? rems : []);
      setClaims(Array.isArray(claimList) ? claimList : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const firstName = (user?.name || "there").split(" ")[0];
  const attention = items.filter((i) => i.status === "expiring" || i.status === "expired").slice(0, 5);
  const recent = items.slice(0, 6);
  const openClaims = claims.filter((c) => c.status !== "resolved" && c.status !== "denied").slice(0, 5);

  return (
    <main className="app-main">
      <div className="wrap">
        <div className="app-page-head">
          <p className="page-eyebrow">Home</p>
          <h1>Hello, {firstName}</h1>
          <p className="lead">Coverage overview across your vault.</p>
        </div>

        {error ? (
          <div className="app-error-block" role="alert">
            <p className="auth-error">{error}</p>
            <button type="button" className="btn btn-forest btn-sm" onClick={() => void reload()}>
              Retry
            </button>
          </div>
        ) : null}

        {loading ? <p className="app-muted">Loading…</p> : null}

        {stats ? (
          <div className="app-stats">
            <article>
              <strong>{money(stats.protected_value, stats.currency)}</strong>
              <span>Protected value</span>
            </article>
            <article>
              <strong>{stats.total_items}</strong>
              <span>Items</span>
            </article>
            <article>
              <strong>{stats.reminders_open}</strong>
              <span>Open reminders</span>
            </article>
            <article>
              <strong>{stats.open_claims}</strong>
              <span>Open claims</span>
            </article>
          </div>
        ) : null}

        <div className="app-home-grid">
          <section className="app-panel">
            <div className="app-items-head">
              <h2>Needs attention</h2>
              <Link to={vaultInventoryPath()}>Inventory</Link>
            </div>
            {attention.length === 0 ? (
              <p className="app-muted">Nothing urgent right now.</p>
            ) : (
              <ul className="app-item-list">
                {attention.map((item) => (
                  <li key={item.item_id}>
                    <Link to={vaultItemPath(item.item_id)}>
                      <div>
                        <strong>{item.name || "Untitled item"}</strong>
                        <span>{item.status}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="app-panel">
            <div className="app-items-head">
              <h2>Reminders</h2>
              <Link to={vaultRemindersPath()}>View all</Link>
            </div>
            {reminders.length === 0 ? (
              <p className="app-muted">No open reminders.</p>
            ) : (
              <ul className="app-simple-list">
                {reminders.slice(0, 5).map((r) => (
                  <li key={r.reminder_id}>
                    <Link to={r.item_id ? vaultItemPath(r.item_id) : vaultRemindersPath()}>
                      <strong>{r.label || "Reminder"}</strong>
                      <span>{r.item_name || "Item"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="app-panel">
            <div className="app-items-head">
              <h2>Claims</h2>
              <Link to={vaultClaimsPath()}>View all</Link>
            </div>
            {openClaims.length === 0 ? (
              <p className="app-muted">No open claims.</p>
            ) : (
              <ul className="app-simple-list">
                {openClaims.map((c) => (
                  <li key={c.claim_id}>
                    <Link to={vaultClaimPath(c.claim_id)}>
                      <strong>{c.item_name || "Claim"}</strong>
                      <span>{c.status}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="app-panel">
            <div className="app-items-head">
              <h2>Recent items</h2>
              <Link to={vaultInventoryPath()}>View all</Link>
            </div>
            {recent.length === 0 ? (
              <p className="app-muted">Add your first item from Inventory.</p>
            ) : (
              <ul className="app-item-list">
                {recent.map((item) => (
                  <li key={item.item_id}>
                    <Link to={vaultItemPath(item.item_id)}>
                      <div>
                        <strong>{item.name || "Untitled item"}</strong>
                        <span>{[item.brand, item.category].filter(Boolean).join(" · ") || "No brand"}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
