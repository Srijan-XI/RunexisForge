# Svelte

## Introduction

## Overview

Svelte is a JavaScript framework that shifts much of the work into the compile step, resulting in smaller bundle sizes and faster applications. It compiles components at build time into vanilla JavaScript, offering a unique approach to web development.

## Key Features

- **Compiler-First Approach**: Compiles to optimized JavaScript at build time
- **Small Bundle Size**: Minimal runtime overhead, excellent for performance
- **Reactive Syntax**: Simple, intuitive reactivity with minimal boilerplate
- **Scoped Styles**: CSS is scoped to components by default
- **No Virtual DOM**: Direct DOM manipulation for better performance
- **Animations & Transitions**: Built-in motion handling
- **Stores**: Simple state management solution

## Core Concepts

1. **Components**: `.svelte` files containing markup, logic, and styles
2. **Reactivity**: Simple assignment triggers reactivity (no hooks needed)
3. **Directives**: Built-in directives like `on:`, `bind:`, `let:`
4. **Stores**: Global state management
5. **Animations**: Smooth transitions and animations
6. **Lifecycle**: Component lifecycle hooks
7. **Props**: Pass data to components

## Unique Advantages

- Smallest bundle size among major frameworks
- Fastest initial load time
- Easiest syntax to learn
- True encapsulation with scoped styles
- No virtual DOM overhead
- Compile-time optimization

## Common Use Cases

- High-performance web applications
- Interactive dashboards
- Real-time applications
- Mobile web apps
- Embedded widgets
- Progressive enhancement

## Prerequisites

- JavaScript fundamentals
- HTML/CSS knowledge
- Understanding of modern JavaScript (ES6+)
- Familiarity with component-based architecture

## SvelteKit

- Full-stack framework built on Svelte
- Routing and server-side rendering
- API routes
- Database integration

## Resources

- Official Documentation: <https://svelte.dev>
- SvelteKit: <https://kit.svelte.dev>
- Svelte Tutorial: <https://svelte.dev/tutorial>
- Community: <https://discord.gg/yy75DKs>

---

## User Guide

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
```bash

### Create a SvelteKit Project (Full-Stack)

```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```bash

## Project Structure

```bash
my-app/
├── node_modules/
├── src/
│   ├── App.svelte
│   ├── main.js
│   └── components/
├── public/
├── package.json
└── vite.config.js
```bash

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
```bash

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
```bash

## Props (Props Passing)

```svelte
<script>
  export let name;
  export let age = 0; // Default value
</script>

<p>Name: {name}, Age: {age}</p>
```bash

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
```bash

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
```bash

## Stores

```javascript
// store.js
import { writable } from 'svelte/store';

export const count = writable(0);
export const user = writable({ name: 'John' });
```bash

```svelte
<!-- Using Store -->
<script>
  import { count } from './store.js';
</script>

<p>Count: {$count}</p>
<button on:click={() => $count++}>Increment</button>
```bash

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
```bash

## Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```bash

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
```bash

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
