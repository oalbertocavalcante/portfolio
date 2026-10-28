import type { SiteContent } from './types';

export const en = {
  meta: {
    title: 'Alberto Cavalcante | Portfolio',
    description:
      'Portfolio of Alberto Cavalcante: projects, experience, education and skills in software development.',
    jobTitle: 'Software Developer',
  },
  ui: {
    skipToContent: 'Skip to content',
    loading: 'Loading',
    backToTop: 'Back to top',
    homeLink: 'Home',
    mainNavigation: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    languageSelector: 'Language',
  },
  anchors: {
    intro: 'home',
    highlights: 'highlights',
    services: 'services',
    projects: 'projects',
    resume: 'experience',
    skills: 'skills',
    testimonials: 'testimonials',
    faq: 'faq',
    contact: 'contact',
  },
  navigation: [
    { section: 'services', label: 'Services' },
    { section: 'projects', label: 'Projects' },
    { section: 'resume', label: 'Experience' },
    { section: 'skills', label: 'Skills' },
    { section: 'testimonials', label: 'Testimonials' },
    { section: 'contact', label: 'Contact' },
  ],
  header: {
    ctaLabel: "Let's talk",
    ctaSection: 'contact',
  },
} satisfies SiteContent;
