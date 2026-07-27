import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, deleteAccount, exportMyData, updateProfile } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import { loginUrl } from "../../lib/hosts";

function tierLabel(tier?: string) {
  if (tier === "plus") return "Warrly Plus";
  if (tier === "pro") return "Warrly Pro";
  return "Free";
}

export function AccountPage() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setOk("");
    try {
      await updateProfile({ name: name.trim() });
      await refreshUser();
      setOk("Profile saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update profile.");
    } finally {
      setBusy(false);
    }
  }

  async function onExport() {
    setBusy(true);
    setError("");
    setOk("");
    try {
      const data = await exportMyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `warrly-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setOk("Export downloaded.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not export data.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!window.confirm("Permanently delete your account and vault data? This cannot be undone.")) return;
    if (!window.confirm("Type-confirm: delete everything now?")) return;
    setBusy(true);
    setError("");
    try {
      await deleteAccount();
      clearAuth();
      const to = loginUrl();
      if (to.startsWith("http")) window.location.assign(to);
      else navigate(to, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete account.");
      setBusy(false);
    }
  }

  async function onLogout() {
    await logout();
    const to = loginUrl();
    if (to.startsWith("http")) window.location.assign(to);
    else navigate(to, { replace: true });
  }

  return (
    <main className="app-main">
      <div className="wrap wrap--vault-narrow">
        <div className="app-page-head">
          <h1>Account</h1>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {ok ? (
          <p className="app-banner" role="status">
            {ok}
          </p>
        ) : null}

        <section className="app-panel">
          <h2>Plan</h2>
          <p>
            <strong>{tierLabel(user?.tier)}</strong>
          </p>
          <p className="app-muted">
            {user?.tier === "free"
              ? "Paid plans are purchased in the iOS/Android app."
              : "Manage billing in the mobile app stores."}
          </p>
        </section>

        <form className="app-panel app-form-panel" style={{ marginTop: 16 }} onSubmit={(e) => void onSave(e)}>
          <h2>Profile</h2>
          <label>
            Email
            <input value={user?.email || ""} disabled readOnly />
          </label>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
          </label>
          <button type="submit" className="btn btn-forest" disabled={busy}>
            Save profile
          </button>
        </form>

        <section className="app-panel" style={{ marginTop: 16 }}>
          <h2>Data</h2>
          <div className="app-handoff-row">
            <button type="button" className="btn btn-forest" disabled={busy} onClick={() => void onExport()}>
              Export my data (JSON)
            </button>
            <button type="button" className="btn btn-forest" disabled={busy} onClick={() => void onLogout()}>
              Log out
            </button>
          </div>
        </section>

        <section className="app-panel" style={{ marginTop: 16 }}>
          <h2>Danger zone</h2>
          <p className="app-muted">Permanently deletes your account and vault data.</p>
          <button type="button" className="btn btn-amber" disabled={busy} onClick={() => void onDelete()}>
            Delete account
          </button>
        </section>
      </div>
    </main>
  );
}
