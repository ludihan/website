import en from "@/dictionaries/en.json";
import pt from "@/dictionaries/pt.json";

const dictionaries = { en, pt };

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "en";
export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const localeNames: Record<Locale, string> = { en: "English", pt: "Português" };
export const dateLocales: Record<Locale, string> = { en: "en-GB", pt: "pt-BR" };

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
