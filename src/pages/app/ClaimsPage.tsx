import { useCallback, useEffect, useState } from "react";
import { FilePlus2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { assistClaimDraft, createClaim, fetchClaims, fetchItems, type Claim, type VaultItem } from "../../lib/api";
import { vaultClaimPath } from "../../lib/hosts";

export function ClaimsPage() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [items, setItems] = useState<VaultItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState("");
  const [issue, setIssue] = useState("");
  const [letterPreview, setLetterPreview] = useState("");
  const [aiModel, setAiModel] = useState("");
  const [creating, setCreating] = useState(false);
  const [assisting, setAssisting] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [list, its] = await Promise.all([fetchClaims(), fetchItems()]);
      setClaims(Array.isArray(list) ? list : []);
      setItems(Array.isArray(its) ? its : []);
      setItemId((prev) => prev || (Array.isArray(its) && its[0] ? its[0].item_id : ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load claims.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function onAssist() {
    if (!itemId || issue.trim().length < 3) {
      setError("Pick an item and describe what happened (a few words is enough).");
      return;
    }
    setAssisting(true);
    setError("");
    try {
      const result = await assistClaimDraft({ item_id: itemId, notes: issue.trim() });
      if (result.issue) setIssue(result.issue);
      setLetterPreview(result.letter || "");
      setAiModel(result.model || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI assistant could not draft this claim.");
    } finally {
      setAssisting(false);
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!itemId || !issue.trim()) return;
    setCreating(true);
    setError("");
    try {
      const claim = await createClaim({ item_id: itemId, issue: issue.trim(), use_ai: true });
      setIssue("");
      setLetterPreview("");
      navigate(vaultClaimPath(claim.claim_id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start claim.");
      setCreating(false);
    }
  }

  return (
    <main className="app-main">
      <div className="wrap wrap--vault">
        <div className="app-page-head">
          <h1>Claims</h1>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}

        <div className="app-split">
          <section className="app-split-main">
            <div className="app-items-head">
              <h2>Inbox</h2>
              <span>{claims.length}</span>
            </div>
            {loading ? <p className="app-muted">Loading…</p> : null}
            {!loading && claims.length === 0 ? (
              <div className="app-empty">
                <p>No claims yet.</p>
              </div>
            ) : (
              <ul className="app-item-list">
                {claims.map((c) => (
                  <li key={c.claim_id}>
                    <Link to={vaultClaimPath(c.claim_id)}>
                      <div>
                        <strong>{c.item_name || "Claim"}</strong>
                        <span className="app-line-clamp">{c.issue || "No issue text"}</span>
                      </div>
                      <em className="app-status">{c.status || "draft"}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <aside className="app-split-side">
            <form className="app-panel app-form-panel" onSubmit={(e) => void onCreate(e)}>
              <h2>Draft claim</h2>
              <label>
                Item
                <select value={itemId} onChange={(e) => setItemId(e.target.value)} required>
                  <option value="" disabled>
                    Select item
                  </option>
                  {items.map((it) => (
                    <option key={it.item_id} value={it.item_id}>
                      {it.name || "Untitled"}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                What happened?
                <textarea
                  rows={4}
                  value={issue}
                  onChange={(e) => {
                    setIssue(e.target.value);
                    setLetterPreview("");
                  }}
                  placeholder="e.g. screen flickering after 2 months"
                  required
                />
              </label>
              <div className="app-form-actions">
                <button
                  type="button"
                  className="btn btn-forest app-ai-assist-btn"
                  disabled={assisting || !items.length}
                  onClick={() => void onAssist()}
                >
                  <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
                  {assisting ? "AI drafting…" : "AI Assistant"}
                </button>
                <button type="submit" className="btn btn-amber" disabled={creating || !items.length}>
                  <FilePlus2 size={16} strokeWidth={2} aria-hidden="true" />
                  {creating ? "Creating…" : "Save draft"}
                </button>
              </div>
              <p className="app-muted">Type a short issue, then use AI Assistant to polish the claim letter.</p>
              {letterPreview ? (
                <div className="app-ai-preview">
                  <div className="app-items-head">
                    <h2>Letter preview</h2>
                    {aiModel ? <span>{aiModel.replace(":free", "")}</span> : null}
                  </div>
                  <pre className="app-pre">{letterPreview}</pre>
                </div>
              ) : null}
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}
