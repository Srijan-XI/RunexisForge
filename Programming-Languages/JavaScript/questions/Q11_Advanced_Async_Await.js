/*
 * Question 11 (Advanced): Async/Await
 * 
 * Write a JavaScript program that demonstrates:
 * - async functions
 * - await keyword
 * - Error handling with try/catch
 * - Parallel execution with async/await
 * - Async function patterns
 * 
 * Learning objectives:
 * - Write cleaner asynchronous code
 * - Handle async operations effectively
 * - Understand async/await vs promises
 */

console.log("=== Basic Async/Await ===");

// Simple async function
async function greet() {
    return "Hello, World!";
}

// Async functions always return a promise
greet().then(message => console.log(message));

// Using await
async function fetchData() {
    const data = await Promise.resolve("Fetched data");
    console.log(data);
}

fetchData();

// Helper function for delays
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// Sequential execution
async function sequentialDemo() {
    console.log("\n=== Sequential Execution ===");
    
    console.log("Start");
    
    const result1 = await delay(500, "First");
    console.log(result1);
    
    const result2 = await delay(500, "Second");
    console.log(result2);
    
    const result3 = await delay(500, "Third");
    console.log(result3);
    
    console.log("End");
}

sequentialDemo();

// Parallel execution
async function parallelDemo() {
    console.log("\n=== Parallel Execution ===");
    
    console.log("Start");
    
    // Start all promises at once
    const promise1 = delay(500, "First");
    const promise2 = delay(500, "Second");
    const promise3 = delay(500, "Third");
    
    // Wait for all
    const results = await Promise.all([promise1, promise2, promise3]);
    console.log("Results:", results);
    
    console.log("End");
}

setTimeout(() => parallelDemo(), 2000);

// Error Handling
console.log("\n=== Error Handling ===");

async function riskyOperation(shouldFail) {
    if (shouldFail) {
        throw new Error("Operation failed!");
    }
    return "Success!";
}

// Using try/catch
async function handleErrors() {
    try {
        const result = await riskyOperation(false);
        console.log("Result:", result);
        
        const result2 = await riskyOperation(true);
        console.log("Result2:", result2);  // Won't execute
    } catch (error) {
        console.error("Caught error:", error.message);
    } finally {
        console.log("Cleanup completed");
    }
}

setTimeout(() => handleErrors(), 3000);

// Multiple try/catch blocks
async function multipleTryCatch() {
    try {
        const data1 = await riskyOperation(false);
        console.log("Data 1:", data1);
    } catch (error) {
        console.error("Error in block 1:", error.message);
    }
    
    try {
        const data2 = await riskyOperation(true);
        console.log("Data 2:", data2);
    } catch (error) {
        console.error("Error in block 2:", error.message);
    }
    
    console.log("Function continues...");
}

setTimeout(() => multipleTryCatch(), 4000);

// Simulating API calls
async function apiDemo() {
    console.log("\n=== API Demo ===");
    
    function fetchUser(id) {
        return delay(300, { id, name: `User ${id}` });
    }
    
    function fetchPosts(userId) {
        return delay(300, [
            { id: 1, title: "Post 1", userId },
            { id: 2, title: "Post 2", userId }
        ]);
    }
    
    function fetchComments(postId) {
        return delay(300, [
            { id: 1, text: "Comment 1", postId },
            { id: 2, text: "Comment 2", postId }
        ]);
    }
    
    try {
        // Sequential calls
        const user = await fetchUser(1);
        console.log("User:", user);
        
        const posts = await fetchPosts(user.id);
        console.log("Posts count:", posts.length);
        
        const comments = await fetchComments(posts[0].id);
        console.log("Comments count:", comments.length);
    } catch (error) {
        console.error("API error:", error);
    }
}

setTimeout(() => apiDemo(), 5000);

// Parallel API calls
async function parallelAPI() {
    console.log("\n=== Parallel API Calls ===");
    
    function fetchResource(name, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Fetched ${name}`);
                resolve({ name, data: `Data for ${name}` });
            }, delay);
        });
    }
    
    try {
        // Start all requests simultaneously
        const [users, products, orders] = await Promise.all([
            fetchResource("users", 500),
            fetchResource("products", 300),
            fetchResource("orders", 400)
        ]);
        
        console.log("All resources fetched");
        console.log("Users:", users.name);
        console.log("Products:", products.name);
        console.log("Orders:", orders.name);
    } catch (error) {
        console.error("Parallel error:", error);
    }
}

setTimeout(() => parallelAPI(), 7000);

// Async iteration
async function asyncIteration() {
    console.log("\n=== Async Iteration ===");
    
    const urls = ["url1", "url2", "url3"];
    
    // Sequential
    console.log("Sequential:");
    for (const url of urls) {
        const data = await delay(200, `Data from ${url}`);
        console.log(data);
    }
    
    // Parallel with map
    console.log("\nParallel with map:");
    const results = await Promise.all(
        urls.map(url => delay(200, `Data from ${url}`))
    );
    results.forEach(result => console.log(result));
}

setTimeout(() => asyncIteration(), 9000);

// Error handling patterns
async function errorPatterns() {
    console.log("\n=== Error Handling Patterns ===");
    
    // Pattern 1: Catch and return default
    async function fetchWithDefault(id) {
        try {
            if (id < 0) throw new Error("Invalid ID");
            return await delay(100, { id, name: "User" });
        } catch (error) {
            console.log("Using default:", error.message);
            return { id: 0, name: "Guest" };
        }
    }
    
    const user1 = await fetchWithDefault(1);
    const user2 = await fetchWithDefault(-1);
    console.log("User 1:", user1);
    console.log("User 2:", user2);
    
    // Pattern 2: Catch and rethrow
    async function fetchWithRethrow(id) {
        try {
            if (id < 0) throw new Error("Invalid ID");
            return await delay(100, { id, name: "User" });
        } catch (error) {
            console.error("Rethrowing:", error.message);
            throw new Error(`Failed to fetch user ${id}`);
        }
    }
    
    try {
        await fetchWithRethrow(-1);
    } catch (error) {
        console.log("Caught rethrown:", error.message);
    }
    
    // Pattern 3: Promise-style catch
    const result = await fetchWithDefault(2).catch(error => {
        console.log("Caught in .catch:", error.message);
        return null;
    });
    console.log("Result with .catch:", result);
}

setTimeout(() => errorPatterns(), 11000);

// Retry logic with async/await
async function retryLogic() {
    console.log("\n=== Retry Logic ===");
    
    async function fetchWithRetry(fn, retries = 3, delayMs = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                console.log(`Attempt ${i + 1} failed: ${error.message}`);
                if (i < retries - 1) {
                    console.log(`Retrying in ${delayMs}ms...`);
                    await delay(delayMs);
                } else {
                    throw error;
                }
            }
        }
    }
    
    let attemptCount = 0;
    async function unreliableAPI() {
        attemptCount++;
        if (attemptCount < 3) {
            throw new Error("API temporarily unavailable");
        }
        return "API Success!";
    }
    
    try {
        const result = await fetchWithRetry(unreliableAPI, 3, 500);
        console.log("Final result:", result);
    } catch (error) {
        console.error("All retries failed:", error.message);
    }
}

setTimeout(() => retryLogic(), 13000);

// Timeout with async/await
async function timeoutDemo() {
    console.log("\n=== Timeout Demo ===");
    
    function withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), timeoutMs)
            )
        ]);
    }
    
    async function slowOperation() {
        await delay(2000);
        return "Slow result";
    }
    
    try {
        const result = await withTimeout(slowOperation(), 1000);
        console.log("Result:", result);
    } catch (error) {
        console.log("Timeout error:", error.message);
    }
}

setTimeout(() => timeoutDemo(), 15000);

// Async IIFE (Immediately Invoked Function Expression)
console.log("\n=== Async IIFE ===");

(async () => {
    console.log("Async IIFE start");
    await delay(500);
    console.log("Async IIFE end");
})();

// Practical Examples
setTimeout(async () => {
    console.log("\n=== Practical Examples ===");
    
    // Example 1: Data transformation pipeline
    async function processPipeline(data) {
        // Step 1: Validate
        await delay(100);
        if (!data) throw new Error("No data");
        
        // Step 2: Transform
        await delay(100);
        const transformed = data.map(x => x * 2);
        
        // Step 3: Aggregate
        await delay(100);
        const sum = transformed.reduce((a, b) => a + b, 0);
        
        return { original: data, transformed, sum };
    }
    
    try {
        const result = await processPipeline([1, 2, 3, 4, 5]);
        console.log("Pipeline result:", result);
    } catch (error) {
        console.error("Pipeline error:", error.message);
    }
    
    // Example 2: Rate limiting
    async function rateLimitedRequests(urls, maxConcurrent = 2) {
        const results = [];
        const executing = [];
        
        for (const url of urls) {
            const promise = delay(500, `Data from ${url}`).then(result => {
                results.push(result);
                executing.splice(executing.indexOf(promise), 1);
            });
            
            executing.push(promise);
            
            if (executing.length >= maxConcurrent) {
                await Promise.race(executing);
            }
        }
        
        await Promise.all(executing);
        return results;
    }
    
    const urls = ["url1", "url2", "url3", "url4", "url5"];
    console.log("Rate limited requests starting...");
    const rateLimitedResults = await rateLimitedRequests(urls);
    console.log("Rate limited results:", rateLimitedResults);
    
    // Example 3: Conditional async execution
    async function conditionalExecution(condition) {
        if (condition) {
            const data = await delay(200, "Condition met");
            return data;
        }
        return "Condition not met";
    }
    
    const result1 = await conditionalExecution(true);
    const result2 = await conditionalExecution(false);
    console.log("Conditional 1:", result1);
    console.log("Conditional 2:", result2);
    
}, 17000);

/*
 * Sample Output:
 * === Basic Async/Await ===
 * Hello, World!
 * Fetched data
 * 
 * === Sequential Execution ===
 * Start
 * First
 * Second
 * Third
 * End
 * 
 * === Parallel Execution ===
 * Start
 * Results: [ 'First', 'Second', 'Third' ]
 * End
 * 
 * === Error Handling ===
 * Result: Success!
 * Caught error: Operation failed!
 * Cleanup completed
 * 
 * [Additional output continues...]
 */
