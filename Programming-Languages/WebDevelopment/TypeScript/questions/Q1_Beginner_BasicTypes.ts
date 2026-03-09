// Question 1 (Beginner): Basic Types and Variables
// Create variables with proper type annotations for:
// - A person's name (string)
// - Their age (number)
// - Whether they are a student (boolean)
// - An array of their hobbies (string array)
// - A tuple representing coordinates [latitude, longitude] (number tuple)

// Solution:
let name: string = "Alice Johnson";
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "coding", "hiking"];
let coordinates: [number, number] = [40.7128, -74.0060];

// Display the values
console.log(`Name: ${name}`);
console.log(`Age: ${age}`);
console.log(`Is Student: ${isStudent}`);
console.log(`Hobbies: ${hobbies.join(", ")}`);
console.log(`Coordinates: [${coordinates[0]}, ${coordinates[1]}]`);

// Type inference (TypeScript can infer types)
let city = "New York"; // TypeScript infers: string
let population = 8_336_817; // TypeScript infers: number
let isCapital = false; // TypeScript infers: boolean
