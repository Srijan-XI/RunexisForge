# Fresh

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [File-Based Routing](#file-based-routing)
5. [Islands](#islands)
6. [Routes and Handlers](#routes-and-handlers)
7. [API Routes](#api-routes)
8. [State Management](#state-management)
9. [Database Integration](#database-integration)
10. [Styling](#styling)
11. [Error Handling](#error-handling)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Best Practices](#best-practices)
15. [Resources](#resources)

---

## Introduction

Fresh is a next-generation full-stack web framework for Deno. It's built around simplicity, performance, and developer experience with file-based routing and island-based architecture.

### Key Features
- **File-based routing**: Like Next.js but for Deno
- **Islands architecture**: Interactive components only when needed
- **Zero JavaScript by default**: Minimal client-side JS
- **TypeScript by default**: Full TypeScript support
- **Deno-native**: Leverages Deno's security and tooling
- **Preact-based**: Lightweight virtual DOM library
- **Server-side rendering**: Fast initial loads
- **No build step**: Automatic optimization

### Why Fresh?
- Next.js-like experience but faster
- Deno's security model built-in
- Smaller bundle sizes
- Better performance
- Full-stack in one framework
- Great developer experience

---

## Installation

### Create New Project
```bash
deno run -A -r https://fresh.deno.dev my-app
cd my-app
deno task start
```

### Manual Setup
Create `deno.json`:
```json
{
  "imports": {
    "fresh": "https://deno.land/x/fresh@1.4.4/mod.ts",
    "preact": "https://esm.sh/preact@10.17.1",
    "preact/": "https://esm.sh/preact@10.17.1/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@6.2.3"
  },
  "tasks": {
    "start": "deno run -A --watch=static/,routes/,islands/ main.ts",
    "build": "deno run -A main.ts build"
  }
}
```

---

## Getting Started

### Basic Server
Create `main.ts`:
```typescript
import { start } from "fresh/server.ts";
import routes from "./routes/[...pathname].tsx";

await start(routes);
```

### Create Layout
Create `routes/_layout.tsx`:
```typescript
import { PageProps } from "fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <main>
          <Component />
        </main>
      </body>
    </html>
  );
}
```

### Home Page
Create `routes/index.tsx`:
```typescript
export default function Home() {
  return (
    <div>
      <h1>Welcome to Fresh</h1>
      <p>This is your homepage</p>
    </div>
  );
}
```

---

## File-Based Routing

### Basic Routes
```
routes/
├── index.tsx           # /
├── about.tsx           # /about
├── contact.tsx         # /contact
├── users/
│   └── index.tsx       # /users
└── posts/
    ├── index.tsx       # /posts
    └── [id].tsx        # /posts/:id
```

### Dynamic Routes
Create `routes/users/[id].tsx`:
```typescript
import { PageProps } from "fresh/server.ts";

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User | null> {
  // Fetch from database
  return { id, name: "John", email: "john@example.com" };
}

export default async function UserPage({ params }: PageProps) {
  const user = await getUser(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Catch-All Routes
Create `routes/[...pathname].tsx`:
```typescript
import { PageProps } from "fresh/server.ts";

export default function NotFound({ params }: PageProps) {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Path: {params.pathname}</p>
    </div>
  );
}
```

### Optional Parameters
Create `routes/search/[[query]].tsx`:
```typescript
import { PageProps } from "fresh/server.ts";

export default function SearchPage({ params }: PageProps) {
  const query = params.query || "";

  return (
    <div>
      <h1>Search</h1>
      <p>Query: {query || "No query provided"}</p>
    </div>
  );
}
```

---

## Islands

### Creating Islands
Create `islands/Counter.tsx`:
```typescript
import { useState } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
```

### Using Islands in Pages
Create `routes/index.tsx`:
```typescript
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is static content (no JavaScript)</p>
      <Counter /> {/* This island has interactivity */}
    </div>
  );
}
```

### Islands with Props
Create `islands/UserForm.tsx`:
```typescript
import { useState } from "preact/hooks";

interface UserFormProps {
  defaultName?: string;
  onSubmit?: (name: string) => void;
}

export default function UserForm({ defaultName = "", onSubmit }: UserFormProps) {
  const [name, setName] = useState(defaultName);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (onSubmit) onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName((e.target as HTMLInputElement).value)}
        placeholder="Enter name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Routes and Handlers

### Server-Side Handler
Create `routes/data.ts`:
```typescript
import { Handler } from "fresh/server.ts";

export const handler: Handler = (req, ctx) => {
  return new Response(JSON.stringify({ message: "Hello" }), {
    headers: { "Content-Type": "application/json" },
  });
};
```

### Combined Routes and Handlers
Create `routes/api/items.tsx`:
```typescript
import { Handler } from "fresh/server.ts";

// This handles GET requests to /api/items
export const handler: Handler = async (req, ctx) => {
  if (req.method === "GET") {
    return new Response(JSON.stringify({ items: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

// This is the page component (for GET requests)
export default function ItemsPage() {
  return <div>Items Page</div>;
}
```

---

## API Routes

### JSON API
Create `routes/api/users.ts`:
```typescript
import { Handler } from "fresh/server.ts";

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

export const handler: Handler = async (req, ctx) => {
  if (req.method === "GET") {
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const newUser: User = {
      id: users.length + 1,
      ...body,
    };
    users.push(newUser);

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};
```

### Dynamic API Routes
Create `routes/api/users/[id].ts`:
```typescript
import { Handler } from "fresh/server.ts";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

export const handler: Handler = async (req, ctx) => {
  const userId = parseInt(ctx.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (req.method === "GET") {
    return new Response(JSON.stringify(user), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "PUT") {
    const body = await req.json();
    Object.assign(user, body);

    return new Response(JSON.stringify(user), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "DELETE") {
    const index = users.findIndex((u) => u.id === userId);
    if (index > -1) users.splice(index, 1);

    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};
```

---

## State Management

### Passing Data to Islands
Create `routes/counter.tsx`:
```typescript
import Counter from "../islands/Counter.tsx";

export default function CounterPage() {
  return (
    <div>
      <h1>Counter Example</h1>
      <Counter initialValue={0} />
    </div>
  );
}
```

Create `islands/Counter.tsx`:
```typescript
import { useState } from "preact/hooks";

interface CounterProps {
  initialValue?: number;
}

export default function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### Context for Global State
Create `routes/_app.tsx`:
```typescript
import { AppProps } from "fresh/server.ts";
import { createContext } from "preact";

interface AppState {
  theme: "light" | "dark";
}

export const AppContext = createContext<AppState>({ theme: "light" });

export default function App({ Component }: AppProps) {
  return (
    <AppContext.Provider value={{ theme: "light" }}>
      <Component />
    </AppContext.Provider>
  );
}
```

---

## Database Integration

### MongoDB Example
Create `utils/db.ts`:
```typescript
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const client = new MongoClient();

interface User {
  _id?: { $oid: string };
  name: string;
  email: string;
}

export async function getUser(id: string): Promise<User | null> {
  await client.connect("mongodb://localhost:27017");
  const db = client.database("myapp");
  const user = await db.collection("users").findOne({ _id: { $oid: id } });
  await client.close();
  return user;
}

export async function getAllUsers(): Promise<User[]> {
  await client.connect("mongodb://localhost:27017");
  const db = client.database("myapp");
  const users = await db.collection("users").find({}).toArray();
  await client.close();
  return users;
}

export async function createUser(user: User): Promise<string> {
  await client.connect("mongodb://localhost:27017");
  const db = client.database("myapp");
  const id = await db.collection("users").insertOne(user);
  await client.close();
  return id;
}
```

### Using in Routes
```typescript
import { Handler } from "fresh/server.ts";
import { getAllUsers, getUser } from "../../utils/db.ts";

export const handler: Handler = async (req, ctx) => {
  if (req.method === "GET") {
    const users = await getAllUsers();
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};
```

---

## Styling

### Inline Styles
```typescript
export default function Styled() {
  return (
    <div style={{ color: "red", fontSize: "20px" }}>
      Styled with inline styles
    </div>
  );
}
```

### CSS Classes
Create `static/style.css`:
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

Use in component:
```typescript
export default function Styled() {
  return (
    <div class="container">
      <button class="button">Click me</button>
    </div>
  );
}
```

### Tailwind CSS
Create `deno.json`:
```json
{
  "imports": {
    "tailwindcss": "npm:tailwindcss@3.3.0",
    "tailwindcss/": "npm:tailwindcss@3.3.0/"
  }
}
```

Use in components:
```typescript
export default function Tailwind() {
  return (
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 class="text-4xl font-bold text-gray-900">Welcome</h1>
      <button class="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Click me
      </button>
    </div>
  );
}
```

---

## Error Handling

### Error Page
Create `routes/_error.tsx`:
```typescript
import { ErrorPageProps } from "fresh/server.ts";

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

### Try-Catch in Handlers
```typescript
export const handler: Handler = async (req, ctx) => {
  try {
    const body = await req.json();
    // Process body
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
```

---

## Testing

### Component Testing
Create `test.tsx`:
```typescript
import { assertEquals } from "https://deno.land/std@0.208.0/testing/asserts.ts";
import { render } from "https://esm.sh/preact";

interface CounterProps {
  count: number;
}

function Counter({ count }: CounterProps) {
  return <div>Count: {count}</div>;
}

Deno.test("Counter renders count", () => {
  const html = render(<Counter count={5} />);
  assertEquals(html, "<div>Count: 5</div>");
});
```

---

## Deployment

### Deploy to Deno Deploy
```bash
# Install deployctl
deno install --allow-all --no-check -r -f https://deno.land/x/deployctl/deployctl.ts

# Deploy
deployctl deploy --project=my-project main.ts
```

### Environment Variables
Create `.env`:
```
DATABASE_URL=mongodb://localhost:27017
API_KEY=secret-key
```

Access in code:
```typescript
const dbUrl = Deno.env.get("DATABASE_URL");
```

---

## Best Practices

### 1. File Structure
```
my-fresh-app/
├── routes/
│   ├── _app.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── about.tsx
│   └── api/
│       ├── users.ts
│       └── items.ts
├── islands/
│   ├── Counter.tsx
│   └── UserForm.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Nav.tsx
├── utils/
│   ├── db.ts
│   └── validation.ts
├── static/
│   ├── style.css
│   └── logo.svg
├── deno.json
├── main.ts
└── README.md
```

### 2. Component Reusability
```typescript
// components/Button.tsx
interface ButtonProps {
  label: string;
  onClick?: (e: Event) => void;
  variant?: "primary" | "secondary";
}

export default function Button({ 
  label, 
  onClick, 
  variant = "primary" 
}: ButtonProps) {
  const styles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-900",
  };

  return (
    <button 
      class={`px-4 py-2 rounded ${styles[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

### 3. Data Fetching
```typescript
import { PageProps } from "fresh/server.ts";

interface User {
  id: number;
  name: string;
}

export default async function UsersPage({ params }: PageProps) {
  const response = await fetch("https://api.example.com/users");
  const users: User[] = await response.json();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Resources

### Official Documentation
- [Fresh Official Guide](https://fresh.deno.dev)
- [Fresh GitHub](https://github.com/denoland/fresh)

### Learning
- [Fresh Examples](https://fresh.deno.dev/docs/examples)
- [Preact Documentation](https://preactjs.com)

### Community
- [Deno Discord](https://discord.gg/deno)
- [Fresh Discussions](https://github.com/denoland/fresh/discussions)

---

## Summary

Fresh is a revolutionary full-stack framework bringing Next.js-like experience to Deno with better performance and developer experience.

✅ File-based routing  
✅ Islands architecture (zero JS by default)  
✅ Full TypeScript support  
✅ Server-side rendering  
✅ Deno security model  
✅ Minimal bundle sizes  

Perfect for building modern web applications with Deno.

**Happy building with Fresh! 🎉**

