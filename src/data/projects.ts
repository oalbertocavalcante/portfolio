import { locales, type Locale } from '@/i18n/locales';
import { getContent } from './index';
import type { ProjectDetails, ProjectItem } from './types';

export type DetailedProject = ProjectItem & { details: ProjectDetails };

function hasDetails(item: ProjectItem): item is DetailedProject {
  return Boolean(item.details);
}

export function getDetailedProjects(locale: Locale): DetailedProject[] {
  const own = getContent(locale).projects.items.filter(hasDetails);
  locales
    .filter((other) => other !== locale)
    .forEach((other) => {
      const otherSlugs = new Set(
        getContent(other)
          .projects.items.filter(hasDetails)
          .map((item) => item.slug),
      );
      own.forEach((item) => {
        if (!otherSlugs.has(item.slug)) {
          throw new Error(
            `O projeto "${item.slug}" tem detalhes em "${locale}" mas não em "${other}".`,
          );
        }
      });
    });
  return own;
}
