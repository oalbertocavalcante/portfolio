interface TurnstileOptions {
  sitekey: string;
  appearance: 'always' | 'execute' | 'interaction-only';
  theme: 'light' | 'dark' | 'auto';
  language: string;
  size: 'normal' | 'flexible' | 'compact';
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileOptions): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let loader: Promise<TurnstileApi> | null = null;

function loadApi(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.addEventListener('load', () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile indisponível'));
    });
    script.addEventListener('error', () => reject(new Error('Falha ao carregar o Turnstile')));
    document.head.append(script);
  });
  return loader;
}

export interface TurnstileController {
  prepare(): void;
  token(): string;
  failed(): boolean;
  reset(): void;
}

export function createTurnstile(
  container: HTMLElement,
  siteKey: string,
  language: string,
): TurnstileController {
  let widgetId: string | null = null;
  let currentToken = '';
  let hasFailed = false;
  let rendering: Promise<void> | null = null;

  const render = async (): Promise<void> => {
    try {
      const api = await loadApi();
      if (widgetId) api.remove(widgetId);
      widgetId = api.render(container, {
        sitekey: siteKey,
        appearance: 'interaction-only',
        theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
        language,
        size: 'flexible',
        callback: (value) => {
          currentToken = value;
          hasFailed = false;
        },
        'expired-callback': () => {
          currentToken = '';
        },
        'error-callback': () => {
          currentToken = '';
          hasFailed = true;
        },
      });
    } catch {
      hasFailed = true;
    }
  };

  window.addEventListener('theme:change', () => {
    if (widgetId) {
      currentToken = '';
      rendering = render();
    }
  });

  return {
    prepare() {
      rendering ??= render();
    },
    token: () => currentToken,
    failed: () => hasFailed,
    reset() {
      currentToken = '';
      if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
    },
  };
}
