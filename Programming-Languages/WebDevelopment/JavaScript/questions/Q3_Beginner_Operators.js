/*
 * Question 3 (Beginner): Operators
 * 
 * Write a JavaScript program that demonstrates:
 * - Arithmetic operators
 * - Comparison operators
 * - Logical operators
 * - Assignment operators
 * 
 * Learning objectives:
 * - Use different operator types
 * - Understand operator precedence
 * - Work with expressions
 */

console.log("=== Arithmetic Operators ===");

let a = 10;
let b = 3;

console.log(`a = ${a}, b = ${b}`);
console.log(`a + b = ${a + b}`);  // Addition
console.log(`a - b = ${a - b}`);  // Subtraction
console.log(`a * b = ${a * b}`);  // Multiplication
console.log(`a / b = ${a / b}`);  // Division
console.log(`a % b = ${a % b}`);  // Modulus (remainder)
console.log(`a ** b = ${a ** b}`);  // Exponentiation (ES2016)

// Increment and Decrement
console.log("\n=== Increment/Decrement ===");
let x = 5;
console.log(`x = ${x}`);
console.log(`x++ = ${x++}`);  // Post-increment: returns 5, then increments
console.log(`x = ${x}`);       // Now 6
console.log(`++x = ${++x}`);  // Pre-increment: increments, then returns 7
console.log(`x = ${x}`);

// Comparison Operators
console.log("\n=== Comparison Operators ===");

console.log(`5 == "5" = ${5 == "5"}`);    // true (loose equality)
console.log(`5 === "5" = ${5 === "5"}`);  // false (strict equality)
console.log(`5 != "5" = ${5 != "5"}`);    // false
console.log(`5 !== "5" = ${5 !== "5"}`);  // true
console.log(`10 > 5 = ${10 > 5}`);
console.log(`10 < 5 = ${10 < 5}`);
console.log(`10 >= 10 = ${10 >= 10}`);
console.log(`10 <= 5 = ${10 <= 5}`);

// Logical Operators
console.log("\n=== Logical Operators ===");

console.log(`true && true = ${true && true}`);   // AND
console.log(`true && false = ${true && false}`);
console.log(`true || false = ${true || false}`); // OR
console.log(`false || false = ${false || false}`);
console.log(`!true = ${!true}`);                 // NOT
console.log(`!false = ${!false}`);

// Short-circuit evaluation
console.log("\n=== Short-circuit Evaluation ===");
let value1 = null;
let value2 = "default";
console.log(`value1 || value2 = ${value1 || value2}`);  // Returns "default"

let user = { name: "John" };
console.log(`user && user.name = ${user && user.name}`);  // Returns "John"

// Nullish coalescing operator (??)
console.log("\n=== Nullish Coalescing (??) ===");
let val1 = null;
let val2 = undefined;
let val3 = 0;
let val4 = "";

console.log(`null ?? "default" = ${val1 ?? "default"}`);      // "default"
console.log(`undefined ?? "default" = ${val2 ?? "default"}`);  // "default"
console.log(`0 ?? "default" = ${val3 ?? "default"}`);          // 0
console.log(`"" ?? "default" = ${val4 ?? "default"}`);         // ""

// Assignment Operators
console.log("\n=== Assignment Operators ===");

let num = 10;
console.log(`Initial: num = ${num}`);

num += 5;  // num = num + 5
console.log(`After += 5: num = ${num}`);

num -= 3;  // num = num - 3
console.log(`After -= 3: num = ${num}`);

num *= 2;  // num = num * 2
console.log(`After *= 2: num = ${num}`);

num /= 4;  // num = num / 4
console.log(`After /= 4: num = ${num}`);

num %= 5;  // num = num % 5
console.log(`After %= 5: num = ${num}`);

// Ternary Operator
console.log("\n=== Ternary Operator ===");

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(`Age: ${age}, Status: ${status}`);

let score = 85;
let grade = score >= 90 ? "A" : 
            score >= 80 ? "B" : 
            score >= 70 ? "C" : 
            score >= 60 ? "D" : "F";
console.log(`Score: ${score}, Grade: ${grade}`);

// typeof operator
console.log("\n=== typeof Operator ===");

console.log(`typeof 42 = ${typeof 42}`);
console.log(`typeof "hello" = ${typeof "hello"}`);
console.log(`typeof true = ${typeof true}`);
console.log(`typeof undefined = ${typeof undefined}`);
console.log(`typeof null = ${typeof null}`);  // "object" (historical bug)
console.log(`typeof {} = ${typeof {}}`);
console.log(`typeof [] = ${typeof []}`);  // "object"
console.log(`typeof function(){} = ${typeof function(){}}`);

// Operator Precedence
console.log("\n=== Operator Precedence ===");

let result1 = 2 + 3 * 4;  // Multiplication first
console.log(`2 + 3 * 4 = ${result1}`);  // 14

let result2 = (2 + 3) * 4;  // Parentheses first
console.log(`(2 + 3) * 4 = ${result2}`);  // 20

let result3 = 10 > 5 && 3 < 7;
console.log(`10 > 5 && 3 < 7 = ${result3}`);  // true

// Spread operator
console.log("\n=== Spread Operator (...) ===");

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log(`Combined: [${combined}]`);

let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let mergedObj = { ...obj1, ...obj2 };
console.log("Merged object:", mergedObj);

/*
 * Sample Output:
 * === Arithmetic Operators ===
 * a = 10, b = 3
 * a + b = 13
 * a - b = 7
 * a * b = 30
 * a / b = 3.3333333333333335
 * a % b = 1
 * a ** b = 1000
 * 
 * === Increment/Decrement ===
 * x = 5
 * x++ = 5
 * x = 6
 * ++x = 7
 * x = 7
 * 
 * === Comparison Operators ===
 * 5 == "5" = true
 * 5 === "5" = false
 * 5 != "5" = false
 * 5 !== "5" = true
 * 10 > 5 = true
 * 10 < 5 = false
 * 10 >= 10 = true
 * 10 <= 5 = false
 * 
 * === Logical Operators ===
 * true && true = true
 * true && false = false
 * true || false = true
 * false || false = false
 * !true = false
 * !false = true
 * 
 * === Short-circuit Evaluation ===
 * value1 || value2 = default
 * user && user.name = John
 * 
 * === Nullish Coalescing (??) ===
 * null ?? "default" = default
 * undefined ?? "default" = default
 * 0 ?? "default" = 0
 * "" ?? "default" = 
 * 
 * === Assignment Operators ===
 * Initial: num = 10
 * After += 5: num = 15
 * After -= 3: num = 12
 * After *= 2: num = 24
 * After /= 4: num = 6
 * After %= 5: num = 1
 * 
 * === Ternary Operator ===
 * Age: 20, Status: Adult
 * Score: 85, Grade: B
 * 
 * === typeof Operator ===
 * typeof 42 = number
 * typeof "hello" = string
 * typeof true = boolean
 * typeof undefined = undefined
 * typeof null = object
 * typeof {} = object
 * typeof [] = object
 * typeof function(){} = function
 * 
 * === Operator Precedence ===
 * 2 + 3 * 4 = 14
 * (2 + 3) * 4 = 20
 * 10 > 5 && 3 < 7 = true
 * 
 * === Spread Operator (...) ===
 * Combined: [1,2,3,4,5,6]
 * Merged object: { a: 1, b: 2, c: 3, d: 4 }
 */
