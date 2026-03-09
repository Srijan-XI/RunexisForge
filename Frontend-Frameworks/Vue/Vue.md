# Vue.js Introduction

## Overview

Vue is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable, allowing developers to use as little or as much as needed—from enhancing static HTML to full Single Page Applications.

## Key Features

- **Reactive Data Binding**: Two-way data binding for synchronization
- **Component System**: Reusable, maintainable component architecture
- **Simple Syntax**: Easy to learn with a gentle learning curve
- **Directives**: Built-in directives like v-if, v-for, v-bind
- **Composition API**: Modern approach to organize and reuse logic
- **Excellent DevTools**: Vue DevTools for debugging

## Core Concepts

1. **Templates**: HTML-based templates with Vue-specific syntax
2. **Data**: Reactive state management
3. **Methods**: Functions to handle events and logic
4. **Computed Properties**: Cached derived state
5. **Watchers**: React to state changes
6. **Directives**: Special attributes for DOM manipulation
7. **Components**: Encapsulated UI elements

## Vue 3 vs Vue 2

- **Vue 3**: Composition API, TypeScript support, better performance
- **Vue 2**: Options API, established ecosystem

## Common Use Cases

- Single Page Applications (SPAs)
- Progressive enhancement
- Real-time dashboards
- Interactive user interfaces
- Component libraries

## Prerequisites

- JavaScript fundamentals
- HTML/CSS knowledge
- Understanding of modern JavaScript (ES6+)

## Advantages

- Low learning curve
- Excellent documentation
- Small bundle size
- High performance
- Flexible and progressive approach

## Resources

- Official Documentation: <https://vuejs.org>
- Vue 3 Guide: <https://vuejs.org/guide/>
- Vue Router: <https://router.vuejs.org>
- Pinia State Management: <https://pinia.vuejs.org>

---

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
