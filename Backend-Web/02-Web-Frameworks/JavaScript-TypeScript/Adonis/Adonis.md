# Adonis

## Introduction

## Overview

**AdonisJS** is a Node.js web framework with all the features needed to create a fully functional web app. It's built on top of Express.js and provides a Rails-like experience for Node.js developers.

### Key Features

- **Full-stack Framework**: Everything you need for web development
- **Rails-like Syntax**: Familiar if you know Ruby on Rails
- **Built-in ORM**: Lucid ORM for database management
- **Authentication**: Built-in user authentication
- **Validation**: Request validation out of the box
- **Migrations**: Database migrations support
- **CLI Tools**: Powerful command-line interface
- **Testing**: Built-in testing framework
- **Security**: CSRF protection, CORS handling

### Why Choose Adonis?

✅ Full-featured framework  
✅ Great for rapid development  
✅ Excellent documentation  
✅ Built-in database tools  
✅ Rails-like development experience  
✅ Perfect for teams  

---

## Installation

### Prerequisites
- Node.js (v14.0 or higher)
- npm or yarn

### Setup with CLI

```bash
# Install Adonis CLI globally
npm install -g @adonisjs/cli

# Create new Adonis project
adonis new my-app

# Navigate to project
cd my-app

# Start development server
npm run dev
```

### Manual Setup

```bash
# Create project
mkdir my-adonis-app
cd my-adonis-app

# Initialize npm
npm init -y

# Install Adonis
npm install @adonisjs/core @adonisjs/lucid

# Copy basic files
# Download from Adonis starter template
```

---

## Project Structure

```
my-app/
├── app/
│   ├── Models/              # Database models
│   │   └── User.js
│   ├── Controllers/         # Request handlers
│   │   └── UserController.js
│   ├── Middleware/
│   │   └── Auth.js
│   └── Exceptions/
├── config/
│   ├── app.js              # App configuration
│   ├── database.js         # Database config
│   ├── auth.js             # Auth config
│   └── cors.js
├── database/
│   ├── migrations/         # Database migrations
│   └── seeds/              # Seed data
├── public/                 # Static files
├── resources/
│   ├── views/              # Edge templates
│   └── css/
├── routes/
│   └── web.js              # Web routes
├── .env
├── .env.example
├── package.json
└── ace                     # CLI commands file
```

---

## Core Concepts

### 1. Routing

**Basic Routes** (routes/web.js)
```javascript
const Route = use('Route');

Route.get('/', 'HomeController.render');
Route.get('/users', 'UserController.index');
Route.post('/users', 'UserController.store');
Route.get('/users/:id', 'UserController.show');
Route.put('/users/:id', 'UserController.update');
Route.delete('/users/:id', 'UserController.destroy');
```

**Named Routes**
```javascript
Route.get('/users/:id', 'UserController.show').as('user.show');

// In view or controller
route('user.show', { id: 1 });  // /users/1
```

**Route Groups**
```javascript
Route.group(() => {
  Route.get('/users', 'UserController.index');
  Route.post('/users', 'UserController.store');
  Route.get('/users/:id', 'UserController.show');
  Route.put('/users/:id', 'UserController.update');
  Route.delete('/users/:id', 'UserController.destroy');
}).prefix('/api/v1');
```

**Middleware in Routes**
```javascript
Route.get('/dashboard', 'DashboardController.render')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/profile', 'ProfileController.render');
}).middleware(['auth:jwt']);
```

### 2. Controllers

**Creating a Controller**
```bash
adonis make:controller User
```

**User Controller** (app/Controllers/Http/UserController.js)
```javascript
'use strict';

const User = use('App/Models/User');

class UserController {
  async index({ response }) {
    const users = await User.all();
    return response.json(users);
  }

  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password']);
    const user = await User.create(data);
    return response.status(201).json(user);
  }

  async show({ params, response }) {
    const user = await User.find(params.id);
    
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    
    return response.json(user);
  }

  async update({ params, request, response }) {
    const user = await User.find(params.id);
    
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    
    const data = request.only(['name', 'email']);
    user.merge(data);
    await user.save();
    
    return response.json(user);
  }

  async destroy({ params, response }) {
    const user = await User.find(params.id);
    
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    
    await user.delete();
    return response.json({ message: 'User deleted' });
  }
}

module.exports = UserController;
```

### 3. Models

**Creating a Model**
```bash
adonis make:model User --migration
```

**User Model** (app/Models/User.js)
```javascript
'use strict';

const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();
    
    // Hash password before saving
    this.addHook('beforeSave', 'User.hashPassword');
  }

  // Hide sensitive fields
  static get hidden() {
    return ['password'];
  }

  // Relationships
  posts() {
    return this.hasMany('App/Models/Post');
  }

  comments() {
    return this.hasMany('App/Models/Comment');
  }

  // Hooks
  static async hashPassword(user) {
    if (user.dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}

module.exports = User;
```

### 4. Migrations

**Creating a Migration**
```bash
adonis make:migration users --create=users
```

**Users Migration** (database/migrations/...)
```javascript
'use strict';

const Schema = use('Schema');

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name', 254).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UsersSchema;
```

**Run Migrations**
```bash
adonis migration:run
adonis migration:rollback
adonis migration:refresh
```

### 5. Validation

**Form Request Validation**
```bash
adonis make:validator StoreUser
```

**Store User Validator** (app/Validators/StoreUser.js)
```javascript
'use strict';

const { rule, validate } = use('Validator');

class StoreUser {
  async fails(errorMessages) {
    return this.ctx.response.status(422).json(errorMessages);
  }

  get rules() {
    return {
      name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required|min:6|confirmed'
    };
  }

  get messages() {
    return {
      'email.unique': 'Email already in use'
    };
  }
}

module.exports = StoreUser;
```

**Using Validator**
```javascript
async store({ request, response }) {
  await request.validate(new StoreUser());
  
  const data = request.only(['name', 'email', 'password']);
  const user = await User.create(data);
  
  return response.status(201).json(user);
}
```

### 6. Authentication

**Auth Configuration** (config/auth.js)
```javascript
module.exports = {
  authenticator: 'session',
  
  session: {
    serializer: 'lucid',
    model: 'App/Models/User'
  },
  
  api: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt'
  }
};
```

**Login Controller**
```javascript
async login({ request, auth, response }) {
  const { email, password } = request.all();
  
  try {
    await auth.attempt(email, password);
    return response.json({ message: 'Login successful' });
  } catch (error) {
    return response.status(401).json({ error: 'Invalid credentials' });
  }
}
```

**Protected Routes**
```javascript
Route.get('/profile', 'ProfileController.show')
  .middleware(['auth']);
```

### 7. Relationships

**One to Many**
```javascript
// In User model
posts() {
  return this.hasMany('App/Models/Post');
}

// In Post model
user() {
  return this.belongsTo('App/Models/User');
}

// Usage
const user = await User.with('posts').find(1);
```

**Many to Many**
```javascript
// In User model
roles() {
  return this.belongsToMany('App/Models/Role');
}

// In Role model
users() {
  return this.belongsToMany('App/Models/User');
}
```

---

## Advanced Features

### 1. Middleware

**Creating Middleware**
```bash
adonis make:middleware Auth
```

**Auth Middleware** (app/Middleware/Auth.js)
```javascript
'use strict';

class Auth {
  async handle({ auth, response }, next) {
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    
    await next();
  }
}

module.exports = Auth;
```

### 2. Testing

**Creating Tests**
```bash
adonis make:test Feature/User
```

**User Test** (tests/feature/user.test.js)
```javascript
const { test } = use('Test/Suite')('User');
const User = use('App/Models/User');

test('should create user', async ({ client, assert }) => {
  const response = await client.post('/users').send({
    name: 'John',
    email: 'john@example.com',
    password: 'secret'
  });
  
  response.assertStatus(201);
  assert.exists(response.body.id);
});
```

**Run Tests**
```bash
adonis test
```

---

## Useful Commands

```bash
# Create files
adonis make:controller User
adonis make:model User --migration
adonis make:migration users
adonis make:seeder User
adonis make:middleware Auth
adonis make:validator StoreUser
adonis make:test Unit/Math

# Run migrations
adonis migration:run
adonis migration:rollback
adonis migration:refresh

# Seeds
adonis seed:run

# Server
adonis serve --dev
adonis build

# Routes
adonis route:list
```

---

## Best Practices

### 1. Environment Configuration
```javascript
// config/app.js
module.exports = {
  port: Env.get('PORT', 3000),
  host: Env.get('HOST', 'localhost'),
  appKey: Env.getOrFail('APP_KEY')
};
```

### 2. Error Handling
```javascript
// app/Exceptions/Handler.js
async handle(error, { response }) {
  if (error.status === 422) {
    return response.status(422).json(error.messages);
  }
  
  return response.status(500).json({ error: 'Server error' });
}
```

---

## Useful Resources

- **Official Docs**: https://adonisjs.com
- **GitHub**: https://github.com/adonisjs/core
- **Awesome Adonis**: https://github.com/adonisjs/awesome-list

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

