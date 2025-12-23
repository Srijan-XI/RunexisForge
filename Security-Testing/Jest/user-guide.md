# Jest User Guide

## Table of Contents
1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Writing Tests](#writing-tests)
4. [Matchers](#matchers)
5. [Testing Async Code](#testing-async-code)
6. [Mocking](#mocking)
7. [Snapshot Testing](#snapshot-testing)
8. [Testing React Components](#testing-react-components)
9. [Code Coverage](#code-coverage)
10. [Configuration](#configuration)
11. [Best Practices](#best-practices)

---

## Installation

### Node.js Project

#### Using npm
```bash
# Initialize package.json if needed
npm init -y

# Install Jest
npm install --save-dev jest
```

#### Using yarn
```bash
yarn add --dev jest
```

#### Using pnpm
```bash
pnpm add -D jest
```

### Add Test Script

Edit `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### TypeScript Setup

```bash
npm install --save-dev @types/jest ts-jest typescript
```

**Create `jest.config.js`:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

### React Project

#### Create React App
Jest is included by default!

#### Manual React Setup
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @babel/preset-react
```

**Create `babel.config.js`:**
```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
```

---

## Basic Setup

### File Structure

```
project/
├── src/
│   ├── math.js
│   ├── math.test.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── helpers.test.js
│   └── __tests__/
│       └── integration.test.js
├── package.json
└── jest.config.js
```

### Naming Conventions

**Test files:**
- `*.test.js`
- `*.spec.js`
- `__tests__/*.js`

### Your First Test

**Create `sum.js`:**
```javascript
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

**Create `sum.test.js`:**
```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Run tests:**
```bash
npm test
```

---

## Writing Tests

### Test Structure

```javascript
// Basic test
test('description', () => {
  // Test code
});

// Alternative syntax
it('description', () => {
  // Test code
});

// Test suite
describe('Feature', () => {
  test('scenario 1', () => {});
  test('scenario 2', () => {});
});
```

### Setup and Teardown

```javascript
describe('Database', () => {
  // Runs once before all tests in this suite
  beforeAll(() => {
    console.log('Connect to database');
  });

  // Runs before each test
  beforeEach(() => {
    console.log('Clear database');
  });

  // Runs after each test
  afterEach(() => {
    console.log('Clean up test data');
  });

  // Runs once after all tests
  afterAll(() => {
    console.log('Disconnect from database');
  });

  test('inserts data', () => {
    // Test code
  });

  test('reads data', () => {
    // Test code
  });
});
```

### Test Skipping and Isolation

```javascript
// Skip test
test.skip('this test will not run', () => {});

// Only run this test
test.only('only this test runs', () => {});

// Skip entire suite
describe.skip('skipped suite', () => {});

// Only run this suite
describe.only('only suite', () => {});

// Pending test (todo)
test.todo('implement this test later');
```

---

## Matchers

### Common Matchers

#### Equality
```javascript
test('equality matchers', () => {
  expect(2 + 2).toBe(4);                    // Strict equality (===)
  expect({ name: 'John' }).toEqual({ name: 'John' }); // Deep equality
  expect([1, 2, 3]).toEqual([1, 2, 3]);     // Array equality
});
```

#### Truthiness
```javascript
test('truthiness', () => {
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect('hello').toBeDefined();
});
```

#### Numbers
```javascript
test('numbers', () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(5);
  expect(5).toBeGreaterThanOrEqual(5);
  expect(3).toBeLessThanOrEqual(3);
  
  // Floating point
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
```

#### Strings
```javascript
test('strings', () => {
  expect('team').not.toMatch(/I/);
  expect('Christoph').toMatch(/stop/);
  expect('hello world').toContain('world');
});
```

#### Arrays and Iterables
```javascript
test('arrays', () => {
  const shoppingList = ['milk', 'bread', 'eggs'];
  
  expect(shoppingList).toContain('milk');
  expect(shoppingList).toHaveLength(3);
  expect(new Set(shoppingList)).toContain('bread');
});
```

#### Objects
```javascript
test('objects', () => {
  const user = {
    name: 'John',
    age: 30,
    address: { city: 'New York' }
  };
  
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('address.city');
  expect(user).toHaveProperty('age', 30);
  expect(user).toMatchObject({
    name: 'John',
    age: 30
  });
});
```

#### Exceptions
```javascript
test('exceptions', () => {
  function compileCode() {
    throw new Error('Syntax error');
  }
  
  expect(compileCode).toThrow();
  expect(compileCode).toThrow(Error);
  expect(compileCode).toThrow('Syntax error');
  expect(compileCode).toThrow(/syntax/i);
});
```

### Negation
```javascript
test('negation', () => {
  expect(1 + 1).not.toBe(3);
  expect('hello').not.toMatch(/goodbye/);
});
```

---

## Testing Async Code

### Callbacks
```javascript
test('callback', (done) => {
  function fetchData(callback) {
    setTimeout(() => callback('data'), 100);
  }
  
  fetchData((data) => {
    expect(data).toBe('data');
    done(); // Must call done()
  });
});
```

### Promises
```javascript
test('promise', () => {
  function fetchData() {
    return Promise.resolve('data');
  }
  
  return fetchData().then((data) => {
    expect(data).toBe('data');
  });
});

test('promise rejection', () => {
  function fetchData() {
    return Promise.reject(new Error('error'));
  }
  
  return expect(fetchData()).rejects.toThrow('error');
});
```

### Async/Await
```javascript
test('async/await', async () => {
  const data = await fetchData();
  expect(data).toBe('data');
});

test('async/await error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});

// Alternative
test('async/await with try/catch', async () => {
  try {
    await fetchData();
  } catch (error) {
    expect(error.message).toBe('error');
  }
});
```

### resolves / rejects Matchers
```javascript
test('resolves matcher', async () => {
  await expect(Promise.resolve('data')).resolves.toBe('data');
});

test('rejects matcher', async () => {
  await expect(Promise.reject(new Error('error'))).rejects.toThrow('error');
});
```

---

## Mocking

### Mock Functions

```javascript
test('mock function', () => {
  const mockFn = jest.fn();
  
  // Call mock
  mockFn('hello');
  mockFn('world');
  
  // Assertions
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenCalledWith('hello');
  expect(mockFn).toHaveBeenLastCalledWith('world');
});
```

### Mock Return Values
```javascript
test('mock return value', () => {
  const mockFn = jest.fn();
  
  mockFn.mockReturnValue(42);
  expect(mockFn()).toBe(42);
  
  mockFn.mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValue(3);
  
  expect(mockFn()).toBe(1);
  expect(mockFn()).toBe(2);
  expect(mockFn()).toBe(3);
  expect(mockFn()).toBe(3);
});
```

### Mock Implementation
```javascript
test('mock implementation', () => {
  const mockFn = jest.fn((x) => x * 2);
  
  expect(mockFn(5)).toBe(10);
  expect(mockFn).toHaveBeenCalledWith(5);
});

// Change implementation
test('mock implementation once', () => {
  const mockFn = jest.fn();
  
  mockFn.mockImplementationOnce(() => 'first')
        .mockImplementationOnce(() => 'second')
        .mockImplementation(() => 'default');
  
  expect(mockFn()).toBe('first');
  expect(mockFn()).toBe('second');
  expect(mockFn()).toBe('default');
});
```

### Mock Modules

**api.js:**
```javascript
export function fetchData() {
  return fetch('/api/data').then(res => res.json());
}
```

**test file:**
```javascript
import { fetchData } from './api';

jest.mock('./api');

test('mock module', () => {
  fetchData.mockResolvedValue({ data: 'mocked' });
  
  return fetchData().then((data) => {
    expect(data).toEqual({ data: 'mocked' });
  });
});
```

### Manual Mocks

**Create `__mocks__/api.js`:**
```javascript
export const fetchData = jest.fn(() => 
  Promise.resolve({ data: 'mocked' })
);
```

**In test:**
```javascript
jest.mock('./api'); // Automatically uses manual mock
```

### Mock Timers
```javascript
test('timer mocks', () => {
  jest.useFakeTimers();
  
  const callback = jest.fn();
  setTimeout(callback, 1000);
  
  expect(callback).not.toHaveBeenCalled();
  
  // Fast-forward time
  jest.runAllTimers();
  expect(callback).toHaveBeenCalled();
  
  jest.useRealTimers();
});

test('advance timers by time', () => {
  jest.useFakeTimers();
  
  const callback = jest.fn();
  setTimeout(callback, 1000);
  
  jest.advanceTimersByTime(500);
  expect(callback).not.toHaveBeenCalled();
  
  jest.advanceTimersByTime(500);
  expect(callback).toHaveBeenCalled();
});
```

### Spy on Methods
```javascript
test('spy on object method', () => {
  const video = {
    play() {
      return true;
    },
  };

  const spy = jest.spyOn(video, 'play');
  
  video.play();
  
  expect(spy).toHaveBeenCalled();
  expect(video.play).toHaveBeenCalled();
  
  spy.mockRestore(); // Restore original implementation
});
```

---

## Snapshot Testing

### Basic Snapshot
```javascript
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button snapshot', () => {
  const tree = renderer.create(<Button>Click me</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Inline Snapshots
```javascript
test('inline snapshot', () => {
  const user = { name: 'John', age: 30 };
  expect(user).toMatchInlineSnapshot(`
    Object {
      "age": 30,
      "name": "John",
    }
  `);
});
```

### Update Snapshots
```bash
# Update all snapshots
jest --updateSnapshot
# or
jest -u

# Update in watch mode
Press 'u' to update snapshots
```

### Property Matchers
```javascript
test('snapshot with property matchers', () => {
  const user = {
    createdAt: new Date(),
    id: Math.random(),
    name: 'John'
  };
  
  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number)
  });
});
```

---

## Testing React Components

### Setup
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**setupTests.js:**
```javascript
import '@testing-library/jest-dom';
```

### Basic Component Test

**Button.jsx:**
```javascript
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

**Button.test.jsx:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Querying Elements
```javascript
import { render, screen } from '@testing-library/react';

test('query methods', () => {
  render(<App />);
  
  // getBy - throws error if not found
  screen.getByText('Hello');
  screen.getByRole('button');
  screen.getByLabelText('Email');
  screen.getByPlaceholderText('Enter email');
  screen.getByTestId('custom-element');
  
  // queryBy - returns null if not found
  expect(screen.queryByText('Not there')).toBeNull();
  
  // findBy - async, waits for element
  await screen.findByText('Async content');
});
```

### User Events
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('user interactions', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  const input = screen.getByLabelText('Email');
  const button = screen.getByRole('button', { name: 'Submit' });
  
  // Type in input
  await user.type(input, 'test@example.com');
  expect(input).toHaveValue('test@example.com');
  
  // Click button
  await user.click(button);
});
```

### Async Testing
```javascript
import { render, screen, waitFor } from '@testing-library/react';

test('loads and displays data', async () => {
  render(<UserProfile userId={1} />);
  
  // Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // Or use findBy
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

---

## Code Coverage

### Running Coverage
```bash
# Run tests with coverage
npm test -- --coverage

# Or add to package.json
"scripts": {
  "test:coverage": "jest --coverage"
}
```

### Coverage Report
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   85.71 |       75 |     100 |   85.71 |                   
 math.js          |   85.71 |       75 |     100 |   85.71 | 7                 
------------------|---------|----------|---------|---------|-------------------
```

### Coverage Thresholds

**jest.config.js:**
```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Collect Coverage From
```javascript
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/**/*.test.{js,jsx}'
  ]
};
```

---

## Configuration

### jest.config.js

```javascript
module.exports = {
  // Test environment
  testEnvironment: 'jsdom', // or 'node'
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Transform files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node']
};
```

---

## Best Practices

### 1. **Descriptive Test Names**
```javascript
// Good
test('should return user when valid ID is provided', () => {});

// Bad
test('user test', () => {});
```

### 2. **Arrange-Act-Assert**
```javascript
test('adds item to cart', () => {
  // Arrange
  const cart = new Cart();
  const item = { id: 1, price: 10 };
  
  // Act
  cart.addItem(item);
  
  // Assert
  expect(cart.total).toBe(10);
});
```

### 3. **Test Behavior, Not Implementation**
```javascript
// Good - tests behavior
test('displays error on invalid email', () => {
  render(<Form />);
  fireEvent.change(emailInput, { target: { value: 'invalid' } });
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});

// Bad - tests implementation
test('sets error state', () => {
  const form = new Form();
  form.validateEmail('invalid');
  expect(form.state.emailError).toBe(true);
});
```

### 4. **Keep Tests Independent**
```javascript
// Bad - tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('deletes user', () => {
  deleteUser(user.id);
});

// Good - independent tests
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
test('deletes user', () => {
  const user = createUser();
  deleteUser(user.id);
  expect(getUser(user.id)).toBeNull();
});
```

### 5. **Use beforeEach for Common Setup**
```javascript
describe('User service', () => {
  let user;
  
  beforeEach(() => {
    user = { id: 1, name: 'John' };
  });
  
  test('updates user name', () => {
    updateUserName(user, 'Jane');
    expect(user.name).toBe('Jane');
  });
});
```

---

## Resources

### Official Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Testing Library](https://testing-library.com/)

### Learning Resources
- [Jest Crash Course](https://www.youtube.com/results?search_query=jest+crash+course)
- [Testing JavaScript](https://testingjavascript.com/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)

### Community
- [Stack Overflow - Jest](https://stackoverflow.com/questions/tagged/jestjs)
- [Jest Discord](https://discord.gg/jest)
- [GitHub Discussions](https://github.com/facebook/jest/discussions)

---

**Congratulations!** You now have a comprehensive guide to Jest testing. Start writing tests to build confidence in your code!