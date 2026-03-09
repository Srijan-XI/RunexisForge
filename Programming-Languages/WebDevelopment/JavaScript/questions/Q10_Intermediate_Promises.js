/*
 * Question 10 (Intermediate): Promises
 * 
 * Write a JavaScript program that demonstrates:
 * - Creating promises
 * - Handling promises with then/catch/finally
 * - Promise chaining
 * - Promise.all(), Promise.race(), Promise.allSettled()
 * - Error handling with promises
 * 
 * Learning objectives:
 * - Understand asynchronous programming
 * - Work with promises effectively
 * - Handle async operations and errors
 */

console.log("=== Creating Promises ===");

// Basic promise creation
const simplePromise = new Promise((resolve, reject) => {
    const success = true;
    
    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed!");
    }
});

simplePromise
    .then(result => console.log("Result:", result))
    .catch(error => console.log("Error:", error));

// Simulating async operation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Starting delay...");
delay(1000).then(() => console.log("Delay completed!"));

// Promise with data
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 500);
    });
}

console.log("\n=== Promise Handling ===");

// Using then/catch
fetchUser(1)
    .then(user => {
        console.log("User fetched:", user);
        return user.name;
    })
    .then(name => {
        console.log("User name:", name);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });

// Using finally
fetchUser(2)
    .then(user => console.log("Success:", user.name))
    .catch(error => console.error("Error:", error.message))
    .finally(() => console.log("Request completed"));

// Promise Chaining
console.log("\n=== Promise Chaining ===");

function getUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: "Alice" });
        }, 300);
    });
}

function getUserPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "First Post", userId },
                { id: 2, title: "Second Post", userId }
            ]);
        }, 300);
    });
}

function getPostComments(postId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!", postId },
                { id: 2, text: "Thanks for sharing", postId }
            ]);
        }, 300);
    });
}

// Chain multiple async operations
getUser(1)
    .then(user => {
        console.log("Got user:", user.name);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Got posts:", posts.length);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Got comments:", comments.length);
    })
    .catch(error => {
        console.error("Chain error:", error);
    });

// Promise.all() - wait for all promises
console.log("\n=== Promise.all() ===");

const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All results:", results);
        const sum = results.reduce((a, b) => a + b, 0);
        console.log("Sum:", sum);
    });

// Multiple async operations
function fetchData(id, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, data: `Data ${id}` });
        }, delay);
    });
}

const dataPromises = [
    fetchData(1, 300),
    fetchData(2, 200),
    fetchData(3, 400)
];

Promise.all(dataPromises)
    .then(results => {
        console.log("All data fetched:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

// Promise.race() - first to complete wins
console.log("\n=== Promise.race() ===");

const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 500));

Promise.race([fast, slow])
    .then(winner => console.log("Winner:", winner));

// Timeout implementation using race
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
}

const slowOperation = new Promise(resolve => {
    setTimeout(() => resolve("Completed"), 2000);
});

withTimeout(slowOperation, 1000)
    .then(result => console.log("Result:", result))
    .catch(error => console.log("Timeout error:", error.message));

// Promise.allSettled() - wait for all, regardless of success/failure
console.log("\n=== Promise.allSettled() ===");

const promises = [
    Promise.resolve("Success 1"),
    Promise.reject("Error 1"),
    Promise.resolve("Success 2"),
    Promise.reject("Error 2")
];

Promise.allSettled(promises)
    .then(results => {
        console.log("All settled:");
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`  ${index}: ✓ ${result.value}`);
            } else {
                console.log(`  ${index}: ✗ ${result.reason}`);
            }
        });
    });

// Promise.any() - first successful promise
console.log("\n=== Promise.any() ===");

const p1 = Promise.reject("Error A");
const p2 = new Promise(resolve => setTimeout(() => resolve("Success B"), 200));
const p3 = new Promise(resolve => setTimeout(() => resolve("Success C"), 100));

Promise.any([p1, p2, p3])
    .then(result => console.log("First success:", result))
    .catch(error => console.log("All failed:", error));

// Error Handling
console.log("\n=== Error Handling ===");

function riskyOperation(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Operation failed"));
            } else {
                resolve("Operation succeeded");
            }
        }, 100);
    });
}

// Catch errors in chain
riskyOperation(false)
    .then(result => {
        console.log("Step 1:", result);
        return riskyOperation(true);  // This will fail
    })
    .then(result => {
        console.log("Step 2:", result);  // Won't execute
    })
    .catch(error => {
        console.error("Caught error:", error.message);
        return "Recovered";  // Continue chain
    })
    .then(result => {
        console.log("After recovery:", result);
    });

// Practical Examples
console.log("\n=== Practical Examples ===");

// Example 1: Loading multiple resources
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const timeout = Math.random() * 1000 + 500;
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ url, loaded: true });
            } else {
                reject(new Error(`Failed to load ${url}`));
            }
        }, timeout);
    });
}

const imageUrls = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
];

console.log("Loading images...");
Promise.all(imageUrls.map(url => loadImage(url)))
    .then(images => {
        console.log("All images loaded:", images.length);
    })
    .catch(error => {
        console.error("Image loading failed:", error.message);
    });

// Example 2: Retry logic
function fetchWithRetry(fn, retries = 3) {
    return fn().catch(error => {
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            return fetchWithRetry(fn, retries - 1);
        }
        throw error;
    });
}

let attempts = 0;
function unreliableAPI() {
    return new Promise((resolve, reject) => {
        attempts++;
        setTimeout(() => {
            if (attempts < 3) {
                reject(new Error("API failed"));
            } else {
                resolve("API success!");
            }
        }, 100);
    });
}

fetchWithRetry(unreliableAPI)
    .then(result => console.log("Retry result:", result))
    .catch(error => console.error("All retries failed:", error.message));

// Example 3: Sequential execution
function sequentialPromises(promises) {
    return promises.reduce((chain, currentPromise) => {
        return chain.then(results => {
            return currentPromise().then(result => [...results, result]);
        });
    }, Promise.resolve([]));
}

const tasks = [
    () => delay(100).then(() => "Task 1"),
    () => delay(50).then(() => "Task 2"),
    () => delay(150).then(() => "Task 3")
];

console.log("Sequential execution:");
sequentialPromises(tasks)
    .then(results => console.log("Sequential results:", results));

// Example 4: Promise wrapper for callbacks
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    };
}

// Simulating a callback-based function
function oldStyleAsync(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback(new Error("Invalid value"));
        }
    }, 100);
}

const promisified = promisify(oldStyleAsync);

promisified(5)
    .then(result => console.log("Promisified result:", result))
    .catch(error => console.error("Promisified error:", error));

/*
 * Sample Output:
 * === Creating Promises ===
 * Result: Operation successful!
 * Starting delay...
 * Delay completed!
 * 
 * === Promise Handling ===
 * User fetched: { id: 1, name: 'User 1', email: 'user1@example.com' }
 * User name: User 1
 * Success: User 2
 * Request completed
 * 
 * === Promise Chaining ===
 * Got user: Alice
 * Got posts: 2
 * Got comments: 2
 * 
 * [Additional output continues...]
 */
