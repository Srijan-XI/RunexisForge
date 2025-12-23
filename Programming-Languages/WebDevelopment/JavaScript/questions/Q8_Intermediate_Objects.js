/*
 * Question 8 (Intermediate): Objects
 * 
 * Write a JavaScript program that demonstrates:
 * - Object creation and manipulation
 * - Object properties and methods
 * - Object destructuring
 * - Object methods (Object.keys, Object.values, Object.entries)
 * - this keyword
 * 
 * Learning objectives:
 * - Work with objects effectively
 * - Understand object-oriented concepts
 * - Use object methods and properties
 */

console.log("=== Object Creation ===");

// Object literal
const person = {
    name: "John Doe",
    age: 30,
    city: "New York"
};

console.log("Person:", person);

// Object with methods
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract(a, b) {  // Shorthand method syntax
        return a - b;
    },
    multiply: (a, b) => a * b
};

console.log("5 + 3 =", calculator.add(5, 3));
console.log("10 - 4 =", calculator.subtract(10, 4));
console.log("6 * 7 =", calculator.multiply(6, 7));

// Object constructor
const car = new Object();
car.brand = "Toyota";
car.model = "Camry";
car.year = 2023;

console.log("Car:", car);

// Constructor function
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function() {
        return `${this.title} by ${this.author} (${this.year})`;
    };
}

const book1 = new Book("1984", "George Orwell", 1949);
console.log("Book:", book1.getSummary());

// Accessing Properties
console.log("\n=== Accessing Properties ===");

console.log("Dot notation:", person.name);
console.log("Bracket notation:", person["age"]);

// Bracket notation with variable
const prop = "city";
console.log("Dynamic property:", person[prop]);

// Adding/Modifying Properties
console.log("\n=== Adding/Modifying Properties ===");

person.email = "john@example.com";
person.age = 31;

console.log("Updated person:", person);

// Deleting Properties
delete person.city;
console.log("After delete:", person);

// Nested Objects
console.log("\n=== Nested Objects ===");

const user = {
    id: 1,
    name: "Alice",
    address: {
        street: "123 Main St",
        city: "Boston",
        zip: "02101"
    },
    hobbies: ["reading", "coding", "gaming"]
};

console.log("User:", user);
console.log("City:", user.address.city);
console.log("First hobby:", user.hobbies[0]);

// Object.keys(), Object.values(), Object.entries()
console.log("\n=== Object Methods ===");

const product = {
    name: "Laptop",
    price: 999,
    category: "Electronics",
    inStock: true
};

console.log("Keys:", Object.keys(product));
console.log("Values:", Object.values(product));
console.log("Entries:", Object.entries(product));

// Iterate over object
console.log("\nIterating with for...in:");
for (let key in product) {
    console.log(`${key}: ${product[key]}`);
}

console.log("\nIterating with Object.entries:");
Object.entries(product).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Object.assign() - copy/merge objects
console.log("\n=== Object.assign() ===");

const defaults = { theme: "light", fontSize: 14 };
const userSettings = { fontSize: 16, showToolbar: true };

const settings = Object.assign({}, defaults, userSettings);
console.log("Merged settings:", settings);

// Spread operator (alternative to Object.assign)
const settings2 = { ...defaults, ...userSettings };
console.log("Using spread:", settings2);

// Object Destructuring
console.log("\n=== Object Destructuring ===");

const employee = {
    id: 101,
    name: "Bob Smith",
    department: "Engineering",
    salary: 75000
};

const { name, department } = employee;
console.log(`Name: ${name}, Department: ${department}`);

// Destructuring with different variable names
const { name: empName, salary: empSalary } = employee;
console.log(`${empName} earns $${empSalary}`);

// Destructuring with default values
const { position = "Developer" } = employee;
console.log("Position:", position);

// Nested destructuring
const company = {
    name: "TechCorp",
    address: {
        city: "San Francisco",
        state: "CA"
    }
};

const { address: { city, state } } = company;
console.log(`Location: ${city}, ${state}`);

// this keyword
console.log("\n=== this Keyword ===");

const person2 = {
    firstName: "Jane",
    lastName: "Doe",
    fullName: function() {
        return `${this.firstName} ${this.lastName}`;
    },
    // Arrow function doesn't have its own 'this'
    fullNameArrow: () => {
        return `${this.firstName} ${this.lastName}`;  // Won't work as expected
    }
};

console.log("Full name:", person2.fullName());
console.log("Arrow function:", person2.fullNameArrow());  // undefined undefined

// Object.freeze() - prevent modifications
console.log("\n=== Object.freeze() ===");

const config = Object.freeze({
    apiKey: "abc123",
    endpoint: "https://api.example.com"
});

console.log("Config:", config);
config.apiKey = "xyz789";  // This won't work (silent fail in non-strict mode)
console.log("After attempt to modify:", config);

// Object.seal() - prevent adding/removing properties
console.log("\n=== Object.seal() ===");

const options = Object.seal({
    color: "blue",
    size: "medium"
});

options.color = "red";  // This works
options.price = 100;    // This won't work (can't add new property)
console.log("Sealed object:", options);

// Object.hasOwnProperty()
console.log("\n=== hasOwnProperty() ===");

console.log("product has 'name':", product.hasOwnProperty('name'));
console.log("product has 'toString':", product.hasOwnProperty('toString'));

// in operator
console.log("'name' in product:", 'name' in product);
console.log("'toString' in product:", 'toString' in product);  // true (inherited)

// Optional chaining
console.log("\n=== Optional Chaining ===");

const customer = {
    name: "Charlie",
    address: {
        city: "Seattle"
    }
};

const customer2 = {
    name: "Dave"
};

console.log("City 1:", customer?.address?.city);
console.log("City 2:", customer2?.address?.city);  // undefined instead of error
console.log("With default:", customer2?.address?.city ?? "No city");

// Getters and Setters
console.log("\n=== Getters and Setters ===");

const rectangle = {
    width: 10,
    height: 5,
    get area() {
        return this.width * this.height;
    },
    set dimensions({ width, height }) {
        this.width = width;
        this.height = height;
    }
};

console.log("Area:", rectangle.area);
rectangle.dimensions = { width: 20, height: 10 };
console.log("New area:", rectangle.area);

// Computed property names
console.log("\n=== Computed Property Names ===");

const propName = "dynamicKey";
const obj = {
    [propName]: "dynamicValue",
    ["key" + "2"]: "value2"
};

console.log("Dynamic object:", obj);

// Object methods chaining
console.log("\n=== Method Chaining ===");

const counter = {
    value: 0,
    increment() {
        this.value++;
        return this;
    },
    decrement() {
        this.value--;
        return this;
    },
    reset() {
        this.value = 0;
        return this;
    },
    getValue() {
        return this.value;
    }
};

const result = counter.increment().increment().increment().decrement().getValue();
console.log("Chain result:", result);

// Comparing objects
console.log("\n=== Comparing Objects ===");

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = obj1;

console.log("obj1 == obj2:", obj1 == obj2);    // false (different references)
console.log("obj1 === obj2:", obj1 === obj2);  // false
console.log("obj1 === obj3:", obj1 === obj3);  // true (same reference)

// Deep comparison function
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log("Deep equal:", deepEqual(obj1, obj2));  // true

/*
 * Sample Output:
 * === Object Creation ===
 * Person: { name: 'John Doe', age: 30, city: 'New York' }
 * 5 + 3 = 8
 * 10 - 4 = 6
 * 6 * 7 = 42
 * Car: { brand: 'Toyota', model: 'Camry', year: 2023 }
 * Book: 1984 by George Orwell (1949)
 * 
 * === Accessing Properties ===
 * Dot notation: John Doe
 * Bracket notation: 30
 * Dynamic property: New York
 * 
 * === Adding/Modifying Properties ===
 * Updated person: { name: 'John Doe', age: 31, city: 'New York', email: 'john@example.com' }
 * After delete: { name: 'John Doe', age: 31, email: 'john@example.com' }
 * 
 * [Additional output continues...]
 */
