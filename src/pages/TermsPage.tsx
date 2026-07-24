import { LegalDoc } from "../components/LegalDoc";
import { termsMeta, termsSections } from "../content/terms";

export function TermsPage() {
  return (
    <LegalDoc
      title={termsMeta.title}
      lead={termsMeta.lead}
      effectiveDate={termsMeta.effectiveDate}
      version={termsMeta.version}
      sections={termsSections}
      related={[
        { to: "/privacy", label: "Privacy policy" },
        { to: "/security", label: "How we protect data" },
        { to: "/plans", label: "Plans" },
        { to: "/contact", label: "Contact" },
      ]}
    />
  );
}
