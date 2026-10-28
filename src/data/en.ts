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
  callToAction: {
    eyebrow: "Let's build something together",
    title: 'Ready to bring your next idea to life?',
    contactLabel: "Let's talk",
    resumeLabel: 'Download resume',
    projectsLabel: 'View projects',
  },
  contact: {
    title: "Let's work together!",
    description:
      'Tell me a little about the opportunity or project. I will reply as soon as possible.',
    form: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone number',
      subject: 'Subject',
      message: 'Message',
      required: 'required',
      optional: 'optional',
      submit: 'Send message',
      privacyNote: 'Your data is only used to reply to this message.',
      subjects: [
        { id: 'job', label: 'Job opportunity' },
        { id: 'internship', label: 'Internship opportunity' },
        { id: 'project', label: 'Project or service' },
        { id: 'partnership', label: 'Partnership' },
        { id: 'other', label: 'Something else' },
      ],
    },
    info: {
      label: 'Contact information',
      locationLabel: 'Location',
      location: 'Brasília, DF - Brazil',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
    },
    messages: {
      required: 'Please fill in this field.',
      tooShort: 'Use at least {min} characters.',
      tooLong: 'Use at most {max} characters.',
      invalidName: 'Use only letters, spaces, hyphens or apostrophes.',
      invalidEmail: 'Enter a valid email address.',
      disposableEmail: 'Please use a permanent email address.',
      invalidPhone: 'Enter a valid phone number, including the area code.',
      invalidSubject: 'Choose a subject from the list.',
      invisibleCharacters: 'The text contains invisible characters. Please type the message again.',
      markup: 'Please remove HTML tags or markup from the message.',
      code: 'Please remove code snippets or commands from the message.',
      links: 'For security reasons, please do not send links. Describe the content in text.',
      repetition: 'Avoid repeating the same character many times.',
      shouting: 'Avoid writing the whole message in capital letters.',
      blockedLanguage: 'The message contains terms that are not allowed. Please review the text.',
      fixErrors: 'Please review the highlighted fields before sending.',
      tooFast: 'For security reasons, wait a few seconds and send again.',
      verificationFailed: 'The submission could not be verified. Reload the page and try again.',
      rateLimited: 'You have sent messages recently. Please try again in a few minutes.',
      captchaPending: 'Please complete the security check and send again.',
      captchaFailed: 'The security check failed. Reload the page and try again.',
      sending: 'Sending your message...',
      success: 'Message sent successfully! I will get back to you soon.',
      failure: 'The message could not be sent right now. Try again later or reach me on LinkedIn.',
      networkFailure: 'Connection error. Check your internet connection and try again.',
      topicTemplate: 'Hi! I would like to talk about {topic}.',
      emailSubject: 'Portfolio contact',
    },
  },
  footer: {
    navigationLabel: 'Footer navigation',
    rights: 'All rights reserved.',
  },
  notFound: {
    title: 'Page not found',
    description:
      'The page you are looking for does not exist or has been moved. Go back to the home page to keep browsing.',
    action: 'Back to home',
  },
} satisfies SiteContent;
