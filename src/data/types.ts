import type { IconName } from '@/lib/icons';

export type SectionKey =
  | 'intro'
  | 'highlights'
  | 'services'
  | 'projects'
  | 'resume'
  | 'skills'
  | 'testimonials'
  | 'faq'
  | 'contact';

export interface PageMeta {
  title: string;
  description: string;
  jobTitle: string;
}

export interface InterfaceText {
  skipToContent: string;
  loading: string;
  backToTop: string;
  homeLink: string;
  mainNavigation: string;
  openMenu: string;
  closeMenu: string;
  switchToLight: string;
  switchToDark: string;
  languageSelector: string;
}

export interface NavigationItem {
  section: SectionKey;
  label: string;
}

export interface HeaderContent {
  ctaLabel: string;
  ctaSection: SectionKey;
}

export interface HeroContent {
  outline: string;
  eyebrow: string;
  title: string;
  description: string;
  resumeLabel: string;
  imageAlt: string;
  socialLabel: string;
}

export interface StatItem {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface HighlightItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface HighlightsContent {
  eyebrow: string;
  title: string;
  items: HighlightItem[];
}

export interface SectionIntro {
  title: string;
  description?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesContent extends SectionIntro {
  linkLabel: string;
  items: ServiceItem[];
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  imageAlt: string;
  repository?: string;
}

export interface ProjectsContent extends SectionIntro {
  filterLabel: string;
  allLabel: string;
  linkLabel: string;
  categories: ProjectCategory[];
  items: ProjectItem[];
}

export interface ResumeEntry {
  period: string;
  title: string;
  place: string;
}

export interface ResumeColumn {
  title: string;
  icon: IconName;
  items: ResumeEntry[];
}

export interface ResumeContent {
  experience: ResumeColumn;
  education: ResumeColumn;
}

export interface SiteContent {
  meta: PageMeta;
  ui: InterfaceText;
  anchors: Record<SectionKey, string>;
  navigation: NavigationItem[];
  header: HeaderContent;
  hero: HeroContent;
  stats: StatItem[];
  roles: string[];
  highlights: HighlightsContent;
  services: ServicesContent;
  projects: ProjectsContent;
  resume: ResumeContent;
}
