export type ContentIssue =
  'invisibleCharacters' | 'markup' | 'code' | 'links' | 'repetition' | 'shouting';

const ALLOWED_DOMAINS = new Set(['github.com', 'linkedin.com', 'www.linkedin.com', 'asp.net']);

const INVISIBLE_CHARACTERS = /(?![\t\n\r])[\p{Cc}\p{Cf}]/u;

const MARKUP_PATTERNS = [
  /<\s*\/?\s*[a-z!?][^>]*>/i,
  /&(?:lt|gt|#0*6[02]|#x0*3[ce]);?/i,
  /%3[ce]/i,
  /\\(?:u003[ce]|x3[ce])/i,
  /\b(?:javascript|vbscript|livescript)\s*:/i,
  /\bdata\s*:\s*[a-z]+\/[a-z0-9.+-]+/i,
  /\bon[a-z]{3,}\s*=/i,
  /\bsrcdoc\s*=/i,
];

const CODE_PATTERNS = [
  /\{\{[\s\S]*?\}\}/,
  /\$\{[^}]*\}/,
  /<%[\s\S]*?%>/,
  /\$\([^)]*\)/,
  /`[^`]+`/,
  /(?:^|[;&|]\s*)(?:rm|curl|wget|bash|sh|nc|powershell|cmd|chmod|sudo)\s+-/im,
  /\b(?:union\s+(?:all\s+)?select|drop\s+(?:table|database)|insert\s+into|delete\s+from|truncate\s+table|xp_cmdshell)\b/i,
  /['"]\s*(?:or|and)\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\b(?:eval|exec|system|passthru|shell_exec|base64_decode)\s*\(/i,
  /\.\.\/\.\.\//,
];

const URL_PATTERN = /\b(?:https?|ftp):\/\/\S+|\bwww\.\S+/i;
const DOMAIN_PATTERN =
  /(?<![@\w.-])([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|net|org|io|co|br|ru|cn|xyz|top|info|biz|online|site|shop|click|link|me|ly|tk|ml|ga|cf|gq|app|dev|ai|us|uk|de|fr|es|it|in|ws|cc|pw|live|store|tech|space|fun|win|bid|loan|work))(?![\w-])/gi;

function hasDisallowedLink(text: string): boolean {
  if (URL_PATTERN.test(text)) return true;
  for (const match of text.matchAll(DOMAIN_PATTERN)) {
    const domain = (match[1] ?? '').toLowerCase();
    if (!ALLOWED_DOMAINS.has(domain)) return true;
  }
  return false;
}

function hasShouting(text: string): boolean {
  const letters = text.replace(/[^\p{L}]/gu, '');
  if (letters.length < 30) return false;
  const uppercase = letters.replace(/[^\p{Lu}]/gu, '').length;
  return uppercase / letters.length > 0.8;
}

export function findContentIssue(text: string): ContentIssue | null {
  if (INVISIBLE_CHARACTERS.test(text)) return 'invisibleCharacters';
  if (MARKUP_PATTERNS.some((pattern) => pattern.test(text))) return 'markup';
  if (CODE_PATTERNS.some((pattern) => pattern.test(text))) return 'code';
  if (hasDisallowedLink(text)) return 'links';
  if (/(.)\1{9,}/u.test(text)) return 'repetition';
  if (hasShouting(text)) return 'shouting';
  return null;
}
