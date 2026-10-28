import { expect, test } from '@playwright/test';
import { pages } from './support';

const documents = { ...pages, notFound: '404.html' };

for (const [name, path] of Object.entries(documents)) {
  test(`documento ${name} segue as regras de segurança`, async ({ request, baseURL }) => {
    const response = await request.get(path);
    const html = await response.text();
    const origin = new URL(baseURL ?? '').origin;

    const csp = html.match(/http-equiv="content-security-policy" content="([^"]+)"/i)?.[1] ?? '';
    expect(csp, 'CSP presente').not.toBe('');
    for (const directive of ["default-src 'self'", "object-src 'none'", "base-uri 'self'"]) {
      expect(csp).toContain(directive);
    }

    expect(html, 'sem atributos style inline').not.toMatch(/\sstyle="/i);
    expect(html, 'sem manipuladores de evento inline').not.toMatch(/\son[a-z]+="/i);
    expect(html, 'sem campo de arquivo').not.toMatch(/type="file"/i);
    expect(html).toContain('name="referrer" content="strict-origin-when-cross-origin"');

    const scripts = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/gi)].map(
      (match) => match[1] ?? '',
    );
    for (const source of scripts) {
      expect(new URL(source, `${origin}/`).origin, source).toBe(origin);
    }

    const actions = [...html.matchAll(/<form[^>]*\saction="([^"]+)"/gi)].map(
      (match) => match[1] ?? '',
    );
    for (const action of actions) {
      expect(action).toMatch(/^https:\/\/formspree\.io\/f\//);
    }
  });
}
