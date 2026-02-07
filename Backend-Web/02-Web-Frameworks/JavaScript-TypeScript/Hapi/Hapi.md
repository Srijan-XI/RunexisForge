# Hapi

## Introduction

## Overview

**Hapi** is a rich framework for building applications and APIs. Known for its strong architecture, plugin system, and excellent validation capabilities. Hapi stands out with its robust routing, schema validation, and comprehensive plugin ecosystem.

### Key Features

- **Powerful Router**: Advanced routing with flexible parameter handling
- **Schema Validation**: Built-in Joi schema validation
- **Plugin System**: Modular and extensible architecture
- **Caching**: Built-in caching capabilities
- **Authentication**: Multiple authentication strategies
- **Configuration**: Centralized configuration management
- **Logging**: Built-in request logging
- **Error Handling**: Comprehensive error handling
- **CORS Support**: Built-in CORS handling

### Why Choose Hapi?

✅ Robust and enterprise-ready  
✅ Excellent for large applications  
✅ Built-in schema validation  
✅ Powerful plugin ecosystem  
✅ Great documentation  
✅ Security-focused  

---

## Installation

### Prerequisites
- Node.js (v12.0 or higher)
- npm

### Setup

```bash
# Create project
mkdir my-hapi-app
cd my-hapi-app

# Initialize npm
npm init -y

# Install Hapi
npm install @hapi/hapi

# Install Joi for validation
npm install joi

# Install development tools
npm install -D nodemon
```

### package.json

```json
{
  "name": "my-hapi-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "@hapi/hapi": "^21.3.0",
    "joi": "^17.11.0"
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
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, Hapi!';
    }
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
```

---

## Core Concepts

### 1. Routing

**Basic Routes**
```javascript
server.route({
  method: 'GET',
  path: '/users',
  handler: (request, h) => {
    return { users: [] };
  }
});

server.route({
  method: 'POST',
  path: '/users',
  handler: (request, h) => {
    return { created: true };
  }
});

server.route({
  method: 'PUT',
  path: '/users/{id}',
  handler: (request, h) => {
    return { id: request.params.id, updated: true };
  }
});

server.route({
  method: 'DELETE',
  path: '/users/{id}',
  handler: (request, h) => {
    return { id: request.params.id, deleted: true };
  }
});
```

**Route Parameters**
```javascript
// Single parameter
server.route({
  method: 'GET',
  path: '/users/{id}',
  handler: (request, h) => {
    return { userId: request.params.id };
  }
});

// Multiple parameters
server.route({
  method: 'GET',
  path: '/posts/{postId}/comments/{commentId}',
  handler: (request, h) => {
    const { postId, commentId } = request.params;
    return { postId, commentId };
  }
});

// Optional parameters
server.route({
  method: 'GET',
  path: '/files/{fileName?}',
  handler: (request, h) => {
    return { fileName: request.params.fileName || 'default' };
  }
});

// Multi-segment parameters
server.route({
  method: 'GET',
  path: '/files/{path*}',
  handler: (request, h) => {
    return { path: request.params.path };
  }
});
```

**Query Parameters**
```javascript
server.route({
  method: 'GET',
  path: '/search',
  handler: (request, h) => {
    const { q, limit } = request.query;
    return { query: q, limit };
  }
});
```

**Multiple Methods**
```javascript
server.route({
  method: ['GET', 'POST'],
  path: '/users',
  handler: (request, h) => {
    if (request.method === 'post') {
      return { created: true };
    }
    return { users: [] };
  }
});
```

### 2. Schema Validation

**Request Validation with Joi**
```javascript
const Joi = require('joi');

server.route({
  method: 'POST',
  path: '/users',
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().integer().min(18)
      })
    }
  },
  handler: (request, h) => {
    return { created: true, data: request.payload };
  }
});
```

**Validation Rules**
```javascript
const schema = Joi.object({
  // String validation
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  // Email validation
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  // Number validation
  age: Joi.number()
    .integer()
    .min(18)
    .max(100),

  // Password validation
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required(),

  // Enum validation
  role: Joi.string()
    .valid('admin', 'user', 'guest')
    .required(),

  // Boolean validation
  active: Joi.boolean()
    .default(true),

  // Array validation
  tags: Joi.array()
    .items(Joi.string())
    .min(1),

  // Object validation
  metadata: Joi.object({
    created: Joi.date(),
    updated: Joi.date()
  })
});
```

### 3. Plugins

**Creating a Plugin**
```javascript
const userPlugin = {
  name: 'user-plugin',
  version: '1.0.0',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/users',
      handler: (request, h) => {
        return { users: [] };
      }
    });

    server.route({
      method: 'GET',
      path: '/users/{id}',
      handler: (request, h) => {
        return { id: request.params.id };
      }
    });
  }
};

// Register plugin
await server.register(userPlugin);
```

**Using Hapi Plugins**
```bash
npm install @hapi/cors @hapi/jwt @hapi/basic
```

```javascript
// CORS Plugin
await server.register({
  plugin: require('@hapi/cors'),
  options: {
    origin: ['http://localhost:3001']
  }
});

// Authentication Plugin
await server.register(require('@hapi/basic'));

server.auth.strategy('simple', 'basic', {
  validate: async (request, username, password) => {
    if (username === 'admin' && password === 'secret') {
      return { credentials: { user: username }, isValid: true };
    }
    return { isValid: false };
  }
});
```

### 4. Request & Response

**Request Object**
```javascript
handler: (request, h) => {
  // Path and URL
  console.log(request.path);        // /users
  console.log(request.url);         // /users?id=1
  
  // Parameters
  console.log(request.params);      // Route parameters
  console.log(request.query);       // Query parameters
  console.log(request.payload);     // Request body
  
  // Headers and Server
  console.log(request.headers);     // HTTP headers
  console.log(request.method);      // HTTP method
  console.log(request.server);      // Server instance
  
  // Other
  console.log(request.info);        // Request info
  console.log(request.auth);        // Auth info
}
```

**Response Object (h - Toolkit)**
```javascript
handler: (request, h) => {
  // Send response
  return 'Hello';
  return { message: 'Hello' };
  
  // With status code
  return h.response('Hello').code(201);
  
  // Set headers
  return h.response('Hello').header('X-Custom', 'value');
  
  // Redirect
  return h.redirect('/home');
  
  // File download
  return h.file('./file.pdf');
  
  // JSON stringify
  return h.response(data).type('application/json');
}
```

### 5. Lifecycle Methods

**Lifecycle Hooks**
```javascript
// onPreHandler
server.ext('onPreHandler', (request, h) => {
  console.log('Pre-handler');
  return h.continue;
});

// onPostHandler
server.ext('onPostHandler', (request, h) => {
  console.log('Post-handler');
  return h.continue;
});

// onPreResponse
server.ext('onPreResponse', (request, h) => {
  console.log('Pre-response');
  return h.continue;
});

// onRequest
server.ext('onRequest', (request, h) => {
  console.log('On request');
  return h.continue;
});
```

### 6. Error Handling

**Custom Error Handler**
```javascript
server.ext('onPreResponse', (request, h) => {
  const { response } = request;

  if (response.isBoom) {
    // Boom error
    return h.response({
      error: response.message,
      statusCode: response.statusCode
    }).code(response.statusCode);
  }

  return h.continue;
});
```

**Throwing Errors**
```javascript
const Boom = require('@hapi/boom');

server.route({
  method: 'GET',
  path: '/users/{id}',
  handler: (request, h) => {
    if (!userId) {
      throw Boom.notFound('User not found');
    }
    
    if (unauthorized) {
      throw Boom.unauthorized('Invalid token');
    }
    
    throw Boom.badRequest('Invalid input');
  }
});
```

### 7. Authentication

**JWT Authentication**
```bash
npm install @hapi/jwt
```

```javascript
const HapiJwt = require('@hapi/jwt');

await server.register(HapiJwt);

server.auth.strategy('jwt', 'jwt', {
  keys: 'secret-key',
  verify: {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test'
  },
  validate: (artifacts, request, h) => {
    return { isValid: true };
  }
});

server.route({
  method: 'GET',
  path: '/protected',
  options: {
    auth: 'jwt'
  },
  handler: (request, h) => {
    return { message: 'Protected' };
  }
});
```

---

## Advanced Features

### 1. RESTful API Example

```javascript
const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  let users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];

  // Get all users
  server.route({
    method: 'GET',
    path: '/users',
    handler: (request, h) => {
      return users;
    }
  });

  // Get single user
  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => {
      const user = users.find(u => u.id === parseInt(request.params.id));
      if (!user) {
        return h.response({ error: 'User not found' }).code(404);
      }
      return user;
    }
  });

  // Create user
  server.route({
    method: 'POST',
    path: '/users',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required()
        })
      }
    },
    handler: (request, h) => {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...request.payload
      };
      users.push(newUser);
      return h.response(newUser).code(201);
    }
  });

  // Update user
  server.route({
    method: 'PUT',
    path: '/users/{id}',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          email: Joi.string().email()
        })
      }
    },
    handler: (request, h) => {
      const user = users.find(u => u.id === parseInt(request.params.id));
      if (!user) {
        return h.response({ error: 'User not found' }).code(404);
      }
      Object.assign(user, request.payload);
      return user;
    }
  });

  // Delete user
  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request, h) => {
      const index = users.findIndex(u => u.id === parseInt(request.params.id));
      if (index === -1) {
        return h.response({ error: 'User not found' }).code(404);
      }
      const deleted = users.splice(index, 1);
      return deleted[0];
    }
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
```

### 2. Database Integration

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

// Plugin for database
const dbPlugin = {
  name: 'db-plugin',
  register: async (server, options) => {
    await mongoose.connect(options.url);
    server.decorate('server', 'db', { User });
  }
};

await server.register({
  plugin: dbPlugin,
  options: { url: 'mongodb://localhost:27017/myapp' }
});

server.route({
  method: 'GET',
  path: '/users',
  handler: async (request, h) => {
    return await request.server.db.User.find();
  }
});
```

---

## Project Structure

```
my-hapi-app/
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

## Best Practices

### 1. Modular Routes

```javascript
// routes/users.js
module.exports = {
  name: 'users-routes',
  register: async (server) => {
    server.route({
      method: 'GET',
      path: '/users',
      handler: (request, h) => ({ users: [] })
    });
  }
};

// app.js
await server.register(require('./routes/users'));
```

### 2. Configuration

```javascript
const config = {
  development: {
    port: 3000,
    host: 'localhost'
  },
  production: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0'
  }
};

const serverConfig = config[process.env.NODE_ENV || 'development'];
const server = Hapi.server(serverConfig);
```

---

## Useful Resources

- **Official Docs**: https://hapi.dev
- **GitHub**: https://github.com/hapijs/hapi
- **Joi Documentation**: https://joi.dev
- **Plugins Registry**: https://hapi.dev/ecosystem

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

