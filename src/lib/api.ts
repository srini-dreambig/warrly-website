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

export type ActionSession = {
  session_id: string;
  token?: string;
  action: string;
  action_title: string;
  status: string;
  item_id?: string | null;
  deep_link: string;
  web_url: string;
  expires_at?: string | null;
  result?: Record<string, unknown>;
};

export async function createActionSession(body: {
  action: "add_item" | "add_document" | "capture_serial" | "start_claim";
  item_id?: string;
  note?: string;
}) {
  return apiFetch<ActionSession>("/api/action-sessions", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getActionLink(token: string) {
  const res = await fetch(`${apiBase()}/api/action-links/${encodeURIComponent(token)}`, {
    headers: { Accept: "application/json" },
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(formatApiError(data, `Request failed (${res.status})`));
  }
  return data as ActionSession;
}

export async function cancelActionSession(sessionId: string) {
  return apiFetch<ActionSession>(`/api/action-sessions/${encodeURIComponent(sessionId)}/cancel`, {
    method: "POST",
    body: "{}",
  });
}

export async function deleteItem(itemId: string) {
  return apiFetch<{ ok: boolean }>(`/api/items/${encodeURIComponent(itemId)}`, { method: "DELETE" });
}

export type Reminder = {
  reminder_id: string;
  item_id?: string;
  item_name?: string;
  item_brand?: string | null;
  type?: string;
  label?: string;
  fire_at?: string | null;
  state?: string;
};

export type Claim = {
  claim_id: string;
  item_id: string;
  item_name?: string;
  issue?: string;
  status?: string;
  message?: string;
  brand_support_phone?: string | null;
  brand_support_url?: string | null;
  brand_escalation_email?: string | null;
  timeline?: { at?: string; event?: string }[];
  coverage_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type HouseholdMember = {
  user_id: string;
  name?: string | null;
  email?: string;
  picture?: string | null;
  role?: string;
  joined_at?: string | null;
};

export type Household = {
  household_id: string;
  name: string;
  created_by?: string;
  invite_code?: string | null;
  members: HouseholdMember[];
  my_role?: string | null;
};

export type Offer = {
  offer_id: string;
  partner?: string;
  title?: string;
  description?: string;
  price?: number | null;
  currency?: string;
  term_months?: number | null;
  checkout_url?: string;
};

export type Base64File = {
  filename: string;
  mime: string;
  base64: string;
};

export function downloadBase64File(file: Base64File) {
  const bin = atob(file.base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  const blob = new Blob([bytes], { type: file.mime || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.filename || "download";
  a.click();
  URL.revokeObjectURL(url);
}

export async function fetchReminders() {
  return apiFetch<Reminder[]>("/api/reminders");
}

export async function actionReminder(reminderId: string, action: "snooze" | "done") {
  return apiFetch<{ ok: boolean }>(`/api/reminders/${encodeURIComponent(reminderId)}/action`, {
    method: "POST",
    body: JSON.stringify({ action }),
  });
}

export async function fetchClaims() {
  return apiFetch<Claim[]>("/api/claims");
}

export async function fetchClaim(claimId: string) {
  return apiFetch<Claim>(`/api/claims/${encodeURIComponent(claimId)}`);
}

export async function assistClaimDraft(body: { item_id: string; notes: string; coverage_id?: string }) {
  return apiFetch<{ issue: string; letter: string; model?: string; ai?: boolean }>("/api/claims/assist", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function createClaim(body: {
  item_id: string;
  issue: string;
  coverage_id?: string;
  use_ai?: boolean;
}) {
  return apiFetch<Claim>("/api/claims", {
    method: "POST",
    body: JSON.stringify({ use_ai: true, ...body }),
  });
}

export async function updateClaim(claimId: string, body: { status?: string; note?: string }) {
  return apiFetch<Claim>(`/api/claims/${encodeURIComponent(claimId)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function fetchClaimPack(claimId: string) {
  return apiFetch<Base64File>(`/api/claims/${encodeURIComponent(claimId)}/pack`);
}

export async function fetchHousehold() {
  return apiFetch<Household>("/api/households/mine");
}

export async function renameHousehold(name: string) {
  return apiFetch<{ ok: boolean }>("/api/households/mine", {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
}

export async function createHouseholdInvite() {
  return apiFetch<{ code: string; expires_in_days: number }>("/api/households/mine/invite", {
    method: "POST",
    body: "{}",
  });
}

export async function joinHousehold(code: string) {
  return apiFetch<{ ok: boolean; household_id: string; already_member?: boolean }>("/api/households/join", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export async function removeHouseholdMember(userId: string) {
  return apiFetch<{ ok: boolean }>(`/api/households/mine/members/${encodeURIComponent(userId)}`, {
    method: "DELETE",
  });
}

export async function updateProfile(body: { name?: string; remove_picture?: boolean }) {
  return apiFetch<AuthUser>("/api/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function exportMyData() {
  return apiFetch<Record<string, unknown>>("/api/auth/export");
}

export async function deleteAccount() {
  return apiFetch<{ ok: boolean; deleted?: boolean }>("/api/auth/account", { method: "DELETE" });
}

export async function fetchHomeInventoryReport() {
  return apiFetch<Base64File>("/api/reports/home-inventory");
}

export async function fetchOffers(itemId?: string) {
  const q = itemId ? `?item_id=${encodeURIComponent(itemId)}` : "";
  return apiFetch<Offer[]>(`/api/offers${q}`);
}

export async function clickOffer(offerId: string, itemId: string) {
  return apiFetch<{ url: string; attribution_token: string }>("/api/offers/click", {
    method: "POST",
    body: JSON.stringify({ offer_id: offerId, item_id: itemId }),
  });
}
