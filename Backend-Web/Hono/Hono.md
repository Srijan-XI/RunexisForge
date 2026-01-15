# Hono

## Introduction

Hono is a small, fast web framework that can run on multiple runtimes (Node.js, Bun, Deno, Cloudflare Workers, and more). It’s a great choice when you want a consistent API across platforms, especially for edge/serverless deployments.

---

## Table of Contents

- [What is Hono?](#what-is-hono)
- [When to Use Hono](#when-to-use-hono)
- [Install / Create Project](#install--create-project)
- [Hello World (Multi-runtime)](#hello-world-multi-runtime)
- [Routing](#routing)
- [Middleware](#middleware)
- [Validation (Zod)](#validation-zod)
- [Authentication (JWT)](#authentication-jwt)
- [CORS, Rate Limiting, Security](#cors-rate-limiting-security)
- [Error Handling](#error-handling)
- [Database & Storage Patterns](#database--storage-patterns)
- [Testing](#testing)
- [Deployment Targets](#deployment-targets)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## What is Hono?

Hono provides:

- A tiny Express-like router API
- First-class support for edge/serverless runtimes
- Built-in request context (`c`) with helpers like `c.json()`, `c.text()`, `c.req.param()`
- Strong TypeScript ergonomics

---

## When to Use Hono

Use Hono when you want:

- A single framework that can target **Node/Bun/Deno** and **edge runtimes**
- A minimal API surface with high performance
- A great fit for API gateways, serverless handlers, and small/medium APIs

Consider alternatives when:

- You need an opinionated full-stack server framework with SSR (Next.js/Remix/Fresh)
- You want a big middleware ecosystem or classic Node patterns (Express)

---

## Install / Create Project

Hono offers starters for common environments.

### Create a project

```bash
npm create hono@latest
# or
pnpm create hono@latest
# or
bun create hono@latest
```

Choose a template (Node/Bun/Deno/Cloudflare Workers) based on your target.

### Install in an existing project

```bash
npm install hono
```

---

## Hello World (Multi-runtime)

### Core app

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono'))

export default app
```

### Run on Node.js

```bash
npm install @hono/node-server
```

```ts
import { serve } from '@hono/node-server'
import app from './app'

serve({ fetch: app.fetch, port: 3000 })
console.log('Listening on http://localhost:3000')
```

### Run on Bun

```ts
import app from './app'

Bun.serve({
  port: 3000,
  fetch: app.fetch
})

console.log('Listening on http://localhost:3000')
```

### Run on Deno

```ts
import app from './app'

Deno.serve(app.fetch)
```

### Run on Cloudflare Workers

Workers use `export default { fetch: app.fetch }` style:

```ts
import app from './app'

export default {
  fetch: app.fetch
}
```

---

## Routing

### Path params

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id })
})

export default app
```

### Query params

```ts
app.get('/search', (c) => {
  const q = c.req.query('q') ?? ''
  return c.json({ q })
})
```

### Route groups

```ts
const api = new Hono()

api.get('/health', (c) => c.json({ ok: true }))
api.get('/version', (c) => c.json({ version: '1.0.0' }))

const app = new Hono()
app.route('/api', api)

export default app
```

---

## Middleware

Middleware runs in order.

### Logger

```ts
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()
app.use('*', logger())

app.get('/', (c) => c.text('ok'))
export default app
```

### CORS

```ts
import { cors } from 'hono/cors'

app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
)
```

### Custom middleware

```ts
app.use('/api/*', async (c, next) => {
  const start = Date.now()
  await next()
  c.header('x-response-ms', String(Date.now() - start))
})
```

---

## Validation (Zod)

A common pattern is using Zod with Hono’s validator middleware.

```bash
npm install zod @hono/zod-validator
```

```ts
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

app.post(
  '/users',
  zValidator('json', createUserSchema),
  async (c) => {
    const body = c.req.valid('json')
    return c.json({ created: true, user: body }, 201)
  }
)

export default app
```

---

## Authentication (JWT)

```bash
npm install hono
```

Hono includes a JWT middleware utility.

```ts
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'

const app = new Hono()

app.get('/private', jwt({ secret: process.env.JWT_SECRET ?? 'dev-secret' }), (c) => {
  // If token is valid, request continues.
  return c.json({ ok: true })
})

export default app
```

Login/issue tokens is typically done in a custom endpoint using a JWT library that works on your chosen runtime.

---

## CORS, Rate Limiting, Security

- Use `hono/cors` for CORS.
- Add rate limiting at the edge (Cloudflare/WAF/API gateway) or via middleware.
- Prefer environment variables/secrets, never hardcode.

---

## Error Handling

### Global error handler

```ts
import { Hono } from 'hono'

const app = new Hono()

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: err.message }, 500)
})

app.notFound((c) => c.json({ error: 'Not Found' }, 404))

export default app
```

---

## Database & Storage Patterns

Hono doesn’t impose an ORM. The best choice depends on runtime:

- **Node.js**: Prisma, Drizzle, Knex, pg
- **Bun**: many Node libs work; prefer runtime-compatible drivers
- **Deno**: Deno-friendly clients or HTTP APIs
- **Cloudflare Workers**: D1 (SQLite), KV, R2, Durable Objects

### Pattern: dependency injection via closure

```ts
type Db = {
  getUser(id: string): Promise<{ id: string; name: string } | null>
}

const createApp = (db: Db) => {
  const app = new Hono()

  app.get('/users/:id', async (c) => {
    const user = await db.getUser(c.req.param('id'))
    if (!user) return c.json({ error: 'Not found' }, 404)
    return c.json(user)
  })

  return app
}

export { createApp }
```

---

## Testing

Hono supports request simulation without a real server using `app.request()`.

```ts
import { describe, expect, it } from 'vitest'
import { Hono } from 'hono'

const app = new Hono().get('/health', (c) => c.json({ ok: true }))

describe('health', () => {
  it('returns ok', async () => {
    const res = await app.request('/health')
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })
})
```

---

## Deployment Targets

### Node (container)

- Use `@hono/node-server`.
- Containerize with `node:20-alpine`.

### Bun (container)

- Use Bun image and `Bun.serve()`.

### Deno

- Run with `Deno.serve(app.fetch)`.

### Cloudflare Workers

- Export `{ fetch: app.fetch }`.
- Use Wrangler for deployment.

---

## Best Practices

- Keep runtime-specific code isolated behind interfaces
- Prefer schema validation (Zod) for all external inputs
- Use `app.route('/api', api)` to organize versioned APIs
- Avoid large middleware chains; keep them focused
- Centralize errors via `app.onError()` and `app.notFound()`

---

## Resources

- Hono: https://hono.dev
- Templates: https://github.com/honojs
- Cloudflare Workers: https://developers.cloudflare.com/workers/

