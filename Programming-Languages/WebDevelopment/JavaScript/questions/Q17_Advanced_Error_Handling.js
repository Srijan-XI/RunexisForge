/*
 * Question 17 (Advanced): Error Handling and Debugging
 * 
 * Write a JavaScript program that demonstrates:
 * - try/catch/finally blocks
 * - Throwing custom errors
 * - Error types and properties
 * - Async error handling
 * - Debugging techniques
 * 
 * Learning objectives:
 * - Handle errors gracefully
 * - Create custom error classes
 * - Debug JavaScript code effectively
 */

console.log("=== Error Handling Overview ===");

console.log("\n=== Try/Catch/Finally ===");

try {
    console.log("Try block executing");
    throw new Error("Something went wrong!");
    console.log("This won't execute");
} catch (error) {
    console.log("Catch block executing");
    console.log("Error message:", error.message);
} finally {
    console.log("Finally block always executes");
}

// Without error
try {
    console.log("\nNo error case");
    const result = 10 / 2;
    console.log("Result:", result);
} catch (error) {
    console.log("Won't execute");
} finally {
    console.log("Finally executes even without error");
}

console.log("\n=== Error Types ===");

// SyntaxError (caught during parsing)
try {
    eval('const x = ;');  // Invalid syntax
} catch (error) {
    console.log("SyntaxError:", error.message);
    console.log("Error name:", error.name);
}

// ReferenceError
try {
    console.log(nonExistentVariable);
} catch (error) {
    console.log("ReferenceError:", error.message);
}

// TypeError
try {
    null.toString();
} catch (error) {
    console.log("TypeError:", error.message);
}

// RangeError
try {
    const arr = new Array(-1);
} catch (error) {
    console.log("RangeError:", error.message);
}

// URIError
try {
    decodeURIComponent('%');
} catch (error) {
    console.log("URIError:", error.message);
}

console.log("\n=== Error Properties ===");

try {
    throw new Error("Test error");
} catch (error) {
    console.log("name:", error.name);
    console.log("message:", error.message);
    console.log("stack:", error.stack?.substring(0, 100) + "...");
}

console.log("\n=== Throwing Errors ===");

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Arguments must be numbers");
    }
    
    if (b === 0) {
        throw new Error("Division by zero");
    }
    
    return a / b;
}

try {
    console.log("10 / 2 =", divide(10, 2));
    console.log("10 / 0 =", divide(10, 0));
} catch (error) {
    console.log("Error caught:", error.message);
}

try {
    divide("10", 2);
} catch (error) {
    console.log("Type error:", error.message);
}

console.log("\n=== Custom Error Classes ===");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class DatabaseError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "DatabaseError";
        this.code = code;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

function validateUser(user) {
    if (!user.name) {
        throw new ValidationError("Name is required");
    }
    
    if (!user.email || !user.email.includes('@')) {
        throw new ValidationError("Valid email is required");
    }
    
    return true;
}

try {
    validateUser({ name: "John" });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Validation failed:", error.message);
    } else {
        console.log("Unknown error:", error);
    }
}

try {
    validateUser({ name: "John", email: "john@example.com" });
    console.log("Validation passed");
} catch (error) {
    console.log("Error:", error.message);
}

console.log("\n=== Error Handling Patterns ===");

// Pattern 1: Early return
function processUser(user) {
    if (!user) {
        console.log("Error: User is null");
        return null;
    }
    
    if (!user.id) {
        console.log("Error: User ID missing");
        return null;
    }
    
    console.log("Processing user:", user.id);
    return { processed: true, userId: user.id };
}

processUser(null);
processUser({ name: "Alice" });
processUser({ id: 1, name: "Bob" });

// Pattern 2: Result object
function safeDivide(a, b) {
    if (b === 0) {
        return { success: false, error: "Division by zero" };
    }
    
    return { success: true, result: a / b };
}

const result1 = safeDivide(10, 2);
if (result1.success) {
    console.log("Result:", result1.result);
} else {
    console.log("Error:", result1.error);
}

const result2 = safeDivide(10, 0);
if (result2.success) {
    console.log("Result:", result2.result);
} else {
    console.log("Error:", result2.error);
}

// Pattern 3: Error-first callbacks (Node.js style)
function readFile(filename, callback) {
    setTimeout(() => {
        if (!filename) {
            callback(new Error("Filename required"), null);
        } else {
            callback(null, `Content of ${filename}`);
        }
    }, 100);
}

readFile("test.txt", (error, data) => {
    if (error) {
        console.log("Callback error:", error.message);
    } else {
        console.log("File data:", data);
    }
});

readFile(null, (error, data) => {
    if (error) {
        console.log("Callback error:", error.message);
    } else {
        console.log("File data:", data);
    }
});

console.log("\n=== Async Error Handling ===");

// Async/await with try/catch
async function fetchUserData(userId) {
    try {
        if (!userId) {
            throw new Error("User ID required");
        }
        
        // Simulated async operation
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (userId < 0) {
            throw new Error("Invalid user ID");
        }
        
        return { id: userId, name: `User ${userId}` };
    } catch (error) {
        console.log("Async error:", error.message);
        throw error;  // Re-throw if needed
    }
}

setTimeout(async () => {
    try {
        const user = await fetchUserData(1);
        console.log("User fetched:", user);
    } catch (error) {
        console.log("Failed to fetch user");
    }
    
    try {
        await fetchUserData(-1);
    } catch (error) {
        console.log("Expected error caught");
    }
}, 300);

// Promise error handling
function asyncOperation(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Operation failed"));
            } else {
                resolve("Success");
            }
        }, 100);
    });
}

asyncOperation(false)
    .then(result => console.log("Promise result:", result))
    .catch(error => console.log("Promise error:", error.message));

asyncOperation(true)
    .then(result => console.log("Won't execute:", result))
    .catch(error => console.log("Promise error caught:", error.message))
    .finally(() => console.log("Promise cleanup"));

console.log("\n=== Debugging Techniques ===");

// console methods
console.log("Regular log");
console.error("Error message");
console.warn("Warning message");
console.info("Info message");

console.table([
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 }
]);

console.group("Grouped logs");
console.log("Item 1");
console.log("Item 2");
console.groupEnd();

// Timing
console.time("Operation");
for (let i = 0; i < 1000000; i++) {
    // Some operation
}
console.timeEnd("Operation");

// Assertions
console.assert(5 > 10, "5 is not greater than 10");
console.assert(10 > 5, "This assertion passes (no output)");

// Stack trace
function a() { b(); }
function b() { c(); }
function c() { console.trace("Stack trace from c()"); }

setTimeout(() => a(), 500);

/*
 * In a real browser:
 * 
 * // Breakpoints in DevTools
 * debugger;  // Execution pauses here
 * 
 * // Conditional breakpoints
 * if (user.id === 5) {
 *     debugger;
 * }
 * 
 * // Network monitoring in DevTools Network tab
 * 
 * // Performance profiling
 * console.profile('My Profile');
 * // ... code to profile
 * console.profileEnd('My Profile');
 */

console.log("\n=== Error Boundaries (React-like concept) ===");

class ErrorBoundary {
    constructor() {
        this.hasError = false;
        this.error = null;
    }
    
    try(fn) {
        try {
            this.hasError = false;
            this.error = null;
            return fn();
        } catch (error) {
            this.hasError = true;
            this.error = error;
            console.log("Error caught by boundary:", error.message);
            return null;
        }
    }
    
    getError() {
        return this.error;
    }
}

const boundary = new ErrorBoundary();

boundary.try(() => {
    throw new Error("Component error");
});

if (boundary.hasError) {
    console.log("Error boundary has error:", boundary.getError().message);
}

console.log("\n=== Global Error Handling ===");

/*
 * In a browser:
 * 
 * // Catch unhandled errors
 * window.onerror = function(message, source, lineno, colno, error) {
 *     console.error('Global error:', message);
 *     // Log to error tracking service
 *     return true;  // Prevent default error handling
 * };
 * 
 * // Catch unhandled promise rejections
 * window.addEventListener('unhandledrejection', event => {
 *     console.error('Unhandled rejection:', event.reason);
 *     event.preventDefault();
 * });
 * 
 * In Node.js:
 * 
 * process.on('uncaughtException', (error) => {
 *     console.error('Uncaught exception:', error);
 *     process.exit(1);
 * });
 * 
 * process.on('unhandledRejection', (reason, promise) => {
 *     console.error('Unhandled rejection:', reason);
 * });
 */

console.log("Global error handling documented");

console.log("\n=== Best Practices ===");

/*
 * 1. Always handle errors
 * - Use try/catch for sync code
 * - Use .catch() or try/catch with async/await
 * 
 * 2. Provide meaningful error messages
 * throw new Error('User with ID 123 not found');
 * 
 * 3. Use custom error classes
 * class ApiError extends Error { ... }
 * 
 * 4. Don't catch errors you can't handle
 * - Let them bubble up to a handler that can
 * 
 * 5. Clean up resources in finally
 * try {
 *     const file = openFile();
 * } finally {
 *     file.close();  // Always executes
 * }
 * 
 * 6. Log errors appropriately
 * - Development: console.error with stack trace
 * - Production: Send to error tracking service
 * 
 * 7. Validate input early
 * function process(data) {
 *     if (!data) throw new Error('Data required');
 *     // ... rest of function
 * }
 * 
 * 8. Use type checking (TypeScript)
 * 
 * 9. Handle async errors
 * async function getData() {
 *     try {
 *         const data = await fetch(url);
 *         return data.json();
 *     } catch (error) {
 *         // Handle error
 *     }
 * }
 * 
 * 10. Test error cases
 * - Write tests for error scenarios
 * - Verify error messages and types
 */

console.log("Best practices documented");

/*
 * Sample Output:
 * === Error Handling Overview ===
 * 
 * === Try/Catch/Finally ===
 * Try block executing
 * Catch block executing
 * Error message: Something went wrong!
 * Finally block always executes
 * 
 * No error case
 * Result: 5
 * Finally executes even without error
 * 
 * [Additional output continues...]
 */
