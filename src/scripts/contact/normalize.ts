const LEET_SUBSTITUTIONS: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '8': 'b',
  '@': 'a',
  $: 's',
};

const LEET_PATTERN = /(?<=\p{L})[0134578@$]|[0134578@$](?=\p{L})/gu;

export function normalizeForModeration(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(LEET_PATTERN, (character) => LEET_SUBSTITUTIONS[character] ?? character)
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function collapseRepeatedLetters(value: string): string {
  return value.replace(/([a-z])\1+/g, '$1');
}

export function tokenize(normalized: string): string[] {
  return normalized ? normalized.split(' ') : [];
}

export function buildPhrases(tokens: string[], maxWords: number): Set<string> {
  const phrases = new Set<string>();
  for (let size = 1; size <= maxWords; size += 1) {
    for (let start = 0; start + size <= tokens.length; start += 1) {
      const phrase = tokens.slice(start, start + size).join(' ');
      phrases.add(phrase);
      phrases.add(collapseRepeatedLetters(phrase));
    }
  }
  return phrases;
}
