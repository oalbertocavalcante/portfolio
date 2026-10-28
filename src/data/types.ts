export interface PageMeta {
  title: string;
  description: string;
  jobTitle: string;
}

export interface InterfaceText {
  skipToContent: string;
}

export interface SiteContent {
  meta: PageMeta;
  ui: InterfaceText;
}
