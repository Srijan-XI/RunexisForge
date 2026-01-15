--[[
  File: 03_table_operations.lua
  Description: Comprehensive guide to Lua tables
  Topics: Arrays, dictionaries, mixed tables, iteration, table functions
]]--

print("=== Lua Tables Tutorial ===\n")

-- 1. ARRAYS (Lists) - 1-indexed!
print("1. Arrays (Lists)")
print("-" .. string.rep("-", 40))

local fruits = {"apple", "banana", "orange", "grape"}

print("First fruit:", fruits[1])  -- "apple" (NOT fruits[0]!)
print("Array length:", #fruits)

-- Add elements
table.insert(fruits, "mango")  -- Append to end
table.insert(fruits, 2, "kiwi") -- Insert at position 2

print("After insertions:", table.concat(fruits, ", "))

-- Remove elements
table.remove(fruits)     -- Remove last element
table.remove(fruits, 1)  -- Remove first element

print("After removals:", table.concat(fruits, ", "))

-- Iterate with ipairs (for arrays)
print("\nIterating with ipairs:")
for index, fruit in ipairs(fruits) do
  print("  " .. index .. ". " .. fruit)
end

-- 2. DICTIONARIES (Hash Maps)
print("\n2. Dictionaries (Hash Maps)")
print("-" .. string.rep("-", 40))

local person = {
  name = "Alice",
  age = 25,
  city = "New York",
  isStudent = false
}

-- Access values
print("Name:", person.name)        -- Dot notation
print("Age:", person["age"])       -- Bracket notation

-- Add/modify fields
person.job = "Engineer"
person["salary"] = 75000

-- Iterate with pairs (for dictionaries)
print("\nPerson details:")
for key, value in pairs(person) do
  print("  " .. key .. ":", value)
end

-- 3. NESTED TABLES
print("\n3. Nested Tables")
print("-" .. string.rep("-", 40))

local company = {
  name = "TechCorp",
  employees = {
    {name = "Alice", role = "Engineer"},
    {name = "Bob", role = "Designer"},
    {name = "Charlie", role = "Manager"}
  },
  founded = 2020
}

print("Company:", company.name)
print("Employees:")
for i, employee in ipairs(company.employees) do
  print(string.format("  %d. %s - %s", i, employee.name, employee.role))
end

-- 4. MIXED TABLES (Array + Dictionary)
print("\n4. Mixed Tables")
print("-" .. string.rep("-", 40))

local mixed = {
  "first element",   -- [1] = "first element"
  "second element",  -- [2] = "second element"
  name = "Mixed",    -- name = "Mixed"
  count = 42         -- count = 42
}

print("Array part:", mixed[1], mixed[2])
print("Dictionary part:", mixed.name, mixed.count)

-- 5. TABLE AS SET
print("\n5. Table as Set")
print("-" .. string.rep("-", 40))

local set = {}
local items = {"apple", "banana", "apple", "orange", "banana"}

-- Add to set (values become keys)
for _, item in ipairs(items) do
  set[item] = true
end

-- Check membership
print("Is 'apple' in set?", set["apple"])    -- true
print("Is 'grape' in set?", set["grape"])    -- nil (falsy)

-- Iterate over set
print("Unique items:")
for item in pairs(set) do
  print("  -", item)
end

-- 6. TABLE FUNCTIONS
print("\n6. Table Functions")
print("-" .. string.rep("-", 40))

local numbers = {5, 2, 9, 1, 7, 3}

-- Sort
table.sort(numbers)
print("Sorted:", table.concat(numbers, ", "))

-- Sort in reverse
table.sort(numbers, function(a, b) return a > b end)
print("Reverse sorted:", table.concat(numbers, ", "))

-- Custom sort (by length for strings)
local words = {"zebra", "cat", "elephant", "dog"}
table.sort(words, function(a, b) return #a < #b end)
print("Sorted by length:", table.concat(words, ", "))

-- 7. COPYING TABLES
print("\n7. Copying Tables")
print("-" .. string.rep("-", 40))

-- Shallow copy
function shallowCopy(original)
  local copy = {}
  for k, v in pairs(original) do
    copy[k] = v
  end
  return copy
end

local original = {a = 1, b = 2, c = 3}
local copy = shallowCopy(original)
copy.a = 999

print("Original.a:", original.a)  -- 1 (unchanged)
print("Copy.a:", copy.a)           -- 999

-- Deep copy (recursive)
function deepCopy(original)
  local copy = {}
  for k, v in pairs(original) do
    if type(v) == "table" then
      copy[k] = deepCopy(v)  -- Recursive copy
    else
      copy[k] = v
    end
  end
  return copy
end

-- 8. TABLE UTILITIES
print("\n8. Custom Table Utilities")
print("-" .. string.rep("-", 40))

-- Map function
function map(tbl, func)
  local result = {}
  for i, v in ipairs(tbl) do
    result[i] = func(v)
  end
  return result
end

local nums = {1, 2, 3, 4, 5}
local squared = map(nums, function(x) return x * x end)
print("Squared:", table.concat(squared, ", "))

-- Filter function
function filter(tbl, predicate)
  local result = {}
  for i, v in ipairs(tbl) do
    if predicate(v) then
      table.insert(result, v)
    end
  end
  return result
end

local even = filter(nums, function(x) return x % 2 == 0 end)
print("Even numbers:", table.concat(even, ", "))

-- Reduce function
function reduce(tbl, func, initial)
  local acc = initial
  for i, v in ipairs(tbl) do
    acc = func(acc, v)
  end
  return acc
end

local sum = reduce(nums, function(a, b) return a + b end, 0)
print("Sum:", sum)

-- 9. TABLE SERIALIZATION (Simple)
print("\n9. Table Serialization")
print("-" .. string.rep("-", 40))

function serialize(tbl, indent)
  indent = indent or 0
  local spacing = string.rep("  ", indent)
  local result = "{\n"
  
  for k, v in pairs(tbl) do
    result = result .. spacing .. "  "
    
    -- Key
    if type(k) == "string" then
      result = result .. k .. " = "
    else
      result = result .. "[" .. k .. "] = "
    end
    
    -- Value
    if type(v) == "table" then
      result = result .. serialize(v, indent + 1)
    elseif type(v) == "string" then
      result = result .. '"' .. v .. '"'
    else
      result = result .. tostring(v)
    end
    
    result = result .. ",\n"
  end
  
  result = result .. spacing .. "}"
  return result
end

local data = {
  name = "Config",
  version = 1.0,
  settings = {
    enabled = true,
    timeout = 30
  }
}

print("Serialized table:")
print(serialize(data))

print("\n=== End of Table Operations ===")
