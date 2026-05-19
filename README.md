# FODMAP Helper

SPA local para consultar uma base simples de alimentos e visualizar uma indicacao inicial de risco FODMAP por porcao.

## Stack

- Vue 3
- Vite
- TypeScript

## Funcionalidades desta versao

- Busca local por nome, categoria, porcao, grupo FODMAP, observacoes e aliases.
- Normalizacao de texto para ignorar diferencas de acentos, caixa e espacos nas buscas.
- Cards de resultado com categoria, porcao, grupos FODMAP, observacoes e badge de risco.
- Interface responsiva para desktop e mobile.

## Fora de escopo nesta versao

- Backend
- Login
- Banco de dados
- API remota
- Historico alimentar
- Scanner de codigo de barras

## Como validar

```sh
npm install
npm run dev
npm run build
```

Com o servidor de desenvolvimento rodando, acesse `http://127.0.0.1:5173/`.
