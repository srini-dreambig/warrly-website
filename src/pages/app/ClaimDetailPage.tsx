import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  downloadBase64File,
  fetchClaim,
  fetchClaimPack,
  updateClaim,
  type Claim,
} from "../../lib/api";
import { vaultClaimsPath, vaultItemPath } from "../../lib/hosts";

const STATUSES = [
  { id: "draft", label: "Draft" },
  { id: "filed", label: "Filed" },
  { id: "in_service", label: "In service" },
  { id: "resolved", label: "Resolved" },
  { id: "denied", label: "Denied" },
] as const;

export function ClaimDetailPage() {
  const { claimId = "" } = useParams();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    if (!claimId) return;
    setLoading(true);
    setError("");
    try {
      setClaim(await fetchClaim(claimId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load claim.");
      setClaim(null);
    } finally {
      setLoading(false);
    }
  }, [claimId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function setStatus(status: string) {
    if (!claimId) return;
    setBusy(true);
    setError("");
    try {
      setClaim(await updateClaim(claimId, { status }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadPack() {
    if (!claimId) return;
    setBusy(true);
    setError("");
    try {
      const pack = await fetchClaimPack(claimId);
      downloadBase64File(pack);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not download evidence pack.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-main">
      <Helmet>
        <title>{claim ? `${claim.item_name || "Claim"} · Warrly` : "Claim · Warrly"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="wrap app-detail">
        <Link className="app-back" to={vaultClaimsPath()}>
          ← Back to claims
        </Link>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {loading ? <p className="app-muted">Loading…</p> : null}

        {claim ? (
          <>
            <p className="page-eyebrow">{claim.status || "draft"}</p>
            <h1>{claim.item_name || "Claim"}</h1>
            <p className="lead">{claim.issue || "No issue description"}</p>

            <div className="app-handoff-row">
              {claim.item_id ? (
                <Link className="btn btn-forest btn-sm" to={vaultItemPath(claim.item_id)}>
                  Open item
                </Link>
              ) : null}
              <button type="button" className="btn btn-amber btn-sm" disabled={busy} onClick={() => void downloadPack()}>
                Download evidence pack
              </button>
              {claim.brand_support_url ? (
                <a className="btn btn-forest btn-sm" href={claim.brand_support_url} target="_blank" rel="noreferrer">
                  Brand support
                </a>
              ) : null}
              {claim.brand_escalation_email ? (
                <a
                  className="btn btn-forest btn-sm"
                  href={`mailto:${claim.brand_escalation_email}?subject=${encodeURIComponent(
                    `Warranty claim: ${claim.item_name || ""}`,
                  )}&body=${encodeURIComponent(claim.message || "")}`}
                >
                  Email brand
                </a>
              ) : null}
              {claim.brand_support_phone ? (
                <a className="btn btn-forest btn-sm" href={`tel:${claim.brand_support_phone.replace(/[\s-]/g, "")}`}>
                  Call {claim.brand_support_phone}
                </a>
              ) : null}
            </div>

            <section className="app-panel" style={{ marginTop: 20 }}>
              <h2>Status</h2>
              <div className="app-handoff-row">
                {STATUSES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`btn btn-sm ${claim.status === s.id ? "btn-amber" : "btn-forest"}`}
                    disabled={busy || claim.status === s.id}
                    onClick={() => void setStatus(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>

            {claim.message ? (
              <section className="app-panel" style={{ marginTop: 16 }}>
                <h2>Claim letter</h2>
                <pre className="app-pre">{claim.message}</pre>
                <button
                  type="button"
                  className="btn btn-forest btn-sm"
                  onClick={() => void navigator.clipboard.writeText(claim.message || "")}
                >
                  Copy letter
                </button>
              </section>
            ) : null}

            {Array.isArray(claim.timeline) && claim.timeline.length ? (
              <section className="app-panel" style={{ marginTop: 16 }}>
                <h2>Timeline</h2>
                <ul className="app-simple-list">
                  {claim.timeline.map((t, i) => (
                    <li key={`${t.at}-${i}`}>
                      <strong>{t.event || "Update"}</strong>
                      <span>{t.at ? new Date(t.at).toLocaleString() : ""}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
}
