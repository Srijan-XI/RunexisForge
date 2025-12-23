# Nuxt.js Usage Guide

## Install
```bash
npm create nuxt-app@latest my-nuxt
# or
npx nuxi init my-nuxt
cd my-nuxt
npm install
```

## Run
```bash
npm run dev
```
Default: http://localhost:3000

## Pages and Routing
- Add files in `pages/`: `pages/index.vue`, `pages/about.vue`
- Dynamic routes: `pages/blog/[slug].vue`

## Data Fetching
```vue
<script setup>
const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))
</script>
```

## API Routes
- Create server endpoints under `server/api/hello.ts`:
```ts
export default defineEventHandler(() => ({ message: 'Hello Nuxt' }))
```

## Build Targets
- Static: `npm run generate`
- SSR: `npm run build` then `npm run start`

## Styling
- Add global styles in `assets/`
- Use Tailwind via `npm install -D @nuxtjs/tailwindcss` then add to `nuxt.config.ts`

## Testing
- Component tests: Vitest + Vue Test Utils
- End-to-end: Playwright or Cypress
