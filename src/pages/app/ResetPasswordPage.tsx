import { useMemo, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthSplitLayout } from "../../components/AuthSplitLayout";
import { ART } from "../../brand";
import { config } from "../../config";
import { formatApiError } from "../../lib/api";

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = useMemo(() => (params.get("token") || "").trim(), [params]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!config.webAppEnabled) return <Navigate to="/waitlist" replace />;
  if (!token) return <Navigate to="/forgot-password" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(formatApiError(data, "Could not reset password."));
      }
      setDone(true);
      window.setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Reset password · Warrly</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AuthSplitLayout
        imageSrc={ART.allClear}
        imageAlt="Warrly all-clear illustration"
        canvasColor="var(--illu-all-clear)"
        quote="Choose a new password — then get back to keeping every warranty."
      >
        <div className="auth-panel-card">
          <p className="auth-eyebrow">Account recovery</p>
          <h1>Reset password</h1>
          <p className="auth-lede">This link works once and expires in an hour.</p>
          {done ? (
            <div className="auth-success" role="status">
              <p>Password updated. Taking you to log in…</p>
              <Link className="btn btn-forest" to="/login">
                Log in
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="auth-form">
              <label>
                <span>New password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                <span>Confirm password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
              {error ? (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button className="btn btn-amber" type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Update password"}
              </button>
            </form>
          )}
          <p className="auth-foot">
            <Link to="/forgot-password">Request a new link</Link>
            {" · "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </AuthSplitLayout>
    </>
  );
}
