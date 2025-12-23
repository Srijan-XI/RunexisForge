/*
 * Question 20 (Advanced): Local Storage and Session Storage
 * 
 * Write a JavaScript program that demonstrates:
 * - Using localStorage and sessionStorage
 * - Storing and retrieving data
 * - Data persistence
 * - Storage events
 * - Best practices for web storage
 * 
 * Learning objectives:
 * - Store data in the browser
 * - Understand storage mechanisms
 * - Build persistent web applications
 * 
 * Note: This example uses simulated storage for demonstration.
 * In a real browser, data persists across page reloads.
 */

console.log("=== Web Storage API Overview ===");

// Simulated Storage class
class SimulatedStorage {
    constructor(name) {
        this.name = name;
        this.data = {};
    }
    
    setItem(key, value) {
        this.data[key] = String(value);
        console.log(`[${this.name}] Set '${key}': ${value}`);
    }
    
    getItem(key) {
        const value = this.data[key] || null;
        console.log(`[${this.name}] Get '${key}': ${value}`);
        return value;
    }
    
    removeItem(key) {
        delete this.data[key];
        console.log(`[${this.name}] Removed '${key}'`);
    }
    
    clear() {
        this.data = {};
        console.log(`[${this.name}] Cleared all data`);
    }
    
    key(index) {
        const keys = Object.keys(this.data);
        return keys[index] || null;
    }
    
    get length() {
        return Object.keys(this.data).length;
    }
}

const localStorage = new SimulatedStorage('localStorage');
const sessionStorage = new SimulatedStorage('sessionStorage');

console.log("\n=== Basic Operations ===");

// Set items
localStorage.setItem('username', 'john_doe');
localStorage.setItem('theme', 'dark');
localStorage.setItem('fontSize', '16');

// Get items
const username = localStorage.getItem('username');
const theme = localStorage.getItem('theme');
const fontSize = localStorage.getItem('fontSize');

console.log("\nRetrieved values:");
console.log("  Username:", username);
console.log("  Theme:", theme);
console.log("  Font size:", fontSize);

// Remove item
localStorage.removeItem('fontSize');

// Check if exists
const exists = localStorage.getItem('fontSize');
console.log("\nFont size after removal:", exists);

console.log("\n=== Storing Objects ===");

// Objects must be serialized
const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    preferences: {
        theme: "dark",
        language: "en"
    }
};

// Store object
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse object
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log("\nStored user:", storedUser);
console.log("  Name:", storedUser.name);
console.log("  Theme:", storedUser.preferences.theme);

console.log("\n=== Storing Arrays ===");

const todos = [
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Build a project", done: false },
    { id: 3, text: "Deploy to production", done: true }
];

// Store array
localStorage.setItem('todos', JSON.stringify(todos));

// Retrieve and parse array
const storedTodos = JSON.parse(localStorage.getItem('todos'));
console.log("\nStored todos:", storedTodos.length, "items");
storedTodos.forEach(todo => {
    console.log(`  ${todo.done ? '✓' : '○'} ${todo.text}`);
});

console.log("\n=== LocalStorage vs SessionStorage ===");

/*
 * localStorage:
 * - Persists even after browser closes
 * - Shared across all tabs of same origin
 * - Typical size limit: 5-10 MB
 * - Perfect for: User preferences, cached data
 * 
 * sessionStorage:
 * - Cleared when tab/browser closes
 * - Separate for each tab
 * - Same size limit as localStorage
 * - Perfect for: Temporary data, form data
 */

localStorage.setItem('persistent', 'This persists');
sessionStorage.setItem('temporary', 'This is temporary');

console.log("localStorage:", localStorage.getItem('persistent'));
console.log("sessionStorage:", sessionStorage.getItem('temporary'));

console.log("\n=== Iteration ===");

// Add some items
localStorage.setItem('key1', 'value1');
localStorage.setItem('key2', 'value2');
localStorage.setItem('key3', 'value3');

// Method 1: Using length and key()
console.log("Method 1 - Using key():");
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`  ${key}: ${value}`);
}

// Method 2: Using Object.keys (simulated)
console.log("\nMethod 2 - Using Object.keys:");
Object.keys(localStorage.data).forEach(key => {
    console.log(`  ${key}: ${localStorage.getItem(key)}`);
});

/*
 * In a real browser:
 * 
 * for (let i = 0; i < localStorage.length; i++) {
 *     const key = localStorage.key(i);
 *     console.log(key, localStorage.getItem(key));
 * }
 */

console.log("\n=== Storage Quota ===");

// Check available space (simulated)
function checkStorageQuota() {
    try {
        const testKey = '__storage_test__';
        const testData = 'x'.repeat(1024);  // 1KB
        
        localStorage.setItem(testKey, testData);
        localStorage.removeItem(testKey);
        
        console.log("Storage is available");
        return true;
    } catch (e) {
        console.log("Storage quota exceeded or unavailable");
        return false;
    }
}

checkStorageQuota();

/*
 * In a real browser:
 * 
 * if (navigator.storage && navigator.storage.estimate) {
 *     navigator.storage.estimate().then(estimate => {
 *         console.log('Usage:', estimate.usage);
 *         console.log('Quota:', estimate.quota);
 *         console.log('Percentage:', 
 *             (estimate.usage / estimate.quota * 100).toFixed(2) + '%');
 *     });
 * }
 */

console.log("\n=== Error Handling ===");

// Storage might not be available
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('Storage quota exceeded');
        } else if (e.name === 'SecurityError') {
            console.error('Storage access denied');
        } else {
            console.error('Storage error:', e.message);
        }
        return false;
    }
}

safeSetItem('test', 'value');

// Check if storage is available
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

console.log("Storage available:", isStorageAvailable());

console.log("\n=== Storage Wrapper Class ===");

class StorageManager {
    constructor(storage = localStorage) {
        this.storage = storage;
    }
    
    set(key, value, ttl = null) {
        try {
            const item = {
                value: value,
                timestamp: Date.now(),
                ttl: ttl
            };
            
            this.storage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Failed to set item:', error);
            return false;
        }
    }
    
    get(key) {
        try {
            const itemStr = this.storage.getItem(key);
            
            if (!itemStr) {
                return null;
            }
            
            const item = JSON.parse(itemStr);
            
            // Check TTL
            if (item.ttl && Date.now() - item.timestamp > item.ttl) {
                this.remove(key);
                return null;
            }
            
            return item.value;
        } catch (error) {
            console.error('Failed to get item:', error);
            return null;
        }
    }
    
    remove(key) {
        this.storage.removeItem(key);
    }
    
    clear() {
        this.storage.clear();
    }
    
    has(key) {
        return this.storage.getItem(key) !== null;
    }
    
    keys() {
        return Object.keys(this.storage.data);
    }
}

const store = new StorageManager(localStorage);

// Set with TTL (5 seconds)
store.set('tempData', 'expires soon', 5000);
console.log("Set temp data with 5s TTL");

// Get immediately
console.log("Get temp data:", store.get('tempData'));

// Set permanent data
store.set('permData', 'stays forever');
console.log("Set permanent data");

console.log("\n=== Practical Examples ===");

// Example 1: User preferences
const PreferencesManager = {
    save(prefs) {
        localStorage.setItem('preferences', JSON.stringify(prefs));
        console.log("Preferences saved");
    },
    
    load() {
        const prefs = localStorage.getItem('preferences');
        return prefs ? JSON.parse(prefs) : this.getDefaults();
    },
    
    getDefaults() {
        return {
            theme: 'light',
            language: 'en',
            notifications: true,
            fontSize: 16
        };
    },
    
    update(key, value) {
        const prefs = this.load();
        prefs[key] = value;
        this.save(prefs);
    }
};

PreferencesManager.save({ theme: 'dark', language: 'en' });
const prefs = PreferencesManager.load();
console.log("Loaded preferences:", prefs);

PreferencesManager.update('theme', 'light');
console.log("Updated theme");

// Example 2: Shopping cart
const CartManager = {
    add(item) {
        const cart = this.getItems();
        
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        this.save(cart);
        console.log(`Added ${item.name} to cart`);
    },
    
    remove(itemId) {
        const cart = this.getItems().filter(i => i.id !== itemId);
        this.save(cart);
        console.log(`Removed item ${itemId} from cart`);
    },
    
    getItems() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },
    
    save(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    },
    
    clear() {
        localStorage.removeItem('cart');
        console.log("Cart cleared");
    },
    
    getTotal() {
        return this.getItems().reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }
};

CartManager.add({ id: 1, name: "Laptop", price: 999 });
CartManager.add({ id: 2, name: "Mouse", price: 25 });
console.log("Cart items:", CartManager.getItems().length);
console.log("Cart total: $" + CartManager.getTotal());

// Example 3: Form autosave
const FormManager = {
    save(formId, data) {
        const key = `form_${formId}`;
        localStorage.setItem(key, JSON.stringify({
            data: data,
            savedAt: new Date().toISOString()
        }));
        console.log(`Form ${formId} autosaved`);
    },
    
    load(formId) {
        const key = `form_${formId}`;
        const saved = localStorage.getItem(key);
        
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log(`Form ${formId} loaded from ${parsed.savedAt}`);
            return parsed.data;
        }
        
        return null;
    },
    
    clear(formId) {
        const key = `form_${formId}`;
        localStorage.removeItem(key);
        console.log(`Form ${formId} data cleared`);
    }
};

FormManager.save('contact', {
    name: "John Doe",
    email: "john@example.com",
    message: "Hello..."
});

const formData = FormManager.load('contact');
console.log("Loaded form data:", formData);

// Example 4: Recent searches
const SearchManager = {
    add(query) {
        const searches = this.getAll();
        
        // Remove if exists
        const filtered = searches.filter(q => q !== query);
        
        // Add to beginning
        filtered.unshift(query);
        
        // Keep only last 10
        const limited = filtered.slice(0, 10);
        
        localStorage.setItem('recentSearches', JSON.stringify(limited));
        console.log(`Added search: "${query}"`);
    },
    
    getAll() {
        const searches = localStorage.getItem('recentSearches');
        return searches ? JSON.parse(searches) : [];
    },
    
    clear() {
        localStorage.removeItem('recentSearches');
        console.log("Recent searches cleared");
    }
};

SearchManager.add("JavaScript tutorials");
SearchManager.add("React best practices");
SearchManager.add("Node.js deployment");
console.log("Recent searches:", SearchManager.getAll());

console.log("\n=== Best Practices ===");

/*
 * 1. Always use try/catch
 * try {
 *     localStorage.setItem(key, value);
 * } catch (e) {
 *     // Handle error
 * }
 * 
 * 2. Check storage availability first
 * 
 * 3. Use JSON for objects/arrays
 * localStorage.setItem('data', JSON.stringify(obj));
 * 
 * 4. Implement TTL for temporary data
 * 
 * 5. Clear old/unused data regularly
 * 
 * 6. Don't store sensitive data
 * - No passwords, tokens, credit cards
 * - Use HttpOnly cookies for sensitive data
 * 
 * 7. Keep data small
 * - 5-10 MB limit
 * - Compress large data
 * 
 * 8. Use meaningful key names
 * - app_user_preferences
 * - app_cart_items
 * 
 * 9. Implement fallbacks
 * - Handle storage unavailable scenarios
 * - Provide in-memory alternatives
 * 
 * 10. Monitor storage usage
 * 
 * 11. Consider IndexedDB for large data
 * 
 * 12. Handle cross-tab communication
 * - Use storage events
 * - Coordinate state between tabs
 */

console.log("Best practices documented");

/*
 * Storage Events (browser only):
 * 
 * window.addEventListener('storage', (e) => {
 *     console.log('Storage changed:');
 *     console.log('  Key:', e.key);
 *     console.log('  Old:', e.oldValue);
 *     console.log('  New:', e.newValue);
 *     console.log('  URL:', e.url);
 *     
 *     // Sync state across tabs
 *     if (e.key === 'user') {
 *         updateUserUI(JSON.parse(e.newValue));
 *     }
 * });
 */

/*
 * Sample Output:
 * === Web Storage API Overview ===
 * 
 * === Basic Operations ===
 * [localStorage] Set 'username': john_doe
 * [localStorage] Set 'theme': dark
 * [localStorage] Set 'fontSize': 16
 * [localStorage] Get 'username': john_doe
 * [localStorage] Get 'theme': dark
 * [localStorage] Get 'fontSize': 16
 * 
 * Retrieved values:
 *   Username: john_doe
 *   Theme: dark
 *   Font size: 16
 * 
 * [Additional output continues...]
 */
