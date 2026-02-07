# Sails.js

## Introduction

## Overview

**Sails.js** is a realtime Node.js MVC framework that makes it easy to build custom, enterprise-grade web applications with Express.js and Socket.io. It provides a structured, convention-over-configuration approach to building web applications.

### Key Features

- **MVC Architecture**: Familiar Model-View-Controller pattern
- **Realtime Capabilities**: Built-in Socket.io support
- **Data Validation**: Automatic model validation
- **ORM (Waterline)**: Database-agnostic query builder
- **RESTful APIs**: Auto-generated REST APIs
- **Authentication**: Built-in user authentication
- **Routing**: Powerful routing system
- **Asset Pipeline**: Grunt for task automation
- **Security**: CSRF protection, security headers

### Why Choose Sails?

✅ Full-featured MVC framework  
✅ Built-in realtime support  
✅ Convention over configuration  
✅ Automatic API generation  
✅ Rapid application development  
✅ Great for teams  

---

## Installation

### Prerequisites
- Node.js (v12.0 or higher)
- npm

### Setup with CLI

```bash
# Install Sails globally
npm install -g sails

# Create new Sails project
sails new my-app

# Navigate to project
cd my-app

# Start development server
sails lift
```

### Manual Setup

```bash
# Create project
mkdir my-sails-app
cd my-sails-app

# Initialize npm
npm init -y

# Install Sails
npm install sails
```

---

## Project Structure

```
my-app/
├── api/
│   ├── models/              # Database models
│   │   └── User.js
│   ├── controllers/         # Request handlers
│   │   └── UserController.js
│   └── responses/           # Custom responses
├── config/
│   ├── routes.js            # Route configuration
│   ├── models.js            # Model config
│   ├── policies.js          # Access control
│   ├── env/
│   │   ├── development.js
│   │   └── production.js
│   ├── datastores.js        # Database config
│   └── log.js
├── views/                   # EJS views
├── assets/                  # CSS, JS, images
├── tests/                   # Test files
├── package.json
└── app.js                   # Entry point
```

---

## Core Concepts

### 1. Models

**Creating a Model**
```bash
sails generate model user name:string email:string password:string
```

**User Model** (api/models/User.js)
```javascript
module.exports = {
  attributes: {
    // Attributes
    name: {
      type: 'string',
      required: true
    },
    
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    
    // Associations
    posts: {
      collection: 'post',
      via: 'author'
    },
    
    comments: {
      collection: 'comment',
      via: 'user'
    }
  }
};
```

### 2. Controllers

**Creating a Controller**
```bash
sails generate controller user
```

**User Controller** (api/controllers/UserController.js)
```javascript
module.exports = {
  // List all users
  find: async function(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  // Get single user
  findOne: async function(req, res) {
    const user = await User.findOne({ id: req.param('id') });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json(user);
  },

  // Create user
  create: async function(req, res) {
    const { name, email, password } = req.allParams();
    
    const user = await User.create({
      name,
      email,
      password
    });
    
    return res.status(201).json(user);
  },

  // Update user
  update: async function(req, res) {
    const { id } = req.param('id');
    const data = req.allParams();
    
    const user = await User.updateOne({ id }).set(data);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json(user);
  },

  // Delete user
  destroy: async function(req, res) {
    const { id } = req.param('id');
    
    await User.destroyOne({ id });
    
    return res.json({ message: 'User deleted' });
  }
};
```

### 3. Routing

**Route Configuration** (config/routes.js)
```javascript
module.exports.routes = {
  // Basic routes
  'GET /': 'HomeController.index',
  'GET /about': 'HomeController.about',

  // RESTful routes (auto-generated)
  'GET /api/v1/users': 'UserController.find',
  'GET /api/v1/users/:id': 'UserController.findOne',
  'POST /api/v1/users': 'UserController.create',
  'PUT /api/v1/users/:id': 'UserController.update',
  'DELETE /api/v1/users/:id': 'UserController.destroy',

  // Custom actions
  'POST /api/v1/users/:id/follow': 'UserController.follow',
  'POST /api/v1/login': 'AuthController.login'
};
```

**RESTful Blueprints**
```javascript
// Automatically generates REST routes
// GET /api/users → find all
// GET /api/users/:id → find one
// POST /api/users → create
// PATCH /api/users/:id → update
// DELETE /api/users/:id → destroy

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};
```

### 4. Policies (Middleware)

**Creating a Policy**
```bash
sails generate policy auth
```

**Auth Policy** (api/policies/auth.js)
```javascript
module.exports = async function(req, res, next) {
  if (req.session.userId) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
};
```

**Applying Policies** (config/policies.js)
```javascript
module.exports.policies = {
  '*': false,  // All routes protected by default
  
  'UserController': {
    'find': true,          // Public
    'findOne': true,       // Public
    'create': true,        // Public (registration)
    'update': 'auth',      // Protected
    'destroy': 'auth'      // Protected
  },
  
  'PostController': {
    '*': 'auth'            // All methods protected
  }
};
```

### 5. Attributes & Validation

**Model Validation**
```javascript
attributes: {
  name: {
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 50
  },
  
  email: {
    type: 'string',
    required: true,
    unique: true,
    isEmail: true
  },
  
  age: {
    type: 'number',
    columnType: 'integer',
    min: 0,
    max: 150
  },
  
  role: {
    type: 'string',
    isIn: ['admin', 'user', 'guest'],
    defaultsTo: 'user'
  },
  
  active: {
    type: 'boolean',
    defaultsTo: true
  }
}
```

### 6. Associations

**One-to-Many**
```javascript
// User model
posts: {
  collection: 'post',
  via: 'author'
}

// Post model
author: {
  model: 'user'
}
```

**Many-to-Many**
```javascript
// User model
roles: {
  collection: 'role',
  via: 'users'
}

// Role model
users: {
  collection: 'user',
  via: 'roles'
}
```

### 7. Realtime with Socket.io

**Socket Configuration** (config/sockets.js)
```javascript
module.exports.sockets = {
  onConnect: function(session) {
    // User connected
  },

  onDisconnect: function(session) {
    // User disconnected
  }
};
```

**Broadcasting**
```javascript
// In Controller
sails.sockets.broadcast('users', 'user-created', {
  id: user.id,
  name: user.name
});

// In View
io.socket.on('user-created', function(data) {
  console.log('New user:', data);
});
```

---

## Advanced Features

### 1. Custom Responses

**Custom Response** (api/responses/success.js)
```javascript
module.exports = function(data, message) {
  return this.res.json({
    success: true,
    message: message || 'Success',
    data: data
  });
};
```

**Using Custom Response**
```javascript
return res.success(user, 'User created');
```

### 2. Blueprints

Sails automatically generates RESTful APIs for models:

```
GET /api/users              → Find all
GET /api/users/:id          → Find one
POST /api/users             → Create
PATCH /api/users/:id        → Update
DELETE /api/users/:id       → Delete
GET /api/users/:id/posts    → Get associated records
POST /api/users/:id/posts   → Add associated record
DELETE /api/users/:id/posts/:assoc_id  → Remove association
```

### 3. Configuration by Environment

**Development Config** (config/env/development.js)
```javascript
module.exports = {
  log: {
    level: 'info'
  },
  
  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'myapp_dev'
    }
  }
};
```

**Production Config** (config/env/production.js)
```javascript
module.exports = {
  log: {
    level: 'error'
  },
  
  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  },
  
  security: {
    cors: {
      allRoutes: false,
      allowAnyOrigin: false,
      allowOrigins: [process.env.ALLOWED_ORIGIN]
    }
  }
};
```

---

## Useful Commands

```bash
# Generate files
sails generate model user
sails generate controller user
sails generate policy auth
sails generate response success

# Lift development server
sails lift

# Build for production
sails build

# Database operations
sails migrate
sails seed

# Testing
npm test
```

---

## Best Practices

### 1. Error Handling
```javascript
// Create custom error response
// api/responses/error.js
module.exports = function(message, statusCode) {
  return this.res.status(statusCode || 500).json({
    error: message
  });
};

// Use it
return res.error('User not found', 404);
```

### 2. Policies Hierarchy
```javascript
// Protect admin routes
module.exports.policies = {
  'AdminController': {
    '*': ['auth', 'isAdmin']
  }
};
```

---

## Useful Resources

- **Official Docs**: https://sailsjs.com
- **GitHub**: https://github.com/balderdashy/sails
- **API Documentation**: https://sailsjs.com/documentation
- **Tutorials**: https://sailsjs.com/whats-new/v1

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

