const ALLOWED_EXTERNAL_HOSTS = ['github.com', 'www.linkedin.com', 'linkedin.com'];

export function assertAllowedExternalUrl(value: string, context: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`URL inválida em ${context}: ${value}`);
  }
  if (url.protocol !== 'https:' || !ALLOWED_EXTERNAL_HOSTS.includes(url.hostname)) {
    throw new Error(`Link externo não permitido em ${context}: ${value}`);
  }
  return url.href;
}
