import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthSplitLayout } from "../../components/AuthSplitLayout";
import { ART } from "../../brand";
import { config } from "../../config";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (!config.webAppEnabled) return <Navigate to="/waitlist" replace />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent("Warrly password reset help");
    const body = encodeURIComponent(
      `Hi Warrly team,\n\nPlease help me reset access for this vault email:\n${trimmed}\n\nThanks.`,
    );
    window.location.href = `mailto:${config.supportEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
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
          Self-serve reset ships with the full product. For now, email us from the address on your
          account and we will help you recover access.
        </p>
        {sent ? (
          <div className="auth-success" role="status">
            <p>
              Your mail app should open with a message to <strong>{config.supportEmail}</strong>.
              If it did not, write us directly from that address.
            </p>
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
            <button className="btn btn-amber" type="submit">
              Email support to reset
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
  );
}
