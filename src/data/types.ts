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
  carouselSlide: string;
  carouselBullet: string;
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

export interface SkillItem {
  name: string;
  icon: IconName;
  level: number;
}

export interface SkillsContent extends SectionIntro {
  items: SkillItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

export interface TestimonialsContent extends SectionIntro {
  items: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string[];
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export interface CallToActionContent {
  eyebrow: string;
  title: string;
  contactLabel: string;
  resumeLabel: string;
  projectsLabel: string;
}

export interface ContactSubject {
  id: string;
  label: string;
}

export interface ContactFormText {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  required: string;
  optional: string;
  submit: string;
  privacyNote: string;
  subjects: ContactSubject[];
}

export interface ContactInfoText {
  label: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  phoneLabel: string;
}

export interface ContactMessages {
  required: string;
  tooShort: string;
  tooLong: string;
  invalidName: string;
  invalidEmail: string;
  disposableEmail: string;
  invalidPhone: string;
  invalidSubject: string;
  invisibleCharacters: string;
  markup: string;
  code: string;
  links: string;
  repetition: string;
  shouting: string;
  blockedLanguage: string;
  fixErrors: string;
  tooFast: string;
  verificationFailed: string;
  rateLimited: string;
  captchaPending: string;
  captchaFailed: string;
  sending: string;
  success: string;
  failure: string;
  networkFailure: string;
  topicTemplate: string;
  emailSubject: string;
}

export interface ContactContent extends SectionIntro {
  form: ContactFormText;
  info: ContactInfoText;
  messages: ContactMessages;
}

export interface FooterContent {
  navigationLabel: string;
  rights: string;
}

export interface NotFoundContent {
  title: string;
  description: string;
  action: string;
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
  skills: SkillsContent;
  testimonials: TestimonialsContent;
  faq: FaqContent;
  callToAction: CallToActionContent;
  contact: ContactContent;
  footer: FooterContent;
  notFound: NotFoundContent;
}
