# Qwik - Resumable JavaScript Framework

## Table of Contents
- [Introduction](#introduction)
- [Core Concepts](#core-concepts)
- [Installation & Setup](#installation--setup)
- [Components](#components)
- [Resumability](#resumability)
- [Routing](#routing)
- [State Management](#state-management)
- [Data Loading](#data-loading)
- [Styling](#styling)
- [Optimization](#optimization)
- [QwikCity](#qwikcity)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)

---

## Introduction

### What is Qwik?

Qwik is a revolutionary web framework that achieves instant loading of web applications at any size or complexity. Unlike traditional frameworks that require hydration, Qwik uses a fundamentally different approach called "resumability" to deliver instant interactive experiences.

**Key Features:**
- **Instant-On**: Sub-second TTI (Time to Interactive) regardless of app size
- **Resumable**: No hydration needed - picks up where server left off
- **Fine-Grained Lazy Loading**: Only loads code when needed
- **O(1) Loading**: Constant load time regardless of application complexity
- **Automatic Code Splitting**: Zero configuration needed
- **Optimized for Edge**: Built for edge computing and SSR
- **React-Like Syntax**: Familiar developer experience

### The Problem Qwik Solves

**Traditional Frameworks (React, Vue, Angular):**
1. Server renders HTML
2. Browser downloads JavaScript bundle
3. Framework hydrates (re-executes all component code)
4. Application becomes interactive

**Result**: As your app grows, JavaScript bundle grows → slower Time to Interactive

**Qwik's Approach:**
1. Server renders HTML with serialized state
2. Browser loads minimal Qwik loader (~1KB)
3. No hydration - app is immediately interactive
4. Code loads on-demand when user interacts

**Result**: Constant O(1) loading time regardless of app complexity

### Performance Comparison

| Metric | Traditional SPA | Qwik |
|--------|----------------|------|
| **Initial JS** | 100KB - 1MB+ | ~1KB |
| **Time to Interactive** | 2-10+ seconds | <100ms |
| **Hydration** | Required | None |
| **Code Growth Impact** | Linear | Constant |
| **Edge Optimization** | Difficult | Native |

### When to Use Qwik

**Perfect For:**
- Performance-critical applications
- E-commerce and content sites
- Applications deployed to edge networks
- Large-scale applications
- Mobile-first experiences

**Consider Alternatives If:**
- You need maximum ecosystem/library support (React has more)
- Your team has deep expertise in another framework
- Building small internal tools where perf isn't critical

---

## Core Concepts

### Resumability

**The Revolutionary Concept:**

Instead of downloading and re-executing code (hydration), Qwik serializes the application state and framework state on the server, then "resumes" execution in the browser exactly where the server left off.

```tsx
// Traditional Framework (Hydration)
export function Counter() {
    const [count, setCount] = useState(0) // Re-executed on client
    
    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    )
}
// Problem: useState, event handler code must download and execute

// Qwik (Resumability)
export const Counter = component$(() => {
    const count = useSignal(0) // State serialized by server
    
    return (
        <button onClick$={() => count.value++}>
            {count.value}
        </button>
    )
})
// onClick$ code only downloads when button is clicked
```

### Lazy Loading with `$`

The `$` symbol tells Qwik's optimizer to lazy-load code:

```tsx
// component$ - Lazy load component definition
export const MyComponent = component$(() => {
    // ...
})

// $ - Lazy load event handler
<button onClick$={(event) => {
    console.log('Clicked!')
}}>

// $ - Lazy load computed value
const double = computed$(() => count.value * 2)

// $ - Lazy load task/effect
useTask$(({ track }) => {
    // ...
})
```

### Signals

Qwik uses signals for fine-grained reactivity:

```tsx
import { component$, useSignal } from '@builder.io/qwik'

export const Counter = component$(() => {
    // Create signal
    const count = useSignal(0)
    
    // Read value with .value
    console.log(count.value)
    
    // Update value
    const increment = $(() => {
        count.value++
    })
    
    return (
        <div>
            <p>Count: {count.value}</p>
            <button onClick$={increment}>+</button>
        </div>
    )
})
```

### Optimizer

Qwik includes a powerful optimizer that:
- Automatically extracts lazy-loadable code
- Creates optimal code chunks
- Generates symbols for serialization
- Eliminates dead code

**You write:**
```tsx
<button onClick$={() => console.log('clicked')}>
```

**Optimizer generates:**
```tsx
// Separate chunk, only loaded on click
const onClick = () => console.log('clicked')

// In HTML
<button q:onClick="./chunk-abc123.js#onClick">
```

---

## Installation & Setup

### Create New Qwik App

```bash
# Using npm
npm create qwik@latest

# Using yarn
yarn create qwik

# Using pnpm
pnpm create qwik@latest
```

**Interactive Setup:**
```
? Project name: my-qwik-app
? Select a starter: Basic App
? Would you like to install npm dependencies? Yes
? Initialize a new git repository? Yes
```

### Project Structure

```
my-qwik-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   └── counter/
│   │       └── counter.tsx
│   ├── routes/          # File-based routing (QwikCity)
│   │   ├── index.tsx    # Homepage
│   │   ├── about/
│   │   │   └── index.tsx
│   │   └── layout.tsx   # Root layout
│   ├── entry.ssr.tsx    # SSR entry point
│   └── root.tsx         # Root component
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Development Server

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to edge (Cloudflare, Vercel, Netlify)
npm run deploy
```

### Adding to Existing Project

```bash
npm install @builder.io/qwik @builder.io/qwik-city
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'

export default defineConfig({
    plugins: [
        qwikCity(),
        qwikVite()
    ]
})
```

---

## Components

### Creating Components

```tsx
import { component$ } from '@builder.io/qwik'

// Basic component
export const Greeting = component$(() => {
    return <h1>Hello Qwik!</h1>
})

// Component with props
interface GreetingProps {
    name: string
    age?: number
}

export const Greeting = component$<GreetingProps>(({ name, age }) => {
    return (
        <div>
            <h1>Hello {name}!</h1>
            {age && <p>Age: {age}</p>}
        </div>
    )
})
```

### Props

```tsx
// Typed props
interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary'
    onClick$?: () => void
}

export const Button = component$<ButtonProps>(({ 
    label, 
    variant = 'primary',
    onClick$ 
}) => {
    return (
        <button 
            class={`btn btn-${variant}`}
            onClick$={onClick$}>
            {label}
        </button>
    )
})

// Usage
<Button 
    label="Click me" 
    variant="primary"
    onClick$={() => console.log('Clicked')} 
/>
```

### Children & Slots

```tsx
import { Slot, component$ } from '@builder.io/qwik'

// Default slot
export const Card = component$(() => {
    return (
        <div class="card">
            <Slot />
        </div>
    )
})

// Usage
<Card>
    <h2>Card Title</h2>
    <p>Card content</p>
</Card>

// Named slots
export const Layout = component$(() => {
    return (
        <div>
            <header>
                <Slot name="header" />
            </header>
            <main>
                <Slot />
            </main>
            <footer>
                <Slot name="footer" />
            </footer>
        </div>
    )
})

// Usage
<Layout>
    <div q:slot="header">Header content</div>
    <div>Main content</div>
    <div q:slot="footer">Footer content</div>
</Layout>
```

### Conditional Rendering

```tsx
export const UserProfile = component$(() => {
    const user = useSignal<User | null>(null)
    const isLoading = useSignal(true)
    
    return (
        <div>
            {isLoading.value && <div>Loading...</div>}
            
            {!isLoading.value && user.value && (
                <div>
                    <h2>{user.value.name}</h2>
                    <p>{user.value.email}</p>
                </div>
            )}
            
            {!isLoading.value && !user.value && (
                <div>No user found</div>
            )}
        </div>
    )
})
```

### Lists

```tsx
export const TodoList = component$(() => {
    const todos = useSignal([
        { id: 1, text: 'Learn Qwik', done: false },
        { id: 2, text: 'Build app', done: false }
    ])
    
    return (
        <ul>
            {todos.value.map((todo) => (
                <li key={todo.id}>
                    <input 
                        type="checkbox" 
                        checked={todo.done}
                        onChange$={() => {
                            todo.done = !todo.done
                        }}
                    />
                    {todo.text}
                </li>
            ))}
        </ul>
    )
})
```

---

## Resumability

### How Resumability Works

**1. Server-Side Rendering:**
```tsx
// Server renders HTML with serialized state
<div>
    <p>Count: <span q:key="count">0</span></p>
    <button onClick$="./handlers.js#increment">+</button>
</div>

<!-- Serialized state in HTML -->
<script type="qwik/json">
{
    "ctx": {},
    "objs": [
        {"count": 0}
    ],
    "subs": []
}
</script>
```

**2. Client Resumes:**
```tsx
// No hydration! Just deserializes state
// Only loads code when user interacts
```

### Serialization Rules

Only serializable data can be resumed:

```tsx
// ✅ Serializable
const count = useSignal(0)
const user = useSignal({ name: 'John', age: 30 })
const items = useSignal([1, 2, 3])

// ❌ Not serializable
const callback = useSignal(() => console.log('hello'))
const domNode = useSignal(document.getElementById('app'))
const classInstance = useSignal(new MyClass())

// Solution: Use $ for non-serializable code
const handleClick = $(() => console.log('hello'))
```

### State Serialization

```tsx
export const App = component$(() => {
    const state = useStore({
        count: 0,
        user: { name: 'John' },
        items: [1, 2, 3]
    })
    
    // State automatically serialized to HTML
    // No hydration needed on client
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick$={() => state.count++}>+</button>
        </div>
    )
})
```

---

## Routing

### File-Based Routing (QwikCity)

```
src/routes/
├── index.tsx           # /
├── about/
│   └── index.tsx       # /about
├── blog/
│   ├── index.tsx       # /blog
│   └── [slug]/
│       └── index.tsx   # /blog/:slug
├── users/
│   └── [id]/
│       ├── index.tsx   # /users/:id
│       └── edit/
│           └── index.tsx # /users/:id/edit
└── layout.tsx          # Root layout
```

### Route Components

```tsx
// src/routes/index.tsx
import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
})

// SEO metadata
export const head: DocumentHead = {
    title: 'Home | My Qwik App',
    meta: [
        {
            name: 'description',
            content: 'Welcome to my Qwik app'
        }
    ]
}
```

### Dynamic Routes

```tsx
// src/routes/blog/[slug]/index.tsx
import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
    const loc = useLocation()
    const slug = loc.params.slug
    
    return (
        <div>
            <h1>Blog Post: {slug}</h1>
        </div>
    )
})
```

### Layouts

```tsx
// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
    return (
        <div class="layout">
            <header>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/blog">Blog</a>
                </nav>
            </header>
            
            <main>
                <Slot />
            </main>
            
            <footer>
                <p>&copy; 2024 My App</p>
            </footer>
        </div>
    )
})
```

### Nested Layouts

```
routes/
├── layout.tsx          # Root layout
├── index.tsx
└── dashboard/
    ├── layout.tsx      # Dashboard layout
    ├── index.tsx
    └── settings/
        └── index.tsx
```

```tsx
// src/routes/dashboard/layout.tsx
export default component$(() => {
    return (
        <div class="dashboard">
            <aside>
                <a href="/dashboard">Overview</a>
                <a href="/dashboard/settings">Settings</a>
            </aside>
            <div class="content">
                <Slot />
            </div>
        </div>
    )
})
```

### Navigation

```tsx
import { Link } from '@builder.io/qwik-city'

export const Nav = component$(() => {
    return (
        <nav>
            {/* Prefetches on hover by default */}
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            
            {/* Disable prefetch */}
            <Link href="/blog" prefetch={false}>Blog</Link>
            
            {/* Active link styling */}
            <Link 
                href="/contact"
                class="nav-link"
                activeClass="active">
                Contact
            </Link>
        </nav>
    )
})
```

---

## State Management

### useSignal

```tsx
import { component$, useSignal } from '@builder.io/qwik'

export const Counter = component$(() => {
    // Primitive value
    const count = useSignal(0)
    
    // Read
    console.log(count.value)
    
    // Write
    count.value++
    
    return (
        <div>
            <p>Count: {count.value}</p>
            <button onClick$={() => count.value++}>+</button>
        </div>
    )
})
```

### useStore

```tsx
import { component$, useStore } from '@builder.io/qwik'

export const TodoApp = component$(() => {
    // Object/Array - creates proxy for deep reactivity
    const state = useStore({
        todos: [] as Todo[],
        filter: 'all' as 'all' | 'active' | 'completed'
    })
    
    const addTodo = $((text: string) => {
        state.todos.push({
            id: Date.now(),
            text,
            done: false
        })
    })
    
    return (
        <div>
            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick$={() => {
                            // Mutations are reactive
                            todo.done = !todo.done
                        }}>
                            Toggle
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
})
```

### Computed Values

```tsx
import { component$, useComputed$, useSignal } from '@builder.io/qwik'

export const ShoppingCart = component$(() => {
    const items = useStore([
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15, quantity: 1 }
    ])
    
    // Computed value - auto-updates when dependencies change
    const total = useComputed$(() => {
        return items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        )
    })
    
    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}: ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <p>Total: ${total.value}</p>
        </div>
    )
})
```

### Context (Global State)

```tsx
import { 
    component$, 
    createContextId, 
    useContextProvider,
    useContext
} from '@builder.io/qwik'

// Create context
interface AppState {
    user: { name: string } | null
    theme: 'light' | 'dark'
}

export const AppContext = createContextId<AppState>('app.context')

// Provide context
export const App = component$(() => {
    const state = useStore<AppState>({
        user: null,
        theme: 'light'
    })
    
    useContextProvider(AppContext, state)
    
    return <Slot />
})

// Consume context
export const UserProfile = component$(() => {
    const appState = useContext(AppContext)
    
    return (
        <div>
            {appState.user ? (
                <p>Welcome, {appState.user.name}!</p>
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    )
})
```

---

## Data Loading

### Route Loaders

```tsx
// src/routes/users/index.tsx
import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'

// Runs on server
export const useUsers = routeLoader$(async () => {
    const response = await fetch('https://api.example.com/users')
    return response.json()
})

export default component$(() => {
    const users = useUsers() // Access loaded data
    
    return (
        <ul>
            {users.value.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
})
```

### Multiple Loaders

```tsx
export const useUser = routeLoader$(async ({ params }) => {
    const res = await fetch(`/api/users/${params.id}`)
    return res.json()
})

export const usePosts = routeLoader$(async ({ params }) => {
    const res = await fetch(`/api/users/${params.id}/posts`)
    return res.json()
})

export default component$(() => {
    const user = useUser()
    const posts = usePosts()
    
    return (
        <div>
            <h1>{user.value.name}</h1>
            <ul>
                {posts.value.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
})
```

### Request Context

```tsx
export const useUserData = routeLoader$(async (requestEvent) => {
    // Access request details
    const { 
        params,    // Route parameters
        query,     // Query parameters
        url,       // Full URL
        cookie,    // Cookies
        headers,   // Request headers
        method,    // HTTP method
        env        // Environment variables
    } = requestEvent
    
    // Check authentication
    const token = cookie.get('auth-token')
    if (!token) {
        throw requestEvent.redirect(302, '/login')
    }
    
    // Fetch data
    const res = await fetch('https://api.example.com/user', {
        headers: { Authorization: `Bearer ${token.value}` }
    })
    
    return res.json()
})
```

### Server Actions

```tsx
import { component$ } from '@builder.io/qwik'
import { routeAction$, Form } from '@builder.io/qwik-city'

// Server-side form action
export const useAddUser = routeAction$(async (data, requestEvent) => {
    // Validate
    if (!data.name || !data.email) {
        return {
            success: false,
            error: 'Name and email required'
        }
    }
    
    // Save to database
    await db.users.create({
        name: data.name as string,
        email: data.email as string
    })
    
    return {
        success: true
    }
})

export default component$(() => {
    const action = useAddUser()
    
    return (
        <div>
            <Form action={action}>
                <input name="name" required />
                <input name="email" type="email" required />
                <button type="submit">
                    {action.isRunning ? 'Saving...' : 'Save'}
                </button>
            </Form>
            
            {action.value?.success && <p>User created!</p>}
            {action.value?.error && <p>{action.value.error}</p>}
        </div>
    )
})
```

---

## Styling

### Inline Styles

```tsx
export const StyledComponent = component$(() => {
    return (
        <div style={{
            backgroundColor: 'blue',
            padding: '20px',
            borderRadius: '8px'
        }}>
            Styled content
        </div>
    )
})
```

### CSS Modules

```css
/* component.module.css */
.container {
    padding: 20px;
    background: #f0f0f0;
}

.title {
    font-size: 24px;
    color: #333;
}
```

```tsx
import styles from './component.module.css'

export const Component = component$(() => {
    return (
        <div class={styles.container}>
            <h1 class={styles.title}>Title</h1>
        </div>
    )
})
```

### Scoped Styles

```tsx
import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './component.css?inline'

export const Component = component$(() => {
    useStylesScoped$(styles)
    
    return (
        <div class="container">
            <h1>Scoped Styles</h1>
        </div>
    )
})
```

### Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {}
    },
    plugins: []
}
```

```tsx
export const Button = component$<{ label: string }>(({ label }) => {
    return (
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {label}
        </button>
    )
})
```

---

## Optimization

### Lazy Loading Components

```tsx
// Automatically lazy loaded
export const HeavyComponent = component$(() => {
    return <div>Heavy component</div>
})

// Usage - only loads when rendered
<HeavyComponent />
```

### Prefetching

```tsx
import { Link } from '@builder.io/qwik-city'

// Prefetch on hover (default)
<Link href="/page">Page</Link>

// Prefetch immediately
<Link href="/page" prefetch="always">Page</Link>

// No prefetch
<Link href="/page" prefetch={false}>Page</Link>

// Prefetch on viewport
<Link href="/page" prefetch="viewport">Page</Link>
```

### Resource Loading

```tsx
import { component$, useResource$, Resource } from '@builder.io/qwik'

export const UserProfile = component$(() => {
    const user = useResource$<User>(async ({ track, cleanup }) => {
        // Track reactive dependencies
        const userId = track(() => userIdSignal.value)
        
        // Abort controller for cleanup
        const controller = new AbortController()
        cleanup(() => controller.abort())
        
        // Fetch data
        const res = await fetch(`/api/users/${userId}`, {
            signal: controller.signal
        })
        return res.json()
    })
    
    return (
        <Resource
            value={user}
            onPending={() => <div>Loading...</div>}
            onRejected={(error) => <div>Error: {error.message}</div>}
            onResolved={(user) => (
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )}
        />
    )
})
```

### Code Splitting

```tsx
// Qwik automatically code-splits:

// 1. Components
export const MyComponent = component$(() => {
    // Separate chunk
})

// 2. Event handlers
<button onClick$={() => {
    // Separate chunk
}}>

// 3. Computed values
const value = useComputed$(() => {
    // Separate chunk
})

// 4. Tasks
useTask$(({ track }) => {
    // Separate chunk
})
```

---

## QwikCity

### Middleware

```tsx
// src/routes/plugin.ts
import type { RequestHandler } from '@builder.io/qwik-city'

// Auth middleware
export const onRequest: RequestHandler = async ({ cookie, redirect }) => {
    const token = cookie.get('auth-token')
    
    if (!token) {
        throw redirect(302, '/login')
    }
}

// Logging middleware
export const onGet: RequestHandler = async ({ url }) => {
    console.log('GET request to:', url.pathname)
}
```

### Endpoints (API Routes)

```tsx
// src/routes/api/users/index.ts
import type { RequestHandler } from '@builder.io/qwik-city'

// GET /api/users
export const onGet: RequestHandler = async () => {
    const users = await db.users.findMany()
    
    return {
        status: 200,
        body: JSON.stringify(users)
    }
}

// POST /api/users
export const onPost: RequestHandler = async ({ request }) => {
    const data = await request.json()
    
    const user = await db.users.create({ data })
    
    return {
        status: 201,
        body: JSON.stringify(user)
    }
}

// Dynamic route: /api/users/[id]
export const onGet: RequestHandler = async ({ params }) => {
    const user = await db.users.findUnique({
        where: { id: params.id }
    })
    
    if (!user) {
        return { status: 404 }
    }
    
    return {
        status: 200,
        body: JSON.stringify(user)
    }
}
```

---

## Advanced Features

### Tasks (Effects)

```tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik'

export const SearchComponent = component$(() => {
    const query = useSignal('')
    const results = useSignal([])
    
    // Runs when dependencies change
    useTask$(async ({ track }) => {
        // Track query changes
        const searchQuery = track(() => query.value)
        
        if (searchQuery.length < 2) {
            results.value = []
            return
        }
        
        // Fetch results
        const res = await fetch(`/api/search?q=${searchQuery}`)
        results.value = await res.json()
    })
    
    return (
        <div>
            <input 
                value={query.value}
                onInput$={(e) => query.value = e.target.value}
            />
            <ul>
                {results.value.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
})
```

### Visible Tasks

```tsx
import { component$, useVisibleTask$ } from '@builder.io/qwik'

export const ClientOnlyComponent = component$(() => {
    useVisibleTask$(() => {
        // Runs ONLY on client when component becomes visible
        // Use for DOM APIs, browser-only code
        const chart = new Chart(document.getElementById('chart'), {
            // Chart.js configuration
        })
        
        return () => {
            // Cleanup
            chart.destroy()
        }
    })
    
    return <canvas id="chart"></canvas>
})
```

### $ Functions

```tsx
import { $, component$ } from '@builder.io/qwik'

export const MyComponent = component$(() => {
    // Lazy-loaded function
    const handleClick = $(() => {
        console.log('Clicked!')
    })
    
    // Inline $ function
    return (
        <div>
            <button onClick$={handleClick}>Click 1</button>
            
            <button onClick$={() => {
                // Also lazy-loaded
                console.log('Clicked 2!')
            }}>
                Click 2
            </button>
        </div>
    )
})
```

---

## Best Practices

### Performance

**1. Leverage Resumability:**
```tsx
// ✅ Good - Lazy loads on interaction
<button onClick$={() => heavyOperation()}>

// ❌ Avoid - Loads immediately
useVisibleTask$(() => {
    heavyOperation()
})
```

**2. Use Signals for Primitives:**
```tsx
// ✅ Good
const count = useSignal(0)

// ❌ Overkill for primitive
const count = useStore({ value: 0 })
```

**3. Minimize useVisibleTask$:**
```tsx
// Only use for browser-only APIs
useVisibleTask$(() => {
    // Chart.js, D3, etc.
})
```

### Code Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   │   ├── button/
│   │   └── card/
│   └── features/     # Feature-specific components
│       ├── auth/
│       └── blog/
├── routes/           # Pages
├── services/         # API services
└── utils/            # Utilities
```

### TypeScript

```tsx
// Type your props
interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary'
    onClick$?: () => void
}

export const Button = component$<ButtonProps>(({ label, variant, onClick$ }) => {
    // ...
})

// Type your stores
interface TodoStore {
    todos: Array<{ id: number; text: string; done: boolean }>
    filter: 'all' | 'active' | 'completed'
}

const state = useStore<TodoStore>({
    todos: [],
    filter: 'all'
})
```

---

## Real-World Examples

### Authentication Flow

```tsx
// src/routes/layout.tsx
export const useUser = routeLoader$(async ({ cookie }) => {
    const token = cookie.get('auth-token')
    
    if (!token) return null
    
    const res = await fetch('https://api.example.com/me', {
        headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (!res.ok) return null
    
    return res.json()
})

export default component$(() => {
    const user = useUser()
    
    return (
        <div>
            <header>
                {user.value ? (
                    <div>Welcome, {user.value.name}</div>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </header>
            <Slot />
        </div>
    )
})
```

### E-commerce Product Page

```tsx
export const useProduct = routeLoader$(async ({ params }) => {
    const res = await fetch(`/api/products/${params.id}`)
    return res.json()
})

export const useAddToCart = routeAction$(async (data) => {
    // Add to cart in database
    await db.cart.create({
        productId: data.productId,
        quantity: data.quantity
    })
    
    return { success: true }
})

export default component$(() => {
    const product = useProduct()
    const addToCart = useAddToCart()
    const quantity = useSignal(1)
    
    return (
        <div>
            <h1>{product.value.name}</h1>
            <p>${product.value.price}</p>
            
            <Form action={addToCart}>
                <input type="hidden" name="productId" value={product.value.id} />
                <input 
                    type="number" 
                    name="quantity"
                    min="1"
                    value={quantity.value}
                    onInput$={(e) => quantity.value = Number(e.target.value)}
                />
                <button type="submit">Add to Cart</button>
            </Form>
            
            {addToCart.value?.success && <p>Added to cart!</p>}
        </div>
    )
})
```

---

## Resources & Learning

### Official Resources
- **Documentation**: https://qwik.builder.io
- **GitHub**: https://github.com/BuilderIO/qwik
- **Discord**: https://qwik.builder.io/chat
- **Playground**: https://qwik.builder.io/playground

### Learning Path
1. Understand resumability concept
2. Learn component basics and signals
3. Practice with file-based routing
4. Implement data loading
5. Build real applications
6. Deploy to edge (Cloudflare, Vercel)

### Deployment
- **Cloudflare Pages**
- **Vercel**
- **Netlify**
- **AWS Lambda@Edge**
- **Node.js Server**

---

**Qwik represents the next evolution in web frameworks, delivering instant loading through resumability. Its revolutionary approach to code loading and execution makes it perfect for building high-performance web applications that scale effortlessly.**
