import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { config } from "../config";
import { absoluteAsset, absoluteUrl, defaultSeo, resolvePageSeo } from "../content/seo";

export function Seo() {
  const { pathname } = useLocation();
  const page = resolvePageSeo(pathname);
  const canonical = absoluteUrl(page.path);
  const image = absoluteAsset(page.ogImage || defaultSeo.ogImage);
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Warrly",
      url: absoluteUrl("/"),
      logo: absoluteAsset("/brand/images/warrly-mark.png"),
      email: config.supportEmail,
      parentOrganization: {
        "@type": "Organization",
        name: "Dataplexor",
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Warrly",
      url: absoluteUrl("/"),
      description: defaultSeo.description,
      publisher: { "@type": "Organization", name: "Warrly" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: canonical,
      isPartOf: { "@type": "WebSite", name: "Warrly", url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Warrly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      description: defaultSeo.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        description: "Free tier available",
      },
    },
  ];

  return (
    <Helmet>
      <html lang="en" />
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultSeo.siteName} />
      <meta property="og:locale" content={defaultSeo.locale} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Warrly warranty vault" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#0f5d50" />
      <meta name="application-name" content="Warrly" />
      <meta name="apple-mobile-web-app-title" content="Warrly" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
