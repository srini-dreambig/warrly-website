import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { config } from "../config";

export function DownloadQr({ id = "download" }: { id?: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(config.downloadUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#0F5D50", light: "#ffffff" },
    }).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="qr-card" id={id}>
      {src ? <img src={src} alt="Scan to download Warrly" width={200} height={200} /> : <div style={{ height: 200 }} />}
      <strong>Scan to get the app</strong>
      <span>Opens the App Store or Play Store on your phone.</span>
      <a href={config.downloadUrl}>Or open download link →</a>
    </div>
  );
}
