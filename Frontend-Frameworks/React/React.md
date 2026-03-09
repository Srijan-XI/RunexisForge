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

---

## Advanced Concepts

### React Hooks Deep Dive

#### useEffect Hook
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Runs after every render by default
    let isMounted = true;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data = await response.json();
        if (isMounted) {
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]); // Dependency array - runs when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>Welcome, {user?.name}</div>;
}
```

#### useReducer Hook
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

#### useCallback Hook
```jsx
import React, { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Memoized callback - only recreated if dependencies change
  const handleAddTodo = useCallback(() => {
    if (text.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text }]);
      setText('');
    }
  }, [text]);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </div>
  );
}
```

#### useMemo Hook
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ numbers }) {
  const [multiplier, setMultiplier] = useState(1);

  // Memoized value - only recalculated when dependencies change
  const total = useMemo(() => {
    console.log('Calculating total...');
    return numbers.reduce((sum, num) => sum + num, 0) * multiplier;
  }, [numbers, multiplier]);

  return (
    <div>
      <h2>Total: {total}</h2>
      <input 
        type="number" 
        value={multiplier} 
        onChange={(e) => setMultiplier(Number(e.target.value))} 
      />
    </div>
  );
}
```

#### useRef Hook
```jsx
import React, { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
    renderCount.current += 1;
  });

  return (
    <div>
      <input ref={inputRef} type="text" />
      <p>Component rendered {renderCount.current} times</p>
    </div>
  );
}
```

#### Custom Hooks
```jsx
import { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>User: {user.name}</div>;
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

---

## State Management

### Context API

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext(null);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // API call
    const userData = await loginAPI(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage in App
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

// Usage in components
function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all'
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTodo, toggleTodo, removeTodo, setFilter } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});

// index.js
import { Provider } from 'react-redux';
import { store } from './store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Component usage
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './store';

function TodoApp() {
  const todos = useSelector(state => state.todos.items);
  const dispatch = useDispatch();

  const handleAdd = (text) => {
    dispatch(addTodo(text));
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

### Zustand (Lightweight Alternative)

```bash
npm install zustand
```

```jsx
import { create } from 'zustand';

// Create store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Usage in component
function Counter() {
  const { count, increment, decrement, reset } = useStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

## Routing with React Router

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component with route parameters
function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile: {id}</h1>
      <button onClick={() => navigate('/users')}>Back to Users</button>
    </div>
  );
}

// Protected routes
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

---

## Forms and Validation

### React Hook Form
```bash
npm install react-hook-form
```

```jsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch 
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">Register</button>
    </form>
  );
}
 ```

---

## Data Fetching

### React Query (TanStack Query)

```bash
npm install @tanstack/react-query
```

```jsx
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';

// Setup
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  );
}

// Fetching data
function Users() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/users');
      return response.json();
    },
    staleTime: 5000, // Data stays fresh for 5 seconds
    cacheTime: 10000, // Cache for 10 seconds
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

// Mutations
function CreateUser() {
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name: 'New User' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create User'}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>User created!</div>}
    </form>
  );
}
```

---

## Real-World Use Cases

### E-commerce Product Listing

```jsx
import React, { useState } from 'react';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: 'all', priceRange: 'all' });
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(p => filters.category === 'all' || p.category === filters.category)
    .filter(p => {
      if (filters.priceRange === 'all') return true;
      if (filters.priceRange === 'low') return p.price < 50;
      if (filters.priceRange === 'high') return p.price >= 50;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="product-listing">
      <aside className="filters">
        <select onChange={e => setFilters({...filters, category: e.target.value})}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        
        <select onChange={e => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </aside>

      <main className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => setInCart(!inCart)}>
        {inCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

### Real-Time Dashboard

```jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function Dashboard() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({ users: 0, revenue: 0, orders: 0 });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100)
      };
      
      setData(prev => [...prev.slice(-20), newDataPoint]);
      
      setMetrics({
        users: Math.floor(Math.random() * 1000),
        revenue: Math.floor(Math.random() * 50000),
        orders: Math.floor(Math.random() * 500)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="metrics">
        <MetricCard title="Active Users" value={metrics.users} />
        <MetricCard title="Revenue" value={`$${metrics.revenue}`} />
        <MetricCard title="Orders" value={metrics.orders} />
      </div>

      <div className="chart">
        <h2>Real-Time Activity</h2>
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
}
```

### Infinite Scroll Blog

```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

function InfiniteScrollBlog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const lastPostRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.example.com/posts?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setPosts(prev => [...prev, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="blog">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <BlogPost ref={lastPostRef} key={post.id} post={post} />;
        }
        return <BlogPost key={post.id} post={post} />;
      })}
      {loading && <div>Loading more posts...</div>}
    </div>
  );
}

const BlogPost = React.forwardRef(({ post }, ref) => (
  <article ref={ref} className="blog-post">
    <h2>{post.title}</h2>
    <p>{post.excerpt}</p>
  </article>
));
```

---

## Performance Optimization Techniques

### Code Splitting & Lazy Loading

```jsx
import React, { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### React.memo for Component Memoization

```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  console.log('Rendering expensive component');
  
  return (
    <div onClick={onClick}>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data === nextProps.data && 
         prevProps.onClick === nextProps.onClick;
});
```

### Virtual Lists for Large Data

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window';

function LargeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Debouncing and Throttling

```jsx
import { useState, useCallback } from 'react';

// Custom debounce hook
function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    
    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeoutId(newTimeoutId);
  }, [callback, delay, timeoutId]);

  return debouncedCallback;
}

// Usage
function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSearch = useDebounce((value) => {
    console.log('Searching for:', value);
    // API call here
  }, 500);

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}
```

---

## Testing

### Jest Unit Tests

```jsx
// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByText(/Counter: 0/i)).toBeInTheDocument();
  });

  test('increments count when button clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment');
    
    fireEvent.click(incrementButton);
    
    expect(screen.getByText(/Counter: 1/i)).toBeInTheDocument();
  });

  test('decrements count when button clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByText('Decrement');
    
    fireEvent.click(decrementButton);
    
    expect(screen.getByText(/Counter: -1/i)).toBeInTheDocument();
  });
});
```

### Testing Async Components

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

test('loads and displays user data', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'John Doe' })
    })
  );

  render(<UserProfile userId="123" />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
  });

  global.fetch.mockClear();
});
```

---

## Best Practices Checklist

✅ **Component Design**
- Keep components small and focused
- Use functional components with hooks
- Follow single responsibility principle
- Extract reusable logic into custom hooks

✅ **State Management**
- Lift state up only when necessary
- Use Context API for theme, auth, etc.
- Consider Redux/Zustand for complex global state
- Keep state as local as possible

✅ **Performance**
- Use React.memo for expensive components
- Implement code splitting and lazy loading
- Memoize callbacks and computed values
- Use production build for deployment

✅ **Code Quality**
- Use TypeScript for type safety
- Follow consistent naming conventions
- Write meaningful component and variable names
- Add prop-types or TypeScript interfaces

✅ **Testing**
- Write unit tests for utility functions
- Test component behavior, not implementation
- Use integration tests for critical flows
- Aim for meaningful test coverage

✅ **Accessibility**
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

---

## Modern React Ecosystem (2026)

### React 19 Features

**Server Components**
```jsx
// Server Component (runs on server)
async function BlogPost({ id }) {
  const post = await db.posts.find(id); // Direct database access
  
  return (
    <article>
      <h1>{post.title}</h1>
      <Content body={post.body} />
    </article>
  );
}
```

**Actions**
```jsx
// Form actions
function CommentForm({ postId }) {
  async function submitComment(formData) {
    'use server'; // Server action
    
    const comment = formData.get('comment');
    await db.comments.create({ postId, text: comment });
  }

  return (
    <form action={submitComment}>
      <textarea name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Recommended Tech Stack 2026

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@testing-library/react": "^14.1.0",
    "vitest": "^1.0.0"
  }
}
```

---

## Resources & Learning Path

### Official Resources
- [React Official Documentation](https://react.dev/)
- [React GitHub Repository](https://github.com/facebook/react)
- [React Blog](https://react.dev/blog)

### Popular Libraries
- [Next.js](https://nextjs.org/) - React framework
- [Remix](https://remix.run/) - Full-stack framework
- [React Router](https://reactrouter.com/) - Routing
- [Material-UI](https://mui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

### Learning Resources
- [React Tutorial](https://react.dev/learn)
- [Epic React by Kent C. Dodds](https://epicreact.dev/)
- [React Patterns](https://reactpatterns.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Community
- [React Discord](https://discord.gg/react)
- [r/reactjs Subreddit](https://reddit.com/r/reactjs)
- [React Newsletter](https://reactnewsletter.com/)

---

**This comprehensive guide covers React from fundamentals to advanced patterns. Continue practicing, building projects, and staying updated with the evolving React ecosystem!** 🚀
