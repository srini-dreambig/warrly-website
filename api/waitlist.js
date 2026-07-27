const { neon } = require("@neondatabase/serverless");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const errors = validate(body);
    if (errors.length) {
      res.status(400).json({ ok: false, error: errors[0], errors });
      return;
    }

    const entry = {
      id: `wl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      fullName: String(body.fullName).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: normalizePhone(body.phone),
      platform: body.platform,
      intent: body.intent,
      company: body.intent === "personal" ? "" : String(body.company || "").trim(),
      city: String(body.city || "").trim(),
      source: String(body.source || "web").trim(),
      userAgent: String(body.userAgent || "").slice(0, 300),
      consent: true,
      status: "waitlist",
    };

    const results = { db: false, webhook: false, email: false };
    const failures = [];

    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          CREATE TABLE IF NOT EXISTS website_waitlist (
            id TEXT PRIMARY KEY,
            created_at TIMESTAMPTZ NOT NULL,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            platform TEXT NOT NULL,
            intent TEXT NOT NULL,
            company TEXT,
            city TEXT,
            source TEXT,
            user_agent TEXT,
            consent BOOLEAN NOT NULL DEFAULT TRUE,
            status TEXT NOT NULL DEFAULT 'waitlist'
          )
        `;
        await sql`
          CREATE INDEX IF NOT EXISTS website_waitlist_email_idx ON website_waitlist (email)
        `;
        await sql`
          INSERT INTO website_waitlist (
            id, created_at, full_name, email, phone, platform, intent,
            company, city, source, user_agent, consent, status
          ) VALUES (
            ${entry.id},
            ${entry.createdAt},
            ${entry.fullName},
            ${entry.email},
            ${entry.phone},
            ${entry.platform},
            ${entry.intent},
            ${entry.company},
            ${entry.city},
            ${entry.source},
            ${entry.userAgent},
            ${entry.consent},
            ${entry.status}
          )
        `;
        results.db = true;
      } catch (dbErr) {
        console.error("waitlist db error", dbErr);
        failures.push("database");
      }
    }

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const wh = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(entry),
        });
        results.webhook = wh.ok;
        if (!wh.ok) failures.push("webhook");
      } catch (whErr) {
        console.error("waitlist webhook error", whErr);
        failures.push("webhook");
      }
    }

    const notifyEmail =
      process.env.WAITLIST_NOTIFY_EMAIL ||
      process.env.VITE_SUPPORT_EMAIL ||
      "info@dataplexor.com";

    try {
      const mail = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[Warrly waitlist] ${entry.fullName} · ${entry.intent}`,
          _template: "table",
          _captcha: "false",
          name: entry.fullName,
          email: entry.email,
          phone: entry.phone,
          platform: entry.platform,
          intent: entry.intent,
          company: entry.company || "—",
          city: entry.city || "—",
          source: entry.source,
          waitlist_id: entry.id,
          created_at: entry.createdAt,
          json: JSON.stringify(entry),
        }),
      });
      const mailBody = await mail.json().catch(() => ({}));
      const mailOk =
        mail.ok &&
        mailBody &&
        mailBody.success !== false &&
        mailBody.error == null;
      results.email = Boolean(mailOk);
      if (!mailOk) {
        console.error("waitlist email response", mail.status, mailBody);
        failures.push("email");
      }
    } catch (mailErr) {
      console.error("waitlist email error", mailErr);
      failures.push("email");
    }

    if (!results.db && !results.webhook && !results.email) {
      res.status(502).json({
        ok: false,
        error:
          "Could not save your signup right now. Please email info@dataplexor.com or try again shortly.",
        failures,
      });
      return;
    }

    res.status(200).json({ ok: true, id: entry.id, stored: results });
  } catch (err) {
    console.error("waitlist error", err);
    const message =
      err && typeof err === "object" && typeof err.message === "string"
        ? err.message
        : "Something went wrong. Please try again.";
    res.status(500).json({
      ok: false,
      error: typeof message === "string" ? message : "Something went wrong. Please try again.",
    });
  }
};

function normalizePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function validate(body) {
  const errors = [];
  if (!body || typeof body !== "object") return ["Invalid payload"];

  const fullName = String(body.fullName || "").trim();
  if (fullName.length < 2) errors.push("Please enter your full name.");

  const email = String(body.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email.");

  const phone = normalizePhone(body.phone);
  if (!/^[6-9]\d{9}$/.test(phone)) errors.push("Please enter a valid 10-digit Indian mobile number.");

  const platform = body.platform;
  if (!["ios", "android", "both"].includes(platform)) errors.push("Please choose a platform.");

  const intent = body.intent;
  if (!["personal", "business", "both"].includes(intent)) errors.push("Please choose how you will use Warrly.");

  if (intent === "business" || intent === "both") {
    if (String(body.company || "").trim().length < 2) {
      errors.push("Please enter your company or workspace name.");
    }
  }

  if (!body.consent) errors.push("Please agree to be contacted about the Warrly launch.");

  return errors;
}
