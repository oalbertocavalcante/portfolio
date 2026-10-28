import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildPhrases,
  collapseRepeatedLetters,
  normalizeForModeration,
  tokenize,
} from '../../src/scripts/contact/normalize.ts';

describe('normalizeForModeration', () => {
  it('remove acentos, pontuação e caixa alta', () => {
    assert.equal(normalizeForModeration('Olá, Ação!'), 'ola acao');
  });

  it('converte substituições numéricas apenas dentro de palavras', () => {
    assert.equal(normalizeForModeration('1d10t4'), 'idiota');
    assert.equal(normalizeForModeration('ano 2025'), 'ano');
  });
});

describe('collapseRepeatedLetters', () => {
  it('reduz letras repetidas', () => {
    assert.equal(collapseRepeatedLetters('ooooi'), 'oi');
  });
});

describe('buildPhrases', () => {
  it('gera combinações de até N palavras', () => {
    const phrases = buildPhrases(tokenize('vai embora agora'), 2);
    assert.ok(phrases.has('vai embora'));
    assert.ok(phrases.has('embora agora'));
    assert.ok(!phrases.has('vai embora agora'));
  });
});
