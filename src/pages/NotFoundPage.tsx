import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ART } from "../brand";
import { config } from "../config";

type Props = {
  /** When true, skip marketing chrome CTAs that assume public site layout */
  compact?: boolean;
};

export function NotFoundPage({ compact = false }: Props) {
  const { pathname } = useLocation();
  const homeTo = compact ? "/app" : "/";
  const homeLabel = compact ? "Back to vault" : "Back to home";

  return (
    <main className={`page not-found-page${compact ? " not-found-page--compact" : ""}`}>
      <Helmet>
        <title>Page not found · Warrly</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="This Warrly page could not be found." />
      </Helmet>

      <section className="not-found">
        <div className="wrap not-found-grid">
          <div className="not-found-copy">
            <p className="page-eyebrow">404</p>
            <h1>This page isn’t in the vault</h1>
            <p className="lead">
              We couldn’t find <code className="not-found-path">{pathname}</code>. It may have moved, or the link might be
              out of date.
            </p>
            <div className="not-found-actions">
              <Link className="btn btn-amber" to={homeTo}>
                {homeLabel}
              </Link>
              {!compact ? (
                <>
                  <Link className="btn btn-forest" to={config.getAppPath}>
                    {config.getAppLabel}
                  </Link>
                  <Link className="btn btn-forest" to="/contact">
                    Contact
                  </Link>
                </>
              ) : (
                <Link className="btn btn-forest" to="/">
                  Marketing site
                </Link>
              )}
            </div>
          </div>
          <figure className="not-found-art">
            <img src={ART.emptyWarrly} alt="" width={480} height={480} />
          </figure>
        </div>
      </section>
    </main>
  );
}
