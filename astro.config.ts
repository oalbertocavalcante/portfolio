import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site';

const TURNSTILE_ORIGIN = 'https://challenges.cloudflare.com';
const formOrigin = siteConfig.contact.formEndpoint
  ? new URL(siteConfig.contact.formEndpoint).origin
  : '';
const turnstileEnabled = Boolean(siteConfig.contact.turnstileSiteKey);

const sources = (...values: string[]): string => values.filter(Boolean).join(' ');

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  markdown: {
    syntaxHighlight: false,
  },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
          en: 'en',
        },
      },
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        `connect-src ${sources("'self'", formOrigin)}`,
        `form-action ${sources("'self'", formOrigin)}`,
        `frame-src ${turnstileEnabled ? TURNSTILE_ORIGIN : "'none'"}`,
        "object-src 'none'",
        "base-uri 'self'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: turnstileEnabled ? ["'self'", TURNSTILE_ORIGIN] : ["'self'"],
      },
    },
  },
});
