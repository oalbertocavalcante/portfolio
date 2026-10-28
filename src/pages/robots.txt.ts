import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, site);
  const rules = siteConfig.indexable ? 'Allow: /' : 'Disallow: /';
  return new Response(`User-agent: *\n${rules}\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
