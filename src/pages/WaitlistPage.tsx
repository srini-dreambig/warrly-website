import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DownloadQr } from "../components/DownloadQr";
import { config } from "../config";
import { formatApiError } from "../lib/api";

type Platform = "ios" | "android" | "both";
type Intent = "personal" | "business" | "both";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  platform: Platform | "";
  intent: Intent | "";
  company: string;
  city: string;
  consent: boolean;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  platform: "",
  intent: "",
  company: "",
  city: "",
  consent: false,
};

function humanizeWaitlistError(raw: unknown, status?: number): string {
  if (typeof raw === "string" && raw.trim() && !raw.includes("[object Object]")) return raw.trim();
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
    if (Array.isArray(obj.errors) && typeof obj.errors[0] === "string") return obj.errors[0];
    try {
      const s = JSON.stringify(raw);
      if (s && s !== "{}" && s !== "[]") return s;
    } catch {
      /* ignore */
    }
  }
  return status
    ? `Could not join the waitlist (${status}). Please try again.`
    : "Could not join the waitlist. Please try again.";
}

export function WaitlistPage() {
  const [params] = useSearchParams();
  const source = params.get("src") || params.get("source") || "web";
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [doneId, setDoneId] = useState("");
  const needsCompany = form.intent === "business" || form.intent === "both";

  const phoneHint = useMemo(() => {
    const digits = form.phone.replace(/\D/g, "");
    if (!digits) return "10-digit Indian mobile";
    if (digits.length < 10) {
      const left = 10 - digits.length;
      return `${left} more digit${left === 1 ? "" : "s"}`;
    }
    return "Looks good";
  }, [form.phone]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        source,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      };
      const res = await fetch(`${config.apiUrl}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: unknown;
        detail?: unknown;
        id?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(
          humanizeWaitlistError(data.error ?? data.detail ?? formatApiError(data, ""), res.status),
        );
      }
      setDoneId(data.id || "ok");
      setForm(initial);
    } catch (err) {
      setError(humanizeWaitlistError(err instanceof Error ? err.message : err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page waitlist-page">
      <section className="page-hero page-hero-solo">
        <div className="wrap page-hero-copy">
          <p className="page-eyebrow">Early access</p>
          <h1>Join the Warrly waitlist</h1>
          <p className="lead">
            The app is not on the stores yet. Leave your details and we will notify you as soon as Warrly is ready —
            personal vaults first, then Pro for teams. Scan the QR or fill the form on this page.
          </p>
        </div>
      </section>

      <section className="capability-section">
        <div className="wrap waitlist-layout">
          <div className="waitlist-copy">
            <h2>What you get on launch</h2>
            <ul className="waitlist-perks">
              <li>Early access when iOS / Android / web go live</li>
              <li>Launch tips for capturing your first GST bill or e-comm invoice</li>
              <li>A seat on the list we use to invite design partners and households</li>
            </ul>
            <DownloadQr id="waitlist-qr" label="Scan to open this waitlist" />
            <p className="waitlist-note">
              Already talking to us? <Link to="/contact">Contact</Link> · Questions? <Link to="/faq">FAQs</Link>
            </p>
          </div>

          <div className="waitlist-panel">
            {doneId ? (
              <div className="waitlist-success" role="status">
                <h2>You are on the list</h2>
                <p>Thanks — we saved your details for launch. We will email you when Warrly is ready to download.</p>
                <p className="waitlist-ref">Reference: {doneId}</p>
                <button type="button" className="btn btn-forest" onClick={() => setDoneId("")}>
                  Add another person
                </button>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={onSubmit} noValidate>
                <h2>Your details</h2>
                <p className="waitlist-form-lede">Required fields help us launch for the right devices and use cases.</p>

                <label className="waitlist-field">
                  <span>Full name *</span>
                  <input
                    name="fullName"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    placeholder="e.g. Ananya Sharma"
                  />
                </label>

                <label className="waitlist-field">
                  <span>Email *</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@email.com"
                  />
                </label>

                <label className="waitlist-field">
                  <span>Mobile (India) *</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="98XXXXXXXX"
                  />
                  <em>{phoneHint}</em>
                </label>

                <fieldset className="waitlist-fieldset">
                  <legend>Preferred platform *</legend>
                  <div className="waitlist-choices">
                    {(
                      [
                        ["ios", "iPhone"],
                        ["android", "Android"],
                        ["both", "Both"],
                      ] as const
                    ).map(([value, label]) => (
                      <label key={value} className={form.platform === value ? "is-selected" : ""}>
                        <input
                          type="radio"
                          name="platform"
                          value={value}
                          checked={form.platform === value}
                          onChange={() => setForm((f) => ({ ...f, platform: value }))}
                          required
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="waitlist-fieldset">
                  <legend>I will use Warrly for *</legend>
                  <div className="waitlist-choices">
                    {(
                      [
                        ["personal", "Personal / home"],
                        ["business", "Business / team"],
                        ["both", "Both"],
                      ] as const
                    ).map(([value, label]) => (
                      <label key={value} className={form.intent === value ? "is-selected" : ""}>
                        <input
                          type="radio"
                          name="intent"
                          value={value}
                          checked={form.intent === value}
                          onChange={() => setForm((f) => ({ ...f, intent: value }))}
                          required
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {needsCompany ? (
                  <label className="waitlist-field">
                    <span>Company / workspace *</span>
                    <input
                      name="company"
                      autoComplete="organization"
                      required={needsCompany}
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="e.g. Bright Clinics Pvt Ltd"
                    />
                  </label>
                ) : null}

                <label className="waitlist-field">
                  <span>City</span>
                  <input
                    name="city"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    placeholder="e.g. Bengaluru"
                  />
                </label>

                <label className="waitlist-consent">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    required
                  />
                  <span>
                    I agree to be contacted about Warrly launch access. See our <Link to="/privacy">Privacy policy</Link>
                    . *
                  </span>
                </label>

                {error ? (
                  <p className="waitlist-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <button className="btn btn-amber" type="submit" disabled={submitting}>
                  {submitting ? "Saving…" : "Join the waitlist"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
