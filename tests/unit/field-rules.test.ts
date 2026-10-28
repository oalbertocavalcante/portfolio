import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { cleanValue, validateField } from '../../src/scripts/contact/field-rules.ts';

const subjects = new Set(['job', 'project']);

describe('validateField', () => {
  it('exige os campos obrigatórios', () => {
    assert.equal(validateField('nome', '', subjects), 'required');
    assert.equal(validateField('email', '', subjects), 'required');
    assert.equal(validateField('mensagem', '', subjects), 'required');
  });

  it('permite sobrenome e telefone vazios', () => {
    assert.equal(validateField('sobrenome', '', subjects), null);
    assert.equal(validateField('telefone', '', subjects), null);
  });

  it('valida nomes com acentos e apóstrofos', () => {
    assert.equal(validateField('nome', "João D'Ávila", subjects), null);
    assert.equal(validateField('nome', 'Maria123', subjects), 'invalidName');
  });

  it('valida e-mails e bloqueia domínios descartáveis', () => {
    assert.equal(validateField('email', 'pessoa@empresa.com.br', subjects), null);
    assert.equal(validateField('email', 'pessoa@', subjects), 'invalidEmail');
    assert.equal(validateField('email', 'pessoa..x@empresa.com', subjects), 'invalidEmail');
    assert.equal(validateField('email', 'pessoa@yopmail.com', subjects), 'disposableEmail');
  });

  it('valida telefones com DDD', () => {
    assert.equal(validateField('telefone', '+55 (61) 99999-0000', subjects), null);
    assert.equal(validateField('telefone', '123', subjects), 'tooShort');
    assert.equal(validateField('telefone', 'abc-def-ghij', subjects), 'invalidPhone');
  });

  it('aceita apenas assuntos conhecidos', () => {
    assert.equal(validateField('assunto', 'job', subjects), null);
    assert.equal(validateField('assunto', 'outro', subjects), 'invalidSubject');
  });

  it('aplica limites de tamanho da mensagem', () => {
    assert.equal(validateField('mensagem', 'curta', subjects), 'tooShort');
    assert.equal(validateField('mensagem', 'a'.repeat(2001), subjects), 'tooLong');
  });
});

describe('cleanValue', () => {
  it('normaliza espaços em campos de linha única', () => {
    assert.equal(cleanValue('nome', '  Maria   Clara  '), 'Maria Clara');
  });

  it('preserva parágrafos e limita linhas em branco na mensagem', () => {
    assert.equal(cleanValue('mensagem', 'Linha 1\r\n\r\n\r\n\r\nLinha 2'), 'Linha 1\n\nLinha 2');
  });
});
