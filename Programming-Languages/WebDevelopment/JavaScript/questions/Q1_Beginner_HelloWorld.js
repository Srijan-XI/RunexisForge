/*
 * Question 1 (Beginner): Hello World and Console Output
 * 
 * Write a JavaScript program that demonstrates:
 * - Console output methods
 * - Basic syntax
 * - Comments
 * 
 * Learning objectives:
 * - Understand JavaScript syntax
 * - Use console methods
 * - Write first JavaScript program
 */

// Single-line comment

/*
   Multi-line comment
   Can span multiple lines
*/

// Console output methods
console.log("Hello, World!");
console.log("Welcome to JavaScript!");

// Different console methods
console.info("This is an info message");
console.warn("This is a warning message");
console.error("This is an error message");

// Logging multiple values
console.log("Name:", "John", "Age:", 25);

// Using template literals
const name = "JavaScript";
console.log(`Hello from ${name}!`);

// Console table
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];
console.table(users);

// Console time (measure performance)
console.time("myTimer");
for (let i = 0; i < 1000000; i++) {
    // Some operation
}
console.timeEnd("myTimer");

/*
 * Sample Output:
 * Hello, World!
 * Welcome to JavaScript!
 * This is an info message
 * This is a warning message
 * This is an error message
 * Name: John Age: 25
 * Hello from JavaScript!
 * ┌─────────┬─────────┬─────┐
 * │ (index) │  name   │ age │
 * ├─────────┼─────────┼─────┤
 * │    0    │ 'Alice' │ 25  │
 * │    1    │  'Bob'  │ 30  │
 * └─────────┴─────────┴─────┘
 * myTimer: 2.345ms
 */
