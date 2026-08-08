import type { Metadata } from "next";
import PlaceholderPhoto from "@/components/placeholder-photo";
import { defaultLocale, isLocale, localeAlternates, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
  return {
    title: getDictionary(locale).uniforms.title,
    alternates: localeAlternates(locale, "uniformes"),
  };
}

const productImages = [
  "/images/catalogo-jeans.jpg",
  "/images/catalogo-jacket.jpg",
  "/images/catalogo-uniforme.jpg",
  "/images/catalogo-shorts.jpg",
  "/images/catalogo-camisa.jpg",
];

// Jeans/Jackets/Uniformes/Shorts share the general catalog; Camisas links to
// the Sergio brand catalog, where that product's photo actually comes from.
const catalogPdfs = [
  "/catalogo/catalogo-productos.pdf",
  "/catalogo/catalogo-productos.pdf",
  "/catalogo/catalogo-productos.pdf",
  "/catalogo/catalogo-productos.pdf",
  "/catalogo/catalogo-sergio.pdf",
];

export default async function UniformesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.uniforms;
  const products = dict.products;
  const services = dict.services;
  const lavanderia = services.items[0];
  const bordado = services.items[1];

  return (
    <div className="mx-auto max-w-3xl px-margin-edge py-8 lg:max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <div className="hard-shadow -rotate-2 mb-2 inline-block bg-navy px-3 py-1 font-label-tech text-[10px] uppercase tracking-widest text-white">
          {t.tag}
        </div>
        <h1 className="text-headline-lg-mobile uppercase leading-none text-gold md:text-headline-xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{t.lead}</p>
        <div className="mt-6 w-full border-b-2 border-dashed border-gold" />
      </div>

      {/* In-page section nav */}
      <nav aria-label={t.title} className="mb-14 flex flex-wrap gap-3">
        <a
          href="#confeccion"
          className="border-2 border-ink bg-surface-container-lowest px-4 py-2 font-label-tech text-technical-sm font-bold uppercase text-ink transition-colors hover:bg-gold hover:text-on-gold"
        >
          {t.navConfeccion}
        </a>
        <a
          href="#bordado"
          className="border-2 border-ink bg-surface-container-lowest px-4 py-2 font-label-tech text-technical-sm font-bold uppercase text-ink transition-colors hover:bg-gold hover:text-on-gold"
        >
          {t.navBordado}
        </a>
        <a
          href="#lavanderia"
          className="border-2 border-ink bg-surface-container-lowest px-4 py-2 font-label-tech text-technical-sm font-bold uppercase text-ink transition-colors hover:bg-gold hover:text-on-gold"
        >
          {t.navLavanderia}
        </a>
      </nav>

      {/* 01 — Confección */}
      <section id="confeccion" className="mb-24 scroll-mt-24">
        <div className="mb-8 flex flex-col gap-6 border-l-4 border-gold pl-4 md:flex-row md:items-end md:justify-between md:pl-6">
          <div>
            <h2 className="text-headline-lg-mobile uppercase text-ink md:text-headline-lg">{t.confeccionTitle}</h2>
            <p className="mt-2 max-w-xl text-body-md text-on-surface-variant">{t.confeccionLead}</p>
          </div>
          <a
            href="/catalogo/catalogo-productos.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hard-shadow shrink-0 border-2 border-ink bg-gold px-6 py-4 text-center font-label-tech font-bold uppercase text-on-gold transition-transform hover:-translate-y-0.5"
          >
            {t.catalogCta} ↗
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.items.map((item, i) => {
            const cardBody = (
              <>
                <div className="mb-4 flex items-start gap-4">
                  <span className="text-headline-lg-mobile leading-none text-ink opacity-20">{item.number}</span>
                  <div>
                    <h3 className="text-headline-lg-mobile uppercase leading-none text-ink">{item.name}</h3>
                    <p className="mt-1 font-label-tech text-technical-sm text-gold">{item.spec}</p>
                  </div>
                </div>
                <div className="relative aspect-square w-full overflow-hidden border-2 border-ink bg-surface-container">
                  <PlaceholderPhoto label={item.name} alt={`${item.name} — ${item.spec}`} src={productImages[i]} />
                  {item.badge && (
                    <div className="hard-shadow rotate-2 absolute bottom-4 right-4 border border-ink bg-surface-container-lowest p-2">
                      <p className="font-label-tech text-technical-xs text-ink">{item.badge}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 border-l-4 border-gold pl-4">
                  <p className="text-body-md text-on-surface-variant">{item.description}</p>
                </div>
                <p className="mt-3 font-label-tech text-technical-sm font-bold uppercase tracking-wide text-navy underline underline-offset-4 group-hover:text-gold">
                  {products.viewCatalog} ↗
                </p>
              </>
            );

            return (
              <a
                key={item.number}
                href={catalogPdfs[i]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} — ${products.viewCatalog}`}
                className="group relative block outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
              >
                {cardBody}
              </a>
            );
          })}
        </div>
      </section>

      {/* 02 — Bordado Corporativo */}
      <section id="bordado" className="mb-24 grid scroll-mt-24 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden border-2 border-ink bg-surface-container">
            <PlaceholderPhoto label={bordado.title} alt={bordado.title} src="/images/bordado-corporativo.jpg" grayscaleHover />
          </div>
          <div className="hard-shadow care-label-tilt-right absolute -top-4 -right-2 z-10 border border-ink bg-surface-container-highest px-3 py-2">
            <p className="font-label-tech text-[10px] font-bold uppercase text-ink">{bordado.badge}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-label-tech text-label-tech font-bold text-gold">{bordado.number}</span>
            <h2 className="text-headline-md uppercase tracking-tight text-ink">{bordado.title}</h2>
          </div>
          <p className="leading-relaxed text-on-surface-variant">{bordado.description}</p>
          {bordado.chips && (
            <div className="flex flex-wrap gap-2 pt-2">
              {bordado.chips.map((chip, chipIndex) => (
                <span
                  key={chip}
                  className={
                    chipIndex === 0
                      ? "bg-gold px-3 py-1 font-label-tech text-[10px] font-bold uppercase text-on-gold"
                      : "border border-ink px-3 py-1 font-label-tech text-[10px] uppercase text-ink"
                  }
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 03 — Lavandería Industrial */}
      <section id="lavanderia" className="mb-20 grid scroll-mt-24 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div className="order-2 flex flex-col justify-center space-y-4 md:order-1">
          <div className="flex items-center gap-2">
            <span className="font-label-tech text-label-tech font-bold text-gold">{lavanderia.number}</span>
            <h2 className="text-headline-md uppercase tracking-tight text-ink">{lavanderia.title}</h2>
          </div>
          <p className="leading-relaxed text-on-surface-variant">{lavanderia.description}</p>
          {lavanderia.specs && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {lavanderia.specs.map((spec) => (
                <div key={spec.label} className="border border-outline-variant bg-surface-container-low p-3">
                  <span className="mb-1 block font-label-tech text-[10px] uppercase text-outline">{spec.label}</span>
                  <span className="font-label-tech text-label-tech uppercase text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative order-1 md:order-2">
          <div className="aspect-square w-full overflow-hidden border-2 border-ink bg-surface-container">
            <PlaceholderPhoto label={lavanderia.title} alt={lavanderia.title} src="/images/servicio-lavanderia.jpg" grayscaleHover />
          </div>
          <div className="hard-shadow care-label-tilt-left absolute -bottom-4 -left-2 z-10 border border-ink bg-surface-container-highest px-3 py-2">
            <p className="font-label-tech text-[10px] font-bold uppercase text-ink">{lavanderia.badge}</p>
          </div>
        </div>
      </section>

      <div className="mb-20 border-l-4 border-gold bg-navy p-6 text-white">
        <span className="material-symbols-outlined mb-4 text-gold" aria-hidden="true">
          precision_manufacturing
        </span>
        <p className="font-label-tech text-label-tech uppercase italic leading-tight">&ldquo;{services.quote}&rdquo;</p>
      </div>

      <section className="border-4 border-ink bg-navy p-6 text-white shadow-[8px_8px_0_0_var(--color-gold)] md:p-10">
        <h4 className="mb-4 text-headline-lg-mobile uppercase">{products.ctaTitle}</h4>
        <p className="mb-6 font-label-tech text-technical-sm uppercase tracking-widest opacity-80">{products.ctaBody}</p>
        <a
          href={`/${locale}/contacto`}
          className="block w-full border-2 border-ink bg-gold py-4 text-center font-bold uppercase tracking-tight text-on-gold transition-transform active:translate-y-1 md:inline-block md:w-auto md:px-12"
        >
          {products.ctaButton}
        </a>
      </section>
    </div>
  );
}
