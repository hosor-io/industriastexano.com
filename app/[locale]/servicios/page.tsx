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
  return { title: getDictionary(locale).services.title };
}

const serviceImages = ["/images/servicio-lavanderia.jpg", "/images/servicio-bordado.jpg"];

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.services;

  return (
    <div className="mx-auto max-w-3xl px-margin-edge py-8 lg:max-w-5xl">
      <div className="mb-12">
        <div className="hard-shadow care-label-tilt-left mb-4 inline-block bg-navy px-4 py-1 text-on-navy-muted">
          <span className="font-label-tech text-label-tech uppercase">{t.eyebrow}</span>
        </div>
        <h1 className="mb-2 text-headline-lg-mobile uppercase text-ink md:text-headline-xl">{t.title}</h1>
        <div className="mt-4 h-0.5 w-full bg-[repeating-linear-gradient(to_right,var(--color-outline)_0,var(--color-outline)_4px,transparent_4px,transparent_8px)]" />
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
        {t.items.map((service, i) => (
          <section key={service.number} className="space-y-6">
            <div className="relative">
              <div className="aspect-square w-full overflow-hidden border-2 border-ink bg-surface-container">
                <PlaceholderPhoto label={service.title} alt={service.title} src={serviceImages[i]} grayscaleHover />
              </div>
              <div
                className={`hard-shadow absolute z-10 border border-ink bg-surface-container-highest px-3 py-2 ${
                  i === 0 ? "care-label-tilt-right -top-4 -right-2" : "care-label-tilt-left -bottom-4 -left-2"
                }`}
              >
                <p className="font-label-tech text-[10px] font-bold uppercase text-ink">{service.badge}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-label-tech text-label-tech font-bold text-gold">{service.number}</span>
                <h3 className="text-headline-md uppercase tracking-tight text-ink">{service.title}</h3>
              </div>
              <p className="leading-relaxed text-on-surface-variant">{service.description}</p>
              {service.specs && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {service.specs.map((spec) => (
                    <div key={spec.label} className="border border-outline-variant bg-surface-container-low p-3">
                      <span className="mb-1 block font-label-tech text-[10px] uppercase text-outline">{spec.label}</span>
                      <span className="font-label-tech text-label-tech uppercase text-ink">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {service.chips && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.chips.map((chip, chipIndex) => (
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
        ))}
      </div>

      <div className="mt-16 border-l-4 border-gold bg-navy p-6 text-white">
        <span className="material-symbols-outlined mb-4 text-gold" aria-hidden="true">
          precision_manufacturing
        </span>
        <p className="font-label-tech text-label-tech uppercase italic leading-tight">&ldquo;{t.quote}&rdquo;</p>
      </div>
    </div>
  );
}
