import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BrandLockup } from "./BrandLockup";

type Props = {
  imageSrc: string;
  imageAlt: string;
  quote: string;
  attribution?: string;
  children: ReactNode;
};

export function AuthSplitLayout({ imageSrc, imageAlt, quote, attribution = "Warrly", children }: Props) {
  return (
    <main className="auth-split">
      <aside className="auth-split-panel" aria-hidden={false}>
        <div className="auth-split-panel-inner">
          <BrandLockup to="/" className="auth-split-brand auth-split-brand--light" />
          <figure className="auth-split-figure">
            <img src={imageSrc} alt={imageAlt} />
          </figure>
          <blockquote className="auth-split-quote">
            <p>“{quote}”</p>
            <footer>— {attribution}</footer>
          </blockquote>
        </div>
      </aside>
      <section className="auth-split-form">
        <div className="auth-split-form-inner">
          <div className="auth-split-mobile-brand">
            <BrandLockup to="/" />
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
