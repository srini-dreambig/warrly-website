import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BrandLockup } from "./BrandLockup";

type Props = {
  imageSrc: string;
  imageAlt: string;
  quote: string;
  attribution?: string;
  /** CSS color matching the illustration canvas */
  canvasColor?: string;
  children: ReactNode;
};

export function AuthSplitLayout({
  imageSrc,
  imageAlt,
  quote,
  attribution = "Warrly",
  canvasColor = "var(--illu-welcome-account)",
  children,
}: Props) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <main className="auth-split" style={{ ["--auth-canvas" as string]: canvasColor }}>
      <aside className="auth-split-panel">
        <BrandLockup to="/" className="auth-split-brand" />
        <img className="auth-split-art" src={imageSrc} alt={imageAlt} />
        <blockquote className="auth-split-quote">
          <p>“{quote}”</p>
          <footer>— {attribution}</footer>
        </blockquote>
      </aside>
      <section className="auth-split-form">
        <div className="auth-split-form-inner">
          <div className="auth-split-mobile-brand">
            <BrandLockup to="/" className="auth-split-brand--on-green" />
          </div>
          {children}
          <p className="auth-split-legal">
            By continuing you agree to our <Link to="/terms">Terms</Link> and{" "}
            <Link to="/privacy">Privacy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
