export type FieldName = 'nome' | 'sobrenome' | 'email' | 'telefone' | 'assunto' | 'mensagem';

export type FieldIssue =
  | 'required'
  | 'tooShort'
  | 'tooLong'
  | 'invalidName'
  | 'invalidEmail'
  | 'disposableEmail'
  | 'invalidPhone'
  | 'invalidSubject';

export interface FieldLimits {
  min: number;
  max: number;
}

export const FIELD_LIMITS: Record<FieldName, FieldLimits> = {
  nome: { min: 2, max: 50 },
  sobrenome: { min: 2, max: 60 },
  email: { min: 6, max: 254 },
  telefone: { min: 8, max: 20 },
  assunto: { min: 1, max: 60 },
  mensagem: { min: 20, max: 2000 },
};

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'burnermail.io',
  'dispostable.com',
  'emailondeck.com',
  'fakeinbox.com',
  'getnada.com',
  'guerrillamail.com',
  'mailinator.com',
  'maildrop.cc',
  'mailnesia.com',
  'mintemail.com',
  'moakt.com',
  'mohmal.com',
  'sharklasers.com',
  'tempail.com',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
]);

const NAME_PATTERN = /^\p{L}[\p{L}\p{M}' .-]*$/u;
const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;

export function cleanValue(field: FieldName, raw: string): string {
  const normalized = raw.normalize('NFKC').trim();
  if (field === 'mensagem') return normalized.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n');
  return normalized.replace(/\s+/g, ' ');
}

export function validateField(
  field: FieldName,
  value: string,
  allowedSubjects: ReadonlySet<string>,
): FieldIssue | null {
  const optional = field === 'sobrenome' || field === 'telefone';
  if (!value) return optional ? null : 'required';

  const { min, max } = FIELD_LIMITS[field];
  if (value.length > max) return 'tooLong';
  if (value.length < min) return 'tooShort';

  switch (field) {
    case 'nome':
    case 'sobrenome':
      return NAME_PATTERN.test(value) ? null : 'invalidName';
    case 'email': {
      if (!EMAIL_PATTERN.test(value) || value.includes('..')) return 'invalidEmail';
      const domain = value.split('@')[1]?.toLowerCase() ?? '';
      return DISPOSABLE_DOMAINS.has(domain) ? 'disposableEmail' : null;
    }
    case 'telefone': {
      const digits = value.replace(/\D/g, '').length;
      return PHONE_PATTERN.test(value) && digits >= 8 && digits <= 15 ? null : 'invalidPhone';
    }
    case 'assunto':
      return allowedSubjects.has(value) ? null : 'invalidSubject';
    case 'mensagem':
      return null;
  }
}
