import moderation from '@/data/moderation-terms.json';
import { buildPhrases, normalizeForModeration, tokenize } from './normalize';

const HASH_LENGTH = 16;
const blockedHashes = new Set<string>(moderation.hashes);
const encoder = new TextEncoder();

async function hash(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, HASH_LENGTH);
}

export async function containsBlockedTerms(...values: string[]): Promise<boolean> {
  if (!globalThis.crypto?.subtle) return false;
  const phrases = new Set<string>();
  values.forEach((value) => {
    buildPhrases(tokenize(normalizeForModeration(value)), moderation.maxWords).forEach((phrase) =>
      phrases.add(phrase),
    );
  });
  for (const phrase of phrases) {
    if (blockedHashes.has(await hash(phrase))) return true;
  }
  return false;
}
