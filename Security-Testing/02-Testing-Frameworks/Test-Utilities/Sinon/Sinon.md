# Sinon

## Introduction

### What is Sinon?

Sinon is a standalone test spies, stubs, and mocks library for JavaScript. It works with any unit testing framework and provides powerful capabilities for creating test doubles, controlling time, and faking server responses. Sinon helps you test code in isolation by replacing real dependencies with controlled alternatives.

### Why Sinon?

- Standalone library (framework agnostic)
- Comprehensive test doubles (spies, stubs, mocks)
- Fake timers and XHR
- Sandbox for easy cleanup
- No dependencies
- Works everywhere (Node.js and browser)
- Rich assertion API
- Well documented
- Active community
- TypeScript support

### Key Features

- **Spies**: Record function calls and arguments
- **Stubs**: Replace functions with controlled behavior
- **Mocks**: Pre-programmed expectations
- **Fake Timers**: Control time for testing timeouts and intervals
- **Fake XHR**: Simulate HTTP requests
- **Sandbox**: Automatic cleanup and restoration
- **Assertions**: Built-in assertion helpers

## Prerequisites

- Node.js 14+
- npm or yarn
- Testing framework (Mocha, Jest, etc.)
- Basic JavaScript knowledge

## Installation

### Using npm

```bash
npm install --save-dev sinon
```

### Using yarn

```bash
yarn add --dev sinon
```

## Spies

### Basic Spy

```javascript
const sinon = require('sinon');

describe('Spies', function() {
  it('records function calls', function() {
    const callback = sinon.spy();
    
    callback('hello');
    callback('world');
    
    console.log(callback.called);        // true
    console.log(callback.callCount);     // 2
    console.log(callback.firstCall.args); // ['hello']
    console.log(callback.secondCall.args); // ['world']
  });
});
```

### Spy on Object Method

```javascript
describe('Spy on method', function() {
  it('spies on object method', function() {
    const user = {
      setName: function(name) {
        this.name = name;
      }
    };
    
    const spy = sinon.spy(user, 'setName');
    
    user.setName('Alice');
    
    console.log(spy.called);           // true
    console.log(spy.calledWith('Alice')); // true
    
    spy.restore(); // Important: restore original method
  });
});
```

### Spy Assertions

```javascript
const { expect } = require('chai');

describe('Spy assertions', function() {
  it('checks spy calls', function() {
    const spy = sinon.spy();
    
    spy('arg1', 'arg2');
    spy('arg3');
    
    // Called assertions
    expect(spy.called).to.be.true;
    expect(spy.callCount).to.equal(2);
    expect(spy.calledOnce).to.be.false;
    expect(spy.calledTwice).to.be.true;
    
    // Argument assertions
    expect(spy.calledWith('arg1', 'arg2')).to.be.true;
    expect(spy.firstCall.calledWith('arg1', 'arg2')).to.be.true;
    expect(spy.secondCall.calledWith('arg3')).to.be.true;
    
    // Using sinon assertions
    sinon.assert.called(spy);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWith(spy, 'arg1', 'arg2');
  });
});
```

### Spy Call Information

```javascript
describe('Spy call information', function() {
  it('accesses call details', function() {
    const spy = sinon.spy();
    const obj = { name: 'Alice' };
    
    spy.call(obj, 'arg1', 'arg2');
    
    const call = spy.firstCall;
    
    console.log(call.args);      // ['arg1', 'arg2']
    console.log(call.thisValue); // { name: 'Alice' }
    console.log(call.returnValue); // undefined
    console.log(call.exception); // undefined
  });
});
```

## Stubs

### Basic Stub

```javascript
describe('Stubs', function() {
  it('replaces function behavior', function() {
    const stub = sinon.stub();
    
    stub.returns('stubbed value');
    
    const result = stub();
    expect(result).to.equal('stubbed value');
    expect(stub.called).to.be.true;
  });
});
```

### Stub Object Method

```javascript
describe('Stub method', function() {
  it('stubs object method', function() {
    const database = {
      getUser: function(id) {
        // Real implementation
        return { id: id, name: 'Real User' };
      }
    };
    
    const stub = sinon.stub(database, 'getUser');
    stub.returns({ id: 123, name: 'Stubbed User' });
    
    const user = database.getUser(123);
    
    expect(user.name).to.equal('Stubbed User');
    expect(stub.calledWith(123)).to.be.true;
    
    stub.restore();
  });
});
```

### Conditional Stubs

```javascript
describe('Conditional stubs', function() {
  it('returns different values based on arguments', function() {
    const stub = sinon.stub();
    
    stub.withArgs('alice').returns('Alice User');
    stub.withArgs('bob').returns('Bob User');
    stub.returns('Default User');
    
    expect(stub('alice')).to.equal('Alice User');
    expect(stub('bob')).to.equal('Bob User');
    expect(stub('charlie')).to.equal('Default User');
  });
});
```

### Stub Behaviors

```javascript
describe('Stub behaviors', function() {
  it('returns values', function() {
    const stub = sinon.stub();
    stub.returns(42);
    expect(stub()).to.equal(42);
  });
  
  it('returns different values on successive calls', function() {
    const stub = sinon.stub();
    stub.onFirstCall().returns(1);
    stub.onSecondCall().returns(2);
    stub.returns(3);
    
    expect(stub()).to.equal(1);
    expect(stub()).to.equal(2);
    expect(stub()).to.equal(3);
    expect(stub()).to.equal(3);
  });
  
  it('throws error', function() {
    const stub = sinon.stub();
    stub.throws(new Error('Stubbed error'));
    
    expect(() => stub()).to.throw('Stubbed error');
  });
  
  it('throws different errors', function() {
    const stub = sinon.stub();
    stub.withArgs('error').throws(new Error('Error occurred'));
    stub.returns('success');
    
    expect(() => stub('error')).to.throw('Error occurred');
    expect(stub('ok')).to.equal('success');
  });
});
```

### Async Stubs

```javascript
describe('Async stubs', function() {
  it('resolves promise', async function() {
    const stub = sinon.stub();
    stub.resolves({ id: 123, name: 'Alice' });
    
    const result = await stub();
    expect(result.name).to.equal('Alice');
  });
  
  it('rejects promise', async function() {
    const stub = sinon.stub();
    stub.rejects(new Error('Failed'));
    
    try {
      await stub();
      throw new Error('Should have rejected');
    } catch (err) {
      expect(err.message).to.equal('Failed');
    }
  });
  
  it('resolves with different values', async function() {
    const stub = sinon.stub();
    stub.onFirstCall().resolves('first');
    stub.onSecondCall().resolves('second');
    
    expect(await stub()).to.equal('first');
    expect(await stub()).to.equal('second');
  });
});
```

### Callback Stubs

```javascript
describe('Callback stubs', function() {
  it('yields to callback', function(done) {
    const stub = sinon.stub();
    stub.yields(null, 'result');
    
    stub(function(err, result) {
      expect(err).to.be.null;
      expect(result).to.equal('result');
      done();
    });
  });
  
  it('yields async', function(done) {
    const stub = sinon.stub();
    stub.yieldsAsync(null, 'async result');
    
    stub(function(err, result) {
      expect(result).to.equal('async result');
      done();
    });
  });
  
  it('calls callback with arguments', function() {
    const stub = sinon.stub();
    const callback = sinon.spy();
    
    stub.callsArgWith(0, 'arg1', 'arg2');
    stub(callback);
    
    expect(callback.calledWith('arg1', 'arg2')).to.be.true;
  });
});
```

## Mocks

### Basic Mock

```javascript
describe('Mocks', function() {
  it('creates mock with expectations', function() {
    const obj = {
      method: function() {}
    };
    
    const mock = sinon.mock(obj);
    
    mock.expects('method')
      .once()
      .withArgs('arg1', 'arg2')
      .returns('mocked result');
    
    const result = obj.method('arg1', 'arg2');
    
    expect(result).to.equal('mocked result');
    mock.verify(); // Verifies all expectations were met
    mock.restore();
  });
});
```

### Mock Expectations

```javascript
describe('Mock expectations', function() {
  it('expects method calls', function() {
    const obj = { method: function() {} };
    const mock = sinon.mock(obj);
    
    mock.expects('method')
      .atLeast(2)
      .atMost(5);
    
    obj.method();
    obj.method();
    obj.method();
    
    mock.verify();
    mock.restore();
  });
  
  it('expects exact call count', function() {
    const obj = { method: function() {} };
    const mock = sinon.mock(obj);
    
    mock.expects('method').exactly(3);
    
    obj.method();
    obj.method();
    obj.method();
    
    mock.verify();
    mock.restore();
  });
  
  it('expects with specific arguments', function() {
    const obj = { method: function() {} };
    const mock = sinon.mock(obj);
    
    mock.expects('method')
      .withExactArgs('arg1', 'arg2');
    
    obj.method('arg1', 'arg2');
    
    mock.verify();
    mock.restore();
  });
});
```

## Fake Timers

### Basic Timer Control

```javascript
describe('Fake timers', function() {
  let clock;
  
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });
  
  afterEach(function() {
    clock.restore();
  });
  
  it('controls setTimeout', function() {
    const spy = sinon.spy();
    
    setTimeout(spy, 1000);
    
    expect(spy.called).to.be.false;
    
    clock.tick(999);
    expect(spy.called).to.be.false;
    
    clock.tick(1);
    expect(spy.called).to.be.true;
  });
  
  it('controls setInterval', function() {
    const spy = sinon.spy();
    
    setInterval(spy, 1000);
    
    clock.tick(2500);
    
    expect(spy.callCount).to.equal(2);
    
    clock.tick(1000);
    expect(spy.callCount).to.equal(3);
  });
});
```

### Control Date and Time

```javascript
describe('Fake Date', function() {
  it('sets specific date', function() {
    const clock = sinon.useFakeTimers(new Date('2024-01-01'));
    
    const now = new Date();
    expect(now.getFullYear()).to.equal(2024);
    expect(now.getMonth()).to.equal(0); // January
    
    clock.restore();
  });
  
  it('advances time', function() {
    const clock = sinon.useFakeTimers(new Date('2024-01-01'));
    
    clock.tick(24 * 60 * 60 * 1000); // 1 day
    
    const now = new Date();
    expect(now.getDate()).to.equal(2); // January 2nd
    
    clock.restore();
  });
});
```

### Async Timer Testing

```javascript
describe('Async timers', function() {
  let clock;
  
  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });
  
  afterEach(function() {
    clock.restore();
  });
  
  it('tests promise with delay', async function() {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('done'), 1000);
    });
    
    const tickPromise = clock.tickAsync(1000);
    
    await tickPromise;
    const result = await promise;
    
    expect(result).to.equal('done');
  });
});
```

## Fake XMLHttpRequest

### Basic Fake XHR

```javascript
describe('Fake XHR', function() {
  let xhr;
  let requests;
  
  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(req) {
      requests.push(req);
    };
  });
  
  afterEach(function() {
    xhr.restore();
  });
  
  it('captures XHR requests', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users');
    xhr.send();
    
    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal('/api/users');
    expect(requests[0].method).to.equal('GET');
  });
  
  it('responds to requests', function(done) {
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
      const response = JSON.parse(xhr.responseText);
      expect(response.name).to.equal('Alice');
      done();
    };
    
    xhr.open('GET', '/api/users/123');
    xhr.send();
    
    requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ id: 123, name: 'Alice' })
    );
  });
});
```

### Fake Server

```javascript
describe('Fake Server', function() {
  let server;
  
  beforeEach(function() {
    server = sinon.fakeServer.create();
  });
  
  afterEach(function() {
    server.restore();
  });
  
  it('creates fake server', function(done) {
    server.respondWith('GET', '/api/users', [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    ]);
    
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
      const users = JSON.parse(xhr.responseText);
      expect(users).to.have.lengthOf(2);
      done();
    };
    
    xhr.open('GET', '/api/users');
    xhr.send();
    
    server.respond();
  });
  
  it('matches URL patterns', function(done) {
    server.respondWith(
      'GET',
      /\/api\/users\/\d+/,
      function(request) {
        request.respond(
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ id: 123, name: 'Alice' })
        );
      }
    );
    
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
      const user = JSON.parse(xhr.responseText);
      expect(user.name).to.equal('Alice');
      done();
    };
    
    xhr.open('GET', '/api/users/123');
    xhr.send();
    
    server.respond();
  });
});
```

## Sandbox

### Basic Sandbox

```javascript
describe('Sandbox', function() {
  let sandbox;
  
  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(function() {
    sandbox.restore(); // Restores all fakes created in sandbox
  });
  
  it('creates spies in sandbox', function() {
    const spy = sandbox.spy();
    const stub = sandbox.stub();
    
    spy('hello');
    stub.returns('stubbed');
    
    expect(spy.called).to.be.true;
    expect(stub()).to.equal('stubbed');
    
    // All automatically restored in afterEach
  });
});
```

### Sandbox with Objects

```javascript
describe('Sandbox with objects', function() {
  let sandbox;
  
  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(function() {
    sandbox.restore();
  });
  
  it('stubs object methods', function() {
    const obj = {
      method1: () => 'real1',
      method2: () => 'real2'
    };
    
    sandbox.stub(obj, 'method1').returns('stubbed1');
    sandbox.stub(obj, 'method2').returns('stubbed2');
    
    expect(obj.method1()).to.equal('stubbed1');
    expect(obj.method2()).to.equal('stubbed2');
    
    // Both automatically restored
  });
});
```

## Complete Examples

### Testing with Mocha and Chai

```javascript
const sinon = require('sinon');
const { expect } = require('chai');

class UserService {
  constructor(database, emailService) {
    this.database = database;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    const user = await this.database.insert(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
  
  async deleteUser(userId) {
    const user = await this.database.findById(userId);
    await this.database.delete(userId);
    await this.emailService.sendGoodbyeEmail(user.email);
  }
}

describe('UserService', function() {
  let sandbox;
  let database;
  let emailService;
  let userService;
  
  beforeEach(function() {
    sandbox = sinon.createSandbox();
    
    database = {
      insert: sandbox.stub(),
      findById: sandbox.stub(),
      delete: sandbox.stub()
    };
    
    emailService = {
      sendWelcomeEmail: sandbox.stub(),
      sendGoodbyeEmail: sandbox.stub()
    };
    
    userService = new UserService(database, emailService);
  });
  
  afterEach(function() {
    sandbox.restore();
  });
  
  describe('#createUser', function() {
    it('creates user and sends email', async function() {
      const userData = { name: 'Alice', email: 'alice@example.com' };
      const createdUser = { id: 123, ...userData };
      
      database.insert.resolves(createdUser);
      emailService.sendWelcomeEmail.resolves();
      
      const result = await userService.createUser(userData);
      
      expect(result).to.deep.equal(createdUser);
      sinon.assert.calledOnce(database.insert);
      sinon.assert.calledWith(database.insert, userData);
      sinon.assert.calledOnce(emailService.sendWelcomeEmail);
      sinon.assert.calledWith(emailService.sendWelcomeEmail, 'alice@example.com');
    });
    
    it('handles database error', async function() {
      database.insert.rejects(new Error('Database error'));
      
      try {
        await userService.createUser({ name: 'Bob' });
        throw new Error('Should have thrown');
      } catch (err) {
        expect(err.message).to.equal('Database error');
        sinon.assert.notCalled(emailService.sendWelcomeEmail);
      }
    });
  });
  
  describe('#deleteUser', function() {
    it('deletes user and sends email', async function() {
      const user = { id: 123, email: 'alice@example.com' };
      
      database.findById.resolves(user);
      database.delete.resolves();
      emailService.sendGoodbyeEmail.resolves();
      
      await userService.deleteUser(123);
      
      sinon.assert.calledWith(database.findById, 123);
      sinon.assert.calledWith(database.delete, 123);
      sinon.assert.calledWith(emailService.sendGoodbyeEmail, 'alice@example.com');
    });
  });
});
```

### Testing Callbacks

```javascript
describe('Callback testing', function() {
  it('tests async callback', function(done) {
    function fetchData(callback) {
      setTimeout(() => {
        callback(null, { data: 'result' });
      }, 100);
    }
    
    const clock = sinon.useFakeTimers();
    const spy = sinon.spy();
    
    fetchData(spy);
    
    clock.tick(100);
    
    expect(spy.calledOnce).to.be.true;
    expect(spy.firstCall.args[0]).to.be.null;
    expect(spy.firstCall.args[1]).to.deep.equal({ data: 'result' });
    
    clock.restore();
    done();
  });
});
```

## Best Practices

### 1. Always Restore

```javascript
// Use sandbox for automatic cleanup
let sandbox;

beforeEach(function() {
  sandbox = sinon.createSandbox();
});

afterEach(function() {
  sandbox.restore();
});

// Or manually restore
const stub = sinon.stub(obj, 'method');
// ... test code ...
stub.restore();
```

### 2. Use Specific Assertions

```javascript
// Good - specific
sinon.assert.calledOnce(spy);
sinon.assert.calledWith(spy, 'expected', 'args');

// Less specific
expect(spy.called).to.be.true;
```

### 3. Stub Only What You Need

```javascript
// Good - stub specific method
const stub = sinon.stub(obj, 'specificMethod');

// Bad - stubbing entire object
const obj = sinon.stub({ method1: ..., method2: ... });
```

### 4. Test Behavior, Not Implementation

```javascript
// Good - test outcome
expect(result).to.equal(expected);
sinon.assert.calledOnce(emailService.send);

// Bad - overly specific
sinon.assert.calledWith(spy, exactInternalState);
```

## Resources

- [Sinon Documentation](https://sinonjs.org/)
- [Sinon API](https://sinonjs.org/releases/latest/)
- [Sinon Best Practices](https://sinonjs.org/how-to/)
- [Sinon GitHub](https://github.com/sinonjs/sinon)

## Next Steps

- Install Sinon
- Create first spy
- Use stubs
- Practice mocks
- Fake timers
- Fake XHR/Server
- Use sandbox
- Integration with test framework
- Best practices
- Advanced patterns
