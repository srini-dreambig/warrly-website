import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  cancelActionSession,
  createActionSession,
  getActionLink,
  type ActionSession,
} from "../lib/api";

type Action = "add_item" | "add_document" | "capture_serial" | "start_claim";

const COPY: Record<Action, { title: string; body: string }> = {
  add_item: {
    title: "Add item from phone",
    body: "Scan with your phone camera. Open Warrly, capture the receipt, and save — it will appear in this vault.",
  },
  add_document: {
    title: "Attach a document",
    body: "Scan to open this item on your phone and attach an invoice or warranty photo.",
  },
  capture_serial: {
    title: "Capture serial number",
    body: "Scan to open the camera on your phone and photograph the serial plate.",
  },
  start_claim: {
    title: "Start a claim",
    body: "Scan to open the claim flow on your phone for this item.",
  },
};

type Props = {
  action: Action;
  itemId?: string;
  open: boolean;
  onClose: () => void;
  onCompleted?: (session: ActionSession) => void;
};

export function ActionQrModal({ action, itemId, open, onClose, onCompleted }: Props) {
  const [session, setSession] = useState<ActionSession | null>(null);
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setError("");
      setSession(null);
      setQr("");
      setStatus("pending");
      try {
        const created = await createActionSession({
          action,
          item_id: itemId,
        });
        if (cancelled) return;
        setSession(created);
        setStatus(created.status);
        const url = created.web_url || created.deep_link;
        const dataUrl = await QRCode.toDataURL(url, {
          width: 360,
          margin: 2,
          color: { dark: "#0F5D50", light: "#ffffff" },
        });
        if (!cancelled) setQr(dataUrl);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not create QR link.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, action, itemId]);

  useEffect(() => {
    if (!open || !session?.token) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const live = await getActionLink(session.token!);
        if (cancelled) return;
        setStatus(live.status);
        if (live.status === "completed") {
          onCompleted?.(live);
          return;
        }
        if (live.status === "expired" || live.status === "cancelled") {
          setError(`This link is ${live.status}. Close and generate a new QR.`);
        }
      } catch {
        /* keep polling */
      }
    };
    const id = window.setInterval(tick, 2500);
    tick();
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [open, session?.token, onCompleted]);

  if (!open) return null;

  const copy = COPY[action];

  async function onCancel() {
    if (session?.session_id && status === "pending") {
      try {
        await cancelActionSession(session.session_id);
      } catch {
        /* ignore */
      }
    }
    onClose();
  }

  return (
    <div className="action-qr-overlay" role="dialog" aria-modal="true" aria-labelledby="action-qr-title">
      <div className="action-qr-modal">
        <button type="button" className="action-qr-close" onClick={onCancel} aria-label="Close">
          ×
        </button>
        <p className="auth-eyebrow">Mobile handoff</p>
        <h2 id="action-qr-title">{copy.title}</h2>
        <p className="action-qr-lede">{copy.body}</p>

        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="action-qr-frame">
          {qr ? <img src={qr} alt="Temporary action QR code" width={220} height={220} /> : <div className="action-qr-skeleton" />}
        </div>

        <p className={`action-qr-status action-qr-status--${status}`}>
          {status === "pending" && "Waiting for phone…"}
          {status === "claimed" && "Phone opened the link — finish in the app…"}
          {status === "completed" && "Done — vault updated"}
          {status === "expired" && "Link expired"}
          {status === "cancelled" && "Cancelled"}
        </p>

        {session?.web_url ? (
          <p className="action-qr-link">
            Or open on phone:{" "}
            <a href={session.web_url} target="_blank" rel="noreferrer">
              {session.web_url.replace(/^https?:\/\//, "")}
            </a>
          </p>
        ) : null}

        <div className="action-qr-actions">
          <button type="button" className="btn btn-forest" onClick={onCancel}>
            {status === "completed" ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
