import type { Locale } from "./config";
import es from "./dictionaries/es";
import en from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/types";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
