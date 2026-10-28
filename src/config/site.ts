import type { Locale } from '@/i18n/locales';

export type SocialNetwork = 'linkedin' | 'github';

interface SiteConfig {
  url: string;
  base: string;
  indexable: boolean;
  themeColor: string;
  owner: {
    name: string;
  };
  contact: {
    email: string;
  };
  social: Record<SocialNetwork, string>;
  resume: Record<Locale, string>;
}

export const siteConfig: SiteConfig = {
  url: 'https://oalbertocavalcante.github.io',
  base: '/portfolio',
  indexable: false,
  themeColor: '#0d1117',
  owner: {
    name: 'Alberto Cavalcante',
  },
  contact: {
    email: '',
  },
  social: {
    linkedin: '',
    github: '',
  },
  resume: {
    pt: '',
    en: '',
  },
};
