export const locales = ['pt', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

interface LocaleSettings {
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  shortLabel: string;
  name: string;
}

export const localeSettings: Record<Locale, LocaleSettings> = {
  pt: {
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    shortLabel: 'PT',
    name: 'Português',
  },
  en: {
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    shortLabel: 'EN',
    name: 'English',
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
