/*
 * Question 18 (Advanced): Regular Expressions
 * 
 * Write a JavaScript program that demonstrates:
 * - Creating regular expressions
 * - Pattern matching with test() and match()
 * - String methods with regex (search, replace, split)
 * - Regex flags and special characters
 * - Common regex patterns
 * 
 * Learning objectives:
 * - Use regular expressions for pattern matching
 * - Validate and parse text data
 * - Perform complex string operations
 */

console.log("=== Regular Expressions Overview ===");

console.log("\n=== Creating Regular Expressions ===");

// Literal notation
const regex1 = /hello/;
console.log("Literal regex:", regex1);

// Constructor
const regex2 = new RegExp('world');
console.log("Constructor regex:", regex2);

// With flags
const regex3 = /pattern/gi;  // g = global, i = case-insensitive
console.log("Regex with flags:", regex3);

console.log("\n=== Testing Patterns ===");

const pattern = /JavaScript/;
console.log("Test 'JavaScript':", pattern.test('JavaScript'));
console.log("Test 'javascript':", pattern.test('javascript'));

// Case-insensitive
const caseInsensitive = /javascript/i;
console.log("Case-insensitive test:", caseInsensitive.test('JavaScript'));

// Multiple possibilities
const multiPattern = /(cat|dog|bird)/;
console.log("Test 'cat':", multiPattern.test('I have a cat'));
console.log("Test 'fish':", multiPattern.test('I have a fish'));

console.log("\n=== Match Method ===");

const text = "The rain in Spain stays mainly in the plain";

// Simple match
const match1 = text.match(/ain/);
console.log("First match:", match1);
console.log("Matched text:", match1[0]);
console.log("Index:", match1.index);

// Global match
const match2 = text.match(/ain/g);
console.log("Global matches:", match2);

// Match with groups
const groupPattern = /(\w+)\s(\w+)/;
const groupMatch = "Hello World".match(groupPattern);
console.log("\nGroups:");
console.log("Full match:", groupMatch[0]);
console.log("Group 1:", groupMatch[1]);
console.log("Group 2:", groupMatch[2]);

console.log("\n=== Regex Flags ===");

/*
 * Common flags:
 * g - global (find all matches)
 * i - case-insensitive
 * m - multiline (^ and $ match line boundaries)
 * s - dotall (. matches newline)
 * u - unicode
 * y - sticky (match from lastIndex)
 */

const globalRegex = /a/g;
const str = "banana";
console.log("Global matches in 'banana':", str.match(globalRegex));

const multilineRegex = /^line/gm;
const multilineText = "line 1\nline 2\nline 3";
console.log("Multiline matches:", multilineText.match(multilineRegex));

console.log("\n=== Special Characters ===");

/*
 * . - Any character except newline
 * \d - Digit (0-9)
 * \D - Non-digit
 * \w - Word character (a-z, A-Z, 0-9, _)
 * \W - Non-word character
 * \s - Whitespace
 * \S - Non-whitespace
 * ^ - Start of string/line
 * $ - End of string/line
 * * - 0 or more
 * + - 1 or more
 * ? - 0 or 1
 * {n} - Exactly n
 * {n,} - n or more
 * {n,m} - Between n and m
 * [...] - Character class
 * [^...] - Negated character class
 * | - OR
 * () - Capturing group
 * (?:) - Non-capturing group
 */

// Digits
const digitPattern = /\d+/;
console.log("Match digits in 'abc123xyz':", 'abc123xyz'.match(digitPattern));

// Word characters
const wordPattern = /\w+/g;
console.log("Match words:", 'hello world 123'.match(wordPattern));

// Whitespace
const spacePattern = /\s+/g;
console.log("Match spaces:", 'a  b   c'.match(spacePattern));

console.log("\n=== Quantifiers ===");

const text2 = "color colour colouur";

console.log("Match 'colou?r':", text2.match(/colou?r/g));  // 0 or 1 'u'
console.log("Match 'colou*r':", text2.match(/colou*r/g));  // 0 or more 'u'
console.log("Match 'colou+r':", text2.match(/colou+r/g));  // 1 or more 'u'

const phonePattern = /\d{3}-\d{3}-\d{4}/;
console.log("\nPhone '555-123-4567':", phonePattern.test('555-123-4567'));
console.log("Phone '555-12-4567':", phonePattern.test('555-12-4567'));

console.log("\n=== Character Classes ===");

// [abc] - Match a, b, or c
const vowels = /[aeiou]/gi;
console.log("Find vowels:", 'hello'.match(vowels));

// [^abc] - Match anything except a, b, c
const notVowels = /[^aeiou]/gi;
console.log("Find consonants:", 'hello'.match(notVowels));

// [a-z] - Range
const lowercase = /[a-z]+/g;
console.log("Find lowercase:", 'Hello World 123'.match(lowercase));

// [0-9] - Digit range
const digits = /[0-9]+/g;
console.log("Find numbers:", 'abc123xyz456'.match(digits));

console.log("\n=== Anchors ===");

// ^ - Start of string
const startsWithHello = /^Hello/;
console.log("Starts with 'Hello':", startsWithHello.test('Hello World'));
console.log("Starts with 'Hello':", startsWithHello.test('Say Hello'));

// $ - End of string
const endsWithWorld = /World$/;
console.log("Ends with 'World':", endsWithWorld.test('Hello World'));
console.log("Ends with 'World':", endsWithWorld.test('World Hello'));

// Both
const exactMatch = /^Hello World$/;
console.log("Exact match:", exactMatch.test('Hello World'));

console.log("\n=== Groups and Capturing ===");

// Capturing groups
const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
const dateMatch = '2024-01-15'.match(datePattern);
console.log("Date parts:");
console.log("  Full:", dateMatch[0]);
console.log("  Year:", dateMatch[1]);
console.log("  Month:", dateMatch[2]);
console.log("  Day:", dateMatch[3]);

// Non-capturing groups (?:)
const nonCapturePattern = /(?:Mr|Mrs|Ms)\. (\w+)/;
const titleNameMatch = 'Mr. Smith'.match(nonCapturePattern);
console.log("\nNon-capturing group:");
console.log("  Full:", titleNameMatch[0]);
console.log("  Name:", titleNameMatch[1]);
console.log("  Groups:", titleNameMatch.length - 1);

// Named groups (?<name>)
const namedPattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const namedMatch = '2024-01-15'.match(namedPattern);
console.log("\nNamed groups:");
console.log("  Year:", namedMatch.groups.year);
console.log("  Month:", namedMatch.groups.month);
console.log("  Day:", namedMatch.groups.day);

console.log("\n=== String Methods with Regex ===");

// search() - returns index of first match
const searchText = "The quick brown fox";
console.log("Index of 'quick':", searchText.search(/quick/));
console.log("Index of 'slow':", searchText.search(/slow/));

// replace() - replace matches
const replaceText = "Hello World";
console.log("Replace 'World':", replaceText.replace(/World/, 'JavaScript'));

// Global replace
const replaceGlobal = "cat and dog and cat";
console.log("Replace all 'cat':", replaceGlobal.replace(/cat/g, 'animal'));

// Replace with function
const replaceFn = "John is 25 years old".replace(/\d+/, (match) => {
    return parseInt(match) + 1;
});
console.log("Increment age:", replaceFn);

// Replace with groups
const swapNames = "John Smith".replace(/(\w+)\s(\w+)/, "$2, $1");
console.log("Swap names:", swapNames);

// split() - split string
const splitText = "apple,banana,orange";
console.log("Split by comma:", splitText.split(/,/));

const splitWords = "one  two   three";
console.log("Split by spaces:", splitWords.split(/\s+/));

console.log("\n=== Lookahead and Lookbehind ===");

// Positive lookahead (?=)
const lookahead = /\d+(?= dollars)/;
console.log("Lookahead '100 dollars':", '100 dollars'.match(lookahead));

// Negative lookahead (?!)
const negativeLookahead = /\d+(?! dollars)/;
console.log("Negative lookahead '100 euros':", '100 euros'.match(negativeLookahead));

// Positive lookbehind (?<=)
const lookbehind = /(?<=\$)\d+/;
console.log("Lookbehind '$100':", '$100'.match(lookbehind));

// Negative lookbehind (?<!)
const negativeLookbehind = /(?<!\$)\d+/;
console.log("Negative lookbehind '100':", '100'.match(negativeLookbehind));

console.log("\n=== Common Patterns ===");

// Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("Valid email 'user@example.com':", emailPattern.test('user@example.com'));
console.log("Invalid email 'invalid.email':", emailPattern.test('invalid.email'));

// URL validation
const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
console.log("Valid URL:", urlPattern.test('https://example.com'));

// Phone number
const phoneRegex = /^(\d{3}[-.]?)?\d{3}[-.]?\d{4}$/;
console.log("Phone '555-123-4567':", phoneRegex.test('555-123-4567'));
console.log("Phone '5551234567':", phoneRegex.test('5551234567'));

// Postal code (US ZIP)
const zipPattern = /^\d{5}(-\d{4})?$/;
console.log("ZIP '12345':", zipPattern.test('12345'));
console.log("ZIP '12345-6789':", zipPattern.test('12345-6789'));

// Credit card (basic)
const ccPattern = /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/;
console.log("Card '1234-5678-9012-3456':", ccPattern.test('1234-5678-9012-3456'));

// Password strength
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
console.log("Strong 'Pass123!':", strongPassword.test('Pass123!'));
console.log("Weak 'password':", strongPassword.test('password'));

// Username
const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
console.log("Username 'john_doe':", usernamePattern.test('john_doe'));
console.log("Username 'jo':", usernamePattern.test('jo'));  // Too short

// Hexadecimal color
const colorPattern = /^#[0-9A-Fa-f]{6}$/;
console.log("Color '#FF5733':", colorPattern.test('#FF5733'));
console.log("Color '#GGG':", colorPattern.test('#GGG'));

console.log("\n=== Practical Examples ===");

// Example 1: Extract data
const dataText = "Name: John, Age: 30, City: New York";
const extractedName = dataText.match(/Name:\s*(\w+)/);
const extractedAge = dataText.match(/Age:\s*(\d+)/);
const extractedCity = dataText.match(/City:\s*([\w\s]+)/);

console.log("Extracted:");
console.log("  Name:", extractedName[1]);
console.log("  Age:", extractedAge[1]);
console.log("  City:", extractedCity[1]);

// Example 2: Validate form inputs
function validateForm(data) {
    const errors = [];
    
    if (!/^[a-zA-Z\s]{2,}$/.test(data.name)) {
        errors.push("Invalid name");
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("Invalid email");
    }
    
    if (!/^\d{10}$/.test(data.phone)) {
        errors.push("Invalid phone (10 digits required)");
    }
    
    return { valid: errors.length === 0, errors };
}

const result1 = validateForm({
    name: "John Doe",
    email: "john@example.com",
    phone: "5551234567"
});
console.log("\nForm validation 1:", result1);

const result2 = validateForm({
    name: "J",
    email: "invalid",
    phone: "123"
});
console.log("Form validation 2:", result2);

// Example 3: Parse and format
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phone;
}

console.log("\nFormatted phone:", formatPhoneNumber('5551234567'));
console.log("Formatted phone:", formatPhoneNumber('555-123-4567'));

// Example 4: Sanitize input
function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

console.log("\nSanitized:", sanitizeFilename("my file?.txt"));

// Example 5: Highlight text
function highlightText(text, pattern) {
    return text.replace(pattern, '<mark>$&</mark>');
}

console.log("\nHighlight:", highlightText('Hello World', /World/));

/*
 * Sample Output:
 * === Regular Expressions Overview ===
 * 
 * === Creating Regular Expressions ===
 * Literal regex: /hello/
 * Constructor regex: /world/
 * Regex with flags: /pattern/gi
 * 
 * === Testing Patterns ===
 * Test 'JavaScript': true
 * Test 'javascript': false
 * Case-insensitive test: true
 * Test 'cat': true
 * Test 'fish': false
 * 
 * [Additional output continues...]
 */
