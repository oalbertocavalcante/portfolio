export interface PageMeta {
  title: string;
  description: string;
  jobTitle: string;
}

export interface InterfaceText {
  skipToContent: string;
  loading: string;
  backToTop: string;
}

export interface SiteContent {
  meta: PageMeta;
  ui: InterfaceText;
}
