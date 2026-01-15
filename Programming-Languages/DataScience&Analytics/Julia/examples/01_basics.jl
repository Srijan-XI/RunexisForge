# Julia Hello World and Basics

println("=== Julia Basics ===\n")

# 1. Hello World
println("Hello, Julia!")

# 2. Variables and types
name = "Alice"
age = 25
height = 5.7
is_student = true

println("Name: $name, Age: $age")
println("Type of age: $(typeof(age))")

# 3. Mathematical operations
a, b = 10, 3

println("\nArithmetic:")
println("$a + $b = $(a + b)")
println("$a - $b = $(a - b)")
println("$a * $b = $(a * b)")
println("$a / $b = $(a / b)")
println("$a ^ $b = $(a ^ b)")
println("$a ÷ $b = $(a ÷ b)")  # Integer division
println("$a % $b = $(a % b)")

# 4. Unicode variable names (Julia specialty!)
α = 0.5
β = 0.3
δ = α + β
println("\nα + β = δ: $α + $β = $δ")

# 5. Arrays (1-indexed!)
numbers = [1, 2, 3, 4, 5]
println("\nArray: $numbers")
println("First element: $(numbers[1])")  # 1-indexed!
println("Last element: $(numbers[end])")

# 6. Array operations
push!(numbers, 6)
println("After push: $numbers")

doubled = numbers .* 2  # Broadcasting
println("Doubled: $doubled")

# 7. Comprehensions
squares = [x^2 for x in 1:10]
println("\nSquares 1-10: $squares")

even_squares =[x^2 for x in 1:10 if x % 2 == 0]
println("Even squares: $even_squares")

# 8. Functions
function add(x, y)
    return x + y
end

# Short form
multiply(x, y) = x * y

# Anonymous function
square = x -> x^2

println("\n5 + 3 = $(add(5, 3))")
println("5 * 3 = $(multiply(5, 3))")
println("5² = $(square(5))")

# 9. Multiple dispatch example
area(radius::Float64) = π * radius^2
area(length::Float64, width::Float64) = length * width

println("\nCircle area (r=5): $(area(5.0))")
println("Rectangle area (4x6): $(area(4.0, 6.0))")

# 10. Factorial (recursion)
factorial(n) = n <= 1 ? 1 : n * factorial(n - 1)

println("\n5! = $(factorial(5))")

# 11. Fibonacci
function fibonacci(n)
    if n <= 2
        return 1
    else
        return fibonacci(n-1) + fibonacci(n-2)
    end
end

println("Fib(10) = $(fibonacci(10))")

# 12. Dictionaries
person = Dict(
    "name" => "Bob",
    "age" => 30,
    "job" => "Engineer"
)

println("\nPerson: $person")
println("Name: $(person["name"])")

# 13. Tuples
point = (3, 4)
x, y = point
distance = sqrt(x^2 + y^2)
println("\nPoint: $point, Distance from origin: $distance")

# 14. Ranges
println("\n1:5 as array: $(collect(1:5))")
println("1:2:10 (step 2): $(collect(1:2:10))")

# 15. String manipulation
text = "Hello, Julia!"
println("\nOriginal: $text")
println("Uppercase: $(uppercase(text))")
println("Lowercase: $(lowercase(text))")
println("Length: $(length(text))")

# 16. Type annotations (optional)
function typed_add(x::Int64, y::Int64)::Int64
    return x + y
end

println("\nTyped addition: $(typed_add(5, 3))")

# 17. Linear algebra (Julia specialty!)
using LinearAlgebra

A = [1 2; 3 4]
B = [5 6; 7 8]

println("\nMatrix A:")
display(A)

println("Matrix B:")
display(B)

C = A * B
println("A * B:")
display(C)

println("Determinant of A: $(det(A))")

# 18. Statistics
nums = rand(10)  # 10 random numbers
println("\nRandom numbers: $nums")
println("Mean: $(sum(nums) / length(nums))")
println("Max: $(maximum(nums))")
println("Min: $(minimum(nums))")

println("\n=== Julia Basics Complete ===")
