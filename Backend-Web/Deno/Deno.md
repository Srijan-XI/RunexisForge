# Deno

## Introduction

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Core Concepts](#core-concepts)
5. [HTTP Server Basics](#http-server-basics)
6. [Routing](#routing)
7. [Request/Response Handling](#requestresponse-handling)
8. [Middleware Pattern](#middleware-pattern)
9. [Working with Files](#working-with-files)
10. [Error Handling](#error-handling)
11. [Testing](#testing)
12. [Project Structure](#project-structure)
13. [Best Practices](#best-practices)
14. [Resources](#resources)

---

## Introduction

Deno is a simple, modern, and secure runtime for JavaScript and TypeScript. Created by Ryan Dahl (original creator of Node.js), Deno addresses many of Node.js's design issues.

### Key Features
- **Secure by default**: No file, network, or environment access without explicit permission
- **TypeScript support**: Native TypeScript support without configuration
- **ES modules**: Only uses ES modules (no CommonJS)
- **Decentralized packages**: Import from any URL
- **Tooling built-in**: Formatter, linter, test runner, documentation generator
- **Standard library**: Comprehensive standard library for common tasks
- **Single executable**: Ships as a single executable file

### Why Deno?
- Modern JavaScript practices
- Better security model
- No package.json or node_modules
- Built-in TypeScript
- Standard library stability
- Cleaner module system

---

## Installation

### Windows
```powershell
# Using Chocolatey
choco install deno

# Using Scoop
scoop install deno

# Using PowerShell (direct download)
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

### macOS
```bash
# Using Homebrew
brew install deno

# Using MacPorts
sudo port install deno
```

### Linux
```bash
# Using curl
curl -fsSL https://deno.land/x/install/install.sh | sh

# Ubuntu/Debian
sudo apt-get install deno

# Fedora
sudo dnf install deno

# Arch Linux
sudo pacman -S deno
```

### Verify Installation
```bash
deno --version
deno --help
```

---

## Getting Started

### Your First Deno Program

Create `hello.ts`:
```typescript
console.log("Hello, Deno!");
```

Run it:
```bash
deno run hello.ts
```

### Your First HTTP Server

Create `server.ts`:
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

serve((req) => new Response("Hello World!\n"), { port: 8000 });

console.log("Server running on http://localhost:8000");
```

Run with permissions:
```bash
deno run --allow-net server.ts
```

Access: `http://localhost:8000`

### Permission Flags
```bash
# Network access
deno run --allow-net server.ts

# File system read
deno run --allow-read server.ts

# File system write
deno run --allow-write server.ts

# Environment variables
deno run --allow-env server.ts

# All permissions (use cautiously)
deno run --allow-all server.ts

# Grant specific permissions
deno run --allow-net=localhost:8000,example.com server.ts
```

---

## Core Concepts

### TypeScript by Default
Deno runs TypeScript without configuration:

```typescript
// types are checked automatically
function add(a: number, b: number): number {
  return a + b;
}

const result: number = add(5, 3);
console.log(result); // 8
```

### ES Modules
All modules are ES modules:

```typescript
// Import from URL
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// Relative imports
import { helper } from "./utils.ts";

// Named imports
import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts";
```

### Import Maps (Optional)
Create `deno.json`:
```json
{
  "imports": {
    "std/": "https://deno.land/std@0.208.0/",
    "http": "https://deno.land/std@0.208.0/http/server.ts"
  }
}
```

Use in code:
```typescript
import { serve } from "http";
```

### Deno Namespace
Access Deno-specific APIs:

```typescript
// Environment variables
const token = Deno.env.get("API_TOKEN");

// Command execution
const { success } = await Deno.run({
  cmd: ["echo", "Hello"],
}).status();

// File operations
const content = await Deno.readTextFile("file.txt");

// Write file
await Deno.writeTextFile("output.txt", "content");

// Current working directory
const cwd = Deno.cwd();

// Exit process
Deno.exit(0);
```

---

## HTTP Server Basics

### Simple HTTP Server
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  return new Response("Hello, World!");
};

serve(handler, { port: 8000 });
```

### With Status Codes
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  if (req.url === "/") {
    return new Response("Home", { status: 200 });
  } else if (req.url === "/notfound") {
    return new Response("Not Found", { status: 404 });
  }
  return new Response("OK");
};

serve(handler, { port: 8000 });
```

### JSON Responses
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  const data = {
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

serve(handler, { port: 8000 });
```

### Request Methods
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "GET") {
    return new Response("GET request");
  } else if (req.method === "POST") {
    const body = await req.text();
    return new Response(`Received: ${body}`);
  } else if (req.method === "PUT") {
    return new Response("PUT request");
  } else if (req.method === "DELETE") {
    return new Response("DELETE request");
  }
  
  return new Response("Method not allowed", { status: 405 });
};

serve(handler, { port: 8000 });
```

---

## Routing

### Manual Routing
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  const url = new URL(req.url, `http://${req.headers.get("host")}`);
  const pathname = url.pathname;

  if (pathname === "/") {
    return new Response("Home Page");
  } else if (pathname === "/about") {
    return new Response("About Page");
  } else if (pathname === "/contact") {
    return new Response("Contact Page");
  }

  return new Response("404 Not Found", { status: 404 });
};

serve(handler, { port: 8000 });
```

### Route with Path Parameters
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  const url = new URL(req.url, `http://${req.headers.get("host")}`);
  const pathname = url.pathname;

  // Match /users/:id
  const userMatch = pathname.match(/^\/users\/(\d+)$/);
  if (userMatch) {
    const userId = userMatch[1];
    return new Response(`User ID: ${userId}`);
  }

  return new Response("404 Not Found", { status: 404 });
};

serve(handler, { port: 8000 });
```

### Route with Query Parameters
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  const url = new URL(req.url, `http://${req.headers.get("host")}`);
  
  if (url.pathname === "/search") {
    const query = url.searchParams.get("q");
    return new Response(`Searching for: ${query}`);
  }

  return new Response("404 Not Found", { status: 404 });
};

serve(handler, { port: 8000 });
```

---

## Request/Response Handling

### Parse JSON Body
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "POST") {
    const body = await req.json();
    
    return new Response(JSON.stringify({
      received: body,
      status: "success"
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

serve(handler, { port: 8000 });
```

### Parse Form Data
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "POST") {
    const formData = await req.formData();
    const username = formData.get("username");
    
    return new Response(`Username: ${username}`);
  }

  return new Response("Method not allowed", { status: 405 });
};

serve(handler, { port: 8000 });
```

### Parse Text Body
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const text = await req.text();
  return new Response(`Received text: ${text}`);
};

serve(handler, { port: 8000 });
```

### Custom Response Headers
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Custom-Header": "value",
    "Access-Control-Allow-Origin": "*",
  });

  return new Response(JSON.stringify({ message: "Hello" }), { headers });
};

serve(handler, { port: 8000 });
```

---

## Middleware Pattern

### Simple Middleware
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

type Handler = (req: Request) => Response | Promise<Response>;

const logMiddleware = (handler: Handler): Handler => {
  return async (req: Request) => {
    console.log(`${req.method} ${req.url}`);
    return handler(req);
  };
};

const authMiddleware = (handler: Handler): Handler => {
  return async (req: Request) => {
    const token = req.headers.get("authorization");
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    return handler(req);
  };
};

const apiHandler = (req: Request): Response => {
  return new Response("Protected endpoint");
};

const handler = authMiddleware(logMiddleware(apiHandler));

serve(handler, { port: 8000 });
```

### Middleware Pipeline
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

type Middleware = (handler: any) => any;

const compose = (...middlewares: Middleware[]) => {
  return (handler: any) => {
    return middlewares.reduce((h, m) => m(h), handler);
  };
};

const logMiddleware = (handler: any) => {
  return async (req: Request) => {
    console.log(`${req.method} ${req.url}`);
    return handler(req);
  };
};

const corsMiddleware = (handler: any) => {
  return async (req: Request) => {
    const response = await handler(req);
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  };
};

const apiHandler = (req: Request): Response => {
  return new Response(JSON.stringify({ message: "Hello" }), {
    headers: { "Content-Type": "application/json" }
  });
};

const middleware = compose(logMiddleware, corsMiddleware);
const handler = middleware(apiHandler);

serve(handler, { port: 8000 });
```

---

## Working with Files

### Read File
```typescript
// Read text file
const content = await Deno.readTextFile("./data.txt");
console.log(content);

// Read file as bytes
const bytes = await Deno.readFile("./image.png");
console.log(bytes);

// Read entire directory
const files = Deno.readDir("./src");
for await (const file of files) {
  console.log(file.name);
}
```

### Write File
```typescript
// Write text file
await Deno.writeTextFile("output.txt", "Hello, World!");

// Write file from bytes
const bytes = new Uint8Array([72, 101, 108, 108, 111]);
await Deno.writeFile("output.bin", bytes);

// Append to file
const content = "\nNew line";
await Deno.writeTextFile("output.txt", content, { append: true });
```

### Delete File
```typescript
await Deno.remove("file.txt");

// Remove directory recursively
await Deno.remove("directory", { recursive: true });
```

### File Info
```typescript
const fileInfo = await Deno.stat("file.txt");
console.log(fileInfo.isFile);
console.log(fileInfo.isDirectory);
console.log(fileInfo.size);
console.log(fileInfo.mtime);
```

---

## Error Handling

### Try-Catch Blocks
```typescript
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  try {
    if (req.method === "POST") {
      const body = await req.json();
      
      if (!body.name) {
        return new Response("Name is required", { status: 400 });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response("Method not allowed", { status: 405 });
};

serve(handler, { port: 8000 });
```

### Custom Error Handler
```typescript
interface ApiError {
  code: string;
  message: string;
  status: number;
}

const createErrorResponse = (error: ApiError): Response => {
  return new Response(JSON.stringify(error), {
    status: error.status,
    headers: { "Content-Type": "application/json" }
  });
};

const handler = async (req: Request): Promise<Response> => {
  try {
    if (req.url.includes("/invalid")) {
      throw {
        code: "INVALID_ENDPOINT",
        message: "This endpoint does not exist",
        status: 404
      } as ApiError;
    }

    return new Response("OK");
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
};

serve(handler);
```

---

## Testing

### Built-in Test Framework
Create `test.ts`:
```typescript
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.208.0/testing/asserts.ts";

function add(a: number, b: number): number {
  return a + b;
}

Deno.test("Addition", () => {
  assertEquals(add(2, 3), 5);
});

Deno.test("Throws error", () => {
  assertThrows(() => {
    throw new Error("Test error");
  });
});
```

Run tests:
```bash
deno test test.ts
```

### API Testing Example
```typescript
import {
  assertEquals,
} from "https://deno.land/std@0.208.0/testing/asserts.ts";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const handler = (req: Request): Response => {
  if (req.url === "/api/users") {
    return new Response(JSON.stringify([{ id: 1, name: "John" }]), {
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response("Not found", { status: 404 });
};

Deno.test("GET /api/users", async () => {
  const server = serve(handler, { port: 8001 });
  
  const response = await fetch("http://localhost:8001/api/users");
  const data = await response.json();
  
  assertEquals(response.status, 200);
  assertEquals(data.length, 1);
  assertEquals(data[0].name, "John");
});
```

---

## Project Structure

### Typical Deno Project
```
my-deno-app/
├── deno.json              # Configuration
├── deno.lock              # Dependency lock file
├── main.ts                # Entry point
├── server.ts              # HTTP server
├── routes/
│   ├── api.ts             # API routes
│   └── static.ts          # Static routes
├── handlers/
│   ├── users.ts           # User handler
│   └── posts.ts           # Post handler
├── middleware/
│   ├── auth.ts            # Auth middleware
│   └── logger.ts          # Logger middleware
├── utils/
│   ├── db.ts              # Database utilities
│   └── helpers.ts         # Helper functions
├── tests/
│   ├── api.test.ts        # API tests
│   └── utils.test.ts      # Utils tests
└── README.md
```

### Deno Configuration File
`deno.json`:
```json
{
  "tasks": {
    "start": "deno run --allow-net --allow-read main.ts",
    "test": "deno test --allow-all",
    "lint": "deno lint",
    "format": "deno fmt"
  },
  "imports": {
    "std/": "https://deno.land/std@0.208.0/",
    "http": "https://deno.land/std@0.208.0/http/server.ts"
  }
}
```

Run tasks:
```bash
deno task start
deno task test
deno task lint
deno task format
```

---

## Best Practices

### 1. Security
```typescript
// Always be explicit with permissions
// deno run --allow-net --allow-read main.ts

// Avoid using --allow-all in production
// Instead, grant specific permissions
```

### 2. Module Versioning
```typescript
// Pin versions to ensure consistency
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// Use deno.lock to lock versions
// deno run --lock=deno.lock --lock-write main.ts
```

### 3. Error Handling
```typescript
const handler = async (req: Request): Promise<Response> => {
  try {
    // Handle request
    return new Response("Success");
  } catch (error) {
    console.error("Request error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
```

### 4. Environment Variables
```typescript
// Load from .env file
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

const env = await load();
const apiKey = env["API_KEY"];

// Or use Deno.env
const token = Deno.env.get("API_TOKEN");
```

### 5. Code Organization
```typescript
// Separate concerns
// - routes/
// - handlers/
// - middleware/
// - utils/
// - tests/

// Use index.ts for clean imports
// export { handler as default } from "./routes/api.ts";
```

### 6. Documentation
```typescript
/**
 * Handles HTTP requests
 * @param req - The incoming request
 * @returns Response object
 */
const handler = (req: Request): Response => {
  return new Response("OK");
};
```

---

## Resources

### Official Documentation
- [Deno Official Guide](https://docs.deno.com/)
- [Deno API Reference](https://deno.land/api)
- [Deno Standard Library](https://deno.land/std)

### Learning Resources
- [Deno by Example](https://examples.deno.land/)
- [Deno Fresh Guide](https://fresh.deno.dev)
- [YouTube Tutorials](https://www.youtube.com/results?search_query=deno+tutorial)

### Community
- [Deno Discord](https://discord.gg/deno)
- [Deno GitHub](https://github.com/denoland/deno)
- [Deno Forum](https://community.deno.com/)

### Related Frameworks
- **Fresh** - Full-stack framework built on Deno
- **Oak** - Middleware framework for Deno
- **Hono** - Ultra-lightweight web framework

---

## Summary

Deno provides a modern, secure alternative to Node.js with native TypeScript support and a better module system. Key takeaways:

✅ Native TypeScript support  
✅ Secure-by-default permission model  
✅ Built-in tooling (formatter, linter, tester)  
✅ Decentralized package management  
✅ ES modules only  
✅ Better standard library  

Start with simple HTTP servers, move to structured routing, and scale to full applications. Deno is excellent for new projects valuing developer experience and security.

**Happy coding with Deno! 🦕**

