--[[
  File: 01_hello_world.lua
  Description: Basic "Hello World" and print examples
  Topics: Print, comments, strings
]]--

-- Single-line comment
print("Hello, Lua!")

-- Multi-line comment
--[[
  This is a multi-line
  comment in Lua
]]--

-- Different ways to print
print("Simple string")
print('Single quotes work too')
print([[Multi-line
string with
[[double brackets]]]])

-- Multiple values
print("Name:", "Alice", "Age:", 25)

-- String concatenation
local greeting = "Hello"
local name = "World"
print(greeting .. ", " .. name .. "!")

-- Formatted output
local pi = 3.14159
print(string.format("Pi is approximately %.2f", pi))
