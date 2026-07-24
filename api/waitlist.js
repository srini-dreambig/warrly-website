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

    const results = { webhook: false, email: false };

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (webhookUrl) {
      const wh = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(entry),
      });
      results.webhook = wh.ok;
    }

    const notifyEmail =
      process.env.WAITLIST_NOTIFY_EMAIL ||
      process.env.VITE_SUPPORT_EMAIL ||
      "info@dataplexor.com";

    // FormSubmit delivers an email + dashboard export — no SMTP setup required.
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
    results.email = mail.ok;

    if (!results.webhook && !results.email) {
      res.status(502).json({
        ok: false,
        error: "Could not save your signup right now. Please email us or try again shortly.",
      });
      return;
    }

    res.status(200).json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("waitlist error", err);
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
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
