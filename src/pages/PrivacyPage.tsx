import { LegalDoc } from "../components/LegalDoc";
import { privacyMeta, privacySections } from "../content/privacy";

export function PrivacyPage() {
  return (
    <LegalDoc
      title={privacyMeta.title}
      lead={privacyMeta.lead}
      effectiveDate={privacyMeta.effectiveDate}
      version={privacyMeta.version}
      sections={privacySections}
      related={[
        { to: "/terms", label: "Terms of use" },
        { to: "/security", label: "How we protect data" },
        { to: "/security/export", label: "Export & delete" },
        { to: "/contact", label: "Contact / grievance" },
      ]}
    />
  );
}
