# TechNews

Site de notícias de tecnologia, desenvolvido como projeto acadêmico da disciplina de Desenvolvimento Front-end. É uma Single Page Application (SPA) construída com HTML, CSS e JavaScript puro (sem frameworks), aplicando Design System, CSS Grid, Flexbox, responsividade, roteamento por hash, templates dinâmicos, validação de formulário e persistência com `localStorage`.

## Estrutura de pastas

```text
projetoOng/
├── html/
│   ├── index.html       (página principal, onde a SPA roda)
│   ├── projetos.html     (versão estática antiga, fora de uso pelo menu)
│   └── cadastro.html     (versão estática antiga, fora de uso pelo menu)
│
├── css/
│   └── style.css         (Design System e estilos globais)
│
├── imagens/
│   └── ...                (imagens das notícias)
│
└── js/
    ├── script.js          (arquivo principal: importa e inicia os módulos)
    ├── dados.js            (listas de notícias e categorias)
    ├── cards.js            (monta os cards com Template Literals)
    ├── roteador.js         (navegação da SPA por hash)
    ├── menu.js             (menu hambúrguer e dropdown)
    ├── feedback.js         (modal e toast)
    ├── validacao.js        (regras de validação do formulário)
    ├── mascaras.js         (máscaras de CPF, telefone e CEP)
    ├── armazenamento.js    (rascunho do formulário no localStorage)
    └── formulario.js       (integra validação, rascunho e envio)
```

O `index.html` é a única página que a SPA usa: o conteúdo de Início, Categorias e Cadastro é injetado dinamicamente dentro dela. Os arquivos `projetos.html` e `cadastro.html` são versões antigas, de antes da SPA, mantidas no repositório mas sem link ativo no menu.

## Como instalar e executar (desenvolvimento)

Para editar o projeto sem passar pelo build, ele precisa apenas de um servidor local, porque o `js/script.js` é carregado como módulo ES (`import`/`export`), e o navegador bloqueia módulos quando o arquivo é aberto direto (`file:///...`).

1. Clone o repositório:
   ```bash
   git clone https://github.com/kauanfelixsilva/technews.git
   ```
2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server**, se ainda não tiver.
4. Clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.
5. O site abre em um endereço como `http://127.0.0.1:5500/html/index.html`.

Se o site abrir com a tela vazia mostrando "Carregando...", significa que ele foi aberto sem servidor (com duplo clique no arquivo). Repita o passo 4.

## Build de produção

O projeto usa o **Vite** como bundler, para minificar CSS, JavaScript e HTML antes do deploy. Requer [Node.js](https://nodejs.org/) instalado.

```bash
npm install       # instala o Vite (só na primeira vez)
npm run build     # gera a pasta dist/, com os arquivos minificados
npm run preview   # serve a pasta dist/ localmente, para conferir o resultado
```

A configuração fica em `vite.config.js`. A pasta `dist/` não é versionada (está no `.gitignore`): ela é gerada de novo a cada build, inclusive no serviço de deploy.

## Funcionalidades

- **SPA com roteamento por hash** (`#/`, `#/categorias`, `#/cadastro`), sem recarregar a página.
- **Templates dinâmicos:** as páginas usam `<template>` do HTML5, e os cards de notícias e categorias são gerados por JavaScript com Template Literals.
- **Design System:** variáveis CSS para cores, tipografia e espaçamentos, com CSS Grid de 12 colunas, Flexbox e 5 breakpoints de responsividade.
- **Componentes de feedback:** badge, alerta, modal e toast.
- **Formulário de cadastro** com validação em JavaScript (nome, e-mail, data de nascimento, telefone, CPF com dígito verificador, CEP, cidade e estado), mensagens de erro acessíveis (`aria-invalid`, `aria-describedby`, `role="alert"`) e rascunho salvo no `localStorage`.
- **Biblioteca externa Day.js**, carregada por CDN, usada para validar a data de nascimento.

## Versionamento

O projeto segue o modelo **GitFlow**:

- `main`: versões de lançamento, marcadas com tags de Versionamento Semântico (ex.: `v1.0.0`).
- `develop`: integração do código em desenvolvimento.
- `feature/*`: uma branch por funcionalidade, mesclada em `develop`.
- `release/*`: prepara uma versão antes de ir para `main`.

Os commits seguem o padrão de **Conventional Commits** (`feat:`, `chore:`, `docs:`, `fix:`).

## Manutenção

- Para adicionar ou alterar uma notícia ou categoria, edite as listas em `js/dados.js`. Os cards são gerados automaticamente a partir delas.
- Para adicionar uma nova página à SPA, crie um `<template>` no `index.html` e uma nova rota em `js/roteador.js`.
- Para alterar uma regra de validação do formulário, edite `js/validacao.js`.
- Para mudar o Design System (cores, tipografia, espaçamentos), edite as variáveis em `:root` no `css/style.css`.

## Autor

Kauan — projeto acadêmico da disciplina de Desenvolvimento Front-end.
