import type { Metadata } from "next";
import { Montserrat, Archivo_Narrow } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BottomNav from "@/components/bottom-nav";
import WhatsappFab from "@/components/whatsapp-fab";
import { locales, defaultLocale, isLocale, siteConfig, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo-narrow",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: dict.meta.titleSuffix,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      title: dict.meta.titleSuffix,
      description: dict.meta.description,
      url: `${siteConfig.domain}/${locale}`,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_SV" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.titleSuffix,
      description: dict.meta.description,
    },
    icons: {
      icon: "/icon.png",
      apple: [
        { url: "/favicons/apple-icon-57x57.png", sizes: "57x57" },
        { url: "/favicons/apple-icon-60x60.png", sizes: "60x60" },
        { url: "/favicons/apple-icon-72x72.png", sizes: "72x72" },
      ],
    },
    manifest: "/manifest.json",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${archivoNarrow.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router root layout, not pages/_document */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="font-sans">
        <SiteHeader locale={locale} dict={dict} />
        <main className="pt-16 pb-16 lg:pb-0">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
        <BottomNav locale={locale} dict={dict} />
        <WhatsappFab message={dict.whatsappMessage} label={dict.nav.quoteCta} />
      </body>
    </html>
  );
}
