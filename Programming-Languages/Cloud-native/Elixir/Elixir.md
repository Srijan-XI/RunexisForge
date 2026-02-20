# Elixir

## Introduction

## 📘 What is Elixir?

**Elixir** is a dynamic, functional programming language designed for building scalable and maintainable applications. Created by José Valim in 2011, Elixir runs on the **Erlang Virtual Machine (BEAM)**, inheriting decades of battle-tested reliability from the telecommunications industry.

### **History & Creator**

- **Created by**: José Valim (Ruby on Rails core team member)
- **First Release**: 2011
- **Current Version**: Elixir 1.16 (2024)
- **Inspiration**: Ruby syntax + Erlang/OTP power
- **License**: Apache License 2.0
- **Built on**: Erlang VM (BEAM) - 35+ years of production use

### **Why Was Elixir Created?**

José Valim created Elixir to address concurrency and scalability challenges he faced in Ruby while maintaining:
- **Developer productivity** (Ruby-like syntax)
- **Massive scalability** (Erlang OTP platform)
- **Fault tolerance** (Let it crash philosophy)
- **Distributed systems** (Built-in clustering)

---

## 🎯 Key Features

### 1. **Runs on Erlang VM (BEAM)**
- **35+ years** of production reliability
- Powers 40% of global telecommunications
- **"Nine nines" uptime** (99.9999999%)
- WhatsApp handles **2+ billion users** on Erlang/Elixir

### 2. **Massive Concurrency**
- **Millions of processes** on a single machine
- Lightweight processes (2KB each)
- **Actor model** for concurrency
- No shared memory, message passing only
- Preemptive scheduling

### 3. **Phoenix Framework**
- **Faster than Node.js** and Ruby on Rails
- **Phoenix LiveView** - Real-time UIs without JavaScript
- **WebSockets** built-in (Channels)
- Handles **2 million connections** on one server

### 4. **Fault Tolerance**
- **Supervisors** automatically restart failed processes
- **"Let it crash"** philosophy
- Self-healing systems
- Hot code swapping (update without downtime)

### 5. **Functional Programming**
- **Immutable data** by default
- **Pattern matching** everywhere
- **Pipe operator** for readable code
- First-class functions
- No objects or classes

### 6. **Metaprogramming**
- **Macros** for code generation
- **Compile-time** execution
- Extends language capabilities
- DSL creation support

### 7. **Tooling Excellence**
- **Mix** - Build tool and task runner
- **Hex** - Package manager
- **ExUnit** - Built-in testing framework
- **IEx** - Interactive shell with debugging
- **Dialyzer** - Static type analysis

### 8. **Distributed by Default**
- Node clustering built-in
- Location transparency
- Network-aware processes
- Easy horizontal scaling

---

## 💡 What is Elixir Used For?

### 1. **🌐 Web Development** (Most Popular)

**Phoenix Framework** - High-performance web apps

**Major Companies:**
- **Discord** - 5+ million concurrent users, 11 million messages/day
- **Pinterest** - Notification system (saves $2M/year)
- **Bleacher Report** - Real-time sports updates
- **Financial Times** - Content delivery
- **Moz** - SEO platform backend

**Why Phoenix?**
- 10-20x faster than Rails
- Real-time features out of the box
- LiveView eliminates need for React/Vue in many cases
- WebSocket support (Channels)

### 2. **🔄 Real-Time Systems**

- **Chat applications** (Discord, Slack alternatives)
- **Collaboration tools** (Google Docs-like)
- **Live dashboards** and monitoring
- **Gaming servers** (multiplayer backends)
- **Streaming platforms**

### 3. **💰 Fintech & Banking**

- **Nubank** - Largest digital bank in Brazil (70M+ customers)
- **Brex** - Corporate credit cards
- **TransferWise** - Money transfers
- **Trading platforms** - High-frequency trading
- **Payment processing** - Transaction pipelines

**Why Fintech Loves Elixir:**
- Fault tolerance for financial reliability
- Concurrency for high transaction volumes
- Supervision trees for safety
- Real-time processing

### 4. **🤖 IoT & Embedded Systems**

**Nerves Framework** - Elixir for embedded devices

- **IoT device management**
- **Smart home systems**
- **Industrial sensors**
- **Robotics**
- **Raspberry Pi projects**

### 5. **📊 Data Pipelines & Processing**

- **Real-time analytics**
- **Event streaming** (GenStage, Flow)
- **ETL pipelines**
- **Message queue processing**
- **Log aggregation**

### 6. **🎮 Gaming**

- **Multiplayer servers**
- **Game backends**
- **Matchmaking systems**
- **Leaderboards**
- **Chat systems**

### 7. **🚀 Microservices**

- **Service orchestration**
- **API gateways**
- **Background job processing**
- **Distributed systems**

---

## ⚖️ Advantages of Elixir

### ✅ **1. Unmatched Concurrency**
```elixir
# Spawn a million processes? No problem!
1..1_000_000 
|> Enum.map(fn i -> 
  spawn(fn -> :timer.sleep(10_000) end) 
end)
```
- Millions of concurrent processes
- Lightweight (2KB per process)
- True parallelism on multi-core

### ✅ **2. Fault Tolerance**
- Processes isolated from each other
- Supervisor trees auto-restart failures
- System stays online during partial failures
- Self-healing architecture

### ✅ **3. Scalability**
- **Vertical**: Millions of processes per machine
- **Horizontal**: Built-in clustering
- WhatsApp: 900M users on ~50 servers (before Facebook acquisition)

### ✅ **4. Developer Productivity**
- Ruby-like readable syntax
- Excellent documentation
- Great tooling (Mix, Hex, ExUnit)
- Fast development cycle
- Rich ecosystem

### ✅ **5. Real-Time Capabilities**
- WebSockets built-in
- Phoenix Channels
- LiveView for reactive UIs
- Presence tracking
- PubSub system

### ✅ **6. Reliability**
- Built on Erlang (35+ years in telecom)
- "Nine nines" uptime proven
- Hot code swapping
- No downtime deployments

### ✅ **7. Modern Language Features**
- Pattern matching
- Pipe operator
- Protocols (polymorphism)
- Macros for metaprogramming
- Immutable data structures

### ✅ **8. Excellent Community**
- Friendly and welcoming
- Great learning resources
- Active forums (Elixir Forum)
- Strong package ecosystem (Hex)

### ✅ **9. Performance**
- Faster than Ruby, Python, Node.js for concurrent workloads
- Efficient memory usage
- GC per process (not global)

### ✅ **10. Future-Proof**
- Growing adoption in enterprise
- Strong backing (Phoenix Dev Team, José Valim)
- Modern take on proven technology

---

## ⚠️ Disadvantages of Elixir

### ❌ **1. Smaller Ecosystem (vs Python/JS)**
- Fewer libraries than Python/JavaScript
- Some niche domains lack packages
- Newer framework = less mature tools
- May need to write custom solutions

### ❌ **2. Learning Curve**
- Functional programming paradigm shift
- OTP concepts (GenServer, Supervisors)
- Different mental model from OOP
- Pattern matching takes time to master

### ❌ **3. Not Ideal for CPU-Intensive Tasks**
- Better for I/O and concurrency
- Single-threaded process execution
- Python/C++ better for heavy computation
- Not ideal for machine learning training

### ❌ **4. Smaller Job Market**
- Fewer jobs than Java/Python/JavaScript
- Concentrated in specific industries (fintech, real-time)
- May require remote work
- Higher barrier to entry for companies

### ❌ **5. Memory Usage**
- Each process has overhead
- More memory than single-threaded apps
- Trade-off for fault tolerance
- Not ideal for memory-constrained environments

### ❌ **6. Deployment Complexity (Initially)**
- Mix releases learning curve
- Container strategies differ from Rails/Node
- Distributed systems complexity
- Requires understanding of OTP

### ❌ **7. Debugging Distributed Systems**
- Harder to debug than single-process apps
- Need to understand process model
- Tracing distributed calls complex
- Observer tools have learning curve

### ❌ **8. GUI Development**
- Not designed for desktop applications
- Limited GUI framework options
- Better suited for backend/web
- Use Electron + Elixir instead

### ❌ **9. Compile Times**
- Slower than interpreted languages during dev
- Large projects can take time to compile
- Not as bad as C++, but slower than Ruby

### ❌ **10. String Processing**
- Strings are UTF-8 binaries
- Different from most languages
- Pattern matching on strings verbose
- Regex performance not as fast as Perl

---

## 🆚 Elixir vs Other Languages

### Elixir vs Ruby
| Feature | Elixir | Ruby |
|---------|--------|------|
| **Performance** | ⚡ 10-20x faster | ✅ Good enough |
| **Concurrency** | ⚡ Millions of processes | ⚠️ Limited (threads) |
| **Syntax** | ✅ Inspired by Ruby | ⚡ Very clean |
| **Use Case** | Real-time, distributed | General web |
| **Community** | ✅ Growing | ⚡ Mature |

### Elixir vs Node.js
| Feature | Elixir | Node.js |
|---------|--------|---------|
| **Concurrency** | ⚡ True parallelism | ⚠️ Single-threaded |
| **Scalability** | ⚡ Millions of connections | ✅ Good |
| **Ecosystem** | ✅ Growing | ⚡ Massive (npm) |
| **Fault Tolerance** | ⚡ Built-in | ⚠️ Manual (PM2) |
| **Real-time** | ⚡ Native (Channels) | ✅ Socket.io |

### Elixir vs Go
| Feature | Elixir | Go |
|---------|--------|-----|
| **Concurrency** | Processes (BEAM) | Goroutines |
| **Fault Tolerance** | ⚡ Supervisors | ⚠️ Manual |
| **Syntax** | ✅ Expressive | ✅ Simple |
| **Performance** | ✅ Fast | ⚡ Very fast |
| **Use Case** | Web, real-time | Systems, tools |

---

## 🚀 Popular Elixir Projects

### **Phoenix Framework**
- Modern web framework
- 40,000+ GitHub stars
- Powers Discord, Pinterest

### **Nerves**
- Embedded systems platform
- Raspberry Pi, IoT devices
- Production-ready firmware

### **Ecto**
- Database wrapper and query DSL
- Type-safe queries
- Composable, not an ORM

### **Broadway**
- Concurrent data processing
- Event streaming
- ETL pipelines

### **Tesla**
- HTTP client library
- Middleware support
- Adapter-based

---

## 🎓 Who Should Learn Elixir?

### ✅ **Perfect For:**
- **Backend developers** (especially from Ruby background)
- **Real-time application builders** (chat, gaming, live updates)
- **Fintech engineers** (high reliability needs)
- **Distributed systems developers**
- **IoT/embedded programmers** (Nerves)
- **Anyone needing massive concurrency**

### 💡 **Consider Other Languages If:**
- Machine learning focus (→ Python)
- Mobile app development (→ Kotlin, Swift)
- Heavy CPU computation (→ C++, Rust)
- Enterprise with established JVM stack (→ Java, Kotlin)
- Need massive library ecosystem immediately (→ Python, JS)

---

##📊 Elixir in the Industry

### **Adoption Growth**
- 📈 **2023**: 4th most loved language (Stack Overflow)
- 💼 **Salary**: $120K-$180K+ (USA)
- 🏢 **Companies**: Discord, Pinterest, PepsiCo, Adobe, Spotify

### **Best Industries**
1. **Fintech** - Nubank, Brex, TransferWise
2. **Communication** - Discord, Bleacher Report
3. **E-commerce** - Shopify (parts)
4. **SaaS** - Many startups
5. **IoT** - Smart devices, robotics

---

## 📚 Learning Resources

### Official
- [Elixir Lang](https://elixir-lang.org/)
- [Elixir School](https://elixirschool.com/)
- [Phoenix Framework](https://phoenixframework.org/)

### Books
- "Programming Elixir" - Dave Thomas
- "Elixir in Action" - Saša Jurić
- "Phoenix in Action" - Geoffrey Lessel

### Interactive
- [Exercism Elixir Track](https://exercism.org/tracks/elixir)
- [Elixir Koans](http://elixirkoans.io/)

---

## 🌟 Success Stories

### **Discord**
- **5+ million concurrent users**
- **11+ million messages per day**
- Switched from Go to Elixir
- Handles massive real-time traffic

### **Pinterest**
- Notification system in Elixir
- **Saved $2M/year** in infrastructure costs
- Handles billions of events

### **WhatsApp**
- Built on Erlang (Elixir's foundation)
- **2+ billion users worldwide**
- 50-100 engineers supporting it

---

## 🔮 Future of Elixir

### **Strengths**
- ✅ Growing in fintech and real-time sectors
- ✅ Phoenix adoption increasing
- ✅ Excellent for microservices
- ✅ Machine learning coming (Nx, Axon)

### **Challenges**
- ⚠️ Competition from Go and Rust
- ⚠️ Need more enterprise adoption
- ⚠️ Growing but still niche

### **Outlook**: **🟢 Positive**
- Stable growth trajectory
- Strong community backing
- Best for real-time & distributed systems
- Increasingly production-ready

---

## ✅ Summary

### **Best For:**
- 🏆 Real-time web applications
- 🏆 High-concurrency systems
- 🏆 Fault-tolerant services
- 🏆 Distributed systems
- 🏆 Fintech platforms

### **When to Choose Elixir:**
- ✅ Building real-time features (chat, live updates)
- ✅ Need massive concurrency (100K+ connections)
- ✅ Require high reliability (fintech, health)
- ✅ Distributed systems architecture
- ✅ WebSocket-heavy applications

### **When to Skip:**
- ❌ Machine learning projects → Python
- ❌ Mobile apps → Kotlin, Swift
- ❌ Heavy CPU computation → C++, Rust
- ❌ Need huge library ecosystem → Python, JS
- ❌ Small CRUD app → Rails, Django sufficient

---

## User Guide

This comprehensive guide covers everything you need to start programming in Elixir, from installation to advanced concepts.

---

## 📦 Installation Guide

### Windows Installation

#### Method 1: Using Chocolatey (Recommended)

```powershell
# Install Chocolatey (if not installed)
# Then install Elixir
choco install elixir

# Verify installation
elixir --version
iex --version
```

#### Method 2: Official Installer

1. Download from [Elixir-Lang.org](https://elixir-lang.org/install.html#windows)
2. Install Erlang first (required dependency)
3. Install Elixir
4. Verify:
```powershell
elixir --version
# Elixir 1.16.0 (compiled with Erlang/OTP 26)
```

---

### macOS Installation

#### Method 1: Homebrew (Recommended)

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Elixir (includes Erlang)
brew install elixir

# Verify
elixir --version
```

#### Method 2: Using asdf (Version Manager)

```bash
# Install asdf
brew install asdf

# Add Erlang and Elixir plugins
asdf plugin add erlang
asdf plugin add elixir

# Install specific versions
asdf install erlang 26.2.1
asdf install elixir 1.16.0-otp-26

# Set global versions
asdf global erlang 26.2.1
asdf global elixir 1.16.0-otp-26
```

---

### Linux Installation

#### Ubuntu/Debian

```bash
# Add Erlang Solutions repository
wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb
sudo dpkg -i erlang-solutions_2.0_all.deb
sudo apt update

# Install Erlang and Elixir
sudo apt install esl-erlang elixir

# Verify
elixir --version
```

#### Fedora/RHEL

```bash
sudo dnf install elixir erlang
```

#### Arch Linux

```bash
sudo pacman -S elixir
```

---

## 🎓 Elixir Syntax Fundamentals

### 1. Interactive Shell (IEx)

```bash
# Start IEx
iex

# Basic operations
iex> 1 + 1
2

iex> "Hello" <> " " <> "Elixir"
"Hello Elixir"

# Exit IEx
iex> System.halt()
```

---

### 2. Basic Data Types

```elixir
# Integers
age = 25
hex = 0x1F
binary = 0b1010

# Floats
pi = 3.14
scientific = 1.0e-10

# Atoms (constants, like Ruby symbols)
status = :ok
error = :error
name = :alice

# Booleans (actually atoms!)
true  # same as :true
false # same as :false
nil   # same as :nil

# Strings (UTF-8 binaries)
greeting = "Hello, Elixir!"
multiline = """
This is a
multiline string
"""

# Check type
is_integer(42)      # true
is_float(3.14)      # true
is_atom(:ok)        # true
is_binary("hello")  # true
```

---

### 3. Pattern Matching (Core Feature!)

```elixir
# Assignment is actually pattern matching
x = 1  # Matches and binds x to 1

# Match tuples
{:ok, result} = {:ok, 42}
IO.puts(result)  # 42

# This would error (no match)
# {:ok, value} = {:error, "failed"}  # MatchError

# Match lists
[head | tail] = [1, 2, 3, 4]
IO.puts(head)      # 1
IO.inspect(tail)   # [2, 3, 4]

# Ignore values with _
{:ok, _} = {:ok, "don't care about this"}

# Pin operator ^ - use existing value
x = 1
^x = 1  # OK, matches
# ^x = 2  # Error, doesn't match

# Pattern match in function arguments
defmodule Example do
  def greet({:ok, name}), do: "Hello, #{name}!"
  def greet({:error, _}), do: "Error occurred"
end
```

---

### 4. Collections

#### Lists (Linked Lists)

```elixir
# Lists are linked lists, not arrays!
numbers = [1, 2, 3, 4, 5]

# Prepend (O(1) - fast!)
new_list = [0 | numbers]  # [0, 1, 2, 3, 4, 5]

# Concatenate
[1, 2] ++ [3, 4]  # [1, 2, 3, 4]

# Subtract
[1, 2, 3, 4] -- [2, 4]  # [1, 3]

# Head and tail
[head | tail] = [1, 2, 3]

# Length
length([1, 2, 3])  # 3

# Access (O(n) - slow for large lists!)
Enum.at([1, 2, 3], 1)  # 2
```

#### Tuples (Fixed-Size)

```elixir
# Tuples stored contiguously in memory
person = {"Alice", 25, :engineer}

# Access by index (0-based, O(1))
elem(person, 0)  # "Alice"
elem(person, 1)  # 25

# Size
tuple_size(person)  # 3

# Update (creates new tuple)
put_elem(person, 1, 26)  # {"Alice", 26, :engineer}

# Common pattern: {:ok, value} or {:error, reason}
{:ok, result} = {:ok, 42}
```

#### Keyword Lists

```elixir
# Lists of tuples with atom keys
options = [size: 10, color: :red, active: true]

# Same as
options = [{:size, 10}, {:color, :red}, {:active, true}]

# Access
options[:size]  # 10

# Used for function options
String.split("hello world", " ", trim: true)
```

#### Maps (Hash Maps)

```elixir
# Key-value store (any type as key)
user = %{name: "Alice", age: 25, email: "alice@example.com"}

# Access with atom keys
user.name  # "Alice"
user[:age] # 25

# String keys
config = %{"host" => "localhost", "port" => 8080}
config["host"]  # "localhost"

# Update (immutable - creates new map)
updated = %{user | age: 26}

# Add new key
Map.put(user, :city, "NYC")

# Pattern matching
%{name: name} = user
IO.puts(name)  # "Alice"
```

---

### 5. Operators

```elixir
# Arithmetic
10 + 5   # 15
10 - 5   # 5
10 * 5   # 50
10 / 5   # 2.0 (always float)
div(10, 3)  # 3 (integer division)
rem(10, 3)  # 1 (remainder)

# Comparison
1 == 1      # true
1 === 1.0   # false (strict equality)
1 != 2      # true
1 < 2       # true

# Boolean
true and false  # false
true or false   # true
not true        # false

# Short-circuit
true && false   # false
false || true   # true

# String concatenation
"Hello" <> " " <> "World"  # "Hello World"

# List concatenation/subtraction
[1, 2] ++ [3, 4]  # [1, 2, 3, 4]
[1, 2, 3] -- [2]  # [1, 3]

# In operator
1 in [1, 2, 3]  # true
```

---

### 6. Control Structures

#### Case

```elixir
case {1, 2, 3} do
  {1, x, 3} ->
    "Matched with x = #{x}"
  {1, 2, z} ->
    "Matched with z = #{z}"
  _ ->
    "No match"
end

# With guards
case 10 do
  x when x > 5 -> "Greater than 5"
  x when x < 5 -> "Less than 5"
  _ -> "Equal to 5"
end
```

#### Cond (Multiple Conditions)

```elixir
age = 25

cond do
  age < 13 -> "Child"
  age < 20 -> "Teenager"
  age < 65 -> "Adult"
  true -> "Senior"  # default case
end
```

#### If/Unless

```elixir
if 2 + 2 == 4 do
  "Math works!"
else
  "Something's wrong"
end

unless is_nil(value) do
  IO.puts("Value exists")
end
```

#### With (Error Handling Pipeline)

```elixir
with {:ok, file} <- File.read("config.json"),
     {:ok, data} <- Jason.decode(file),
     {:ok, value} <- Map.fetch(data, "key") do
  IO.puts("Success: #{value}")
else
  {:error, reason} -> IO.puts("Error: #{inspect(reason)}")
  :error -> IO.puts("Map key not found")
end
```

---

### 7. Functions

#### Anonymous Functions

```elixir
# Define
add = fn a, b -> a + b end

# Call with .
add.(5, 3)  # 8

# Short syntax
multiply = &(&1 * &2)
multiply.(4, 5)  # 20

# Pattern matching in anonymous functions
handle_result = fn
  {:ok, result} -> "Success: #{result}"
  {:error, reason} -> "Error: #{reason}"
end

handle_result.({:ok, 42})  # "Success: 42"
```

#### Named Functions (in Modules)

```elixir
defmodule Math do
  # Public function
  def add(a, b) do
    a + b
  end
  
  # One-liner
  def multiply(a, b), do: a * b
  
  # Private function
  defp helper(x), do: x * 2
  
  # Pattern matching
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)
  
  # Default arguments
  def greet(name \\ "World") do
    "Hello, #{name}!"
  end
  
  # Multiple return values
  def divide(a, b) when b != 0 do
    {:ok, a / b}
  end
  
  def divide(_, 0) do
    {:error, "Division by zero"}
  end
end

Math.add(5, 3)        # 8
Math.factorial(5)     # 120
Math.greet()          # "Hello, World!"
Math.greet("Alice")   # "Hello, Alice!"
```

---

### 8. Pipe Operator |> (Game Changer!)

```elixir
# Without pipe - hard to read
String.upcase(String.reverse(String.trim("  hello  ")))

# With pipe - reads like a story
"  hello  "
|> String.trim()
|> String.reverse()
|> String.upcase()
# "OLLEH"

# Example: Data transformation pipeline
[1, 2, 3, 4, 5, 6]
|> Enum.filter(&(rem(&1, 2) == 0))  # [2, 4, 6]
|> Enum.map(&(&1 * 2))               # [4, 8, 12]
|> Enum.sum()                        # 24
```

---

### 9. Enum Module (Work with Collections)

```elixir
# Map
Enum.map([1, 2, 3], fn x -> x * 2 end)  # [2, 4, 6]

# Filter
Enum.filter([1, 2, 3, 4], &(rem(&1, 2) == 0))  # [2, 4]

# Reduce
Enum.reduce([1, 2, 3, 4], 0, &+/2)  # 10

# Each (side effects)
Enum.each([1, 2, 3], &IO.puts/1)

# Find
Enum.find([1, 2, 3, 4], &(&1 > 2))  # 3

# Sort
Enum.sort([3, 1, 4, 2])  # [1, 2, 3, 4]

# Take
Enum.take([1, 2, 3, 4, 5], 3)  # [1, 2, 3]

# Zip
Enum.zip([1, 2], [:a, :b])  # [{1, :a}, {2, :b}]

# Any/All
Enum.any?([1, 2, 3], &(&1 > 2))   # true
Enum.all?([1, 2, 3], &(&1 > 0))   # true
```

---

### 10. Comprehensions

```elixir
# List comprehension
for x <- [1, 2, 3], do: x * 2
# [2, 4, 6]

# With filter
for x <- 1..10, rem(x, 2) == 0, do: x
# [2, 4, 6, 8, 10]

# Multiple generators
for x <- [1, 2], y <- [:a, :b], do: {x, y}
# [{1, :a}, {1, :b}, {2, :a}, {2, :b}]

# Into a map
for {k, v} <- %{a: 1, b: 2}, into: %{}, do: {k, v * 2}
# %{a: 2, b: 4}
```

---

### 11. Modules and Structs

#### Modules

```elixir
defmodule User do
  # Module attribute (compile-time constant)
  @default_role :guest
  
  # Struct definition
  defstruct name: "", age: 0, role: @default_role
  
  # Function
  def new(name, age) do
    %User{name: name, age: age}
  end
  
  def admin?(user) do
    user.role == :admin
  end
end

# Create struct
user = %User{name: "Alice", age: 25}

# Update
admin = %{user | role: :admin}

# Pattern match
%User{name: name} = user
```

---

### 12. Processes (Concurrency!)

```elixir
# Spawn a process
pid = spawn(fn -> IO.puts("Hello from process!") end)

# Send message
send(pid, {:hello, "world"})

# Receive message
receive do
  {:hello, msg} -> IO.puts("Received: #{msg}")
after
  1000 -> IO.puts("Timeout")
end

# Example: Simple counter process
defmodule Counter do
  def start do
    spawn(fn -> loop(0) end)
  end
  
  defp loop(count) do
    receive do
      :increment -> loop(count + 1)
      {:get, caller} ->
        send(caller, count)
        loop(count)
    end
  end
end

# Usage
counter = Counter.start()
send(counter, :increment)
send(counter, {:get, self()})

receive do
  count -> IO.puts("Count: #{count}")
end
```

---

### 13. Error Handling

```elixir
# Try/Rescue
try do
  raise "Something went wrong!"
rescue
  e in RuntimeError -> IO.puts("Error: #{e.message}")
end

# Try/Catch (for throws)
try do
  throw(:error)
catch
  :error -> IO.puts("Caught throw")
end

# Try/After (cleanup)
try do
  File.read!("file.txt")
after
  IO.puts("This always runs")
end

# Common pattern: {:ok, value} | {:error, reason}
case File.read("file.txt") do
  {:ok, content} -> IO.puts(content)
  {:error, reason} -> IO.puts("Error: #{reason}")
end
```

---

### 14. Mix - Build Tool

```bash
# Create new project
mix new my_app

# Create new app with supervisor
mix new my_app --sup

# Compile
mix compile

# Run
mix run

# Interactive shell with project
iex -S mix

# Run tests
mix test

# Generate documentation
mix docs

# Format code
mix format

# Get dependencies
mix deps.get
```

---

### 15. Testing with ExUnit

```elixir
# test/math_test.exs
defmodule MathTest do
  use ExUnit.Case
  
  test "addition works" do
    assert Math.add(2, 3) == 5
  end
  
  test "factorial of 5" do
    assert Math.factorial(5) == 120
  end
  
  test "division by zero returns error" do
    assert Math.divide(10, 0) == {:error, "Division by zero"}
  end
end
```

---

## 🛠️ Development Tools

### 1. IDEs and Editors

**VS Code** (Most Popular):
- Install "ElixirLS" extension
- Syntax highlighting
- Autocomplete
- Inline documentation
- Debugging support

**IntelliJ IDEA / RubyMine**:
- Install "Elixir" plugin by JetBrains

**Emacs**:
- alchemist.el package

**Vim**:
- vim-elixir plugin

---

### 2. Essential Tools

```bash
# IEx helpers
iex> h Enum.map  # Help for function
iex> i "hello"   # Info about value
iex> c "file.ex" # Compile file

# Mix tasks
mix help         # List all tasks
mix hex.info pkg # Package info
mix deps.tree    # Dependency tree
```

---

## ✅ Best Practices

### 1. Use Pattern Matching
```elixir
# Good
def process({:ok, data}), do: transform(data)
def process({:error, _}), do: nil

# Not as good
def process(result) do
  if elem(result, 0) == :ok do
    transform(elem(result, 1))
  end
end
```

### 2. Embrace Immutability
```elixir
# Data is immutable
list = [1, 2, 3]
new_list = [0 | list]  # Creates new list
# list is still [1, 2, 3]
```

### 3. Use Pipe Operator
```elixir
# Chain transformations
data
|> parse()
|> validate()
|> save()
```

### 4. Leverage Pattern Matching in Functions
```elixir
def sum([]), do: 0
def sum([h | t]), do: h + sum(t)
```

### 5. Use Guards
```elixir
def positive?(x) when x > 0, do: true
def positive?(_), do: false
```

---

## 📚 Next Steps

1. **Learn OTP**: GenServer, Supervisors, Applications
2. **Phoenix Framework**: Web development
3. **Ecto**: Database wrapper
4. **LiveView**: Real-time UIs
5. **Nerves**: Embedded systems

---

## 📖 Resources

- [Elixir School](https://elixirschool.com/)
- [Exercism Elixir Track](https://exercism.org/tracks/elixir)
- [Phoenix Framework](https://phoenixframework.org/)

---

**💧 Happy Elixir coding!**

*Last Updated: January 15, 2026*

