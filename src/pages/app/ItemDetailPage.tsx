import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActionQrModal } from "../../components/ActionQrModal";
import { deleteItem, fetchItem } from "../../lib/api";
import { vaultHomePath } from "../../lib/hosts";

type HandoffAction = "add_document" | "capture_serial" | "start_claim";

export function ItemDetailPage() {
  const { itemId = "" } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [handoff, setHandoff] = useState<HandoffAction | null>(null);
  const [banner, setBanner] = useState("");
  const [deleting, setDeleting] = useState(false);

  const reload = useCallback(async () => {
    if (!itemId) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchItem(itemId);
      setItem(data as Record<string, unknown>);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load item.");
      setItem(null);
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function onDelete() {
    if (!itemId) return;
    if (!window.confirm("Delete this item from your vault? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteItem(itemId);
      navigate(vaultHomePath(), { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete item.");
      setDeleting(false);
    }
  }

  const docs = Array.isArray(item?.documents) ? (item?.documents as Record<string, unknown>[]) : [];
  const coverages = Array.isArray(item?.coverages) ? (item?.coverages as Record<string, unknown>[]) : [];

  return (
    <main className="app-main">
      <Helmet>
        <title>{item ? `${String(item.name || "Item")} · Warrly` : "Item · Warrly"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="wrap app-detail">
        <Link className="app-back" to={vaultHomePath()}>
          ← Back to vault
        </Link>
        {banner ? (
          <p className="app-banner" role="status">
            {banner}
          </p>
        ) : null}
        {loading ? <p className="app-muted">Loading…</p> : null}
        {error ? (
          <div className="app-error-block" role="alert">
            <p className="auth-error">{error}</p>
            <button type="button" className="btn btn-forest btn-sm" onClick={() => void reload()}>
              Retry
            </button>
          </div>
        ) : null}
        {item ? (
          <>
            <p className="page-eyebrow">{String(item.category || "Item")}</p>
            <h1>{String(item.name || "Untitled item")}</h1>
            <p className="lead">
              {[item.brand, item.model, item.serial].filter(Boolean).map(String).join(" · ") ||
                "No identity fields yet"}
            </p>

            <div className="app-handoff-row">
              <button type="button" className="btn btn-forest btn-sm" onClick={() => setHandoff("add_document")}>
                Add document via QR
              </button>
              <button type="button" className="btn btn-forest btn-sm" onClick={() => setHandoff("capture_serial")}>
                Capture serial via QR
              </button>
              <button type="button" className="btn btn-amber btn-sm" onClick={() => setHandoff("start_claim")}>
                Start claim via QR
              </button>
              <button type="button" className="btn btn-forest btn-sm" onClick={() => void onDelete()} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>

            <div className="app-detail-grid">
              <section>
                <h2>Coverage</h2>
                {coverages.length === 0 ? (
                  <p className="app-muted">No coverage rows on this item.</p>
                ) : (
                  <ul className="app-simple-list">
                    {coverages.map((c, i) => (
                      <li key={String(c.coverage_id || i)}>
                        <strong>{String(c.type || "coverage")}</strong>
                        <span>
                          {String(c.provider || "—")} · ends {String(c.end_date || "unknown").slice(0, 10)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section>
                <h2>Documents</h2>
                {docs.length === 0 ? (
                  <p className="app-muted">No documents attached yet. Use QR to capture on phone.</p>
                ) : (
                  <ul className="app-simple-list">
                    {docs.map((d, i) => (
                      <li key={String(d.document_id || i)}>
                        <strong>{String(d.type || "document")}</strong>
                        <span>{String(d.mime || d.source || "file")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </>
        ) : null}
      </div>

      {handoff ? (
        <ActionQrModal
          open
          action={handoff}
          itemId={itemId}
          onClose={() => setHandoff(null)}
          onCompleted={async () => {
            setBanner("Phone action completed — refreshing…");
            setHandoff(null);
            await reload();
            setBanner("Item updated from your phone.");
            window.setTimeout(() => setBanner(""), 4000);
          }}
        />
      ) : null}
    </main>
  );
}
