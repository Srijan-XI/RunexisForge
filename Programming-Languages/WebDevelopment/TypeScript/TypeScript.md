# TypeScript

## Introduction


## 🚀 What is TypeScript?

**TypeScript** is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Developed and maintained by Microsoft, TypeScript adds optional static typing to JavaScript, enabling developers to catch errors early in development and improve code quality.

**Key Features:**

- **Static Type Checking**: Catch errors before runtime
- **Modern JavaScript Features**: Support for ES6+ features
- **Excellent IDE Support**: IntelliSense, refactoring, and navigation
- **Gradual Adoption**: Add types incrementally to existing JavaScript
- **Compiles to JavaScript**: Runs anywhere JavaScript runs
- **Strong OOP Support**: Interfaces, classes, generics, and more
- **Great for Large Projects**: Better maintainability and scalability
- **Active Community**: Extensive ecosystem and third-party type definitions

---

## ✅ Advantages of TypeScript

| Advantage | Description |
|-----------|-------------|
| **Early Error Detection** | Catch type-related errors during development, not in production |
| **Better IDE Support** | IntelliSense, autocomplete, refactoring, and navigation |
| **Self-Documenting Code** | Types serve as inline documentation |
| **Easier Refactoring** | Confidence when making changes to large codebases |
| **Modern JavaScript Features** | Use latest ECMAScript features with backward compatibility |
| **Strong OOP Support** | Classes, interfaces, generics, decorators, and more |
| **Large Ecosystem** | DefinitelyTyped provides types for thousands of libraries |
| **Gradual Adoption** | Can be introduced incrementally into existing projects |
| **Improved Team Collaboration** | Clear contracts between modules and functions |
| **Industry Standard** | Widely adopted by major companies (Google, Microsoft, Airbnb, Slack) |

---

## ❌ Disadvantages of TypeScript

| Disadvantage | Description |
|-------------|-------------|
| **Learning Curve** | Additional concepts to learn beyond JavaScript |
| **Compilation Step** | Requires build process, adds complexity |
| **More Verbose** | Type annotations increase code size |
| **Initial Setup Overhead** | Configuration and tooling setup required |
| **Not True Static Typing** | Types are erased at runtime, only compile-time checking |
| **Third-Party Library Types** | Some libraries lack type definitions |
| **Slower Development Initially** | More time spent on type definitions |
| **Build Time** | Large projects may have longer compilation times |
| **Breaking Changes** | Major versions may introduce breaking changes |
| **Not Required for Small Projects** | Overhead may not be justified for simple scripts |

---

## 🎯 When to Use TypeScript

### Ideal Use Cases

1. **Large-Scale Applications**
   - Enterprise applications
   - Complex web applications
   - Long-term maintained projects

2. **Team Collaboration**
   - Multiple developers working on same codebase
   - Distributed teams
   - Open-source projects with contributors

3. **Mission-Critical Applications**
   - Financial systems
   - Healthcare applications
   - E-commerce platforms

4. **Library Development**
   - NPM packages
   - Shared component libraries
   - Framework development

5. **Backend Development**
   - Node.js APIs with Express/NestJS
   - GraphQL servers
   - Microservices

6. **Frontend Frameworks**
   - Angular (built with TypeScript)
   - React applications
   - Vue.js 3 applications

7. **Full-Stack Development**
   - Shared types between frontend and backend
   - Monorepo projects
   - Type-safe APIs

---

## 📊 TypeScript vs JavaScript vs Other Languages

| Feature | TypeScript | JavaScript | Java | Python |
|---------|-----------|------------|------|--------|
| **Typing** | Static (optional) | Dynamic | Static | Dynamic |
| **Compilation** | Transpiled to JS | Interpreted | Compiled | Interpreted |
| **Runtime** | Browser/Node.js | Browser/Node.js | JVM | Python Runtime |
| **Type Safety** | Compile-time | None | Compile-time | Runtime (type hints) |
| **Learning Curve** | Moderate | Easy | Steep | Easy |
| **Performance** | Same as JavaScript | Fast (JIT) | Fast | Moderate |
| **Use Case** | Web, Mobile, Backend | Web, Mobile, Backend | Enterprise, Android | ML, Web, Automation |
| **Ecosystem** | NPM (same as JS) | NPM | Maven/Gradle | PyPI |
| **OOP Support** | Strong | Prototype-based | Strong | Strong |
| **Community** | Large & Growing | Very Large | Very Large | Very Large |

---

## 🏢 Companies Using TypeScript

- **Microsoft**: VS Code, Teams, Azure Portal
- **Google**: Angular framework, Google Cloud Console
- **Airbnb**: Frontend infrastructure
- **Slack**: Desktop and web applications
- **Lyft**: Ride-sharing platform
- **Asana**: Project management tool
- **Stripe**: Payment processing APIs
- **Shopify**: E-commerce platform
- **Netflix**: Media streaming infrastructure
- **Reddit**: Redesigned web platform

---

## 🧩 TypeScript Core Concepts

### 1. Type Annotations

```typescript
// Basic types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["apple", "banana"];
let tuple: [string, number] = ["hello", 42];

// Function types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Object types
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
```javascript

### 2. Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};
```javascript

### 3. Classes

```typescript
class Person {
  private id: number;
  public name: string;
  protected age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  public introduce(): string {
    return `Hi, I'm ${this.name}`;
  }
}
```javascript

### 4. Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Repository<T> {
  findById(id: number): T | null;
  save(item: T): void;
  delete(id: number): void;
}

// Generic class
class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getAll(): T[] {
    return this.items;
  }
}
```javascript

### 5. Union and Intersection Types

```typescript
// Union type (OR)
type Status = "pending" | "approved" | "rejected";
let currentStatus: Status = "pending";

function printId(id: number | string) {
  console.log(`ID: ${id}`);
}

// Intersection type (AND)
interface Nameable {
  name: string;
}

interface Ageable {
  age: number;
}

type Person = Nameable & Ageable;

const person: Person = {
  name: "Alice",
  age: 30
};
```javascript

### 6. Type Aliases

```typescript
// Type alias
type Point = {
  x: number;
  y: number;
};

type ID = number | string;
type Callback = (data: string) => void;

// Using type alias
const point: Point = { x: 10, y: 20 };
const userId: ID = 123;
```javascript

### 7. Enums

```typescript
// Numeric enum
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let direction: Direction = Direction.Up;
let color: Color = Color.Red;
```javascript

---

## 🔧 TypeScript Compiler Options (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",           // ECMAScript target version
    "module": "commonjs",         // Module system
    "lib": ["ES2020"],            // Library files
    "outDir": "./dist",           // Output directory
    "rootDir": "./src",           // Input directory
    "strict": true,               // Enable all strict type-checking
    "esModuleInterop": true,      // Interoperability with CommonJS
    "skipLibCheck": true,         // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,    // Import JSON files
    "declaration": true,          // Generate .d.ts files
    "sourceMap": true             // Generate source maps
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```javascript

---

## 📈 TypeScript Type System Benefits

### Type Inference

```typescript
// TypeScript infers the type
let message = "Hello"; // Inferred as string
let count = 42;        // Inferred as number

// No need for explicit type annotation
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}
```javascript

### Type Guards

```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
}
```javascript

### Non-Null Assertion

```typescript
function getLength(str: string | null) {
  // Using non-null assertion operator
  return str!.length; // Asserts str is not null
}

// Better: Use optional chaining
function getLengthSafe(str: string | null) {
  return str?.length; // Returns undefined if null
}
```javascript

---

## 🚦 TypeScript Use Case Example

### Building a Type-Safe API Client

```typescript
// Define API response types
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Type-safe API client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Usage with type safety
const api = new ApiClient('https://api.example.com');

// TypeScript knows the response type
const response = await api.get<User>('/users/1');
console.log(response.data.name); // Type-safe access
```text

---

## 🔮 When NOT to Use TypeScript

1. **Simple Scripts or Prototypes**
   - Quick one-off scripts
   - Small utility programs
   - Proof of concepts

2. **Learning JavaScript**
   - When first learning programming
   - Understanding core JavaScript concepts

3. **Rapid Prototyping**
   - Hackathons
   - Quick MVPs
   - Experiments

4. **Pure Runtime Projects**
   - Projects requiring runtime type checking
   - Dynamic code generation

5. **Team Unfamiliarity**
   - Team has no TypeScript experience
   - No time for learning curve

---

## 🌟 TypeScript Ecosystem

### Popular Frameworks with TypeScript

1. **Angular**: Built with TypeScript
2. **NestJS**: Backend framework (Node.js)
3. **Next.js**: React framework with TypeScript support
4. **Deno**: Modern JavaScript/TypeScript runtime
5. **Ionic**: Mobile app framework
6. **Electron**: Desktop app framework

### Type Definitions

- **DefinitelyTyped**: Community-maintained type definitions for JavaScript libraries
- **@types/* packages**: Install types for popular libraries

  ```bash
  npm install --save-dev @types/node @types/express @types/react
  ```

---

## 📚 Learn More

- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

## 🎓 TypeScript Design Patterns

TypeScript works excellently with design patterns:

- **Singleton**: Ensure single instance
- **Factory**: Create objects without specifying exact class
- **Observer**: Event-driven programming
- **Decorator**: Add functionality to classes (experimental)
- **Strategy**: Select algorithm at runtime
- **Repository**: Abstract data access

---

**Next**: [Installation and Usage Guide →](TypeScript.md#user-guide)

---

## User Guide


## 💻 Installation

### Prerequisites

**Install Node.js** (TypeScript requires Node.js and npm)

- Download from <https://nodejs.org/>
- Verify installation:

  ```bash
  node --version
  npm --version
  ```

### Global Installation (Recommended for CLI)

```bash
# Install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version
# Output: Version 5.x.x
```bash

### Project-Specific Installation (Recommended for Projects)

```bash
# Create project directory
mkdir my-typescript-project
cd my-typescript-project

# Initialize package.json
npm init -y

# Install TypeScript as dev dependency
npm install --save-dev typescript

# Verify
npx tsc --version
```bash

### Alternative: Using Package Managers

**Yarn:**

```bash
# Global
yarn global add typescript

# Project-specific
yarn add --dev typescript
```bash

**pnpm:**

```bash
# Global
pnpm add -g typescript

# Project-specific
pnpm add -D typescript
```bash

---

## ⚙️ Initial Setup

### Create TypeScript Configuration

```bash
# Generate tsconfig.json
npx tsc --init
```bash

### Basic `tsconfig.json` Configuration

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2020",                    // ECMAScript target version
    "lib": ["ES2020"],                     // Library files to include
    
    /* Modules */
    "module": "commonjs",                  // Module system
    "rootDir": "./src",                    // Input directory
    "moduleResolution": "node",            // Module resolution strategy
    "resolveJsonModule": true,             // Allow importing JSON
    
    /* Emit */
    "outDir": "./dist",                    // Output directory
    "sourceMap": true,                     // Generate source maps
    "removeComments": true,                // Remove comments in output
    "declaration": true,                   // Generate .d.ts files
    
    /* Type Checking */
    "strict": true,                        // Enable all strict type checks
    "noImplicitAny": true,                 // Error on implied 'any'
    "strictNullChecks": true,              // Strict null checking
    "strictFunctionTypes": true,           // Strict function types
    "noUnusedLocals": true,                // Error on unused local variables
    "noUnusedParameters": true,            // Error on unused parameters
    
    /* Interop Constraints */
    "esModuleInterop": true,               // CommonJS/ES6 interop
    "allowSyntheticDefaultImports": true,  // Allow default imports
    "forceConsistentCasingInFileNames": true,
    
    /* Other */
    "skipLibCheck": true                   // Skip type checking of declaration files
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```bash

### Project Structure

```bash
my-typescript-project/
├── src/
│   ├── index.ts
│   ├── models/
│   │   └── user.ts
│   └── utils/
│       └── helpers.ts
├── dist/               # Compiled JavaScript (generated)
├── node_modules/
├── package.json
├── tsconfig.json
└── .gitignore
```bash

---

## 🎯 Basic Usage

### Your First TypeScript File

Create `src/index.ts`:

```typescript
// Basic types
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;

// Function with type annotations
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("World"));

// Array and object types
let numbers: number[] = [1, 2, 3, 4, 5];
let user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

console.log(message);
console.log(user);
```bash

### Compile TypeScript

```bash
# Compile single file
tsc src/index.ts

# Compile all files (uses tsconfig.json)
tsc

# Compile and watch for changes
tsc --watch

# Compile with specific config
tsc --project tsconfig.json
```bash

### Run Compiled JavaScript

```bash
# Run compiled file
node dist/index.js
```bash

---

## 🚀 Using ts-node (Run TypeScript Directly)

**Install ts-node:**

```bash
npm install --save-dev ts-node @types/node
```bash

**Run TypeScript without compilation:**

```bash
# Run TypeScript file directly
npx ts-node src/index.ts

# Use in package.json scripts
{
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "ts-node --watch src/index.ts"
  }
}

# Then run
npm start
```bash

---

## 📝 TypeScript Basics

### Type Annotations

```typescript
// Primitive types
let username: string = "John";
let age: number = 25;
let isStudent: boolean = true;
let notDefined: undefined = undefined;
let empty: null = null;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuples (fixed-length arrays with specific types)
let tuple: [string, number] = ["age", 30];

// Any (avoid when possible)
let anything: any = "can be anything";

// Unknown (safer alternative to any)
let uncertain: unknown = "something";

// Void (no return value)
function logMessage(msg: string): void {
  console.log(msg);
}

// Never (never returns)
function throwError(message: string): never {
  throw new Error(message);
}
```bash

### Interfaces

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;              // Optional property
  readonly createdAt: Date;  // Read-only property
}

// Implementing interface
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date()
};

// Interface for functions
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (x, y) => x + y;

// Extending interfaces
interface Employee extends User {
  employeeId: string;
  department: string;
}

// Interface with index signature
interface Dictionary {
  [key: string]: string;
}

const dict: Dictionary = {
  hello: "world",
  foo: "bar"
};
```bash

### Classes

```typescript
// Basic class
class Person {
  // Properties
  private id: number;
  public name: string;
  protected age: number;
  
  // Constructor
  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  
  // Method
  public introduce(): string {
    return `Hi, I'm ${this.name}, ${this.age} years old.`;
  }
  
  // Getter
  public get userId(): number {
    return this.id;
  }
  
  // Setter
  public set userId(id: number) {
    this.id = id;
  }
}

// Inheritance
class Employee extends Person {
  private department: string;
  
  constructor(id: number, name: string, age: number, department: string) {
    super(id, name, age);
    this.department = department;
  }
  
  public introduce(): string {
    return `${super.introduce()} I work in ${this.department}.`;
  }
}

// Using classes
const person = new Person(1, "Alice", 30);
console.log(person.introduce());

const employee = new Employee(2, "Bob", 35, "Engineering");
console.log(employee.introduce());

// Abstract class
abstract class Animal {
  abstract makeSound(): void;
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```bash

### Type Aliases and Union Types

```typescript
// Type alias
type ID = string | number;
type Point = { x: number; y: number };
type Status = "pending" | "approved" | "rejected";

// Using type aliases
let userId: ID = 123;
let productId: ID = "ABC123";

const point: Point = { x: 10, y: 20 };
let currentStatus: Status = "pending";

// Union types
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(`ID (string): ${id.toUpperCase()}`);
  } else {
    console.log(`ID (number): ${id}`);
  }
}

// Intersection types
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = {
  color: "red",
  radius: 10
};
```bash

### Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Generic interface
interface Repository<T> {
  items: T[];
  add(item: T): void;
  findById(id: number): T | undefined;
}

// Generic class
class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  getAll(): T[] {
    return this.items;
  }
  
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
}

// Using generic class
interface Product {
  id: number;
  name: string;
  price: number;
}

const productStore = new DataStore<Product>();
productStore.add({ id: 1, name: "Laptop", price: 999 });
console.log(productStore.getAll());

// Generic constraints
interface HasId {
  id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```bash

### Enums

```typescript
// Numeric enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up;
console.log(dir); // 1

// String enum
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

let status: Status = Status.Pending;
console.log(status); // "PENDING"

// Const enum (inlined at compile time)
const enum Color {
  Red,
  Green,
  Blue
}

let color = Color.Red;
```bash

---

## 🔍 Advanced TypeScript Features

### Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Readonly - all properties read-only
type ReadonlyUser = Readonly<User>;

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, "email">;

// Record - create object type with specific keys
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// ReturnType - get function return type
function getUser() {
  return { id: 1, name: "John" };
}
type User2 = ReturnType<typeof getUser>;
```bash

### Type Guards and Narrowing

```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// instanceof type guard
class Cat {
  meow() { console.log("Meow!"); }
}

class Dog {
  bark() { console.log("Woof!"); }
}

function makeSound(animal: Cat | Dog) {
  if (animal instanceof Cat) {
    animal.meow();
  } else {
    animal.bark();
  }
}

// Custom type guard
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```bash

### Decorators (Experimental)

Enable in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```bash

```typescript
// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Example {
  // ...
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```bash

---

## 🛠️ Development Tools

### ESLint with TypeScript

```bash
# Install ESLint and TypeScript parser
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Initialize ESLint
npx eslint --init
```bash

**`.eslintrc.json`:**

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```bash

### Prettier for Formatting

```bash
npm install --save-dev prettier

# Create .prettierrc
echo '{"semi": true, "singleQuote": true}' > .prettierrc

# Format files
npx prettier --write "src/**/*.ts"
```bash

### Jest for Testing

```bash
npm install --save-dev jest ts-jest @types/jest

# Initialize Jest
npx ts-jest config:init
```bash

**Example test file (`src/utils.test.ts`):**

```typescript
function add(a: number, b: number): number {
  return a + b;
}

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  it('should handle negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
```bash

---

## 📦 Common Project Setups

### Node.js Backend with Express

```bash
npm install express
npm install --save-dev @types/express
```bash

**`src/server.ts`:**

```typescript
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```bash

### React with TypeScript

```bash
# Create React app with TypeScript
npx create-react-app my-app --template typescript

# Or with Vite
npm create vite@latest my-app -- --template react-ts
```bash

---

## 🐛 Troubleshooting

### Common Issues

**Error: Cannot find module**

```bash
# Install type definitions
npm install --save-dev @types/node
npm install --save-dev @types/express
```bash

**Error: Property does not exist on type**

```typescript
// Use type assertion
const element = document.getElementById('app') as HTMLDivElement;

// Or non-null assertion
const element = document.getElementById('app')!;
```bash

**Strict mode errors**

```json
// Disable specific strict checks in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": false  // Disable specific check
  }
}
```bash

---

## 📚 Package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "watch": "tsc --watch",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```bash

---

## 🎓 Next Steps

1. Practice with TypeScript exercises
2. Build a Node.js API with Express and TypeScript
3. Create a React app with TypeScript
4. Learn advanced types and patterns
5. Explore the questions in `/TypeScript/questions/`

---

**TypeScript is ready!** 🚀

[← Back to TypeScript Introduction](TypeScript.md#introduction) | [View TypeScript Questions →](questions/)

