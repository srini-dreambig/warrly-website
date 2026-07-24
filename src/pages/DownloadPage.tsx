import { Link, Navigate } from "react-router-dom";
import { config } from "../config";
import { DownloadQr } from "../components/DownloadQr";

export function DownloadPage() {
  if (!config.appLive) {
    return <Navigate to="/waitlist?src=download" replace />;
  }

  return (
    <main className="page">
      <section className="download download-page">
        <div className="wrap download-grid">
          <div>
            <h2>Download Warrly and capture your next receipt</h2>
            <p>
              Available on iOS, Android, and the web. Scan the QR with your phone, or open your store directly. Free to
              start — five items, no card. Built for Indian households first; teams grow into Pro on the same product.
            </p>
            <div className="store-row">
              <a className="btn btn-amber" href={config.appStoreUrl} target="_blank" rel="noreferrer">
                App Store
              </a>
              <a className="btn btn-ghost-light" href={config.playStoreUrl} target="_blank" rel="noreferrer">
                Google Play
              </a>
              <a className="btn btn-ghost-light" href={config.webAppUrl} target="_blank" rel="noreferrer">
                Web app
              </a>
            </div>
          </div>
          <DownloadQr />
        </div>
      </section>

      <section className="capability-section">
        <div className="wrap">
          <div className="section-intro">
            <h2>What to do in your first ten minutes</h2>
            <p>A short path from install to a vault that already earns its keep.</p>
          </div>
          <ol className="steps-list">
            <li>
              <strong>Add one recent purchase.</strong> Flipkart / Amazon PDF, showroom GST bill, or camera capture —
              confirm the extracted fields.
            </li>
            <li>
              <strong>Check the warranty end date.</strong> If it is soon, you will see why 30 / 7 / 1 day reminders
              matter.
            </li>
            <li>
              <strong>Invite a household member</strong> if someone else also handles repairs and service-centre visits.
            </li>
            <li>
              <strong>Keep going at the next purchase.</strong> The receipt is already on your phone — make the warranty
              lifecycle live there too. Questions? See <Link to="/faq">FAQs</Link>.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
