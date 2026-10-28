import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  collapseRepeatedLetters,
  normalizeForModeration,
  tokenize,
} from '../src/scripts/contact/normalize.ts';

const HASH_LENGTH = 16;
const OUTPUT = path.resolve(import.meta.dirname, '../src/data/moderation-terms.json');

const source = process.argv[2];
if (!source) {
  console.error('Uso: node scripts/hash-moderation-terms.ts <arquivo-com-um-termo-por-linha>');
  process.exit(1);
}

function hash(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex').slice(0, HASH_LENGTH);
}

const lines = (await readFile(path.resolve(source), 'utf8')).split(/\r?\n/);
const hashes = new Set<string>();
let maxWords = 1;

for (const line of lines) {
  const normalized = normalizeForModeration(line);
  if (!normalized) continue;
  maxWords = Math.max(maxWords, tokenize(normalized).length);
  hashes.add(hash(normalized));
  hashes.add(hash(collapseRepeatedLetters(normalized)));
}

const output = { maxWords, hashes: [...hashes].sort() };
await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`${hashes.size} hashes gerados em ${path.relative(process.cwd(), OUTPUT)}`);
