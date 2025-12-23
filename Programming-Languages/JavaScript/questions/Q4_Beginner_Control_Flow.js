/*
 * Question 4 (Beginner): Control Flow (if, switch)
 * 
 * Write a JavaScript program that demonstrates:
 * - if, else if, else statements
 * - switch statements
 * - Conditional logic
 * 
 * Learning objectives:
 * - Use conditional statements
 * - Make decisions in code
 * - Understand control flow
 */

console.log("=== If-Else Statements ===");

// Basic if statement
let age = 20;
if (age >= 18) {
    console.log("You are an adult");
}

// If-else
let temperature = 25;
if (temperature > 30) {
    console.log("It's hot!");
} else {
    console.log("It's comfortable");
}

// If-else if-else
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}

// Nested if statements
console.log("\n=== Nested If Statements ===");

let isLoggedIn = true;
let isPremium = true;

if (isLoggedIn) {
    console.log("Welcome back!");
    if (isPremium) {
        console.log("You have premium access");
    } else {
        console.log("Upgrade to premium for more features");
    }
} else {
    console.log("Please log in");
}

// Multiple conditions
console.log("\n=== Multiple Conditions ===");

let username = "admin";
let password = "secret123";

if (username === "admin" && password === "secret123") {
    console.log("Login successful!");
} else {
    console.log("Invalid credentials");
}

let hour = 14;
if (hour < 12 || hour >= 18) {
    console.log("Restaurant offers special discount!");
}

// Truthy and Falsy values
console.log("\n=== Truthy and Falsy Values ===");

// Falsy values: false, 0, "", null, undefined, NaN
let values = [false, 0, "", null, undefined, NaN, "Hello", 42, [], {}];

values.forEach(val => {
    if (val) {
        console.log(`${JSON.stringify(val)} is truthy`);
    } else {
        console.log(`${JSON.stringify(val)} is falsy`);
    }
});

// Switch statements
console.log("\n=== Switch Statements ===");

let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(`Day ${day} is ${dayName}`);

// Switch with fall-through
console.log("\n=== Switch Fall-through ===");

let month = 2;
let season;

switch (month) {
    case 12:
    case 1:
    case 2:
        season = "Winter";
        break;
    case 3:
    case 4:
    case 5:
        season = "Spring";
        break;
    case 6:
    case 7:
    case 8:
        season = "Summer";
        break;
    case 9:
    case 10:
    case 11:
        season = "Fall";
        break;
    default:
        season = "Invalid month";
}

console.log(`Month ${month} is in ${season}`);

// Switch with expressions
console.log("\n=== Switch with Expressions ===");

let fruit = "apple";
let color;

switch (fruit.toLowerCase()) {
    case "apple":
    case "cherry":
        color = "red";
        break;
    case "banana":
        color = "yellow";
        break;
    case "grape":
        color = "purple";
        break;
    case "orange":
        color = "orange";
        break;
    default:
        color = "unknown";
}

console.log(`${fruit} is ${color}`);

// Guard clauses (early returns)
console.log("\n=== Guard Clauses ===");

function processPayment(amount, balance) {
    if (amount <= 0) {
        return "Invalid amount";
    }
    
    if (balance < amount) {
        return "Insufficient funds";
    }
    
    if (amount > 10000) {
        return "Amount exceeds daily limit";
    }
    
    return "Payment successful";
}

console.log(processPayment(50, 100));    // Payment successful
console.log(processPayment(-10, 100));   // Invalid amount
console.log(processPayment(200, 100));   // Insufficient funds
console.log(processPayment(15000, 20000)); // Exceeds limit

// Optional chaining and nullish coalescing
console.log("\n=== Optional Chaining ===");

let user = {
    name: "John",
    address: {
        city: "New York",
        zip: "10001"
    }
};

let user2 = {
    name: "Jane"
};

console.log(user?.address?.city);    // "New York"
console.log(user2?.address?.city);   // undefined
console.log(user2?.address?.city ?? "City not available");  // "City not available"

/*
 * Sample Output:
 * === If-Else Statements ===
 * You are an adult
 * It's comfortable
 * Grade: B
 * 
 * === Nested If Statements ===
 * Welcome back!
 * You have premium access
 * 
 * === Multiple Conditions ===
 * Login successful!
 * Restaurant offers special discount!
 * 
 * === Truthy and Falsy Values ===
 * false is falsy
 * 0 is falsy
 * "" is falsy
 * null is falsy
 * undefined is falsy
 * null is falsy
 * "Hello" is truthy
 * 42 is truthy
 * [] is truthy
 * {} is truthy
 * 
 * === Switch Statements ===
 * Day 3 is Wednesday
 * 
 * === Switch Fall-through ===
 * Month 2 is in Winter
 * 
 * === Switch with Expressions ===
 * apple is red
 * 
 * === Guard Clauses ===
 * Payment successful
 * Invalid amount
 * Insufficient funds
 * Amount exceeds daily limit
 * 
 * === Optional Chaining ===
 * New York
 * undefined
 * City not available
 */
