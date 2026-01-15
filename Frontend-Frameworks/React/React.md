# React

## Introduction

### Overview

React is a JavaScript library for building user interfaces with reusable components. Developed by Facebook, it enables developers to create interactive, dynamic web applications with a declarative approach to UI development.

### Key Features

- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient rendering and updates with React's virtual DOM implementation
- **Unidirectional Data Flow**: Predictable state management through props and state
- **JSX Syntax**: Write HTML-like syntax directly in JavaScript
- **Hooks**: Use state and other React features without writing class components
- **Large Ecosystem**: Rich ecosystem with tools like Redux, React Router, and Next.js

### Core Concepts

1. **Components**: Reusable UI elements (functional or class-based)
2. **Props**: Immutable data passed to components
3. **State**: Mutable data managed within components
4. **Hooks**: Functions like useState, useEffect for state management
5. **Virtual DOM**: React's in-memory representation of the actual DOM
6. **Reconciliation**: React's algorithm for updating the DOM efficiently

### Common Use Cases

- Single Page Applications (SPAs)
- Progressive Web Apps (PWAs)
- Real-time applications
- Complex interactive dashboards
- Mobile applications (React Native)

### Prerequisites

- Basic JavaScript knowledge
- Understanding of ES6+ syntax
- Familiarity with HTML/CSS

### Getting Started

Install Node.js and npm, then use Create React App or Vite to bootstrap a React project.

### Resources

- Official Documentation: <https://react.dev>
- Create React App: <https://create-react-app.dev>
- React Router: <https://reactrouter.com>
- Redux: <https://redux.js.org>

---

## User Guide

### Installation

#### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Code editor (VS Code recommended)

#### Method 1: Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

#### Method 2: Vite (Faster)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── components/
├── package.json
└── .gitignore
```

### Basic Component Example

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

### Common Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm install        # Install dependencies
```

### State Management

- **useState**: For local component state
- **useContext**: For passing data without props drilling
- **Redux**: For complex global state management
- **Zustand**: Lightweight state management

### Routing

Use React Router for multi-page applications:

```bash
npm install react-router-dom
```

### Best Practices

1. Keep components small and focused
2. Use functional components with hooks
3. Lift state up when needed
4. Memoize expensive computations
5. Use keys correctly in lists
6. Separate concerns (UI, logic, styles)
7. Write tests for critical functionality

### Debugging Tools

- React Developer Tools (Browser Extension)
- Redux DevTools
- Chrome DevTools
- VS Code Debugger

### Performance Optimization

- Code splitting and lazy loading
- Memoization (React.memo, useMemo)
- Virtual list rendering
- Server-side rendering (Next.js)
