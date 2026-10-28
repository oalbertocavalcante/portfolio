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
  hero: {
    outline: 'Olá',
    eyebrow: 'Eu sou Alberto',
    title: 'Desenvolvedor\nde Software',
    description:
      'Transformo problemas complexos em soluções de software claras, seguras e bem construídas.',
    resumeLabel: 'Baixar currículo',
    imageAlt: 'Foto de Alberto Cavalcante',
    socialLabel: 'Redes sociais',
  },
  stats: [
    { value: '3', label: 'Anos de\nexperiência' },
    { value: '20', suffix: '+', label: 'Projetos\nconcluídos' },
    { value: '10', suffix: '+', label: 'Tecnologias\ndominadas' },
    { value: '5', label: 'Certificações\nobtidas' },
  ],
  roles: [
    'Desenvolvimento web',
    'Back-end',
    'Front-end',
    'Segurança da informação',
    'Automação',
    'Cloud',
  ],
  highlights: {
    eyebrow: 'Diferenciais',
    title: 'O que eu entrego',
    items: [
      {
        icon: 'bi:code-slash',
        title: 'Código limpo',
        description:
          'Soluções legíveis, testadas e fáceis de manter, seguindo boas práticas de engenharia.',
      },
      {
        icon: 'bi:shield-lock',
        title: 'Segurança desde o início',
        description:
          'Atenção a vulnerabilidades e boas práticas de segurança em cada etapa do desenvolvimento.',
      },
      {
        icon: 'bi:rocket-takeoff',
        title: 'Entrega com foco',
        description:
          'Comunicação clara, prazos realistas e acompanhamento próximo do início ao fim.',
      },
    ],
  },
  services: {
    title: 'Meus serviços',
    description:
      'Transformo ideias em projetos de software bem estruturados, seguros e prontos para crescer.',
    linkLabel: 'Conversar sobre',
    items: [
      {
        title: 'Desenvolvimento web',
        description:
          'Aplicações web modernas, responsivas e acessíveis, do planejamento à publicação.',
      },
      {
        title: 'APIs e back-end',
        description:
          'Serviços e integrações robustos, com foco em desempenho, organização e testes.',
      },
      {
        title: 'Segurança de aplicações',
        description:
          'Análise de vulnerabilidades e aplicação de boas práticas para proteger seus sistemas.',
      },
      {
        title: 'Automação de processos',
        description:
          'Scripts e ferramentas que eliminam tarefas repetitivas e reduzem erros manuais.',
      },
    ],
  },
  projects: {
    title: 'Projetos recentes',
    filterLabel: 'Filtrar projetos por categoria',
    allLabel: 'Todos',
    linkLabel: 'Ver repositório',
    categories: [
      { id: 'web', label: 'Web' },
      { id: 'api', label: 'APIs' },
      { id: 'security', label: 'Segurança' },
      { id: 'automation', label: 'Automação' },
    ],
    items: [
      {
        slug: 'personal-portfolio',
        title: 'Portfólio pessoal',
        summary: 'Site estático bilíngue com foco em desempenho e acessibilidade.',
        categories: ['web'],
        imageAlt: 'Tela inicial do projeto de portfólio pessoal',
      },
      {
        slug: 'task-api',
        title: 'API de tarefas',
        summary: 'API REST com autenticação, testes automatizados e documentação.',
        categories: ['api', 'web'],
        imageAlt: 'Painel da API de tarefas',
      },
      {
        slug: 'vulnerability-scanner',
        title: 'Scanner de vulnerabilidades',
        summary: 'Ferramenta de linha de comando para auditoria de aplicações web.',
        categories: ['security'],
        imageAlt: 'Resultado de uma varredura do scanner de vulnerabilidades',
      },
      {
        slug: 'report-automation',
        title: 'Automação de relatórios',
        summary: 'Geração automática de relatórios a partir de múltiplas fontes de dados.',
        categories: ['automation'],
        imageAlt: 'Relatório gerado automaticamente',
      },
    ],
  },
  resume: {
    experience: {
      title: 'Minha experiência',
      icon: 'bi:briefcase',
      items: [
        { period: '2025 - Atual', title: 'Desenvolvedor de software', place: 'Empresa, Brasília' },
        {
          period: '2024 - 2025',
          title: 'Estagiário de desenvolvimento',
          place: 'Empresa, Brasília',
        },
        {
          period: '2023 - 2024',
          title: 'Monitor de programação',
          place: 'Universidade de Brasília',
        },
        { period: '2022 - 2023', title: 'Projetos acadêmicos', place: 'Universidade de Brasília' },
      ],
    },
    education: {
      title: 'Minha formação',
      icon: 'bi:mortarboard',
      items: [
        {
          period: '2022 - Atual',
          title: 'Graduação em Computação',
          place: 'Universidade de Brasília',
        },
        { period: '2024', title: 'Certificação em segurança', place: 'Instituição certificadora' },
        { period: '2023', title: 'Curso de desenvolvimento web', place: 'Plataforma de ensino' },
        { period: '2021', title: 'Ensino médio', place: 'Escola, Brasília' },
      ],
    },
  },
} satisfies SiteContent;
