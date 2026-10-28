import { expect, test, type Page } from '@playwright/test';
import { openPage, pages } from './support';

async function isDesktopNavigation(page: Page): Promise<boolean> {
  return page.locator('.site-header__menu').isVisible();
}

async function goToSection(page: Page, section: string): Promise<void> {
  if (await isDesktopNavigation(page)) {
    await page.locator(`.site-header__menu a[data-target-section="${section}"]`).click();
    return;
  }
  await page.locator('[data-menu-toggle]').click();
  await page.locator(`.site-header__panel-menu a[data-target-section="${section}"]`).click();
}

test('menu leva até a seção e marca o link ativo', async ({ page }) => {
  await openPage(page, pages.pt);
  await goToSection(page, 'projects');

  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator('#projetos')).toBeInViewport();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.activeSection))
    .toBe('projects');
});

test('menu mobile abre, recebe o foco e fecha com Esc', async ({ page }) => {
  await openPage(page, pages.pt);
  test.skip(await isDesktopNavigation(page), 'menu mobile só existe em telas pequenas');

  const toggle = page.locator('[data-menu-toggle]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.site-header__panel-menu a').first()).toBeFocused();
  await expect(page.locator('main')).toHaveJSProperty('inert', true);

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
});

test('troca de idioma preserva a seção atual', async ({ page }) => {
  await openPage(page, pages.pt);
  await goToSection(page, 'services');
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.activeSection))
    .toBe('services');

  if (!(await page.locator('.site-header__preferences').isVisible())) {
    await page.locator('[data-menu-toggle]').click();
  }
  await page.locator('[data-language-link]:visible').first().click();

  await expect(page).toHaveURL(/\/en\/#services$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('tema escolhido persiste após recarregar', async ({ page }) => {
  await openPage(page, pages.pt, { theme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  if (!(await page.locator('.site-header__preferences').isVisible())) {
    await page.locator('[data-menu-toggle]').click();
  }
  await page.locator('[data-theme-toggle]:visible').first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('link para pular conteúdo leva ao conteúdo principal', async ({ page }) => {
  await openPage(page, pages.pt);
  await page.keyboard.press('Tab');
  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('botão de voltar ao topo aparece ao rolar e retorna ao início', async ({ page }) => {
  await openPage(page, pages.pt);
  const button = page.locator('[data-scroll-top]');
  await expect(button).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(button).toBeVisible();
  await button.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test('preloader conclui com animações ativas', async ({ page }) => {
  await openPage(page, pages.pt, { reducedMotion: false });
  await expect(page.locator('[data-preloader]')).toHaveCount(0);
});

test('endereço inexistente exibe a página 404', async ({ page }) => {
  const response = await page.goto('pagina-inexistente/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Página não encontrada');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
