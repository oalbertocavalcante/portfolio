import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config/site';

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
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
        "connect-src 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-src 'none'",
        'upgrade-insecure-requests',
      ],
    },
  },
});
