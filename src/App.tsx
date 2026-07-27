import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { FeatureRoute } from "./components/FeatureRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { featurePages } from "./content/features";
import { Layout } from "./Layout";
import { AuthProvider } from "./lib/auth";
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
import { AppShell, RequireAuth } from "./pages/app/AppShell";
import { ItemDetailPage } from "./pages/app/ItemDetailPage";
import { LoginPage } from "./pages/app/LoginPage";
import { RegisterPage } from "./pages/app/RegisterPage";
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/app" element={<VaultHomePage />} />
          <Route path="/app/items/:itemId" element={<ItemDetailPage />} />
        </Route>
      </Route>

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
        {featurePages.map((p) => (
          <Route key={p.path} path={p.path} element={<FeatureRoute />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
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
