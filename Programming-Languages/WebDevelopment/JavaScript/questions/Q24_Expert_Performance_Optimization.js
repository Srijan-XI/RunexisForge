/*
 * Question 24 (Expert): Performance Optimization
 * 
 * Write a JavaScript program that demonstrates:
 * - Debouncing and throttling
 * - Memoization
 * - Lazy loading
 * - Code splitting concepts
 * - Memory management
 * - Performance measurement
 * 
 * Learning objectives:
 * - Optimize JavaScript performance
 * - Reduce unnecessary computations
 * - Manage resources efficiently
 */

console.log("=== Performance Optimization Overview ===");

console.log("\n=== Debouncing ===");

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Simulated search function
function search(query) {
    console.log(`Searching for: ${query}`);
}

const debouncedSearch = debounce(search, 300);

// Simulated rapid typing
console.log("Simulating rapid typing...");
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
debouncedSearch('appl');
debouncedSearch('apple');

setTimeout(() => {
    console.log("Only last search executed after 300ms delay");
}, 500);

/*
 * Use cases for debouncing:
 * - Search input (wait for user to stop typing)
 * - Window resize events
 * - Form validation
 * - Autosave
 */

setTimeout(() => {
    console.log("\n=== Throttling ===");
    
    function throttle(func, limit) {
        let inThrottle;
        
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    }
    
    // Simulated scroll handler
    function handleScroll(position) {
        console.log(`Scroll position: ${position}`);
    }
    
    const throttledScroll = throttle(handleScroll, 200);
    
    // Simulated rapid scrolling
    console.log("Simulating scrolling...");
    for (let i = 0; i < 10; i++) {
        setTimeout(() => throttledScroll(i * 100), i * 50);
    }
    
    /*
     * Use cases for throttling:
     * - Scroll events
     * - Mouse move events
     * - Animations
     * - API rate limiting
     */
}, 1000);

setTimeout(() => {
    console.log("\n=== Memoization ===");
    
    // Simple memoization
    function memoize(fn) {
        const cache = new Map();
        
        return function(...args) {
            const key = JSON.stringify(args);
            
            if (cache.has(key)) {
                console.log(`Cache hit for ${key}`);
                return cache.get(key);
            }
            
            console.log(`Computing ${key}`);
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
    }
    
    // Expensive calculation
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    const memoizedFib = memoize(fibonacci);
    
    console.log("Fibonacci(10):", memoizedFib(10));
    console.log("Fibonacci(10) again:", memoizedFib(10));
    console.log("Fibonacci(11):", memoizedFib(11));
    
    // Memoization with LRU cache
    class LRUCache {
        constructor(maxSize = 100) {
            this.maxSize = maxSize;
            this.cache = new Map();
        }
        
        get(key) {
            if (!this.cache.has(key)) return undefined;
            
            // Move to end (most recently used)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            
            return value;
        }
        
        set(key, value) {
            // Remove if exists
            if (this.cache.has(key)) {
                this.cache.delete(key);
            }
            
            // Add to end
            this.cache.set(key, value);
            
            // Remove oldest if exceeds max size
            if (this.cache.size > this.maxSize) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
        }
    }
    
    const lruCache = new LRUCache(3);
    lruCache.set('a', 1);
    lruCache.set('b', 2);
    lruCache.set('c', 3);
    console.log("\nLRU Cache size:", lruCache.cache.size);
    
    lruCache.set('d', 4);  // Removes 'a'
    console.log("After adding 'd':", lruCache.get('a') === undefined);
}, 2000);

setTimeout(() => {
    console.log("\n=== Lazy Loading ===");
    
    // Lazy initialization
    class ExpensiveResource {
        constructor() {
            console.log("ExpensiveResource created (heavy operation)");
            this.data = new Array(1000000).fill(0);
        }
        
        getData() {
            return this.data;
        }
    }
    
    class LazyLoader {
        constructor() {
            this._resource = null;
        }
        
        get resource() {
            if (!this._resource) {
                console.log("Initializing resource...");
                this._resource = new ExpensiveResource();
            }
            return this._resource;
        }
    }
    
    const loader = new LazyLoader();
    console.log("LazyLoader created (no resource yet)");
    
    // Resource only created when accessed
    setTimeout(() => {
        console.log("Accessing resource...");
        loader.resource.getData();
    }, 500);
    
    // Lazy loading function
    function lazyLoad(factory) {
        let instance = null;
        
        return function() {
            if (!instance) {
                instance = factory();
            }
            return instance;
        };
    }
    
    const getExpensiveData = lazyLoad(() => {
        console.log("Loading expensive data...");
        return { data: new Array(1000000).fill(0) };
    });
    
    setTimeout(() => {
        console.log("\nFirst call:");
        getExpensiveData();
        
        console.log("Second call:");
        getExpensiveData();  // Cached
    }, 1000);
}, 3000);

setTimeout(() => {
    console.log("\n=== Performance Measurement ===");
    
    // Using console.time
    console.time('Array operation');
    const arr = new Array(1000000).fill(0).map((_, i) => i * 2);
    console.timeEnd('Array operation');
    
    // Using performance.now() (simulated)
    function measurePerformance(fn, label) {
        const start = Date.now();
        fn();
        const end = Date.now();
        console.log(`${label}: ${end - start}ms`);
    }
    
    measurePerformance(() => {
        const result = [];
        for (let i = 0; i < 100000; i++) {
            result.push(i);
        }
    }, 'Loop with push');
    
    measurePerformance(() => {
        const result = Array.from({ length: 100000 }, (_, i) => i);
    }, 'Array.from');
    
    /*
     * In a browser:
     * 
     * const start = performance.now();
     * // ... code to measure
     * const end = performance.now();
     * console.log(`Execution time: ${end - start}ms`);
     * 
     * // Mark and measure
     * performance.mark('start');
     * // ... code
     * performance.mark('end');
     * performance.measure('myMeasure', 'start', 'end');
     */
}, 5000);

setTimeout(() => {
    console.log("\n=== Memory Management ===");
    
    // Avoid memory leaks
    
    // Bad: Global variables
    // globalVar = 'leaks memory';  // No var/let/const
    
    // Bad: Forgotten timers
    // const id = setInterval(() => {}, 1000);
    // // Must clear: clearInterval(id);
    
    // Good: Clean up event listeners
    class Component {
        constructor() {
            this.handleClick = this.handleClick.bind(this);
        }
        
        mount() {
            // In browser: element.addEventListener('click', this.handleClick);
            console.log("Component mounted");
        }
        
        unmount() {
            // In browser: element.removeEventListener('click', this.handleClick);
            console.log("Component unmounted (cleaned up)");
        }
        
        handleClick() {
            console.log("Clicked");
        }
    }
    
    const component = new Component();
    component.mount();
    component.unmount();
    
    // Good: Weak references
    const weakMap = new WeakMap();
    let obj = { data: 'value' };
    
    weakMap.set(obj, 'metadata');
    console.log("WeakMap has obj:", weakMap.has(obj));
    
    // obj can be garbage collected when no other references
    obj = null;
    
    // Object pooling
    class ObjectPool {
        constructor(factory, size = 10) {
            this.factory = factory;
            this.pool = [];
            this.active = new Set();
            
            for (let i = 0; i < size; i++) {
                this.pool.push(factory());
            }
        }
        
        acquire() {
            if (this.pool.length === 0) {
                return this.factory();
            }
            
            const obj = this.pool.pop();
            this.active.add(obj);
            return obj;
        }
        
        release(obj) {
            if (this.active.has(obj)) {
                this.active.delete(obj);
                this.pool.push(obj);
            }
        }
    }
    
    const pool = new ObjectPool(() => ({ value: 0 }), 5);
    
    const obj1 = pool.acquire();
    const obj2 = pool.acquire();
    console.log("\nAcquired 2 objects from pool");
    
    pool.release(obj1);
    console.log("Released 1 object back to pool");
}, 6000);

setTimeout(() => {
    console.log("\n=== Optimizing Loops ===");
    
    // Cache array length
    function badLoop(arr) {
        for (let i = 0; i < arr.length; i++) {  // length recalculated each time
            // process arr[i]
        }
    }
    
    function goodLoop(arr) {
        const len = arr.length;
        for (let i = 0; i < len; i++) {  // length cached
            // process arr[i]
        }
    }
    
    console.log("Cache array length in loops");
    
    // Use forEach/map for readability (often optimized by engines)
    const arr = [1, 2, 3, 4, 5];
    
    // Functional approach
    const doubled = arr.map(x => x * 2);
    console.log("Doubled:", doubled);
    
    // Avoid nested loops when possible
    function findPairs(arr) {
        const seen = new Set();
        const pairs = [];
        
        for (const num of arr) {
            if (seen.has(num)) {
                pairs.push([num, num]);
            }
            seen.add(num);
        }
        
        return pairs;
    }
    
    console.log("Use Sets/Maps to avoid nested loops");
}, 7000);

setTimeout(() => {
    console.log("\n=== DOM Performance ===");
    
    /*
     * 1. Minimize DOM access
     * // Bad
     * for (let i = 0; i < 100; i++) {
     *     document.getElementById('list').innerHTML += '<li>Item</li>';
     * }
     * 
     * // Good
     * let html = '';
     * for (let i = 0; i < 100; i++) {
     *     html += '<li>Item</li>';
     * }
     * document.getElementById('list').innerHTML = html;
     * 
     * 
     * 2. Use DocumentFragment
     * const fragment = document.createDocumentFragment();
     * for (let i = 0; i < 100; i++) {
     *     const li = document.createElement('li');
     *     fragment.appendChild(li);
     * }
     * list.appendChild(fragment);  // Single reflow
     * 
     * 
     * 3. Batch style changes
     * // Bad
     * element.style.color = 'red';
     * element.style.fontSize = '16px';
     * element.style.padding = '10px';
     * 
     * // Good
     * element.style.cssText = 'color: red; font-size: 16px; padding: 10px';
     * // Or use classes
     * element.className = 'styled';
     * 
     * 
     * 4. Use event delegation
     * // Instead of adding listeners to each item
     * list.addEventListener('click', (e) => {
     *     if (e.target.tagName === 'LI') {
     *         handleClick(e.target);
     *     }
     * });
     * 
     * 
     * 5. Debounce/throttle scroll/resize
     * window.addEventListener('scroll', 
     *     throttle(handleScroll, 100)
     * );
     */
    
    console.log("DOM performance tips documented");
}, 8000);

setTimeout(() => {
    console.log("\n=== Best Practices ===");
    
    /*
     * Performance Best Practices:
     * 
     * 1. Measure first, optimize second
     * - Use profiling tools
     * - Identify bottlenecks
     * - Don't premature optimize
     * 
     * 2. Debounce expensive operations
     * - Search, validation, API calls
     * 
     * 3. Throttle frequent events
     * - Scroll, resize, mouse move
     * 
     * 4. Use memoization for pure functions
     * - Cache expensive calculations
     * 
     * 5. Lazy load when possible
     * - Images, components, data
     * 
     * 6. Minimize DOM operations
     * - Batch updates
     * - Use DocumentFragment
     * 
     * 7. Use efficient data structures
     * - Set for lookups
     * - Map for key-value pairs
     * - Array for ordered data
     * 
     * 8. Avoid memory leaks
     * - Clear timers/intervals
     * - Remove event listeners
     * - Clean up references
     * 
     * 9. Use Web Workers for heavy tasks
     * - Don't block main thread
     * 
     * 10. Code splitting
     * - Load only what's needed
     * - Dynamic imports
     * 
     * 11. Optimize loops
     * - Cache length
     * - Break early when possible
     * - Use appropriate methods
     * 
     * 12. Monitor bundle size
     * - Tree shaking
     * - Minification
     * - Compression
     */
    
    console.log("Best practices documented");
}, 9000);

/*
 * Sample Output:
 * === Performance Optimization Overview ===
 * 
 * === Debouncing ===
 * Simulating rapid typing...
 * Only last search executed after 300ms delay
 * Searching for: apple
 * 
 * === Throttling ===
 * Simulating scrolling...
 * Scroll position: 0
 * Scroll position: 200
 * Scroll position: 400
 * ...
 * 
 * [Additional output continues...]
 */
