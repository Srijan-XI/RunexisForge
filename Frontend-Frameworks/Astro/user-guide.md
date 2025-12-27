# Astro Usage Guide

## Create a Project

```bash
npm create astro@latest my-astro
cd my-astro
npm install
npm run dev
```bash

Default: <http://localhost:4321>

## Routing

- Pages live in `src/pages`
- `src/pages/index.astro` → `/`
- `src/pages/blog/[slug].astro` for dynamic routes

## Components

```astro
---
const { title } = Astro.props;
---
<h1>{title}</h1>
```bash

Add React/Vue/Svelte/Solid components with `client:load` or `client:idle` directives for hydration.

## Data Fetching

- Static content collections via `src/content/config.ts`
- Fetch at build time inside frontmatter `---` blocks

## Build

```bash
npm run build
npm run preview
```bash

## Deploy

- Static hosting (Netlify, Vercel, GitHub Pages) or SSR adapters (`@astrojs/node`, `@astrojs/vercel`, etc.)

## Styling

- Use CSS, Sass, Tailwind, or CSS-in-JS via integrations

## Markdown/MDX

- Place posts under `src/content/`
- Configure collections for typing and schema validation
