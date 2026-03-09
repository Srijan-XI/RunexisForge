--[[
  File: 04_oop_class_system.lua
  Description: Object-Oriented Programming in Lua using metatables
  Topics: Classes, inheritance, methods, metamethods, encapsulation
]]--

print("=== Object-Oriented Programming in Lua ===\n")

-- 1. BASIC CLASS IMPLEMENTATION
print("1. Basic Class (Person)")
print("-" .. string.rep("-", 40))

-- Person class
local Person = {}
Person.__index = Person

-- Constructor
function Person.new(name, age)
  local self = setmetatable({}, Person)
  self.name = name
  self.age = age
  return self
end

-- Methods
function Person:greet()
  return "Hello, I'm " .. self.name
end

function Person:getName()
  return self.name
end

function Person:getAge()
  return self.age
end

function Person:haveBirthday()
  self.age = self.age + 1
  print(self.name .. " is now " .. self.age .. " years old!")
end

-- Usage
local person1 = Person.new("Alice", 25)
local person2 = Person.new("Bob", 30)

print(person1:greet())
print("Age:", person1:getAge())
person1:haveBirthday()

print(person2:greet())

-- 2. INHERITANCE
print("\n2. Inheritance (Student extends Person)")
print("-" .. string.rep("-", 40))

-- Student class (inherits from Person)
local Student = setmetatable({}, {__index = Person})
Student.__index = Student

-- Student constructor
function Student.new(name, age, major)
  local self = setmetatable(Person.new(name, age), Student)
  self.major = major
  self.grades = {}
  return self
end

-- Student-specific methods
function Student:getMajor()
  return self.major
end

function Student:addGrade(subject, grade)
  self.grades[subject] = grade
end

function Student:getGPA()
  local total = 0
  local count = 0
  for _, grade in pairs(self.grades) do
    total = total + grade
    count = count + 1
  end
  return count > 0 and (total / count) or 0
end

-- Override parent method
function Student:greet()
  return "Hi, I'm " .. self.name .. ", a " .. self.major .. " major"
end

-- Usage
local student = Student.new("Charlie", 20, "Computer Science")
print(student:greet())
student:addGrade("Math", 95)
student:addGrade("Programming", 98)
student:addGrade("Physics", 87)
print("GPA:", string.format("%.2f", student:getGPA()))
student:haveBirthday()  -- Inherited method

-- 3. METAMETHODS
print("\n3. Metamethods (Vector Class)")
print("-" .. string.rep("-", 40))

-- Vector class with operator overloading
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
  local self = setmetatable({}, Vector)
  self.x = x or 0
  self.y = y or 0
  return self
end

-- Addition operator
function Vector.__add(a, b)
  return Vector.new(a.x + b.x, a.y + b.y)
end

-- Subtraction operator
function Vector.__sub(a, b)
  return Vector.new(a.x - b.x, a.y - b.y)
end

-- Multiplication (scalar)
function Vector.__mul(a, scalar)
  if type(scalar) == "number" then
    return Vector.new(a.x * scalar, a.y * scalar)
  else
    return Vector.new(scalar.x * a, scalar.y * a)
  end
end

-- String representation
function Vector:__to string()
  return string.format("Vector(%.2f, %.2f)", self.x, self.y)
end

-- Equality
function Vector.__eq(a, b)
  return a.x == b.x and a.y == b.y
end

-- Methods
function Vector:magnitude()
  return math.sqrt(self.x * self.x + self.y * self.y)
end

function Vector:normalize()
  local mag = self:magnitude()
  return Vector.new(self.x / mag, self.y / mag)
end

function Vector:dot(other)
  return self.x * other.x + self.y * other.y
end

-- Usage
local v1 = Vector.new(3, 4)
local v2 = Vector.new(1, 2)

print("v1 =", tostring(v1))
print("v2 =", tostring(v2))
print("v1 + v2 =", tostring(v1 + v2))
print("v1 - v2 =", tostring(v1 - v2))
print("v1 * 2 =", tostring(v1 * 2))
print("Magnitude of v1:", v1:magnitude())
print("Dot product:", v1:dot(v2))

-- 4. PRIVATE MEMBERS (Closures)
print("\n4. Private Members using Closures")
print("-" .. string.rep("-", 40))

-- BankAccount with private balance
function createBankAccount(initialBalance)
  local balance = initialBalance or 0  -- Private variable
  
  local self = {}
  
  function self.deposit(amount)
    if amount > 0 then
      balance = balance + amount
      return true
    end
    return false
  end
  
  function self.withdraw(amount)
    if amount > 0 and amount <= balance then
      balance = balance - amount
      return true
    end
    return false
  end
  
  function self.getBalance()
    return balance
  end
  
  return self
end

-- Usage
local account = createBankAccount(1000)
print("Initial balance:", account.getBalance())
account.deposit(500)
print("After deposit:", account.getBalance())
account.withdraw(300)
print("After withdrawal:", account.getBalance())

-- Cannot access balance directly
print("Direct access to balance:", account.balance)  -- nil

-- 5. FACTORY PATTERN
print("\n5. Factory Pattern")
print("-" .. string.rep("-", 40))

-- Shape factory
local ShapeFactory = {}

function ShapeFactory.createCircle(radius)
  return {
    type = "Circle",
    radius = radius,
    area = function(self)
      return math.pi * self.radius * self.radius
    end,
    perimeter = function(self)
      return 2 * math.pi * self.radius
    end
  }
end

function ShapeFactory.createRectangle(width, height)
  return {
    type = "Rectangle",
    width = width,
    height = height,
    area = function(self)
      return self.width * self.height
    end,
    perimeter = function(self)
      return 2 * (self.width + self.height)
    end
  }
end

-- Usage
local circle = ShapeFactory.createCircle(5)
local rectangle = ShapeFactory.createRectangle(4, 6)

print(circle.type .. " - Area:", string.format("%.2f", circle:area()))
print(rectangle.type .. " - Area:", rectangle:area())

-- 6. SINGLETON PATTERN
print("\n6. Singleton Pattern")
print("-" .. string.rep("-", 40))

-- Config singleton
local Config = (function()
  local instance
  
  local function createInstance()
    return {
      settings = {},
      get = function(self, key)
        return self.settings[key]
      end,
      set = function(self, key, value)
        self.settings[key] = value
      end
    }
  end
  
  return {
    getInstance = function()
      if not instance then
        instance = createInstance()
      end
      return instance
    end
  }
end)()

-- Usage
local config1 = Config.getInstance()
local config2 = Config.getInstance()

config1:set("theme", "dark")
print("Config1 theme:", config1:get("theme"))
print("Config2 theme:", config2:get("theme"))  -- Same instance!

print("Same instance?", config1 == config2)  -- true

-- 7. MIXIN PATTERN
print("\n7. Mixin Pattern")
print("-" .. string.rep("-", 40))

-- Logging mixin
local LoggingMixin = {
  log = function(self, message)
    print("[" .. self.name .. "] " .. message)
  end
}

-- Apply mixin to class
function applyMixin(class, mixin)
  for k, v in pairs(mixin) do
    class[k] = v
  end
end

-- Create a class and add logging
local Task = {}
Task.__index = Task

function Task.new(name)
  local self = setmetatable({}, Task)
  self.name = name
  return self
end

applyMixin(Task, LoggingMixin)

-- Usage
local task = Task.new("DataProcessing")
task:log("Task started")
task:log("Processing...")
task:log("Task completed")

print("\n=== End of OOP Examples ===")
