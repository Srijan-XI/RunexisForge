/*
 * Question 22 (Expert): Closures and Scope
 * 
 * Write a JavaScript program that demonstrates:
 * - Lexical scope
 * - Closures and their uses
 * - Function scope vs block scope
 * - The module pattern with closures
 * - Practical closure applications
 * 
 * Learning objectives:
 * - Understand JavaScript scope mechanisms
 * - Master closures for data encapsulation
 * - Apply closures in real-world scenarios
 */

console.log("=== Closures and Scope Overview ===");

console.log("\n=== Lexical Scope ===");

const globalVar = 'global';

function outerFunction() {
    const outerVar = 'outer';
    
    function innerFunction() {
        const innerVar = 'inner';
        
        console.log('globalVar:', globalVar);  // Accessible
        console.log('outerVar:', outerVar);    // Accessible
        console.log('innerVar:', innerVar);    // Accessible
    }
    
    innerFunction();
    // console.log(innerVar);  // Error: not accessible
}

outerFunction();

console.log("\n=== Basic Closure ===");

function createCounter() {
    let count = 0;  // Private variable
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log("Count:", counter());  // 1
console.log("Count:", counter());  // 2
console.log("Count:", counter());  // 3

// Each counter is independent
const counter2 = createCounter();
console.log("Counter2:", counter2());  // 1

console.log("\n=== Closure with Multiple Functions ===");

function createPerson(name) {
    let age = 0;
    
    return {
        getName() {
            return name;
        },
        getAge() {
            return age;
        },
        setAge(newAge) {
            if (newAge >= 0) {
                age = newAge;
            }
        },
        birthday() {
            age++;
            console.log(`Happy birthday ${name}! Now ${age} years old.`);
        }
    };
}

const person = createPerson('Alice');
console.log("Name:", person.getName());
person.setAge(25);
console.log("Age:", person.getAge());
person.birthday();

console.log("\n=== Function Scope vs Block Scope ===");

// var: function scope
function varScope() {
    if (true) {
        var x = 10;
    }
    console.log('var x:', x);  // Accessible
}
varScope();

// let/const: block scope
function letScope() {
    if (true) {
        let y = 20;
        const z = 30;
        console.log('Inside block - let y:', y);
        console.log('Inside block - const z:', z);
    }
    // console.log(y);  // Error: not accessible
    // console.log(z);  // Error: not accessible
}
letScope();

// Loop with var vs let
console.log("\nLoop with var:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var i:', i), 10);
}  // Prints 3, 3, 3

console.log("\nLoop with let:");
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let j:', j), 50);
}  // Prints 0, 1, 2

console.log("\n=== Closure in Loops ===");

// Problem: Creating closures in loops with var
function createFunctions() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push(function() {
            return i;
        });
    }
    
    return functions;
}

const funcs = createFunctions();
console.log("Problem - all return 3:");
funcs.forEach((fn, idx) => console.log(`  Function ${idx}:`, fn()));

// Solution 1: Using let
function createFunctionsFixed1() {
    const functions = [];
    
    for (let i = 0; i < 3; i++) {
        functions.push(function() {
            return i;
        });
    }
    
    return functions;
}

const funcs1 = createFunctionsFixed1();
console.log("\nSolution 1 - using let:");
funcs1.forEach((fn, idx) => console.log(`  Function ${idx}:`, fn()));

// Solution 2: Using IIFE
function createFunctionsFixed2() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push((function(index) {
            return function() {
                return index;
            };
        })(i));
    }
    
    return functions;
}

const funcs2 = createFunctionsFixed2();
console.log("\nSolution 2 - using IIFE:");
funcs2.forEach((fn, idx) => console.log(`  Function ${idx}:`, fn()));

console.log("\n=== Private Variables with Closures ===");

function BankAccount(initialBalance) {
    let balance = initialBalance;
    const transactions = [];
    
    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                transactions.push({ type: 'deposit', amount, balance });
                console.log(`Deposited $${amount}. Balance: $${balance}`);
            }
        },
        
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                transactions.push({ type: 'withdraw', amount, balance });
                console.log(`Withdrew $${amount}. Balance: $${balance}`);
            } else {
                console.log('Insufficient funds');
            }
        },
        
        getBalance() {
            return balance;
        },
        
        getTransactions() {
            return [...transactions];  // Return copy
        }
    };
}

const account = BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log("Final balance:", account.getBalance());
console.log("Transactions:", account.getTransactions().length);
// console.log(account.balance);  // undefined (private)

console.log("\n=== Memoization with Closures ===");

function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log(`Cache hit for ${key}`);
            return cache[key];
        }
        
        console.log(`Computing for ${key}`);
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log("Result:", memoizedFib(5));
console.log("Result:", memoizedFib(5));  // Cache hit
console.log("Result:", memoizedFib(6));

console.log("\n=== Function Factories ===");

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));
console.log("Quadruple 5:", quadruple(5));

// Power function factory
function createPower(exponent) {
    return function(base) {
        return Math.pow(base, exponent);
    };
}

const square = createPower(2);
const cube = createPower(3);

console.log("\nSquare of 4:", square(4));
console.log("Cube of 3:", cube(3));

console.log("\n=== Partial Application ===");

function multiply(a, b, c) {
    return a * b * c;
}

function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

const multiplyBy2 = partial(multiply, 2);
console.log("2 * 3 * 4 =", multiplyBy2(3, 4));

const multiplyBy2And3 = partial(multiply, 2, 3);
console.log("2 * 3 * 5 =", multiplyBy2And3(5));

console.log("\n=== Currying ===");

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        
        return function(...moreArgs) {
            return curried(...args, ...moreArgs);
        };
    };
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log("curriedAdd(1)(2)(3):", curriedAdd(1)(2)(3));
console.log("curriedAdd(1, 2)(3):", curriedAdd(1, 2)(3));
console.log("curriedAdd(1)(2, 3):", curriedAdd(1)(2, 3));

const add10 = curriedAdd(10);
console.log("add10(5)(3):", add10(5)(3));

console.log("\n=== Event Handlers with Closures ===");

function createButton(label) {
    let clickCount = 0;
    
    return {
        click() {
            clickCount++;
            console.log(`${label} clicked ${clickCount} time(s)`);
        },
        
        getClickCount() {
            return clickCount;
        },
        
        reset() {
            clickCount = 0;
            console.log(`${label} click count reset`);
        }
    };
}

const submitButton = createButton('Submit');
const cancelButton = createButton('Cancel');

submitButton.click();
submitButton.click();
cancelButton.click();

console.log("Submit clicks:", submitButton.getClickCount());
console.log("Cancel clicks:", cancelButton.getClickCount());

console.log("\n=== Module Pattern with Closures ===");

const ShoppingCart = (function() {
    // Private variables
    let items = [];
    let discount = 0;
    
    // Private functions
    function calculateTotal() {
        const subtotal = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        return subtotal * (1 - discount);
    }
    
    function findItem(id) {
        return items.find(item => item.id === id);
    }
    
    // Public API
    return {
        addItem(item) {
            const existing = findItem(item.id);
            
            if (existing) {
                existing.quantity++;
            } else {
                items.push({ ...item, quantity: 1 });
            }
            
            console.log(`Added ${item.name} to cart`);
        },
        
        removeItem(id) {
            items = items.filter(item => item.id !== id);
            console.log(`Removed item ${id} from cart`);
        },
        
        setDiscount(percentage) {
            if (percentage >= 0 && percentage <= 1) {
                discount = percentage;
                console.log(`Discount set to ${percentage * 100}%`);
            }
        },
        
        getTotal() {
            return calculateTotal();
        },
        
        getItemCount() {
            return items.length;
        },
        
        clear() {
            items = [];
            discount = 0;
            console.log("Cart cleared");
        }
    };
})();

ShoppingCart.addItem({ id: 1, name: 'Laptop', price: 999 });
ShoppingCart.addItem({ id: 2, name: 'Mouse', price: 25 });
ShoppingCart.setDiscount(0.1);
console.log("Total:", ShoppingCart.getTotal());

console.log("\n=== Stateful Functions ===");

function createSequence(start = 0, step = 1) {
    let current = start;
    
    return {
        next() {
            const value = current;
            current += step;
            return value;
        },
        
        current() {
            return current;
        },
        
        reset() {
            current = start;
        }
    };
}

const sequence = createSequence(1, 2);
console.log("Next:", sequence.next());  // 1
console.log("Next:", sequence.next());  // 3
console.log("Next:", sequence.next());  // 5
console.log("Current:", sequence.current());  // 7
sequence.reset();
console.log("After reset:", sequence.next());  // 1

console.log("\n=== setTimeout with Closures ===");

function delayedGreeting(name, delay) {
    setTimeout(function() {
        console.log(`Hello, ${name}!`);
    }, delay);
}

console.log("Setting up delayed greetings...");
delayedGreeting('Alice', 100);
delayedGreeting('Bob', 200);
delayedGreeting('Charlie', 300);

console.log("\n=== Best Practices ===");

/*
 * Closure Best Practices:
 * 
 * 1. Use closures for data privacy
 * function createSecret() {
 *     const secret = 'private';
 *     return () => secret;
 * }
 * 
 * 2. Avoid memory leaks
 * - Don't create unnecessary closures in loops
 * - Clean up event listeners
 * - Clear intervals/timeouts
 * 
 * 3. Use let/const instead of var
 * - Block scope prevents common pitfalls
 * 
 * 4. Prefer modules for organization
 * - Better than global closures
 * 
 * 5. Use closures for:
 * - Data encapsulation
 * - Function factories
 * - Callbacks with state
 * - Memoization
 * - Partial application
 * 
 * 6. Be aware of performance
 * - Closures have memory cost
 * - Each closure maintains references
 * 
 * 7. Document closure intent
 * - Make private data explicit
 * 
 * 8. Test closure edge cases
 * - Verify state persistence
 * - Check for memory leaks
 */

console.log("Best practices documented");

/*
 * Sample Output:
 * === Closures and Scope Overview ===
 * 
 * === Lexical Scope ===
 * globalVar: global
 * outerVar: outer
 * innerVar: inner
 * 
 * === Basic Closure ===
 * Count: 1
 * Count: 2
 * Count: 3
 * Counter2: 1
 * 
 * [Additional output continues...]
 */
