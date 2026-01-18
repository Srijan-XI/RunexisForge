# Mocha

## Introduction

### What is Mocha?

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. It provides a flexible and comprehensive testing solution with support for various assertion libraries, reporters, and test interfaces.

### Why Mocha?

- Browser and Node.js support
- Flexible and unopinionated
- Async testing support
- Multiple reporters
- Before/after hooks
- Test retry support
- Parallel test execution
- Watch mode
- Easy configuration
- Large ecosystem

### Key Features

- **Flexible**: Works with any assertion library
- **Async**: Promises, async/await, callbacks
- **Hooks**: before, after, beforeEach, afterEach
- **Reporters**: Spec, dot, nyan, JSON, HTML, and more
- **Watch mode**: Auto-rerun tests on file changes
- **Parallel**: Run tests in parallel
- **Browser**: Run tests in the browser
- **Timeouts**: Configurable test timeouts

## Prerequisites

- Node.js 14+
- npm or yarn
- Basic JavaScript knowledge
- Understanding of testing concepts

## Installation

### Using npm

```bash
# Install as dev dependency
npm install --save-dev mocha

# Install globally (optional)
npm install -g mocha
```

### Using yarn

```bash
yarn add --dev mocha
```

### Setup

Create test directory:

```bash
mkdir test
```

Add to package.json:

```json
{
  "scripts": {
    "test": "mocha",
    "test:watch": "mocha --watch",
    "test:coverage": "nyc mocha"
  }
}
```

## Basic Usage

### Simple Test

```javascript
// test/calculator.test.js
const assert = require('assert');

function add(a, b) {
  return a + b;
}

describe('Calculator', function() {
  describe('add()', function() {
    it('should add two numbers', function() {
      assert.strictEqual(add(2, 3), 5);
    });
    
    it('should handle negative numbers', function() {
      assert.strictEqual(add(-1, 1), 0);
    });
  });
});
```

Run tests:

```bash
npm test
```

### Multiple Describes

```javascript
describe('Math Operations', function() {
  describe('Addition', function() {
    it('adds positive numbers', function() {
      assert.strictEqual(2 + 2, 4);
    });
  });
  
  describe('Subtraction', function() {
    it('subtracts numbers', function() {
      assert.strictEqual(5 - 3, 2);
    });
  });
});
```

### Nested Describes

```javascript
describe('User', function() {
  describe('Constructor', function() {
    it('creates a new user', function() {
      const user = new User('Alice');
      assert.strictEqual(user.name, 'Alice');
    });
  });
  
  describe('Methods', function() {
    describe('#getName', function() {
      it('returns the user name', function() {
        const user = new User('Bob');
        assert.strictEqual(user.getName(), 'Bob');
      });
    });
  });
});
```

## Hooks

### before and after

```javascript
describe('Database', function() {
  let db;
  
  before(function() {
    // Runs once before all tests
    db = new Database();
    db.connect();
  });
  
  after(function() {
    // Runs once after all tests
    db.disconnect();
  });
  
  it('should query data', function() {
    const result = db.query('SELECT * FROM users');
    assert.ok(result);
  });
});
```

### beforeEach and afterEach

```javascript
describe('User Service', function() {
  let userService;
  
  beforeEach(function() {
    // Runs before each test
    userService = new UserService();
    userService.reset();
  });
  
  afterEach(function() {
    // Runs after each test
    userService.cleanup();
  });
  
  it('creates a user', function() {
    const user = userService.create('Alice');
    assert.ok(user);
  });
  
  it('deletes a user', function() {
    const user = userService.create('Bob');
    userService.delete(user.id);
    assert.strictEqual(userService.find(user.id), null);
  });
});
```

### Multiple Hooks

```javascript
describe('Hooks', function() {
  before(function() {
    console.log('1. before');
  });
  
  before(function() {
    console.log('2. before');
  });
  
  beforeEach(function() {
    console.log('3. beforeEach');
  });
  
  afterEach(function() {
    console.log('4. afterEach');
  });
  
  after(function() {
    console.log('5. after');
  });
  
  it('test 1', function() {
    console.log('Test 1');
  });
  
  it('test 2', function() {
    console.log('Test 2');
  });
});
```

## Asynchronous Testing

### Callbacks

```javascript
describe('Async with callbacks', function() {
  it('loads user data', function(done) {
    loadUser(123, function(err, user) {
      if (err) return done(err);
      assert.strictEqual(user.id, 123);
      done();
    });
  });
});
```

### Promises

```javascript
describe('Async with promises', function() {
  it('loads user data', function() {
    return loadUser(123).then(function(user) {
      assert.strictEqual(user.id, 123);
    });
  });
  
  it('handles errors', function() {
    return loadUser(999)
      .then(() => {
        throw new Error('Should have failed');
      })
      .catch(err => {
        assert.strictEqual(err.message, 'User not found');
      });
  });
});
```

### Async/Await

```javascript
describe('Async with async/await', function() {
  it('loads user data', async function() {
    const user = await loadUser(123);
    assert.strictEqual(user.id, 123);
  });
  
  it('handles errors', async function() {
    try {
      await loadUser(999);
      throw new Error('Should have failed');
    } catch (err) {
      assert.strictEqual(err.message, 'User not found');
    }
  });
});
```

### Async Hooks

```javascript
describe('Async hooks', function() {
  before(async function() {
    await database.connect();
  });
  
  after(async function() {
    await database.disconnect();
  });
  
  beforeEach(async function() {
    await database.clear();
  });
  
  it('queries database', async function() {
    const result = await database.query('SELECT * FROM users');
    assert.ok(result);
  });
});
```

## Assertions

Mocha works with any assertion library:

### Built-in Assert

```javascript
const assert = require('assert');

it('uses assert', function() {
  assert.strictEqual(1 + 1, 2);
  assert.ok(true);
  assert.deepStrictEqual([1, 2], [1, 2]);
});
```

### Chai (BDD style)

```javascript
const { expect } = require('chai');

it('uses chai expect', function() {
  expect(1 + 1).to.equal(2);
  expect([1, 2]).to.deep.equal([1, 2]);
  expect('hello').to.be.a('string');
});
```

### Chai (TDD style)

```javascript
const { assert } = require('chai');

it('uses chai assert', function() {
  assert.equal(1 + 1, 2);
  assert.isTrue(true);
  assert.isString('hello');
});
```

## Test Timeouts

### Global Timeout

```javascript
describe('Slow tests', function() {
  this.timeout(5000); // 5 seconds
  
  it('slow operation', function(done) {
    setTimeout(done, 3000);
  });
});
```

### Individual Test Timeout

```javascript
it('slow test', function(done) {
  this.timeout(10000); // 10 seconds
  setTimeout(done, 5000);
});
```

### Disable Timeout

```javascript
it('very slow test', function(done) {
  this.timeout(0); // Disable timeout
  setTimeout(done, 60000);
});
```

## Pending and Skipping Tests

### Pending Tests

```javascript
describe('Pending tests', function() {
  it('will be implemented later');
  
  it('pending test', function() {
    // Not implemented yet
  });
});
```

### Skip Tests

```javascript
describe('Skip tests', function() {
  it.skip('skipped test', function() {
    // This test will not run
  });
  
  it('normal test', function() {
    assert.ok(true);
  });
});
```

### Skip Describe

```javascript
describe.skip('Skipped suite', function() {
  it('test 1', function() {
    // Not run
  });
  
  it('test 2', function() {
    // Not run
  });
});
```

### Only

```javascript
describe('Only', function() {
  it.only('only this test runs', function() {
    assert.ok(true);
  });
  
  it('this test is skipped', function() {
    assert.ok(true);
  });
});
```

## Retry Tests

```javascript
describe('Retries', function() {
  // Retry all tests in this suite up to 3 times
  this.retries(3);
  
  it('may fail occasionally', function() {
    if (Math.random() > 0.5) {
      throw new Error('Random failure');
    }
  });
  
  it('specific retry count', function() {
    this.retries(5);
    // Test logic
  });
});
```

## Dynamic Test Generation

```javascript
describe('Dynamic tests', function() {
  const users = ['Alice', 'Bob', 'Charlie'];
  
  users.forEach(function(user) {
    it(`should create user ${user}`, function() {
      const created = createUser(user);
      assert.strictEqual(created.name, user);
    });
  });
});
```

## Reporters

### Spec (default)

```bash
mocha --reporter spec
```

### Dot

```bash
mocha --reporter dot
```

### JSON

```bash
mocha --reporter json > results.json
```

### HTML

```bash
mocha --reporter mochawesome
```

### Custom Reporter

```javascript
// custom-reporter.js
function CustomReporter(runner) {
  runner.on('pass', function(test) {
    console.log('✓ ' + test.title);
  });
  
  runner.on('fail', function(test, err) {
    console.log('✗ ' + test.title + ' - ' + err.message);
  });
}

module.exports = CustomReporter;
```

Use:
```bash
mocha --reporter ./custom-reporter.js
```

## Configuration

### .mocharc.json

```json
{
  "require": ["@babel/register"],
  "spec": ["test/**/*.test.js"],
  "ignore": ["test/fixtures/**"],
  "timeout": 5000,
  "ui": "bdd",
  "reporter": "spec",
  "parallel": false,
  "jobs": 4,
  "watch-files": ["lib/**/*.js", "test/**/*.js"],
  "watch-ignore": ["node_modules"]
}
```

### .mocharc.js

```javascript
module.exports = {
  require: ['@babel/register'],
  spec: ['test/**/*.test.js'],
  ignore: ['test/fixtures/**'],
  timeout: 5000,
  ui: 'bdd',
  reporter: 'spec',
  parallel: false,
  jobs: 4
};
```

### package.json

```json
{
  "mocha": {
    "require": ["@babel/register"],
    "spec": "test/**/*.test.js",
    "timeout": 5000
  }
}
```

## Parallel Execution

```bash
# Run tests in parallel
mocha --parallel

# Specify number of jobs
mocha --parallel --jobs 4
```

Parallel-safe example:

```javascript
describe('Parallel tests', function() {
  let db;
  
  before(async function() {
    // Each worker gets its own database
    db = await createDatabase();
  });
  
  after(async function() {
    await db.close();
  });
  
  it('test 1', async function() {
    await db.insert({ id: 1 });
  });
  
  it('test 2', async function() {
    await db.insert({ id: 2 });
  });
});
```

## Watch Mode

```bash
# Watch mode
mocha --watch

# Watch specific files
mocha --watch --watch-files 'lib/**/*.js'
```

## Code Coverage

### Using nyc (Istanbul)

```bash
# Install nyc
npm install --save-dev nyc

# Run with coverage
nyc mocha

# HTML report
nyc --reporter=html mocha
open coverage/index.html
```

### .nycrc.json

```json
{
  "all": true,
  "include": ["lib/**/*.js"],
  "exclude": ["test/**", "node_modules/**"],
  "reporter": ["text", "html", "lcov"],
  "check-coverage": true,
  "lines": 80,
  "functions": 80,
  "branches": 80
}
```

## Browser Testing

### Setup

```html
<!-- test/browser/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mocha Tests</title>
  <link rel="stylesheet" href="../../node_modules/mocha/mocha.css">
</head>
<body>
  <div id="mocha"></div>
  
  <script src="../../node_modules/mocha/mocha.js"></script>
  <script src="../../node_modules/chai/chai.js"></script>
  
  <script>mocha.setup('bdd')</script>
  
  <!-- Load source files -->
  <script src="../../lib/calculator.js"></script>
  
  <!-- Load test files -->
  <script src="calculator.test.js"></script>
  
  <script>
    mocha.run();
  </script>
</body>
</html>
```

### Test File

```javascript
// test/browser/calculator.test.js
const { expect } = chai;

describe('Calculator (Browser)', function() {
  it('adds numbers', function() {
    expect(add(2, 3)).to.equal(5);
  });
});
```

## Advanced Examples

### Complete Test Suite

```javascript
// test/user-service.test.js
const { expect } = require('chai');
const UserService = require('../lib/user-service');

describe('UserService', function() {
  let userService;
  
  beforeEach(function() {
    userService = new UserService();
  });
  
  afterEach(function() {
    userService.cleanup();
  });
  
  describe('Constructor', function() {
    it('initializes with empty users', function() {
      expect(userService.getUsers()).to.be.empty;
    });
  });
  
  describe('#createUser', function() {
    it('creates a new user', async function() {
      const user = await userService.createUser({
        name: 'Alice',
        email: 'alice@example.com'
      });
      
      expect(user).to.have.property('id');
      expect(user.name).to.equal('Alice');
      expect(user.email).to.equal('alice@example.com');
    });
    
    it('validates required fields', async function() {
      try {
        await userService.createUser({ name: 'Bob' });
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal('Email is required');
      }
    });
    
    it('prevents duplicate emails', async function() {
      await userService.createUser({
        name: 'Alice',
        email: 'alice@example.com'
      });
      
      try {
        await userService.createUser({
          name: 'Alice2',
          email: 'alice@example.com'
        });
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal('Email already exists');
      }
    });
  });
  
  describe('#getUser', function() {
    it('returns user by id', async function() {
      const created = await userService.createUser({
        name: 'Bob',
        email: 'bob@example.com'
      });
      
      const user = await userService.getUser(created.id);
      expect(user.name).to.equal('Bob');
    });
    
    it('returns null for non-existent user', async function() {
      const user = await userService.getUser(999);
      expect(user).to.be.null;
    });
  });
  
  describe('#updateUser', function() {
    it('updates user data', async function() {
      const user = await userService.createUser({
        name: 'Charlie',
        email: 'charlie@example.com'
      });
      
      const updated = await userService.updateUser(user.id, {
        name: 'Charles'
      });
      
      expect(updated.name).to.equal('Charles');
      expect(updated.email).to.equal('charlie@example.com');
    });
  });
  
  describe('#deleteUser', function() {
    it('deletes a user', async function() {
      const user = await userService.createUser({
        name: 'Dave',
        email: 'dave@example.com'
      });
      
      await userService.deleteUser(user.id);
      
      const deleted = await userService.getUser(user.id);
      expect(deleted).to.be.null;
    });
  });
});
```

## Best Practices

### 1. Descriptive Test Names

```javascript
// Good
it('returns null when user is not found', function() {});

// Bad
it('test 1', function() {});
```

### 2. One Assertion Per Test

```javascript
// Good
it('creates user with correct name', function() {
  const user = createUser('Alice');
  expect(user.name).to.equal('Alice');
});

it('creates user with generated id', function() {
  const user = createUser('Alice');
  expect(user.id).to.be.a('string');
});

// Acceptable for related assertions
it('creates valid user', function() {
  const user = createUser('Alice');
  expect(user).to.have.property('id');
  expect(user).to.have.property('name');
  expect(user).to.have.property('email');
});
```

### 3. Use Hooks Wisely

```javascript
// Setup common state
beforeEach(function() {
  this.user = createUser('Alice');
});

// Cleanup
afterEach(function() {
  cleanupDatabase();
});
```

### 4. Avoid Test Dependencies

```javascript
// Bad - tests depend on each other
let userId;

it('creates user', function() {
  userId = createUser('Alice').id;
});

it('updates user', function() {
  updateUser(userId, { name: 'Alicia' });
});

// Good - independent tests
it('creates user', function() {
  const user = createUser('Alice');
  expect(user.id).to.exist;
});

it('updates user', function() {
  const user = createUser('Alice');
  updateUser(user.id, { name: 'Alicia' });
});
```

## Troubleshooting

### Tests Timeout

```javascript
// Increase timeout
it('slow test', function() {
  this.timeout(10000);
  // ...
});
```

### Unhandled Promise Rejections

```javascript
// Always return promises
it('async test', function() {
  return doSomethingAsync(); // Return the promise
});

// Or use async/await
it('async test', async function() {
  await doSomethingAsync();
});
```

### Watch Mode Not Working

```bash
# Specify watch files
mocha --watch --watch-files 'lib/**/*.js,test/**/*.js'
```

## Resources

- [Mocha Documentation](https://mochajs.org/)
- [Mocha GitHub](https://github.com/mochajs/mocha)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Sinon Mocking Library](https://sinonjs.org/)

## Next Steps

- Install Mocha
- Write first test
- Use hooks
- Async testing
- Add assertions (Chai)
- Configure reporters
- Watch mode
- Code coverage
- CI/CD integration
- Advanced patterns
