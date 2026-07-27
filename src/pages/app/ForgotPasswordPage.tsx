import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { AuthSplitLayout } from "../../components/AuthSplitLayout";
import { ART } from "../../brand";
import { config } from "../../config";
import { formatApiError } from "../../lib/api";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [devUrl, setDevUrl] = useState("");

  if (!config.webAppEnabled) return <Navigate to="/waitlist" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        detail?: unknown;
        dev_reset_url?: string;
      };
      if (!res.ok) {
        throw new Error(formatApiError(data, "Could not start password reset."));
      }
      if (data.dev_reset_url) setDevUrl(data.dev_reset_url);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start password reset.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Forgot password · Warrly</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AuthSplitLayout
        imageSrc={ART.allClear}
        imageAlt="Warrly all-clear illustration"
        canvasColor="var(--illu-all-clear)"
        quote="We'll get you back into your vault — coverage shouldn't vanish with a forgotten password."
      >
        <div className="auth-panel-card">
          <p className="auth-eyebrow">Account recovery</p>
          <h1>Forgot password</h1>
          <p className="auth-lede">
            Enter the email on your vault. If an account exists, we send a one-hour reset link.
          </p>
          {sent ? (
            <div className="auth-success" role="status">
              <p>
                If that email is registered, a reset link is on the way. Check your inbox (and spam)
                within the next hour.
              </p>
              {devUrl ? (
                <p>
                  Dev link:{" "}
                  <a href={devUrl}>{devUrl}</a>
                </p>
              ) : null}
              <Link className="btn btn-forest" to="/login">
                Back to log in
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="auth-form">
              <label>
                <span>Account email</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              {error ? (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button className="btn btn-amber" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}
          <p className="auth-foot">
            Remembered it? <Link to="/login">Log in</Link>
            {" · "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </AuthSplitLayout>
    </>
  );
}
