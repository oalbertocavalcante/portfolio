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
  hero: {
    outline: 'Hi',
    eyebrow: 'I am Alberto',
    title: 'Software\nDeveloper',
    description: 'I turn complex problems into clear, secure and well-crafted software solutions.',
    resumeLabel: 'Download resume',
    imageAlt: 'Photo of Alberto Cavalcante',
    socialLabel: 'Social networks',
  },
  stats: [
    { value: '3', label: 'Years of\nexperience' },
    { value: '20', suffix: '+', label: 'Completed\nprojects' },
    { value: '10', suffix: '+', label: 'Mastered\ntechnologies' },
    { value: '5', label: 'Earned\ncertifications' },
  ],
  roles: [
    'Web development',
    'Back-end',
    'Front-end',
    'Information security',
    'Automation',
    'Cloud',
  ],
  highlights: {
    eyebrow: 'Strengths',
    title: 'What I deliver',
    items: [
      {
        icon: 'bi:code-slash',
        title: 'Clean code',
        description:
          'Readable, tested and maintainable solutions that follow solid engineering practices.',
      },
      {
        icon: 'bi:shield-lock',
        title: 'Security from day one',
        description:
          'Attention to vulnerabilities and security best practices at every development stage.',
      },
      {
        icon: 'bi:rocket-takeoff',
        title: 'Focused delivery',
        description:
          'Clear communication, realistic deadlines and close follow-up from start to finish.',
      },
    ],
  },
} satisfies SiteContent;
