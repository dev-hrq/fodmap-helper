# FODMAP Helper

SPA local para consultar uma base simples de alimentos e visualizar uma indicacao inicial de risco FODMAP por porcao.

## Stack

- Vue 3
- Vite
- TypeScript

## Funcionalidades desta versao

- Busca local por nome em portugues ou ingles, categoria, recomendacao e observacoes.
- Normalizacao de texto para ignorar diferencas de acentos, caixa e espacos nas buscas.
- Cards de resultado com classificacao FODMAP, nivel de incomodo, lactose, recomendacao pratica e observacoes.
- Sugestao de alternativas melhores da mesma categoria quando existirem.
- Mensagem clara quando a busca nao encontra nenhum alimento.
- Interface responsiva para desktop e mobile.

## Fora de escopo nesta versao

- Backend
- Login
- Banco de dados
- API remota
- Historico alimentar
- Scanner de codigo de barras

## Como usar localmente

```sh
npm install
npm run dev
```

Com o servidor de desenvolvimento rodando, acesse `http://127.0.0.1:5173/`.

Digite o nome de um alimento no campo de busca, como `leite`, `cebola`, `frango`, `maca` ou `pao`. A lista e filtrada automaticamente pela base local categorizada em `src/data/foods.json`.

## Como validar

```sh
npm run build
```

## Deploy na Vercel

1. Publique o repositorio no GitHub, GitLab ou Bitbucket.
2. Na Vercel, crie um novo projeto e selecione este repositorio.
3. Mantenha as configuracoes padrao para Vite:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em Deploy.

Como a aplicacao usa apenas dados locais e nao depende de variaveis de ambiente, nenhum backend ou configuracao extra e necessario.

## Deploy na Netlify

1. Publique o repositorio no GitHub, GitLab ou Bitbucket.
2. Na Netlify, crie um novo site a partir deste repositorio.
3. Use as configuracoes:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Clique em Deploy site.

Nenhuma variavel de ambiente e necessaria para esta versao.
