# TypeScript Installation and Usage Guide

## 💻 Installation

### Prerequisites

**Install Node.js** (TypeScript requires Node.js and npm)

- Download from https://nodejs.org/
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
```

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
```

### Alternative: Using Package Managers

**Yarn:**
```bash
# Global
yarn global add typescript

# Project-specific
yarn add --dev typescript
```

**pnpm:**
```bash
# Global
pnpm add -g typescript

# Project-specific
pnpm add -D typescript
```

---

## ⚙️ Initial Setup

### Create TypeScript Configuration

```bash
# Generate tsconfig.json
npx tsc --init
```

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
```

### Project Structure

```
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
```

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
```

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
```

### Run Compiled JavaScript

```bash
# Run compiled file
node dist/index.js
```

---

## 🚀 Using ts-node (Run TypeScript Directly)

**Install ts-node:**

```bash
npm install --save-dev ts-node @types/node
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

### Decorators (Experimental)

Enable in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

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
```

---

## 🛠️ Development Tools

### ESLint with TypeScript

```bash
# Install ESLint and TypeScript parser
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Initialize ESLint
npx eslint --init
```

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
```

### Prettier for Formatting

```bash
npm install --save-dev prettier

# Create .prettierrc
echo '{"semi": true, "singleQuote": true}' > .prettierrc

# Format files
npx prettier --write "src/**/*.ts"
```

### Jest for Testing

```bash
npm install --save-dev jest ts-jest @types/jest

# Initialize Jest
npx ts-jest config:init
```

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
```

---

## 📦 Common Project Setups

### Node.js Backend with Express

```bash
npm install express
npm install --save-dev @types/express
```

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
```

### React with TypeScript

```bash
# Create React app with TypeScript
npx create-react-app my-app --template typescript

# Or with Vite
npm create vite@latest my-app -- --template react-ts
```

---

## 🐛 Troubleshooting

### Common Issues

**Error: Cannot find module**
```bash
# Install type definitions
npm install --save-dev @types/node
npm install --save-dev @types/express
```

**Error: Property does not exist on type**
```typescript
// Use type assertion
const element = document.getElementById('app') as HTMLDivElement;

// Or non-null assertion
const element = document.getElementById('app')!;
```

**Strict mode errors**
```json
// Disable specific strict checks in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": false  // Disable specific check
  }
}
```

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
```

---

## 🎓 Next Steps

1. Practice with TypeScript exercises
2. Build a Node.js API with Express and TypeScript
3. Create a React app with TypeScript
4. Learn advanced types and patterns
5. Explore the questions in `/TypeScript/questions/`

---

**TypeScript is ready!** 🚀

[← Back to TypeScript Introduction](Introduction.md) | [View TypeScript Questions →](questions/)
