// Question 9 (Advanced): Decorators
// Use TypeScript decorators to add metadata and modify classes, methods, and properties.
// Note: Enable "experimentalDecorators": true in tsconfig.json

// Solution:

// Enable decorators in tsconfig.json:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// 1. Class Decorator
function sealed(constructor: Function) {
  console.log(`Sealing class: ${constructor.name}`);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class SealedClass {
  name: string = "Sealed";
}

// 2. Method Decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, JSON.stringify(args));
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, JSON.stringify(result));
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 3);       // Logs: Calling add with args: [5,3], Result: 8
calc.multiply(4, 7);  // Logs: Calling multiply with args: [4,7], Result: 28

// 3. Property Decorator
function readonly(target: any, propertyKey: string) {
  const descriptor: PropertyDescriptor = {
    writable: false,
    configurable: false
  };
  Object.defineProperty(target, propertyKey, descriptor);
}

class User {
  @readonly
  id: number = 1;

  name: string = "Alice";
}

const user = new User();
console.log(user.id);  // 1
// user.id = 2;        // Error: Cannot assign (in strict mode)

// 4. Parameter Decorator
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in ${String(propertyKey)} is required`);
}

class Greeter {
  greet(@required name: string): string {
    return `Hello, ${name}!`;
  }
}

// 5. Timing Decorator (Performance Measurement)
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms to execute`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @measure
  processLargeArray(size: number): number[] {
    const arr: number[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.random());
    }
    return arr;
  }
}

const processor = new DataProcessor();
processor.processLargeArray(1000000);

// 6. Validation Decorator
function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (value: any) {
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`${propertyKey}: Invalid value - must be a non-empty string`);
    }
    return originalMethod.apply(this, [value]);
  };

  return descriptor;
}

class Person {
  private _name: string = "";

  @validate
  setName(name: string): void {
    this._name = name;
    console.log(`Name set to: ${this._name}`);
  }

  getName(): string {
    return this._name;
  }
}

const person = new Person();
person.setName("Alice");  // OK
// person.setName("");    // Error: Invalid value

// 7. Memoization Decorator (Caching)
function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log(`Returning cached result for ${propertyKey}(${key})`);
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    console.log(`Caching result for ${propertyKey}(${key})`);
    return result;
  };

  return descriptor;
}

class MathOperations {
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @memoize
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

const math = new MathOperations();
console.log(math.fibonacci(10));  // Calculated and cached
console.log(math.fibonacci(10));  // Returns cached result
console.log(math.factorial(5));   // 120

// 8. Deprecated Decorator
function deprecated(message?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.warn(`Warning: ${propertyKey} is deprecated. ${message || ""}`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class LegacyAPI {
  @deprecated("Use newMethod() instead")
  oldMethod(): string {
    return "This is the old method";
  }

  newMethod(): string {
    return "This is the new method";
  }
}

const api = new LegacyAPI();
api.oldMethod();  // Logs deprecation warning

// 9. Retry Decorator (Error Handling)
function retry(attempts: number = 3) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.log(`Attempt ${i + 1} failed:`, (error as Error).message);
          if (i === attempts - 1) {
            throw error;
          }
        }
      }
    };

    return descriptor;
  };
}

class ApiClient {
  @retry(3)
  async fetchData(url: string): Promise<any> {
    // Simulating API call that might fail
    if (Math.random() > 0.7) {
      throw new Error("Network error");
    }
    return { data: "Success" };
  }
}

// 10. Class Decorator with Factory
function component(config: { selector: string; template: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      selector = config.selector;
      template = config.template;

      render() {
        console.log(`Rendering ${this.selector}:`);
        console.log(this.template);
      }
    };
  };
}

@component({
  selector: "app-header",
  template: "<header>My App Header</header>"
})
class HeaderComponent {
  title: string = "Header";
}

const header = new HeaderComponent() as any;
header.render();

// 11. Multiple Decorators
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {
    console.log("method called");
  }
}

// Execution order:
// 1. first(): factory evaluated
// 2. second(): factory evaluated
// 3. second(): called
// 4. first(): called

console.log("\n=== Decorators Example Complete ===");
console.log("Note: Enable 'experimentalDecorators' in tsconfig.json to use decorators");
