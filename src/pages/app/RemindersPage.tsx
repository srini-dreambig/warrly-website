import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actionReminder, fetchReminders, type Reminder } from "../../lib/api";
import { vaultItemPath } from "../../lib/hosts";

function relDate(iso?: string | null): { label: string; urgent: boolean } {
  if (!iso) return { label: "", urgent: false };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { label: "", urgent: false };
  const days = Math.round((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, urgent: true };
  if (days === 0) return { label: "Today", urgent: true };
  if (days === 1) return { label: "Tomorrow", urgent: true };
  if (days <= 7) return { label: `In ${days}d`, urgent: true };
  return { label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), urgent: false };
}

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const list = await fetchReminders();
      setReminders(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load reminders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function act(id: string, action: "snooze" | "done") {
    setBusyId(id);
    setError("");
    try {
      await actionReminder(id, action);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update reminder.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <main className="app-main">
      <div className="wrap">
        <div className="app-page-head">
          <p className="page-eyebrow">Reminders</p>
          <h1>What needs a nudge</h1>
          <p className="lead">Warranty and claim follow-ups from your vault.</p>
        </div>

        {error ? <p className="auth-error" role="alert">{error}</p> : null}
        {loading ? <p className="app-muted">Loading…</p> : null}

        {!loading && reminders.length === 0 ? (
          <div className="app-empty">
            <p>All clear — no open reminders.</p>
          </div>
        ) : (
          <ul className="app-card-list">
            {reminders.map((r) => {
              const info = relDate(r.fire_at);
              return (
                <li key={r.reminder_id} className="app-card">
                  <div className="app-card-head">
                    <div>
                      <strong>{r.label || "Reminder"}</strong>
                      <span>{r.item_name || "Item"}</span>
                    </div>
                    {info.label ? (
                      <em className={`app-status${info.urgent ? " app-status--expiring" : ""}`}>{info.label}</em>
                    ) : null}
                  </div>
                  <div className="app-card-actions">
                    {r.item_id ? (
                      <Link className="btn btn-ghost btn-sm" to={vaultItemPath(r.item_id)}>
                        Open item
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="btn btn-forest btn-sm"
                      disabled={busyId === r.reminder_id}
                      onClick={() => void act(r.reminder_id, "snooze")}
                    >
                      Snooze 7d
                    </button>
                    <button
                      type="button"
                      className="btn btn-amber btn-sm"
                      disabled={busyId === r.reminder_id}
                      onClick={() => void act(r.reminder_id, "done")}
                    >
                      Mark done
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
