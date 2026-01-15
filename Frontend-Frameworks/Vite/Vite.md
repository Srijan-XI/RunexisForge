# Vite — Introduction

## What is Vite?

Vite is a modern front-end build tool that provides a fast dev server and optimized production builds. It’s widely used with frameworks like React, Vue, and Svelte.

## Why Vite?

- Very fast dev server (native ESM)
- Great TypeScript support
- Solid production builds

## Learning Path

1. Create a project with `npm create vite@latest`.
2. Run the dev server.
3. Learn build output and environment variables.
4. Add testing (often with Vitest).

---

# Vite User Guide

## Create a project

```bash
npm create vite@latest
cd your-project
npm install
npm run dev
```bash

## Build

```bash
npm run build
npm run preview
```bash

## Environment variables

- `.env` files are supported.
- Only variables prefixed with `VITE_` are exposed to the client by default.

## Config

See `Vite/examples/vite.config.ts` for a minimal config example.
