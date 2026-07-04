import type { MetadataRoute } from "next";
import { locales, siteConfig } from "@/lib/i18n/config";

const paths = ["", "nosotros", "productos", "servicios", "marcas", "contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.domain}/${locale}${path ? `/${path}` : ""}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.domain}/${l}${path ? `/${path}` : ""}`])
        ),
      },
    }))
  );
}
