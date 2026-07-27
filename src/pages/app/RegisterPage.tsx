import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthSplitLayout } from "../../components/AuthSplitLayout";
import { ART } from "../../brand";
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
    <AuthSplitLayout
      imageSrc={ART.welcomePersonal}
      imageAlt="Warrly personal vault illustration"
      canvasColor="var(--illu-welcome-personal)"
      quote="Snap the receipt once. Your vault remembers — coverage, claims, and calm."
    >
      <div className="auth-panel-card">
        <p className="auth-eyebrow">Start free</p>
        <h1>Create account</h1>
        <p className="auth-lede">Same Neon-backed vault as the mobile app. Free starts at five items.</p>
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
              placeholder="you@example.com"
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
            {submitting ? "Creating…" : "Sign up"}
          </button>
        </form>
        <p className="auth-foot">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
