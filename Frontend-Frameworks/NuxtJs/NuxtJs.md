# Nuxt.js Introduction

## Overview

Nuxt.js is a Vue-based meta-framework for building universal, statically generated, or single-page applications with strong defaults.

## Key Features

- File-system routing
- Server-side rendering (SSR) and static-site generation (SSG)
- Hybrid rendering per route with Nitro
- Built-in data fetching (`asyncData`, `useAsyncData`)
- TypeScript support out of the box
- Modules ecosystem (Auth, Content, Image)

## Common Use Cases

- SEO-friendly marketing sites
- Content-driven apps with headless CMS
- Hybrid dashboards with selective SSR/SPA

## Resources

- Docs: <https://nuxt.com/docs>
- Modules: <https://nuxt.com/modules>
- Nitro: <https://nitro.unjs.io>

---

# Nuxt.js Usage Guide

## Install

```bash
npm create nuxt-app@latest my-nuxt
# or
npx nuxi init my-nuxt
cd my-nuxt
npm install
```bash

## Run

```bash
npm run dev
```bash

Default: <http://localhost:3000>

## Pages and Routing

- Add files in `pages/`: `pages/index.vue`, `pages/about.vue`
- Dynamic routes: `pages/blog/[slug].vue`

## Data Fetching

```vue
<script setup>
const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))
</script>
```bash

## API Routes

- Create server endpoints under `server/api/hello.ts`:

```ts
export default defineEventHandler(() => ({ message: 'Hello Nuxt' }))
```bash

## Build Targets

- Static: `npm run generate`
- SSR: `npm run build` then `npm run start`

## Styling

- Add global styles in `assets/`
- Use Tailwind via `npm install -D @nuxtjs/tailwindcss` then add to `nuxt.config.ts`

## Testing

- Component tests: Vitest + Vue Test Utils
- End-to-end: Playwright or Cypress
