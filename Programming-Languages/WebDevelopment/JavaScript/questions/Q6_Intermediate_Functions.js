/*
 * Question 6 (Intermediate): Functions
 * 
 * Write a JavaScript program that demonstrates:
 * - Function declarations
 * - Function expressions
 * - Arrow functions
 * - Parameters and return values
 * - Default parameters
 * - Rest and spread operators
 * 
 * Learning objectives:
 * - Create and use functions
 * - Understand different function types
 * - Work with function parameters
 */

console.log("=== Function Declaration ===");

// Traditional function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

console.log(`5 + 3 = ${add(5, 3)}`);

// Function Expression
console.log("\n=== Function Expression ===");

const multiply = function(x, y) {
    return x * y;
};

console.log(`4 * 6 = ${multiply(4, 6)}`);

// Arrow Functions (ES6)
console.log("\n=== Arrow Functions ===");

// Concise arrow function
const square = x => x * x;
console.log(`Square of 5: ${square(5)}`);

// Arrow function with multiple parameters
const subtract = (a, b) => a - b;
console.log(`10 - 3 = ${subtract(10, 3)}`);

// Arrow function with block body
const divide = (a, b) => {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
};

console.log(`10 / 2 = ${divide(10, 2)}`);
console.log(`10 / 0 = ${divide(10, 0)}`);

// Default Parameters
console.log("\n=== Default Parameters ===");

function greetWithDefault(name = "Guest") {
    return `Welcome, ${name}!`;
}

console.log(greetWithDefault("Bob"));
console.log(greetWithDefault());  // Uses default

function calculatePrice(price, tax = 0.1, discount = 0) {
    return price * (1 + tax) * (1 - discount);
}

console.log(`Price with tax: $${calculatePrice(100)}`);
console.log(`Price with tax and discount: $${calculatePrice(100, 0.1, 0.2)}`);

// Rest Parameters
console.log("\n=== Rest Parameters ===");

function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(`Sum of 1, 2, 3: ${sum(1, 2, 3)}`);
console.log(`Sum of 5, 10, 15, 20: ${sum(5, 10, 15, 20)}`);

function introduce(firstName, lastName, ...hobbies) {
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Hobbies: ${hobbies.join(", ")}`);
}

introduce("John", "Doe", "reading", "coding", "gaming");

// Spread Operator
console.log("\n=== Spread Operator ===");

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

console.log(`Max of [${nums1}]: ${Math.max(...nums1)}`);
console.log(`Combined: [${[...nums1, ...nums2]}]`);

// Return Multiple Values (using object/array)
console.log("\n=== Return Multiple Values ===");

function getMinMax(arr) {
    return {
        min: Math.min(...arr),
        max: Math.max(...arr)
    };
}

const numbers = [5, 2, 8, 1, 9];
const result = getMinMax(numbers);
console.log(`Array: [${numbers}]`);
console.log(`Min: ${result.min}, Max: ${result.max}`);

// Higher-Order Functions
console.log("\n=== Higher-Order Functions ===");

// Function that returns a function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(`Double of 5: ${double(5)}`);
console.log(`Triple of 5: ${triple(5)}`);

// Function that takes a function as parameter
function applyOperation(arr, operation) {
    return arr.map(operation);
}

const values = [1, 2, 3, 4, 5];
const squared = applyOperation(values, x => x * x);
console.log(`Original: [${values}]`);
console.log(`Squared: [${squared}]`);

// Immediately Invoked Function Expression (IIFE)
console.log("\n=== IIFE ===");

(function() {
    console.log("This function runs immediately!");
})();

const result2 = (function(a, b) {
    return a + b;
})(10, 20);

console.log(`IIFE result: ${result2}`);

// Recursion
console.log("\n=== Recursion ===");

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(`Factorial of 5: ${factorial(5)}`);

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
    console.log(`fibonacci(${i}) = ${fibonacci(i)}`);
}

// Closures
console.log("\n=== Closures ===");

function counter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

const myCounter = counter();
console.log(`Initial: ${myCounter.getValue()}`);
console.log(`After increment: ${myCounter.increment()}`);
console.log(`After increment: ${myCounter.increment()}`);
console.log(`After decrement: ${myCounter.decrement()}`);

// Callback Functions
console.log("\n=== Callback Functions ===");

function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        const data = { id: 1, name: "Sample Data" };
        callback(data);
    }, 100);
}

fetchData((data) => {
    console.log("Data received:", data);
});

// Pure vs Impure Functions
console.log("\n=== Pure vs Impure Functions ===");

// Pure function (no side effects, same input = same output)
function pureAdd(a, b) {
    return a + b;
}

console.log(`Pure function: ${pureAdd(2, 3)}`);

// Impure function (has side effects)
let total = 0;
function impureAdd(value) {
    total += value;  // Modifies external variable
    return total;
}

console.log(`Impure function: ${impureAdd(5)}`);
console.log(`Called again: ${impureAdd(5)}`);  // Different result!

/*
 * Sample Output:
 * === Function Declaration ===
 * Hello, Alice!
 * 5 + 3 = 8
 * 
 * === Function Expression ===
 * 4 * 6 = 24
 * 
 * === Arrow Functions ===
 * Square of 5: 25
 * 10 - 3 = 7
 * 10 / 2 = 5
 * 10 / 0 = Cannot divide by zero
 * 
 * === Default Parameters ===
 * Welcome, Bob!
 * Welcome, Guest!
 * Price with tax: $110
 * Price with tax and discount: $88
 * 
 * === Rest Parameters ===
 * Sum of 1, 2, 3: 6
 * Sum of 5, 10, 15, 20: 50
 * Name: John Doe
 * Hobbies: reading, coding, gaming
 * 
 * === Spread Operator ===
 * Max of [1,2,3]: 3
 * Combined: [1,2,3,4,5,6]
 * 
 * === Return Multiple Values ===
 * Array: [5,2,8,1,9]
 * Min: 1, Max: 9
 * 
 * === Higher-Order Functions ===
 * Double of 5: 10
 * Triple of 5: 15
 * Original: [1,2,3,4,5]
 * Squared: [1,4,9,16,25]
 * 
 * === IIFE ===
 * This function runs immediately!
 * IIFE result: 30
 * 
 * === Recursion ===
 * Factorial of 5: 120
 * Fibonacci sequence:
 * fibonacci(0) = 0
 * fibonacci(1) = 1
 * fibonacci(2) = 1
 * fibonacci(3) = 2
 * fibonacci(4) = 3
 * fibonacci(5) = 5
 * fibonacci(6) = 8
 * fibonacci(7) = 13
 * fibonacci(8) = 21
 * fibonacci(9) = 34
 * 
 * === Closures ===
 * Initial: 0
 * After increment: 1
 * After increment: 2
 * After decrement: 1
 * 
 * === Callback Functions ===
 * Fetching data...
 * Data received: { id: 1, name: 'Sample Data' }
 * 
 * === Pure vs Impure Functions ===
 * Pure function: 5
 * Impure function: 5
 * Called again: 10
 */
