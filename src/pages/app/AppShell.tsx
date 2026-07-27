import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BrandLockup } from "../../components/BrandLockup";
import { config } from "../../config";
import { useAuth } from "../../lib/auth";
import { isAppHost, loginUrl, vaultHomePath } from "../../lib/hosts";

const COLLAPSE_KEY = "warrly_nav_collapsed";

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (!config.webAppEnabled) return <Navigate to="/waitlist" replace />;
  if (loading) {
    return (
      <main className="auth-page">
        <p className="auth-lede">Loading your vault…</p>
      </main>
    );
  }
  if (!user) {
    const to = loginUrl();
    if (to.startsWith("http")) {
      window.location.assign(to);
      return null;
    }
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
}

/** www.warrly.in/app → https://app.warrly.in/… */
export function RedirectWwwAppToSubdomain() {
  useEffect(() => {
    if (isAppHost()) return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    const path = window.location.pathname.replace(/^\/app/, "") || "/";
    const target = `${config.appUrl.replace(/\/$/, "")}${path}${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);
  return (
    <main className="auth-page">
      <p className="auth-lede">Opening your vault…</p>
    </main>
  );
}

/** www login/register → app subdomain so JWT stays on the same origin as the vault. */
export function RedirectWwwAuthToSubdomain() {
  useEffect(() => {
    if (isAppHost()) return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;
    const target = `${config.appUrl.replace(/\/$/, "")}${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);
  return (
    <main className="auth-page">
      <p className="auth-lede">Opening sign-in…</p>
    </main>
  );
}

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  async function onLogout() {
    await logout();
    const to = loginUrl();
    if (to.startsWith("http")) window.location.assign(to);
    else navigate(to, { replace: true });
  }

  const home = vaultHomePath();

  return (
    <div className={`dash-shell${collapsed ? " dash-shell--collapsed" : ""}`}>
      <aside className="dash-sidebar" aria-label="Main navigation">
        <div className="dash-sidebar-top">
          <BrandLockup to={home} className="dash-brand" />
          <button
            type="button"
            className="dash-collapse-btn"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={() => setCollapsed((v) => !v)}
          >
            <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          </button>
        </div>

        <nav className="dash-nav">
          <NavLink to={home} end className={({ isActive }) => (isActive ? "dash-link is-active" : "dash-link")}>
            <span className="dash-link-icon" aria-hidden="true">
              ▦
            </span>
            <span className="dash-link-label">Inventory</span>
          </NavLink>
          <a className="dash-link" href={config.siteUrl} target="_blank" rel="noreferrer">
            <span className="dash-link-icon" aria-hidden="true">
              ⌂
            </span>
            <span className="dash-link-label">Marketing site</span>
          </a>
        </nav>

        <div className="dash-sidebar-foot">
          <div className="dash-user" title={user?.email || ""}>
            <span className="dash-user-name">{user?.name || user?.email}</span>
            <span className="dash-user-email">{user?.email}</span>
          </div>
          <button type="button" className="btn btn-forest btn-sm dash-logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <button
            type="button"
            className="dash-collapse-btn dash-collapse-btn--mobile"
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={() => setCollapsed((v) => !v)}
          >
            Menu
          </button>
          <p className="dash-topbar-title">Vault</p>
          <Link className="dash-topbar-site" to={home}>
            Warrly
          </Link>
        </header>
        <div className="dash-content">
          <Outlet />
        </div>
      </div>

      {!collapsed ? (
        <button
          type="button"
          className="dash-backdrop"
          aria-label="Close navigation"
          onClick={() => setCollapsed(true)}
        />
      ) : null}
    </div>
  );
}
