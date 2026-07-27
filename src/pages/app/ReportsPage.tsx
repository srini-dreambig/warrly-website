import { useState } from "react";
import { downloadBase64File, fetchHomeInventoryReport } from "../../lib/api";

export function ReportsPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function downloadInventory() {
    setBusy(true);
    setError("");
    setDone("");
    try {
      const file = await fetchHomeInventoryReport();
      downloadBase64File(file);
      setDone(`Downloaded ${file.filename}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate report.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-main">
      <div className="wrap">
        <div className="app-page-head">
          <p className="page-eyebrow">Reports</p>
          <h1>Shareable PDFs</h1>
          <p className="lead">Export a home inventory report from the live vault data.</p>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {done ? (
          <p className="app-banner" role="status">
            {done}
          </p>
        ) : null}

        <section className="app-panel">
          <h2>Home inventory report</h2>
          <p className="app-muted">PDF of items and coverage in your personal vault.</p>
          <button type="button" className="btn btn-amber" disabled={busy} onClick={() => void downloadInventory()}>
            {busy ? "Generating…" : "Download PDF"}
          </button>
        </section>
      </div>
    </main>
  );
}
