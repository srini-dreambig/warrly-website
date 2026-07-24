import { Link, useLocation, useNavigate } from "react-router-dom";
import { ART } from "../brand";
import { scrollPageToTop } from "./ScrollToTop";

type Props = {
  to?: string;
  onClick?: () => void;
  className?: string;
};

/** Wordmark + tagline used in nav and footer */
export function BrandLockup({ to = "/", onClick, className = "" }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const inner = (
    <>
      <img className="mark" src={ART.mark} alt="" />
      <span className="brand-name">warrly</span>
      <span className="brand-tagline">EVERY WARRANTY, KEPT</span>
    </>
  );

  if (!to) {
    return <div className={`brand-lockup ${className}`.trim()}>{inner}</div>;
  }

  const targetPath = to.split("#")[0] || "/";

  return (
    <Link
      className={`brand-lockup ${className}`.trim()}
      to={to}
      onClick={() => {
        onClick?.();
        // Same-route Link does not remount the page — force scroll to top.
        if (location.pathname === targetPath) {
          if (location.hash) {
            navigate(targetPath, { replace: true });
          }
          scrollPageToTop("smooth");
        }
      }}
    >
      {inner}
    </Link>
  );
}
