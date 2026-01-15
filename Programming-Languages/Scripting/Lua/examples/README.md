# Lua Code Examples

This directory contains practical Lua code examples demonstrating various concepts and use cases.

## 📚 Examples Overview

### 01_hello_world.lua
**Difficulty**: Beginner  
**Topics**: Print, comments, strings

Learn the basics of Lua output with various string types and formatting.

**Run:**
```bash
lua 01_hello_world.lua
```

---

### 02_calculator.lua
**Difficulty**: Beginner-Intermediate  
**Topics**: Functions, operators, error handling, recursion

A feature-rich calculator implementing basic and advanced mathematical operations including factorial and prime checking.

**Key Features:**
- Basic arithmetic operations
- Error handling for division by zero
- Recursive factorial calculation
- Prime number detection
- Square root calculation

**Run:**
```bash
lua 02_calculator.lua
```

---

### 03_table_operations.lua
**Difficulty**: Intermediate  
**Topics**: Tables, arrays, dictionaries, iteration, functional programming

Comprehensive guide to Lua tables covering arrays, dictionaries, nested structures, and functional programming utilities.

**Key Features:**
- Array operations (insert, remove, sort)
- Dictionary/hash map usage
- Nested table structures
- Table as sets
- Custom utilities (map, filter, reduce)
- Table serialization
- Copying (shallow and deep)

**Run:**
```bash
lua 03_table_operations.lua
```

---

### 04_oop_class_system.lua
**Difficulty**: Advanced  
**Topics**: OOP, classes, inheritance, metatables, design patterns

Demonstrates object-oriented programming in Lua using metatables and closures.

**Key Features:**
- Class creation with metatables
- Inheritance implementation
- Operator overloading (metamethods)
- Private members using closures
- Design patterns:
  - Factory pattern
  - Singleton pattern
  - Mixin pattern

**Run:**
```bash
lua 04_oop_class_system.lua
```

---

### 05_file_processing.lua
**Difficulty**: Intermediate-Advanced  
**Topics**: File I/O, CSV parsing, log analysis, data filtering

Complete file processing examples including CSV parsing, log file analysis, and data manipulation.

**Key Features:**
- Reading and writing files
- CSV file parsing
- Log file analysis
- Data filtering and grouping
- Word count utility
- Data export to custom formats

**Run:**
```bash
lua 05_file_processing.lua
```

---

## 🚀 Quick Start

### Prerequisites
- Lua 5.1+ installed (or LuaJIT)
- Basic command line knowledge

### Installation
1. Ensure Lua is installed:
   ```bash
   lua -v
   ```

2. Navigate to this directory:
   ```bash
   cd Programming-Languages/Scripting/Lua/examples
   ```

3. Run any example:
   ```bash
   lua 01_hello_world.lua
   ```

---

## 📖 Learning Path

**Recommended Order:**

1. **Start Here** → `01_hello_world.lua`
   - Basic output and strings
   - ~5 minutes

2. **Functions & Logic** → `02_calculator.lua`
   - Function creation
   - Control structures
   - Error handling
   - ~15 minutes

3. **Data Structures** → `03_table_operations.lua`
   - Lua's most important concept
   - Tables are everything in Lua
   - ~30 minutes

4. **Object-Oriented** → `04_oop_class_system.lua`
   - Classes and objects
   - Metatables in depth
   - Design patterns
   - ~45 minutes

5. **Real-World Application** → `05_file_processing.lua`
   - File I/O
   - Data parsing
   - Practical utilities
   - ~30 minutes

**Total Learning Time**: ~2 hours

---

## 💡 Tips for Learning

### 1. Run the Code
Don't just read—execute each example and observe the output.

### 2. Modify and Experiment
Change values, add features, break things and fix them!

### 3. Read Comments
Each file has detailed comments explaining the code.

### 4. Practice
After each example, try to implement something similar from scratch.

### 5. Refer to Documentation
- [Official Lua Manual](https://www.lua.org/manual/5.4/)
- [Programming in Lua](https://www.lua.org/pil/)

---

## 🔧 Common Issues

### Issue: `lua: command not found`
**Solution:** Lua is not installed or not in PATH.
```bash
# Install Lua (Ubuntu/Debian)
sudo apt install lua5.4

# Install Lua (macOS)
brew install lua
```

### Issue: Module errors
**Solution:** Ensure you're in the correct directory or use absolute paths.

### Issue: File not found (in file processing example)
**Solution:** The script creates its own files. Ensure you have write permissions in the directory.

---

## 📝 Additional Examples Ideas

Want more practice? Try implementing:

1. **Todo List Manager** - File-based task management
2. **Text Adventure Game** - Story-driven game with choices
3. **HTTP Client** - Using LuaSocket to make web requests
4. **JSON Parser** - Parse and generate JSON
5. **Web Server** - Simple HTTP server
6. **Password Generator** - Secure random password creation
7. **Markdown Parser** - Convert markdown to HTML
8. **Config File Reader** - INI/YAML-style configuration
9. **Unit Converter** - Temperature, distance, weight
10. **Cipher Tool** - Caesar/ROT13 encryption

---

## 🌟 Next Steps

After completing these examples:

1. **Build a Project**: Create something useful for yourself
2. **Game Development**: Try [LÖVE2D](https://love2d.org/) for 2D games
3. **Web Development**: Learn [OpenResty](https://openresty.org/) for high-performance web apps
4. **Embedded**: Use Lua in [NodeMCU](https://nodemcu.readthedocs.io/) for IoT projects
5. **Contributing**: Add to this collection or share your own examples!

---

## 🤝 Contributing

Have a great Lua example? Consider contributing:

1. Follow the existing code style
2. Add comprehensive comments
3. Include a description header
4. Test your code thoroughly
5. Update this README

---

## 📚 Resources

- [Lua Official Website](https://www.lua.org/)
- [Lua Users Wiki](http://lua-users.org/wiki/)
- [Learn Lua in 15 Minutes](https://learnxinyminutes.com/docs/lua/)
- [Lua Style Guide](https://github.com/luarocks/lua-style-guide)
- [Awesome Lua](https://github.com/LewisJEllis/awesome-lua) - Curated list of Lua resources

---

**Happy Coding! 🌙**

*Last Updated: January 15, 2026*
