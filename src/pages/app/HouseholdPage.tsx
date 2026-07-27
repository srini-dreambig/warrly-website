import { useCallback, useEffect, useState } from "react";
import { Copy, UserPlus, Users } from "lucide-react";
import {
  createHouseholdInvite,
  fetchHousehold,
  joinHousehold,
  removeHouseholdMember,
  renameHousehold,
  type Household,
} from "../../lib/api";
import { useAuth } from "../../lib/auth";

export function HouseholdPage() {
  const { user } = useAuth();
  const [hh, setHh] = useState<Household | null>(null);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchHousehold();
      setHh(data);
      setName(data.name || "");
      setInviteCode(data.invite_code || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load household.");
      setHh(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function onRename(e: React.FormEvent) {
    e.preventDefault();
    const next = name.trim();
    if (!next || next === hh?.name) return;
    setBusy(true);
    setError("");
    try {
      await renameHousehold(next);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not rename household.");
    } finally {
      setBusy(false);
    }
  }

  async function onInvite() {
    setBusy(true);
    setError("");
    try {
      const r = await createHouseholdInvite();
      setInviteCode(r.code);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create invite.");
    } finally {
      setBusy(false);
    }
  }

  async function onJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!joinCode.trim()) return;
    setBusy(true);
    setError("");
    try {
      await joinHousehold(joinCode.trim().toUpperCase());
      setJoinCode("");
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join household.");
    } finally {
      setBusy(false);
    }
  }

  async function onRemove(memberId: string, memberName: string) {
    if (!window.confirm(`Remove ${memberName} from this household?`)) return;
    setBusy(true);
    setError("");
    try {
      await removeHouseholdMember(memberId);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove member.");
    } finally {
      setBusy(false);
    }
  }

  const isOwner = hh?.my_role === "owner";

  return (
    <main className="app-main">
      <div className="wrap wrap--vault">
        <div className="app-page-head">
          <h1>Household</h1>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {loading ? <p className="app-muted">Loading…</p> : null}

        {hh ? (
          <div className="app-split">
            <section className="app-split-main">
              <form className="app-panel app-form-panel" onSubmit={(e) => void onRename(e)}>
                <h2>Name</h2>
                <label>
                  Household
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
                </label>
                <button type="submit" className="btn btn-forest" disabled={busy}>
                  Save
                </button>
              </form>

              <section className="app-panel" style={{ marginTop: 14 }}>
                <div className="app-items-head">
                  <h2>
                    <Users size={16} strokeWidth={1.75} aria-hidden="true" />
                    Members
                  </h2>
                  <span>{(hh.members || []).length}</span>
                </div>
                <ul className="app-simple-list">
                  {(hh.members || []).map((m) => (
                    <li key={m.user_id}>
                      <div>
                        <strong>
                          {m.name || m.email || "Member"} {m.role === "owner" ? "(owner)" : ""}
                        </strong>
                        <span>{m.email}</span>
                      </div>
                      {isOwner && m.user_id !== user?.user_id ? (
                        <button
                          type="button"
                          className="btn btn-forest btn-sm"
                          disabled={busy}
                          onClick={() => void onRemove(m.user_id, m.name || m.email || "member")}
                        >
                          Remove
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </section>

            <aside className="app-split-side">
              {isOwner ? (
                <section className="app-panel app-form-panel">
                  <h2>
                    <UserPlus size={16} strokeWidth={1.75} aria-hidden="true" />
                    Invite
                  </h2>
                  {inviteCode ? (
                    <div className="app-invite-row">
                      <strong className="app-invite-code">{inviteCode}</strong>
                      <button
                        type="button"
                        className="btn btn-forest btn-sm"
                        onClick={() => void navigator.clipboard.writeText(inviteCode)}
                      >
                        <Copy size={14} strokeWidth={2} aria-hidden="true" />
                        Copy
                      </button>
                    </div>
                  ) : null}
                  <button type="button" className="btn btn-amber" disabled={busy} onClick={() => void onInvite()}>
                    {inviteCode ? "Refresh code" : "Create invite code"}
                  </button>
                </section>
              ) : null}

              <form
                className="app-panel app-form-panel"
                style={{ marginTop: isOwner ? 14 : 0 }}
                onSubmit={(e) => void onJoin(e)}
              >
                <h2>Join</h2>
                <label>
                  Invite code
                  <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="ABC234"
                    maxLength={12}
                  />
                </label>
                <button type="submit" className="btn btn-forest" disabled={busy || joinCode.trim().length < 4}>
                  Join household
                </button>
              </form>
            </aside>
          </div>
        ) : null}
      </div>
    </main>
  );
}
