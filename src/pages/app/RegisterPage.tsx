import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BrandLockup } from "../../components/BrandLockup";
import { config } from "../../config";
import { useAuth } from "../../lib/auth";
import { formatApiError } from "../../lib/api";

export function RegisterPage() {
  const { user, loading, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
      await register(email.trim(), password, name.trim() || email.split("@")[0]);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(formatApiError(err instanceof Error ? err.message : err, "Could not create account."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <BrandLockup to="/" />
        <h1>Create your vault</h1>
        <p className="auth-lede">Start free — syncs with the same Neon-backed Warrly API as the mobile app.</p>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            <span>Name</span>
            <input
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>
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
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </label>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="btn btn-amber" type="submit" disabled={submitting || loading}>
            {submitting ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="auth-foot">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
