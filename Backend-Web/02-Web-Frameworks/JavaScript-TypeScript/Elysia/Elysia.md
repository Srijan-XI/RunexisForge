# Elysia

## Introduction

Elysia is a fast, type-safe web framework designed primarily for the **Bun** runtime. It focuses on end-to-end TypeScript type inference, a small ergonomic API, and excellent performance.

> If you’re new to Bun, start with Bun basics first; Elysia builds on Bun’s runtime APIs.

---

## Table of Contents

- [What is Elysia?](#what-is-elysia)
- [When to Use Elysia](#when-to-use-elysia)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Hello World](#hello-world)
- [Routing Basics](#routing-basics)
- [Request/Response Patterns](#requestresponse-patterns)
- [Validation & Type Inference](#validation--type-inference)
- [Middleware, Hooks, and Plugins](#middleware-hooks-and-plugins)
- [State, Decorators, and Derived Context](#state-decorators-and-derived-context)
- [Cookies, Sessions, and JWT](#cookies-sessions-and-jwt)
- [CORS and Security Headers](#cors-and-security-headers)
- [OpenAPI / Swagger](#openapi--swagger)
- [Error Handling](#error-handling)
- [Database Integration Patterns](#database-integration-patterns)
- [Testing](#testing)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## What is Elysia?

Elysia is a Bun-first framework that provides:

- **Type inference** from validation schemas to handlers
- **Hooks** and **plugins** for composition
- A lightweight approach to building **REST APIs**
- Strong developer ergonomics for TypeScript

---

## When to Use Elysia

Use Elysia when you want:

- A **Bun-native** backend with excellent throughput
- Type-safe request parsing/validation (without a lot of boilerplate)
- A modern, minimal, composable API

Consider alternatives when:

- You must run on Node-only environments with no Bun support
- You need an older, very large ecosystem of middleware (Express)
- You want full-stack server rendering frameworks (Next.js, Remix, etc.)

---

## Prerequisites

- Bun installed (`bun --version`)
- TypeScript familiarity

---

## Install

### Create a new project

```bash
mkdir elysia-api
cd elysia-api
bun init -y
bun add elysia
```

### TypeScript setup (recommended)

```bash
bun add -d typescript
```

Create `tsconfig.json` (minimal):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

## Hello World

Create `src/index.ts`:

```ts
import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Hello from Elysia + Bun')
  .listen(3000)

console.log(`Listening on http://localhost:${app.server?.port}`)
```

Run:

```bash
bun run src/index.ts
```

---

## Routing Basics

### Path params

```ts
import { Elysia } from 'elysia'

new Elysia()
  .get('/users/:id', ({ params }) => ({ id: params.id }))
  .listen(3000)
```

### Query params

```ts
new Elysia()
  .get('/search', ({ query }) => ({ q: query.q ?? '' }))
  .listen(3000)
```

### Grouping

```ts
const app = new Elysia()

app.group('/api', (api) =>
  api
    .get('/health', () => ({ ok: true }))
    .get('/version', () => ({ version: '1.0.0' }))
)

app.listen(3000)
```

---

## Request/Response Patterns

### JSON responses

```ts
new Elysia()
  .get('/json', () => ({ hello: 'world' }))
  .listen(3000)
```

### Setting status codes

```ts
new Elysia()
  .get('/teapot', ({ set }) => {
    set.status = 418
    return { error: 'I am a teapot' }
  })
  .listen(3000)
```

### Headers

```ts
new Elysia()
  .get('/headers', ({ set }) => {
    set.headers['x-powered-by'] = 'elysia'
    return { ok: true }
  })
  .listen(3000)
```

---

## Validation & Type Inference

Elysia supports schema-based validation (commonly via its `t` helper). This improves runtime safety and gives TypeScript better types.

### Validate request body

```ts
import { Elysia, t } from 'elysia'

new Elysia()
  .post(
    '/users',
    ({ body }) => {
      // body is typed from schema
      return { created: true, user: body }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: 'email' })
      })
    }
  )
  .listen(3000)
```

### Validate params

```ts
import { Elysia, t } from 'elysia'

new Elysia()
  .get(
    '/users/:id',
    ({ params }) => ({ id: params.id }),
    {
      params: t.Object({
        id: t.String({ minLength: 1 })
      })
    }
  )
  .listen(3000)
```

---

## Middleware, Hooks, and Plugins

Elysia encourages composition using hooks and plugins.

### Global hook example

```ts
import { Elysia } from 'elysia'

const app = new Elysia()

app.onRequest(({ request }) => {
  console.log('Incoming:', request.method, request.url)
})

app.get('/', () => 'ok')
app.listen(3000)
```

### Plugin pattern

```ts
import { Elysia } from 'elysia'

const timing = new Elysia({ name: 'timing' })
  .derive(() => {
    const start = performance.now()
    return {
      elapsed: () => performance.now() - start
    }
  })

new Elysia()
  .use(timing)
  .get('/time', ({ elapsed }) => ({ ms: elapsed() }))
  .listen(3000)
```

---

## State, Decorators, and Derived Context

### Shared state

```ts
import { Elysia } from 'elysia'

const app = new Elysia()
  .state('build', '2026-01-15')
  .get('/build', ({ store }) => ({ build: store.build }))
  .listen(3000)
```

### Decorate context

```ts
import { Elysia } from 'elysia'

new Elysia()
  .decorate('sayHi', (name: string) => `Hi ${name}`)
  .get('/hi/:name', ({ params, sayHi }) => sayHi(params.name))
  .listen(3000)
```

---

## Cookies, Sessions, and JWT

Elysia has an ecosystem of official plugins.

### Cookies

```bash
bun add @elysiajs/cookie
```

```ts
import { Elysia } from 'elysia'
import { cookie } from '@elysiajs/cookie'

new Elysia()
  .use(cookie())
  .get('/set', ({ cookie }) => {
    cookie.session.set({ value: 'abc123', httpOnly: true })
    return { ok: true }
  })
  .get('/read', ({ cookie }) => ({ session: cookie.session.value ?? null }))
  .listen(3000)
```

### JWT

```bash
bun add @elysiajs/jwt
```

```ts
import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'

const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET ?? 'dev-secret'
    })
  )
  .post('/login', async ({ jwt }) => {
    const token = await jwt.sign({ sub: 'user_1' })
    return { token }
  })
  .get('/me', async ({ jwt, request, set }) => {
    const auth = request.headers.get('authorization')
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null

    if (!token) {
      set.status = 401
      return { error: 'Missing token' }
    }

    const payload = await jwt.verify(token)
    if (!payload) {
      set.status = 401
      return { error: 'Invalid token' }
    }

    return { userId: payload.sub }
  })

app.listen(3000)
```

---

## CORS and Security Headers

### CORS

```bash
bun add @elysiajs/cors
```

```ts
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true
    })
  )
  .get('/ok', () => ({ ok: true }))
  .listen(3000)
```

Security headers are often best handled at the reverse proxy (Caddy/Nginx) or via a small custom middleware.

---

## OpenAPI / Swagger

```bash
bun add @elysiajs/swagger
```

```ts
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'

new Elysia()
  .use(swagger())
  .get('/health', () => ({ ok: true }))
  .post('/users', ({ body }) => body, {
    body: t.Object({ name: t.String() })
  })
  .listen(3000)
```

---

## Error Handling

### Global error handler

```ts
import { Elysia } from 'elysia'

new Elysia()
  .onError(({ code, error, set }) => {
    set.status = 500
    return {
      code,
      message: error.message
    }
  })
  .get('/boom', () => {
    throw new Error('Something went wrong')
  })
  .listen(3000)
```

---

## Database Integration Patterns

Elysia doesn’t force an ORM. You can:

- Use an ORM (Prisma, Drizzle)
- Use query builders
- Use native drivers

### Pattern: inject a DB client via decorate

```ts
import { Elysia } from 'elysia'

type Db = {
  getUserById(id: string): Promise<{ id: string; name: string } | null>
}

const db: Db = {
  async getUserById(id) {
    return { id, name: 'Demo' }
  }
}

new Elysia()
  .decorate('db', db)
  .get('/users/:id', async ({ params, db, set }) => {
    const user = await db.getUserById(params.id)
    if (!user) {
      set.status = 404
      return { error: 'Not found' }
    }
    return user
  })
  .listen(3000)
```

---

## Testing

Bun includes a test runner (`bun test`). A practical strategy is to test handlers via `app.handle(new Request(...))`.

```ts
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

const app = new Elysia().get('/health', () => ({ ok: true }))

describe('health', () => {
  it('returns ok', async () => {
    const res = await app.handle(new Request('http://localhost/health'))
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json.ok).toBe(true)
  })
})
```

Run:

```bash
bun test
```

---

## Deployment

### Docker (Bun)

`Dockerfile` example:

```dockerfile
FROM oven/bun:1

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
```

Build & run:

```bash
docker build -t elysia-api .
docker run -p 3000:3000 --env JWT_SECRET=change-me elysia-api
```

---

## Best Practices

- Prefer schema validation for external inputs (body/params/query)
- Keep handlers small; push business logic into services
- Use `.group('/api', ...)` to version routes (e.g., `/api/v1`)
- Centralize error handling with `.onError(...)`
- Don’t hardcode secrets; use environment variables
- Add rate limiting at the edge (reverse proxy / API gateway)

---

## Resources

- Bun: https://bun.sh
- Elysia: https://elysiajs.com
- Official plugins: https://github.com/elysiajs

