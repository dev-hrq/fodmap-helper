# FODMAP Helper

SPA em Vue 3 para consulta rápida de alimentos com foco em Síndrome do Intestino Irritável (SII) e intolerância à lactose.

O projeto é um MVP de uso pessoal e informativo. Ele usa uma base local em JSON e não substitui orientação médica ou nutricional.

## Stack

- Vue 3
- Vite
- TypeScript
- CSS simples
- Dados locais em `src/data/foods.json`

## Funcionalidades

- Busca local por nome em português ou inglês.
- Busca ignorando maiúsculas/minúsculas, acentos e espaços extras.
- Filtro por categoria.
- Cards com:
  - nome do alimento
  - categoria
  - badge de risco/incômodo
  - recomendação prática
  - observação
  - informação de lactose quando existir
  - alternativas melhores da mesma categoria quando existirem
- Estado amigável para alimento não encontrado.
- Lista de categorias disponíveis.
- Botão para voltar ao topo.
- Layout responsivo para desktop, notebook, tablet e celular.
- Rodapé com fontes, crédito do autor e aviso de site em construção.

## Fora de escopo

Esta versão não possui:

- backend
- login
- cadastro
- banco de dados
- API remota
- histórico alimentar
- scanner de código de barras
- autenticação ou sessão de usuário

## Rodando localmente

Instale as dependências:

```sh
npm install
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Acesse:

```txt
http://127.0.0.1:5173/
```

Se a porta `5173` estiver ocupada, o Vite pode abrir outra porta.

## Build de produção

Para validar antes do deploy:

```sh
npm run build
```

O build gera os arquivos estáticos em:

```txt
dist/
```

## Deploy na Vercel

1. Publique este repositório no GitHub.
2. Acesse a Vercel e clique em `Add New Project`.
3. Importe o repositório `dev-hrq/fodmap-helper`.
4. Use as configurações padrão para Vite:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Não é necessário configurar variáveis de ambiente.
6. Clique em `Deploy`.

Como a aplicação usa apenas arquivos estáticos e `foods.json` local, ela pode ser publicada diretamente na Vercel sem backend.

## Deploy na Netlify

Também é possível publicar na Netlify:

1. Crie um novo site a partir do repositório.
2. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Nenhuma variável de ambiente é necessária.

## Base de dados

A base inicial fica em:

```txt
src/data/foods.json
```

Novos alimentos podem ser adicionados seguindo o formato atual por categorias:

- `highFodmapFoods`
- `lowFodmapAlternatives`

Cada item pode conter:

- `nameEn`
- `namePt`
- `riskLevel`
- `recommendation`
- `containsLactose`
- `notes`

## Autor

Desenvolvido por Paulo Henrique de Souza.

Repositório: [dev-hrq/fodmap-helper](https://github.com/dev-hrq/fodmap-helper)

Site em constante construção.
