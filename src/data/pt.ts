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
    carouselSlide: '{{index}} de {{slidesLength}}',
    carouselBullet: 'Ir para o depoimento {{index}}',
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
  skills: {
    title: 'Minhas habilidades',
    description:
      'Tecnologias e ferramentas que uso no dia a dia para construir soluções completas.',
    items: [
      { name: 'Python', icon: 'devicon:python', level: 90 },
      { name: 'JavaScript', icon: 'devicon:javascript', level: 85 },
      { name: 'TypeScript', icon: 'devicon:typescript', level: 80 },
      { name: 'React', icon: 'devicon:react', level: 75 },
      { name: 'Docker', icon: 'devicon:docker', level: 70 },
      { name: 'Linux', icon: 'devicon:linux', level: 85 },
    ],
  },
  testimonials: {
    title: 'O que dizem sobre mim',
    description: 'Relatos de quem já trabalhou comigo em projetos e equipes.',
    items: [],
  },
  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Como posso ajudar?',
    items: [
      {
        question: 'Você está disponível para novas oportunidades?',
        answer: [
          'Sim. Estou aberto a oportunidades de emprego, estágio e projetos pontuais. Use o formulário de contato para conversarmos.',
        ],
      },
      {
        question: 'Quais tecnologias você mais utiliza?',
        answer: [
          'Trabalho principalmente com Python, JavaScript e TypeScript, além de ferramentas de automação e infraestrutura. A seção de habilidades traz a lista completa.',
        ],
      },
      {
        question: 'Você trabalha de forma remota?',
        answer: [
          'Sim. Tenho experiência com trabalho remoto e híbrido, com comunicação clara e acompanhamento frequente.',
        ],
      },
      {
        question: 'Como posso entrar em contato?',
        answer: [
          'Pelo formulário desta página ou pelo LinkedIn. Costumo responder em até dois dias úteis.',
        ],
      },
    ],
  },
  callToAction: {
    eyebrow: 'Vamos construir algo juntos',
    title: 'Pronto para tirar a sua próxima ideia do papel?',
    contactLabel: 'Fale comigo',
    resumeLabel: 'Baixar currículo',
    projectsLabel: 'Ver projetos',
  },
  contact: {
    title: 'Vamos trabalhar juntos!',
    description:
      'Conte um pouco sobre a oportunidade ou o projeto. Respondo o mais rápido possível.',
    form: {
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'Endereço de e-mail',
      phone: 'Telefone',
      subject: 'Assunto',
      message: 'Mensagem',
      required: 'obrigatório',
      optional: 'opcional',
      submit: 'Enviar mensagem',
      privacyNote: 'Seus dados são usados apenas para responder a esta mensagem.',
      subjects: [
        { id: 'job', label: 'Oportunidade de emprego' },
        { id: 'internship', label: 'Oportunidade de estágio' },
        { id: 'project', label: 'Projeto ou serviço' },
        { id: 'partnership', label: 'Parceria' },
        { id: 'other', label: 'Outro assunto' },
      ],
    },
    info: {
      label: 'Informações de contato',
      locationLabel: 'Localização',
      location: 'Brasília, DF - Brasil',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefone',
    },
    messages: {
      required: 'Preencha este campo.',
      tooShort: 'Use pelo menos {min} caracteres.',
      tooLong: 'Use no máximo {max} caracteres.',
      invalidName: 'Use apenas letras, espaços, hífen ou apóstrofo.',
      invalidEmail: 'Informe um endereço de e-mail válido.',
      disposableEmail: 'Use um endereço de e-mail permanente.',
      invalidPhone: 'Informe um telefone válido, com DDD.',
      invalidSubject: 'Selecione um assunto da lista.',
      invisibleCharacters: 'O texto contém caracteres invisíveis. Digite a mensagem novamente.',
      markup: 'Remova tags HTML ou marcações da mensagem.',
      code: 'Remova trechos de código ou comandos da mensagem.',
      links: 'Por segurança, não envie links. Descreva o conteúdo em texto.',
      repetition: 'Evite repetir o mesmo caractere muitas vezes.',
      shouting: 'Evite escrever a mensagem toda em letras maiúsculas.',
      blockedLanguage: 'A mensagem contém termos não permitidos. Revise o texto.',
      fixErrors: 'Revise os campos destacados antes de enviar.',
      tooFast: 'Por segurança, aguarde alguns segundos e envie novamente.',
      verificationFailed: 'Não foi possível validar o envio. Recarregue a página e tente de novo.',
      rateLimited: 'Você já enviou mensagens recentemente. Tente novamente em alguns minutos.',
      captchaPending: 'Conclua a verificação de segurança e envie novamente.',
      captchaFailed: 'A verificação de segurança falhou. Recarregue a página e tente de novo.',
      sending: 'Enviando sua mensagem...',
      success: 'Mensagem enviada com sucesso! Retorno em breve.',
      failure:
        'Não foi possível enviar agora. Tente novamente mais tarde ou fale comigo pelo LinkedIn.',
      networkFailure: 'Falha de conexão. Verifique sua internet e tente novamente.',
      topicTemplate: 'Olá! Gostaria de conversar sobre {topic}.',
      emailSubject: 'Contato pelo portfólio',
    },
  },
  footer: {
    navigationLabel: 'Navegação do rodapé',
    rights: 'Todos os direitos reservados.',
  },
  notFound: {
    title: 'Página não encontrada',
    description:
      'O endereço que você acessou não existe ou foi movido. Volte para a página inicial para continuar navegando.',
    action: 'Voltar ao início',
  },
} satisfies SiteContent;
