# Express

## Introduction

## Overview

**Express.js** is a fast, unopinionated, minimalist web application framework for Node.js. It provides a robust set of features for building web and mobile applications with a simple and flexible API.

### Key Features

- **Lightweight & Fast**: Minimal overhead, excellent performance
- **Middleware Support**: Flexible request/response processing
- **Routing**: Simple and intuitive routing system
- **Template Engines**: Support for multiple view engines (EJS, Pug, Handlebars)
- **Static File Serving**: Built-in static file middleware
- **Error Handling**: Comprehensive error handling mechanism
- **Extensive Ecosystem**: Wide range of compatible middleware

### Why Choose Express?

✅ Minimal learning curve  
✅ Flexible and unopinionated architecture  
✅ Large community support  
✅ Perfect for REST APIs  
✅ Easy integration with databases  
✅ Excellent middleware ecosystem  

---

## Installation

### Prerequisites
- Node.js (v12.0 or higher)
- npm (comes with Node.js)

### Setup

```bash
# Create project directory
mkdir my-express-app
cd my-express-app

# Initialize npm project
npm init -y

# Install Express
npm install express

# Install Nodemon (for development)
npm install -D nodemon
```

### package.json Configuration

```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "description": "Express.js Application",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
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
const express = require('express');
const app = express();
const PORT = 3000;

// Route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
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
// GET request
app.get('/', (req, res) => {
  res.send('GET request received');
});

// POST request
app.post('/users', (req, res) => {
  res.send('POST request received');
});

// PUT request
app.put('/users/:id', (req, res) => {
  res.send(`Update user ${req.params.id}`);
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user ${req.params.id}`);
});

// PATCH request
app.patch('/users/:id', (req, res) => {
  res.send(`Patch user ${req.params.id}`);
});
```

**Route Parameters**
```javascript
// Single parameter
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`User ID: ${req.params.id}`);
});

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  res.json({
    postId: req.params.postId,
    commentId: req.params.commentId
  });
});

// Optional parameters
app.get('/files/:fileName?', (req, res) => {
  if (req.params.fileName) {
    res.send(`File: ${req.params.fileName}`);
  } else {
    res.send('No file specified');
  }
});
```

**Query Parameters**
```javascript
// GET /search?q=javascript&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit;
  res.json({ query, limit });
});
```

**Route Handlers**
```javascript
// Multiple handlers (chain)
app.get('/page', 
  (req, res, next) => {
    console.log('First handler');
    next();
  },
  (req, res) => {
    res.send('Final response');
  }
);

// Array of handlers
const handler1 = (req, res, next) => {
  console.log('Handler 1');
  next();
};

const handler2 = (req, res) => {
  res.send('Response from handler 2');
};

app.get('/multi', [handler1, handler2]);
```

### 2. Middleware

**What is Middleware?**
Functions that have access to request object (req), response object (res), and next middleware function in the request-response cycle.

**Application-level Middleware**
```javascript
// Runs for all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Runs for specific route
app.use('/api', (req, res, next) => {
  req.startTime = Date.now();
  next();
});

// Conditional middleware
app.use((req, res, next) => {
  if (req.path === '/admin') {
    // Admin verification
  }
  next();
});
```

**Built-in Middleware**
```javascript
// Parse JSON
app.use(express.json());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Custom static path
app.use('/assets', express.static('public'));
```

**Router-level Middleware**
```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/', (req, res) => {
  res.send('Home');
});

app.use('/users', router);
```

**Error Handling Middleware**
```javascript
// Define after other middleware and routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

**Third-party Middleware**
```javascript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
```

### 3. Request & Response Objects

**Request Object (req)**
```javascript
app.get('/user/:id', (req, res) => {
  // Parameters
  console.log(req.params.id);           // Route parameters
  console.log(req.query.name);          // Query parameters
  console.log(req.body);                // Request body (with body-parser)
  console.log(req.headers);             // HTTP headers
  console.log(req.method);              // HTTP method
  console.log(req.url);                 // Request URL
  console.log(req.path);                // Request path
  console.log(req.hostname);            // Hostname
  console.log(req.ip);                  // Client IP
  console.log(req.cookies);             // Cookies (with cookie-parser)
  console.log(req.get('Content-Type')); // Get header
});
```

**Response Object (res)**
```javascript
app.get('/', (req, res) => {
  // Send response
  res.send('Hello');                           // Send string/HTML
  res.json({ msg: 'Hello' });                 // Send JSON
  res.sendFile(__dirname + '/index.html');    // Send file
  res.download('file.pdf');                   // Download file
  
  // Status codes
  res.status(200);                            // Set status
  res.status(404).send('Not found');          // Status + send
  
  // Headers
  res.set('Content-Type', 'text/plain');      // Set header
  res.setHeader('X-Custom', 'value');         // Set header
  
  // Redirects
  res.redirect('/home');                      // Redirect
  res.redirect(301, '/home');                 // Redirect with status
  
  // Cookies
  res.cookie('name', 'value');                // Set cookie
  res.clearCookie('name');                    // Clear cookie
});
```

### 4. Handling Different Data Formats

**JSON**
```javascript
// POST request
app.post('/api/users', express.json(), (req, res) => {
  console.log(req.body);
  res.json({ success: true, data: req.body });
});
```

**Form Data**
```javascript
app.post('/form', express.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  res.send('Form data received');
});
```

**File Upload**
```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename });
});
```

### 5. View Engines (Templates)

**Setting up EJS**
```bash
npm install ejs
```

```javascript
// Configure
app.set('view engine', 'ejs');
app.set('views', './views');

// Render template
app.get('/user/:name', (req, res) => {
  res.render('user', { name: req.params.name });
});
```

**EJS Template** (views/user.ejs)
```html
<!DOCTYPE html>
<html>
<head>
  <title>User Page</title>
</head>
<body>
  <h1>Hello, <%= name %>!</h1>
  <% if (name === 'admin') { %>
    <p>Administrator view</p>
  <% } %>
</body>
</html>
```

---

## Advanced Features

### 1. Modular Routing

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ created: true });
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
```

### 2. Request Validation

```javascript
const { body, validationResult } = require('express-validator');

app.post('/users',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ success: true });
  }
);
```

### 3. Authentication Middleware

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  // Verify token logic here
  req.user = { id: 1 };
  next();
};

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});
```

### 4. CORS Support

```bash
npm install cors
```

```javascript
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Enable CORS for specific route
app.get('/api/data', cors(), (req, res) => {
  res.json({ data: 'allowed' });
});

// Configure CORS options
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
```

### 5. Database Integration

**MongoDB with Mongoose**
```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
```

---

## Project Structure

```
my-express-app/
├── src/
│   ├── app.js                    # Main Express app
│   ├── server.js                 # Server entry point
│   ├── routes/
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   └── config/
│       └── database.js
├── views/
│   ├── user.ejs
│   └── home.ejs
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── tests/
│   └── users.test.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Essential Middleware Packages

```bash
npm install cors helmet morgan express-validator bcryptjs jsonwebtoken dotenv
```

| Package | Purpose |
|---------|---------|
| **cors** | Enable CORS |
| **helmet** | Security headers |
| **morgan** | HTTP request logger |
| **express-validator** | Input validation |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT authentication |
| **dotenv** | Environment variables |

---

## Best Practices

### 1. Environment Variables
```javascript
// .env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your_secret_key

// app.js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

### 2. Error Handling
```javascript
// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ error: message });
});
```

### 3. Logging
```javascript
const morgan = require('morgan');

app.use(morgan('combined'));
```

### 4. Security
```javascript
const helmet = require('helmet');

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.disable('x-powered-by');
```

---

## Performance Tips

1. **Use Clustering** for multi-core systems
2. **Implement Caching** for frequent requests
3. **Use Async/Await** instead of callbacks
4. **Optimize Middleware** order
5. **Use Reverse Proxy** (nginx) in production
6. **Enable Compression** for responses
7. **Monitor Performance** with APM tools

---

## Useful Resources

- **Official Docs**: https://expressjs.com
- **Express Best Practices**: https://expressjs.com/en/advanced/best-practice-security.html
- **Awesome Express**: https://github.com/rajikaimal/awesome-express
- **Example Projects**: https://github.com/expressjs/express/wiki/applications

---

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| `Cannot find module 'express'` | Run `npm install express` |
| `Cannot POST /route` | Check method or route definition |
| `res.send() called twice` | Use `return` statement |
| `Middleware not executing` | Check middleware order |

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

