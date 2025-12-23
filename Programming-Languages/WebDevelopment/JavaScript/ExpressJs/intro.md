# Express.js - Introduction

## What is Express.js?

**Express.js** (or simply Express) is a minimal, fast, and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's the most popular Node.js framework and is known as the "de facto standard" for Node.js web development.

## Key Features

### 1. **Minimalist Framework**
- Lightweight and unopinionated
- Provides core web application features
- Doesn't force any specific project structure
- Freedom to organize code as you prefer

### 2. **Middleware Support**
- Built on middleware functions
- Process requests before they reach route handlers
- Modular and reusable middleware
- Third-party middleware ecosystem

### 3. **Routing**
- Powerful routing mechanism
- HTTP method support (GET, POST, PUT, DELETE, etc.)
- Route parameters and query strings
- Regular expressions in routes

### 4. **Template Engine Integration**
- Support for multiple template engines
- Popular engines: Pug, EJS, Handlebars
- Server-side rendering capabilities

### 5. **Fast Development**
- Minimal boilerplate code
- Quick prototyping
- Extensive documentation
- Large community support

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Client                         │
│              (Browser/Mobile App)                │
└──────────────────┬──────────────────────────────┘
                   │ HTTP Request
                   ▼
┌─────────────────────────────────────────────────┐
│              Express Application                 │
│                                                  │
│  ┌────────────────────────────────────────┐    │
│  │         Middleware Stack                │    │
│  │                                          │    │
│  │  ┌──────────────────────────────────┐  │    │
│  │  │  Middleware 1 (e.g., CORS)       │  │    │
│  │  └──────────────┬───────────────────┘  │    │
│  │                 │                        │    │
│  │  ┌──────────────▼───────────────────┐  │    │
│  │  │  Middleware 2 (e.g., Body Parser)│  │    │
│  │  └──────────────┬───────────────────┘  │    │
│  │                 │                        │    │
│  │  ┌──────────────▼───────────────────┐  │    │
│  │  │  Middleware 3 (e.g., Auth)       │  │    │
│  │  └──────────────┬───────────────────┘  │    │
│  └─────────────────┼────────────────────┘  │
│                    │                         │
│  ┌─────────────────▼────────────────────┐   │
│  │           Route Handlers              │   │
│  │                                        │   │
│  │  GET /users    POST /users            │   │
│  │  GET /posts    DELETE /posts/:id      │   │
│  └─────────────────┬────────────────────┘   │
│                    │                         │
│  ┌─────────────────▼────────────────────┐   │
│  │        Error Handling Middleware      │   │
│  └────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────┘
                   │ HTTP Response
                   ▼
┌─────────────────────────────────────────────────┐
│                   Client                         │
└─────────────────────────────────────────────────┘
```

## Core Concepts

### 1. Application Object (`app`)
The main Express application object that handles requests and responses.

```javascript
const express = require('express');
const app = express();
```

### 2. Middleware
Functions that have access to request and response objects, and the next middleware function.

```javascript
app.use((req, res, next) => {
    console.log('Request received');
    next(); // Pass control to next middleware
});
```

### 3. Routing
Define how application responds to client requests at specific endpoints.

```javascript
app.get('/users', (req, res) => {
    res.send('Get all users');
});

app.post('/users', (req, res) => {
    res.send('Create a user');
});
```

### 4. Request Object (`req`)
Represents the HTTP request with properties like query strings, parameters, body, HTTP headers.

### 5. Response Object (`res`)
Represents the HTTP response that Express sends when it receives a request.

## Installation

```bash
# Create a new directory
mkdir myapp
cd myapp

# Initialize npm
npm init -y

# Install Express
npm install express

# Install development dependencies (optional)
npm install --save-dev nodemon
```

## Hello World Example

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

## HTTP Methods

Express supports all HTTP methods:

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | `app.get('/users', ...)` |
| `POST` | Create data | `app.post('/users', ...)` |
| `PUT` | Update/Replace data | `app.put('/users/:id', ...)` |
| `PATCH` | Partial update | `app.patch('/users/:id', ...)` |
| `DELETE` | Delete data | `app.delete('/users/:id', ...)` |
| `OPTIONS` | Get allowed methods | `app.options('/users', ...)` |
| `HEAD` | Like GET without body | `app.head('/users', ...)` |

## Middleware Types

### 1. Application-Level Middleware
Bound to the app object using `app.use()` or `app.METHOD()`.

```javascript
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
```

### 2. Router-Level Middleware
Works like application-level but bound to `express.Router()`.

```javascript
const router = express.Router();

router.use((req, res, next) => {
    console.log('Router middleware');
    next();
});
```

### 3. Error-Handling Middleware
Has four arguments instead of three.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

### 4. Built-in Middleware
Provided by Express itself.

```javascript
app.use(express.json());              // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
app.use(express.static('public'));     // Serve static files
```

### 5. Third-Party Middleware
Installed via npm.

```javascript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());                       // Enable CORS
app.use(helmet());                     // Security headers
app.use(morgan('dev'));                // Logging
```

## Routing

### Basic Routes

```javascript
// GET request
app.get('/users', (req, res) => {
    res.json({ users: [] });
});

// POST request
app.post('/users', (req, res) => {
    res.status(201).json({ message: 'User created' });
});

// PUT request
app.put('/users/:id', (req, res) => {
    res.json({ message: `Update user ${req.params.id}` });
});

// DELETE request
app.delete('/users/:id', (req, res) => {
    res.json({ message: `Delete user ${req.params.id}` });
});
```

### Route Parameters

```javascript
// Single parameter
app.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
    res.json({
        userId: req.params.userId,
        postId: req.params.postId
    });
});
```

### Query Strings

```javascript
// URL: /search?q=express&page=2
app.get('/search', (req, res) => {
    res.json({
        query: req.query.q,      // 'express'
        page: req.query.page     // '2'
    });
});
```

### Router Module

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get all users');
});

router.get('/:id', (req, res) => {
    res.send(`Get user ${req.params.id}`);
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

## Response Methods

| Method | Description |
|--------|-------------|
| `res.send()` | Send various types of responses |
| `res.json()` | Send JSON response |
| `res.sendFile()` | Send a file |
| `res.render()` | Render a view template |
| `res.redirect()` | Redirect to another route |
| `res.status()` | Set HTTP status code |
| `res.sendStatus()` | Set status and send message |
| `res.download()` | Prompt file download |
| `res.end()` | End response without data |

## Popular Middleware

### 1. **Body Parser** (built-in since Express 4.16)
```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### 2. **CORS** (Cross-Origin Resource Sharing)
```javascript
const cors = require('cors');
app.use(cors());
```

### 3. **Helmet** (Security)
```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 4. **Morgan** (Logging)
```javascript
const morgan = require('morgan');
app.use(morgan('dev'));
```

### 5. **Cookie Parser**
```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

### 6. **Express Session**
```javascript
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
```

## RESTful API Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// CREATE user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// UPDATE user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.name = req.body.name;
    res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });
    
    users.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Advantages

✅ **Minimal and Flexible** - Lightweight framework with minimal overhead  
✅ **Large Ecosystem** - Thousands of middleware packages available  
✅ **Fast Development** - Quick to set up and build applications  
✅ **Scalable** - Suitable for small to large applications  
✅ **Great Documentation** - Comprehensive and well-maintained docs  
✅ **Active Community** - Large community with extensive support  
✅ **MVC Pattern** - Supports Model-View-Controller architecture  
✅ **Easy Testing** - Simple to write unit and integration tests

## Disadvantages

❌ **Unopinionated** - No predefined structure (can be overwhelming)  
❌ **Callback Hell** - Can occur with complex middleware chains  
❌ **Manual Setup** - Requires configuration for many features  
❌ **Security** - Requires additional middleware for security features  
❌ **Error Handling** - Need to implement comprehensive error handling

## Use Cases

1. **RESTful APIs** - Backend for mobile and web applications
2. **Web Applications** - Full-stack web development
3. **Microservices** - Building scalable microservice architecture
4. **Real-Time Applications** - Chat apps, notifications (with Socket.io)
5. **Single Page Applications** - Backend for React, Angular, Vue apps
6. **Proxy Services** - API gateway and proxy servers
7. **Streaming Services** - Media streaming applications

## Project Structure (Best Practice)

```
myapp/
├── node_modules/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── logger.js
│   └── app.js
├── tests/
│   └── user.test.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Best Practices

1. **Use Environment Variables** - Store configuration in `.env` files
2. **Organize Routes** - Use Router to modularize routes
3. **Error Handling** - Implement centralized error handling
4. **Validation** - Validate input data (use Joi, express-validator)
5. **Security** - Use Helmet, rate limiting, input sanitization
6. **Logging** - Implement proper logging (Morgan, Winston)
7. **Async/Await** - Use modern async patterns
8. **CORS** - Configure CORS properly for APIs
9. **Testing** - Write comprehensive tests (Jest, Mocha)
10. **Documentation** - Document APIs (Swagger, Postman)

## Popular Packages

| Package | Purpose |
|---------|---------|
| `body-parser` | Parse request bodies (built-in since 4.16) |
| `cors` | Enable CORS |
| `helmet` | Security headers |
| `morgan` | HTTP request logger |
| `dotenv` | Environment variables |
| `express-validator` | Input validation |
| `mongoose` | MongoDB ODM |
| `jsonwebtoken` | JWT authentication |
| `bcrypt` | Password hashing |
| `multer` | File uploads |
| `compression` | Response compression |
| `rate-limit` | Rate limiting |

## Who Uses Express.js?

Major companies using Express.js:

- **Uber** - API services
- **Accenture** - Enterprise applications
- **IBM** - Cloud services
- **Fox Sports** - Real-time sports data
- **PayPal** - Payment processing
- **Walmart** - E-commerce backend
- **Netflix** - Backend services
- **MySpace** - Social networking

## Resources

- **Official Website**: [expressjs.com](https://expressjs.com/)
- **Documentation**: [expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)
- **GitHub**: [github.com/expressjs/express](https://github.com/expressjs/express)
- **npm Package**: [npmjs.com/package/express](https://www.npmjs.com/package/express)

---

**Express.js** is the foundation of countless Node.js applications, providing a simple yet powerful way to build web applications and APIs. Its minimalist approach and extensive middleware ecosystem make it the go-to choice for Node.js developers worldwide.