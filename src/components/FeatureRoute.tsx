import { Navigate, useLocation } from "react-router-dom";
import { getFeaturePage } from "../content/features";
import { FeaturePage } from "./FeaturePage";

export function FeatureRoute() {
  const { pathname } = useLocation();
  const page = getFeaturePage(pathname);
  if (!page) return <Navigate to="/" replace />;
  return <FeaturePage page={page} />;
}
