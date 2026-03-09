/*
 * Question 16 (Advanced): Fetch API and AJAX
 * 
 * Write a JavaScript program that demonstrates:
 * - Using the Fetch API
 * - Making GET and POST requests
 * - Handling responses and errors
 * - Working with JSON
 * - Request headers and options
 * 
 * Learning objectives:
 * - Make HTTP requests from JavaScript
 * - Work with APIs and async data
 * - Handle network operations
 * 
 * Note: This example uses simulated fetch for demonstration.
 * In a real browser, fetch makes actual HTTP requests.
 */

console.log("=== Fetch API Overview ===");

// Simulated fetch function
function simulatedFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching: ${url}`);
            console.log(`Method: ${options.method || 'GET'}`);
            
            // Simulate different responses based on URL
            if (url.includes('/users')) {
                resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map([['content-type', 'application/json']]),
                    json: () => Promise.resolve([
                        { id: 1, name: 'Alice', email: 'alice@example.com' },
                        { id: 2, name: 'Bob', email: 'bob@example.com' }
                    ]),
                    text: () => Promise.resolve(JSON.stringify([
                        { id: 1, name: 'Alice', email: 'alice@example.com' }
                    ]))
                });
            } else if (url.includes('/error')) {
                reject(new Error('Network error'));
            } else if (url.includes('/404')) {
                resolve({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    json: () => Promise.resolve({ error: 'Not found' })
                });
            } else {
                resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ message: 'Success' })
                });
            }
        }, 500);
    });
}

console.log("\n=== Basic GET Request ===");

async function basicFetch() {
    try {
        const response = await simulatedFetch('https://api.example.com/users');
        console.log('Response status:', response.status);
        console.log('Response OK:', response.ok);
        
        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

basicFetch();

/*
 * In a real browser:
 * 
 * fetch('https://api.example.com/users')
 *     .then(response => response.json())
 *     .then(data => console.log(data))
 *     .catch(error => console.error('Error:', error));
 * 
 * // Or with async/await:
 * async function fetchUsers() {
 *     try {
 *         const response = await fetch('https://api.example.com/users');
 *         const data = await response.json();
 *         console.log(data);
 *     } catch (error) {
 *         console.error('Error:', error);
 *     }
 * }
 */

setTimeout(async () => {
    console.log("\n=== POST Request ===");
    
    const newUser = {
        name: 'Charlie',
        email: 'charlie@example.com'
    };
    
    try {
        const response = await simulatedFetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        const data = await response.json();
        console.log('Created user:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    /*
     * In a real browser:
     * 
     * fetch('https://api.example.com/users', {
     *     method: 'POST',
     *     headers: {
     *         'Content-Type': 'application/json',
     *         'Authorization': 'Bearer token123'
     *     },
     *     body: JSON.stringify({ name: 'Charlie' })
     * })
     * .then(response => response.json())
     * .then(data => console.log(data));
     */
}, 1000);

setTimeout(async () => {
    console.log("\n=== Handling Errors ===");
    
    // Network error
    try {
        await simulatedFetch('https://api.example.com/error');
    } catch (error) {
        console.error('Network error caught:', error.message);
    }
    
    // HTTP error (404)
    try {
        const response = await simulatedFetch('https://api.example.com/404');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('HTTP error caught:', error.message);
    }
    
    /*
     * In a real browser:
     * 
     * async function fetchWithError() {
     *     try {
     *         const response = await fetch('https://api.example.com/data');
     *         
     *         if (!response.ok) {
     *             throw new Error(`HTTP error! Status: ${response.status}`);
     *         }
     *         
     *         const data = await response.json();
     *         return data;
     *     } catch (error) {
     *         if (error.name === 'TypeError') {
     *             console.error('Network error:', error);
     *         } else {
     *             console.error('Error:', error);
     *         }
     *         throw error;
     *     }
     * }
     */
}, 2000);

setTimeout(async () => {
    console.log("\n=== Request Options ===");
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer abc123',
            'X-Custom-Header': 'value'
        },
        body: JSON.stringify({ name: 'Updated Name' }),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    };
    
    console.log('Request options:', {
        method: options.method,
        headers: options.headers,
        mode: options.mode
    });
    
    /*
     * Fetch options:
     * - method: 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'
     * - headers: Object or Headers instance
     * - body: Request body (string, FormData, Blob)
     * - mode: 'cors', 'no-cors', 'same-origin'
     * - credentials: 'omit', 'same-origin', 'include'
     * - cache: 'default', 'no-cache', 'reload', 'force-cache'
     * - redirect: 'follow', 'error', 'manual'
     * - referrer: URL or 'no-referrer'
     * - signal: AbortSignal for cancellation
     */
}, 3000);

setTimeout(async () => {
    console.log("\n=== Working with Different Response Types ===");
    
    // JSON
    const jsonResponse = await simulatedFetch('https://api.example.com/data');
    const jsonData = await jsonResponse.json();
    console.log('JSON data:', jsonData);
    
    // Text
    const textResponse = await simulatedFetch('https://api.example.com/users');
    const textData = await textResponse.text();
    console.log('Text data:', textData.substring(0, 50) + '...');
    
    /*
     * In a real browser:
     * 
     * // JSON
     * const jsonData = await response.json();
     * 
     * // Text
     * const textData = await response.text();
     * 
     * // Blob (for images, files)
     * const blob = await response.blob();
     * const imageUrl = URL.createObjectURL(blob);
     * 
     * // ArrayBuffer (for binary data)
     * const buffer = await response.arrayBuffer();
     * 
     * // FormData
     * const formData = await response.formData();
     */
}, 4000);

setTimeout(async () => {
    console.log("\n=== Parallel Requests ===");
    
    try {
        const [users, posts, comments] = await Promise.all([
            simulatedFetch('https://api.example.com/users').then(r => r.json()),
            simulatedFetch('https://api.example.com/posts').then(r => r.json()),
            simulatedFetch('https://api.example.com/comments').then(r => r.json())
        ]);
        
        console.log('All requests completed');
        console.log('Users:', users.length);
        console.log('Posts: (simulated)');
        console.log('Comments: (simulated)');
    } catch (error) {
        console.error('One or more requests failed:', error);
    }
    
    /*
     * In a real browser:
     * 
     * const [users, posts] = await Promise.all([
     *     fetch('/api/users').then(r => r.json()),
     *     fetch('/api/posts').then(r => r.json())
     * ]);
     */
}, 5000);

setTimeout(() => {
    console.log("\n=== Request Timeout ===");
    
    async function fetchWithTimeout(url, timeout = 5000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await simulatedFetch(url, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out');
            }
            throw error;
        }
    }
    
    console.log('Timeout mechanism set up');
    console.log('(Would abort request after specified time)');
    
    /*
     * In a real browser:
     * 
     * const controller = new AbortController();
     * 
     * setTimeout(() => controller.abort(), 5000);
     * 
     * fetch(url, { signal: controller.signal })
     *     .then(response => response.json())
     *     .catch(error => {
     *         if (error.name === 'AbortError') {
     *             console.log('Request cancelled');
     *         }
     *     });
     */
}, 6000);

setTimeout(async () => {
    console.log("\n=== Retry Logic ===");
    
    async function fetchWithRetry(url, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await simulatedFetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                return response;
            } catch (error) {
                console.log(`Attempt ${i + 1} failed: ${error.message}`);
                
                if (i < retries - 1) {
                    console.log(`Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw error;
                }
            }
        }
    }
    
    try {
        const response = await fetchWithRetry('https://api.example.com/users', 2, 500);
        const data = await response.json();
        console.log('Success after retries:', data.length, 'users');
    } catch (error) {
        console.error('All retries failed');
    }
}, 7000);

setTimeout(async () => {
    console.log("\n=== Practical Examples ===");
    
    // Example 1: CRUD operations
    console.log('\nCRUD Operations:');
    
    const api = {
        baseUrl: 'https://api.example.com',
        
        async get(endpoint) {
            const response = await simulatedFetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) throw new Error(`GET ${endpoint} failed`);
            return response.json();
        },
        
        async post(endpoint, data) {
            const response = await simulatedFetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`POST ${endpoint} failed`);
            return response.json();
        },
        
        async put(endpoint, data) {
            const response = await simulatedFetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`PUT ${endpoint} failed`);
            return response.json();
        },
        
        async delete(endpoint) {
            const response = await simulatedFetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
            return response.json();
        }
    };
    
    try {
        // CREATE
        const newUser = await api.post('/users', { name: 'Dave' });
        console.log('Created:', newUser);
        
        // READ
        const users = await api.get('/users');
        console.log('Retrieved:', users.length, 'users');
        
        // UPDATE
        // const updated = await api.put('/users/1', { name: 'Updated' });
        
        // DELETE
        // const deleted = await api.delete('/users/1');
    } catch (error) {
        console.error('API error:', error.message);
    }
}, 9000);

setTimeout(() => {
    console.log("\n=== Best Practices ===");
    
    /*
     * 1. Always check response.ok
     * if (!response.ok) {
     *     throw new Error(`HTTP ${response.status}`);
     * }
     * 
     * 2. Use try/catch for error handling
     * try {
     *     const data = await fetch(url).then(r => r.json());
     * } catch (error) {
     *     // Handle error
     * }
     * 
     * 3. Set appropriate headers
     * headers: {
     *     'Content-Type': 'application/json',
     *     'Authorization': `Bearer ${token}`
     * }
     * 
     * 4. Use AbortController for cancellation
     * const controller = new AbortController();
     * fetch(url, { signal: controller.signal });
     * controller.abort();  // Cancel request
     * 
     * 5. Implement retry logic for unreliable connections
     * 
     * 6. Cache responses when appropriate
     * 
     * 7. Use environment variables for API URLs
     * const API_URL = process.env.REACT_APP_API_URL;
     * 
     * 8. Create reusable API clients
     * 
     * 9. Handle loading and error states in UI
     * 
     * 10. Use request/response interceptors for auth
     */
    
    console.log('Best practices documented');
}, 11000);

/*
 * Sample Output:
 * === Fetch API Overview ===
 * 
 * === Basic GET Request ===
 * Fetching: https://api.example.com/users
 * Method: GET
 * Response status: 200
 * Response OK: true
 * Data: [ { id: 1, name: 'Alice', email: 'alice@example.com' }, ... ]
 * 
 * === POST Request ===
 * Fetching: https://api.example.com/users
 * Method: POST
 * Created user: { message: 'Success' }
 * 
 * [Additional output continues...]
 */
