# Lua

## Introduction

## 📘 What is Lua?

**Lua** (Portuguese for "moon") is a powerful, efficient, lightweight, embeddable scripting language. Created in 1993 by Roberto Ierusalimschy, Luiz Henrique de Figueiredo, and Waldemar Celes at the Pontifical Catholic University of Rio de Janeiro (PUC-Rio), Brazil, Lua has become one of the most popular embedded scripting languages in the world.

### **Etymology & History**

- **Name Origin**: "Lua" means "moon" in Portuguese
- **First Release**: 1993
- **Current Version**: Lua 5.4 (released June 2020)
- **License**: MIT License (free and open-source)
- **Creators**: Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo

### **Design Philosophy**

Lua was designed with three main goals:
1. **Simplicity**: Small footprint, simple syntax
2. **Efficiency**: Fast execution, low memory usage
3. **Portability**: Runs everywhere with minimal dependencies

---

## 🎯 Key Features

### 1. **Lightweight & Fast**
- **Tiny Footprint**: ~280 KB compiled size
- **Fast Execution**: JIT compilation available (LuaJIT)
- **Low Memory Usage**: Efficient for embedded systems
- **Quick Startup**: Minimal initialization time

### 2. **Embeddable**
- **Easy C/C++ Integration**: Simple API for embedding
- **Extend Applications**: Add scripting to any software
- **Bidirectional Calling**: C calls Lua, Lua calls C
- **Used Everywhere**: Game engines, applications, devices

### 3. **Simple Yet Powerful**
- **Clean Syntax**: Easy to learn and read
- **Dynamic Typing**: Flexible variable types
- **First-class Functions**: Functions as values
- **Automatic Memory Management**: Garbage collection

### 4. **Portable**
- **Cross-Platform**: Windows, Linux, macOS, embedded systems
- **ANSI C**: Compiles on any platform with C compiler
- **No Dependencies**: Standalone implementation
- **Consistent Behavior**: Works same everywhere

### 5. **Extensible**
- **Metatables**: Customize behavior of tables
- **Metamethods**: Operator overloading
- **Coroutines**: Cooperative multitasking
- **Modules**: Organize and reuse code

---

## 💡 What is Lua Used For?

### 1. **🎮 Game Development** (Most Popular Use)

Lua is the **#1 game scripting language** worldwide.

**Major Games Using Lua:**
- **World of Warcraft** - UI and addon scripting
- **Angry Birds** - Game logic
- **Roblox** - Entire platform scripted in Lua
- **League of Legends** - Game mechanics
- **Garry's Mod** - Mod development
- **CRYENGINE** - Game scripting
- **Grim Fandango** - Game logic

**Game Engines:**
- **LÖVE2D** - 2D game framework
- **Corona SDK** - Mobile game development
- **Defold** - Cross-platform engine
- **Roblox Studio** - 3D game creation
- **Pico-8** - Fantasy console

### 2. **⚙️ Embedded Systems**

**Why Embedded:**
- Minimal memory footprint
- No external dependencies
- Easy to integrate
- Fast execution

**Applications:**
- **IoT Devices** - NodeMCU, ESP8266
- **Routers/Networking** - OpenWrt firmware
- **Industrial Control** - Automation systems
- **Automotive** - Infotainment systems

### 3. **🌐 Web Development**

- **Nginx** - Lua scripting (OpenResty)
- **Redis** - Server-side scripting
- **Tarantool** - In-memory database
- **Lapis** - Web framework
- **Sailor** - MVC web framework

### 4. **🛠️ Application Scripting**

**Software Extending with Lua:**
- **Adobe Lightroom** - Photo editing scripts
- **VLC Media Player** - Extensions
- **Wireshark** - Network analysis scripts
- **Neovim** - Editor configuration and plugins
- **OBS Studio** - Streaming automation

### 5. **🤖 Automation & Testing**

- System administration scripts
- Test automation frameworks
- Configuration management
- Build systems

### 6. **📊 Data Processing**

- Log parsing and analysis
- Data transformation pipelines
- Real-time stream processing

---

## ⚖️ Advantages of Lua

### ✅ **1. Extremely Lightweight**
- Source code: ~30,000 lines of C
- Compiled size: ~280 KB
- Minimal RAM requirements
- Perfect for constrained environments

### ✅ **2. Blazing Fast**
- One of the fastest scripting languages
- **LuaJIT**: Near C performance with JIT compilation
- Efficient bytecode compilation
- Optimized VM implementation

### ✅ **3. Easy to Learn**
- Simple, clean syntax
- Small number of concepts
- Consistent design
- Excellent for beginners
- Comprehensive documentation

### ✅ **4. Highly Embeddable**
- Simple C API
- Minimal integration effort
- Clean separation from host application
- Stack-based communication
- Well-documented embedding process

### ✅ **5. Powerful Tables**
- Single data structure for everything
- Arrays, dictionaries, objects - all tables
- Metatables for customization
- Efficient implementation

### ✅ **6. First-Class Functions**
- Functions as variables
- Closures support
- Higher-order functions
- Functional programming patterns

### ✅ **7. Coroutines**
- Built-in cooperative multitasking
- Simple concurrency model
- No callback hell
- Easy async programming

### ✅ **8. Garbage Collection**
- Automatic memory management
- Incremental GC
- Configurable behavior
- No manual memory management

### ✅ **9. Cross-Platform**
- Runs on virtually any platform
- Consistent behavior everywhere
- ANSI C portability
- Embedded systems to servers

### ✅ **10. MIT License**
- Free and open-source
- Commercial use allowed
- No restrictions
- Large community support

---

## ⚠️ Disadvantages of Lua

### ❌ **1. Global Variables by Default**
```lua
-- Variables are global unless declared local
name = "John"  -- Global (bad practice)
local age = 25  -- Local (good practice)
```
- Easy to accidentally create globals
- Can lead to name collisions
- Requires discipline to use `local`

### ❌ **2. 1-Based Array Indexing**
```lua
local fruits = {"apple", "banana", "orange"}
print(fruits[1])  -- "apple" (not 0!)
```
- Arrays start at index 1, not 0
- Different from most programming languages
- Can be confusing for newcomers

### ❌ **3. Limited Standard Library**
- No built-in regex (patterns instead)
- No file system utilities
- No networking in standard library
- No date/time manipulation
- Requires external libraries for many tasks

### ❌ **4. Single Data Structure**
- Only tables for complex data
- No native arrays, dictionaries, or sets
- Everything built on tables
- Can be inefficient for certain use cases

### ❌ **5. Weak Type System**
- Dynamic typing only
- No static type checking
- Type errors discovered at runtime
- No IDE autocomplete for types

### ❌ **6. No Built-in OOP**
- No classes or inheritance by default
- Must implement OOP with metatables
- Multiple OOP approaches exist
- Can be confusing for beginners

### ❌ **7. Limited Error Messages**
- Sometimes cryptic error messages
- Stack traces can be unclear
- Debugging can be challenging
- No built-in debugger

### ❌ **8. Small Ecosystem (Compared to Python/JS)**
- Fewer third-party libraries
- Less community packages
- Smaller job market
- Fewer learning resources

### ❌ **9. Multiple Versions**
- Lua 5.1, 5.2, 5.3, 5.4 incompatibilities
- LuaJIT based on 5.1 (with extensions)
- Breaking changes between versions
- Library compatibility issues

### ❌ **10. No Native Threading**
- Single-threaded by default
- Coroutines, not true multithreading
- Must use C extensions for threads
- Lanes library required for parallelism

---

## 🆚 Lua vs Other Languages

### Lua vs Python
| Feature | Lua | Python |
|---------|-----|--------|
| **Performance** | ⚡ Faster (especially LuaJIT) | ✅ Fast enough |
| **Memory** | ⚡ Minimal (~1 MB) | ⚠️ Heavier (~10 MB+) |
| **Embeddability** | ⚡ Excellent | ✅ Possible but heavier |
| **Learning Curve** | ✅ Easier | ✅ Easy |
| **Ecosystem** | ⚠️ Smaller | ⚡ Massive |
| **Use Case** | Embedding, games | General-purpose, data science |

### Lua vs JavaScript
| Feature | Lua | JavaScript |
|---------|-----|------------|
| **Syntax** | ✅ Cleaner | ⚠️ More complex |
| **Performance** | ⚡ Faster | ✅ Fast (V8) |
| **Embedding** | ⚡ Excellent | ⚠️ Heavier (V8/Node) |
| **Async** | Coroutines | Promises/async-await |
| **Ecosystem** | ⚠️ Smaller | ⚡ Massive (npm) |
| **Use Case** | Games, embedded | Web, backend |

---

## 🚀 Popular Lua Implementations

### 1. **Standard Lua (PUC-Rio)**
- Official reference implementation
- Current: Lua 5.4
- Written in ANSI C
- ~20,000 lines of code

### 2. **LuaJIT**
- Just-In-Time compiler
- Based on Lua 5.1 (with extensions)
- **5-50x faster** than standard Lua
- Used in production (OpenResty, Nginx)
- **Most popular** for performance-critical apps

### 3. **MoonScript**
- Language that compiles to Lua
- CoffeeScript-inspired syntax
- Object-oriented features
- Cleaner syntax

### 4. **Fennel**
- Lisp that compiles to Lua
- Functional programming
- Macros and metaprogramming
- Used in Neovim configs

---

## 🎓 Who Should Learn Lua?

### ✅ **Perfect For:**
- **Game Developers** - #1 game scripting language
- **Embedded Developers** - IoT, routers, devices
- **Software Engineers** - Adding scripting to applications
- **Web Developers** - Nginx/OpenResty, Redis scripting
- **System Administrators** - Automation and scripting
- **Beginners** - Simple syntax, great first language

### 💡 **Consider Other Languages If:**
- You need extensive libraries (→ Python)
- Building web frontends (→ JavaScript)
- Data science and ML (→ Python, R)
- Enterprise applications (→ Java, C#)
- Mobile apps (→ Kotlin, Swift)

---

## 📊 Lua in the Industry

### **Market Presence**
- **Gaming Industry**: Dominant scripting language
- **Embedded Systems**: Widely used
- **Web Servers**: Growing (OpenResty)
- **General Software**: Niche but stable

### **Job Market**
- **High Demand**: Game development studios
- **Specialized**: Embedded systems
- **Niche**: Web development (OpenResty)
- **Salary**: Competitive in gaming sector

### **Major Companies Using Lua**
- Blizzard Entertainment (World of Warcraft)
- Riot Games (League of Legends)
- Roblox Corporation
- Adobe Systems
- Cloudflare (OpenResty/Nginx)

---

## 📚 Learning Resources

### Official Documentation
- [Official Lua Website](https://www.lua.org/)
- [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/)
- [Programming in Lua (Book)](https://www.lua.org/pil/)

### Interactive Learning
- [Learn Lua in 15 Minutes](https://learnxinyminutes.com/docs/lua/)
- [Codecademy Lua Course](https://www.codecademy.com/learn/learn-lua)
- [Lua Tutorial at TutorialsPoint](https://www.tutorialspoint.com/lua/)

### Game Development
- [LÖVE2D Framework](https://love2d.org/)
- [Roblox Developer Hub](https://developer.roblox.com/)
- [Defold Engine](https://defold.com/)

### Advanced Topics
- [LuaJIT Documentation](https://luajit.org/)
- [Lua Gems (Book)](http://www.lua.org/gems/)

---

## 🌟 Real-World Success Stories

### 1. **Roblox**
- Platform with 200+ million users
- Entirely scripted in Lua
- Empowered millions of creators
- Multi-billion dollar company

### 2. **World of Warcraft**
- Most successful MMORPG ever
- UI and addons in Lua
- Thriving modding community

### 3. **OpenResty/Nginx**
- Powers billions of requests daily
- Cloudflare, Alibaba, and more
- High-performance web applications
- Dynamic content generation

### 4. **Redis**
- In-memory database
- Server-side scripting in Lua
- Atomic operations
- Custom commands

---

## 🔮 Future of Lua

### **Strengths Moving Forward**
- Continued dominance in game scripting
- Growth in embedded/IoT space
- OpenResty adoption for web services
- Simple alternative to complex languages

### **Challenges**
- Competition from Python for scripting
- JavaScript ecosystem growth
- Need for better tooling
- Fragmentation (Lua 5.x vs LuaJIT)

### **Outlook**
- ✅ Stable niche in gaming
- ✅ Growing in embedded systems
- ✅ Expanding in web services
- ⚠️ Slow growth in general-purpose use

---

## ✅ Summary

### **Best Aspects**
- 🏆 Perfect for game scripting
- 🏆 Excellent for embedding
- 🏆 Lightweight and fast
- 🏆 Simple to learn
- 🏆 Great documentation

### **When to Choose Lua**
- ✅ Embedding scripting in applications
- ✅ Game development and modding
- ✅ Embedded systems and IoT
- ✅ High-performance web services (OpenResty)
- ✅ Learning programming fundamentals

### **When to Choose Alternatives**
- ❌ Large-scale enterprise applications → Java, C#
- ❌ Data science and ML → Python, R
- ❌ Web development → JavaScript/TypeScript
- ❌ Mobile development → Kotlin, Swift
- ❌ Need extensive libraries → Python

---

## 📖 Next Steps

Ready to start coding in Lua? Check out:
1. **User Guide** (section below) - Installation, syntax, basics
2. **[Game Scripting Guide](./game-scripting.md)** - LÖVE2D, game development
3. **[Embedding Guide](./embedded-guide.md)** - C/C++ integration
4. **[Code Examples](./examples/)** - Practical Lua programs

---

**🌙 "Lua: Small. Fast. Embeddable. Perfect."**

*Last Updated: January 15, 2026*

---

## User Guide

This comprehensive guide covers everything you need to start programming in Lua, from installation to advanced concepts.

---

## 📦 Installation Guide

### Windows Installation

#### Method 1: Official Binaries (Recommended for Beginners)

1. **Download Lua Binaries**
   - Visit: [LuaBinaries Downloads](http://luabinaries.sourceforge.net/download.html)
   - Download: `lua-5.4.6_Win64_bin.zip` (or latest version)

2. **Extract and Configure**
   ```powershell
   # Extract to C:\Lua
   # Add C:\Lua to system PATH
   ```

3. **Verify Installation**
   ```powershell
   lua -v
   # Expected: Lua 5.4.6  Copyright (C) 1994-2023 Lua.org, PUC-Rio
   ```

#### Method 2: LuaForWindows (All-in-One)

1. Download [LuaForWindows](https://github.com/rjpcomputing/luaforwindows/releases)
2. Run installer (includes Lua, LuaRocks, SciTE editor)
3. Verify: `lua -v`

**Includes:**
- Lua 5.1 interpreter
- LuaRocks package manager
- Common libraries
- SciTE text editor

#### Method 3: Chocolatey

```powershell
choco install lua
```

#### Method 4: Build from Source

```powershell
# Install MinGW or Visual Studio
# Download source from https://www.lua.org/download.html
# Extract and build
cd lua-5.4.6
mingw32-make mingw
```

---

### macOS Installation

#### Method 1: Homebrew (Recommended)

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Lua
brew install lua

# Verify
lua -v
```

#### Method 2: Official Source

```bash
curl -R -O http://www.lua.org/ftp/lua-5.4.6.tar.gz
tar zxf lua-5.4.6.tar.gz
cd lua-5.4.6
make macosx
sudo make install
```

---

### Linux Installation

#### Ubuntu/Debian

```bash
# Install from repositories (may be older version)
sudo apt update
sudo apt install lua5.4

# Verify
lua -v
```

#### Build from Source (Latest Version)

```bash
# Install build dependencies
sudo apt install build-essential libreadline-dev

# Download and extract
curl -R -O http://www.lua.org/ftp/lua-5.4.6.tar.gz
tar zxf lua-5.4.6.tar.gz
cd lua-5.4.6

# Build and install
make linux
sudo make install

# Verify
lua -v
```

#### Fedora/RHEL

```bash
sudo dnf install lua
```

#### Arch Linux

```bash
sudo pacman -S lua
```

---

### Installing LuaJIT (High Performance)

**LuaJIT** provides 5-50x performance improvement over standard Lua.

#### Windows
```powershell
choco install luajit
```

#### macOS
```bash
brew install luajit
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt install luajit

# Or build from source
git clone https://luajit.org/git/luajit.git
cd luajit
make && sudo make install
```

**Usage:**
```bash
luajit script.lua  # Instead of lua script.lua
```

---

## 🔧 Installing LuaRocks (Package Manager)

**LuaRocks** is Lua's package manager (like pip for Python, npm for Node.js).

### Windows
```powershell
# Included in LuaForWindows
# Or download from https://luarocks.org/
```

### macOS
```bash
brew install luarocks
```

### Linux
```bash
sudo apt install luarocks  # Ubuntu/Debian
sud dnf install luarocks   # Fedora
```

### Usage
```bash
# Install a package
luarocks install luasocket

# Search packages
luarocks search http

# List installed packages
luarocks list
```

---

## 🎓 Lua Syntax Fundamentals

### 1. Hello World

```lua
-- This is a comment
print("Hello, Lua!")

--[[
  This is a
  multi-line comment
]]--
```

**Run:**
```bash
lua hello.lua
# Output: Hello, Lua!
```

---

### 2. Variables and Data Types

#### Variable Declaration

```lua
-- Variables are global by default (BAD PRACTICE)
name = "Alice"  -- Global variable

-- Use 'local' for local scope (GOOD PRACTICE)
local age = 25
local height = 5.7
local isStudent = true
local nothing = nil  -- nil is Lua's null/None
```

⚠️ **Important:** Always use `local` unless you specifically need a global variable!

#### Data Types

Lua has 8 basic types:

```lua
-- 1. nil (represents absence of value)
local nothing = nil

-- 2. boolean
local isValid = true
local isReady = false

-- 3. number (all numbers are floating-point)
local integer = 42
local float = 3.14159
local scientific = 1.5e-10
local hex = 0xFF  -- 255

-- 4. string
local str1 = "Hello"
local str2 = 'World'
local multiline = [[
  This is a
  multi-line string
]]

-- 5. function
local function greet()
  print("Hello!")
end

-- 6. table (the only data structure in Lua)
local myTable = {1, 2, 3}

-- 7. userdata (C data)
-- 8. thread (for coroutines)
```

#### Check Type

```lua
local x = 42
print(type(x))  -- "number"

local name = "Lua"
print(type(name))  -- "string"
```

---

### 3. Operators

#### Arithmetic Operators

```lua
local a, b = 10, 3

print(a + b)   -- 13 (addition)
print(a - b)   -- 7  (subtraction)
print(a * b)   -- 30 (multiplication)
print(a / b)   -- 3.333... (division)
print(a % b)   -- 1  (modulo)
print(a ^ b)   -- 1000 (exponentiation)
print(-a)      -- -10 (negation)
print(a // b)  -- 3  (floor division) [Lua 5.3+]
```

#### Relational Operators

```lua
local x, y = 5, 10

print(x == y)  -- false (equal)
print(x ~= y)  -- true  (not equal)
print(x < y)   -- true  (less than)
print(x > y)   -- false (greater than)
print(x <= y)  -- true  (less than or equal)
print(x >= y)  -- false (greater than or equal)
```

#### Logical Operators

```lua
local t, f = true, false

print(t and f)   -- false
print(t or f)    -- true
print(not t)     -- false
```

**Short-circuit evaluation:**
```lua
local x = 5
local result = x > 0 and "positive" or "non-positive"
print(result)  -- "positive"
```

#### String Concatenation

```lua
local first = "Hello"
local last = "World"
print(first .. " " .. last)  -- "Hello World"

-- Concatenation with numbers
local age = 25
print("I am " .. age .. " years old")  -- "I am 25 years old"
```

---

### 4. Control Structures

#### If-Else Statements

```lua
local age = 18

if age >= 18 then
  print("Adult")
elseif age >= 13 then
  print("Teenager")
else
  print("Child")
end
```

**Truthy/Falsy Values:**
```lua
-- Only false and nil are falsy
-- Everything else (including 0 and "") is truthy!

if 0 then
  print("0 is truthy!")  -- This WILL print
end

if "" then
  print("Empty string is truthy!")  -- This WILL print
end

if nil then
  print("This won't print")
end
```

#### While Loops

```lua
local i = 1
while i <= 5 do
  print(i)
  i = i + 1
end
-- Output: 1 2 3 4 5
```

#### Repeat-Until Loops

```lua
local i = 1
repeat
  print(i)
  i = i + 1
until i > 5
-- Output: 1 2 3 4 5
```

#### For Loops

**Numeric For:**
```lua
-- for var = start, stop, step
for i = 1, 5 do
  print(i)
end
-- Output: 1 2 3 4 5

-- With step
for i = 10, 1, -2 do
  print(i)
end
-- Output: 10 8 6 4 2
```

**Generic For (Iterator):**
```lua
local fruits = {"apple", "banana", "orange"}

for index, value in ipairs(fruits) do
  print(index, value)
end
-- Output:
-- 1  apple
-- 2  banana
-- 3  orange
```

#### Break and Return

```lua
for i = 1, 10 do
  if i == 5 then
    break  -- Exit loop
  end
  print(i)
end
-- Output: 1 2 3 4
```

**No Continue:** Lua doesn't have `continue`, use conditions or `goto` (Lua 5.2+).

---

### 5. Functions

#### Function Declaration

```lua
-- Basic function
function greet()
  print("Hello!")
end

greet()  -- Call function

-- Function with parameters
function add(a, b)
  return a + b
end

local sum = add(5, 3)
print(sum)  -- 8
```

#### Multiple Return Values

```lua
function minMax(a, b, c)
  local min = math.min(a, b, c)
  local max = math.max(a, b, c)
  return min, max  -- Return multiple values
end

local minimum, maximum = minMax(5, 2, 9)
print(minimum, maximum)  -- 2  9
```

#### Anonymous Functions

```lua
local square = function(x)
  return x * x
end

print(square(5))  -- 25
```

#### Closures

```lua
function makeCounter()
  local count = 0  -- This variable is "captured"
  return function()
    count = count + 1
    return count
  end
end

local counter1 = makeCounter()
print(counter1())  -- 1
print(counter1())  -- 2
print(counter1())  -- 3

local counter2 = makeCounter()
print(counter2())  -- 1 (separate instance)
```

#### Variadic Functions

```lua
function sum(...)
  local args = {...}  -- Collect all arguments into a table
  local total = 0
  for i, v in ipairs(args) do
    total = total + v
  end
  return total
end

print(sum(1, 2, 3, 4, 5))  -- 15
```

---

### 6. Tables (Lua's Superpower)

Tables are the **only** data structure in Lua, but they're incredibly versatile!

#### Arrays (Lists)

```lua
-- 1-indexed arrays
local fruits = {"apple", "banana", "orange"}

print(fruits[1])  -- "apple" (NOT 0!)
print(fruits[2])  -- "banana"

-- Add elements
fruits[4] = "grape"
table.insert(fruits, "mango")  -- Append

-- Length
print(#fruits)  -- 5

-- Iterate
for i, fruit in ipairs(fruits) do
  print(i, fruit)
end
```

#### Dictionaries (Hash Maps)

```lua
local person = {
  name = "Alice",
  age = 25,
  city = "New York"
}

-- Access values
print(person.name)      -- "Alice"
print(person["age"])    -- 25

-- Add/modify
person.job = "Engineer"
person["salary"] = 75000

-- Iterate
for key, value in pairs(person) do
  print(key, value)
end
```

#### Mixed Tables

```lua
local mixed = {
  "first item",     -- [1] = "first item"
  "second item",    -- [2] = "second item"
  name = "Lua",     -- name = "Lua"
  version = 5.4     -- version = 5.4
}

print(mixed[1])        -- "first item"
print(mixed.name)      -- "Lua"
```

#### Table Functions

```lua
local colors = {"red", "green", "blue"}

-- Insert
table.insert(colors, "yellow")      -- Append
table.insert(colors, 2, "purple")   -- Insert at index 2

-- Remove
table.remove(colors)    -- Remove last
table.remove(colors, 1) -- Remove at index 1

-- Sort
local numbers = {5, 2, 9, 1, 7}
table.sort(numbers)
-- numbers is now {1, 2, 5, 7, 9}

-- Concatenate
local words = {"Hello", "Lua", "World"}
print(table.concat(words, " "))  -- "Hello Lua World"
```

---

### 7. Strings

#### String Methods

```lua
local str = "Hello, Lua!"

-- Length
print(#str)               -- 11
print(string.len(str))    -- 11

-- Upper/Lower case
print(string.upper(str))  -- "HELLO, LUA!"
print(string.lower(str))  -- "hello, lua!"

-- Substring
print(string.sub(str, 1, 5))  -- "Hello"
print(string.sub(str, -4))    -- "Lua!" (from end)

-- Find
local start, finish = string.find(str, "Lua")
print(start, finish)  -- 8  10

-- Replace
local new = string.gsub(str, "Lua", "World")
print(new)  -- "Hello, World!"

-- Repeat
print(string.rep("*", 5))  -- "*****"

-- Reverse
print(string.reverse("Lua"))  -- "auL"

-- Format (printf-style)
local name, age = "Alice", 25
print(string.format("Name: %s, Age: %d", name, age))
-- "Name: Alice, Age: 25"
```

#### Pattern Matching (Lua's Regex)

```lua
-- Find digits
local text = "Phone: 555-1234"
local number = string.match(text, "%d+%-?%d+")
print(number)  -- "555-1234"

-- Character classes:
-- %a - letters
-- %d - digits
-- %s - whitespace
-- %w - alphanumeric
-- %p - punctuation

-- Extract all words
local sentence = "Lua is awesome"
for word in string.gmatch(sentence, "%w+") do
  print(word)
end
-- Output: Lua is awesome
```

---

### 8. Metatables (Advanced)

Metatables allow you to change the behavior of tables.

#### Basic Metatable

```lua
local mytable = {}
local mymetatable = {}

setmetatable(mytable, mymetatable)
```

#### Arithmetic Metamethods

```lua
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
  local self = setmetatable({}, Vector)
  self.x = x
  self.y = y
  return self
end

function Vector.__add(a, b)
  return Vector.new(a.x + b.x, a.y + b.y)
end

local v1 = Vector.new(1, 2)
local v2 = Vector.new(3, 4)
local v3 = v1 + v2  -- Uses __add metamethod

print(v3.x, v3.y)  -- 4  6
```

#### Common Metamethods

```lua
__index    -- Table access (for missing keys)
__newindex -- Table assignment
__call     -- Make table callable like a function
__add      -- Addition operator
__sub      -- Subtraction
__mul      -- Multiplication
__div      -- Division
__mod      -- Modulo
__pow      -- Exponentiation
__unm      -- Negation
__concat   -- Concatenation
__eq       -- Equality
__lt       -- Less than
__le       -- Less than or equal
__tostring -- String conversion
```

---

### 9. Modules

#### Creating a Module

**mymodule.lua:**
```lua
local M = {}  -- Module table

function M.greet(name)
  return "Hello, " .. name
end

function M.add(a, b)
  return a + b
end

M.PI = 3.14159

return M
```

#### Using a Module

```lua
local mymodule = require("mymodule")

print(mymodule.greet("Lua"))  -- "Hello, Lua"
print(mymodule.add(5, 3))      -- 8
print(mymodule.PI)             -- 3.14159
```

---

### 10. File I/O

#### Reading Files

```lua
-- Read entire file
local file = io.open("data.txt", "r")
if file then
  local content = file:read("*all")
  file:close()
  print(content)
else
  print("File not found")
end

-- Read line by line
local file = io.open("data.txt", "r")
if file then
  for line in file:lines() do
    print(line)
  end
  file:close()
end
```

#### Writing Files

```lua
-- Write to file
local file = io.open("output.txt", "w")
file:write("Hello, Lua!\n")
file:write("Line 2\n")
file:close()

-- Append to file
local file = io.open("output.txt", "a")
file:write("Appended line\n")
file:close()
```

---

### 11. Error Handling

#### pcall (Protected Call)

```lua
function riskyFunction()
  error("Something went wrong!")
end

local success, err = pcall(riskyFunction)
if not success then
  print("Error:", err)
end
```

#### assert

```lua
local function divide(a, b)
  assert(b ~= 0, "Division by zero!")
  return a / b
end

local result = divide(10, 2)  -- OK
local result = divide(10, 0)  -- Error: Division by zero!
```

---

### 12. Coroutines

Coroutines enable cooperative multitasking.

```lua
local co = coroutine.create(function()
  for i = 1, 3 do
    print("Coroutine:", i)
    coroutine.yield()  -- Pause execution
  end
end)

coroutine.resume(co)  -- Coroutine: 1
coroutine.resume(co)  -- Coroutine: 2
coroutine.resume(co)  -- Coroutine: 3

print(coroutine.status(co))  -- dead
```

---

## 🛠️ Recommended Development Tools

### Text Editors & IDEs

1. **Visual Studio Code** (Most Popular)
   - Extensions: "Lua" by sumneko, "Lua Language Server"
   - Syntax highlighting, autocomplete, linting

2. **ZeroBrane Studio**
   - Lua-specific IDE
   - Built-in debugger
   - Free and lightweight

3. **IntelliJ IDEA / CLion** (JetBrains)
   - Lua plugin available
   - Professional features

4. **Neovim**
   - Can be configured in Lua
   - Excellent Lua support

5. **Sublime Text**
   - Lua syntax highlighting
   - Fast and lightweight

---

## ✅ Best Practices

### 1. Always Use `local`
```lua
-- BAD
name = "Alice"

-- GOOD
local name = "Alice"
```

### 2. Consistent Naming
```lua
local camelCase = true       -- Common in Lua
local snake_case = true      -- Also acceptable
local CONSTANT_VALUE = 42    -- For constants
```

### 3. Avoid Global Variables
```lua
-- BAD
function calculate()
  result = x + y  -- Accidentally global
end

-- GOOD
local function calculate(x, y)
  local result = x + y
  return result
end
```

### 4. Use Metatables for OOP
```lua
local Class = {}
Class.__index = Class

function Class.new()
  return setmetatable({}, Class)
end

function Class:method()
  -- Use self parameter
end
```

### 5. Error Handling
```lua
local success, result = pcall(riskyFunction)
if not success then
  print("Error:", result)
end
```

---

## 📚 Next Steps

1. **Practice**: Solve problems on [Exercism Lua Track](https://exercism.org/tracks/lua)
2. **Game Development**: Try [LÖVE2D](./game-scripting.md)
3. **Embedding**: Learn [C/C++ Integration](./embedded-guide.md)
4. **Examples**: Explore [Code Examples](./examples/)

---

## 📖 References

- [Official Lua Manual](https://www.lua.org/manual/5.4/)
- [Programming in Lua (Book)](https://www.lua.org/pil/)
- [Lua Users Wiki](http://lua-users.org/wiki/)
- [Learn X in Y Minutes - Lua](https://learnxinyminutes.com/docs/lua/)

---

**🌙 Happy Lua coding!**

*Last Updated: January 15, 2026*

