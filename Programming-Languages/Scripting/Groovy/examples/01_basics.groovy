// Groovy Hello World and Basics

println "=== Groovy Basics ===\n"

// 1. Hello World
println "Hello, Groovy!"

// 2. Variables (def for dynamic, or specify type)
def name = "Alice"  // Type inferred
String city = "New York"  // Explicit type
int age = 25

println "Name: $name, Age: $age, City: $city"

// 3. GStrings (String interpolation)
println "Next year, $name will be ${age + 1}"

// 4. No semicolons needed!
def x = 5
def y = 10
def sum = x + y
println "Sum: $sum"

// 5. Lists
def numbers = [1, 2, 3, 4, 5]
println "List: $numbers"
println "First: ${numbers[0]}, Last: ${numbers[-1]}"

numbers << 6  // Append
println "After append: $numbers"

// 6. Maps (like HashMap)
def person = [
    name: "Bob",
    age: 30,
    job: "Engineer"
]

println "\nPerson: $person"
println "Name: ${person.name}"
println "Job: ${person['job']}"

// 7. Closures
def square = { x -> x * x }
println "\nSquare of 5: ${square(5)}"

def greet = { name -> "Hello, $name!" }
println greet("Groovy")

// 8. Collection methods
def nums = [1, 2, 3, 4, 5]

def doubled = nums.collect { it * 2 }
println "\nDoubled: $doubled"

def evens = nums.findAll { it % 2 == 0 }
println "Evens: $evens"

def total = nums.sum()
println "Sum: $total"

// 9. each iteration
println "\nNumbers:"
nums.each { println "  $it" }

// 10. Ranges
def range = 1..10
println "\nRange 1..10: $range"
println "As list: ${range.toList()}"

// 11. Functions/Methods
def add(a, b) {
    return a + b  // return optional for last statement
}

// Shorter version
def multiply(a, b) { a * b }

println "\n5 + 3 = ${add(5, 3)}"
println "5 * 3 = ${multiply(5, 3)}"

// 12. Default parameters
def greetPerson(name = "World") {
    "Hello, $name!"
}

println "\n${greetPerson()}"
println "${greetPerson('Alice')}"

// 13. Named parameters
def createUser(Map params) {
    "User: ${params.name}, Age: ${params.age}"
}

println "\n${createUser(name: 'Charlie', age: 28)}"

// 14. Optional typing - duck typing
def addThings(a, b) {
    a + b  // Works with numbers, strings, lists, etc!
}

println "\n${addThings(5, 3)}"
println "${addThings('Hello, ', 'World!')}"
println "${addThings([1, 2], [3, 4])}"

// 15. Elvis operator
def name1 = null
def name2 = "Alice"

println "\n${name1 ?: 'Default'}"  // Default
println "${name2 ?: 'Default'}"    // Alice

// 16. Safe navigation operator
def obj = null
println "Safe call: ${obj?.toString()}"  // null, no error

// 17. Spread operator
def list1 = [1, 2, 3]
def list2 = [4, 5, 6]
def combined = [*list1, *list2]
println "\nCombined: $combined"

// 18. Classes (simplified)
class Person {
    String name
    int age
    
    String toString() {
        "$name ($age)"
    }
    
    void celebrateBirthday() {
        age++
        println "$name is now $age!"
    }
}

def bob = new Person(name: "Bob", age: 30)
println "\n$bob"
bob.celebrateBirthday()

// 19. File operations (simple)
def file = new File("test.txt")
file.text = "Hello from Groovy!"
println "\nWrote to file: ${file.text}"

// 20. Try-catch
try {
    def result = 10 / 0
} catch (Exception e) {
    println "\nCaught error: ${e.message}"
}

// 21. Factorial (recursive)
def factorial(n) {
    n <= 1 ? 1 : n * factorial(n - 1)
}

println "\n5! = ${factorial(5)}"

// 22. List comprehension style
def squares = (1..10).collect { it * it }
println "Squares: $squares"

// 23. Switch statement (powerful in Groovy)
def checkValue(val) {
    switch(val) {
        case 0..10:
            return "Small"
        case [20, 30, 40]:
            return "Specific values"
        case String:
            return "It's a string: $val"
        case { it > 100 }:
            return "Large"
        default:
            return "Other"
    }
}

println "\n${checkValue(5)}"
println"${checkValue('Hello')}"
println "${checkValue(200)}"

// 24. Regular expressions (simplified)
def text = "Contact: john@example.com"
def matcher = text =~ /(\w+)@(\w+\.\w+)/
if (matcher.find()) {
    println "\nEmail found: ${matcher[0][0]}"
    println "Username: ${matcher[0][1]}"
}

// 25. Assert (great for testing)
assert 2 + 2 == 4
assert [1, 2, 3].size() == 3
println "\nAll assertions passed!"

// Cleanup
file.delete()

println "\n=== Groovy Basics Complete ==="
