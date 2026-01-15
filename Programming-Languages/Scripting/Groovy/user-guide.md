# ☕ Groovy User Guide - Installation, Syntax & Fundamentals

This comprehensive guide covers everything you need to start programming in Groovy for JVM development, build automation, and testing.

---

## 📦 Installation Guide

### Windows Installation

#### Method 1: SDKMAN! (Recommended - Cross-platform)

```powershell
# Install SDKMAN (in Git Bash or WSL)
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Groovy
sdk install groovy

# Verify
groovy --version
```

#### Method 2: Chocolatey

```powershell
choco install groovy
```

#### Method 3: Manual Installation

1. Download from [Groovy.apache.org](https://groovy.apache.org/download.html)
2. Extract to `C:\Groovy`
3. Add `C:\Groovy\bin` to PATH
4. Verify: `groovy --version`

---

### macOS Installation

#### Method 1: SDKMAN! (Recommended)

```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Groovy
sdk install groovy
```

#### Method 2: Homebrew

```bash
brew install groovy
```

---

### Linux Installation

#### SDKMAN (All Distributions)

```bash
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install groovy
```

#### Package Managers

```bash
# Ubuntu/Debian
sudo apt install groovy

# Fedora
sudo dnf install groovy

# Arch
yay -S groovy
```

---

## 🎓 Groovy Syntax Fundamentals

### 1. Groovy Console and Shell

```bash
# Interactive shell
groovysh

# Run script
groovy script.groovy

# Groovy Console (GUI)
groovyConsole
```

---

### 2. Variables and Types

```groovy
// Dynamic typing with 'def'
def name = "Alice"    // Type inferred as String
def age = 25          // Integer
def price = 99.99     // BigDecimal

// Explicit typing
String city = "New York"
int count = 10
BigDecimal amount = 100.50

// No semicolons needed!
def x = 5
def y = 10

// Type coercion
def num = "42"
int value = num as int  // Convert to int
```

---

### 3. Strings and GStrings

```groovy
// Single quotes - regular String
def single = 'Hello'

// Double quotes - GString (interpolation)
def name = "Alice"
def greeting = "Hello, $name!"
println greeting  // "Hello, Alice!"

// Expression interpolation
def age = 25
println "Next year: ${age + 1}"

// Triple quotes - multiline
def multiline = """
    This is a
    multiline string
    """

// Slashy strings (for regex)
def pattern = /\d+\.\d+/

// String methods
"hello".toUpperCase()      // "HELLO"
"HELLO".toLowerCase()      // "hello"
"hello".capitalize()       // "Hello"
"hello world".split(" ")   // ["hello", "world"]
"hello".reverse()          // "olleh"
"hello".size()             // 5
```

---

### 4. Collections

#### Lists

```groovy
// Create list
def numbers = [1, 2, 3, 4, 5]

// Access
numbers[0]      // 1 (0-indexed)
numbers[-1]     // 5 (negative index from end)
numbers[1..3]   // [2, 3, 4] (range)

// Modify
numbers << 6          // Append (same as numbers.add(6))
numbers[0] = 10       // Modify
numbers.remove(2)     // Remove at index

// List methods
numbers.size()
numbers.isEmpty()
numbers.contains(3)
numbers.reverse()
numbers.sort()
numbers.unique()
```

#### Maps

```groovy
// Create map
def person = [
    name: "Bob",
    age: 30,
    city: "NYC"
]

// Access
person.name         // "Bob" (dot notation)
person['age']       // 30 (bracket notation)
person.job = "Engineer"  // Add new key

// Map methods
person.size()
person.containsKey('name')
person.keySet()
person.values()

// Iterate
person.each { key, value ->
    println "$key: $value"
}
```

#### Ranges

```groovy
// Inclusive range  
def range = 1..10
range.each { println it }

// Exclusive range
def exclusive = 1..<10  // 1 to 9

// Character range
('a'..'z').each { print it }

// Check membership
5 in 1..10  // true
```

---

### 5. Operators

```groovy
// Arithmetic (same as Java)
10 + 5, 10 - 5, 10 * 5, 10 / 5, 10 % 3, 10 ** 2  // Power

// Elvis operator (null coalescing)
def name = null
def displayName = name ?: "Guest"  // "Guest"

// Safe navigation operator
def obj = null
obj?.toString()  // null (no NullPointerException!)

// Spread operator
def list1 = [1, 2, 3]
def list2 = [4, 5, 6]
def combined = [*list1, *list2]  // [1, 2, 3, 4, 5, 6]

// Spaceship operator (comparison)
1 <=> 2   // -1
2 <=> 2   // 0
3 <=> 2   // 1

// Find operator
def text = "hello world"
def matcher = text =~ /\w+/  // Regex match

// Match operator
text ==~ /hello.*/  // true (exact match)
```

---

### 6. Control Structures

#### If-Else

```groovy
def age = 25

if (age >= 18) {
    println "Adult"
} else if (age >= 13) {
    println "Teen"
} else {
    println "Child"
}

// Ternary
def status = age >= 18 ? "Adult" : "Minor"

// Groovy truth (empty, null, zero are false)
if ("") println "Won't print"
if ([]) println "Won't print"
if (0) println "Won't print"
```

#### Switch (Enhanced!)

```groovy
def value = 5

switch(value) {
    case 0..10:
        println "0-10"
        break
    case [20, 30, 40]:
        println "20, 30, or 40"
        break
    case String:
        println "It's a string"
        break
    case { it > 100 }:
        println "Greater than 100"
        break
    default:
        println "Other"
}
```

#### Loops

```groovy
// For loop (classic)
for (int i = 0; i < 5; i++) {
    println i
}

// For-each
def fruits = ['apple', 'banana', 'orange']
for (fruit in fruits) {
    println fruit
}

// each method
fruits.each { println it }

// eachWithIndex
fruits.eachWithIndex { fruit, idx ->
    println "$idx: $fruit"
}

// While
def count = 0
while (count < 5) {
    println count
    count++
}

// Times
5.times { println "Hello" }

// upto/downto
1.upto(5) { println it }
5.downto(1) { println it }

// step
0.step(10, 2) { println it }  // 0, 2, 4, 6, 8
```

---

### 7. Closures (Powerful!)

```groovy
// Basic closure
def greet = { name ->
    "Hello, $name!"
}
println greet("Alice")

// No parameters (implicit 'it')
def square = { it * it }
println square(5)  // 25

// Multiple parameters
def add = { a, b -> a + b }
println add(5, 3)  // 8

// Closure as last parameter
def doTwice(Closure code) {
    code()
    code()
}

doTwice { println "Hello!" }

// Using 'it'
[1, 2, 3].each { println it * 2 }

// Closure with external variable
def multiplier = 2
def multiply = { it * multiplier }
println multiply(5)  // 10
```

---

### 8. Methods/Functions

```groovy
// Method definition
def add(a, b) {
    return a + b
}

// Return is optional (last expression returned)
def multiply(a, b) {
    a * b
}

// Default parameters
def greet(name = "World") {
    "Hello, $name!"
}

greet()          // "Hello, World!"
greet("Alice")   // "Hello, Alice!"

// Named parameters (using Map)
def createUser(Map params) {
    "User: ${params.name}, Age: ${params.age}"
}

createUser(name: "Bob", age: 30)

// Variable arguments
def sum(int... numbers) {
    numbers.sum()
}

sum(1, 2, 3, 4, 5)  // 15
```

---

### 9. Classes and Objects

```groovy
// Simple class
class Person {
    String name
    int age
    
    // Constructor (automatic for properties)
    
    // Method
    def greet() {
        "Hello, I'm $name"
    }
    
    // toString
    String toString() {
        "$name ($age)"
    }
}

// Create instance
def person = new Person(name: "Alice", age: 25)
println person        // Alice (25)
println person.greet()

// Getters/Setters auto-generated
person.name = "Bob"
println person.getName()

// Inheritance
class Employee extends Person {
    String company
    
    def work() {
        "$name works at $company"
    }
}

def emp = new Employee(name: "Charlie", age: 30, company: "TechCorp")
```

---

### 10. Collections Methods (Functional Style)

```groovy
def numbers = [1, 2, 3, 4, 5]

// collect (map)
def doubled = numbers.collect { it * 2 }  // [2, 4, 6, 8, 10]

// findAll (filter)
def evens = numbers.findAll { it % 2 == 0 }  // [2, 4]

// find (first match)
def firstEven = numbers.find { it % 2 == 0 }  // 2

// any
def hasEven = numbers.any { it % 2 == 0 }  // true

// every (all)
def allPositive = numbers.every { it > 0 }  // true

// sum
def total = numbers.sum()  // 15

// max/min
numbers.max()  // 5
numbers.min()  // 1

// groupBy
def people = [
    [name: "Alice", age: 25],
    [name: "Bob", age: 30],
    [name: "Charlie", age: 25]
]
def byAge = people.groupBy { it.age }
// [25: [[name: Alice, age: 25], [name: Charlie, age: 25]], 
//  30: [[name: Bob, age: 30]]]

// sort
numbers.sort()  // [1, 2, 3, 4, 5]
numbers.sort { a, b -> b <=> a }  // Descending
```

---

### 11. File I/O (Simplified!)

```groovy
// Write file
new File("data.txt").text = "Hello, Groovy!"

// Append
new File("data.txt") << "\nLine 2"

// Read file
def content = new File("data.txt").text
println content

// Read lines
new File("data.txt").eachLine { line ->
    println line
}

// Read as list
def lines = new File("data.txt").readLines()

// Write lines
new File("output.txt").withWriter { writer ->
    writer.writeLine("Line 1")
    writer.writeLine("Line 2")
}
```

---

### 12. Regular Expressions

```groovy
// Pattern matching
def text = "Email: john@example.com"

// Find operator
def matcher = text =~ /(\w+)@(\w+\.\w+)/
if (matcher.find()) {
    println "Email: ${matcher[0][0]}"
    println "User: ${matcher[0][1]}"
}

// Match operator (exact match)
text ==~ /Email:.*/  // true

// Replace
text.replaceAll(/\w+@\w+\.\w+/, "***@***.***")

// Split
"one,two,three".split(/,/)
```

---

### 13. Exception Handling

```groovy
try {
    def result = 10 / 0
} catch (ArithmeticException e) {
    println "Cannot divide by zero"
} catch (Exception e) {
    println "Error: ${e.message}"
} finally {
    println "Cleanup"
}

// Groovy-style (simpler)
def safeDivide(a, b) {
    try {
        a / b
    } catch (e) {
        null
    }
}
```

---

### 14. Metaprogramming Basics

```groovy
// Add methods at runtime
String.metaClass.shout = {
    delegate.toUpperCase() + "!"
}

println "hello".shout()  // "HELLO!"

// ExpandoMetaClass
class Person {
    String name
}

Person.metaClass.greet = {
    "Hello, I'm $name"
}

def p = new Person(name: "Alice")
println p.greet()

// Missing method handling
class Dynamic {
    def methodMissing(String name, args) {
        "Called $name with $args"
    }
}

def d = new Dynamic()
println d.anything(1, 2, 3)  // "Called anything with [1, 2, 3]"
```

---

### 15. Working with Java

```groovy
// Import Java classes
import java.util.Date
import java.nio.file.Files
import java.nio.file.Paths

// Use Java classes directly
def date = new Date()
println date

// Static imports
import static java.lang.Math.PI
println PI

// Java collections
def javaList = new ArrayList()
javaList.add("Groovy")
javaList.add("Java")

// Call Java methods
def path = Paths.get("file.txt")
def exists = Files.exists(path)
```

---

### 16. Gradle Build Script Basics

```groovy
// build.gradle

plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.commons:commons-lang3:3.12.0'
    testImplementation 'junit:junit:4.13.2'
}

application {
    mainClass = 'com.example.Main'
}

task hello {
    doLast {
        println 'Hello, Gradle!'
    }
}
```

---

### 17. Spock Testing (Brief Intro)

```groovy
// build.gradle
dependencies {
    testImplementation 'org.spockframework:spock-core:2.3-groovy-4.0'
}

// src/test/groovy/MathSpec.groovy
import spock.lang.Specification

class MathSpec extends Specification {
    
    def "addition works"() {
        expect:
        1 + 1 == 2
    }
    
    def "maximum of two numbers"() {
        expect:
        Math.max(a, b) == c
        
        where:
        a | b | c
        1 | 3 | 3
        7 | 4 | 7
        0 | 0 | 0
    }
}
```

---

## 🛠️ Development Tools

### IDEs

**IntelliJ IDEA** (Best):
- Built-in Groovy support
- Gradle integration
- Excellent autocompletion

**VS Code**:
- Install "Groovy Language Server" extension

**Eclipse**:
- Install Groovy plugin

---

### Build Tools

```bash
# Gradle wrapper
./gradlew build
./gradlew test
./gradlew run

# Direct groovy
groovy script.groovy
groovyc MyClass.groovy  # Compile
```

---

## ✅ Best Practices

1. **Use `def` for local variables** - Type inference
2. **Leverage closures** - More expressive than loops
3. **Use GStrings** - String interpolation
4. ** Elvis operator** - Null safety
5. **Safe navigation** - Avoid NPE
6. **Collection methods** - `collect`, `findAll`, etc.
7. **Groovy truth** - Leverage truthiness
8. **Keep scripts concise** - Groovy's strength

---

## 📚 Next Steps

1. **Gradle** - Build automation mastery
2. **Spock** - Advanced testing
3. **Grails** - Web framework
4. **Jenkins** - CI/CD pipelines
5. **Geb** - Browser automation

---

## 📖 Resources

- [Groovy Documentation](https://groovy-lang.org/documentation.html)
- [Gradle Guides](https://gradle.org/guides/)
- [Spock Framework](https://spockframework.org/)

---

**☕ Happy Groovy coding!**

*Last Updated: January 15, 2026*
