/*
 * Question 25 (Expert): Security Best Practices
 * 
 * Write a JavaScript program that demonstrates:
 * - XSS (Cross-Site Scripting) prevention
 * - CSRF (Cross-Site Request Forgery) protection
 * - Input validation and sanitization
 * - Secure data handling
 * - Content Security Policy
 * - Authentication best practices
 * 
 * Learning objectives:
 * - Write secure JavaScript code
 * - Prevent common security vulnerabilities
 * - Protect user data and privacy
 */

console.log("=== JavaScript Security Best Practices ===");

console.log("\n=== 1. XSS (Cross-Site Scripting) Prevention ===");

// Dangerous: Directly inserting user input
function unsafeRender(userInput) {
    // DON'T DO THIS
    // element.innerHTML = userInput;
    console.log("UNSAFE: Direct HTML insertion");
    console.log(`  Input: ${userInput}`);
    console.log("  Risk: Scripts can execute");
}

unsafeRender('<script>alert("XSS")</script>');

// Safe: Escape HTML
function escapeHTML(str) {
    const div = { textContent: str };  // Simulated
    const escaped = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    
    console.log("\nSAFE: Escaped HTML");
    console.log(`  Input: ${str}`);
    console.log(`  Output: ${escaped}`);
    return escaped;
}

escapeHTML('<script>alert("XSS")</script>');

// Safe: Use textContent instead of innerHTML
function safeRender(userInput) {
    // element.textContent = userInput;  // Safe - no HTML parsing
    console.log("\nSAFE: Using textContent");
    console.log(`  Input: ${userInput}`);
}

safeRender('<script>alert("XSS")</script>');

// Sanitization library approach
function sanitizeInput(input) {
    // Remove script tags
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove event handlers
    sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    console.log("\nSanitized input:");
    console.log(`  Input: ${input}`);
    console.log(`  Output: ${sanitized}`);
    
    return sanitized;
}

sanitizeInput('<img src="x" onerror="alert(\'XSS\')">');

console.log("\n=== 2. Input Validation ===");

// Validate email
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = pattern.test(email);
    
    console.log(`Email "${email}": ${isValid ? 'VALID' : 'INVALID'}`);
    return isValid;
}

validateEmail('user@example.com');
validateEmail('invalid.email');
validateEmail('<script>@evil.com');

// Validate and sanitize username
function validateUsername(username) {
    // Only alphanumeric and underscores, 3-20 characters
    const pattern = /^[a-zA-Z0-9_]{3,20}$/;
    
    if (!pattern.test(username)) {
        console.log(`Username "${username}": INVALID`);
        return false;
    }
    
    console.log(`Username "${username}": VALID`);
    return true;
}

validateUsername('john_doe');
validateUsername('jo');  // Too short
validateUsername('john<script>');  // Invalid characters

// Type validation
function validateAge(age) {
    const num = Number(age);
    
    if (isNaN(num) || num < 0 || num > 150) {
        console.log(`Age "${age}": INVALID`);
        return false;
    }
    
    console.log(`Age "${age}": VALID`);
    return true;
}

validateAge(25);
validateAge('abc');
validateAge(-5);

console.log("\n=== 3. SQL Injection Prevention ===");

// Simulated database query
function unsafeQuery(username) {
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    console.log("UNSAFE Query:");
    console.log(`  ${query}`);
    console.log("  Risk: SQL injection possible");
}

unsafeQuery("admin' OR '1'='1");

// Safe: Use parameterized queries
function safeQuery(username) {
    console.log("\nSAFE Query (parameterized):");
    console.log("  SELECT * FROM users WHERE username = $1");
    console.log(`  Parameters: ["${username}"]`);
    console.log("  Protection: Input treated as data, not code");
}

safeQuery("admin' OR '1'='1");

console.log("\n=== 4. CSRF Protection ===");

// CSRF token generation
function generateCSRFToken() {
    const array = new Uint8Array(32);
    // In browser: crypto.getRandomValues(array);
    for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
    }
    
    const token = Array.from(array, byte => 
        byte.toString(16).padStart(2, '0')
    ).join('');
    
    console.log("Generated CSRF token:");
    console.log(`  ${token.substring(0, 32)}...`);
    
    return token;
}

const csrfToken = generateCSRFToken();

// Include token in forms
function createSecureForm() {
    /*
     * In HTML:
     * <form action="/submit" method="POST">
     *     <input type="hidden" name="csrf_token" value="${csrfToken}">
     *     <!-- other fields -->
     * </form>
     */
    
    console.log("\nSecure form includes CSRF token");
    console.log("  Token validated on server");
}

createSecureForm();

// Validate CSRF token
function validateCSRFToken(submittedToken, storedToken) {
    const isValid = submittedToken === storedToken;
    console.log(`\nCSRF token validation: ${isValid ? 'PASSED' : 'FAILED'}`);
    return isValid;
}

validateCSRFToken(csrfToken, csrfToken);

console.log("\n=== 5. Secure Data Storage ===");

// DON'T store sensitive data in localStorage
function insecureStorage() {
    console.log("INSECURE: Storing sensitive data in localStorage");
    console.log("  localStorage.setItem('password', 'secret123')");
    console.log("  Risk: Accessible via JavaScript, XSS vulnerable");
}

insecureStorage();

// DO use HttpOnly cookies for sensitive data
function secureStorage() {
    console.log("\nSECURE: Using HttpOnly cookies");
    console.log("  Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Strict");
    console.log("  Benefits:");
    console.log("    - Not accessible via JavaScript");
    console.log("    - Protected from XSS");
    console.log("    - Secure flag ensures HTTPS only");
    console.log("    - SameSite prevents CSRF");
}

secureStorage();

// Encrypt sensitive data before storage
function encryptData(data, key) {
    // Simplified encryption (use proper crypto libraries in production)
    const encrypted = Buffer.from(data).toString('base64');
    console.log("\nEncrypted data:");
    console.log(`  Original: ${data}`);
    console.log(`  Encrypted: ${encrypted}`);
    return encrypted;
}

encryptData('sensitive info', 'encryption-key');

console.log("\n=== 6. Authentication Best Practices ===");

// Password requirements
function validatePassword(password) {
    const requirements = [
        { test: /.{8,}/, message: 'At least 8 characters' },
        { test: /[a-z]/, message: 'One lowercase letter' },
        { test: /[A-Z]/, message: 'One uppercase letter' },
        { test: /[0-9]/, message: 'One number' },
        { test: /[^a-zA-Z0-9]/, message: 'One special character' }
    ];
    
    console.log(`\nValidating password: ${'*'.repeat(password.length)}`);
    
    const failures = requirements.filter(req => !req.test.test(password));
    
    if (failures.length === 0) {
        console.log('  Result: STRONG PASSWORD');
        return true;
    } else {
        console.log('  Result: WEAK PASSWORD');
        failures.forEach(f => console.log(`    Missing: ${f.message}`));
        return false;
    }
}

validatePassword('pass');
validatePassword('Pass123!');

// Rate limiting for login attempts
class RateLimiter {
    constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
        this.attempts = new Map();
        this.maxAttempts = maxAttempts;
        this.windowMs = windowMs;
    }
    
    isAllowed(identifier) {
        const now = Date.now();
        const userAttempts = this.attempts.get(identifier) || [];
        
        // Remove old attempts
        const recentAttempts = userAttempts.filter(time => 
            now - time < this.windowMs
        );
        
        if (recentAttempts.length >= this.maxAttempts) {
            console.log(`Rate limit exceeded for ${identifier}`);
            return false;
        }
        
        recentAttempts.push(now);
        this.attempts.set(identifier, recentAttempts);
        
        console.log(`Login attempt ${recentAttempts.length}/${this.maxAttempts} for ${identifier}`);
        return true;
    }
}

const limiter = new RateLimiter(3, 60000);

console.log("\nTesting rate limiter:");
limiter.isAllowed('user@example.com');
limiter.isAllowed('user@example.com');
limiter.isAllowed('user@example.com');
limiter.isAllowed('user@example.com');  // Blocked

console.log("\n=== 7. Content Security Policy (CSP) ===");

/*
 * Content-Security-Policy header example:
 * 
 * Content-Security-Policy:
 *   default-src 'self';
 *   script-src 'self' https://trusted-cdn.com;
 *   style-src 'self' 'unsafe-inline';
 *   img-src 'self' data: https:;
 *   font-src 'self' https://fonts.gstatic.com;
 *   connect-src 'self' https://api.example.com;
 *   frame-ancestors 'none';
 *   base-uri 'self';
 *   form-action 'self'
 * 
 * Benefits:
 * - Prevents XSS attacks
 * - Restricts resource loading
 * - Blocks inline scripts
 * - Prevents clickjacking
 */

console.log("CSP Example:");
console.log("  default-src 'self'");
console.log("  script-src 'self' https://trusted-cdn.com");
console.log("  Blocks: Inline scripts, untrusted domains");

console.log("\n=== 8. Secure Communication ===");

// HTTPS only
console.log("HTTPS Requirements:");
console.log("  ✓ Always use HTTPS in production");
console.log("  ✓ Redirect HTTP to HTTPS");
console.log("  ✓ Use HSTS header");
console.log("    Strict-Transport-Security: max-age=31536000");

// Secure fetch requests
function secureFetch(url, data) {
    /*
     * const response = await fetch(url, {
     *     method: 'POST',
     *     headers: {
     *         'Content-Type': 'application/json',
     *         'X-CSRF-Token': csrfToken,
     *         'Authorization': `Bearer ${accessToken}`
     *     },
     *     credentials: 'same-origin',  // or 'include'
     *     body: JSON.stringify(data)
     * });
     */
    
    console.log("\nSecure fetch configuration:");
    console.log("  ✓ CSRF token included");
    console.log("  ✓ Authorization header");
    console.log("  ✓ Credentials policy set");
    console.log("  ✓ JSON content type");
}

secureFetch('https://api.example.com/data', { key: 'value' });

console.log("\n=== 9. Error Handling ===");

// Don't expose sensitive information
function unsafeErrorHandler(error) {
    console.log("UNSAFE Error Handling:");
    console.log(`  Error: ${error.message}`);
    console.log(`  Stack: ${error.stack}`);
    console.log("  Risk: Exposes internal structure");
}

try {
    throw new Error("Database connection failed at 192.168.1.100:5432");
} catch (error) {
    unsafeErrorHandler(error);
}

// Safe error handling
function safeErrorHandler(error) {
    // Log detailed error server-side
    // logError(error);
    
    console.log("\nSAFE Error Handling:");
    console.log("  User message: 'An error occurred. Please try again.'");
    console.log("  Details logged server-side only");
}

try {
    throw new Error("Sensitive internal error");
} catch (error) {
    safeErrorHandler(error);
}

console.log("\n=== 10. Dependency Security ===");

/*
 * npm audit
 * - Checks for known vulnerabilities
 * - Updates vulnerable packages
 * 
 * Package verification:
 * - Use lock files (package-lock.json)
 * - Verify package integrity
 * - Review package permissions
 * - Monitor for malicious packages
 * 
 * Tools:
 * - npm audit
 * - Snyk
 * - OWASP Dependency-Check
 * - GitHub Dependabot
 */

console.log("Dependency Security:");
console.log("  ✓ Run npm audit regularly");
console.log("  ✓ Keep dependencies updated");
console.log("  ✓ Review package.json changes");
console.log("  ✓ Use security scanning tools");

console.log("\n=== Security Checklist ===");

const securityChecklist = [
    "✓ Sanitize all user input",
    "✓ Use parameterized queries",
    "✓ Implement CSRF protection",
    "✓ Use HttpOnly, Secure cookies",
    "✓ Enable Content Security Policy",
    "✓ Validate on client AND server",
    "✓ Use HTTPS everywhere",
    "✓ Implement rate limiting",
    "✓ Strong password requirements",
    "✓ Encrypt sensitive data",
    "✓ Don't expose errors to users",
    "✓ Keep dependencies updated",
    "✓ Use security headers",
    "✓ Implement proper authentication",
    "✓ Regular security audits"
];

console.log("\nSecurity Checklist:");
securityChecklist.forEach(item => console.log(`  ${item}`));

console.log("\n=== Security Headers ===");

/*
 * Essential security headers:
 * 
 * Strict-Transport-Security: max-age=31536000; includeSubDomains
 * - Forces HTTPS
 * 
 * X-Content-Type-Options: nosniff
 * - Prevents MIME sniffing
 * 
 * X-Frame-Options: DENY
 * - Prevents clickjacking
 * 
 * X-XSS-Protection: 1; mode=block
 * - Enables XSS filter
 * 
 * Referrer-Policy: strict-origin-when-cross-origin
 * - Controls referrer information
 * 
 * Permissions-Policy: geolocation=(), microphone=(), camera=()
 * - Controls browser features
 */

console.log("Security Headers:");
console.log("  Strict-Transport-Security");
console.log("  X-Content-Type-Options");
console.log("  X-Frame-Options");
console.log("  X-XSS-Protection");
console.log("  Referrer-Policy");
console.log("  Permissions-Policy");

/*
 * Sample Output:
 * === JavaScript Security Best Practices ===
 * 
 * === 1. XSS (Cross-Site Scripting) Prevention ===
 * UNSAFE: Direct HTML insertion
 *   Input: <script>alert("XSS")</script>
 *   Risk: Scripts can execute
 * 
 * SAFE: Escaped HTML
 *   Input: <script>alert("XSS")</script>
 *   Output: &lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;
 * 
 * [Additional output continues...]
 */
