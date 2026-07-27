import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { BrandLockup } from "../../components/BrandLockup";
import { config } from "../../config";
import { useAuth } from "../../lib/auth";

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
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function onLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="wrap app-topbar-inner">
          <BrandLockup to="/app" />
          <nav className="app-nav">
            <Link to="/app">Vault</Link>
            <Link to="/waitlist">Waitlist</Link>
            <Link to="/">Marketing site</Link>
          </nav>
          <div className="app-user">
            <span>{user?.name || user?.email}</span>
            <button type="button" className="btn btn-forest btn-sm" onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
