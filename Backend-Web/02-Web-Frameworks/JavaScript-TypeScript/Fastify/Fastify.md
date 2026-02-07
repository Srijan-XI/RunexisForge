# Fastify

## Introduction

## Overview

**Fastify** is a fast and low-overhead web framework for Node.js. It's focused on providing the best developer experience with minimal overhead and a powerful plugin architecture.

### Key Features

- **Extremely Fast**: One of the fastest Node.js frameworks
- **Low Overhead**: Minimal dependencies
- **Schema-based**: Built-in JSON Schema validation
- **Asynchronous**: Fully async/await based
- **Decorator Support**: TypeScript-friendly
- **Plugin System**: Highly extensible
- **Excellent Logging**: Built-in Pino logger
- **Testing Utilities**: Test module included
- **Type Safe**: Full TypeScript support

### Why Choose Fastify?

✅ Superior performance  
✅ Minimal overhead  
✅ Schema validation built-in  
✅ Excellent for microservices  
✅ Great for real-time applications  
✅ Easy to test  

---

## Installation

### Prerequisites
- Node.js (v14.0 or higher)
- npm or yarn

### Setup

```bash
# Create project
mkdir my-fastify-app
cd my-fastify-app

# Initialize npm
npm init -y

# Install Fastify
npm install fastify

# Install Nodemon for development
npm install -D nodemon
```

### package.json

```json
{
  "name": "my-fastify-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "fastify": "^4.25.0"
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
const fastify = require('fastify')({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) fastify.log.error(err);
  console.log(`Server listening at ${address}`);
});
```

Run with:
```bash
npm run dev
```

---

## Core Concepts

### 1. Routing

**Basic Routes**
```javascript
// GET
fastify.get('/users', async (request, reply) => {
  return { users: [] };
});

// POST
fastify.post('/users', async (request, reply) => {
  return { created: true };
});

// PUT
fastify.put('/users/:id', async (request, reply) => {
  return { updated: true };
});

// DELETE
fastify.delete('/users/:id', async (request, reply) => {
  return { deleted: true };
});

// PATCH
fastify.patch('/users/:id', async (request, reply) => {
  return { patched: true };
});
```

**Route Parameters**
```javascript
fastify.get('/users/:id', async (request, reply) => {
  return { id: request.params.id };
});

fastify.get('/posts/:postId/comments/:commentId', async (request, reply) => {
  const { postId, commentId } = request.params;
  return { postId, commentId };
});
```

**Query Parameters**
```javascript
// GET /search?q=javascript&limit=10
fastify.get('/search', async (request, reply) => {
  const { q, limit } = request.query;
  return { query: q, limit };
});
```

### 2. Schema Validation

**JSON Schema**
```javascript
const userSchema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  }
};

const opts = {
  schema: {
    body: userSchema,
    response: {
      200: userSchema
    }
  }
};

fastify.post('/users', opts, async (request, reply) => {
  // request.body is validated against schema
  return request.body;
});
```

**Request/Response Schemas**
```javascript
fastify.get('/items/:id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' }
      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  return { id: request.params.id, name: 'Item' };
});
```

### 3. Hooks

Hooks are functions that execute at specific points in the request lifecycle.

**Request Hooks**
```javascript
// Pre-handler hook
fastify.addHook('preHandler', async (request, reply) => {
  console.log(`${request.method} ${request.url}`);
});

// Pre-validation hook
fastify.addHook('preValidation', async (request, reply) => {
  // Modify request before validation
});

// Post-handler hook
fastify.addHook('onResponse', async (request, reply) => {
  console.log('Response sent');
});

// Error handler
fastify.addHook('onError', async (request, reply, error) => {
  console.error(error);
});
```

**Route-level Hooks**
```javascript
fastify.get('/secure', {
  onRequest: [
    async (request, reply) => {
      // Authentication check
      if (!request.headers.authorization) {
        reply.status(401).send({ error: 'Unauthorized' });
      }
    }
  ]
}, async (request, reply) => {
  return { message: 'Secure data' };
});
```

### 4. Plugins

**Creating a Plugin**
```javascript
// plugins/user-plugin.js
async function userPlugin(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    return { users: [] };
  });

  fastify.get('/users/:id', async (request, reply) => {
    return { id: request.params.id };
  });
}

module.exports = userPlugin;

// app.js
fastify.register(userPlugin, { prefix: '/api' });
```

**Using Community Plugins**
```bash
npm install @fastify/cors @fastify/jwt @fastify/helmet
```

```javascript
const fastify = require('fastify')();

// CORS
fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:3001'
});

// JWT Authentication
fastify.register(require('@fastify/jwt'), {
  secret: 'your-secret-key'
});

// Security headers
fastify.register(require('@fastify/helmet'));

fastify.listen({ port: 3000 });
```

### 5. Error Handling

**Custom Error Handler**
```javascript
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  
  if (error.statusCode === 429) {
    reply.status(429).send({ message: 'Rate limit exceeded' });
  } else {
    reply.status(500).send({ message: 'Internal Server Error' });
  }
});
```

**HTTP Errors**
```javascript
fastify.get('/users/:id', async (request, reply) => {
  if (request.params.id < 0) {
    reply.status(400);
    throw new Error('ID must be positive');
  }
  
  if (!user) {
    reply.status(404);
    throw new Error('User not found');
  }
  
  return user;
});
```

### 6. Middleware

**Function-based Middleware**
```javascript
const authenticate = async (request, reply) => {
  const token = request.headers.authorization;
  if (!token) {
    reply.status(401).send({ error: 'No token' });
  }
};

fastify.get('/protected', {
  onRequest: authenticate
}, async (request, reply) => {
  return { message: 'Protected' };
});
```

**Using Middleware Plugins**
```bash
npm install @fastify/express
```

```javascript
const fastify = require('fastify')();
const fastifyExpress = require('@fastify/express');

fastify.register(fastifyExpress);

fastify.use((req, res, next) => {
  console.log('Express middleware');
  next();
});
```

### 7. Request/Reply Objects

**Request Object**
```javascript
fastify.get('/user', async (request, reply) => {
  console.log(request.params);      // Route parameters
  console.log(request.query);       // Query parameters
  console.log(request.body);        // Request body
  console.log(request.headers);     // HTTP headers
  console.log(request.method);      // HTTP method
  console.log(request.url);         // Request URL
  console.log(request.ip);          // Client IP
  console.log(request.hostname);    // Hostname
  console.log(request.protocol);    // Protocol
});
```

**Reply Object**
```javascript
fastify.get('/', async (request, reply) => {
  // Send response
  reply.send({ message: 'Hello' });
  reply.code(200).send({ message: 'Hello' });
  reply.sendFile('./index.html');
  
  // Set headers
  reply.header('Content-Type', 'application/json');
  reply.headers({ 'X-Custom': 'value' });
  
  // Redirect
  reply.redirect('/home');
  
  // Send file
  reply.download('file.pdf');
});
```

---

## Database Integration

### Mongoose Integration

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

async function userPlugin(fastify) {
  await mongoose.connect('mongodb://localhost:27017/myapp');

  fastify.get('/users', async (request, reply) => {
    return await User.find();
  });

  fastify.post('/users', async (request, reply) => {
    const user = new User(request.body);
    return await user.save();
  });
}

fastify.register(userPlugin);
```

---

## Advanced Features

### 1. Serialization

```javascript
fastify.get('/user', {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  // Only sends id and name fields
  return { id: 1, name: 'John', password: 'secret' };
});
```

### 2. Decorators

```javascript
fastify.decorate('db', database);
fastify.decorateReply('sendSuccess', function(data) {
  this.send({ success: true, data });
});

fastify.get('/data', async (request, reply) => {
  const data = fastify.db.query();
  reply.sendSuccess(data);
});
```

### 3. Lifecycle Hooks

```javascript
fastify.addHook('onReady', async () => {
  console.log('Server is ready');
});

fastify.addHook('onClose', async () => {
  console.log('Server closed');
});
```

---

## Project Structure

```
my-fastify-app/
├── src/
│   ├── app.js                    # Main app
│   ├── server.js                 # Server entry
│   ├── routes/
│   │   ├── users.js
│   │   └── posts.js
│   ├── plugins/
│   │   ├── database.js
│   │   └── authentication.js
│   ├── handlers/
│   │   └── errorHandler.js
│   └── config/
│       └── database.js
├── tests/
├── .env
├── package.json
└── README.md
```

---

## Testing

```bash
npm install -D jest @types/jest
```

```javascript
// __tests__/users.test.js
const build = require('../src/app');

describe('Users API', () => {
  let app;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns all users', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/users'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('users');
  });
});
```

---

## Best Practices

### 1. Error Handling
```javascript
fastify.setErrorHandler((error, request, reply) => {
  if (error.statusCode === 400) {
    reply.status(400).send({ error: error.message });
  } else {
    reply.status(500).send({ error: 'Internal error' });
  }
});
```

### 2. Logging
```javascript
const fastify = require('fastify')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  }
});
```

### 3. Environment Variables
```javascript
require('dotenv').config();

const fastify = require('fastify')({
  logger: process.env.NODE_ENV === 'production'
});
```

---

## Useful Resources

- **Official Docs**: https://www.fastify.io
- **GitHub**: https://github.com/fastify/fastify
- **Plugins**: https://www.fastify.io/ecosystem
- **Awesome Fastify**: https://github.com/fastify/awesome-fastify

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

