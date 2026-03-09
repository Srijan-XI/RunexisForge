# Elixir Hello World and Basics

# 1. Hello World
IO.puts("Hello, Elixir!")

# 2. Variables and basic types
name = "Alice"
age = 25
height = 5.7
is_student = true

IO.puts("Name: #{name}, Age: #{age}")

# 3. Pattern matching
{:ok, result} = {:ok, 42}
IO.puts("Result: #{result}")

# 4. Lists and operations
numbers = [1, 2, 3, 4, 5]
doubled = Enum.map(numbers, fn x -> x * 2 end)
IO.inspect(doubled, label: "Doubled")

# 5. Anonymous functions (using capture operator)
square = &(&1 * &1)
IO.puts("Square of 5: #{square.(5)}")

# 6. Pipe operator
result = [1, 2, 3, 4, 5]
|> Enum.map(&(&1 * 2))
|> Enum.filter(&(&1 > 5))
|> Enum.sum()

IO.puts("Pipe result: #{result}")

# 7. Atoms
status = :ok
error = :error

case status do
  :ok -> IO.puts("Success!")
  :error -> IO.puts("Failed!")
  _ -> IO.puts("Unknown")
end

# 8. Tuples
person = {"Alice", 25, "Engineer"}
{name, age, job} = person
IO.puts("#{name} is a #{job}")

# 9. Maps (dictionaries)
user = %{
  name: "Bob",
  age: 30,
  email: "bob@example.com"
}

IO.puts("User email: #{user.email}")
IO.puts("User age: #{user[:age]}")

# 10. Keyword lists
config = [host: "localhost", port: 8080, ssl: false]
IO.inspect(config, label: "Config")

# 11. String manipulation
greeting = "Hello, World!"
IO.puts(String.upcase(greeting))
IO.puts(String.downcase(greeting))
IO.puts(String.reverse(greeting))

# 12. Comprehensions
squares = for x <- 1..10, do: x * x
IO.inspect(squares, label: "Squares 1-10")

# 13. Conditional with cond
number = 42

cond do
  number < 0 -> IO.puts("Negative")
  number == 0 -> IO.puts("Zero")
  number > 0 -> IO.puts("Positive")
end

# 14. Module and function definition
defmodule Math do
  def add(a, b), do: a + b
  
  def multiply(a, b) do
    a * b
  end
  
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)
end

IO.puts("5 + 3 = #{Math.add(5, 3)}")
IO.puts("5 * 3 = #{Math.multiply(5, 3)}")
IO.puts("5! = #{Math.factorial(5)}")

# 15. Recursion example - sum list
defmodule ListOps do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end

IO.puts("Sum of [1,2,3,4,5]: #{ListOps.sum([1, 2, 3, 4, 5])}")

IO.puts("\n=== Elixir Basics Complete ===")
