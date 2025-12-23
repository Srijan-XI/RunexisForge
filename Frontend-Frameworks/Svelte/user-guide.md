# Svelte Installation and Usage Guide

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Code editor (VS Code recommended)

### Create a Svelte Project with Vite
```bash
npm create vite@latest my-app -- --template svelte
cd my-app
npm install
npm run dev
```

### Create a SvelteKit Project (Full-Stack)
```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

## Project Structure
```
my-app/
├── node_modules/
├── src/
│   ├── App.svelte
│   ├── main.js
│   └── components/
├── public/
├── package.json
└── vite.config.js
```

## Basic Svelte Component
```svelte
<script>
  let count = 0;

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }
</script>

<main>
  <h1>Counter</h1>
  <p>Count: {count}</p>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  button {
    margin: 5px;
    padding: 8px 16px;
    cursor: pointer;
  }
</style>
```

## Reactivity
```svelte
<script>
  let count = 0;
  let doubled; // Will automatically update

  $: doubled = count * 2; // Reactive statement

  $: console.log(`count is now ${count}`);
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button on:click={() => count++}>Increment</button>
```

## Props (Props Passing)
```svelte
<script>
  export let name;
  export let age = 0; // Default value
</script>

<p>Name: {name}, Age: {age}</p>
```

## Event Dispatching
```svelte
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('custom-event', { detail: 'Hello!' });
  }
</script>

<button on:click={handleClick}>Send Event</button>
```

## Directives
```svelte
<!-- Event Binding -->
<button on:click={handleClick}>Click me</button>

<!-- Two-way Binding -->
<input bind:value={name} />
<input type="checkbox" bind:checked={agreed} />

<!-- Class Binding -->
<div class:active={isActive}>Content</div>

<!-- Style Binding -->
<div style:color={color}>Text</div>

<!-- Conditional Rendering -->
{#if condition}
  <p>Condition is true</p>
{:else}
  <p>Condition is false</p>
{/if}

<!-- Lists -->
{#each items as item (item.id)}
  <p>{item.name}</p>
{/each}
```

## Stores
```javascript
// store.js
import { writable } from 'svelte/store';

export const count = writable(0);
export const user = writable({ name: 'John' });
```

```svelte
<!-- Using Store -->
<script>
  import { count } from './store.js';
</script>

<p>Count: {$count}</p>
<button on:click={() => $count++}>Increment</button>
```

## Animations & Transitions
```svelte
<script>
  import { fade, slide } from 'svelte/transition';
  let visible = true;
</script>

<button on:click={() => visible = !visible}>Toggle</button>

{#if visible}
  <div transition:fade={{ duration: 300 }}>
    Content with fade effect
  </div>

  <div transition:slide={{ duration: 300 }}>
    Content with slide effect
  </div>
{/if}
```

## Common Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

## Lifecycle Hooks
```svelte
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';

  onMount(() => {
    console.log('Component mounted');
  });

  onDestroy(() => {
    console.log('Component destroyed');
  });
</script>
```

## Best Practices
1. Keep components small and focused
2. Use stores for shared state
3. Leverage reactive statements with `$:`
4. Use type checking with TypeScript
5. Scope styles to components
6. Use animations for better UX
7. Lazy load components with SvelteKit
8. Write tests with Vitest

## Debugging
- Svelte DevTools browser extension
- Chrome DevTools
- VS Code Svelte extension

## Performance Tips
- Minimal runtime overhead
- No virtual DOM reconciliation
- Smaller bundle sizes by default
- Lazy loading with SvelteKit
- Code splitting automatically handled
