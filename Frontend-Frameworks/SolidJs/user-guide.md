# SolidJS Usage Guide

## Create a Project
```bash
npm create solid@latest my-solid
cd my-solid
npm install
npm run dev
```
Default: http://localhost:5173

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
```

## Routing
- Add `@solidjs/router`:
```bash
npm install @solidjs/router
```
Create `App.tsx` with `<Routes>` and `<Route>` components.

## State Management
- Signals, memos, resources for async data
- Context API for shared state across components

## Build
```bash
npm run build
npm run preview
```

## SSR/Islands
- Use `solid-start` for full-stack SSR
- Adapters for Node, Vercel, Netlify available

## Testing
- Vitest + @testing-library/solid
