# Vue.js Installation and Usage Guide

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Code editor

### Create a Vue Project with create-vue

```bash
npm create vue@latest
cd <project-name>
npm install
npm run dev
```bash

### Quick Start with CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">{{ message }}</div>

<script>
  Vue.createApp({
    data() {
      return { message: 'Hello Vue!' }
    }
  }).mount('#app')
</script>
```bash

## Project Structure

```bash
my-vue-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```bash

## Basic Vue Component

```vue
<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Vue Counter')
const count = ref(0)

const increment = () => count.value++
const decrement = () => count.value--
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```bash

## Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```bash

## Template Syntax

- `{{ }}` - Text interpolation
- `v-bind` - Bind attributes
- `v-if/v-show` - Conditional rendering
- `v-for` - List rendering
- `v-on` or `@` - Event binding
- `v-model` - Two-way binding

## Composition API (Vue 3)

```javascript
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log(`Count changed to ${newVal}`)
})
```bash

## Routing

```bash
npm install vue-router
```bash

## State Management

- **Pinia**: Recommended for Vue 3
- **Vuex**: Legacy state management

## Best Practices

1. Use `<script setup>` syntax
2. Keep components small and focused
3. Use computed properties for derived state
4. Lazy load routes for better performance
5. Use TypeScript for type safety
6. Write unit tests
7. Follow naming conventions

## Debugging

- Vue DevTools browser extension
- VS Code Vue extension
- Chrome DevTools

## Performance Tips

- Code splitting with dynamic imports
- Async components
- Virtual scrolling for large lists
- Lazy loading images
- Tree-shaking unused code
