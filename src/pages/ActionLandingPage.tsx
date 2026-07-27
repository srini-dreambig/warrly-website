import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BrandLockup } from "../components/BrandLockup";
import { config } from "../config";
import { getActionLink, type ActionSession } from "../lib/api";
import { vaultHomePath } from "../lib/hosts";

export function ActionLandingPage() {
  const { token = "" } = useParams();
  const [session, setSession] = useState<ActionSession | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const live = await getActionLink(token);
        if (!cancelled) setSession(live);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Link not found");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!session?.deep_link) return;
    // Try to open the native app immediately on phones
    const t = window.setTimeout(() => {
      window.location.href = session.deep_link;
    }, 400);
    return () => window.clearTimeout(t);
  }, [session?.deep_link]);

  return (
    <main className="action-landing">
      <BrandLockup to="/" className="auth-split-brand" />
      <div className="action-landing-card">
        <p className="auth-eyebrow">Warrly handoff</p>
        <h1>{session?.action_title || "Open in Warrly"}</h1>
        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : (
          <p className="lead">
            {session?.status === "completed"
              ? "This action is already complete. Open your vault to see the update."
              : "Opening the Warrly app so you can finish with the camera. If nothing happens, tap the button below."}
          </p>
        )}
        {session?.deep_link ? (
          <a className="btn btn-amber" href={session.deep_link}>
            Open Warrly app
          </a>
        ) : null}
        <p className="auth-foot">
          <a href={config.loginPath}>Log in on web</a>
          {" · "}
          <Link to={vaultHomePath()}>Go to vault</Link>
        </p>
      </div>
    </main>
  );
}
