import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { FeatureRoute } from "./components/FeatureRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { featurePages } from "./content/features";
import { Layout } from "./Layout";
import { AuthProvider } from "./lib/auth";
import { isAppHost } from "./lib/hosts";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DownloadPage } from "./pages/DownloadPage";
import { FaqPage } from "./pages/FaqPage";
import { HomePage } from "./pages/HomePage";
import { InvestorsPage } from "./pages/InvestorsPage";
import { PlansPage } from "./pages/PlansPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ReferralPage } from "./pages/ReferralPage";
import { TermsPage } from "./pages/TermsPage";
import { WaitlistPage } from "./pages/WaitlistPage";
import { ActionLandingPage } from "./pages/ActionLandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  AppShell,
  RedirectWwwAppToSubdomain,
  RedirectWwwAuthToSubdomain,
  RequireAuth,
} from "./pages/app/AppShell";
import { AccountPage } from "./pages/app/AccountPage";
import { ClaimDetailPage } from "./pages/app/ClaimDetailPage";
import { ClaimsPage } from "./pages/app/ClaimsPage";
import { ForgotPasswordPage } from "./pages/app/ForgotPasswordPage";
import { HomeDashboardPage } from "./pages/app/HomeDashboardPage";
import { HouseholdPage } from "./pages/app/HouseholdPage";
import { ItemDetailPage } from "./pages/app/ItemDetailPage";
import { ItemOffersPage } from "./pages/app/ItemOffersPage";
import { LoginPage } from "./pages/app/LoginPage";
import { RegisterPage } from "./pages/app/RegisterPage";
import { RemindersPage } from "./pages/app/RemindersPage";
import { ReportsPage } from "./pages/app/ReportsPage";
import { ResetPasswordPage } from "./pages/app/ResetPasswordPage";
import { VaultHomePage } from "./pages/app/VaultHomePage";
import "./styles.css";
import "./investors.css";
import "./app.css";

function MarketingLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function VaultRoutes({ base = "" }: { base?: string }) {
  const p = (path: string) => {
    if (!base) return path || "/";
    if (!path || path === "/") return base;
    return `${base}${path}`;
  };
  return (
    <Route element={<RequireAuth />}>
      <Route element={<AppShell />}>
        <Route path={p("/")} element={<HomeDashboardPage />} />
        <Route path={p("/inventory")} element={<VaultHomePage />} />
        <Route path={p("/reminders")} element={<RemindersPage />} />
        <Route path={p("/claims")} element={<ClaimsPage />} />
        <Route path={p("/claims/:claimId")} element={<ClaimDetailPage />} />
        <Route path={p("/household")} element={<HouseholdPage />} />
        <Route path={p("/reports")} element={<ReportsPage />} />
        <Route path={p("/account")} element={<AccountPage />} />
        <Route path={p("/items/:itemId")} element={<ItemDetailPage />} />
        <Route path={p("/items/:itemId/offers")} element={<ItemOffersPage />} />
        <Route path={base ? `${base}/*` : "*"} element={<NotFoundPage compact />} />
      </Route>
    </Route>
  );
}

function AppHostRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/a/:token" element={<ActionLandingPage />} />
      {VaultRoutes({ base: "" })}
    </Routes>
  );
}

function MarketingHostRoutes() {
  const local =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  return (
    <Routes>
      {local ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<RedirectWwwAuthToSubdomain />} />
          <Route path="/register" element={<RedirectWwwAuthToSubdomain />} />
          <Route path="/forgot-password" element={<RedirectWwwAuthToSubdomain />} />
          <Route path="/reset-password" element={<RedirectWwwAuthToSubdomain />} />
        </>
      )}
      <Route path="/a/:token" element={<ActionLandingPage />} />

      {local ? (
        VaultRoutes({ base: "/app" })
      ) : (
        <>
          <Route path="/app" element={<RedirectWwwAppToSubdomain />} />
          <Route path="/app/*" element={<RedirectWwwAppToSubdomain />} />
        </>
      )}

      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        {featurePages.map((feat) => (
          <Route key={feat.path} path={feat.path} element={<FeatureRoute />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  return isAppHost() ? <AppHostRoutes /> : <MarketingHostRoutes />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
