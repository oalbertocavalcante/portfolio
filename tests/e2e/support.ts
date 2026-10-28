import type { Page } from '@playwright/test';

export type Theme = 'dark' | 'light';

export interface PageSetup {
  theme?: Theme;
  reducedMotion?: boolean;
}

export const pages = {
  pt: '',
  en: 'en/',
} as const;

export async function preparePage(page: Page, setup: PageSetup = {}): Promise<string[]> {
  const { theme = 'dark', reducedMotion = true } = setup;
  const problems: string[] = [];

  await page.emulateMedia({ reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
  await page.addInitScript((value) => {
    if (!window.localStorage.getItem('theme')) window.localStorage.setItem('theme', value);
    document.addEventListener('securitypolicyviolation', (event) => {
      console.error(`CSP: ${event.violatedDirective} ${event.blockedURI}`);
    });
  }, theme);

  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text());
  });
  page.on('pageerror', (error) => problems.push(error.message));

  return problems;
}

export async function openPage(page: Page, path: string, setup: PageSetup = {}): Promise<string[]> {
  const problems = await preparePage(page, setup);
  await page.goto(path);
  await page.waitForFunction(() => document.documentElement.classList.contains('is-loaded'));
  return problems;
}

export async function findOverflow(page: Page): Promise<{ page: boolean; elements: string[] }> {
  return page.evaluate(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .filter((element) => {
        if (element.closest('[data-overflow-allowed]')) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > root.clientWidth + 1 || rect.left < -1);
      })
      .slice(0, 10)
      .map((element) => `${element.tagName.toLowerCase()}.${[...element.classList].join('.')}`);
    return { page: root.scrollWidth > root.clientWidth, elements };
  });
}
