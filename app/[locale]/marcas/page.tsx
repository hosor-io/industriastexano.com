import type { Metadata } from "next";
import PlaceholderPhoto from "@/components/placeholder-photo";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return { title: getDictionary(locale).brands.title };
}

const brandImages = ["/images/jeans-industriales.jpg", "/images/marca-eurosilver.jpg"];

export default async function MarcasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.brands;

  return (
    <>
      <div className="mx-auto max-w-3xl px-margin-edge py-8 lg:max-w-6xl">
        <div className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-label-tech text-xs uppercase tracking-widest text-gold">{t.eyebrow}</span>
            <div className="h-px flex-grow bg-outline-variant" />
          </div>
          <h1 className="text-headline-lg-mobile font-extrabold uppercase tracking-tighter text-ink md:text-headline-xl">
            {t.title}
          </h1>
          <p className="mt-2 max-w-[280px] text-sm uppercase text-on-surface-variant md:max-w-none">{t.lead}</p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
          {t.items.map((brand, i) => (
            <section key={brand.name}>
              <div className="relative mb-6">
                <div className="absolute -top-4 z-20 left-2 md:left-auto md:right-2">
                  <div className="hard-shadow -rotate-2 border border-ink bg-surface-container-lowest px-3 py-1">
                    <span className="font-label-tech text-[10px] text-ink">{brand.origin}</span>
                  </div>
                </div>
                <div className="relative h-[380px] w-full overflow-hidden bg-navy md:h-[450px]">
                  <PlaceholderPhoto label={brand.name} alt={`Marca ${brand.name}`} src={brandImages[i]} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-5xl uppercase leading-none tracking-tighter text-white">{brand.name}</h2>
                  </div>
                </div>
              </div>
              <div className="stitch-divider mb-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {brand.tags.map((tag, tagIndex) => (
                    <div
                      key={tag}
                      className={`border border-ink bg-surface px-2 py-1 ${
                        tagIndex % 2 === 0 ? "rotate-1" : "-rotate-1"
                      }`}
                    >
                      <span className="font-label-tech text-xs uppercase">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={`/${locale}/contacto`}
                className={`flex items-center justify-between px-6 py-4 font-label-tech uppercase transition-transform active:scale-[0.98] ${
                  i === 0 ? "bg-ink text-white" : "hard-shadow border border-white bg-navy text-white"
                }`}
              >
                <span>{brand.cta}</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-navy px-margin-edge py-12 text-white">
        <div className="mx-auto max-w-3xl lg:max-w-6xl">
          <div className="mb-8">
            <span className="mb-2 block font-label-tech text-xs tracking-[0.3em] text-on-navy-muted">
              MANUFACTURING DIV.
            </span>
            <h3 className="border-b border-white/20 pb-4 text-headline-lg-mobile font-bold uppercase">
              {t.specTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.specs.map((spec) => (
              <div key={spec.label} className="flex items-end justify-between border-b border-white/10 pb-2">
                <div className="flex flex-col">
                  <span className="font-label-tech text-[10px] opacity-70">{spec.label}</span>
                  <span className="text-sm font-medium">{spec.value}</span>
                </div>
                <span className="font-label-tech text-[10px] opacity-90">{spec.ref}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
