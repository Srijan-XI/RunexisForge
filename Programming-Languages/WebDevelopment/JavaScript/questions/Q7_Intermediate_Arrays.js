/*
 * Question 7 (Intermediate): Arrays
 * 
 * Write a JavaScript program that demonstrates:
 * - Array creation and manipulation
 * - Array methods (push, pop, shift, unshift, slice, splice)
 * - Array iteration methods (map, filter, reduce, forEach)
 * - Array searching and sorting
 * 
 * Learning objectives:
 * - Work with arrays effectively
 * - Use array methods
 * - Transform and filter data
 */

console.log("=== Array Creation ===");

// Different ways to create arrays
const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(5);  // Array with 5 empty slots
const arr3 = Array.of(1, 2, 3);
const arr4 = Array.from("hello");  // ['h', 'e', 'l', 'l', 'o']
const arr5 = Array.from({ length: 5 }, (_, i) => i + 1);  // [1, 2, 3, 4, 5]

console.log("arr1:", arr1);
console.log("arr2 length:", arr2.length);
console.log("arr3:", arr3);
console.log("arr4:", arr4);
console.log("arr5:", arr5);

// Array with mixed types
const mixed = [1, "hello", true, null, { name: "John" }, [1, 2, 3]];
console.log("Mixed array:", mixed);

// Basic Array Operations
console.log("\n=== Basic Array Operations ===");

let fruits = ["apple", "banana"];

// push - add to end
fruits.push("cherry");
console.log("After push:", fruits);

// pop - remove from end
const removed = fruits.pop();
console.log(`Popped: ${removed}, Array:`, fruits);

// unshift - add to beginning
fruits.unshift("mango");
console.log("After unshift:", fruits);

// shift - remove from beginning
const shifted = fruits.shift();
console.log(`Shifted: ${shifted}, Array:`, fruits);

// Array Access and Modification
console.log("\n=== Array Access ===");

const numbers = [10, 20, 30, 40, 50];
console.log("Array:", numbers);
console.log("First element:", numbers[0]);
console.log("Last element:", numbers[numbers.length - 1]);
console.log("Element at index 2:", numbers[2]);

// Modify elements
numbers[1] = 25;
console.log("After modification:", numbers);

// slice - extract portion (doesn't modify original)
console.log("\n=== slice Method ===");

const colors = ["red", "green", "blue", "yellow", "purple"];
console.log("Original:", colors);
console.log("Slice(1, 3):", colors.slice(1, 3));  // ['green', 'blue']
console.log("Slice(2):", colors.slice(2));  // ['blue', 'yellow', 'purple']
console.log("Slice(-2):", colors.slice(-2));  // ['yellow', 'purple']
console.log("Original unchanged:", colors);

// splice - add/remove elements (modifies original)
console.log("\n=== splice Method ===");

let animals = ["cat", "dog", "elephant", "giraffe"];
console.log("Original:", animals);

// Remove 2 elements starting at index 1
const removedAnimals = animals.splice(1, 2);
console.log("Removed:", removedAnimals);
console.log("After removal:", animals);

// Add elements at index 1
animals.splice(1, 0, "lion", "tiger");
console.log("After adding:", animals);

// Replace element at index 2
animals.splice(2, 1, "bear");
console.log("After replacing:", animals);

// concat - merge arrays
console.log("\n=== concat Method ===");

const arr6 = [1, 2, 3];
const arr7 = [4, 5, 6];
const merged = arr6.concat(arr7);
console.log("Merged:", merged);
console.log("Using spread:", [...arr6, ...arr7]);

// join - create string from array
console.log("\n=== join Method ===");

const words = ["Hello", "World", "from", "JavaScript"];
console.log("Joined with space:", words.join(" "));
console.log("Joined with dash:", words.join("-"));
console.log("Joined with nothing:", words.join(""));

// reverse - reverse array order
console.log("\n=== reverse Method ===");

const nums = [1, 2, 3, 4, 5];
console.log("Original:", nums);
nums.reverse();
console.log("Reversed:", nums);

// sort - sort array
console.log("\n=== sort Method ===");

const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Original:", unsorted);
unsorted.sort();
console.log("Sorted (default):", unsorted);

// Custom sort (for numbers)
const nums2 = [100, 23, 45, 7, 89, 34];
nums2.sort((a, b) => a - b);  // Ascending
console.log("Sorted ascending:", nums2);

nums2.sort((a, b) => b - a);  // Descending
console.log("Sorted descending:", nums2);

// Sort strings
const names = ["Charlie", "Alice", "Bob", "David"];
names.sort();
console.log("Names sorted:", names);

// Array Iteration Methods
console.log("\n=== forEach Method ===");

const cities = ["Paris", "London", "Tokyo"];
cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});

// map - transform each element
console.log("\n=== map Method ===");

const prices = [10, 20, 30, 40];
const doubled = prices.map(price => price * 2);
console.log("Original:", prices);
console.log("Doubled:", doubled);

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];
const userNames = users.map(user => user.name);
console.log("User names:", userNames);

// filter - select elements that match condition
console.log("\n=== filter Method ===");

const ages = [12, 18, 25, 30, 15, 22, 45];
const adults = ages.filter(age => age >= 18);
console.log("All ages:", ages);
console.log("Adults:", adults);

const products = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 },
    { name: "Monitor", price: 300 }
];
const expensive = products.filter(product => product.price > 100);
console.log("Expensive products:", expensive);

// reduce - accumulate values
console.log("\n=== reduce Method ===");

const values = [1, 2, 3, 4, 5];
const sum = values.reduce((total, num) => total + num, 0);
console.log("Values:", values);
console.log("Sum:", sum);

const cart = [
    { item: "Book", price: 20 },
    { item: "Pen", price: 5 },
    { item: "Notebook", price: 10 }
];
const totalPrice = cart.reduce((total, item) => total + item.price, 0);
console.log("Total cart price:", totalPrice);

// find - find first matching element
console.log("\n=== find Method ===");

const people = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];
const found = people.find(person => person.id === 2);
console.log("Found:", found);

// findIndex - find index of first matching element
const index = people.findIndex(person => person.name === "Charlie");
console.log("Index of Charlie:", index);

// some - check if at least one element matches
console.log("\n=== some Method ===");

const scores = [45, 67, 89, 23, 91];
const hasHighScore = scores.some(score => score > 90);
console.log("Has score > 90:", hasHighScore);

// every - check if all elements match
console.log("\n=== every Method ===");

const grades = [85, 90, 92, 88, 95];
const allPassed = grades.every(grade => grade >= 60);
console.log("All passed (>= 60):", allPassed);

// includes - check if array contains element
console.log("\n=== includes Method ===");

const letters = ['a', 'b', 'c', 'd'];
console.log("Contains 'c':", letters.includes('c'));
console.log("Contains 'z':", letters.includes('z'));

// indexOf, lastIndexOf
console.log("\n=== indexOf Method ===");

const repeated = [1, 2, 3, 2, 4, 2, 5];
console.log("Array:", repeated);
console.log("First index of 2:", repeated.indexOf(2));
console.log("Last index of 2:", repeated.lastIndexOf(2));
console.log("Index of 10:", repeated.indexOf(10));  // -1 (not found)

// flat - flatten nested arrays
console.log("\n=== flat Method ===");

const nested = [1, [2, 3], [4, [5, 6]]];
console.log("Nested:", nested);
console.log("Flat (1 level):", nested.flat());
console.log("Flat (2 levels):", nested.flat(2));

// flatMap - map then flat
console.log("\n=== flatMap Method ===");

const sentences = ["Hello world", "How are you"];
const words2 = sentences.flatMap(sentence => sentence.split(" "));
console.log("Words:", words2);

// Array destructuring
console.log("\n=== Array Destructuring ===");

const coords = [10, 20, 30];
const [x, y, z] = coords;
console.log(`x=${x}, y=${y}, z=${z}`);

// With rest operator
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log("First:", first);
console.log("Rest:", rest);

/*
 * Sample Output:
 * === Array Creation ===
 * arr1: [ 1, 2, 3, 4, 5 ]
 * arr2 length: 5
 * arr3: [ 1, 2, 3 ]
 * arr4: [ 'h', 'e', 'l', 'l', 'o' ]
 * arr5: [ 1, 2, 3, 4, 5 ]
 * Mixed array: [ 1, 'hello', true, null, { name: 'John' }, [ 1, 2, 3 ] ]
 * 
 * === Basic Array Operations ===
 * After push: [ 'apple', 'banana', 'cherry' ]
 * Popped: cherry, Array: [ 'apple', 'banana' ]
 * After unshift: [ 'mango', 'apple', 'banana' ]
 * Shifted: mango, Array: [ 'apple', 'banana' ]
 * 
 * === Array Access ===
 * Array: [ 10, 20, 30, 40, 50 ]
 * First element: 10
 * Last element: 50
 * Element at index 2: 30
 * After modification: [ 10, 25, 30, 40, 50 ]
 * 
 * === slice Method ===
 * Original: [ 'red', 'green', 'blue', 'yellow', 'purple' ]
 * Slice(1, 3): [ 'green', 'blue' ]
 * Slice(2): [ 'blue', 'yellow', 'purple' ]
 * Slice(-2): [ 'yellow', 'purple' ]
 * Original unchanged: [ 'red', 'green', 'blue', 'yellow', 'purple' ]
 * 
 * === splice Method ===
 * Original: [ 'cat', 'dog', 'elephant', 'giraffe' ]
 * Removed: [ 'dog', 'elephant' ]
 * After removal: [ 'cat', 'giraffe' ]
 * After adding: [ 'cat', 'lion', 'tiger', 'giraffe' ]
 * After replacing: [ 'cat', 'lion', 'bear', 'giraffe' ]
 * 
 * [Additional output continues...]
 */
