import type { Metadata } from "next";
import Image from "next/image";
import CareLabel from "@/components/ui/care-label";
import PlaceholderPhoto from "@/components/placeholder-photo";
import StitchDivider from "@/components/ui/stitch-divider";
import { defaultLocale, isLocale, siteConfig, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { clients } from "@/lib/clients";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  // This segment sits at the same level as the layout defining the title
  // template, so it doesn't inherit it — build the "| Industrias Texano"
  // suffix explicitly to match every other page's tab title.
  return { title: `${dict.home.heroTitlePrefix} ${dict.home.heroTitleHighlight} | ${siteConfig.name}` };
}

const productImages = ["/images/jeans-industriales.jpg", "/images/bordado-corporativo.jpg", "/images/servicio-lavanderia.jpg"];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-navy px-margin-edge py-24">
        <Image
          src="/images/denim-texture.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="absolute inset-0 z-0 object-cover opacity-20 mix-blend-overlay"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <CareLabel className="mb-8">
              <p className="font-label-tech text-label-tech uppercase leading-none font-bold text-ink">
                {t.badge}
              </p>
            </CareLabel>
            <h1 className="mb-6 font-sans text-headline-xl uppercase leading-[0.95] text-surface-container-lowest md:text-[72px] md:leading-[0.95]">
              {t.heroTitlePrefix} <span className="text-gold">{t.heroTitleHighlight}</span>
            </h1>
            <p className="mb-10 max-w-lg border-l-4 border-gold pl-6 text-body-lg text-surface-container-low opacity-90">
              {t.heroBody}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`/${locale}/contacto`}
                className="hard-shadow bg-gold px-10 py-5 text-center font-label-tech font-bold uppercase text-on-gold transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.ctaPrimary}
              </a>
              <a
                href={`/${locale}/productos`}
                className="border-2 border-white px-10 py-5 text-center font-label-tech font-bold uppercase text-white transition-all hover:bg-white hover:text-navy"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 hidden lg:block">
            <div className="flex flex-col gap-2 border-2 border-gold bg-navy/60 p-6 backdrop-blur-sm">
              <span className="font-label-tech text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {t.specLabel}
              </span>
              <span className="text-headline-lg leading-none text-surface-container-lowest">{t.specValue}</span>
              <span className="font-label-tech text-label-tech text-white opacity-80">{t.specCaption}</span>
            </div>
          </div>
        </div>
      </section>

      <StitchDivider />

      {/* Products grid */}
      <section className="bg-surface px-margin-edge py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-end justify-between gap-gutter md:flex-row md:mb-16">
            <div>
              <span className="mb-2 block font-label-tech text-label-tech font-bold uppercase text-gold">
                {t.sectionEyebrow}
              </span>
              <h2 className="text-headline-lg uppercase text-on-surface">{t.sectionTitle}</h2>
            </div>
            <div className="w-full border-t-2 border-on-surface pt-4 md:w-1/3">
              <p className="font-label-tech text-label-tech font-bold uppercase text-on-surface-variant">
                {t.sectionLead}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.products.map((product, i) => (
              <div key={product.title}>
                <div className="relative mb-6 h-[380px] overflow-hidden border-2 border-navy md:h-[450px]">
                  <PlaceholderPhoto label={product.title} alt={product.title} src={productImages[i]} grayscaleHover />
                  <div className="absolute top-4 left-4 bg-navy px-2 py-1 font-label-tech text-[10px] font-bold uppercase text-white">
                    {product.tag}
                  </div>
                </div>
                <div className="border-b-2 border-navy pb-4">
                  <h3 className="mb-2 text-headline-md uppercase text-on-surface">{product.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bento */}
      <section className="bg-navy px-margin-edge py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 md:grid-cols-4">
          <div className="border-2 border-gold p-8 md:col-span-2">
            <span className="font-label-tech text-label-tech font-bold uppercase text-gold">{t.statsEyebrow}</span>
            <h2 className="mt-4 mb-6 text-headline-lg uppercase leading-tight">{t.statsTitle}</h2>
            <p className="mb-8 opacity-80">{t.statsBody}</p>
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-gold font-bold text-on-gold">SV</div>
              <div className="flex h-12 w-12 items-center justify-center border border-white font-bold">GT</div>
              <div className="flex h-12 w-12 items-center justify-center border border-white font-bold">CR</div>
            </div>
          </div>
          <div className="flex flex-col justify-between border-2 border-navy bg-surface-container-highest/10 p-8">
            <span className="material-symbols-outlined text-4xl text-gold" aria-hidden="true">
              precision_manufacturing
            </span>
            <div>
              <div className="text-headline-xl text-gold">10,000+</div>
              <div className="font-label-tech text-[10px] font-bold uppercase opacity-70">{t.statPieces}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between border-2 border-navy bg-surface p-8 text-navy">
            <span className="material-symbols-outlined text-4xl text-navy" aria-hidden="true">
              history
            </span>
            <div>
              <div className="text-headline-xl">46+</div>
              <div className="font-label-tech text-[10px] font-bold uppercase opacity-70">{t.statYears}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-y-2 border-dashed border-outline-variant bg-surface-container px-margin-edge py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <span className="mb-2 block font-label-tech text-label-tech font-bold uppercase text-gold">
              {t.clientsEyebrow}
            </span>
            <h2 className="text-headline-lg uppercase text-on-surface">{t.clientsTitle}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group flex aspect-[3/2] items-center justify-center border-2 border-outline-variant bg-surface-container-lowest p-6 md:p-8"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className="max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-surface px-margin-edge py-20 md:py-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden border-4 border-navy bg-surface-container-lowest p-8 text-center md:p-12">
          <div className="absolute top-0 left-0 h-1 w-full bg-gold" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gold" />
          <span className="mb-6 block font-label-tech text-label-tech font-bold uppercase tracking-widest text-gold">
            {t.ctaSectionEyebrow}
          </span>
          <h2 className="mb-10 text-headline-lg uppercase text-navy">{t.ctaSectionTitle}</h2>
          <form action={`/${locale}/contacto`} method="get" className="mx-auto flex max-w-2xl flex-col gap-4 md:flex-row">
            <label htmlFor="home-email" className="sr-only">
              {t.ctaEmailPlaceholder}
            </label>
            <input
              id="home-email"
              name="email"
              type="email"
              placeholder={t.ctaEmailPlaceholder}
              className="flex-grow border-2 border-navy bg-surface p-4 font-label-tech uppercase text-navy outline-none placeholder:opacity-60"
            />
            <button
              type="submit"
              className="bg-navy px-8 py-4 font-label-tech font-bold uppercase text-white transition-all hover:bg-gold hover:text-on-gold"
            >
              {t.ctaSubmit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
