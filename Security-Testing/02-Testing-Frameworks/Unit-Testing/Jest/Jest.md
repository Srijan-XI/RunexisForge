# Jest

## Introduction

## What is Jest?

Jest is a delightful JavaScript testing framework developed and maintained by Facebook (Meta). Created with a focus on simplicity and developer experience, Jest works out of the box for most JavaScript projects with zero or minimal configuration. It's designed to ensure correctness of any JavaScript codebase, supporting projects using Babel, TypeScript, Node.js, React, Angular, Vue, and more.

First released in 2014 and open-sourced in 2016, Jest has become one of the most popular testing frameworks in the JavaScript ecosystem, particularly for React applications. It provides a complete testing solution with built-in test runner, assertion library, mocking capabilities, and code coverage tools.

## Why Use Jest?

### 1. **Zero Configuration**

Works out of the box for most JavaScript projects:

- Automatic test discovery
- Built-in code coverage
- Intelligent test watching
- No complex setup required

### 2. **Complete Testing Solution**

All-in-one framework:

- Test runner
- Assertion library
- Mocking utilities
- Code coverage reports
- Snapshot testing

### 3. **Fast and Parallel**

Optimized for performance:

- Runs tests in parallel
- Intelligent test ordering
- Runs previously failed tests first
- Isolated test environments

### 4. **Great Developer Experience**

Designed with developers in mind:

- Helpful error messages
- Interactive watch mode
- Clear test output
- Extensive documentation
- Active community

### 5. **Snapshot Testing**

Unique feature for UI testing:

- Capture UI component output
- Detect unintended changes
- Review changes easily
- Great for React components

### 6. **Built-in Code Coverage**

No additional tools needed:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage
- HTML reports

## Key Features

### 1. **Automatic Mocking**

Simplifies testing complex dependencies:

```javascript
jest.mock('./api');
```bash

### 2. **Snapshot Testing**

Capture and compare component outputs:

```javascript
expect(component).toMatchSnapshot();
```text

### 3. **Watch Mode**

Interactive test running:

- Re-run tests on file changes
- Filter tests by pattern
- Run only failed tests
- Update snapshots

### 4. **Parallel Execution**

Fast test execution:

- Runs tests in parallel by default
- Isolated test environments
- Smart test scheduling

### 5. **Code Coverage**

Built-in coverage reports:

```bash
jest --coverage
```text

### 6. **Mocking Capabilities**

Comprehensive mocking support:

- Mock functions
- Mock modules
- Mock timers
- Mock implementations

### 7. **Matchers**

Expressive assertions:

```javascript
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(array).toContain(item);
```text

### 8. **Async Testing**

Easy asynchronous testing:

```javascript
test('async test', async () => {
  const data = await fetchData();
  expect(data).toBe('value');
});
```text

## Core Concepts

### Test Suites and Tests

```javascript
describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
```text

### Matchers

Assertions for testing values:

- **Equality**: `toBe()`, `toEqual()`
- **Truthiness**: `toBeTruthy()`, `toBeFalsy()`, `toBeNull()`
- **Numbers**: `toBeGreaterThan()`, `toBeLessThan()`
- **Strings**: `toMatch()`, `toContain()`
- **Arrays**: `toContain()`, `toHaveLength()`
- **Objects**: `toHaveProperty()`, `toMatchObject()`
- **Exceptions**: `toThrow()`

### Setup and Teardown

```javascript
beforeAll(() => {
  // Runs once before all tests
});

beforeEach(() => {
  // Runs before each test
});

afterEach(() => {
  // Runs after each test
});

afterAll(() => {
  // Runs once after all tests
});
```bash

### Mocking

```javascript
// Mock function
const mockFn = jest.fn();

// Mock module
jest.mock('./module');

// Mock implementation
mockFn.mockImplementation(() => 'mocked');

// Mock return value
mockFn.mockReturnValue(42);
```bash

## Jest vs Other Testing Frameworks

| Feature | Jest | Mocha | Jasmine | Vitest |
|---------|------|-------|---------|--------|
| **Configuration** | Zero config | Requires setup | Minimal | Zero config |
| **Assertions** | Built-in | Needs library | Built-in | Built-in |
| **Mocking** | Built-in | Needs library | Built-in | Built-in |
| **Snapshots** | Yes | No | No | Yes |
| **Coverage** | Built-in | Needs Istanbul | Manual | Built-in |
| **Speed** | Fast | Moderate | Moderate | Very Fast |
| **Parallel Tests** | Yes | Plugin needed | No | Yes |
| **Watch Mode** | Excellent | Basic | No | Excellent |
| **TypeScript** | Via Babel/ts-jest | Via ts-node | Via ts-node | Native |
| **Community** | Very Large | Large | Medium | Growing |

## Common Use Cases

### 1. **Unit Testing**

Test individual functions and components:

```javascript
test('sum function adds numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
```bash

### 2. **React Component Testing**

Test React components:

```javascript
import { render, screen } from '@testing-library/react';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```bash

### 3. **API Testing**

Test API calls and responses:

```javascript
test('fetches user data', async () => {
  const data = await fetchUser(1);
  expect(data.name).toBe('John');
});
```bash

### 4. **Integration Testing**

Test component interactions:

```javascript
test('form submission', async () => {
  render(<Form />);
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(onSubmit).toHaveBeenCalled());
});
```bash

### 5. **Snapshot Testing**

Test UI consistency:

```javascript
test('component matches snapshot', () => {
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
```bash

## Jest Ecosystem

### Testing Libraries

#### React Testing Library

```bash
npm install --save-dev @testing-library/react
```bash

Recommended for React component testing.

#### Testing Library DOM

```bash
npm install --save-dev @testing-library/dom
```bash

DOM testing utilities.

#### Jest DOM

```bash
npm install --save-dev @testing-library/jest-dom
```bash

Custom matchers for DOM elements.

### Utilities

#### ts-jest

```bash
npm install --save-dev ts-jest @types/jest
```bash

TypeScript support for Jest.

#### babel-jest

Transform code with Babel (included with Jest).

#### jest-environment-jsdom

DOM environment for browser-like testing.

### Tools

#### Coverage Tools

- Istanbul (built-in)
- Coveralls integration
- Codecov integration

#### Reporters

- Default reporter
- Verbose reporter
- JUnit reporter
- Custom reporters

## Testing Best Practices with Jest

### 1. **Descriptive Test Names**

```javascript
// Good
test('should return user data when valid ID is provided', () => {});

// Bad
test('test1', () => {});
```bash

### 2. **Arrange-Act-Assert Pattern**

```javascript
test('adds items to cart', () => {
  // Arrange
  const cart = new ShoppingCart();
  const item = { id: 1, name: 'Book' };
  
  // Act
  cart.addItem(item);
  
  // Assert
  expect(cart.items).toContain(item);
});
```bash

### 3. **Test One Thing at a Time**

```javascript
// Good - focused test
test('validates email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

// Bad - testing multiple things
test('validates user input', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidPassword('12345')).toBe(false);
  expect(isValidUsername('john')).toBe(true);
});
```bash

### 4. **Use Setup and Teardown**

```javascript
describe('Database tests', () => {
  beforeAll(async () => {
    await db.connect();
  });
  
  afterAll(async () => {
    await db.disconnect();
  });
  
  beforeEach(async () => {
    await db.clear();
  });
});
```bash

### 5. **Avoid Implementation Details**

```javascript
// Good - test behavior
test('displays error message on invalid input', () => {
  render(<Form />);
  const input = screen.getByLabelText('Email');
  fireEvent.change(input, { target: { value: 'invalid' } });
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});

// Bad - test implementation
test('sets error state to true', () => {
  const component = new Form();
  component.handleChange('invalid');
  expect(component.state.hasError).toBe(true);
});
```bash

## Advantages of Jest

### Developer Experience

- Zero configuration for most projects
- Great error messages
- Interactive watch mode
- Fast feedback loop

### Performance

- Parallel test execution
- Intelligent test ordering
- Cache for faster re-runs
- Efficient resource usage

### Features

- Complete testing solution
- Built-in everything
- Snapshot testing
- Excellent mocking

### Community

- Large active community
- Extensive documentation
- Many plugins and integrations
- Regular updates

### Integration

- Works with all major frameworks
- CI/CD friendly
- Easy to integrate with tools
- Good TypeScript support

## Common Challenges

### 1. **Snapshot Brittleness**

Snapshots can break frequently:

- Review snapshot changes carefully
- Use snapshots for stable components
- Consider alternative assertions

### 2. **Mocking Complexity**

Complex mocking scenarios:

- Start with simple mocks
- Use manual mocks for complex modules
- Consider integration tests

### 3. **Async Testing**

Asynchronous code challenges:

- Use async/await
- Return promises from tests
- Use proper timeout values

### 4. **Performance with Large Suites**

Slow test execution:

- Run tests in parallel
- Use test filtering
- Optimize test setup/teardown

## Industry Adoption

Jest is used by:

- Facebook/Meta
- Airbnb
- Twitter
- Uber
- Pinterest
- Instagram
- Thousands of open-source projects
- Most React applications

## Career Impact

Jest knowledge is valuable for:

### Job Roles

- Frontend Developer
- React Developer
- Full-Stack Developer
- QA Automation Engineer
- Test Engineer

### Skills Enhancement

- Testing best practices
- Test-driven development (TDD)
- Quality assurance
- Code confidence
- Debugging skills

## Learning Path

### Beginner

1. Install Jest
2. Write basic unit tests
3. Understand matchers
4. Use setup/teardown
5. Run tests and read output

### Intermediate

1. Mocking modules and functions
2. Async testing
3. Snapshot testing
4. Code coverage
5. Testing React components

### Advanced

1. Custom matchers
2. Advanced mocking strategies
3. Performance optimization
4. CI/CD integration
5. Test architecture
6. Custom test environments

## Jest Configuration

Basic `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};
```bash

## Conclusion

Jest has become the go-to testing framework for JavaScript applications, particularly in the React ecosystem. Its zero-configuration philosophy, comprehensive feature set, and excellent developer experience make it an ideal choice for projects of all sizes.

Whether you're building a simple library or a complex application, Jest provides the tools and flexibility needed to write effective tests. Its built-in features like snapshot testing, mocking, and code coverage eliminate the need for multiple tools, while its speed and parallel execution ensure fast feedback during development.

Learning Jest is an investment in code quality and developer productivity. It enables:

- Confident refactoring
- Faster bug detection
- Better code design
- Improved collaboration
- Higher quality software

The combination of Jest's simplicity and power makes it an essential tool for modern JavaScript development, ensuring your code works as intended and continues to do so as your project evolves.

---

**Ready to start testing?** Jump to the **User Guide** section below for installation instructions and comprehensive examples!

---

## User Guide

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
```bash

#### Using yarn

```bash
yarn add --dev jest
```bash

#### Using pnpm

```bash
pnpm add -D jest
```bash

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
```bash

### TypeScript Setup

```bash
npm install --save-dev @types/jest ts-jest typescript
```bash

**Create `jest.config.js`:**

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```bash

### React Project

#### Create React App

Jest is included by default!

#### Manual React Setup

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @babel/preset-react
```bash

**Create `babel.config.js`:**

```javascript
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
```bash

---

## Basic Setup

### File Structure

```bash
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
```bash

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
```bash

**Create `sum.test.js`:**

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```bash

**Run tests:**

```bash
npm test
```bash

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
```bash

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
```bash

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
```bash

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
```bash

#### Truthiness

```javascript
test('truthiness', () => {
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect('hello').toBeDefined();
});
```bash

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
```bash

#### Strings

```javascript
test('strings', () => {
  expect('team').not.toMatch(/I/);
  expect('Christoph').toMatch(/stop/);
  expect('hello world').toContain('world');
});
```bash

#### Arrays and Iterables

```javascript
test('arrays', () => {
  const shoppingList = ['milk', 'bread', 'eggs'];
  
  expect(shoppingList).toContain('milk');
  expect(shoppingList).toHaveLength(3);
  expect(new Set(shoppingList)).toContain('bread');
});
```bash

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
```bash

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
```bash

### Negation

```javascript
test('negation', () => {
  expect(1 + 1).not.toBe(3);
  expect('hello').not.toMatch(/goodbye/);
});
```bash

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
```bash

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
```bash

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
```bash

### resolves / rejects Matchers

```javascript
test('resolves matcher', async () => {
  await expect(Promise.resolve('data')).resolves.toBe('data');
});

test('rejects matcher', async () => {
  await expect(Promise.reject(new Error('error'))).rejects.toThrow('error');
});
```bash

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
```bash

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
```bash

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
```bash

### Mock Modules

**api.js:**

```javascript
export function fetchData() {
  return fetch('/api/data').then(res => res.json());
}
```bash

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
```bash

### Manual Mocks

**Create `__mocks__/api.js`:**

```javascript
export const fetchData = jest.fn(() => 
  Promise.resolve({ data: 'mocked' })
);
```bash

**In test:**

```javascript
jest.mock('./api'); // Automatically uses manual mock
```bash

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
```bash

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
```bash

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
```bash

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
```bash

### Update Snapshots

```bash
# Update all snapshots
jest --updateSnapshot
# or
jest -u

# Update in watch mode
Press 'u' to update snapshots
```bash

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
```bash

---

## Testing React Components

### Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```bash

**setupTests.js:**

```javascript
import '@testing-library/jest-dom';
```bash

### Basic Component Test

**Button.jsx:**

```javascript
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```bash

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
```bash

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
```bash

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
```bash

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
```bash

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
```bash

### Coverage Report

```bash
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   85.71 |       75 |     100 |   85.71 |                   
 math.js          |   85.71 |       75 |     100 |   85.71 | 7                 
------------------|---------|----------|---------|---------|-------------------
```bash

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
```bash

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
```bash

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
```bash

---

## Best Practices

### 1. **Descriptive Test Names**

```javascript
// Good
test('should return user when valid ID is provided', () => {});

// Bad
test('user test', () => {});
```bash

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
```bash

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
```bash

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
```bash

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
```bash

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

