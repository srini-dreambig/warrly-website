import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActionQrModal } from "../../components/ActionQrModal";
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
  const [qrOpen, setQrOpen] = useState(false);
  const [banner, setBanner] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [s, list] = await Promise.all([fetchStats(), fetchItems()]);
      setStats(s);
      setItems(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load vault.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <main className="app-main">
      <div className="wrap">
        <div className="app-page-head app-page-head--row">
          <div>
            <p className="page-eyebrow">Web vault</p>
            <h1>Your inventory</h1>
            <p className="lead">
              Browse coverage here. Camera actions use a temporary QR — finish on your phone, then data syncs to this
              vault.
            </p>
          </div>
          <button type="button" className="btn btn-amber" onClick={() => setQrOpen(true)}>
            Add item via QR
          </button>
        </div>

        {banner ? (
          <p className="app-banner" role="status">
            {banner}
          </p>
        ) : null}

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
              <p>No items yet. Generate a QR, scan with your phone, and add the first receipt in Warrly.</p>
              <button type="button" className="btn btn-amber" onClick={() => setQrOpen(true)}>
                Generate add-item QR
              </button>
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

      <ActionQrModal
        open={qrOpen}
        action="add_item"
        onClose={() => setQrOpen(false)}
        onCompleted={async () => {
          setBanner("Item saved from phone — refreshing vault…");
          setQrOpen(false);
          await reload();
          setBanner("Vault updated from your phone.");
          window.setTimeout(() => setBanner(""), 4000);
        }}
      />
    </main>
  );
}
