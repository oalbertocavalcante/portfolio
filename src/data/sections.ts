import type { NavigationItem, SectionKey, SiteContent } from './types';

export function getEnabledSections(content: SiteContent): Set<SectionKey> {
  const availability: Record<SectionKey, boolean> = {
    intro: true,
    highlights: content.highlights.items.length > 0,
    services: content.services.items.length > 0,
    projects: content.projects.items.length > 0,
    resume: content.resume.experience.items.length > 0 || content.resume.education.items.length > 0,
    skills: content.skills.items.length > 0,
    testimonials: content.testimonials.items.length > 0,
    faq: false,
    contact: true,
  };
  return new Set(
    (Object.keys(availability) as SectionKey[]).filter((section) => availability[section]),
  );
}

export function getNavigation(content: SiteContent): NavigationItem[] {
  const enabled = getEnabledSections(content);
  return content.navigation.filter((item) => enabled.has(item.section));
}
