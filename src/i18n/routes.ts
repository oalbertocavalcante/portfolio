import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';
import { locales, localeSettings, type Locale } from './locales';

export function localePath(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

export function localeUrl(locale: Locale, path = ''): string {
  return getAbsoluteLocaleUrl(locale, path);
}

export interface AlternateLink {
  locale: Locale;
  hreflang: string;
  href: string;
}

export function alternateLinks(paths: Record<Locale, string>): AlternateLink[] {
  return locales.map((locale) => ({
    locale,
    hreflang: localeSettings[locale].hreflang,
    href: localeUrl(locale, paths[locale]),
  }));
}

export function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
