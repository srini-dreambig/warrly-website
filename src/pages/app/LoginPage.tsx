import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BrandLockup } from "../../components/BrandLockup";
import { config } from "../../config";
import { useAuth } from "../../lib/auth";
import { formatApiError } from "../../lib/api";

export function LoginPage() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!config.webAppEnabled) return <Navigate to="/waitlist" replace />;
  if (!loading && user) return <Navigate to="/app" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(formatApiError(err instanceof Error ? err.message : err, "Could not log in."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <BrandLockup to="/" />
        <h1>Log in to your vault</h1>
        <p className="auth-lede">Use the same account as the Warrly mobile app when it ships.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="btn btn-amber" type="submit" disabled={submitting || loading}>
            {submitting ? "Signing in…" : "Log in"}
          </button>
        </form>
        <p className="auth-foot">
          New here? <Link to="/register">Create an account</Link> · <Link to="/waitlist">Join waitlist</Link>
        </p>
      </div>
    </main>
  );
}
