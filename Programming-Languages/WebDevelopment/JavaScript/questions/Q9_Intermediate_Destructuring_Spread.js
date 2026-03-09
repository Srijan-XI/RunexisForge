/*
 * Question 9 (Intermediate): ES6 Destructuring and Spread Operator
 * 
 * Write a JavaScript program that demonstrates:
 * - Array destructuring
 * - Object destructuring
 * - Nested destructuring
 * - Rest pattern
 * - Spread operator with arrays and objects
 * 
 * Learning objectives:
 * - Extract values from arrays and objects efficiently
 * - Use modern ES6+ syntax
 * - Understand rest and spread patterns
 */

console.log("=== Array Destructuring ===");

// Basic array destructuring
const colors = ["red", "green", "blue", "yellow"];
const [first, second] = colors;

console.log("First color:", first);
console.log("Second color:", second);

// Skip elements
const [primary, , tertiary] = colors;
console.log("Primary:", primary);
console.log("Tertiary:", tertiary);

// Rest pattern in arrays
const [main, ...others] = colors;
console.log("Main:", main);
console.log("Others:", others);

// Default values
const [a, b, c, d, e = "default"] = colors;
console.log("Fifth color (default):", e);

// Swapping variables
let x = 1, y = 2;
console.log("Before swap: x =", x, "y =", y);
[x, y] = [y, x];
console.log("After swap: x =", x, "y =", y);

// Destructuring function return values
function getCoordinates() {
    return [10, 20, 30];
}

const [xCoord, yCoord, zCoord] = getCoordinates();
console.log(`Coordinates: (${xCoord}, ${yCoord}, ${zCoord})`);

// Object Destructuring
console.log("\n=== Object Destructuring ===");

const person = {
    name: "Alice",
    age: 28,
    city: "New York",
    country: "USA"
};

// Basic object destructuring
const { name, age } = person;
console.log(`${name} is ${age} years old`);

// Rename variables
const { name: personName, city: location } = person;
console.log(`${personName} lives in ${location}`);

// Default values
const { occupation = "Developer" } = person;
console.log("Occupation:", occupation);

// Rest pattern in objects
const { name: userName, ...details } = person;
console.log("User name:", userName);
console.log("Details:", details);

// Nested Object Destructuring
console.log("\n=== Nested Destructuring ===");

const user = {
    id: 101,
    profile: {
        firstName: "Bob",
        lastName: "Smith",
        contact: {
            email: "bob@example.com",
            phone: "555-1234"
        }
    },
    settings: {
        theme: "dark",
        notifications: true
    }
};

// Deep destructuring
const {
    profile: {
        firstName,
        lastName,
        contact: { email, phone }
    },
    settings: { theme }
} = user;

console.log(`Name: ${firstName} ${lastName}`);
console.log(`Email: ${email}`);
console.log(`Theme: ${theme}`);

// Array of objects destructuring
console.log("\n=== Array of Objects ===");

const users = [
    { name: "Charlie", score: 85 },
    { name: "Diana", score: 92 },
    { name: "Eve", score: 78 }
];

// Destructuring in array methods
users.forEach(({ name, score }) => {
    console.log(`${name}: ${score}`);
});

// Destructuring in parameters
function greet({ name, age = 0 }) {
    console.log(`Hello, ${name}! Age: ${age}`);
}

greet({ name: "Frank" });
greet({ name: "Grace", age: 25 });

// Spread Operator with Arrays
console.log("\n=== Spread Operator - Arrays ===");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combining arrays
const combined = [...arr1, ...arr2];
console.log("Combined:", combined);

// Adding elements
const extended = [0, ...arr1, 3.5, ...arr2, 7];
console.log("Extended:", extended);

// Copying arrays
const copy = [...arr1];
console.log("Copy:", copy);
console.log("Is same reference?", copy === arr1);  // false

// Spread with Math functions
const numbers = [5, 1, 9, 3, 7];
console.log("Max:", Math.max(...numbers));
console.log("Min:", Math.min(...numbers));

// Spread in function calls
function sum(a, b, c) {
    return a + b + c;
}

const values = [10, 20, 30];
console.log("Sum:", sum(...values));

// Spread Operator with Objects
console.log("\n=== Spread Operator - Objects ===");

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Merging objects
const merged = { ...obj1, ...obj2 };
console.log("Merged:", merged);

// Overriding properties
const defaults = { theme: "light", fontSize: 14, showToolbar: true };
const userPrefs = { fontSize: 16, language: "en" };

const settings = { ...defaults, ...userPrefs };
console.log("Settings:", settings);

// Adding properties
const enhanced = { ...obj1, e: 5, f: 6 };
console.log("Enhanced:", enhanced);

// Shallow copy
const original = { x: 1, y: { z: 2 } };
const clone = { ...original };
clone.x = 10;
clone.y.z = 20;

console.log("Original:", original);  // y.z is also 20 (shallow copy)
console.log("Clone:", clone);

// Nested spread for deep copy
const deepOriginal = { x: 1, y: { z: 2 } };
const deepClone = { ...deepOriginal, y: { ...deepOriginal.y } };
deepClone.y.z = 30;

console.log("Deep original:", deepOriginal);  // y.z is still 2
console.log("Deep clone:", deepClone);

// Practical Examples
console.log("\n=== Practical Examples ===");

// Example 1: Function with multiple return values
function getStats(numbers) {
    return {
        count: numbers.length,
        sum: numbers.reduce((a, b) => a + b, 0),
        avg: numbers.reduce((a, b) => a + b, 0) / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers)
    };
}

const data = [10, 20, 30, 40, 50];
const { count, avg, max } = getStats(data);
console.log(`Count: ${count}, Average: ${avg}, Max: ${max}`);

// Example 2: Removing properties
const product = {
    id: 1,
    name: "Laptop",
    price: 999,
    internalCode: "XYZ123"
};

const { internalCode, ...publicProduct } = product;
console.log("Public product:", publicProduct);

// Example 3: Updating immutably
const state = {
    user: { name: "Helen", age: 30 },
    isLoggedIn: true
};

const newState = {
    ...state,
    user: { ...state.user, age: 31 }
};

console.log("Old state:", state);
console.log("New state:", newState);

// Example 4: Conditional properties
const includeOptional = true;
const config = {
    required: true,
    ...(includeOptional && { optional: "value" })
};

console.log("Config:", config);

// Example 5: Array manipulation
const originalArray = [1, 2, 3, 4, 5];

// Add to beginning
const addBeginning = [0, ...originalArray];
console.log("Add beginning:", addBeginning);

// Add to end
const addEnd = [...originalArray, 6];
console.log("Add end:", addEnd);

// Insert in middle
const insertMiddle = [...originalArray.slice(0, 2), 2.5, ...originalArray.slice(2)];
console.log("Insert middle:", insertMiddle);

// Remove element
const removeIndex = 2;
const removed = [...originalArray.slice(0, removeIndex), ...originalArray.slice(removeIndex + 1)];
console.log("Removed index 2:", removed);

// Example 6: Function parameter destructuring
function processOrder({
    id,
    items = [],
    shipping = { method: "standard", cost: 5 },
    discount = 0
}) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + shipping.cost - discount;
    
    return {
        orderId: id,
        itemCount: items.length,
        subtotal,
        shippingCost: shipping.cost,
        discount,
        total
    };
}

const order = {
    id: "ORD-001",
    items: [
        { name: "Book", price: 20 },
        { name: "Pen", price: 5 }
    ],
    discount: 3
};

const orderSummary = processOrder(order);
console.log("Order summary:", orderSummary);

// Example 7: Converting arguments to array
function logAll(...args) {
    console.log("Arguments:", args);
    console.log("Type:", Array.isArray(args));  // true
}

logAll(1, "hello", true, { x: 10 });

/*
 * Sample Output:
 * === Array Destructuring ===
 * First color: red
 * Second color: green
 * Primary: red
 * Tertiary: blue
 * Others: [ 'green', 'blue', 'yellow' ]
 * Fifth color (default): default
 * Before swap: x = 1 y = 2
 * After swap: x = 2 y = 1
 * Coordinates: (10, 20, 30)
 * 
 * === Object Destructuring ===
 * Alice is 28 years old
 * Alice lives in New York
 * Occupation: Developer
 * User name: Alice
 * Details: { age: 28, city: 'New York', country: 'USA' }
 * 
 * [Additional output continues...]
 */
