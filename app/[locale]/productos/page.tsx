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
  return { title: getDictionary(locale).products.title };
}

const productImages = [
  "/images/denim-texture.jpg",
  "/images/mill-facility.jpg",
  "/images/producto-uniformes.jpg",
  "/images/servicio-lavanderia.jpg",
  "/images/producto-camisas.jpg",
];

export default async function ProductosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.products;

  return (
    <div className="mx-auto max-w-3xl px-margin-edge py-8 lg:max-w-6xl">
      <div className="mb-12">
        <div className="hard-shadow -rotate-2 mb-2 inline-block bg-navy px-3 py-1 font-label-tech text-[10px] uppercase tracking-widest text-white">
          {t.tag}
        </div>
        <h1 className="text-headline-lg-mobile uppercase leading-none text-gold md:text-headline-xl">{t.title}</h1>
        <div className="mt-4 w-full border-b-2 border-dashed border-gold" />
      </div>

      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {t.items.map((item, i) => (
          <article key={item.number} className="relative">
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
          </article>
        ))}
      </section>

      <section className="mt-20 border-4 border-ink bg-navy p-6 text-white shadow-[8px_8px_0_0_var(--color-gold)] md:p-10">
        <h4 className="mb-4 text-headline-lg-mobile uppercase">{t.ctaTitle}</h4>
        <p className="mb-6 font-label-tech text-technical-sm uppercase tracking-widest opacity-80">{t.ctaBody}</p>
        <a
          href={`/${locale}/contacto`}
          className="block w-full border-2 border-ink bg-gold py-4 text-center font-bold uppercase tracking-tight text-on-gold transition-transform active:translate-y-1 md:inline-block md:w-auto md:px-12"
        >
          {t.ctaButton}
        </a>
      </section>
    </div>
  );
}
