import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { findContentIssue } from '../../src/scripts/contact/content-guard.ts';

const zeroWidthSpace = String.fromCodePoint(0x200b);
const rightToLeftOverride = String.fromCodePoint(0x202e);

describe('findContentIssue', () => {
  it('aceita mensagens comuns com acentos e quebras de linha', () => {
    assert.equal(
      findContentIssue('Olá! Trabalho com Node.js e ASP.NET.\nPodemos conversar amanhã?'),
      null,
    );
  });

  it('aceita menções ao GitHub e ao LinkedIn', () => {
    assert.equal(findContentIssue('Vi seu perfil no github.com e no linkedin.com'), null);
  });

  const cases: [string, string, string][] = [
    ['caracteres invisíveis', `texto${zeroWidthSpace}oculto`, 'invisibleCharacters'],
    ['controle bidirecional', `texto${rightToLeftOverride}invertido`, 'invisibleCharacters'],
    ['tag HTML', '<script>alert(1)</script>', 'markup'],
    ['entidade HTML', '&lt;img&gt;', 'markup'],
    ['esquema javascript', 'javascript:alert(1)', 'markup'],
    ['atributo de evento', 'img onerror=alert(1)', 'markup'],
    ['template', '{{ 7 * 7 }}', 'code'],
    ['interpolação', '${process.env}', 'code'],
    ['SQL', "' OR 1=1 --", 'code'],
    ['URL', 'acesse https://exemplo.com', 'links'],
    ['domínio solto', 'promocao.xyz', 'links'],
    ['repetição', 'aaaaaaaaaaaa', 'repetition'],
    ['maiúsculas', 'ESTA MENSAGEM INTEIRA ESTA EM LETRAS MAIUSCULAS', 'shouting'],
  ];

  for (const [name, input, expected] of cases) {
    it(`detecta ${name}`, () => {
      assert.equal(findContentIssue(input), expected);
    });
  }
});
