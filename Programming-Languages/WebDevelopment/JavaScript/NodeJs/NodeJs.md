# NodeJs

## Introduction

# Node.js - Introduction

## What is Node.js?

**Node.js** is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. Built on Chrome's V8 JavaScript engine, Node.js enables developers to use JavaScript for server-side scripting, creating dynamic web page content before the page is sent to the user's browser.

## Key Features

### 1. **Asynchronous and Event-Driven**

- All APIs of Node.js library are asynchronous (non-blocking)
- The server never waits for an API to return data
- Moves to the next API after calling it
- Uses events to get response from previous API calls

### 2. **Fast Execution**

- Built on Google Chrome's V8 JavaScript engine
- V8 compiles JavaScript directly to native machine code
- Exceptionally fast code execution

### 3. **Single-Threaded but Highly Scalable**

- Uses a single-threaded model with event looping
- Event mechanism helps server respond in a non-blocking way
- Makes it highly scalable compared to traditional servers
- Can handle many more concurrent requests than traditional servers

### 4. **No Buffering**

- Node.js applications never buffer any data
- Output data in chunks
- Significantly reduces processing time

### 5. **Cross-Platform**

- Runs on Windows, macOS, Linux, and Unix
- Write once, run anywhere approach
- Consistent behavior across platforms

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Application                     │
│            (JavaScript/Node.js Code)             │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              Node.js Bindings                    │
│         (C++ Wrapper around V8)                  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                 V8 Engine                        │
│         (JavaScript Execution)                   │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                  libuv                           │
│         (Async I/O, Event Loop)                  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│            Operating System                      │
└─────────────────────────────────────────────────┘
```

## Event Loop

The Event Loop is what allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded:

1. **Timers** - Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks** - Executes I/O callbacks deferred to the next loop iteration
3. **Idle, Prepare** - Internal use only
4. **Poll** - Retrieves new I/O events; executes I/O related callbacks
5. **Check** - `setImmediate()` callbacks are invoked here
6. **Close Callbacks** - Close callbacks (e.g., `socket.on('close', ...)`)

## Core Modules

Node.js comes with built-in modules that don't require installation:

| Module | Purpose |
|--------|---------|
| `http` | Create HTTP servers and clients |
| `https` | Create HTTPS servers and clients |
| `fs` | File system operations (read, write, delete files) |
| `path` | Handle and transform file paths |
| `os` | Operating system-related utility methods |
| `events` | Event emitter for handling events |
| `stream` | Handle streaming data |
| `crypto` | Cryptographic functionality |
| `buffer` | Handle binary data |
| `url` | URL resolution and parsing |
| `querystring` | Parse and format URL query strings |
| `util` | Utility functions |

## Use Cases

### 1. **Web Applications**

- Real-time web applications
- Single-page applications (SPAs)
- RESTful APIs
- Microservices architecture

### 2. **Real-Time Applications**

- Chat applications
- Live notifications
- Collaborative tools
- Gaming servers

### 3. **Streaming Applications**

- Video/audio streaming
- Data processing pipelines
- File upload/download services

### 4. **Command-Line Tools**

- Build tools (Webpack, Gulp, Grunt)
- Package managers (npm, Yarn)
- Development utilities

### 5. **IoT Applications**

- Sensor data collection
- Device control systems
- Real-time monitoring

## Advantages

✅ **JavaScript Everywhere** - Use same language for frontend and backend  
✅ **Large Ecosystem** - npm has over 1 million packages  
✅ **High Performance** - V8 engine and non-blocking I/O  
✅ **Scalability** - Handle thousands of concurrent connections  
✅ **Active Community** - Large developer community and support  
✅ **Easy to Learn** - Familiar syntax for JavaScript developers  
✅ **Fast Development** - Rapid prototyping and development  
✅ **Corporate Support** - Backed by major companies (Google, Microsoft, IBM)

## Disadvantages

❌ **Callback Hell** - Nested callbacks can make code hard to read (mitigated with Promises/async-await)  
❌ **Single-Threaded** - CPU-intensive tasks can block the event loop  
❌ **Frequent API Changes** - APIs can change between versions  
❌ **Not Suitable for Heavy Computation** - Better alternatives exist for CPU-bound tasks  
❌ **Immaturity of Tools** - Some tools/libraries are still evolving

## NPM (Node Package Manager)

**npm** is the default package manager for Node.js:

- **World's largest software registry**
- Over 1 million packages available
- Manages dependencies for your project
- Publishes and shares packages

### Common npm Commands

```
npm init                    # Initialize a new project
npm install <package>       # Install a package
npm install -g <package>    # Install package globally
npm uninstall <package>     # Remove a package
npm update                  # Update packages
npm list                    # List installed packages
npm search <term>           # Search for packages
npm run <script>            # Run script from package.json
```

## Popular Node.js Frameworks

| Framework | Purpose | Features |
|-----------|---------|----------|
| **Express.js** | Web application framework | Minimal, fast, unopinionated |
| **Koa.js** | Modern web framework | Smaller, more expressive, async/await |
| **Nest.js** | Progressive framework | TypeScript, modular, scalable |
| **Fastify** | Web framework | High performance, low overhead |
| **Hapi.js** | Rich framework | Configuration-centric, enterprise-ready |
| **Socket.io** | Real-time communication | WebSocket support, fallbacks |
| **Next.js** | React framework | SSR, static generation, routing |
| **Meteor** | Full-stack platform | Real-time, isomorphic |

## Who Uses Node.js?

Major companies using Node.js in production:

- **Netflix** - Backend services, UI layer
- **LinkedIn** - Mobile backend
- **Uber** - Massive distributed system
- **PayPal** - Web application backend
- **NASA** - Microservices architecture
- **Twitter** - Various services
- **Walmart** - E-commerce platform
- **eBay** - Scalable services
- **Medium** - Server-side rendering
- **Trello** - Real-time collaboration

## Example: Hello World Server

```javascript
// Import http module
const http = require('http');

// Define hostname and port
const hostname = '127.0.0.1';
const port = 3000;

// Create server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Getting Started

1. **Install Node.js** - Download from [nodejs.org](https://nodejs.org/)
2. **Verify Installation** - Run `node --version` and `npm --version`
3. **Create a Project** - Run `npm init` in your project directory
4. **Write Code** - Create a `.js` file with your code
5. **Run Application** - Execute `node filename.js`

## Best Practices

1. **Use Environment Variables** - Store configuration separately
2. **Handle Errors Properly** - Use try-catch and error-first callbacks
3. **Use Async/Await** - Avoid callback hell
4. **Implement Logging** - Use logging libraries (Winston, Bunyan)
5. **Security** - Validate input, use HTTPS, keep dependencies updated
6. **Testing** - Write unit and integration tests (Jest, Mocha)
7. **Code Style** - Use ESLint for consistent code style
8. **Use Process Managers** - PM2 or Forever for production
9. **Monitor Performance** - Use APM tools (New Relic, AppDynamics)
10. **Keep Dependencies Updated** - Regularly update npm packages

## Learning Path

### Beginner

1. JavaScript fundamentals
2. Node.js basics (modules, event loop)
3. npm and package.json
4. File system operations
5. Basic HTTP server

### Intermediate

1. Express.js framework
2. RESTful API design
3. Database integration (MongoDB, PostgreSQL)
4. Authentication and authorization
5. Error handling and logging

### Advanced

1. Microservices architecture
2. WebSockets and real-time communication
3. Performance optimization
4. Security best practices
5. Testing strategies
6. Deployment and DevOps
7. Scaling Node.js applications

## Resources

- **Official Documentation**: [nodejs.org/docs](https://nodejs.org/docs)
- **npm Registry**: [npmjs.com](https://www.npmjs.com/)
- **Node.js Guides**: [nodejs.dev](https://nodejs.dev/)
- **GitHub Repository**: [github.com/nodejs/node](https://github.com/nodejs/node)

---

**Node.js** revolutionized JavaScript by bringing it to the server-side, enabling full-stack JavaScript development and powering millions of applications worldwide. Its event-driven, non-blocking architecture makes it ideal for building scalable, real-time applications.

---

## Installation

### Windows & macOS
1. Download the **LTS (Long Term Support)** installer from [nodejs.org](https://nodejs.org/).
2. Run the installer and follow the prompts.
3. (Optional) On macOS, you can also use Homebrew:
   ```bash
   brew install node
   ```

### Linux (Debian/Ubuntu)
Using NodeSource binary distributions (recommended):
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Version Managers (Recommended)
Using a version manager like `nvm` (Node Version Manager) allows you to easily switch between Node.js versions.

**Install nvm (Linux/macOS):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

**Windows:** Use `nvm-windows`.

## Quick Start

### 1. Verify Installation
Open your terminal and check the versions:
```bash
node -v
npm -v
```

### 2. The REPL (Read-Eval-Print Loop)
Type `node` and press Enter to start an interactive JavaScript session:
```bash
$ node
> 1 + 1
2
> const name = 'Node.js';
undefined
> console.log(`Hello ${name}`);
Hello Node.js
undefined
> .exit
```

### 3. Running a Script
Create a file named `app.js`:
```javascript
console.log("Hello from file!");
```

Run it:
```bash
node app.js
```

## NPM (Node Package Manager)

### Initialize a Project
Create a `package.json` file to manage your project configuration and dependencies.
```bash
mkdir my-node-app
cd my-node-app
npm init -y  # -y accepts all defaults
```

### Install Dependencies
**Production dependencies** (e.g., web frameworks, database drivers):
```bash
npm install express mongoose
```

**Development dependencies** (e.g., testing tools, linters):
```bash
npm install --save-dev jest nodemon
```

### Usage in Code
```javascript
// Import the installed package
const express = require('express');
const app = express();
```

## Basic Concepts & Patterns

### 1. Modules (CommonJS)
**math.js**:
```javascript
const add = (a, b) => a + b;
module.exports = { add };
```

**index.js**:
```javascript
const math = require('./math');
console.log(math.add(5, 3)); // 8
```

### 2. ES Modules (Modern)
Set `"type": "module"` in `package.json` or use `.mjs` extension.

**math.mjs**:
```javascript
export const add = (a, b) => a + b;
```

**index.mjs**:
```javascript
import { add } from './math.mjs';
console.log(add(5, 3));
```

### 3. File System (Async/Await)
Reading a file without blocking the event loop:
```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();
```

### 4. HTTP Server
A simple web server:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Welcome to Home Page');
    res.end();
  } else if (req.url === '/api') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: 'Hello JSON' }));
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => console.log('Listening on port 3000...'));
```

## Debugging

1. **Console**: Use `console.log()`, `console.error()`, `console.table()`.
2. **Inspector**: Run with `--inspect` flag to debug in Chrome DevTools.
   ```bash
   node --inspect app.js
   ```
   Open `chrome://inspect` in Chrome and click "Open dedicated DevTools for Node".
3. **VS Code**: Use the built-in "Run and Debug" side panel.

