--[[
  File: 02_calculator.lua
  Description: Simple calculator demonstrating functions and control structures
  Topics: Functions, operators, input/output, control flow
]]--

-- Calculator module
local Calculator = {}

-- Addition
function Calculator.add(a, b)
  return a + b
end

-- Subtraction
function Calculator.subtract(a, b)
  return a - b
end

-- Multiplication
function Calculator.multiply(a, b)
  return a * b
end

-- Division with error handling
function Calculator.divide(a, b)
  if b == 0 then
    return nil, "Error: Division by zero"
  end
  return a / b
end

-- Power
function Calculator.power(base, exponent)
  return base ^ exponent
end

-- Modulo
function Calculator.modulo(a, b)
  return a % b
end

-- Square root
function Calculator.sqrt(n)
  return math.sqrt(n)
end

-- Factorial (recursive)
function Calculator.factorial(n)
  assert(n >= 0, "Factorial requires non-negative integer")
  if n == 0 or n == 1 then
    return 1
  end
  return n * Calculator.factorial(n - 1)
end

-- Is prime number
function Calculator.isPrime(n)
  if n < 2 then return false end
  if n == 2 then return true end
  if n % 2 == 0 then return false end
  
  for i = 3, math.sqrt(n), 2 do
    if n % i == 0 then
      return false
    end
  end
  return true
end

-- Demonstration
print("=== Lua Calculator ===\n")

-- Basic operations
print("Addition: 10 + 5 =", Calculator.add(10, 5))
print("Subtraction: 10 - 5 =", Calculator.subtract(10, 5))
print("Multiplication: 10 * 5 =", Calculator.multiply(10, 5))
print("Division: 10 / 5 =", Calculator.divide(10, 5))
print("Power: 2 ^ 8 =", Calculator.power(2, 8))
print("Modulo: 17 % 5 =", Calculator.modulo(17, 5))

-- Division by zero
local result, err = Calculator.divide(10, 0)
if err then
  print(err)
else
  print("Result:", result)
end

-- Advanced operations
print("\n=== Advanced Operations ===")
print("Square root of 144:", Calculator.sqrt(144))
print("Factorial of 5:", Calculator.factorial(5))
print("Is 17 prime?", Calculator.isPrime(17))
print("Is 18 prime?", Calculator.isPrime(18))

-- Table of squares
print("\n=== Squares Table ===")
for i = 1, 10 do
  print(string.format("%2d squared = %3d", i, i * i))
end

return Calculator
