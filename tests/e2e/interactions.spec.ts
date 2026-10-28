import { expect, test } from '@playwright/test';
import { openPage, pages } from './support';

test('filtro de projetos exibe apenas a categoria escolhida', async ({ page }) => {
  await openPage(page, pages.pt);
  const visibleCards = page.locator('[data-project-item]:not(.is-filtered-out)');
  const total = await page.locator('[data-project-item]').count();
  await expect(visibleCards).toHaveCount(total);

  await page.locator('[data-filter="security"]').click();
  await expect(page.locator('[data-filter="security"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleCards).toHaveCount(1);
  await expect(page.locator('[data-project-item].is-filtered-out').first()).toHaveJSProperty(
    'inert',
    true,
  );

  await page.locator('[data-filter="*"]').click();
  await expect(visibleCards).toHaveCount(total);
});

test('perguntas frequentes mantêm apenas uma resposta aberta', async ({ page }) => {
  await openPage(page, pages.pt);
  const items = page.locator('.faq-item');
  await expect(items.nth(0)).toHaveAttribute('open', '');

  await items.nth(2).locator('summary').click();
  await expect(items.nth(2)).toHaveAttribute('open', '');
  await expect(items.nth(0)).not.toHaveAttribute('open', '');

  await items.nth(1).locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(items.nth(1)).toHaveAttribute('open', '');
  await expect(items.nth(2)).not.toHaveAttribute('open', '');
});

test('contadores exibem os valores finais', async ({ page }) => {
  await openPage(page, pages.pt);
  const counters = page.locator('[data-stat-counter]');
  const count = await counters.count();
  expect(count).toBeGreaterThan(0);
  await expect(page.locator('[data-stat-counter].is-counted')).toHaveCount(count);
});

test('serviço destacado acompanha o mouse', async ({ page, isMobile }) => {
  test.skip(isMobile, 'interação de hover exclusiva de telas com mouse');
  await openPage(page, pages.pt);
  const items = page.locator('[data-service-item]');
  await items.nth(2).hover();
  await expect(items.nth(2)).toHaveClass(/is-current/);
  await expect(items.nth(0)).not.toHaveClass(/is-current/);
});

test('link de serviço preenche o assunto e a mensagem do contato', async ({ page }) => {
  await openPage(page, pages.pt);
  const link = page.locator('.service-item__link').nth(1);
  const topic = await link.getAttribute('data-contact-topic');
  await link.click();

  await expect(page).toHaveURL(/#contato$/);
  await expect(page.locator('select[name="assunto"]')).toHaveValue('project');
  await expect(page.locator('textarea[name="mensagem"]')).toHaveValue(new RegExp(topic ?? ''));
});
