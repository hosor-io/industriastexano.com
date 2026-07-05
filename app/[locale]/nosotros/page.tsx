import type { Metadata } from "next";
import CareLabel from "@/components/ui/care-label";
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
  return { title: getDictionary(locale).about.title };
}

export default async function NosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <div className="mx-auto max-w-3xl px-margin-edge py-8 lg:max-w-5xl">
      {/* Hero */}
      <section className="py-8">
        <span className="mb-2 block font-label-tech text-label-tech font-bold uppercase text-gold">{t.eyebrow}</span>
        <h1 className="text-headline-lg-mobile uppercase leading-none text-ink md:text-headline-xl">{t.title}</h1>

        <div className="mt-8 flex justify-start">
          <CareLabel>
            <p className="mb-1 font-label-tech text-[10px] uppercase text-ink">{t.badgeTop}</p>
            <p className="text-headline-lg-mobile uppercase text-gold">{t.badgeYears}</p>
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-ink pt-2">
              <span className="font-label-tech text-[10px] uppercase text-ink">{t.badgeEst}</span>
              <span className="material-symbols-outlined text-ink" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                verified
              </span>
            </div>
          </CareLabel>
        </div>
      </section>

      <hr className="my-8 border-t-2 border-dashed border-outline-variant" />

      {/* Intro */}
      <section className="grid gap-6 py-4 md:grid-cols-2 md:items-center md:gap-12">
        <div className="relative aspect-square w-full overflow-hidden border-2 border-ink">
          <PlaceholderPhoto
            label={locale === "es" ? "Taller de confección" : "Sewing workshop"}
            alt={locale === "es" ? "Taller de confección de jeans" : "Jeans sewing workshop"}
            src="/images/servicio-bordado.jpg"
          />
          <div className="hard-shadow absolute bottom-4 left-4 right-4 border-2 border-ink bg-surface p-3">
            <p className="font-label-tech text-[10px] uppercase text-ink">{t.introSpec}</p>
            <p className="font-bold uppercase text-ink">{t.introCaption}</p>
          </div>
        </div>
        <p className="leading-relaxed text-ink">{t.introBody}</p>
      </section>

      {/* Timeline */}
      <section className="mt-8 -mx-margin-edge bg-navy px-margin-edge py-12 text-white md:mx-0 md:px-12">
        <h2 className="mb-8 border-b border-dashed border-gold pb-2 font-label-tech text-label-tech uppercase text-gold">
          {t.milestonesTitle}
        </h2>
        <div className="relative ml-2 space-y-12 border-l-2 border-dashed border-gold pl-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:border-l-0 md:border-t-2 md:pl-0 md:pt-8">
          {t.milestones.map((milestone) => (
            <div key={milestone.year} className="relative">
              <div className="absolute -left-[33px] top-0 h-4 w-4 rounded-full border-2 border-navy bg-gold md:-top-[41px] md:left-0" />
              <span className="font-label-tech text-label-tech text-gold">{milestone.year}</span>
              <h3 className="mt-1 text-headline-md uppercase">{milestone.title}</h3>
              <p className="mt-2 opacity-80">{milestone.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <h2 className="mb-6 font-label-tech text-label-tech uppercase text-gold">{t.valuesTitle}</h2>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {t.values.map((value, i) => (
            <div
              key={value.title}
              className={`flex flex-col gap-4 border-2 border-ink p-6 ${
                i === 1 ? "hard-shadow bg-gold text-on-gold" : "bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                {i === 0 ? "family_history" : "precision_manufacturing"}
              </span>
              <h4 className="text-headline-md uppercase">{value.title}</h4>
              <p>{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12">
        <div className="border-t-2 border-dashed border-outline-variant pt-8 text-center">
          <p className="mb-4 font-label-tech text-[10px] uppercase text-ink">{t.ctaEyebrow}</p>
          <a
            href={`/${locale}/productos`}
            className="hard-shadow inline-block w-full border-2 border-ink bg-gold py-4 font-label-tech font-bold uppercase tracking-widest text-on-gold transition-transform active:translate-y-0.5 md:w-auto md:px-12"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>
    </div>
  );
}
