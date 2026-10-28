import type { SiteContent } from './types';

export const pt = {
  meta: {
    title: 'Alberto Cavalcante | Portfólio',
    description:
      'Portfólio de Alberto Cavalcante: projetos, experiências, formação e habilidades em desenvolvimento de software.',
    jobTitle: 'Desenvolvedor de Software',
  },
  ui: {
    skipToContent: 'Pular para o conteúdo',
    loading: 'Carregando',
    backToTop: 'Voltar ao topo',
    homeLink: 'Início',
    mainNavigation: 'Navegação principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    switchToLight: 'Ativar tema claro',
    switchToDark: 'Ativar tema escuro',
    languageSelector: 'Idioma',
  },
  anchors: {
    intro: 'inicio',
    highlights: 'destaques',
    services: 'servicos',
    projects: 'projetos',
    resume: 'experiencia',
    skills: 'habilidades',
    testimonials: 'depoimentos',
    faq: 'perguntas',
    contact: 'contato',
  },
  navigation: [
    { section: 'services', label: 'Serviços' },
    { section: 'projects', label: 'Projetos' },
    { section: 'resume', label: 'Experiência' },
    { section: 'skills', label: 'Habilidades' },
    { section: 'testimonials', label: 'Depoimentos' },
    { section: 'contact', label: 'Contato' },
  ],
  header: {
    ctaLabel: 'Fale comigo',
    ctaSection: 'contact',
  },
} satisfies SiteContent;
