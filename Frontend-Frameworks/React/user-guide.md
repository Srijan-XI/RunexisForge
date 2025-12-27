# React Installation and Usage Guide

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Code editor (VS Code recommended)

### Method 1: Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```javascript

### Method 2: Vite (Faster)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```bash

## Project Structure

```bash
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
```bash

## Basic Component Example

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
```bash

## Common Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm install        # Install dependencies
```bash

## State Management

- **useState**: For local component state
- **useContext**: For passing data without props drilling
- **Redux**: For complex global state management
- **Zustand**: Lightweight state management

## Routing

Use React Router for multi-page applications:

```bash
npm install react-router-dom
```bash

## Best Practices

1. Keep components small and focused
2. Use functional components with hooks
3. Lift state up when needed
4. Memoize expensive computations
5. Use keys correctly in lists
6. Separate concerns (UI, logic, styles)
7. Write tests for critical functionality

## Debugging Tools

- React Developer Tools (Browser Extension)
- Redux DevTools
- Chrome DevTools
- VS Code Debugger

## Performance Optimization

- Code splitting and lazy loading
- Memoization (React.memo, useMemo)
- Virtual list rendering
- Server-side rendering (Next.js)
