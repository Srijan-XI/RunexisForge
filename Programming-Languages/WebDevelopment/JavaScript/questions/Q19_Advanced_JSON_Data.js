/*
 * Question 19 (Advanced): JSON and Data Serialization
 * 
 * Write a JavaScript program that demonstrates:
 * - JSON.parse() and JSON.stringify()
 * - Working with JSON data
 * - Custom serialization with replacer/reviver
 * - Handling special values
 * - Deep cloning objects
 * 
 * Learning objectives:
 * - Work with JSON data format
 * - Serialize and deserialize JavaScript objects
 * - Handle data transfer and storage
 */

console.log("=== JSON Overview ===");

console.log("\n=== JSON.stringify() ===");

// Basic object
const person = {
    name: "John Doe",
    age: 30,
    city: "New York"
};

const jsonString = JSON.stringify(person);
console.log("JSON string:", jsonString);
console.log("Type:", typeof jsonString);

// Pretty print with indentation
const prettyJson = JSON.stringify(person, null, 2);
console.log("\nPretty JSON:");
console.log(prettyJson);

// Array
const colors = ["red", "green", "blue"];
console.log("\nArray as JSON:", JSON.stringify(colors));

// Nested objects
const company = {
    name: "TechCorp",
    employees: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ],
    address: {
        street: "123 Main St",
        city: "Boston"
    }
};

console.log("\nNested object:");
console.log(JSON.stringify(company, null, 2));

console.log("\n=== JSON.parse() ===");

// Parse JSON string
const jsonData = '{"name":"Jane","age":25,"city":"London"}';
const parsed = JSON.parse(jsonData);

console.log("Parsed object:", parsed);
console.log("Type:", typeof parsed);
console.log("Name:", parsed.name);
console.log("Age:", parsed.age);

// Parse array
const jsonArray = '["apple","banana","orange"]';
const parsedArray = JSON.parse(jsonArray);
console.log("\nParsed array:", parsedArray);
console.log("First item:", parsedArray[0]);

console.log("\n=== Special Values ===");

// Values that can be serialized
const validValues = {
    string: "text",
    number: 42,
    boolean: true,
    null: null,
    array: [1, 2, 3],
    object: { key: "value" }
};

console.log("Valid values:");
console.log(JSON.stringify(validValues, null, 2));

// Values that cannot be serialized (become null or are omitted)
const specialValues = {
    undefined: undefined,        // Omitted
    function: function() {},      // Omitted
    symbol: Symbol('test'),       // Omitted
    date: new Date(),             // Converted to string
    regex: /pattern/,             // Becomes {}
    nan: NaN,                     // Becomes null
    infinity: Infinity            // Becomes null
};

console.log("\nSpecial values:");
console.log(JSON.stringify(specialValues, null, 2));

console.log("\n=== Custom Serialization (Replacer) ===");

const userData = {
    username: "john_doe",
    password: "secret123",
    email: "john@example.com",
    age: 30
};

// Replacer function to filter properties
const filtered = JSON.stringify(userData, (key, value) => {
    if (key === 'password') {
        return undefined;  // Exclude password
    }
    return value;
}, 2);

console.log("Filtered (no password):");
console.log(filtered);

// Replacer array to include only specific properties
const selected = JSON.stringify(userData, ['username', 'email'], 2);
console.log("\nSelected properties:");
console.log(selected);

// Transform values
const transformed = JSON.stringify(userData, (key, value) => {
    if (key === 'age') {
        return value + 1;  // Increment age
    }
    if (typeof value === 'string') {
        return value.toUpperCase();  // Uppercase strings
    }
    return value;
}, 2);

console.log("\nTransformed:");
console.log(transformed);

console.log("\n=== Custom Deserialization (Reviver) ===");

// Date handling
const dateData = '{"name":"Event","date":"2024-01-15T10:30:00.000Z"}';

const withoutReviver = JSON.parse(dateData);
console.log("Without reviver:");
console.log("  Date type:", typeof withoutReviver.date);
console.log("  Date value:", withoutReviver.date);

const withReviver = JSON.parse(dateData, (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
});

console.log("\nWith reviver:");
console.log("  Date type:", typeof withReviver.date);
console.log("  Date value:", withReviver.date);

// Convert specific values
const numbersJson = '{"a":"1","b":"2","c":"text"}';
const converted = JSON.parse(numbersJson, (key, value) => {
    if (typeof value === 'string' && /^\d+$/.test(value)) {
        return parseInt(value);
    }
    return value;
});

console.log("\nConverted numbers:");
console.log(converted);

console.log("\n=== Deep Cloning ===");

const original = {
    name: "Original",
    nested: {
        value: 42,
        array: [1, 2, 3]
    }
};

// Deep clone using JSON
const clone = JSON.parse(JSON.stringify(original));

clone.name = "Clone";
clone.nested.value = 100;

console.log("Original:", original);
console.log("Clone:", clone);
console.log("Deep clone works:", original.nested.value === 42);

// Limitations
const withFunction = {
    name: "Object",
    method: function() { return "hello"; }
};

const clonedWithFunction = JSON.parse(JSON.stringify(withFunction));
console.log("\nCloning with function:");
console.log("  Original:", withFunction);
console.log("  Clone:", clonedWithFunction);
console.log("  Method lost:", !clonedWithFunction.method);

console.log("\n=== toJSON() Method ===");

class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.createdAt = new Date();
    }
    
    toJSON() {
        // Custom serialization
        return {
            name: this.name,
            createdAt: this.createdAt.toISOString()
            // password excluded
        };
    }
}

const user = new User("Alice", "secret");
console.log("User object:", user);
console.log("\nSerialized user:");
console.log(JSON.stringify(user, null, 2));

console.log("\n=== Handling Circular References ===");

// This would cause an error
// const circular = { name: "Circular" };
// circular.self = circular;
// JSON.stringify(circular);  // TypeError: Converting circular structure

// Solution: Use a WeakSet to track visited objects
function stringifyWithCircular(obj) {
    const seen = new WeakSet();
    
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    }, 2);
}

const circular = { name: "Circular" };
circular.self = circular;

console.log("Circular reference handled:");
console.log(stringifyWithCircular(circular));

console.log("\n=== Working with APIs ===");

// Simulated API response
const apiResponse = {
    status: 200,
    data: {
        users: [
            { id: 1, name: "Alice", active: true },
            { id: 2, name: "Bob", active: false }
        ],
        total: 2
    },
    timestamp: new Date().toISOString()
};

// Prepare for sending
const requestBody = JSON.stringify({
    action: "update",
    userId: 1,
    data: { active: true }
});

console.log("API request body:", requestBody);

// Parse response
const responseJson = JSON.stringify(apiResponse);
const parsedResponse = JSON.parse(responseJson);
console.log("\nParsed response:");
console.log("  Status:", parsedResponse.status);
console.log("  Users:", parsedResponse.data.users.length);

console.log("\n=== Local Storage Example ===");

// Simulate localStorage
const storage = {
    data: {},
    setItem(key, value) {
        this.data[key] = value;
    },
    getItem(key) {
        return this.data[key] || null;
    },
    removeItem(key) {
        delete this.data[key];
    }
};

// Store object
const settings = {
    theme: "dark",
    language: "en",
    notifications: true
};

storage.setItem('settings', JSON.stringify(settings));
console.log("Stored settings");

// Retrieve object
const retrieved = JSON.parse(storage.getItem('settings'));
console.log("Retrieved settings:", retrieved);

/*
 * In a real browser:
 * 
 * // Save to localStorage
 * localStorage.setItem('user', JSON.stringify(userObject));
 * 
 * // Load from localStorage
 * const user = JSON.parse(localStorage.getItem('user'));
 */

console.log("\n=== Practical Examples ===");

// Example 1: Data validation
function validateJSON(jsonString) {
    try {
        JSON.parse(jsonString);
        return { valid: true };
    } catch (error) {
        return { valid: false, error: error.message };
    }
}

console.log("Valid JSON:", validateJSON('{"key":"value"}'));
console.log("Invalid JSON:", validateJSON('{key:value}'));

// Example 2: Deep merge objects
function mergeObjects(target, source) {
    // Deep clone to avoid mutation
    const result = JSON.parse(JSON.stringify(target));
    
    for (const key in source) {
        result[key] = source[key];
    }
    
    return result;
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
console.log("\nMerged:", mergeObjects(obj1, obj2));

// Example 3: Data transformation
function transformData(data) {
    return JSON.parse(JSON.stringify(data), (key, value) => {
        // Convert all dates
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
            return new Date(value);
        }
        // Convert numeric strings
        if (typeof value === 'string' && /^\d+$/.test(value)) {
            return parseInt(value);
        }
        return value;
    });
}

const rawData = {
    date: "2024-01-15",
    count: "42",
    name: "Test"
};

console.log("\nTransformed data:", transformData(JSON.stringify(rawData)));

// Example 4: Compare objects
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const a = { x: 1, y: 2 };
const b = { x: 1, y: 2 };
const c = { x: 1, y: 3 };

console.log("\nDeep equal a === b:", deepEqual(a, b));
console.log("Deep equal a === c:", deepEqual(a, c));

// Example 5: Create snapshot
function createSnapshot(obj) {
    return {
        data: JSON.parse(JSON.stringify(obj)),
        timestamp: new Date().toISOString()
    };
}

const snapshot = createSnapshot({ count: 5, name: "Item" });
console.log("\nSnapshot:", snapshot);

console.log("\n=== Best Practices ===");

/*
 * 1. Always handle JSON.parse() errors
 * try {
 *     const data = JSON.parse(jsonString);
 * } catch (error) {
 *     console.error('Invalid JSON');
 * }
 * 
 * 2. Be aware of JSON limitations
 * - No functions, undefined, symbols
 * - Dates become strings
 * - No circular references
 * 
 * 3. Use replacer/reviver for custom handling
 * 
 * 4. Pretty print for debugging
 * JSON.stringify(obj, null, 2);
 * 
 * 5. Deep clone simple objects
 * const clone = JSON.parse(JSON.stringify(obj));
 * 
 * 6. Validate JSON before parsing
 * 
 * 7. Use toJSON() for custom serialization
 * 
 * 8. Store only serializable data in localStorage
 * 
 * 9. Consider alternatives for complex objects
 * - structuredClone() for better cloning
 * - Libraries like lodash for deep operations
 * 
 * 10. Minify JSON for production
 */

console.log("Best practices documented");

/*
 * Sample Output:
 * === JSON Overview ===
 * 
 * === JSON.stringify() ===
 * JSON string: {"name":"John Doe","age":30,"city":"New York"}
 * Type: string
 * 
 * Pretty JSON:
 * {
 *   "name": "John Doe",
 *   "age": 30,
 *   "city": "New York"
 * }
 * 
 * [Additional output continues...]
 */
