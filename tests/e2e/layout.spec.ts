import { expect, test } from '@playwright/test';
import { findOverflow, openPage, pages, type Theme } from './support';

const viewports = [
  { name: 'celular 320', width: 320, height: 568 },
  { name: 'celular 360', width: 360, height: 800 },
  { name: 'celular 375', width: 375, height: 667 },
  { name: 'celular 390', width: 390, height: 844 },
  { name: 'celular 412', width: 412, height: 915 },
  { name: 'celular 430', width: 430, height: 932 },
  { name: 'tablet 768', width: 768, height: 1024 },
  { name: 'tablet 820', width: 820, height: 1180 },
  { name: 'tablet 1024 retrato', width: 1024, height: 1366 },
  { name: 'tablet 1024 paisagem', width: 1024, height: 768 },
  { name: 'notebook 1280', width: 1280, height: 800 },
  { name: 'notebook 1366', width: 1366, height: 768 },
  { name: 'notebook 1440', width: 1440, height: 900 },
  { name: 'desktop 1920', width: 1920, height: 1080 },
  { name: 'desktop 2560', width: 2560, height: 1440 },
];

const themes: Theme[] = ['dark', 'light'];

for (const [locale, path] of Object.entries(pages)) {
  for (const theme of themes) {
    test.describe(`layout ${locale} ${theme}`, () => {
      for (const viewport of viewports) {
        test(viewport.name, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          const problems = await openPage(page, path, { theme });
          const overflow = await findOverflow(page);

          expect(overflow.page, 'a página não pode rolar na horizontal').toBe(false);
          expect(overflow.elements, 'elementos fora da área visível').toEqual([]);
          expect(problems, 'erros no console ou violações de CSP').toEqual([]);
        });
      }
    });
  }
}
