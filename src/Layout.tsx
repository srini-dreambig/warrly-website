import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { config } from "./config";
import { BrandLockup } from "./components/BrandLockup";
import { Seo } from "./components/Seo";

type MegaKey = "personal" | "business" | "company" | null;

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!shellRef.current?.contains(e.target as Node)) setMega(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeAll = () => {
    setMega(null);
    setMenuOpen(false);
  };

  const openMega = (key: Exclude<MegaKey, null>) => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      setMega(key);
      return;
    }
    setMega((cur) => (cur === key ? null : key));
  };

  const hoverOpen = (key: Exclude<MegaKey, null>) => {
    if (!menuOpen && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setMega(key);
    }
  };

  return (
    <>
      <Seo />
      <div className="promo">
        Free for your first 5 items. No card required.
        <Link to="/plans">See plans →</Link>
      </div>

      <div ref={shellRef} className={`nav-shell is-light${menuOpen ? " open" : ""}`}>
        <header className="nav">
          <div className="nav-inner">
            <BrandLockup to="/" onClick={closeAll} />
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className={`nav-trigger${mega === "personal" ? " is-open" : ""}`}
                  aria-expanded={mega === "personal"}
                  onClick={() => openMega("personal")}
                  onMouseEnter={() => hoverOpen("personal")}
                >
                  Personal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-trigger${mega === "business" ? " is-open" : ""}`}
                  aria-expanded={mega === "business"}
                  onClick={() => openMega("business")}
                  onMouseEnter={() => hoverOpen("business")}
                >
                  Business
                </button>
              </li>
              <li>
                <NavLink className="nav-trigger" to="/plans" onClick={closeAll}>
                  Plans
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-trigger" to="/investors" onClick={closeAll}>
                  For Investors
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-trigger${mega === "company" ? " is-open" : ""}`}
                  aria-expanded={mega === "company"}
                  onClick={() => openMega("company")}
                  onMouseEnter={() => hoverOpen("company")}
                >
                  Company
                </button>
              </li>
            </ul>
            <div className="nav-actions">
              <a className="nav-login" href={config.webAppUrl}>
                Log in
              </a>
              <Link className="btn btn-forest btn-sm" to="/download" onClick={closeAll} style={{ padding: "10px 18px", fontSize: 14 }}>
                Sign up
              </Link>
              <button
                type="button"
                className="menu-btn"
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setMega(null);
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div
          className={`mega${mega === "personal" ? " is-open" : ""}`}
          role="region"
          aria-label="Personal menu"
          onMouseLeave={() => !menuOpen && setMega(null)}
        >
          <div>
            <Link className="mega-discover" to="/personal" onClick={closeAll}>
              Discover Warrly →
            </Link>
            <div className="mega-group">
              <h4>Vault</h4>
              <ul>
                <li>
                  <Link to="/personal/items" onClick={closeAll}>
                    My items
                  </Link>
                </li>
                <li>
                  <Link to="/personal/receipts" onClick={closeAll}>
                    Add a receipt
                  </Link>
                </li>
                <li>
                  <Link to="/personal/documents" onClick={closeAll}>
                    Documents & PDFs
                  </Link>
                </li>
                <li>
                  <Link to="/personal/household" onClick={closeAll}>
                    Household sharing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mega-group">
              <h4>Coverage</h4>
              <ul>
                <li>
                  <Link to="/personal/reminders" onClick={closeAll}>
                    Reminders
                  </Link>
                </li>
                <li>
                  <Link to="/personal/expiring" onClick={closeAll}>
                    Expiring soon
                  </Link>
                </li>
                <li>
                  <Link to="/personal/coverage" onClick={closeAll}>
                    Status & protected value
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Claims</h4>
              <ul>
                <li>
                  <Link to="/personal/claims" onClick={closeAll}>
                    File a claim
                  </Link>
                </li>
                <li>
                  <Link to="/personal/evidence" onClick={closeAll}>
                    Evidence packs
                  </Link>
                </li>
                <li>
                  <Link to="/personal/claims-inbox" onClick={closeAll}>
                    Claims inbox
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mega-group">
              <h4>Capture</h4>
              <ul>
                <li>
                  <Link to="/personal/camera-extract" onClick={closeAll}>
                    Camera extract
                  </Link>
                </li>
                <li>
                  <Link to="/personal/email-inbox" onClick={closeAll}>
                    Email invoice inbox
                  </Link>
                </li>
                <li>
                  <Link to="/personal/manual-entry" onClick={closeAll}>
                    Manual entry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Security</h4>
              <ul>
                <li>
                  <Link to="/security" onClick={closeAll}>
                    How we protect data
                  </Link>
                </li>
                <li>
                  <Link to="/security/export" onClick={closeAll}>
                    Export & delete
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mega-group">
              <h4>Help</h4>
              <ul>
                <li>
                  <Link to="/contact" onClick={closeAll}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" onClick={closeAll}>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/download" onClick={closeAll}>
                    Get the app
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Plans</h4>
              <ul>
                <li>
                  <Link to="/plans#free" onClick={closeAll}>
                    Free
                  </Link>
                </li>
                <li>
                  <Link to="/plans#plus" onClick={closeAll}>
                    Plus
                  </Link>
                </li>
                <li>
                  <Link to="/plans#pro" onClick={closeAll}>
                    Pro
                  </Link>
                </li>
                <li>
                  <Link to="/plans#compare" onClick={closeAll}>
                    Compare plans
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`mega${mega === "business" ? " is-open" : ""}`}
          role="region"
          aria-label="Business menu"
          onMouseLeave={() => !menuOpen && setMega(null)}
        >
          <div>
            <Link className="mega-discover" to="/business" onClick={closeAll}>
              Discover Business →
            </Link>
            <div className="mega-group">
              <h4>Workspace</h4>
              <ul>
                <li>
                  <Link to="/business/vault" onClick={closeAll}>
                    Business vault
                  </Link>
                </li>
                <li>
                  <Link to="/business/sites" onClick={closeAll}>
                    Sites & departments
                  </Link>
                </li>
                <li>
                  <Link to="/business/asset-tags" onClick={closeAll}>
                    Asset tags (QR)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Operations</h4>
              <ul>
                <li>
                  <Link to="/business/vendors" onClick={closeAll}>
                    Vendors
                  </Link>
                </li>
                <li>
                  <Link to="/business/vendor-portal" onClick={closeAll}>
                    Vendor portal
                  </Link>
                </li>
                <li>
                  <Link to="/business/service-logs" onClick={closeAll}>
                    Service logs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Reports</h4>
              <ul>
                <li>
                  <Link to="/business/book-value" onClick={closeAll}>
                    Book value
                  </Link>
                </li>
                <li>
                  <Link to="/business/audits" onClick={closeAll}>
                    Audits
                  </Link>
                </li>
                <li>
                  <Link to="/business/depreciation" onClick={closeAll}>
                    Depreciation PDF
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Plans</h4>
              <ul>
                <li>
                  <Link to="/plans#pro" onClick={closeAll}>
                    Pro for teams
                  </Link>
                </li>
                <li>
                  <Link to="/download" onClick={closeAll}>
                    Get Warrly Business
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`mega${mega === "company" ? " is-open" : ""}`}
          role="region"
          aria-label="Company menu"
          onMouseLeave={() => !menuOpen && setMega(null)}
        >
          <div>
            <Link className="mega-discover" to="/about" onClick={closeAll}>
              About Warrly →
            </Link>
            <div className="mega-group">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/about" onClick={closeAll}>
                    Our mission
                  </Link>
                </li>
                <li>
                  <Link to="/investors" onClick={closeAll}>
                    For Investors
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeAll}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" onClick={closeAll}>
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Legal & trust</h4>
              <ul>
                <li>
                  <Link to="/privacy" onClick={closeAll}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" onClick={closeAll}>
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/security" onClick={closeAll}>
                    How we protect data
                  </Link>
                </li>
                <li>
                  <Link to="/security/export" onClick={closeAll}>
                    Export & delete
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>Product</h4>
              <ul>
                <li>
                  <Link to="/personal" onClick={closeAll}>
                    Personal
                  </Link>
                </li>
                <li>
                  <Link to="/business" onClick={closeAll}>
                    Business
                  </Link>
                </li>
                <li>
                  <Link to="/download" onClick={closeAll}>
                    Download
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mega-col">
            <div className="mega-group">
              <h4>App</h4>
              <ul>
                <li>
                  <a href={config.appStoreUrl}>App Store</a>
                </li>
                <li>
                  <a href={config.playStoreUrl}>Google Play</a>
                </li>
                <li>
                  <a href={config.webAppUrl}>Web app</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {children}

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <BrandLockup to="/" className="brand-lockup-footer" />
            <p>Snap receipts. Track coverage. File claims.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <Link to="/personal">Personal</Link>
              </li>
              <li>
                <Link to="/business">Business</Link>
              </li>
              <li>
                <Link to="/plans">Plans</Link>
              </li>
              <li>
                <Link to="/download">Download</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/investors">For Investors</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/referral">Referrals</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Get the app</h4>
            <ul>
              <li>
                <a href={config.appStoreUrl}>App Store</a>
              </li>
              <li>
                <a href={config.playStoreUrl}>Google Play</a>
              </li>
              <li>
                <a href={config.webAppUrl}>Web app</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal & trust</h4>
            <ul>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/security">Security</Link>
              </li>
              <li>
                <Link to="/security/export">Export & delete</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Warrly</span>
          <span>Proudly built by Dataplexor</span>
        </div>
      </footer>
    </>
  );
}
