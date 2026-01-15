# Oak

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Routing](#routing)
5. [Middleware](#middleware)
6. [Request/Response](#requestresponse)
7. [Context Object](#context-object)
8. [Error Handling](#error-handling)
9. [Static Files](#static-files)
10. [Database Integration](#database-integration)
11. [Authentication](#authentication)
12. [Testing](#testing)
13. [Project Structure](#project-structure)
14. [Best Practices](#best-practices)
15. [Resources](#resources)

---

## Introduction

Oak is a middleware framework for Deno inspired by Koa. It provides a clean abstraction for building web servers with a focus on middleware composition and Deno's secure-by-default approach.

### Key Features
- **Middleware-based architecture**: Compose middleware functions
- **Built on Deno**: Uses Deno's native modules and security model
- **Type-safe**: Full TypeScript support
- **Router support**: Advanced routing capabilities
- **Context object**: Request and response handled through context
- **Error handling**: Built-in error handling patterns
- **Cookie support**: Automatic cookie handling
- **CORS**: Built-in CORS middleware available

### Why Oak?
- Clean, modern API
- Deno-native (no Node.js baggage)
- Middleware composition pattern
- Type-safe request/response handling
- Small and focused framework
- Excellent for APIs and SPAs

---

## Installation

### Setup
Create `deno.json`:
```json
{
  "imports": {
    "oak": "https://deno.land/x/oak@v13.2.4/mod.ts"
  },
  "tasks": {
    "dev": "deno run --allow-net --allow-read --allow-env main.ts",
    "test": "deno test --allow-all"
  }
}
```

### Permissions Required
```bash
# Network access (for server)
deno run --allow-net

# File access (for static files)
deno run --allow-net --allow-read

# Environment variables
deno run --allow-net --allow-env

# All permissions
deno run --allow-all
```

---

## Getting Started

### Simple Server
Create `main.ts`:
```typescript
import { Application } from "https://deno.land/x/oak@v13.2.4/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello, World!";
});

await app.listen({ port: 8000 });
console.log("Server running on http://localhost:8000");
```

Run:
```bash
deno task dev
```

### Hello JSON
```typescript
import { Application } from "https://deno.land/x/oak@v13.2.4/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = {
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  };
});

await app.listen({ port: 8000 });
```

### Multiple Routes (Basic)
```typescript
import { Application } from "https://deno.land/x/oak@v13.2.4/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  if (ctx.request.url.pathname === "/") {
    ctx.response.body = "Home Page";
  } else if (ctx.request.url.pathname === "/about") {
    ctx.response.body = "About Page";
  } else if (ctx.request.url.pathname === "/api/data") {
    ctx.response.body = { data: "Some data" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
  }
});

await app.listen({ port: 8000 });
```

---

## Routing

### Using Router
```typescript
import {
  Application,
  Router,
} from "https://deno.land/x/oak@v13.2.4/mod.ts";

const router = new Router();

// GET routes
router.get("/", (ctx) => {
  ctx.response.body = "Home Page";
});

router.get("/about", (ctx) => {
  ctx.response.body = "About Page";
});

// POST route
router.post("/users", async (ctx) => {
  const body = await ctx.request.body({ type: "json" });
  const data = await body.value;
  ctx.response.body = { created: data };
});

// DELETE route
router.delete("/users/:id", (ctx) => {
  const userId = ctx.params.id;
  ctx.response.body = { deleted: userId };
});

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
```

### Route Parameters
```typescript
const router = new Router();

// Single parameter
router.get("/users/:id", (ctx) => {
  const userId = ctx.params.id;
  ctx.response.body = { userId };
});

// Multiple parameters
router.get("/posts/:postId/comments/:commentId", (ctx) => {
  const postId = ctx.params.postId;
  const commentId = ctx.params.commentId;
  ctx.response.body = { postId, commentId };
});

// Optional parameters
router.get("/items/:id?", (ctx) => {
  const id = ctx.params.id;
  if (id) {
    ctx.response.body = { item: id };
  } else {
    ctx.response.body = { items: [] };
  }
});

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
```

### Query Parameters
```typescript
const router = new Router();

router.get("/search", (ctx) => {
  const query = ctx.request.url.searchParams.get("q");
  const limit = ctx.request.url.searchParams.get("limit");

  ctx.response.body = {
    query,
    limit: parseInt(limit || "10"),
  };
});

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
```

### All HTTP Methods
```typescript
const router = new Router();

router
  .get("/items", (ctx) => {
    ctx.response.body = { action: "get" };
  })
  .post("/items", (ctx) => {
    ctx.response.body = { action: "post" };
  })
  .put("/items/:id", (ctx) => {
    ctx.response.body = { action: "put", id: ctx.params.id };
  })
  .patch("/items/:id", (ctx) => {
    ctx.response.body = { action: "patch", id: ctx.params.id };
  })
  .delete("/items/:id", (ctx) => {
    ctx.response.body = { action: "delete", id: ctx.params.id };
  });

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
```

---

## Middleware

### Simple Middleware
```typescript
import {
  Application,
} from "https://deno.land/x/oak@v13.2.4/mod.ts";

const app = new Application();

// Logger middleware
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// Timer middleware
app.use(async (ctx, next) => {
  const start = performance.now();
  await next();
  const time = performance.now() - start;
  ctx.response.headers.set("X-Response-Time", `${time}ms`);
});

app.use((ctx) => {
  ctx.response.body = "Hello";
});

await app.listen({ port: 8000 });
```

### Middleware Pipeline
```typescript
const app = new Application();

// Middleware 1: Authentication
app.use(async (ctx, next) => {
  const token = ctx.request.headers.get("authorization");
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }
  await next();
});

// Middleware 2: Logging
app.use(async (ctx, next) => {
  console.log(`Request: ${ctx.request.method} ${ctx.request.url}`);
  await next();
  console.log(`Response: ${ctx.response.status}`);
});

// Handler
app.use((ctx) => {
  ctx.response.body = "Protected route";
});

await app.listen({ port: 8000 });
```

### CORS Middleware
```typescript
const app = new Application();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
    return;
  }

  await next();
});

app.use((ctx) => {
  ctx.response.body = "CORS enabled";
});

await app.listen({ port: 8000 });
```

### Custom Middleware
```typescript
interface Logger {
  log: (message: string) => void;
}

const loggerMiddleware = (logger: Logger) => {
  return async (ctx: any, next: any) => {
    logger.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
  };
};

const app = new Application();

const logger: Logger = {
  log: (message) => console.log(`[LOG] ${message}`),
};

app.use(loggerMiddleware(logger));

app.use((ctx) => {
  ctx.response.body = "Hello";
});

await app.listen({ port: 8000 });
```

---

## Context Object

### Accessing Request Info
```typescript
app.use((ctx) => {
  // URL and method
  const url = ctx.request.url.pathname;
  const method = ctx.request.method;

  // Headers
  const contentType = ctx.request.headers.get("content-type");

  // Query string
  const search = ctx.request.url.search;

  // IP address
  const ip = ctx.request.ip;

  ctx.response.body = {
    url,
    method,
    contentType,
    ip,
  };
});
```

### Reading Request Body
```typescript
app.use(async (ctx) => {
  if (ctx.request.method === "POST") {
    // JSON body
    const body = await ctx.request.body({ type: "json" });
    const data = await body.value;
    ctx.response.body = { received: data };

    // Text body
    // const body = await ctx.request.body({ type: "text" });
    // const text = await body.value;

    // Form data
    // const body = await ctx.request.body({ type: "form" });
    // const formData = await body.value;
  }
});
```

### Setting Response
```typescript
app.use((ctx) => {
  // Status
  ctx.response.status = 200;

  // Headers
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.headers.set("X-Custom", "value");

  // Body
  ctx.response.body = { message: "Success" };
});
```

### Cookies
```typescript
app.use((ctx) => {
  // Read cookie
  const sessionId = ctx.cookies.get("sessionId");

  // Set cookie
  ctx.cookies.set("userId", "123", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    maxAge: 3600,
  });

  ctx.response.body = { sessionId };
});
```

---

## Error Handling

### Try-Catch in Routes
```typescript
const router = new Router();

router.post("/users", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" });
    const data = await body.value;

    if (!data.name) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Name required" };
      return;
    }

    ctx.response.status = 201;
    ctx.response.body = { created: data };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = { error: error.message };
  }
});

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
```

### Error Middleware
```typescript
const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
});

app.use((ctx) => {
  if (ctx.request.url.pathname === "/error") {
    throw new Error("Test error");
  }
  ctx.response.body = "OK";
});

await app.listen({ port: 8000 });
```

### Custom Error Handler
```typescript
interface AppError extends Error {
  status: number;
  code: string;
}

const createError = (
  status: number,
  code: string,
  message: string
): AppError => {
  const error = new Error(message) as AppError;
  error.status = status;
  error.code = code;
  return error;
};

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const appError = error as AppError;
    ctx.response.status = appError.status || 500;
    ctx.response.body = {
      code: appError.code || "INTERNAL_ERROR",
      message: appError.message,
    };
  }
});

const router = new Router();

router.get("/item/:id", (ctx) => {
  if (!ctx.params.id) {
    throw createError(400, "INVALID_ID", "ID is required");
  }
  ctx.response.body = { id: ctx.params.id };
});

app.use(router.routes());

await app.listen({ port: 8000 });
```

---

## Static Files

### Serve Static Files
```typescript
import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v13.2.4/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: "./public",
      index: "index.html",
    });
  } catch (e) {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
  }
});

await app.listen({ port: 8000 });
```

### Specific Routes with Static
```typescript
const app = new Application();
const router = new Router();

// API routes
router.get("/api/data", (ctx) => {
  ctx.response.body = { data: "test" };
});

app.use(router.routes());

// Static files
app.use(async (ctx) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: "./public",
    });
  } catch (e) {
    ctx.response.status = 404;
  }
});

await app.listen({ port: 8000 });
```

---

## Database Integration

### MongoDB Example
```typescript
import {
  Application,
  Router,
} from "https://deno.land/x/oak@v13.2.4/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const client = new MongoClient();

interface User {
  _id: { $oid: string };
  name: string;
  email: string;
}

const app = new Application();
const router = new Router();

router.get("/users", async (ctx) => {
  await client.connect("mongodb://localhost:27017");
  const db = client.database("myapp");
  const users = await db.collection("users").find({}) as User[];

  ctx.response.body = users;
});

router.post("/users", async (ctx) => {
  const body = await ctx.request.body({ type: "json" });
  const data = await body.value;

  await client.connect("mongodb://localhost:27017");
  const db = client.database("myapp");
  const result = await db.collection("users").insertOne(data);

  ctx.response.status = 201;
  ctx.response.body = { id: result };
});

app.use(router.routes());

await app.listen({ port: 8000 });
```

---

## Authentication

### Token Authentication
```typescript
const app = new Application();
const router = new Router();

const validateToken = (token: string): boolean => {
  // Simple validation (use JWT in production)
  return token.length > 10;
};

// Protected middleware
app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/api/")) {
    const token = ctx.request.headers.get("authorization");

    if (!token || !validateToken(token)) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }
  }

  await next();
});

router.get("/public", (ctx) => {
  ctx.response.body = { message: "Public endpoint" };
});

router.get("/api/protected", (ctx) => {
  ctx.response.body = { message: "Protected endpoint" };
});

app.use(router.routes());

await app.listen({ port: 8000 });
```

---

## Testing

### Simple Test
Create `test.ts`:
```typescript
import {
  assertEquals,
} from "https://deno.land/std@0.208.0/testing/asserts.ts";

Deno.test("Basic test", () => {
  assertEquals(1 + 1, 2);
});
```

### HTTP Test
```typescript
import {
  assertEquals,
} from "https://deno.land/std@0.208.0/testing/asserts.ts";
import {
  Application,
} from "https://deno.land/x/oak@v13.2.4/mod.ts";

Deno.test("GET /", async () => {
  const app = new Application();

  app.use((ctx) => {
    ctx.response.body = "Hello";
  });

  const server = app.listen({ port: 8001 });

  const response = await fetch("http://localhost:8001/");
  const text = await response.text();

  assertEquals(response.status, 200);
  assertEquals(text, "Hello");
});
```

---

## Project Structure

```
my-oak-app/
├── deno.json
├── main.ts                # Entry point
├── routes/
│   ├── api.ts             # API routes
│   ├── users.ts           # User routes
│   └── posts.ts           # Post routes
├── middleware/
│   ├── auth.ts            # Auth middleware
│   ├── cors.ts            # CORS middleware
│   └── logger.ts          # Logger middleware
├── handlers/
│   ├── userHandler.ts
│   └── postHandler.ts
├── models/
│   ├── user.ts
│   └── post.ts
├── utils/
│   ├── db.ts
│   └── validation.ts
├── public/                # Static files
│   ├── index.html
│   └── style.css
├── tests/
│   ├── api.test.ts
│   └── routes.test.ts
└── README.md
```

---

## Best Practices

### 1. Modular Routes
```typescript
// routes/users.ts
export const userRoutes = (router: Router) => {
  router.get("/users", (ctx) => {
    ctx.response.body = { users: [] };
  });

  router.post("/users", async (ctx) => {
    const body = await ctx.request.body({ type: "json" });
    ctx.response.body = { created: body.value };
  });
};

// main.ts
import { userRoutes } from "./routes/users.ts";

const router = new Router();
userRoutes(router);
app.use(router.routes());
```

### 2. Error Handling
```typescript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal Server Error" };
  }
});
```

### 3. Environment Variables
```typescript
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

const env = await load();
const port = parseInt(env["PORT"] || "8000");
const dbUrl = env["DB_URL"] || "mongodb://localhost";
```

### 4. Request Validation
```typescript
const validateUser = (data: any): boolean => {
  return (
    data.name &&
    typeof data.name === "string" &&
    data.email &&
    typeof data.email === "string"
  );
};

router.post("/users", async (ctx) => {
  const body = await ctx.request.body({ type: "json" });
  const data = await body.value;

  if (!validateUser(data)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid user data" };
    return;
  }

  ctx.response.body = { created: data };
});
```

---

## Resources

### Official Documentation
- [Oak GitHub](https://github.com/oakserver/oak)
- [Oak Documentation](https://oakserver.github.io/oak/)

### Community
- [Deno Discord](https://discord.gg/deno)
- [Oak Examples](https://github.com/oakserver/oak/tree/main/examples)

### Related
- [Deno Guide](./Deno/Deno.md)
- [Fresh Guide](./Fresh/Fresh.md)

---

## Summary

Oak provides a clean, middleware-based approach to building web servers in Deno. Key takeaways:

✅ Middleware composition pattern  
✅ Type-safe routing  
✅ Built on Deno's secure foundation  
✅ Excellent for APIs and SPAs  
✅ Clean context-based request/response  

Perfect for developers familiar with Express or Koa looking to embrace Deno.

**Happy building with Oak! 🦆**

