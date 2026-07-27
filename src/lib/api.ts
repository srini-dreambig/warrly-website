import { config } from "../config";

const TOKEN_KEY = "warrly_access_token";
const REFRESH_KEY = "warrly_refresh_token";
const USER_KEY = "warrly_user";

export type AuthUser = {
  user_id: string;
  email: string;
  name: string | null;
  picture: string | null;
  tier: string;
  created_at?: string;
  onboarded?: boolean;
};

export type AuthResponse = {
  token: string;
  refresh_token: string;
  expires_in?: number;
  user: AuthUser;
};

export type VaultStats = {
  total_items: number;
  protected_value: number;
  needs_attention: number;
  active_coverage: number;
  reminders_open: number;
  open_claims: number;
  currency: string;
};

export type VaultItem = {
  item_id: string;
  name: string;
  brand?: string | null;
  model?: string | null;
  category?: string | null;
  purchase_date?: string | null;
  price?: number | null;
  currency?: string;
  status?: string;
  earliest_expiry?: string | null;
  photo_url?: string | null;
  coverages?: unknown[];
};

function apiBase() {
  return config.apiUrl.replace(/\/$/, "");
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function storeAuth(data: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function formatApiError(payload: unknown, fallback = "Something went wrong") {
  if (!payload) return fallback;
  if (typeof payload === "string") return payload;
  if (typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (typeof obj.error === "string") return obj.error;
    if (typeof obj.detail === "string") return obj.detail;
    if (Array.isArray(obj.detail)) {
      return obj.detail
        .map((d) => (typeof d === "object" && d && "msg" in d ? String((d as { msg: string }).msg) : String(d)))
        .join(" ");
    }
    if (obj.error && typeof obj.error === "object") {
      const nested = obj.error as Record<string, unknown>;
      if (typeof nested.message === "string") return nested.message;
      try {
        return JSON.stringify(obj.error);
      } catch {
        return fallback;
      }
    }
    if (typeof obj.message === "string") return obj.message;
  }
  return fallback;
}

async function parseJson(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { detail: text.slice(0, 200) };
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) return null;
  const res = await fetch(`${apiBase()}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    clearAuth();
    return null;
  }
  const auth = data as AuthResponse;
  if (!auth.token) {
    clearAuth();
    return null;
  }
  localStorage.setItem(TOKEN_KEY, auth.token);
  if (auth.refresh_token) localStorage.setItem(REFRESH_KEY, auth.refresh_token);
  if (auth.user) localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
  return auth.token;
}

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<T> {
  const headers = new Headers(init.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const token = getStoredToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${apiBase()}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  if (res.status === 401 && retry) {
    const next = await refreshAccessToken();
    if (next) return apiFetch<T>(path, init, false);
  }

  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(formatApiError(data, `Request failed (${res.status})`));
  }
  return data as T;
}

export async function register(email: string, password: string, name: string) {
  const data = await apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  }, false);
  storeAuth(data);
  return data;
}

export async function login(email: string, password: string) {
  const data = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }, false);
  storeAuth(data);
  return data;
}

export async function logout() {
  try {
    if (getStoredToken()) {
      await apiFetch("/api/auth/logout", { method: "POST", body: "{}" });
    }
  } catch {
    // ignore network logout failures
  } finally {
    clearAuth();
  }
}

export async function fetchMe() {
  return apiFetch<AuthUser>("/api/auth/me");
}

export async function fetchStats() {
  return apiFetch<VaultStats>("/api/stats");
}

export async function fetchItems() {
  return apiFetch<VaultItem[]>("/api/items");
}

export async function fetchItem(itemId: string) {
  return apiFetch<VaultItem & Record<string, unknown>>(`/api/items/${encodeURIComponent(itemId)}`);
}
