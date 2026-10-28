import type { Locale } from './locales';

export const homePaths: Record<Locale, string> = {
  pt: '',
  en: '',
};

export const projectsSegment: Record<Locale, string> = {
  pt: 'projetos',
  en: 'projects',
};

export function projectPaths(slug: string): Record<Locale, string> {
  return {
    pt: `${projectsSegment.pt}/${slug}`,
    en: `${projectsSegment.en}/${slug}`,
  };
}
