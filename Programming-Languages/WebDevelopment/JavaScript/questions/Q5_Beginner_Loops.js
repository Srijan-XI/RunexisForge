/*
 * Question 5 (Beginner): Loops
 * 
 * Write a JavaScript program that demonstrates:
 * - for loop
 * - while loop
 * - do-while loop
 * - for...of and for...in loops
 * - break and continue
 * 
 * Learning objectives:
 * - Use different loop types
 * - Iterate over collections
 * - Control loop execution
 */

console.log("=== For Loop ===");

// Basic for loop
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

// Loop with array
console.log("\n=== Loop through Array ===");
let fruits = ["apple", "banana", "cherry", "date"];

for (let i = 0; i < fruits.length; i++) {
    console.log(`${i}: ${fruits[i]}`);
}

// Nested loops
console.log("\n=== Nested Loops (Multiplication Table) ===");
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= 5; j++) {
        row += `${i * j}\t`;
    }
    console.log(row);
}

// While loop
console.log("\n=== While Loop ===");

let count = 1;
while (count <= 5) {
    console.log(`While count: ${count}`);
    count++;
}

// While with condition
let sum = 0;
let num = 1;
while (sum < 50) {
    sum += num;
    num++;
}
console.log(`Sum reached ${sum} in ${num - 1} iterations`);

// Do-while loop
console.log("\n=== Do-While Loop ===");

let i = 1;
do {
    console.log(`Do-while count: ${i}`);
    i++;
} while (i <= 5);

// Do-while executes at least once
console.log("\n=== Do-While (Executes at Least Once) ===");
let x = 10;
do {
    console.log("This runs even though condition is false");
} while (x < 5);

// For...of loop (iterate over values)
console.log("\n=== For...of Loop (Array Values) ===");

let colors = ["red", "green", "blue"];
for (let color of colors) {
    console.log(color);
}

// For...of with strings
console.log("\n=== For...of with String ===");
let word = "JavaScript";
for (let char of word) {
    console.log(char);
}

// For...in loop (iterate over keys/indices)
console.log("\n=== For...in Loop (Object Properties) ===");

let person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// For...in with array (not recommended)
console.log("\n=== For...in with Array (indices) ===");
let numbers = [10, 20, 30, 40];
for (let index in numbers) {
    console.log(`Index ${index}: ${numbers[index]}`);
}

// Break statement
console.log("\n=== Break Statement ===");

for (let i = 1; i <= 10; i++) {
    if (i === 6) {
        console.log("Breaking at 6");
        break;
    }
    console.log(i);
}

// Find first even number
let nums = [1, 3, 5, 8, 9, 10];
for (let num of nums) {
    if (num % 2 === 0) {
        console.log(`First even number: ${num}`);
        break;
    }
}

// Continue statement
console.log("\n=== Continue Statement ===");

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(`Odd number: ${i}`);
}

// Labels with break
console.log("\n=== Labeled Statements ===");

outerLoop: for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            console.log("Breaking outer loop");
            break outerLoop;
        }
        console.log(`i=${i}, j=${j}`);
    }
}

// forEach method (array method)
console.log("\n=== Array forEach Method ===");

let cities = ["Paris", "London", "Tokyo"];
cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});

// map method
console.log("\n=== Array map Method ===");

let prices = [10, 20, 30];
let discountedPrices = prices.map(price => price * 0.9);
console.log("Original:", prices);
console.log("Discounted:", discountedPrices);

// filter method
console.log("\n=== Array filter Method ===");

let ages = [12, 18, 25, 30, 15, 22];
let adults = ages.filter(age => age >= 18);
console.log("All ages:", ages);
console.log("Adults (18+):", adults);

// reduce method
console.log("\n=== Array reduce Method ===");

let values = [1, 2, 3, 4, 5];
let total = values.reduce((accumulator, current) => accumulator + current, 0);
console.log("Values:", values);
console.log("Sum:", total);

// Loop performance comparison
console.log("\n=== Loop Performance ===");

let largeArray = Array.from({ length: 1000000 }, (_, i) => i);

console.time("for loop");
for (let i = 0; i < largeArray.length; i++) {
    // Process
}
console.timeEnd("for loop");

console.time("for...of");
for (let item of largeArray) {
    // Process
}
console.timeEnd("for...of");

console.time("forEach");
largeArray.forEach(item => {
    // Process
});
console.timeEnd("forEach");

// Infinite loop prevention
console.log("\n=== Safe Loop with Counter ===");

let counter = 0;
let maxIterations = 100;

while (true) {
    counter++;
    if (counter > maxIterations) {
        console.log("Max iterations reached, breaking loop");
        break;
    }
    if (counter === 5) {
        console.log("Found what we needed at iteration 5");
        break;
    }
}

/*
 * Sample Output:
 * === For Loop ===
 * Count: 1
 * Count: 2
 * Count: 3
 * Count: 4
 * Count: 5
 * 
 * === Loop through Array ===
 * 0: apple
 * 1: banana
 * 2: cherry
 * 3: date
 * 
 * === Nested Loops (Multiplication Table) ===
 * 1	2	3	4	5	
 * 2	4	6	8	10	
 * 3	6	9	12	15	
 * 4	8	12	16	20	
 * 5	10	15	20	25	
 * 
 * === While Loop ===
 * While count: 1
 * While count: 2
 * While count: 3
 * While count: 4
 * While count: 5
 * Sum reached 55 in 10 iterations
 * 
 * === Do-While Loop ===
 * Do-while count: 1
 * Do-while count: 2
 * Do-while count: 3
 * Do-while count: 4
 * Do-while count: 5
 * 
 * === Do-While (Executes at Least Once) ===
 * This runs even though condition is false
 * 
 * === For...of Loop (Array Values) ===
 * red
 * green
 * blue
 * 
 * === For...of with String ===
 * J
 * a
 * v
 * a
 * S
 * c
 * r
 * i
 * p
 * t
 * 
 * === For...in Loop (Object Properties) ===
 * name: John
 * age: 30
 * city: New York
 * 
 * === For...in with Array (indices) ===
 * Index 0: 10
 * Index 1: 20
 * Index 2: 30
 * Index 3: 40
 * 
 * === Break Statement ===
 * 1
 * 2
 * 3
 * 4
 * 5
 * Breaking at 6
 * First even number: 8
 * 
 * === Continue Statement ===
 * Odd number: 1
 * Odd number: 3
 * Odd number: 5
 * Odd number: 7
 * Odd number: 9
 * 
 * === Labeled Statements ===
 * i=1, j=1
 * i=1, j=2
 * i=1, j=3
 * i=2, j=1
 * Breaking outer loop
 * 
 * === Array forEach Method ===
 * 1. Paris
 * 2. London
 * 3. Tokyo
 * 
 * === Array map Method ===
 * Original: [ 10, 20, 30 ]
 * Discounted: [ 9, 18, 27 ]
 * 
 * === Array filter Method ===
 * All ages: [ 12, 18, 25, 30, 15, 22 ]
 * Adults (18+): [ 18, 25, 30, 22 ]
 * 
 * === Array reduce Method ===
 * Values: [ 1, 2, 3, 4, 5 ]
 * Sum: 15
 * 
 * === Loop Performance ===
 * for loop: 2.345ms
 * for...of: 8.123ms
 * forEach: 5.678ms
 * 
 * === Safe Loop with Counter ===
 * Found what we needed at iteration 5
 */
