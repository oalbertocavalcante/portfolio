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

export interface SiteContent {
  meta: PageMeta;
  ui: InterfaceText;
  anchors: Record<SectionKey, string>;
  navigation: NavigationItem[];
  header: HeaderContent;
}
