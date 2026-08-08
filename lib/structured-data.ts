import { siteConfig, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Organization + WebSite JSON-LD, rendered once site-wide in the root
// layout — gives Google an explicit, structured identity for the company
// instead of relying entirely on inferring it from page copy.
export function buildOrganizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.domain}/#organization`,
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/brand/logo-ink.png`,
        description: dict.meta.description,
        foundingDate: "1980",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Armenia",
          addressRegion: "Sonsonate",
          addressCountry: "SV",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: `+${siteConfig.whatsappNumber}`,
            email: siteConfig.email,
            contactType: "sales",
            areaServed: ["SV", "GT", "CR"],
            availableLanguage: ["es", "en"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        name: siteConfig.name,
        url: siteConfig.domain,
        publisher: { "@id": `${siteConfig.domain}/#organization` },
        inLanguage: locale,
      },
    ],
  };
}
