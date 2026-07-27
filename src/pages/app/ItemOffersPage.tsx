import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { clickOffer, fetchItem, fetchOffers, type Offer } from "../../lib/api";
import { vaultItemPath } from "../../lib/hosts";

function money(value?: number | null, currency = "INR") {
  if (value == null) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  }
}

export function ItemOffersPage() {
  const { itemId = "" } = useParams();
  const [itemName, setItemName] = useState("");
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [clicking, setClicking] = useState("");

  const reload = useCallback(async () => {
    if (!itemId) return;
    setLoading(true);
    setError("");
    try {
      const [item, list] = await Promise.all([fetchItem(itemId), fetchOffers(itemId)]);
      setItemName(String(item.name || "Item"));
      setOffers(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load offers.");
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function openOffer(offerId: string) {
    if (!itemId) return;
    setClicking(offerId);
    setError("");
    try {
      const r = await clickOffer(offerId, itemId);
      window.open(r.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open offer.");
    } finally {
      setClicking("");
    }
  }

  return (
    <main className="app-main">
      <Helmet>
        <title>Offers · {itemName || "Item"} · Warrly</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="wrap wrap--vault">
        <Link className="app-back" to={vaultItemPath(itemId)}>
          ← Back to item
        </Link>
        <div className="app-page-head">
          <h1>Offers</h1>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {loading ? <p className="app-muted">Loading…</p> : null}

        {!loading && offers.length === 0 ? (
          <div className="app-empty">
            <p>No partner offers for this item right now.</p>
          </div>
        ) : (
          <ul className="app-card-list">
            {offers.map((o) => (
              <li key={o.offer_id} className="app-card">
                <div className="app-card-head">
                  <div>
                    <strong>{o.title || "Offer"}</strong>
                    <span>
                      {o.partner || "Partner"}
                      {o.term_months ? ` · ${o.term_months} mo` : ""}
                    </span>
                  </div>
                  <em className="app-status">{money(o.price, o.currency || "INR")}</em>
                </div>
                {o.description ? <p className="app-muted">{o.description}</p> : null}
                <div className="app-card-actions">
                  <button
                    type="button"
                    className="btn btn-amber btn-sm"
                    disabled={clicking === o.offer_id}
                    onClick={() => void openOffer(o.offer_id)}
                  >
                    {clicking === o.offer_id ? "Opening…" : "View checkout"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
