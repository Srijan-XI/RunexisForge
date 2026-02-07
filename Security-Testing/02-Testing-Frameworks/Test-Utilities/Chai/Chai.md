# Chai

## Introduction

### What is Chai?

Chai is a BDD/TDD assertion library for Node.js and the browser that can be paired with any JavaScript testing framework. It provides a fluent, expressive syntax for writing test assertions, making tests more readable and maintainable.

### Why Chai?

- Multiple assertion styles (BDD and TDD)
- Chainable language syntax
- Browser and Node.js support
- Plugin ecosystem
- Works with any testing framework
- Readable assertions
- Extensible
- TypeScript support
- Active community
- Great documentation

### Key Features

- **Multiple interfaces**: expect, should, assert
- **Chainable**: Natural language assertions
- **Plugins**: Extend functionality
- **Deep equality**: Object and array comparison
- **Custom assertions**: Create your own matchers
- **Type checking**: Test types and instances
- **Property testing**: Check object properties

## Prerequisites

- Node.js 14+
- npm or yarn
- Testing framework (Mocha, Jest, etc.)
- Basic JavaScript knowledge

## Installation

### Using npm

```bash
npm install --save-dev chai
```

### Using yarn

```bash
yarn add --dev chai
```

## Assertion Styles

Chai provides three assertion styles:

### 1. Expect (BDD)

```javascript
const { expect } = require('chai');

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
```

### 2. Should (BDD)

```javascript
const chai = require('chai');
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
```

### 3. Assert (TDD)

```javascript
const { assert } = require('chai');

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3);
```

## Expect Style

### Basic Assertions

```javascript
const { expect } = require('chai');

describe('Expect assertions', function() {
  it('checks equality', function() {
    expect(1 + 1).to.equal(2);
    expect('hello').to.equal('hello');
    expect(true).to.be.true;
    expect(false).to.be.false;
  });
  
  it('checks deep equality', function() {
    expect({ a: 1 }).to.deep.equal({ a: 1 });
    expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
  });
  
  it('checks not equal', function() {
    expect(1).to.not.equal(2);
    expect('hello').to.not.equal('world');
  });
});
```

### Type Checking

```javascript
describe('Type assertions', function() {
  it('checks types', function() {
    expect('hello').to.be.a('string');
    expect(42).to.be.a('number');
    expect(true).to.be.a('boolean');
    expect([]).to.be.an('array');
    expect({}).to.be.an('object');
    expect(null).to.be.null;
    expect(undefined).to.be.undefined;
  });
  
  it('checks instanceof', function() {
    class User {}
    const user = new User();
    
    expect(user).to.be.an.instanceof(User);
    expect([]).to.be.an.instanceof(Array);
  });
});
```

### Truthiness

```javascript
describe('Truthiness', function() {
  it('checks truthy values', function() {
    expect('hello').to.be.ok;
    expect(1).to.be.ok;
    expect(true).to.be.ok;
  });
  
  it('checks falsy values', function() {
    expect(0).to.not.be.ok;
    expect('').to.not.be.ok;
    expect(false).to.not.be.ok;
    expect(null).to.not.be.ok;
  });
  
  it('checks existence', function() {
    const obj = { name: 'Alice' };
    expect(obj.name).to.exist;
    expect(obj.age).to.not.exist;
  });
});
```

### Comparison

```javascript
describe('Comparison', function() {
  it('checks greater than', function() {
    expect(10).to.be.above(5);
    expect(10).to.be.greaterThan(5);
  });
  
  it('checks less than', function() {
    expect(5).to.be.below(10);
    expect(5).to.be.lessThan(10);
  });
  
  it('checks at least/most', function() {
    expect(10).to.be.at.least(10);
    expect(10).to.be.at.most(10);
  });
  
  it('checks within range', function() {
    expect(7).to.be.within(5, 10);
  });
});
```

### Length and Size

```javascript
describe('Length assertions', function() {
  it('checks length', function() {
    expect('hello').to.have.lengthOf(5);
    expect([1, 2, 3]).to.have.lengthOf(3);
  });
  
  it('checks length above/below', function() {
    expect('hello').to.have.lengthOf.above(3);
    expect('hello').to.have.lengthOf.below(10);
  });
});
```

### String Matching

```javascript
describe('String assertions', function() {
  const str = 'Hello, World!';
  
  it('checks string inclusion', function() {
    expect(str).to.include('Hello');
    expect(str).to.contain('World');
  });
  
  it('checks string match', function() {
    expect(str).to.match(/Hello/);
    expect(str).to.match(/world/i);
  });
  
  it('checks string start/end', function() {
    expect(str).to.have.string('Hello');
  });
});
```

### Array Assertions

```javascript
describe('Array assertions', function() {
  const arr = [1, 2, 3, 4, 5];
  
  it('checks array inclusion', function() {
    expect(arr).to.include(3);
    expect(arr).to.contain(1);
    expect(arr).to.include.members([2, 4]);
  });
  
  it('checks array order', function() {
    expect(arr).to.have.ordered.members([1, 2, 3, 4, 5]);
  });
  
  it('checks deep members', function() {
    const users = [
      { name: 'Alice' },
      { name: 'Bob' }
    ];
    
    expect(users).to.deep.include({ name: 'Alice' });
  });
  
  it('checks empty array', function() {
    expect([]).to.be.empty;
    expect([1]).to.not.be.empty;
  });
});
```

### Object Assertions

```javascript
describe('Object assertions', function() {
  const obj = {
    name: 'Alice',
    age: 30,
    address: {
      city: 'New York'
    }
  };
  
  it('checks property existence', function() {
    expect(obj).to.have.property('name');
    expect(obj).to.have.property('name', 'Alice');
  });
  
  it('checks nested properties', function() {
    expect(obj).to.have.nested.property('address.city');
    expect(obj).to.have.nested.property('address.city', 'New York');
  });
  
  it('checks own property', function() {
    expect(obj).to.have.own.property('name');
  });
  
  it('checks all keys', function() {
    expect(obj).to.have.all.keys('name', 'age', 'address');
    expect(obj).to.include.all.keys('name', 'age');
  });
  
  it('checks any keys', function() {
    expect(obj).to.have.any.keys('name', 'email');
  });
  
  it('checks deep equality', function() {
    expect(obj).to.deep.equal({
      name: 'Alice',
      age: 30,
      address: { city: 'New York' }
    });
  });
  
  it('checks deep inclusion', function() {
    expect(obj).to.deep.include({
      name: 'Alice'
    });
  });
});
```

### Exception Assertions

```javascript
describe('Exception assertions', function() {
  function throwError() {
    throw new Error('Something went wrong');
  }
  
  it('checks if function throws', function() {
    expect(throwError).to.throw();
    expect(throwError).to.throw(Error);
    expect(throwError).to.throw('Something went wrong');
    expect(throwError).to.throw(/went wrong/);
  });
  
  it('checks if function does not throw', function() {
    const safe = () => 'safe';
    expect(safe).to.not.throw();
  });
  
  it('checks error type', function() {
    function throwTypeError() {
      throw new TypeError('Type error');
    }
    
    expect(throwTypeError).to.throw(TypeError);
    expect(throwTypeError).to.throw(TypeError, 'Type error');
  });
});
```

## Should Style

### Basic Usage

```javascript
const chai = require('chai');
chai.should();

describe('Should assertions', function() {
  it('checks equality', function() {
    const name = 'Alice';
    name.should.equal('Alice');
    name.should.be.a('string');
  });
  
  it('checks numbers', function() {
    const num = 42;
    num.should.be.a('number');
    num.should.equal(42);
    num.should.be.above(40);
  });
  
  it('checks arrays', function() {
    const arr = [1, 2, 3];
    arr.should.be.an('array');
    arr.should.have.lengthOf(3);
    arr.should.include(2);
  });
  
  it('checks objects', function() {
    const user = { name: 'Bob', age: 25 };
    user.should.have.property('name');
    user.should.have.property('name', 'Bob');
    user.should.deep.equal({ name: 'Bob', age: 25 });
  });
});
```

### Chainable Language

```javascript
describe('Chainable language', function() {
  it('uses language chains', function() {
    const name = 'Alice';
    name.should.be.a('string').and.equal('Alice');
    
    const num = 10;
    num.should.be.a('number').and.be.above(5).and.be.below(15);
    
    const arr = [1, 2, 3];
    arr.should.be.an('array').that.includes(2);
  });
});
```

## Assert Style

### Basic Assertions

```javascript
const { assert } = require('chai');

describe('Assert style', function() {
  it('uses assert methods', function() {
    assert.equal(1 + 1, 2);
    assert.strictEqual(1 + 1, 2);
    assert.notEqual(1, 2);
  });
  
  it('checks types', function() {
    assert.typeOf('hello', 'string');
    assert.typeOf(42, 'number');
    assert.instanceOf([], Array);
  });
  
  it('checks truthiness', function() {
    assert.isOk(true);
    assert.isNotOk(false);
    assert.isTrue(true);
    assert.isFalse(false);
    assert.isNull(null);
    assert.isNotNull('hello');
    assert.isUndefined(undefined);
    assert.isDefined('hello');
  });
});
```

### Object and Array Assertions

```javascript
describe('Assert object/array', function() {
  it('checks objects', function() {
    const obj = { name: 'Alice', age: 30 };
    
    assert.property(obj, 'name');
    assert.propertyVal(obj, 'name', 'Alice');
    assert.deepPropertyVal(obj, 'name', 'Alice');
    
    assert.deepEqual(obj, { name: 'Alice', age: 30 });
    assert.notDeepEqual(obj, { name: 'Bob', age: 25 });
  });
  
  it('checks arrays', function() {
    const arr = [1, 2, 3];
    
    assert.lengthOf(arr, 3);
    assert.include(arr, 2);
    assert.notInclude(arr, 4);
    
    assert.sameMembers(arr, [3, 2, 1]);
    assert.sameOrderedMembers(arr, [1, 2, 3]);
  });
});
```

### Comparison Assertions

```javascript
describe('Assert comparison', function() {
  it('compares numbers', function() {
    assert.isAbove(10, 5);
    assert.isBelow(5, 10);
    assert.isAtLeast(10, 10);
    assert.isAtMost(10, 10);
  });
});
```

### String Assertions

```javascript
describe('Assert strings', function() {
  it('checks strings', function() {
    assert.match('hello', /ell/);
    assert.notMatch('hello', /xyz/);
    
    assert.include('hello world', 'world');
    assert.notInclude('hello', 'xyz');
  });
});
```

### Exception Assertions

```javascript
describe('Assert exceptions', function() {
  it('checks throws', function() {
    function throwError() {
      throw new Error('Error!');
    }
    
    assert.throws(throwError);
    assert.throws(throwError, Error);
    assert.throws(throwError, /Error/);
    assert.throws(throwError, Error, 'Error!');
  });
  
  it('checks does not throw', function() {
    function safe() {
      return 'safe';
    }
    
    assert.doesNotThrow(safe);
  });
});
```

## Plugins

### chai-http

```bash
npm install --save-dev chai-http
```

```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('HTTP tests', function() {
  it('makes GET request', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  
  it('makes POST request', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
      });
  });
});
```

### chai-as-promised

```bash
npm install --save-dev chai-as-promised
```

```javascript
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

describe('Promise tests', function() {
  it('checks fulfilled promise', function() {
    const promise = Promise.resolve('success');
    return expect(promise).to.eventually.equal('success');
  });
  
  it('checks rejected promise', function() {
    const promise = Promise.reject(new Error('Failed'));
    return expect(promise).to.be.rejectedWith(Error, 'Failed');
  });
  
  it('checks promise property', function() {
    const promise = Promise.resolve({ name: 'Alice' });
    return expect(promise).to.eventually.have.property('name', 'Alice');
  });
});
```

### chai-subset

```bash
npm install --save-dev chai-subset
```

```javascript
const chai = require('chai');
const chaiSubset = require('chai-subset');
const { expect } = chai;

chai.use(chaiSubset);

describe('Subset tests', function() {
  it('checks object subset', function() {
    const obj = {
      name: 'Alice',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      }
    };
    
    expect(obj).to.containSubset({
      name: 'Alice',
      address: {
        city: 'New York'
      }
    });
  });
});
```

### chai-json-schema

```bash
npm install --save-dev chai-json-schema
```

```javascript
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const { expect } = chai;

chai.use(chaiJsonSchema);

describe('JSON Schema tests', function() {
  const userSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      age: { type: 'number', minimum: 0 }
    }
  };
  
  it('validates against schema', function() {
    const user = {
      name: 'Alice',
      email: 'alice@example.com',
      age: 30
    };
    
    expect(user).to.be.jsonSchema(userSchema);
  });
});
```

## Custom Assertions

### Adding Custom Method

```javascript
const chai = require('chai');

chai.Assertion.addMethod('between', function(min, max) {
  const obj = this._obj;
  
  this.assert(
    obj >= min && obj <= max,
    `expected #{this} to be between ${min} and ${max}`,
    `expected #{this} not to be between ${min} and ${max}`
  );
});

// Usage
const { expect } = chai;

describe('Custom assertions', function() {
  it('uses custom between', function() {
    expect(5).to.be.between(1, 10);
    expect(15).to.not.be.between(1, 10);
  });
});
```

### Adding Custom Property

```javascript
chai.Assertion.addProperty('positive', function() {
  const obj = this._obj;
  
  this.assert(
    obj > 0,
    'expected #{this} to be positive',
    'expected #{this} to not be positive'
  );
});

// Usage
describe('Custom property', function() {
  it('checks positive', function() {
    expect(5).to.be.positive;
    expect(-5).to.not.be.positive;
  });
});
```

### Custom Plugin

```javascript
// custom-plugin.js
module.exports = function(chai, utils) {
  const { Assertion } = chai;
  
  Assertion.addMethod('validEmail', function() {
    const obj = this._obj;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    this.assert(
      emailRegex.test(obj),
      'expected #{this} to be a valid email',
      'expected #{this} not to be a valid email'
    );
  });
};

// Usage
const chai = require('chai');
const customPlugin = require('./custom-plugin');

chai.use(customPlugin);

const { expect } = chai;

describe('Custom plugin', function() {
  it('validates email', function() {
    expect('alice@example.com').to.be.validEmail();
    expect('invalid-email').to.not.be.validEmail();
  });
});
```

## Integration with Mocha

```javascript
const { expect } = require('chai');
const UserService = require('../lib/user-service');

describe('UserService with Chai', function() {
  let userService;
  
  beforeEach(function() {
    userService = new UserService();
  });
  
  describe('#createUser', function() {
    it('creates a valid user', async function() {
      const user = await userService.createUser({
        name: 'Alice',
        email: 'alice@example.com'
      });
      
      expect(user).to.be.an('object');
      expect(user).to.have.property('id').that.is.a('string');
      expect(user).to.have.property('name', 'Alice');
      expect(user).to.have.property('email', 'alice@example.com');
      expect(user).to.have.property('createdAt').that.is.a('date');
    });
    
    it('validates required fields', async function() {
      try {
        await userService.createUser({ name: 'Bob' });
        expect.fail('Should have thrown error');
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Email is required');
      }
    });
  });
  
  describe('#getUser', function() {
    it('returns user by id', async function() {
      const created = await userService.createUser({
        name: 'Charlie',
        email: 'charlie@example.com'
      });
      
      const user = await userService.getUser(created.id);
      
      expect(user).to.exist;
      expect(user).to.deep.equal(created);
    });
    
    it('returns null for non-existent user', async function() {
      const user = await userService.getUser('invalid-id');
      expect(user).to.be.null;
    });
  });
});
```

## Best Practices

### 1. Choose One Style

```javascript
// Pick one and be consistent
const { expect } = require('chai');

// Use expect throughout your tests
expect(value).to.equal(expected);
```

### 2. Use Deep Equality for Objects

```javascript
// Good
expect(obj).to.deep.equal({ a: 1, b: 2 });

// Bad - won't work
expect(obj).to.equal({ a: 1, b: 2 });
```

### 3. Chain Assertions

```javascript
// Good - readable
expect(user)
  .to.be.an('object')
  .that.has.property('name', 'Alice');

// Also good for related checks
expect(arr).to.be.an('array').and.have.lengthOf(3);
```

### 4. Descriptive Failures

```javascript
// Add custom messages
expect(value, 'value should be positive').to.be.above(0);
```

### 5. Test Edge Cases

```javascript
describe('Edge cases', function() {
  it('handles empty array', function() {
    expect([]).to.be.empty;
  });
  
  it('handles null', function() {
    expect(null).to.be.null;
  });
  
  it('handles undefined', function() {
    expect(undefined).to.be.undefined;
  });
});
```

## Resources

- [Chai Documentation](https://www.chaijs.com/)
- [Chai API Reference](https://www.chaijs.com/api/)
- [Chai Plugins](https://www.chaijs.com/plugins/)
- [Chai GitHub](https://github.com/chaijs/chai)

## Next Steps

- Install Chai
- Choose assertion style
- Write first assertions
- Learn chainable language
- Try different matchers
- Explore plugins
- Custom assertions
- Integrate with test framework
- Best practices
- Advanced patterns
