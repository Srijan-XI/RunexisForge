/*
 * Question 2 (Beginner): Variables and Data Types
 * 
 * Write a JavaScript program that demonstrates:
 * - Variable declarations (var, let, const)
 * - Primitive data types
 * - typeof operator
 * 
 * Learning objectives:
 * - Understand JavaScript data types
 * - Learn variable scoping
 * - Use typeof operator
 */

// Variable declarations
var oldWay = "Using var (function-scoped)";
let modernWay = "Using let (block-scoped)";
const constant = "Using const (cannot be reassigned)";

console.log("=== Variable Declarations ===");
console.log(oldWay);
console.log(modernWay);
console.log(constant);

// Primitive data types
console.log("\n=== Primitive Data Types ===");

// Number
let age = 25;
let price = 99.99;
let negative = -10;
console.log(`Number: ${age}, Type: ${typeof age}`);
console.log(`Float: ${price}, Type: ${typeof price}`);

// String
let firstName = "John";
let lastName = 'Doe';
let fullName = `${firstName} ${lastName}`;  // Template literal
console.log(`String: ${fullName}, Type: ${typeof fullName}`);

// Boolean
let isActive = true;
let isCompleted = false;
console.log(`Boolean: ${isActive}, Type: ${typeof isActive}`);

// Undefined
let notDefined;
console.log(`Undefined: ${notDefined}, Type: ${typeof notDefined}`);

// Null
let empty = null;
console.log(`Null: ${empty}, Type: ${typeof empty}`);  // Note: returns "object" (JavaScript quirk)

// Symbol (ES6)
let symbol1 = Symbol("unique");
let symbol2 = Symbol("unique");
console.log(`Symbols equal: ${symbol1 === symbol2}`);  // false
console.log(`Symbol type: ${typeof symbol1}`);

// BigInt (ES2020)
let bigNumber = 1234567890123456789012345678901234567890n;
console.log(`BigInt: ${bigNumber}, Type: ${typeof bigNumber}`);

// Special number values
console.log("\n=== Special Number Values ===");
console.log(`Infinity: ${1 / 0}`);
console.log(`-Infinity: ${-1 / 0}`);
console.log(`NaN: ${0 / 0}`);
console.log(`NaN type: ${typeof NaN}`);  // "number"

// Type coercion
console.log("\n=== Type Coercion ===");
console.log(`"5" + 3 = ${"5" + 3}`);  // "53" (string concatenation)
console.log(`"5" - 3 = ${"5" - 3}`);  // 2 (numeric subtraction)
console.log(`"5" * 2 = ${"5" * 2}`);  // 10 (numeric multiplication)
console.log(`true + 1 = ${true + 1}`);  // 2
console.log(`false + 1 = ${false + 1}`);  // 1

// Variable scope
console.log("\n=== Variable Scope ===");

function scopeDemo() {
    var functionScoped = "var is function-scoped";
    let blockScoped = "let is block-scoped";
    const alsoBlockScoped = "const is also block-scoped";
    
    if (true) {
        var functionScoped2 = "accessible outside block";
        let blockScoped2 = "NOT accessible outside block";
        console.log(blockScoped2);
    }
    
    console.log(functionScoped2);  // Works
    // console.log(blockScoped2);  // Would throw ReferenceError
}

scopeDemo();

// Constants
console.log("\n=== Constants ===");
const PI = 3.14159;
console.log(`PI: ${PI}`);
// PI = 3.14;  // Would throw TypeError

// Const with objects (object properties can be modified)
const person = { name: "Alice", age: 25 };
console.log("Before:", person);
person.age = 26;  // This works
console.log("After:", person);
// person = {};  // This would throw TypeError

/*
 * Sample Output:
 * === Variable Declarations ===
 * Using var (function-scoped)
 * Using let (block-scoped)
 * Using const (cannot be reassigned)
 * 
 * === Primitive Data Types ===
 * Number: 25, Type: number
 * Float: 99.99, Type: number
 * String: John Doe, Type: string
 * Boolean: true, Type: boolean
 * Undefined: undefined, Type: undefined
 * Null: null, Type: object
 * Symbols equal: false
 * Symbol type: symbol
 * BigInt: 1234567890123456789012345678901234567890, Type: bigint
 * 
 * === Special Number Values ===
 * Infinity: Infinity
 * -Infinity: -Infinity
 * NaN: NaN
 * NaN type: number
 * 
 * === Type Coercion ===
 * "5" + 3 = 53
 * "5" - 3 = 2
 * "5" * 2 = 10
 * true + 1 = 2
 * false + 1 = 1
 * 
 * === Variable Scope ===
 * NOT accessible outside block
 * accessible outside block
 * 
 * === Constants ===
 * PI: 3.14159
 * Before: { name: 'Alice', age: 25 }
 * After: { name: 'Alice', age: 26 }
 */
