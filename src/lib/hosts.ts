import { config } from "../config";

/** True when this SPA is serving the vault product shell (not marketing). */
export function isAppHost(hostname = typeof window !== "undefined" ? window.location.hostname : ""): boolean {
  const appHost = safeHost(config.appUrl);
  if (!hostname) return false;
  if (hostname === appHost) return true;
  // Local Vite: use /app paths (marketing + vault on one origin)
  if (hostname === "localhost" || hostname === "127.0.0.1") return false;
  return false;
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "app.warrly.in";
  }
}

/** Absolute vault home on the app subdomain. */
export function vaultHomeUrl(): string {
  return `${config.appUrl.replace(/\/$/, "")}/`;
}

/** In-app path for inventory home (host-aware). */
export function vaultHomePath(): string {
  return isAppHost() ? "/" : "/app";
}

/** In-app path for an item detail page. */
export function vaultItemPath(itemId: string): string {
  return isAppHost() ? `/items/${itemId}` : `/app/items/${itemId}`;
}

/** Login URL — always prefer app subdomain in production hosts. */
export function loginUrl(): string {
  if (isAppHost() || typeof window === "undefined") {
    return "/login";
  }
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "/login";
  return `${config.appUrl.replace(/\/$/, "")}/login`;
}

/** After auth: stay on app host or hard-navigate to app.warrly.in. */
export function goToVaultAfterAuth(navigate: (to: string, opts?: { replace?: boolean }) => void): void {
  if (isAppHost()) {
    navigate("/", { replace: true });
    return;
  }
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (host === "localhost" || host === "127.0.0.1") {
    navigate("/app", { replace: true });
    return;
  }
  window.location.assign(vaultHomeUrl());
}
