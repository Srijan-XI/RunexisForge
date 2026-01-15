# Alpine.js - Lightweight JavaScript Framework

## Table of Contents
- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Installation & Setup](#installation--setup)
- [Directives](#directives)
- [State Management](#state-management)
- [Components](#components)
- [Events & Actions](#events--actions)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)
- [Integration Patterns](#integration-patterns)

---

## Introduction

### What is Alpine.js?

Alpine.js is a rugged, minimal framework for composing JavaScript behavior in your markup. It offers the reactive and declarative nature of big frameworks like Vue or React at a much lower cost.

**Key Features:**
- **Tiny Size**: ~15KB minified
- **No Build Step**: Works directly in HTML
- **Vue-like Syntax**: Familiar directives
- **Reactive**: Built-in reactivity system
- **Declarative**: Write behavior in HTML attributes
- **Progressive**: Sprinkle in where needed

### When to Use Alpine.js

**Perfect For:**
- Adding interactivity to server-rendered pages
- Enhancing traditional PHP/Rails/Django apps
- Building simple SPAs without heavy tooling
- Prototyping interactive components quickly
- Replacing jQuery with modern reactive patterns

**Not Ideal For:**
- Large-scale complex SPAs (use React/Vue/Angular)
- Applications requiring heavy state management
- Projects needing extensive routing
- Component-heavy applications with deep nesting

### Alpine.js vs Other Frameworks

| Feature | Alpine.js | Vue.js | React | jQuery |
|---------|-----------|--------|-------|--------|
| **Size** | 15KB | 40KB | 45KB | 30KB |
| **Build Step** | ❌ No | ✅ Optional | ✅ Required | ❌ No |
| **Reactivity** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Learning Curve** | Low | Medium | Medium | Low |
| **Use Case** | Sprinkle | SPA/Progressive | SPA | DOM Manipulation |

---

## Core Concepts

### Reactivity System

Alpine.js uses a reactive data model similar to Vue.js:

```html
<div x-data="{ count: 0 }">
    <button @click="count++">Increment</button>
    <span x-text="count"></span>
</div>
```

**How It Works:**
1. `x-data` creates a reactive data scope
2. Changes to data automatically update the DOM
3. No virtual DOM - direct DOM mutations
4. Efficient change tracking

### Declarative Rendering

```html
<!-- Conditional Rendering -->
<div x-data="{ open: false }">
    <button @click="open = !open">Toggle</button>
    <div x-show="open">Content appears here</div>
</div>

<!-- List Rendering -->
<div x-data="{ items: ['Apple', 'Banana', 'Cherry'] }">
    <template x-for="item in items">
        <li x-text="item"></li>
    </template>
</div>
```

### Component Scope

Each `x-data` creates an isolated component scope:

```html
<!-- Component 1 -->
<div x-data="{ message: 'Hello' }">
    <span x-text="message"></span>
</div>

<!-- Component 2 - Separate scope -->
<div x-data="{ message: 'World' }">
    <span x-text="message"></span>
</div>
```

---

## Installation & Setup

### CDN Installation

**Latest Version:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Alpine.js App</title>
</head>
<body>
    <div x-data="{ message: 'Hello Alpine!' }">
        <h1 x-text="message"></h1>
    </div>

    <!-- Alpine.js CDN -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</body>
</html>
```

**Specific Version:**
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"></script>
```

### NPM Installation

```bash
npm install alpinejs
```

**Import in JavaScript:**
```javascript
import Alpine from 'alpinejs'

// Optional: Add plugins
import focus from '@alpinejs/focus'
Alpine.plugin(focus)

// Start Alpine
window.Alpine = Alpine
Alpine.start()
```

### Module Import

```html
<script type="module">
    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js'
    window.Alpine = Alpine
    Alpine.start()
</script>
```

### Build Tool Setup

**Vite Configuration:**
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    // Alpine.js works out of the box
})
```

**Webpack Configuration:**
```javascript
// webpack.config.js
module.exports = {
    // Standard webpack config
    // Alpine.js doesn't require special configuration
}
```

---

## Directives

### x-data

Define reactive data scope:

```html
<!-- Simple Object -->
<div x-data="{ open: false, name: 'John' }">
    <!-- Component content -->
</div>

<!-- Complex Object -->
<div x-data="{
    user: {
        name: 'Jane',
        email: 'jane@example.com'
    },
    posts: [],
    loading: false
}">
    <!-- Component content -->
</div>

<!-- Function Return -->
<div x-data="userData()">
    <!-- Component content -->
</div>

<script>
function userData() {
    return {
        name: 'Alice',
        age: 30,
        greet() {
            alert(`Hello, ${this.name}!`)
        }
    }
}
</script>
```

### x-show / x-if

**x-show** - Toggle visibility (CSS display):
```html
<div x-data="{ open: false }">
    <button @click="open = !open">Toggle</button>
    <div x-show="open">
        This element toggles visibility
    </div>
</div>
```

**x-if** - Conditional rendering (DOM manipulation):
```html
<div x-data="{ loggedIn: false }">
    <template x-if="loggedIn">
        <div>Welcome back!</div>
    </template>
    
    <template x-if="!loggedIn">
        <div>Please log in</div>
    </template>
</div>
```

**Difference:**
- `x-show`: Element always in DOM, just hidden
- `x-if`: Element added/removed from DOM

### x-for

Loop through arrays or objects:

```html
<!-- Array Loop -->
<div x-data="{ colors: ['red', 'blue', 'green'] }">
    <template x-for="color in colors">
        <div x-text="color"></div>
    </template>
</div>

<!-- Array with Index -->
<div x-data="{ items: ['A', 'B', 'C'] }">
    <template x-for="(item, index) in items">
        <div>
            <span x-text="index"></span>:
            <span x-text="item"></span>
        </div>
    </template>
</div>

<!-- Object Loop -->
<div x-data="{ 
    user: { name: 'John', age: 30, city: 'NYC' } 
}">
    <template x-for="(value, key) in user">
        <div>
            <strong x-text="key"></strong>: 
            <span x-text="value"></span>
        </div>
    </template>
</div>

<!-- Range Loop -->
<div x-data="{}">
    <template x-for="i in 5">
        <div x-text="i"></div>
    </template>
</div>
```

### x-text / x-html

**x-text** - Set text content:
```html
<div x-data="{ title: 'Hello World' }">
    <h1 x-text="title"></h1>
    <!-- Renders: <h1>Hello World</h1> -->
</div>
```

**x-html** - Set HTML content:
```html
<div x-data="{ content: '<strong>Bold Text</strong>' }">
    <div x-html="content"></div>
    <!-- Renders: <div><strong>Bold Text</strong></div> -->
</div>
```

⚠️ **Warning**: Only use `x-html` with trusted content to prevent XSS attacks.

### x-bind

Bind attributes dynamically:

```html
<!-- Shorthand: : -->
<div x-data="{ color: 'red', size: 'large' }">
    <!-- Full syntax -->
    <div x-bind:class="size"></div>
    
    <!-- Shorthand -->
    <div :class="size"></div>
    
    <!-- Multiple bindings -->
    <button 
        :class="color"
        :disabled="loading"
        :aria-label="buttonLabel">
        Click Me
    </button>
</div>

<!-- Class Binding -->
<div x-data="{ isActive: true }">
    <!-- String -->
    <div :class="isActive ? 'active' : 'inactive'"></div>
    
    <!-- Object -->
    <div :class="{ 'active': isActive, 'disabled': !isActive }"></div>
    
    <!-- Array -->
    <div :class="['base-class', isActive && 'active']"></div>
</div>

<!-- Style Binding -->
<div x-data="{ color: 'blue', size: '20px' }">
    <div :style="{ color: color, fontSize: size }">
        Styled text
    </div>
</div>
```

### x-on

Event listening:

```html
<!-- Shorthand: @ -->
<div x-data="{ count: 0 }">
    <!-- Full syntax -->
    <button x-on:click="count++">Increment</button>
    
    <!-- Shorthand -->
    <button @click="count++">Increment</button>
    
    <!-- Method call -->
    <button @click="handleClick()">Click</button>
</div>

<!-- Event Modifiers -->
<div x-data="{}">
    <!-- Prevent default -->
    <form @submit.prevent="handleSubmit">
        <button type="submit">Submit</button>
    </form>
    
    <!-- Stop propagation -->
    <div @click="outer">
        <button @click.stop="inner">Click</button>
    </div>
    
    <!-- Only once -->
    <button @click.once="initialize">Init Once</button>
    
    <!-- Debounce -->
    <input @input.debounce="search">
    <input @input.debounce.500ms="search">
    
    <!-- Throttle -->
    <div @scroll.throttle="handleScroll">
</div>

<!-- Keyboard Events -->
<div x-data="{}">
    <!-- Specific key -->
    <input @keyup.enter="submit">
    <input @keyup.escape="close">
    <input @keyup.space="toggle">
    
    <!-- Key combinations -->
    <input @keyup.ctrl.enter="save">
    <input @keyup.shift.s="search">
</div>
```

### x-model

Two-way data binding:

```html
<!-- Text Input -->
<div x-data="{ message: '' }">
    <input type="text" x-model="message">
    <p>You typed: <span x-text="message"></span></p>
</div>

<!-- Checkbox -->
<div x-data="{ agreed: false }">
    <input type="checkbox" x-model="agreed">
    <span x-text="agreed ? 'Agreed' : 'Not agreed'"></span>
</div>

<!-- Radio Buttons -->
<div x-data="{ choice: '' }">
    <input type="radio" value="A" x-model="choice"> A
    <input type="radio" value="B" x-model="choice"> B
    <span x-text="choice"></span>
</div>

<!-- Select -->
<div x-data="{ selected: '' }">
    <select x-model="selected">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
</div>

<!-- Modifiers -->
<div x-data="{ value: '' }">
    <!-- Lazy (on change, not input) -->
    <input x-model.lazy="value">
    
    <!-- Number (convert to number) -->
    <input x-model.number="age">
    
    <!-- Debounce -->
    <input x-model.debounce="search">
    <input x-model.debounce.500ms="search">
</div>
```

### x-cloak

Hide elements until Alpine initializes:

```html
<style>
    [x-cloak] { display: none !important; }
</style>

<div x-data="{ message: 'Hello' }" x-cloak>
    <h1 x-text="message"></h1>
    <!-- Won't flash {{message}} during load -->
</div>
```

### x-transition

Add CSS transitions:

```html
<div x-data="{ open: false }">
    <button @click="open = !open">Toggle</button>
    
    <!-- Default transition -->
    <div x-show="open" x-transition>
        Content with fade transition
    </div>
    
    <!-- Custom duration -->
    <div x-show="open" x-transition.duration.500ms>
        Content
    </div>
    
    <!-- Granular control -->
    <div x-show="open"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 transform scale-90"
         x-transition:enter-end="opacity-100 transform scale-100"
         x-transition:leave="transition ease-in duration-300"
         x-transition:leave-start="opacity-100 transform scale-100"
         x-transition:leave-end="opacity-0 transform scale-90">
        Content
    </div>
</div>
```

---

## State Management

### Local Component State

```html
<div x-data="{
    count: 0,
    increment() {
        this.count++
    },
    decrement() {
        this.count--
    }
}">
    <button @click="decrement">-</button>
    <span x-text="count"></span>
    <button @click="increment">+</button>
</div>
```

### Global State with Alpine.store

```html
<script>
document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        theme: 'light',
        user: null,
        
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
        },
        
        setUser(user) {
            this.user = user
        }
    })
})
</script>

<!-- Access store in components -->
<div x-data>
    <p x-text="$store.app.theme"></p>
    <button @click="$store.app.toggleTheme()">Toggle Theme</button>
</div>

<div x-data>
    <div x-show="$store.app.user">
        Welcome, <span x-text="$store.app.user?.name"></span>
    </div>
</div>
```

### Computed Properties

```html
<div x-data="{
    firstName: 'John',
    lastName: 'Doe',
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}">
    <input x-model="firstName" placeholder="First name">
    <input x-model="lastName" placeholder="Last name">
    <p>Full name: <span x-text="fullName"></span></p>
</div>
```

### Watchers

```html
<div x-data="{
    search: '',
    results: [],
    
    init() {
        this.$watch('search', (value) => {
            console.log('Search changed to:', value)
            this.performSearch(value)
        })
    },
    
    performSearch(query) {
        // Fetch results...
    }
}">
    <input x-model="search" placeholder="Search...">
</div>
```

---

## Components

### Inline Components

```html
<div x-data="dropdown()">
    <button @click="toggle">Toggle Dropdown</button>
    <div x-show="open" @click.away="close">
        Dropdown content
    </div>
</div>

<script>
function dropdown() {
    return {
        open: false,
        
        toggle() {
            this.open = !this.open
        },
        
        close() {
            this.open = false
        }
    }
}
</script>
```

### Reusable Components

```html
<!-- Define component -->
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('accordion', () => ({
        activeIndex: null,
        
        toggle(index) {
            this.activeIndex = this.activeIndex === index ? null : index
        },
        
        isActive(index) {
            return this.activeIndex === index
        }
    }))
})
</script>

<!-- Use component multiple times -->
<div x-data="accordion">
    <div>
        <button @click="toggle(0)">Section 1</button>
        <div x-show="isActive(0)">Content 1</div>
    </div>
    <div>
        <button @click="toggle(1)">Section 2</button>
        <div x-show="isActive(1)">Content 2</div>
    </div>
</div>
```

### Component Lifecycle

```html
<div x-data="{
    mounted: false,
    
    init() {
        // Runs when component initializes
        console.log('Component initialized')
        this.fetchData()
    },
    
    destroy() {
        // Cleanup if needed
        console.log('Component destroyed')
    },
    
    async fetchData() {
        const response = await fetch('/api/data')
        this.data = await response.json()
        this.mounted = true
    }
}">
    <!-- Component template -->
</div>
```

---

## Events & Actions

### Custom Events

```html
<!-- Dispatch custom events -->
<div x-data>
    <button @click="$dispatch('custom-event', { detail: 'data' })">
        Trigger Event
    </button>
</div>

<!-- Listen for custom events -->
<div @custom-event="handleCustomEvent">
    <!-- Event bubbles up -->
</div>

<script>
function handleCustomEvent(event) {
    console.log(event.detail) // { detail: 'data' }
}
</script>
```

### Event Bubbling

```html
<div x-data="{ outer: false }" @my-event="outer = true">
    <div x-data="{ inner: false }" @my-event="inner = true">
        <button @click="$dispatch('my-event')">
            Dispatch Event
        </button>
    </div>
</div>
```

### Window Events

```html
<div x-data @resize.window="handleResize">
    <!-- Listens to window resize -->
</div>

<div x-data @scroll.window.throttle="handleScroll">
    <!-- Listens to window scroll, throttled -->
</div>
```

---

## Advanced Features

### Magic Properties

```html
<div x-data="{ el: null }">
    <!-- $el - Reference to current element -->
    <button @click="$el.classList.add('clicked')">Click</button>
    
    <!-- $refs - Access x-ref elements -->
    <input x-ref="username">
    <button @click="$refs.username.focus()">Focus Input</button>
    
    <!-- $dispatch - Dispatch events -->
    <button @click="$dispatch('notify', { message: 'Hello' })">
        Notify
    </button>
    
    <!-- $watch - Watch property -->
    <div x-init="$watch('count', value => console.log(value))"></div>
    
    <!-- $nextTick - Wait for DOM update -->
    <button @click="count++; $nextTick(() => {
        console.log('DOM updated')
    })">Increment</button>
</div>
```

### Plugins

**Focus Plugin:**
```html
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ open: false }">
    <button @click="open = true">Open Dialog</button>
    
    <div x-show="open" x-trap.noescape="open">
        <!-- Focus trapped here -->
        <input type="text">
        <button @click="open = false">Close</button>
    </div>
</div>
```

**Persist Plugin:**
```html
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ 
    count: $persist(0).as('counter'),
    theme: $persist('light').as('theme')
}">
    <!-- Data persists in localStorage -->
</div>
```

**Intersect Plugin:**
```html
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ shown: false }" 
     x-intersect="shown = true">
    <div x-show="shown" x-transition>
        Appears when scrolled into view
    </div>
</div>
```

### Async Data Fetching

```html
<div x-data="{
    users: [],
    loading: true,
    error: null,
    
    async init() {
        try {
            const response = await fetch('https://api.example.com/users')
            if (!response.ok) throw new Error('Failed to fetch')
            this.users = await response.json()
        } catch (err) {
            this.error = err.message
        } finally {
            this.loading = false
        }
    }
}">
    <div x-show="loading">Loading...</div>
    <div x-show="error" x-text="error"></div>
    
    <template x-if="!loading && !error">
        <ul>
            <template x-for="user in users">
                <li x-text="user.name"></li>
            </template>
        </ul>
    </template>
</div>
```

---

## Best Practices

### Performance Optimization

**1. Use x-show for Frequent Toggles:**
```html
<!-- Good - Element stays in DOM -->
<div x-show="open">Frequently toggled content</div>

<!-- Less ideal for frequent toggles -->
<template x-if="open">
    <div>Content</div>
</template>
```

**2. Debounce/Throttle Event Handlers:**
```html
<input @input.debounce.500ms="expensiveSearch">
<div @scroll.throttle.100ms="handleScroll">
```

**3. Minimize Watchers:**
```html
<!-- Avoid excessive watchers -->
<div x-data="{
    init() {
        // Only watch what's necessary
        this.$watch('criticalData', callback)
    }
}">
```

### Code Organization

**Separate Complex Logic:**
```javascript
// app.js
function todoList() {
    return {
        todos: [],
        newTodo: '',
        
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({
                    id: Date.now(),
                    text: this.newTodo,
                    done: false
                })
                this.newTodo = ''
            }
        },
        
        removeTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id)
        },
        
        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id)
            if (todo) todo.done = !todo.done
        }
    }
}
```

```html
<div x-data="todoList()">
    <!-- Clean template -->
</div>
```

### Security

**1. Avoid x-html with User Input:**
```html
<!-- Dangerous -->
<div x-html="userInput"></div>

<!-- Safe -->
<div x-text="userInput"></div>
```

**2. Sanitize Data:**
```javascript
function sanitize(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
```

### Accessibility

```html
<div x-data="{ open: false }">
    <button 
        @click="open = !open"
        :aria-expanded="open"
        aria-controls="menu">
        Menu
    </button>
    
    <nav 
        id="menu"
        x-show="open"
        :aria-hidden="!open"
        @keyup.escape.window="open = false">
        <!-- Menu items -->
    </nav>
</div>
```

---

## Real-World Examples

### Modal Dialog

```html
<div x-data="{ modalOpen: false }" @keydown.escape.window="modalOpen = false">
    <button @click="modalOpen = true">Open Modal</button>
    
    <!-- Backdrop -->
    <div 
        x-show="modalOpen"
        x-transition.opacity
        class="fixed inset-0 bg-black bg-opacity-50"
        @click="modalOpen = false">
    </div>
    
    <!-- Modal -->
    <div 
        x-show="modalOpen"
        x-transition
        class="fixed inset-0 flex items-center justify-center p-4"
        @click.away="modalOpen = false">
        <div class="bg-white rounded-lg p-6 max-w-md" @click.stop>
            <h2>Modal Title</h2>
            <p>Modal content goes here</p>
            <button @click="modalOpen = false">Close</button>
        </div>
    </div>
</div>
```

### Tabs Component

```html
<div x-data="{ activeTab: 'tab1' }">
    <!-- Tab Buttons -->
    <div class="tab-buttons">
        <button 
            @click="activeTab = 'tab1'"
            :class="{ 'active': activeTab === 'tab1' }">
            Tab 1
        </button>
        <button 
            @click="activeTab = 'tab2'"
            :class="{ 'active': activeTab === 'tab2' }">
            Tab 2
        </button>
    </div>
    
    <!-- Tab Panels -->
    <div class="tab-panels">
        <div x-show="activeTab === 'tab1'" x-transition>
            <h3>Tab 1 Content</h3>
        </div>
        <div x-show="activeTab === 'tab2'" x-transition>
            <h3>Tab 2 Content</h3>
        </div>
    </div>
</div>
```

### Search with Autocomplete

```html
<div x-data="{
    query: '',
    results: [],
    loading: false,
    
    async search() {
        if (this.query.length < 2) {
            this.results = []
            return
        }
        
        this.loading = true
        try {
            const res = await fetch(`/api/search?q=${this.query}`)
            this.results = await res.json()
        } finally {
            this.loading = false
        }
    }
}">
    <input 
        type="text" 
        x-model="query"
        @input.debounce.300ms="search"
        placeholder="Search...">
    
    <div x-show="loading">Searching...</div>
    
    <ul x-show="results.length > 0">
        <template x-for="result in results">
            <li x-text="result.title"></li>
        </template>
    </ul>
</div>
```

### Shopping Cart

```html
<div x-data="{
    cart: [],
    
    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            this.cart.push({ ...product, quantity: 1 })
        }
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId)
    },
    
    get total() {
        return this.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        }, 0)
    },
    
    get itemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0)
    }
}">
    <!-- Cart badge -->
    <div class="cart-badge" x-text="itemCount"></div>
    
    <!-- Cart items -->
    <template x-for="item in cart">
        <div class="cart-item">
            <span x-text="item.name"></span>
            <span x-text="`$${item.price} × ${item.quantity}`"></span>
            <button @click="removeFromCart(item.id)">Remove</button>
        </div>
    </template>
    
    <!-- Total -->
    <div>Total: $<span x-text="total.toFixed(2)"></span></div>
</div>
```

### Form Validation

```html
<div x-data="{
    form: {
        email: '',
        password: ''
    },
    errors: {},
    
    validate() {
        this.errors = {}
        
        // Email validation
        if (!this.form.email) {
            this.errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
            this.errors.email = 'Invalid email format'
        }
        
        // Password validation
        if (!this.form.password) {
            this.errors.password = 'Password is required'
        } else if (this.form.password.length < 8) {
            this.errors.password = 'Password must be at least 8 characters'
        }
        
        return Object.keys(this.errors).length === 0
    },
    
    async submit() {
        if (!this.validate()) return
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.form)
            })
            // Handle response
        } catch (error) {
            console.error(error)
        }
    }
}">
    <form @submit.prevent="submit">
        <div>
            <input 
                type="email" 
                x-model="form.email"
                placeholder="Email"
                :class="{ 'error': errors.email }">
            <span x-show="errors.email" x-text="errors.email" class="error-message"></span>
        </div>
        
        <div>
            <input 
                type="password" 
                x-model="form.password"
                placeholder="Password"
                :class="{ 'error': errors.password }">
            <span x-show="errors.password" x-text="errors.password" class="error-message"></span>
        </div>
        
        <button type="submit">Login</button>
    </form>
</div>
```

---

## Integration Patterns

### Laravel Integration

**Blade Templates:**
```php
<!-- resources/views/components/dropdown.blade.php -->
<div x-data="{ open: false }" class="relative">
    <button @click="open = !open">
        {{ $trigger }}
    </button>
    
    <div x-show="open" @click.away="open = false">
        {{ $slot }}
    </div>
</div>

<!-- Usage -->
<x-dropdown>
    <x-slot name="trigger">
        Options
    </x-slot>
    
    <a href="/profile">Profile</a>
    <a href="/settings">Settings</a>
</x-dropdown>
```

### Django Integration

```html
<!-- templates/base.html -->
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <script defer src="{% static 'js/alpine.min.js' %}"></script>
</head>
<body>
    <div x-data="{ 
        csrfToken: '{{ csrf_token }}',
        
        async submitForm(url, data) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': this.csrfToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            return response.json()
        }
    }">
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

### Ruby on Rails Integration

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
<head>
    <%= javascript_include_tag 'alpine', defer: true %>
</head>
<body>
    <div x-data="{ 
        authenticityToken: '<%= form_authenticity_token %>' 
    }">
        <%= yield %>
    </div>
</body>
</html>
```

### Tailwind CSS Integration

```html
<div x-data="{ open: false }">
    <button 
        @click="open = !open"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Toggle
    </button>
    
    <div 
        x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-90"
        x-transition:enter-end="opacity-100 transform scale-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 transform scale-100"
        x-transition:leave-end="opacity-0 transform scale-90"
        class="mt-2 p-4 bg-white border rounded shadow-lg">
        Content
    </div>
</div>
```

### API Integration

```html
<div x-data="{
    data: null,
    loading: false,
    error: null,
    
    async fetchData(endpoint) {
        this.loading = true
        this.error = null
        
        try {
            const response = await fetch(`https://api.example.com${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            this.data = await response.json()
        } catch (err) {
            this.error = err.message
        } finally {
            this.loading = false
        }
    },
    
    async postData(endpoint, payload) {
        try {
            const response = await fetch(`https://api.example.com${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            })
            
            return await response.json()
        } catch (err) {
            console.error('Post failed:', err)
        }
    }
}">
    <!-- Component using API -->
</div>
```

---

## Resources & Learning

### Official Resources
- **Documentation**: https://alpinejs.dev
- **GitHub**: https://github.com/alpinejs/alpine
- **Examples**: https://alpinejs.dev/examples

### Community Resources
- Alpine.js Discord Community
- Alpine Toolbox (Component Library)
- Alpine.js Weekly Newsletter

### Learning Path
1. Start with basic directives (x-data, x-show, x-text)
2. Learn event handling (@click, x-model)
3. Practice with conditional rendering and loops
4. Build simple components (modals, dropdowns)
5. Explore plugins and advanced features
6. Integrate with your backend framework

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 with polyfills (not recommended)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Alpine.js provides the perfect balance between simplicity and power for adding interactivity to web applications. Its minimal footprint and familiar syntax make it an excellent choice for developers who want reactive behavior without the complexity of larger frameworks.**
