import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openPage, pages, type Theme } from './support';

const themes: Theme[] = ['dark', 'light'];
const severe = new Set(['serious', 'critical']);

for (const [locale, path] of Object.entries(pages)) {
  for (const theme of themes) {
    test(`acessibilidade ${locale} ${theme}`, async ({ page }) => {
      await openPage(page, path, { theme });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .exclude('[data-turnstile]')
        .analyze();

      const violations = results.violations
        .filter((violation) => severe.has(violation.impact ?? ''))
        .map((violation) => ({
          rule: violation.id,
          targets: violation.nodes.map((node) => node.target.join(' ')),
        }));

      expect(violations).toEqual([]);
    });
  }
}
