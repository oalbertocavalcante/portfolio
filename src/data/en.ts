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
    carouselSlide: '{{index}} of {{slidesLength}}',
    carouselBullet: 'Go to testimonial {{index}}',
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
  services: {
    title: 'My services',
    description:
      'I turn ideas into well-structured, secure software projects that are ready to grow.',
    linkLabel: 'Talk about',
    items: [
      {
        title: 'Web development',
        description: 'Modern, responsive and accessible web applications, from planning to launch.',
      },
      {
        title: 'APIs and back-end',
        description:
          'Robust services and integrations focused on performance, structure and tests.',
      },
      {
        title: 'Application security',
        description: 'Vulnerability analysis and best practices applied to keep your systems safe.',
      },
      {
        title: 'Process automation',
        description: 'Scripts and tools that remove repetitive work and reduce manual errors.',
      },
    ],
  },
  projects: {
    title: 'Recent projects',
    filterLabel: 'Filter projects by category',
    allLabel: 'All',
    linkLabel: 'View repository',
    categories: [
      { id: 'web', label: 'Web' },
      { id: 'api', label: 'APIs' },
      { id: 'security', label: 'Security' },
      { id: 'automation', label: 'Automation' },
    ],
    items: [
      {
        slug: 'personal-portfolio',
        title: 'Personal portfolio',
        summary: 'Bilingual static website focused on performance and accessibility.',
        categories: ['web'],
        imageAlt: 'Home screen of the personal portfolio project',
      },
      {
        slug: 'task-api',
        title: 'Task API',
        summary: 'REST API with authentication, automated tests and documentation.',
        categories: ['api', 'web'],
        imageAlt: 'Task API dashboard',
      },
      {
        slug: 'vulnerability-scanner',
        title: 'Vulnerability scanner',
        summary: 'Command-line tool for auditing web applications.',
        categories: ['security'],
        imageAlt: 'Result of a vulnerability scanner run',
      },
      {
        slug: 'report-automation',
        title: 'Report automation',
        summary: 'Automatic report generation from multiple data sources.',
        categories: ['automation'],
        imageAlt: 'Automatically generated report',
      },
    ],
  },
  resume: {
    experience: {
      title: 'My experience',
      icon: 'bi:briefcase',
      items: [
        { period: '2025 - Present', title: 'Software developer', place: 'Company, Brasília' },
        { period: '2024 - 2025', title: 'Development intern', place: 'Company, Brasília' },
        {
          period: '2023 - 2024',
          title: 'Programming teaching assistant',
          place: 'University of Brasília',
        },
        { period: '2022 - 2023', title: 'Academic projects', place: 'University of Brasília' },
      ],
    },
    education: {
      title: 'My education',
      icon: 'bi:mortarboard',
      items: [
        {
          period: '2022 - Present',
          title: 'Computer Science degree',
          place: 'University of Brasília',
        },
        { period: '2024', title: 'Security certification', place: 'Certification body' },
        { period: '2023', title: 'Web development course', place: 'Learning platform' },
        { period: '2021', title: 'High school', place: 'School, Brasília' },
      ],
    },
  },
  skills: {
    title: 'My skills',
    description: 'Technologies and tools I use every day to build complete solutions.',
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
    title: 'What people say',
    description: 'Feedback from people who have worked with me on projects and teams.',
    items: [],
  },
  faq: {
    eyebrow: 'Frequently asked questions',
    title: 'How can I help?',
    items: [
      {
        question: 'Are you available for new opportunities?',
        answer: [
          'Yes. I am open to job, internship and project opportunities. Use the contact form so we can talk.',
        ],
      },
      {
        question: 'Which technologies do you use the most?',
        answer: [
          'I mainly work with Python, JavaScript and TypeScript, along with automation and infrastructure tools. The skills section has the full list.',
        ],
      },
      {
        question: 'Do you work remotely?',
        answer: [
          'Yes. I have experience with remote and hybrid work, with clear communication and frequent updates.',
        ],
      },
      {
        question: 'How can I get in touch?',
        answer: [
          'Through the form on this page or on LinkedIn. I usually reply within two business days.',
        ],
      },
    ],
  },
} satisfies SiteContent;
