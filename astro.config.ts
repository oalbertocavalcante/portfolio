import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site';

export default defineConfig({
  site: siteConfig.url,
  base: siteConfig.base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
