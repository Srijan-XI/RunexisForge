# Koa

## Introduction

## Overview

**Koa** is a new web framework designed by the team behind Express. It aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. Koa uses async functions instead of callbacks.

### Key Features

- **Async/Await Native**: Fully embraces async functions
- **Minimal Core**: Small footprint, highly modular
- **Middleware System**: Elegant middleware pattern with `next()`
- **Context Object**: Single context object for request/response
- **Error Handling**: Centralized error handling
- **Lightweight**: Smaller than Express
- **Modern JavaScript**: Requires Node.js 7.6+

### Why Choose Koa?

✅ Modern async/await patterns  
✅ Minimal and elegant  
✅ Better error handling  
✅ Excellent middleware control  
✅ Perfect for learning  

---

## Installation

### Prerequisites
- Node.js (v7.6 or higher)
- npm

### Setup

```bash
# Create project
mkdir my-koa-app
cd my-koa-app

# Initialize npm
npm init -y

# Install Koa
npm install koa koa-router

# Install development tools
npm install -D nodemon
```

### package.json

```json
{
  "name": "my-koa-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "koa": "^2.14.2",
    "koa-router": "^12.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## Getting Started

### Basic Server

```javascript
// app.js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello, Koa!';
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
```

---

## Core Concepts

### 1. Routing

**Basic Router Setup**
```bash
npm install koa-router
```

```javascript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({ prefix: '/api' });

// GET
router.get('/users', async (ctx) => {
  ctx.body = { users: [] };
});

// POST
router.post('/users', async (ctx) => {
  ctx.body = { created: true };
});

// PUT
router.put('/users/:id', async (ctx) => {
  ctx.body = { id: ctx.params.id, updated: true };
});

// DELETE
router.delete('/users/:id', async (ctx) => {
  ctx.body = { id: ctx.params.id, deleted: true };
});

// PATCH
router.patch('/users/:id', async (ctx) => {
  ctx.body = { id: ctx.params.id, patched: true };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
```

**Route Parameters**
```javascript
// Single parameter
router.get('/users/:id', async (ctx) => {
  ctx.body = { userId: ctx.params.id };
});

// Multiple parameters
router.get('/posts/:postId/comments/:commentId', async (ctx) => {
  const { postId, commentId } = ctx.params;
  ctx.body = { postId, commentId };
});

// Optional parameters
router.get('/files/:fileName?', async (ctx) => {
  ctx.body = { fileName: ctx.params.fileName || 'default' };
});
```

**Query Parameters**
```javascript
// GET /search?q=javascript&limit=10
router.get('/search', async (ctx) => {
  const { q, limit } = ctx.query;
  ctx.body = { query: q, limit };
});
```

### 2. Middleware

**Understanding Middleware Chain**
```javascript
const Koa = require('koa');
const app = new Koa();

// Middleware 1
app.use(async (ctx, next) => {
  console.log('Middleware 1 - before');
  await next();
  console.log('Middleware 1 - after');
});

// Middleware 2
app.use(async (ctx, next) => {
  console.log('Middleware 2 - before');
  await next();
  console.log('Middleware 2 - after');
});

// Final handler
app.use(async (ctx) => {
  console.log('Final handler');
  ctx.body = 'Hello';
});

// Output:
// Middleware 1 - before
// Middleware 2 - before
// Final handler
// Middleware 2 - after
// Middleware 1 - after
```

**Request Logging Middleware**
```javascript
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

**Error Handling Middleware**
```javascript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message,
        status: ctx.status
      }
    };
    ctx.app.emit('error', err, ctx);
  }
});
```

**Authentication Middleware**
```javascript
const authenticate = async (ctx, next) => {
  const token = ctx.headers.authorization;
  
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'No token provided' };
    return;
  }
  
  // Verify token (simplified)
  ctx.user = { id: 1, name: 'John' };
  await next();
};

router.use(authenticate);

router.get('/profile', async (ctx) => {
  ctx.body = { user: ctx.user };
});
```

### 3. Context Object (ctx)

The context object is the most important concept in Koa. It encapsulates both request and response.

**Request Properties**
```javascript
app.use(async (ctx) => {
  // URL & Path
  ctx.url;           // Full URL: /users?id=1
  ctx.path;          // Path: /users
  ctx.query;         // Query object: { id: '1' }
  ctx.querystring;   // Query string: id=1
  ctx.params;        // Route parameters
  
  // HTTP Method
  ctx.method;        // GET, POST, etc.
  
  // Headers
  ctx.headers;       // All headers
  ctx.get('content-type');  // Get specific header
  ctx.type;          // Content-Type
  
  // Body
  ctx.request.body;  // Request body
  
  // Other
  ctx.hostname;      // Hostname
  ctx.ip;            // Client IP
  ctx.protocol;      // http or https
});
```

**Response Properties**
```javascript
app.use(async (ctx) => {
  // Set status
  ctx.status = 200;
  ctx.status = 404;
  ctx.status = 500;
  
  // Set body
  ctx.body = 'Hello';
  ctx.body = { message: 'Hello' };
  ctx.body = Buffer.from('Hello');
  
  // Set headers
  ctx.set('Content-Type', 'application/json');
  ctx.set({ 'X-Custom': 'value' });
  ctx.append('Link', '</css/style.css>; rel="stylesheet"');
  
  // Redirect
  ctx.redirect('/home');
  
  // Send file
  ctx.type = 'application/pdf';
  ctx.body = fs.createReadStream('file.pdf');
});
```

### 4. Body Parsing

```bash
npm install koa-bodyparser
```

```javascript
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

router.post('/users', async (ctx) => {
  console.log(ctx.request.body);  // Parsed body
  ctx.body = { created: true };
});
```

**Custom Body Parser**
```javascript
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' || ctx.method === 'PUT') {
    let data = '';
    
    for await (const chunk of ctx.req) {
      data += chunk;
    }
    
    ctx.request.rawBody = data;
    ctx.request.body = JSON.parse(data);
  }
  
  await next();
});
```

### 5. Static File Serving

```bash
npm install koa-static
```

```javascript
const serve = require('koa-static');

app.use(serve('./public'));
app.use(serve('./uploads', { prefix: '/uploads' }));
```

### 6. CORS Support

```bash
npm install koa-cors
```

```javascript
const cors = require('koa-cors');

// Enable CORS for all routes
app.use(cors());

// Custom CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
```

### 7. Session Management

```bash
npm install koa-session
```

```javascript
const session = require('koa-session');

const sessionConfig = {
  key: 'koa.sess',
  maxAge: 86400000
};

app.use(session(sessionConfig, app));

app.use(async (ctx) => {
  if (ctx.path === '/login') {
    ctx.session.user = { id: 1, name: 'John' };
  }
  
  if (ctx.session.user) {
    ctx.body = { user: ctx.session.user };
  }
});
```

---

## Advanced Features

### 1. RESTful API Example

```javascript
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });

app.use(bodyParser());

// Users data (in-memory)
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// Get all users
router.get('/users', async (ctx) => {
  ctx.body = users;
});

// Get single user
router.get('/users/:id', async (ctx) => {
  const user = users.find(u => u.id === parseInt(ctx.params.id));
  
  if (!user) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  } else {
    ctx.body = user;
  }
});

// Create user
router.post('/users', async (ctx) => {
  const { name, email } = ctx.request.body;
  
  if (!name || !email) {
    ctx.status = 400;
    ctx.body = { error: 'Name and email required' };
    return;
  }
  
  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    name,
    email
  };
  
  users.push(newUser);
  ctx.status = 201;
  ctx.body = newUser;
});

// Update user
router.put('/users/:id', async (ctx) => {
  const user = users.find(u => u.id === parseInt(ctx.params.id));
  
  if (!user) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
    return;
  }
  
  Object.assign(user, ctx.request.body);
  ctx.body = user;
});

// Delete user
router.delete('/users/:id', async (ctx) => {
  const index = users.findIndex(u => u.id === parseInt(ctx.params.id));
  
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  } else {
    const deleted = users.splice(index, 1);
    ctx.body = deleted[0];
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('API running on http://localhost:3000/api/v1');
});
```

### 2. Database Integration

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Routes
router.get('/users', async (ctx) => {
  ctx.body = await User.find();
});

router.post('/users', async (ctx) => {
  const user = new User(ctx.request.body);
  ctx.status = 201;
  ctx.body = await user.save();
});
```

---

## Project Structure

```
my-koa-app/
├── src/
│   ├── app.js                    # Main app
│   ├── server.js                 # Server entry
│   ├── routes/
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── postController.js
│   └── config/
│       └── database.js
├── public/
├── tests/
├── .env
├── package.json
└── README.md
```

---

## Best Practices

### 1. Error Handling
```javascript
app.on('error', (err, ctx) => {
  console.error('An error occurred:', err);
});
```

### 2. Graceful Shutdown
```javascript
const server = app.listen(3000);

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

### 3. Validation
```javascript
const validate = (schema) => {
  return async (ctx, next) => {
    try {
      ctx.request.body = schema.parse(ctx.request.body);
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { error: err.message };
    }
  };
};
```

---

## Useful Resources

- **Official Docs**: https://koajs.com
- **GitHub**: https://github.com/koajs/koa
- **Koa Modules**: https://github.com/koajs
- **Learning Resources**: https://github.com/koajs/koa/wiki

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

