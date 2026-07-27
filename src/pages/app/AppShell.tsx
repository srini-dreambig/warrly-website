import { useEffect, useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Menu,
  Package,
  Users,
  UserRound,
} from "lucide-react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { BrandLockup } from "../../components/BrandLockup";
import { config } from "../../config";
import { useAuth } from "../../lib/auth";
import {
  isAppHost,
  loginUrl,
  vaultAccountPath,
  vaultClaimsPath,
  vaultHomePath,
  vaultHouseholdPath,
  vaultInventoryPath,
  vaultRemindersPath,
  vaultReportsPath,
} from "../../lib/hosts";

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

const NAV: { to: () => string; end: boolean; label: string; icon: LucideIcon }[] = [
  { to: vaultHomePath, end: true, label: "Home", icon: Home },
  { to: vaultInventoryPath, end: false, label: "Inventory", icon: Package },
  { to: vaultRemindersPath, end: false, label: "Reminders", icon: Bell },
  { to: vaultClaimsPath, end: false, label: "Claims", icon: ClipboardList },
  { to: vaultHouseholdPath, end: false, label: "Household", icon: Users },
  { to: vaultReportsPath, end: false, label: "Reports", icon: FileText },
  { to: vaultAccountPath, end: false, label: "Account", icon: UserRound },
];

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
  const collapseLabel = collapsed ? "Expand navigation" : "Collapse navigation";

  return (
    <div className={`dash-shell${collapsed ? " dash-shell--collapsed" : ""}`}>
      <aside className="dash-sidebar" aria-label="Main navigation">
        <div className="dash-brand-row">
          <BrandLockup to={home} className="dash-brand" />
          <button
            type="button"
            className="dash-collapse-btn dash-collapse-btn--edge"
            aria-expanded={!collapsed}
            aria-label={collapseLabel}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? <ChevronRight size={16} strokeWidth={2} /> : <ChevronLeft size={16} strokeWidth={2} />}
          </button>
        </div>

        <nav className="dash-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to()}
                end={item.end}
                className={({ isActive }) => (isActive ? "dash-link is-active" : "dash-link")}
                title={item.label}
              >
                <span className="dash-link-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="dash-link-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="dash-sidebar-foot">
          <div className="dash-user" title={user?.email || ""}>
            <span className="dash-user-name">{user?.name || user?.email}</span>
            <span className="dash-user-email">{user?.email}</span>
          </div>
          <button type="button" className="btn btn-forest btn-sm dash-logout" onClick={() => void onLogout()}>
            <LogOut size={14} strokeWidth={2} aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar dash-topbar--mobile">
          <button
            type="button"
            className="dash-collapse-btn dash-collapse-btn--mobile"
            aria-label={collapseLabel}
            onClick={() => setCollapsed((v) => !v)}
          >
            <Menu size={16} strokeWidth={2} aria-hidden="true" />
            <span>Menu</span>
          </button>
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
