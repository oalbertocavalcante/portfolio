const STORAGE_KEY = 'contact-submissions';
const MIN_FILL_TIME = 3000;
const WINDOW = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 2;
const MIN_INTERVAL = 60 * 1000;

export type BotVerdict = 'ok' | 'trap' | 'tooFast' | 'noInteraction' | 'rateLimited';

function readHistory(): number[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter((item): item is number => typeof item === 'number')
      : [];
  } catch {
    return [];
  }
}

function writeHistory(history: number[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    return;
  }
}

export function createBotGuard(form: HTMLFormElement) {
  let firstInteraction = 0;
  let trustedInteraction = false;

  const markInteraction = (event: Event): void => {
    if (!event.isTrusted) return;
    trustedInteraction = true;
    if (!firstInteraction) firstInteraction = Date.now();
  };

  ['keydown', 'pointerdown', 'input', 'paste'].forEach((type) =>
    form.addEventListener(type, markInteraction, { passive: true }),
  );

  return {
    evaluate(trapValue: string): BotVerdict {
      if (trapValue) return 'trap';
      if (!trustedInteraction) return 'noInteraction';
      if (Date.now() - firstInteraction < MIN_FILL_TIME) return 'tooFast';
      const now = Date.now();
      const recent = readHistory().filter((time) => now - time < WINDOW);
      const last = recent.at(-1);
      if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW || (last && now - last < MIN_INTERVAL)) {
        return 'rateLimited';
      }
      return 'ok';
    },
    recordSubmission(): void {
      const now = Date.now();
      writeHistory([...readHistory().filter((time) => now - time < WINDOW), now]);
    },
  };
}
