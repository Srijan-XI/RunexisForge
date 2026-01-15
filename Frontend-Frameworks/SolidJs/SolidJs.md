# SolidJs

## Introduction

## Overview

SolidJS is a declarative, reactive JavaScript library focused on fine-grained reactivity with zero virtual DOM.

## Key Features

- Signal-based reactivity for minimal updates
- JSX syntax compatible with React mental model
- Small bundle size and high performance
- Works with Vite and SSR options

## Common Use Cases

- Highly interactive web apps needing performance
- Widgets and micro-frontends
- SSR or islands architectures

## Resources

- Docs: <https://www.solidjs.com/docs>
- Examples: <https://www.solidjs.com/examples>

---

# SolidJS Usage Guide

## Create a Project

```bash
npm create solid@latest my-solid
cd my-solid
npm install
npm run dev
```bash

Default: <http://localhost:5173>

## Basics

```tsx
import { createSignal } from "solid-js";

function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  );
}
```bash

## Routing

- Add `@solidjs/router`:

```bash
npm install @solidjs/router
```bash

Create `App.tsx` with `<Routes>` and `<Route>` components.

## State Management

- Signals, memos, resources for async data
- Context API for shared state across components

## Build

```bash
npm run build
npm run preview
```bash

## SSR/Islands

- Use `solid-start` for full-stack SSR
- Adapters for Node, Vercel, Netlify available

## Testing

- Vitest + @testing-library/solid
