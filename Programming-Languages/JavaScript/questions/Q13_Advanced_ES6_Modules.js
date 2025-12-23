/*
 * Question 13 (Advanced): ES6 Modules
 * 
 * Write a JavaScript program that demonstrates:
 * - Export and import syntax
 * - Named exports
 * - Default exports
 * - Importing everything
 * - Re-exporting modules
 * 
 * Learning objectives:
 * - Organize code with modules
 * - Understand ES6 module system
 * - Use import/export effectively
 * 
 * Note: This example demonstrates module syntax.
 * In a real project, these would be separate files.
 */

console.log("=== ES6 Modules Overview ===");

/*
 * Module System Basics:
 * 
 * 1. Named Exports (can have multiple per file):
 *    export const name = "value";
 *    export function myFunction() {}
 *    export { var1, var2 };
 * 
 * 2. Default Export (one per file):
 *    export default function() {}
 *    export default class MyClass {}
 * 
 * 3. Import Statements:
 *    import { name1, name2 } from './module.js';
 *    import defaultExport from './module.js';
 *    import * as moduleName from './module.js';
 *    import { name as alias } from './module.js';
 */

// Example: math.js module
console.log("\n=== math.js Module ===");

const mathModule = {
    // Named exports
    PI: 3.14159,
    E: 2.71828,
    
    add: function(a, b) {
        return a + b;
    },
    
    subtract: function(a, b) {
        return a - b;
    },
    
    multiply: function(a, b) {
        return a * b;
    },
    
    divide: function(a, b) {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
};

console.log("math.add(5, 3):", mathModule.add(5, 3));
console.log("math.PI:", mathModule.PI);

/*
 * In a real file (math.js):
 * 
 * export const PI = 3.14159;
 * export const E = 2.71828;
 * 
 * export function add(a, b) {
 *     return a + b;
 * }
 * 
 * export function subtract(a, b) {
 *     return a - b;
 * }
 * 
 * // Or export all at once:
 * export { PI, E, add, subtract, multiply, divide };
 */

/*
 * Importing from math.js:
 * 
 * import { add, subtract, PI } from './math.js';
 * import { add as sum, subtract as diff } from './math.js';
 * import * as math from './math.js';
 */

// Example: user.js module (with default export)
console.log("\n=== user.js Module (Default Export) ===");

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static validateEmail(email) {
        return email.includes('@');
    }
}

const user = new User("Alice", "alice@example.com");
console.log(user.greet());
console.log("Valid email?", User.validateEmail("alice@example.com"));

/*
 * In a real file (user.js):
 * 
 * export default class User {
 *     constructor(name, email) {
 *         this.name = name;
 *         this.email = email;
 *     }
 *     
 *     greet() {
 *         return `Hello, I'm ${this.name}`;
 *     }
 * }
 * 
 * // Or:
 * class User { ... }
 * export default User;
 */

/*
 * Importing default export:
 * 
 * import User from './user.js';
 * import MyUser from './user.js';  // Can use any name
 */

// Example: utils.js (mixed exports)
console.log("\n=== utils.js Module (Mixed Exports) ===");

const utilsModule = {
    // Named exports
    capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    reverse: function(str) {
        return str.split('').reverse().join('');
    },
    
    // Default export
    default: function formatDate(date) {
        return date.toISOString().split('T')[0];
    },
    
    VERSION: "1.0.0"
};

console.log("capitalize('hello'):", utilsModule.capitalize('hello'));
console.log("reverse('world'):", utilsModule.reverse('world'));
console.log("formatDate:", utilsModule.default(new Date()));

/*
 * In a real file (utils.js):
 * 
 * export function capitalize(str) {
 *     return str.charAt(0).toUpperCase() + str.slice(1);
 * }
 * 
 * export function reverse(str) {
 *     return str.split('').reverse().join('');
 * }
 * 
 * export const VERSION = "1.0.0";
 * 
 * export default function formatDate(date) {
 *     return date.toISOString().split('T')[0];
 * }
 */

/*
 * Importing mixed exports:
 * 
 * import formatDate, { capitalize, reverse, VERSION } from './utils.js';
 */

// Example: Import everything
console.log("\n=== Import Everything (*) ===");

/*
 * import * as utils from './utils.js';
 * 
 * console.log(utils.capitalize('hello'));
 * console.log(utils.reverse('world'));
 * console.log(utils.default(new Date()));
 * console.log(utils.VERSION);
 */

// Example: Re-exporting
console.log("\n=== Re-exporting Modules ===");

/*
 * In a file (index.js or barrel file):
 * 
 * // Re-export everything from multiple modules
 * export * from './math.js';
 * export * from './string-utils.js';
 * export { default as User } from './user.js';
 * 
 * // Or selective re-export
 * export { add, subtract } from './math.js';
 * export { capitalize } from './utils.js';
 * 
 * // Then import from index:
 * import { add, capitalize, User } from './index.js';
 */

// Example: Dynamic imports
console.log("\n=== Dynamic Imports ===");

async function loadModule() {
    /*
     * Dynamic import (returns a promise):
     * 
     * const module = await import('./math.js');
     * console.log(module.add(5, 3));
     * 
     * // Or with then:
     * import('./math.js')
     *     .then(module => {
     *         console.log(module.add(5, 3));
     *     })
     *     .catch(err => {
     *         console.error('Failed to load module:', err);
     *     });
     */
    
    console.log("Dynamic import example (simulated)");
    console.log("Used for code splitting and lazy loading");
}

loadModule();

// Practical Module Structure
console.log("\n=== Practical Module Structure ===");

/*
 * File: src/api/users.js
 * 
 * const API_URL = 'https://api.example.com';
 * 
 * export async function fetchUsers() {
 *     const response = await fetch(`${API_URL}/users`);
 *     return response.json();
 * }
 * 
 * export async function fetchUser(id) {
 *     const response = await fetch(`${API_URL}/users/${id}`);
 *     return response.json();
 * }
 * 
 * export async function createUser(userData) {
 *     const response = await fetch(`${API_URL}/users`, {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify(userData)
 *     });
 *     return response.json();
 * }
 */

/*
 * File: src/api/index.js
 * 
 * export * from './users.js';
 * export * from './products.js';
 * export * from './orders.js';
 */

/*
 * File: src/app.js
 * 
 * import { fetchUsers, fetchUser, createUser } from './api/index.js';
 * 
 * async function init() {
 *     const users = await fetchUsers();
 *     console.log(users);
 * }
 */

// Module Pattern (without ES6 modules)
console.log("\n=== Classic Module Pattern ===");

const CounterModule = (function() {
    // Private variables
    let count = 0;
    
    // Private function
    function log(message) {
        console.log(`[Counter] ${message}`);
    }
    
    // Public API
    return {
        increment() {
            count++;
            log(`Incremented to ${count}`);
            return count;
        },
        
        decrement() {
            count--;
            log(`Decremented to ${count}`);
            return count;
        },
        
        getCount() {
            return count;
        },
        
        reset() {
            count = 0;
            log('Reset to 0');
        }
    };
})();

CounterModule.increment();
CounterModule.increment();
console.log("Current count:", CounterModule.getCount());
CounterModule.reset();

// Revealing Module Pattern
console.log("\n=== Revealing Module Pattern ===");

const Calculator = (function() {
    // Private variables and functions
    const PI = 3.14159;
    
    function square(x) {
        return x * x;
    }
    
    function circleArea(radius) {
        return PI * square(radius);
    }
    
    function circleCircumference(radius) {
        return 2 * PI * radius;
    }
    
    // Reveal public API
    return {
        square,
        circleArea,
        circleCircumference,
        PI
    };
})();

console.log("Square of 5:", Calculator.square(5));
console.log("Circle area (r=3):", Calculator.circleArea(3));
console.log("PI:", Calculator.PI);

// CommonJS vs ES6 Modules
console.log("\n=== CommonJS vs ES6 Modules ===");

/*
 * CommonJS (Node.js):
 * 
 * // Exporting
 * module.exports = function() { ... };
 * module.exports.add = function(a, b) { return a + b; };
 * exports.subtract = function(a, b) { return a - b; };
 * 
 * // Importing
 * const math = require('./math');
 * const { add, subtract } = require('./math');
 * 
 * 
 * ES6 Modules:
 * 
 * // Exporting
 * export default function() { ... }
 * export function add(a, b) { return a + b; }
 * 
 * // Importing
 * import math from './math.js';
 * import { add, subtract } from './math.js';
 * 
 * Key differences:
 * - ES6 modules are static (analyzed at compile time)
 * - CommonJS is dynamic (evaluated at runtime)
 * - ES6 has better tree-shaking for bundlers
 * - CommonJS uses require/module.exports
 * - ES6 uses import/export
 */

// Best Practices
console.log("\n=== Module Best Practices ===");

/*
 * 1. One module per file
 * 2. Use named exports for utilities, default for main class/function
 * 3. Keep modules focused (Single Responsibility Principle)
 * 4. Avoid circular dependencies
 * 5. Use barrel files (index.js) to group related modules
 * 6. Use consistent naming conventions
 * 7. Document module APIs
 * 
 * Example structure:
 * 
 * src/
 *   components/
 *     Button.js
 *     Input.js
 *     index.js (re-exports)
 *   utils/
 *     string.js
 *     array.js
 *     index.js (re-exports)
 *   api/
 *     users.js
 *     products.js
 *     index.js (re-exports)
 *   app.js
 */

console.log("\n=== Example: Feature Module ===");

// Feature module example (simulated)
const TodoModule = (function() {
    // State
    const todos = [];
    let nextId = 1;
    
    // Private helpers
    function findTodoById(id) {
        return todos.find(todo => todo.id === id);
    }
    
    // Public API
    return {
        addTodo(text) {
            const todo = { id: nextId++, text, completed: false };
            todos.push(todo);
            return todo;
        },
        
        removeTodo(id) {
            const index = todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                return todos.splice(index, 1)[0];
            }
            return null;
        },
        
        toggleTodo(id) {
            const todo = findTodoById(id);
            if (todo) {
                todo.completed = !todo.completed;
                return todo;
            }
            return null;
        },
        
        getTodos() {
            return [...todos];
        },
        
        getCompletedTodos() {
            return todos.filter(todo => todo.completed);
        },
        
        getPendingTodos() {
            return todos.filter(todo => !todo.completed);
        }
    };
})();

const todo1 = TodoModule.addTodo("Learn JavaScript");
const todo2 = TodoModule.addTodo("Build a project");
console.log("All todos:", TodoModule.getTodos());

TodoModule.toggleTodo(todo1.id);
console.log("Completed:", TodoModule.getCompletedTodos());
console.log("Pending:", TodoModule.getPendingTodos());

/*
 * Sample Output:
 * === ES6 Modules Overview ===
 * 
 * === math.js Module ===
 * math.add(5, 3): 8
 * math.PI: 3.14159
 * 
 * === user.js Module (Default Export) ===
 * Hello, I'm Alice
 * Valid email? true
 * 
 * === utils.js Module (Mixed Exports) ===
 * capitalize('hello'): Hello
 * reverse('world'): dlrow
 * formatDate: 2024-01-15
 * 
 * [Additional output continues...]
 */
