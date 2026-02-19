# JavaScript

## Introduction

## Overview

JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

## Key Features

- **Universal**: Runs in all major browsers and on servers via Node.js.
- **Dynamic Typing**: Variables are not bound to specific data types.
- **Prototype-based OOP**: Objects inherit directly from other objects.
- **Asynchronous**: Event-driven non-blocking I/O model (Promises, async/await).
- **Huge Ecosystem**: npm is the largest software registry in the world.

## Common Use Cases

- **Web Development**: Interactive frontend logic (React, Vue, Angular).
- **Backend Development**: APIs and services (Node.js, Express, NestJS).
- **Mobile Development**: Cross-platform apps (React Native, Expo).
- **Desktop Apps**: Electron (VS Code, Slack).

## Resources

- MDN Web Docs: <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
- Node.js: <https://nodejs.org/>
- The Modern JavaScript Tutorial: <https://javascript.info/>

---

## User Guide

## Install

JavaScript runs natively in web browsers. For server-side or local execution, install **Node.js**.

- **Windows/macOS/Linux**: Download LTS version from <https://nodejs.org/>.
- **macOS (Homebrew)**: `brew install node`
- **Linux (Debian/Ubuntu)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

Verify installation:
```bash
node -v
npm -v
```

## Quick Start

### Browser Console
Open your browser's Developer Tools (F12 or Cmd+Option+I), go to the **Console** tab, and type:
```javascript
console.log("Hello from the browser!");
```

### Node.js REPL
Run `node` in your terminal:
```bash
node
> console.log("Hello from Node.js!");
```
(Press Ctrl+C twice to exit).

## Minimal Program

Create a file named `hello.js`:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

Run it with Node.js:

```bash
node hello.js
```

## Modern Syntax (ES6+)

### Variables
```javascript
const pi = 3.14; // Constant
let count = 0;   // Mutable
// var is generally avoided in modern JS
```

### Arrow Functions
```javascript
const add = (a, b) => a + b;
```

### Classes
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
```

### Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## Key Concepts

- **Scope**: Block (`let`, `const`) vs Function (`var`).
- **Closures**: Functions retaining access to their lexical scope.
- **Event Loop**: How JS handles async operations.
- **DOM**: Document Object Model (browser only).
- **Modules**: `import` / `export` (ESM) vs `require` (CommonJS).

## Next Steps

- Learn **TypeScript** for static typing.
- Explore frontend frameworks like **React** or **Vue**.
- Build a backend API with **Express** or **Fastify**.

