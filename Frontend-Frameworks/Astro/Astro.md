# Astro

## Introduction

## Overview

Astro is a content-focused web framework that delivers static-first sites with zero-JS by default and islands architecture for interactive components.

## Key Features

- Partial hydration (islands) with React, Vue, Svelte, or Solid
- Markdown/MDX and content collections
- Static-site generation and server rendering options
- Fast builds with Vite
- Simple routing via `src/pages`

## Common Use Cases

- Blogs, docs, marketing sites
- Hybrid sites with isolated interactive widgets

## Resources

- Docs: <https://docs.astro.build>
- Integrations: <https://astro.build/integrations>

---

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
