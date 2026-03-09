# Node.js

## Introduction

## Overview

**Node.js** is a cross-platform, open-source JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to use JavaScript for server-side programming, enabling full-stack JavaScript development.

### Key Characteristics

- **Single-threaded, Event-driven Architecture**: Asynchronous, non-blocking I/O model
- **NPM Ecosystem**: Access to millions of packages via npm
- **Cross-platform**: Runs on Windows, macOS, Linux
- **High Performance**: V8 engine provides excellent performance
- **Microservices-friendly**: Lightweight and scalable

### Why Choose Node.js?

✅ Full-stack JavaScript development  
✅ Excellent for real-time applications  
✅ Fast development with rapid prototyping  
✅ Huge ecosystem of libraries and tools  
✅ Built-in package manager (npm)  
✅ Great for APIs and microservices  

---

## Installation

### Windows

**Option 1: Direct Download**
1. Visit [nodejs.org](https://nodejs.org)
2. Download LTS (Long-term Support) version
3. Run the installer (.msi file)
4. Follow the installation wizard
5. Accept default settings for npm

**Option 2: Using Chocolatey**
```powershell
choco install nodejs
```

**Option 3: Using Windows Package Manager**
```powershell
winget install OpenJS.NodeJS
```

### macOS

**Using Homebrew**
```bash
brew install node
```

**Using MacPorts**
```bash
sudo port install nodejs20
```

**Direct Download**
- Visit [nodejs.org](https://nodejs.org)
- Download and run the installer

### Linux (Ubuntu/Debian)

**Using NodeSource Repository**
```bash
# For Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Using Snap**
```bash
sudo snap install node --classic
```

**Using apt**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Linux (Fedora/CentOS/RHEL)

```bash
# Using DNF
sudo dnf install nodejs npm

# Using Yum
sudo yum install nodejs npm
```

### Verify Installation

```bash
node --version      # v20.x.x
npm --version       # 10.x.x
npx --version       # 10.x.x
```

---

## Getting Started

### Creating Your First Project

```bash
# Create project directory
mkdir my-node-app
cd my-node-app

# Initialize package.json
npm init -y

# Create main file
echo "console.log('Hello, Node.js!');" > app.js

# Run the application
node app.js
```

### package.json Structure

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js application",
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

### Node.js Fundamentals

#### 1. Asynchronous Programming

**Callbacks**
```javascript
// Traditional callback
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

**Promises**
```javascript
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**Async/Await**
```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```

#### 2. Modules

**Built-in Modules**
```javascript
const fs = require('fs');
const http = require('http');
const path = require('path');
const util = require('util');
const events = require('events');
```

**Creating Custom Modules**
```javascript
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

// app.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
```

**ES6 Modules** (with .mjs or "type": "module" in package.json)
```javascript
// export
export const greet = (name) => `Hello, ${name}!`;

// import
import { greet } from './greet.mjs';
console.log(greet('World'));
```

#### 3. Event Emitter

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('Event triggered!');
});

myEmitter.emit('event');
```

#### 4. File System Operations

```javascript
const fs = require('fs').promises;

// Read file
const data = await fs.readFile('file.txt', 'utf8');

// Write file
await fs.writeFile('output.txt', 'Hello, World!');

// Append to file
await fs.appendFile('log.txt', '\nNew log entry');

// Delete file
await fs.unlink('temp.txt');

// List directory
const files = await fs.readdir('./');
```

#### 5. HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## Popular Node.js Frameworks

| Framework | Use Case | Learning Curve |
|-----------|----------|-----------------|
| **Express** | REST APIs, Web Apps | Easy |
| **NestJS** | Large apps, Enterprise | Medium |
| **Fastify** | High-performance APIs | Easy-Medium |
| **Koa** | Modern, Minimal | Medium |
| **Hapi** | Robust APIs, Plugins | Medium-Hard |
| **Next.js** | Full-stack React | Easy-Medium |
| **Sails.js** | Full-stack MVC | Medium |
| **Adonis** | Rails-like experience | Medium |

---

## Essential Tools & Packages

### Development Tools

```bash
# Nodemon - Auto-restart server on file changes
npm install -D nodemon

# Dotenv - Environment variables
npm install dotenv

# Chalk - Colored console output
npm install chalk

# Winston - Logging library
npm install winston
```

### Productivity

```bash
# Node Version Manager (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# NVM for Windows
# Download from: https://github.com/coreybutler/nvm-windows/releases
```

---

## Best Practices

### 1. Error Handling
```javascript
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
```

### 2. Environment Variables
```javascript
// .env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp

// app.js
require('dotenv').config();
const port = process.env.PORT || 3000;
```

### 3. Module Organization
```
project/
├── src/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── tests/
├── .env
├── .env.example
├── package.json
└── README.md
```

### 4. Graceful Shutdown
```javascript
const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
```

---

## Performance Optimization

### 1. Clustering
```javascript
const cluster = require('cluster');
const os = require('os');
const app = require('./app');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(3000);
}
```

### 2. Caching
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

app.get('/data', (req, res) => {
  let data = cache.get('myData');
  
  if (data === undefined) {
    data = fetchExpensiveData();
    cache.set('myData', data);
  }
  
  res.json(data);
});
```

### 3. Stream Processing
```javascript
const fs = require('fs');

// Instead of reading entire file into memory
fs.createReadStream('large-file.txt')
  .pipe(process.stdout);
```

---

## Useful Resources

- **Official Documentation**: https://nodejs.org/docs
- **npm Registry**: https://npmjs.com
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices
- **Node.js Tutorial**: https://www.tutorialspoint.com/nodejs
- **Node.js Security**: https://nodejs.org/en/docs/guides/security

---

## Next Steps

1. Learn **Express.js** for building web applications
2. Master **Async/Await** patterns
3. Explore **npm** and package management
4. Study **REST API** design principles
5. Implement proper **error handling**
6. Learn about **middleware** concepts
7. Set up **testing** with Jest or Mocha

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Missing dependency | Run `npm install` |
| `Port already in use` | Another process using port | Change port or kill process |
| `EACCES permission denied` | npm global permissions | Use `sudo` or fix permissions |
| `Module not found in node_modules` | Missing package.json dependencies | Run `npm install` |

---

**Status**: ✅ Complete  
**Last Updated**: January 2025  
**Version**: 1.0

