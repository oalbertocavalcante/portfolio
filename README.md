# Portfólio de Alberto Cavalcante

Site pessoal bilíngue (português e inglês) que apresenta experiência, projetos, habilidades e formas de contato. É gerado de forma estática com Astro e publicado no GitHub Pages.

![Astro](https://img.shields.io/badge/Astro-7.4-BC52EE?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?logo=nodedotjs&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-custom%20properties-663399?logo=css&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.64-2EAD33?logo=playwright&logoColor=white)
![axe-core](https://img.shields.io/badge/axe--core-4.14-663399)
![Prettier](https://img.shields.io/badge/Prettier-3.9-F7B93E?logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-hospedagem-222222?logo=githubpages&logoColor=white)
![Formspree](https://img.shields.io/badge/Formspree-formul%C3%A1rio-E5122E?logo=formspree&logoColor=white)

![Prévia do site](docs/preview.gif)

## Funcionalidades

- Conteúdo em português (`/`) e inglês (`/en/`), com troca de idioma que mantém a seção atual.
- Tema escuro por padrão e tema claro opcional, lembrado entre visitas e aplicado antes da primeira pintura.
- Seções de apresentação, destaques, serviços, projetos com filtro, experiência e formação, habilidades, depoimentos, perguntas frequentes, chamada final e contato.
- Seções sem conteúdo deixam de ser renderizadas e saem do menu automaticamente.
- Páginas de detalhes de projeto geradas a partir dos dados (`/projetos/<slug>/` e `/en/projects/<slug>/`).
- Botão para baixar o currículo no idioma da página.
- Formulário de contato com várias camadas contra spam, robôs e conteúdo malicioso.
- Layout responsivo de 320 px a 2560 px, sem rolagem horizontal da página.
- Animações que respeitam a preferência de movimento reduzido do sistema.
- SEO com URL canônica, `hreflang`, Open Graph, dados estruturados e sitemap.

## Tecnologias

| Área       | Ferramentas                                                           |
| ---------- | --------------------------------------------------------------------- |
| Framework  | Astro 7 com geração estática e roteamento i18n                        |
| Linguagem  | TypeScript no modo mais estrito                                       |
| Estilos    | CSS com tokens de design, sem frameworks de CSS                       |
| Tipografia | Sora e Russo One, servidas pelo próprio site via Fontsource           |
| Ícones     | Iconify com Bootstrap Icons e Devicon, renderizados como SVG no build |
| Interação  | Lenis (rolagem suave) e Swiper (carrossel de depoimentos)             |
| Formulário | Formspree, com Cloudflare Turnstile opcional                          |
| Testes     | Executor de testes nativo do Node, Playwright e axe-core              |
| Qualidade  | `astro check`, Prettier e EditorConfig                                |
| Entrega    | GitHub Actions e GitHub Pages                                         |

## Requisitos

- Node.js 24 (a versão está em `.nvmrc`)
- npm

## Como executar

```bash
npm ci
npm run dev
```

O site fica disponível em `http://localhost:4321/portfolio/`.

Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Scripts

| Comando                                | Descrição                                           |
| -------------------------------------- | --------------------------------------------------- |
| `npm run dev`                          | Servidor de desenvolvimento                         |
| `npm run build`                        | Verificação de tipos e build de produção em `dist/` |
| `npm run preview`                      | Servidor local para o conteúdo de `dist/`           |
| `npm run check`                        | Verificação de tipos do projeto                     |
| `npm run format`                       | Formatação do código com Prettier                   |
| `npm run format:check`                 | Verificação da formatação                           |
| `npm run test:unit`                    | Testes unitários das regras do formulário           |
| `npm run test:e2e`                     | Testes de ponta a ponta no navegador                |
| `npm test`                             | Testes unitários e de ponta a ponta                 |
| `npm run moderation:hash -- <arquivo>` | Gera os hashes da lista de moderação                |
| `npm run record:preview`               | Gera novamente o GIF de prévia deste README         |

Antes da primeira execução dos testes de ponta a ponta, instale o navegador:

```bash
npx playwright install chromium
```

Os testes de ponta a ponta usam o build de `dist/`, então rode `npm run build` antes deles.

## Configuração

As informações gerais ficam em `src/config/site.ts`. Um campo vazio esconde o elemento correspondente no site.

| Campo                               | Uso                                                     |
| ----------------------------------- | ------------------------------------------------------- |
| `url` e `base`                      | Endereço público e caminho base do site                 |
| `indexable`                         | Libera a indexação por buscadores quando `true`         |
| `owner.name`                        | Nome exibido no site e nos metadados                    |
| `contact.email` e `contact.phone`   | Contatos exibidos na seção de contato                   |
| `contact.formEndpoint`              | Endpoint do formulário no Formspree                     |
| `contact.turnstileSiteKey`          | Chave pública do Cloudflare Turnstile                   |
| `social.linkedin` e `social.github` | Perfis exibidos na apresentação e na seção de contato   |
| `resume.pt` e `resume.en`           | Caminho do currículo de cada idioma dentro de `public/` |

### Currículo

Coloque os arquivos em `public/cv/` e informe os caminhos:

```ts
resume: {
  pt: 'cv/curriculo-alberto-cavalcante.pdf',
  en: 'cv/resume-alberto-cavalcante.pdf',
},
```

### Domínio próprio

1. Crie o arquivo `public/CNAME` contendo apenas o domínio.
2. Em `src/config/site.ts`, altere `url` para o novo endereço e `base` para `''`.
3. Configure o domínio nas opções do GitHub Pages do repositório.

### Links externos

Por segurança, o build aceita apenas links externos em HTTPS para GitHub e LinkedIn. Qualquer outro endereço interrompe o build com uma mensagem de erro.

## Conteúdo

- Os textos de cada idioma ficam em `src/data/pt.ts` e `src/data/en.ts`, que seguem o tipo `SiteContent` de `src/data/types.ts`. O build falha se faltar algum campo em um dos idiomas.
- As imagens ficam em `src/assets/images/` e são registradas em `src/data/media.ts`. O Astro gera versões otimizadas em WebP com os tamanhos adequados.
- Um projeto com o campo `details` ganha uma página própria. Os dois idiomas precisam ter os mesmos projetos com detalhes.
- Os ícones de habilidades usam os nomes do Iconify, como `devicon:python` ou `devicon-plain:linux`. Ícones muito pesados interrompem o build com a sugestão da variante monocromática.

## Formulário de contato

O envio é feito ao Formspree por `fetch`, apenas com os campos permitidos, e não existe campo de arquivo. Antes do envio, o navegador aplica estas camadas:

- validação de tamanho e formato de cada campo e normalização Unicode;
- bloqueio de HTML, scripts, URLs, injeção de SQL, de template e de comandos, caracteres invisíveis, repetições e texto todo em maiúsculas;
- moderação de ofensas, ameaças e spam, comparando hashes SHA-256, para que a lista de termos não fique pública no repositório;
- campo armadilha para robôs, tempo mínimo de preenchimento, exigência de interação real e limite de envios por período;
- Cloudflare Turnstile, carregado apenas quando `turnstileSiteKey` estiver preenchido.

As regras do navegador podem ser contornadas por quem envia dados direto ao endpoint. Por isso, configure também no painel do Formspree:

- a restrição de domínio para o endereço do site;
- a chave secreta do Turnstile, na seção de CAPTCHA do formulário.

### Lista de moderação

A lista em texto puro deve ficar fora do repositório, com um termo por linha. Para atualizar os hashes:

```bash
npm run moderation:hash -- caminho/para/termos.txt
```

O resultado é gravado em `src/data/moderation-terms.json`.

## Segurança

- Política de segurança de conteúdo (CSP) com hashes para scripts e estilos, sem `eval` e sem scripts de terceiros além do Turnstile, quando configurado.
- Origens do Formspree e do Turnstile liberadas na CSP somente quando configuradas.
- Links externos com `rel="noopener noreferrer"` e lista de domínios permitidos verificada no build.
- Fontes, ícones e bibliotecas servidos pelo próprio site, sem CDN.

## Testes

- **Unitários**: normalização de texto, regras dos campos e bloqueio de conteúdo do formulário.
- **Layout**: ausência de rolagem horizontal em 15 larguras de tela, nos dois idiomas e nos dois temas.
- **Navegação**: menu, item ativo, menu mobile, troca de idioma, persistência do tema, voltar ao topo e página 404.
- **Interações**: filtro de projetos, perguntas frequentes, contadores e serviços.
- **Formulário**: validações, bloqueios, campo armadilha, envio com sucesso, limite de reenvio e falha do servidor, com o Formspree simulado.
- **Acessibilidade**: análise com axe-core sem violações sérias ou críticas.
- **Links e segurança**: links e imagens válidos, sitemap e robots publicados, CSP presente, ausência de estilos e manipuladores de evento inline e nenhum erro de console ou violação da CSP.

## Publicação

O workflow `.github/workflows/deploy.yml` roda a cada push e pull request na branch `main`. Ele verifica a formatação, gera o build e executa todos os testes. Nos pushes, publica o resultado no GitHub Pages.

## Estrutura

```text
.
├── .github/workflows/     Integração e publicação contínuas
├── docs/                  Prévia animada usada neste README
├── public/                Arquivos servidos sem processamento
├── scripts/               Geração dos hashes de moderação e da prévia
├── src/
│   ├── assets/images/     Foto e imagens dos projetos
│   ├── components/
│   │   ├── contact/       Formulário e dados de contato
│   │   ├── layout/        Cabeçalho, rodapé, preloader e controles globais
│   │   ├── pages/         Composição das páginas
│   │   ├── sections/      Seções da página inicial
│   │   └── ui/            Componentes reutilizáveis
│   ├── config/            Configuração geral do site
│   ├── data/              Conteúdo de cada idioma e tipos
│   ├── i18n/              Idiomas, rotas e caminhos
│   ├── layouts/           Estrutura base do HTML
│   ├── lib/               Ícones e validação de links
│   ├── pages/             Rotas do site
│   ├── scripts/           Comportamentos no navegador
│   └── styles/            Tokens, base, botões e animações
└── tests/
    ├── e2e/               Testes de ponta a ponta
    └── unit/              Testes unitários
```
