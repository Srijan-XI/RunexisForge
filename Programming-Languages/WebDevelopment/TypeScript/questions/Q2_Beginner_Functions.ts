// Question 2 (Beginner): Functions with Type Annotations
// Create a function that:
// - Takes two numbers as parameters
// - Returns their sum
// - Has proper type annotations for parameters and return type
// Also create a function that takes a name and returns a greeting message.

// Solution:

// Function with explicit return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with type annotations
const subtract = (a: number, b: number): number => {
  return a - b;
};

// Function with string parameter and return type
function greet(name: string): string {
  return `Hello, ${name}! Welcome to TypeScript.`;
}

// Function with optional parameter
function introduce(name: string, age?: number): string {
  if (age !== undefined) {
    return `My name is ${name} and I'm ${age} years old.`;
  }
  return `My name is ${name}.`;
}

// Function with default parameter
function createUser(name: string, role: string = "user"): string {
  return `User ${name} created with role: ${role}`;
}

// Void return type (no return value)
function logMessage(message: string): void {
  console.log(`[LOG]: ${message}`);
}

// Testing the functions
console.log(add(5, 3));                    // 8
console.log(subtract(10, 4));              // 6
console.log(greet("Alice"));               // Hello, Alice! Welcome to TypeScript.
console.log(introduce("Bob", 30));         // My name is Bob and I'm 30 years old.
console.log(introduce("Charlie"));         // My name is Charlie.
console.log(createUser("Dave"));           // User Dave created with role: user
console.log(createUser("Eve", "admin"));   // User Eve created with role: admin
logMessage("TypeScript is awesome!");      // [LOG]: TypeScript is awesome!
