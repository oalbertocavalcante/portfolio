import type { ContactMessages } from '@/data/types';
import { createBotGuard } from './bot-guard';
import { findContentIssue } from './content-guard';
import {
  cleanValue,
  FIELD_LIMITS,
  validateField,
  type FieldIssue,
  type FieldName,
} from './field-rules';
import { containsBlockedTerms } from './moderation';
import { createTurnstile, type TurnstileController } from './turnstile';

const FIELDS: FieldName[] = ['nome', 'sobrenome', 'email', 'telefone', 'assunto', 'mensagem'];
const TEXT_FIELDS: FieldName[] = ['nome', 'sobrenome', 'mensagem'];
const REQUEST_TIMEOUT = 15000;

type FieldControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type StatusTone = 'info' | 'success' | 'error';

function parseMessages(raw: string | undefined): ContactMessages | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ContactMessages;
  } catch {
    return null;
  }
}

function setupForm(form: HTMLFormElement): void {
  const messages = parseMessages(form.dataset.messages);
  const endpoint = form.dataset.endpoint;
  if (!messages || !endpoint) return;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]');
  const trap = form.querySelector<HTMLInputElement>('[data-form-trap]');
  const subjectSelect = form.querySelector<HTMLSelectElement>('select[name="assunto"]');
  const turnstileContainer = form.querySelector<HTMLElement>('[data-turnstile]');
  const botGuard = createBotGuard(form);
  const subjects = new Map(
    Array.from(subjectSelect?.options ?? [])
      .filter((option) => option.value)
      .map((option) => [option.value, option.textContent?.trim() ?? option.value]),
  );
  const allowedSubjects = new Set(subjects.keys());

  let turnstile: TurnstileController | null = null;
  const siteKey = turnstileContainer?.dataset.sitekey;
  if (turnstileContainer && siteKey) {
    turnstile = createTurnstile(turnstileContainer, siteKey, form.dataset.language ?? 'en');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          turnstile?.prepare();
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(form);
    form.addEventListener('focusin', () => turnstile?.prepare(), { once: true });
  }

  let attempted = false;
  let sending = false;

  const control = (name: FieldName): FieldControl | null =>
    form.querySelector<FieldControl>(`[name="${name}"]`);

  const describe = (issue: FieldIssue | string, field?: FieldName): string => {
    const template = messages[issue as keyof ContactMessages] ?? messages.fixErrors;
    if (!field) return template;
    const { min, max } = FIELD_LIMITS[field];
    return template.replace('{min}', String(min)).replace('{max}', String(max));
  };

  const showFieldError = (field: FieldName, text: string | null): void => {
    const input = control(field);
    const error = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    if (!input || !error) return;
    input.setAttribute('aria-invalid', String(Boolean(text)));
    error.textContent = text ?? '';
    error.hidden = !text;
  };

  const setStatus = (tone: StatusTone | null, text = ''): void => {
    if (!status) return;
    status.textContent = text;
    status.dataset.tone = tone ?? '';
    status.hidden = !text;
  };

  const setBusy = (busy: boolean): void => {
    sending = busy;
    form.setAttribute('aria-busy', String(busy));
    if (submit) submit.disabled = busy;
  };

  const readValues = (): Record<FieldName, string> =>
    Object.fromEntries(
      FIELDS.map((field) => [field, cleanValue(field, control(field)?.value ?? '')]),
    ) as Record<FieldName, string>;

  const problemFor = (field: FieldName, value: string): FieldIssue | string | null => {
    const issue = validateField(field, value, allowedSubjects);
    if (issue) return issue;
    return TEXT_FIELDS.includes(field) ? findContentIssue(value) : null;
  };

  const validate = (values: Record<FieldName, string>): FieldName | null => {
    let firstInvalid: FieldName | null = null;
    for (const field of FIELDS) {
      const problem = problemFor(field, values[field]);
      showFieldError(field, problem ? describe(problem, field) : null);
      if (problem && !firstInvalid) firstInvalid = field;
    }
    return firstInvalid;
  };

  const focusField = (field: FieldName): void => {
    control(field)?.focus();
  };

  const resetForm = (): void => {
    form.reset();
    FIELDS.forEach((field) => showFieldError(field, null));
    attempted = false;
    turnstile?.reset();
  };

  form.addEventListener('input', (event) => {
    if (!attempted) return;
    const target = event.target as FieldControl;
    const field = target.name as FieldName;
    if (!FIELDS.includes(field)) return;
    const problem = problemFor(field, cleanValue(field, target.value));
    showFieldError(field, problem ? describe(problem, field) : null);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    attempted = true;
    setStatus(null);

    const verdict = botGuard.evaluate(trap?.value ?? '');
    if (verdict === 'trap') {
      resetForm();
      setStatus('success', messages.success);
      return;
    }

    const values = readValues();
    const firstInvalid = validate(values);
    if (firstInvalid) {
      setStatus('error', messages.fixErrors);
      focusField(firstInvalid);
      return;
    }

    if (await containsBlockedTerms(values.nome, values.sobrenome, values.mensagem)) {
      showFieldError('mensagem', messages.blockedLanguage);
      setStatus('error', messages.fixErrors);
      focusField('mensagem');
      return;
    }

    if (verdict !== 'ok') {
      const verdictMessages: Record<Exclude<typeof verdict, 'ok' | 'trap'>, string> = {
        tooFast: messages.tooFast,
        noInteraction: messages.verificationFailed,
        rateLimited: messages.rateLimited,
      };
      setStatus('error', verdictMessages[verdict]);
      return;
    }

    let token = '';
    if (turnstile) {
      turnstile.prepare();
      token = turnstile.token();
      if (!token) {
        setStatus('error', turnstile.failed() ? messages.captchaFailed : messages.captchaPending);
        return;
      }
    }

    const subjectLabel = subjects.get(values.assunto) ?? values.assunto;
    const payload: Record<string, string> = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      telefone: values.telefone,
      assunto: subjectLabel,
      mensagem: values.mensagem,
      idioma: form.dataset.language ?? '',
      _subject: `${messages.emailSubject}: ${subjectLabel}`,
    };
    if (token) payload['cf-turnstile-response'] = token;

    setBusy(true);
    setStatus('info', messages.sending);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });
      if (response.ok) {
        botGuard.recordSubmission();
        resetForm();
        setStatus('success', messages.success);
      } else {
        turnstile?.reset();
        setStatus('error', messages.failure);
      }
    } catch {
      turnstile?.reset();
      setStatus('error', messages.networkFailure);
    } finally {
      setBusy(false);
    }
  });

  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLElement>('[data-contact-subject]');
    if (!link || !subjectSelect) return;
    const subject = link.dataset.contactSubject;
    if (subject && allowedSubjects.has(subject)) subjectSelect.value = subject;
    const topic = link.dataset.contactTopic;
    const message = control('mensagem');
    if (topic && message && !message.value.trim()) {
      message.value = messages.topicTemplate.replace('{topic}', topic);
    }
  });
}

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(setupForm);
