export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const siteConfig = {
  name: "Industrias Texano",
  domain: "https://industriastexano.com",
  whatsappNumber: "50372958591",
  email: "ventas@industriastexano.com",
  phoneDisplay: "+503 7295-8591",
  city: "Armenia, Sonsonate, El Salvador",
};

// Path segments are shared across locales (e.g. /en/nosotros, not /en/about)
// so the language switcher only ever needs to swap the leading locale segment.
export const navPaths = ["", "nosotros", "productos", "servicios", "marcas", "contacto"] as const;
