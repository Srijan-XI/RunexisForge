# 🔬 Julia User Guide - Installation, Syntax & Fundamentals

This comprehensive guide covers everything you need to start programming in Julia for scientific computing and high-performance applications.

---

## 📦 Installation Guide

### Windows Installation

#### Method 1: Official Installer (Recommended)

1. Visit [JuliaLang.org/downloads](https://julialang.org/downloads/)
2. Download Windows installer (`.exe`)
3. Run installer and follow prompts
4. Add to PATH when prompted

```powershell
# Verify installation
julia --version
# julia version 1.10.0
```

#### Method 2: Windows Package Manager

```powershell
# Using winget
winget install julia -s msstore

# Using Chocolatey
choco install julia
```

---

### macOS Installation

#### Method 1: Official Installer

1. Download `.dmg` from [JuliaLang.org](https://julialang.org/downloads/)
2. Drag Julia to Applications
3. Add to PATH:

```bash
# Add to ~/.zshrc or ~/.bashrc
export PATH="$PATH:/Applications/Julia-1.10.app/Contents/Resources/julia/bin"
```

#### Method 2: Homebrew

```bash
brew install julia
```

---

### Linux Installation

#### Using Tarball (All Distributions)

```bash
# Download
wget https://julialang-s3.julialang.org/bin/linux/x64/1.10/julia-1.10.0-linux-x86_64.tar.gz

# Extract
tar zxvf julia-1.10.0-linux-x86_64.tar.gz

# Add to PATH (~/.bashrc or ~/.zshrc)
export PATH="$PATH:$HOME/julia-1.10.0/bin"

# Verify
julia --version
```

#### Package Managers

```bash
# Ubuntu (via PPA)
sudo add-apt-repository ppa:kelleyk/julia
sudo apt update
sudo apt install julia

# Fedora
sudo dnf install julia

# Arch Linux
sudo pacman -S julia
```

---

## 🎓 Julia Syntax Fundamentals

### 1. REPL (Read-Eval-Print Loop)

```bash
# Start Julia REPL
julia

julia> 1 + 1
2

julia> println("Hello, Julia!")
Hello, Julia!

# Exit
julia> exit()
```

**REPL Modes:**
- **Help mode**: Press `?`
- **Shell mode**: Press `;`
- **Package mode**: Press `]`

```julia
julia> ?  # Help mode
help?> sum

julia> ;  # Shell mode
shell> ls

julia> ]  # Package mode
pkg> add DataFrames
```

---

### 2. Variables and Types

```julia
# Dynamic typing with optional annotations
x = 10              # Int64
y = 3.14            # Float64
name = "Alice"      # String
active = true       # Bool

# Type annotations (optional but useful)
age::Int64 = 25
price::Float64 = 99.99

# Multiple assignment
a, b, c = 1, 2, 3

# Check types
typeof(x)           # Int64
isa(x, Integer)     # true
```

---

### 3. Numbers

```julia
# Integers
x = 42              # Int64
big_num = 10^100    # Uses BigInt automatically

# Floating point
pi_approx = 3.14159
scientific = 1.5e-10

# Rational numbers
frac = 1//3         # 1//3
float(frac)         # 0.333...

# Complex numbers
complex_num = 3 + 4im
abs(complex_num)    # 5.0

# Mathematical constants
π  # pi (type \pi<TAB>)
ℯ  # Euler's number

# Unicode math
α = 0.5  # Type \alpha<TAB>
β = 0.3  # Type \beta<TAB>
δ = α + β
```

---

### 4. Operators

```julia
# Arithmetic
10 + 5      # 15
10 - 5      # 5
10 * 5      # 50
10 / 5      # 2.0 (always Float)
10 ÷ 3      # 3 (integer division, \div<TAB>)
10 % 3      # 1 (modulo)
10 ^ 2      # 100 (power)

# Update operators
x = 5
x += 3      # x = 8
x *= 2      # x = 16

# Comparison
1 == 1      # true
1 != 2      # true
1 < 2       # true
1 ≤ 2       # true (\le<TAB>)
1 ≥ 0       # true (\ge<TAB>)

# Chained comparisons
1 < 2 < 3   # true

# Boolean
true && false   # false
true || false   # true
!true           # false
```

---

### 5. Strings

```julia
# String literals
str = "Hello, Julia!"
multiline = """
    This is a
    multiline string
    """

# String interpolation
name = "Alice"
age = 25
println("Name: $name, Age: $age")
println("Next year: $(age + 1)")

# Character (single quotes)
char = 'A'
typeof(char)    # Char

# String operations
length("hello")         # 5
uppercase("hello")      # "HELLO"
lowercase("HELLO")      # "hello"
reverse("hello")        # "olleh"

# Concatenation
"Hello" * " " * "World"  # "Hello World"
string("Hello", " ", "World")  # "Hello World"

# Substring
str = "Hello, World!"
str[1:5]        # "Hello" (1-indexed!)
str[8:end]      # "World!"

# Contains
occursin("World", str)  # true

# Split and join
words = split("one two three", " ")
join(words, "-")        # "one-two-three"
```

---

### 6. Collections

#### Arrays (1-Based Indexing!)

```julia
# Create array
numbers = [1, 2, 3, 4, 5]

# Access (1-indexed!)
numbers[1]      # 1 (first element!)
numbers[end]    # 5 (last element)
numbers[2:4]    # [2, 3, 4]

# Modify
numbers[1] = 10
push!(numbers, 6)       # Append
pop!(numbers)           # Remove last
pushfirst!(numbers, 0)  # Prepend

# Array operations
length(numbers)
isempty(numbers)
reverse(numbers)
sort(numbers)

# 2D arrays (matrices)
matrix = [1 2 3; 4 5 6; 7 8 9]
# 3×3 Matrix

matrix[1, 2]    # 2 (row 1, col 2)
matrix[2, :]    # [4, 5, 6] (row 2)
matrix[:, 3]    # [3, 6, 9] (column 3)

# Zeros, ones, fill
zeros(3, 3)     # 3×3 matrix of zeros
ones(2, 4)      # 2×4 matrix of ones
fill(7, 3)      # [7, 7, 7]

# Range
1:10            # Range object
collect(1:10)   # [1, 2, ..., 10]
1:2:10          # [1, 3, 5, 7, 9]
```

#### Tuples (Immutable)

```julia
# Create tuple
point = (3, 4)
person = ("Alice", 25, "Engineer")

# Access
point[1]        # 3
person[2]       # 25

# Named tuples
config = (host="localhost", port=8080, ssl=false)
config.host     # "localhost"
config.port     # 8080
```

#### Dictionaries

```julia
# Create dictionary
ages = Dict("Alice" => 25, "Bob" => 30, "Charlie" => 28)

# Access
ages["Alice"]   # 25

# Add/modify
ages["Diana"] = 22
ages["Alice"] = 26

# Check key
haskey(ages, "Alice")   # true

# Keys and values
keys(ages)
values(ages)

# Iterate
for (name, age) in ages
    println("$name is $age")
end

# Get with default
get(ages, "Eve", 0)     # 0 (default)
```

---

### 7. Control Flow

#### If-Else

```julia
x = 10

if x > 0
    println("Positive")
elseif x < 0
    println("Negative")
else
    println("Zero")
end

# Ternary operator
result = x > 0 ? "positive" : "not positive"
```

#### For Loops

```julia
# Iterate over range
for i in 1:5
    println(i)
end

# Iterate over array
fruits = ["apple", "banana", "orange"]
for fruit in fruits
    println(fruit)
end

# With index
for (i, fruit) in enumerate(fruits)
    println("$i: $fruit")
end

# Nested loops
for i in 1:3, j in 1:3
    println("($i, $j)")
end
```

#### While Loops

```julia
count = 0
while count < 5
    println(count)
    count += 1
end

# Break and continue
for i in 1:10
    if i == 5
        break
    end
    if i % 2 == 0
        continue
    end
    println(i)
end
```

---

### 8. Functions

#### Basic Functions

```julia
# Long form
function add(x, y)
    return x + y
end

# Short form (one-liner)
multiply(x, y) = x * y

# Anonymous function
square = x -> x^2

# Call functions
add(5, 3)           # 8
multiply(4, 5)      # 20
square(6)           # 36
```

#### Multiple Dispatch (Julia's Superpower!)

```julia
# Different implementations for different types
area(radius::Float64) = π * radius^2
area(length::Float64, width::Float64) = length * width

area(5.0)           # Circle: 78.54
area(4.0, 6.0)      # Rectangle: 24.0

# Julia chooses correct method based on ALL argument types
f(x::Int, y::Int) = "Both integers"
f(x::Float64, y::Float64) = "Both floats"
f(x::Int, y::Float64) = "Mixed types"

f(1, 2)             # "Both integers"
f(1.0, 2.0)         # "Both floats"
f(1, 2.0)           # "Mixed types"
```

#### Optional and Keyword Arguments

```julia
# Default arguments
function greet(name="World")
    println("Hello, $name!")
end

greet()             # "Hello, World!"
greet("Alice")      # "Hello, Alice!"

# Keyword arguments
function configure(; host="localhost", port=8080, debug=false)
    println("Host: $host, Port: $port, Debug: $debug")
end

configure()                     # Uses defaults
configure(port=3000)            # Override port
configure(debug=true, port=9000)
```

#### Variadic Functions

```julia
function sum_all(numbers...)
    total = 0
    for n in numbers
        total += n
    end
    return total
end

sum_all(1, 2, 3, 4, 5)  # 15
```

#### Return Multiple Values

```julia
function min_max(numbers)
    return minimum(numbers), maximum(numbers)
end

min_val, max_val = min_max([3, 1, 4, 1, 5, 9])
# min_val = 1, max_val = 9
```

---

### 9. Broadcasting (Vectorization)

```julia
# Apply function to each element
numbers = [1, 2, 3, 4, 5]

# Using dot syntax (broadcast)
numbers .+ 10       # [11, 12, 13, 14, 15]
numbers .* 2        # [2, 4, 6, 8, 10]
numbers .^ 2        # [1, 4, 9, 16, 25]

# Broadcast functions
sqrt.(numbers)      # [1.0, 1.414..., 1.732..., 2.0, 2.236...]

# Element-wise comparison
numbers .> 3        # [false, false, false, true, true]

# Combine arrays
a = [1, 2, 3]
b = [4, 5, 6]
a .+ b              # [5, 7, 9]
```

---

### 10. Comprehensions

```julia
# List comprehension
squares = [x^2 for x in 1:10]
# [1, 4, 9, ..., 100]

# With condition
evens = [x for x in 1:20 if x % 2 == 0]
# [2, 4, 6, ..., 20]

# Nested
pairs = [(x, y) for x in 1:3, y in 1:3]

# Dictionary comprehension
squares_dict = Dict(x => x^2 for x in 1:5)
# Dict(1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25)
```

---

### 11. Structs (Custom Types)

```julia
# Immutable struct
struct Point
    x::Float64
    y::Float64
end

p = Point(3.0, 4.0)
p.x             # 3.0
# p.x = 5.0     # Error! Immutable

# Mutable struct
mutable struct Person
    name::String
    age::Int
end

alice = Person("Alice", 25)
alice.age = 26  # OK, mutable

# Struct with methods
struct Circle
    radius::Float64
end

area(c::Circle) = π * c.radius^2
circumference(c::Circle) = 2π * c.radius

c = Circle(5.0)
area(c)         # 78.54
```

---

### 12. Modules and Packages

#### Create Module

```julia
module MyMath

export add, multiply  # Export these functions

add(x, y) = x + y
multiply(x, y) = x * y

# Private function (not exported)
helper(x) = x * 2

end  # module

# Use module
using MyMath
add(2, 3)       # 5

# Import specific functions
import MyMath: multiply
multiply(4, 5)  # 20
```

#### Package Management

```julia
# Enter package mode with ]
] add DataFrames
] add Plots
] add CSV

# In code
using DataFrames
using Plots

# Update packages
] update

# Remove package
] rm PackageName

# List installed
] status
```

---

### 13. File I/O

```julia
# Write file
open("data.txt", "w") do file
    write(file, "Hello, Julia!\n")
    write(file, "Line 2\n")
end

# Read file
content = read("data.txt", String)
println(content)

# Read lines
lines = readlines("data.txt")
for line in lines
    println(line)
end

# CSV/Data Files (with packages)
using CSV, DataFrames

# Read CSV
df = CSV.read("data.csv", DataFrame)

# Write CSV
CSV.write("output.csv", df)
```

---

### 14. Error Handling

```julia
# Try-catch
try
    result = 10 / 0
catch e
    println("Error occurred: $e")
end

# Specific error types
try
    # Some code
catch e
    if isa(e, DivideError)
        println("Division by zero!")
    else
        rethrow(e)
    end
end

# Finally block
try
    # Code
catch
    # Handle error
finally
    # Cleanup (always runs)
end
```

---

### 15. Linear Algebra (Julia's Strength!)

```julia
using LinearAlgebra

# Matrices
A = [1 2; 3 4]
B = [5 6; 7 8]

# Matrix multiplication
C = A * B

# Transpose
A'

# Determinant
det(A)

# Inverse
inv(A)

# Eigenvalues and eigenvectors
eigenvalues = eigvals(A)
eigenvectors = eigvecs(A)

# Solve linear system Ax = b
A = [3 2; 1 4]
b = [5; 6]
x = A \ b  # Solve for x

# Dot product
v1 = [1, 2, 3]
v2 = [4, 5, 6]
dot(v1, v2)  # 32
```

---

### 16. Performance Tips

```julia
# Type stability
function slow(x)
    result = 0  # Type can change
    for i in 1:x
        result += i
    end
    return result
end

function fast(x)
    result = 0.0  # Type stable
    for i in 1:x
        result += i
    end
    return result
end

# Benchmarking
using BenchmarkTools

@btime slow(1000)
@btime fast(1000)

# Pre-allocate arrays
# Slow
function slow_concat(n)
    result = []
    for i in 1:n
        push!(result, i)
    end
    return result
end

# Fast
function fast_preallocate(n)
    result = zeros(Int, n)
    for i in 1:n
        result[i] = i
    end
    return result
end
```

---

## 🛠️ Development Tools

### IDEs and Editors

**VS Code** (Recommended):
- Install "Julia" extension
- Integrated REPL
- Debugging support
- Plot pane

**Jupyter**:
```julia
] add IJulia
using IJulia
notebook()
```

**Juno** (Atom-based):
- Integrated IDE
- Being deprecated, use VS Code

---

## ✅ Best Practices

1. **Use multiple dispatch** - Define methods for different types
2. **Type-stable code** - Keep types consistent for performance
3. **Pre-allocate arrays** - Avoid growing arrays in loops
4. **Use @inbounds** - Skip bounds checking (when safe)
5. **Profile before optimizing** - Use `@time`, `@btime`
6. **Use `!` for mutating functions** - Convention: `push!`, `sort!`
7. **Vectorize with broadcasting** - Use `.` operator

---

## 📚 Next Steps

1. **DataFrames.jl** - Data manipulation
2. **Plots.jl / Makie.jl** - Visualization
3. **DifferentialEquations.jl** - Numerical methods
4. **Flux.jl** - Machine learning
5. **JuMP.jl** - Optimization

---

## 📖 Resources

- [Julia Documentation](https://docs.julialang.org/)
- [Julia Academy](https://juliaacademy.com/)
- [Think Julia](https://benlauwens.github.io/ThinkJulia.jl/)

---

**🔬 Happy Julia coding!**

*Last Updated: January 15, 2026*
