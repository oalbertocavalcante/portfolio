import type { Locale } from '@/i18n/locales';
import { en } from './en';
import { pt } from './pt';
import type { SiteContent } from './types';

const contentByLocale: Record<Locale, SiteContent> = { pt, en };

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}
