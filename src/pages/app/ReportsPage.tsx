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
      <div className="wrap wrap--vault-narrow">
        <div className="app-page-head">
          <h1>Reports</h1>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {done ? (
          <p className="app-banner" role="status">
            {done}
          </p>
        ) : null}

        <section className="app-panel">
          <h2>Home inventory</h2>
          <button type="button" className="btn btn-amber" disabled={busy} onClick={() => void downloadInventory()}>
            {busy ? "Generating…" : "Download PDF"}
          </button>
        </section>
      </div>
    </main>
  );
}
