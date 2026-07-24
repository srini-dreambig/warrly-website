import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { config } from "../config";

type Props = {
  id?: string;
  label?: string;
  detail?: string;
};

export function DownloadQr({
  id = "download",
  label,
  detail,
}: Props) {
  const [src, setSrc] = useState("");
  const href = config.downloadUrl;
  const title = label || (config.appLive ? "Scan to get the app" : "Scan to join the waitlist");
  const subtitle =
    detail ||
    (config.appLive
      ? "Opens the App Store or Play Store on your phone."
      : "Opens the waitlist form — the app is not on the stores yet.");

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(href, {
      width: 400,
      margin: 2,
      color: { dark: "#0F5D50", light: "#ffffff" },
    }).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [href]);

  return (
    <div className="qr-card" id={id}>
      {src ? <img src={src} alt={title} width={200} height={200} /> : <div style={{ height: 200 }} />}
      <strong>{title}</strong>
      <span>{subtitle}</span>
      <a href={href}>{config.appLive ? "Or open download link →" : "Or open waitlist →"}</a>
    </div>
  );
}
