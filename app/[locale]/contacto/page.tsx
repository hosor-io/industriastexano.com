import type { Metadata } from "next";
import PlaceholderPhoto from "@/components/placeholder-photo";
import ContactForm from "@/components/contact-form";
import { defaultLocale, isLocale, siteConfig, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return { title: getDictionary(locale).contact.title };
}

export default async function ContactoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const { email } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.contact;

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(dict.whatsappMessage)}`;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-gutter px-margin-edge py-8 lg:max-w-5xl">
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex flex-col">
            <span className="font-label-tech text-xs uppercase tracking-widest text-gold">{t.eyebrow}</span>
            <h1 className="text-headline-lg-mobile font-bold uppercase text-ink md:text-headline-xl">{t.title}</h1>
          </div>
          <div className="hard-shadow care-label-tilt-left border-2 border-ink bg-surface px-3 py-2">
            <p className="font-label-tech text-[10px] uppercase leading-tight text-ink">{t.locationBadge}</p>
          </div>
        </div>
        <div className="my-4 w-full border-t-2 border-dashed border-outline" />
      </section>

      <section className="relative flex flex-col gap-6 border-2 border-ink bg-surface-container p-gutter md:grid md:grid-cols-5 md:gap-10">
        <div className="absolute -top-3 -right-3 bg-gold px-2 py-1 font-label-tech text-xs font-bold text-on-gold">
          {t.formBadge}
        </div>
        <div className="md:col-span-3">
          <ContactForm form={t.form} defaultEmail={email} />
        </div>

        <div className="flex flex-col gap-gutter md:col-span-2">
          <h3 className="border-l-4 border-gold pl-3 font-label-tech text-sm font-bold uppercase text-ink">
            {t.channelsTitle}
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-2 border-ink bg-surface-container-low p-4 transition-all hover:bg-surface-container-high"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-gold" aria-hidden="true">
                  chat
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-60">{t.whatsapp.caption}</span>
                  <span className="font-bold text-ink">{t.whatsapp.label}</span>
                </div>
              </div>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" aria-hidden="true">
                arrow_forward
              </span>
            </a>

            <a
              href={`tel:+${siteConfig.whatsappNumber}`}
              className="flex items-center justify-between border-2 border-ink bg-surface-container-low p-4"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-gold" aria-hidden="true">
                  call
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-60">{t.phone.caption}</span>
                  <span className="font-bold uppercase text-ink">{siteConfig.phoneDisplay}</span>
                </div>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center justify-between border-2 border-ink bg-surface-container-low p-4"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-gold" aria-hidden="true">
                  mail
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-60">{t.email.caption}</span>
                  <span className="font-bold uppercase text-ink">{t.email.label}</span>
                </div>
              </div>
            </a>
          </div>

          <div className="relative h-48 w-full overflow-hidden border-2 border-ink">
            <PlaceholderPhoto label="Planta industrial" alt="Vista de planta industrial" src="/images/mill-facility.jpg" />
            <div className="absolute bottom-2 left-2 border border-ink bg-surface px-2 py-0.5 font-label-tech text-[10px] uppercase">
              {t.millCaption}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
