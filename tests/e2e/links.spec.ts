import { expect, test } from '@playwright/test';
import { openPage, pages } from './support';

const ALLOWED_EXTERNAL_HOSTS = new Set(['github.com', 'www.linkedin.com', 'linkedin.com']);

for (const [locale, path] of Object.entries(pages)) {
  test(`links e imagens válidos ${locale}`, async ({ page, request, baseURL }) => {
    await openPage(page, path);
    const origin = new URL(baseURL ?? '').origin;

    const anchors = await page.locator('a[href]').evaluateAll((elements) =>
      elements.map((element) => ({
        href: (element as HTMLAnchorElement).href,
        target: element.getAttribute('target'),
        rel: element.getAttribute('rel') ?? '',
      })),
    );

    const internal = new Set<string>();
    for (const anchor of anchors) {
      const url = new URL(anchor.href);
      if (url.protocol === 'mailto:' || url.protocol === 'tel:') continue;
      if (url.origin === origin) {
        internal.add(url.href.split('#')[0] ?? url.href);
        continue;
      }
      expect(url.protocol, anchor.href).toBe('https:');
      expect(
        ALLOWED_EXTERNAL_HOSTS.has(url.hostname),
        `link externo não permitido: ${anchor.href}`,
      ).toBe(true);
    }

    for (const anchor of anchors.filter((item) => item.target === '_blank')) {
      expect(anchor.rel, anchor.href).toContain('noopener');
      expect(anchor.rel, anchor.href).toContain('noreferrer');
    }

    for (const url of internal) {
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
    }

    const images = await page
      .locator('img')
      .evaluateAll((elements) =>
        elements.map(
          (element) =>
            (element as HTMLImageElement).currentSrc || (element as HTMLImageElement).src,
        ),
      );
    for (const source of images) {
      const response = await request.get(source);
      expect(response.status(), source).toBe(200);
    }
  });
}

test('sitemap e robots publicados', async ({ request }) => {
  const sitemap = await request.get('sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
  const robots = await request.get('robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap:');
});
