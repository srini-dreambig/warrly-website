import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchItem } from "../../lib/api";

export function ItemDetailPage() {
  const { itemId = "" } = useParams();
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!itemId) return;
      setLoading(true);
      setError("");
      try {
        const data = await fetchItem(itemId);
        if (!cancelled) setItem(data as Record<string, unknown>);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load item.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [itemId]);

  const docs = Array.isArray(item?.documents) ? (item?.documents as Record<string, unknown>[]) : [];
  const coverages = Array.isArray(item?.coverages) ? (item?.coverages as Record<string, unknown>[]) : [];

  return (
    <main className="app-main">
      <div className="wrap app-detail">
        <Link className="app-back" to="/app">
          ← Back to vault
        </Link>
        {loading ? <p className="app-muted">Loading…</p> : null}
        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : null}
        {item ? (
          <>
            <p className="page-eyebrow">{String(item.category || "Item")}</p>
            <h1>{String(item.name || "Untitled item")}</h1>
            <p className="lead">
              {[item.brand, item.model, item.serial].filter(Boolean).map(String).join(" · ") || "No identity fields yet"}
            </p>

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
                  <p className="app-muted">No documents attached yet.</p>
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
    </main>
  );
}
