--[[
  File: 05_file_processing.lua
  Description: File I/O, text processing, and data parsing
  Topics: File reading/writing, CSV parsing, JSON-like format, log analysis
]]--

print("=== File Processing in Lua ===\n")

-- 1. WRITE TO FILE
print("1. Writing to Files")
print("-" .. string.rep("-", 40))

-- Write simple text file
function writeTextFile(filename, content)
  local file, err = io.open(filename, "w")
  if not file then
    return false, "Cannot create file: " .. err
  end
  
  file:write(content)
  file:close()
  return true
end

-- Create sample data file
local sampleData = [[Name,Age,City,Job
Alice,25,New York,Engineer
Bob,30,San Francisco,Designer
Charlie,28,Boston,Manager
Diana,22,Seattle,Developer
Eve,35,Austin,Analyst]]

writeTextFile("data.csv", sampleData)
print("✓ Created data.csv")

-- 2. READ FROM FILE
print("\n2. Reading from Files")
print("-" .. string.rep("-", 40))

-- Read entire file
function readEntireFile(filename)
  local file, err = io.open(filename, "r")
  if not file then
    return nil, "Cannot open file: " .. err
  end
  
  local content = file:read("*all")
  file:close()
  return content
end

local content = readEntireFile("data.csv")
if content then
  print("File contents (first 100 chars):")
  print(content:sub(1, 100) .. "...")
end

-- Read line by line
function readFileLines(filename)
  local lines = {}
  local file = io.open(filename, "r")
  
  if file then
    for line in file:lines() do
      table.insert(lines, line)
    end
    file:close()
  end
  
  return lines
end

local lines = readFileLines("data.csv")
print("\nTotal lines:", #lines)

-- 3. CSV PARSING
print("\n3. CSV Parsing")
print("-" .. string.rep("-", 40))

-- Parse CSV line
function parseCSVLine(line)
  local fields = {}
  local pos = 1
  
  while pos <= #line do
    local value = ""
    
    -- Handle quoted fields
    if line:sub(pos, pos) == '"' then
      pos = pos + 1
      while pos <= #line do
        if line:sub(pos, pos) == '"' then
          if line:sub(pos + 1, pos + 1) == '"' then
            value = value .. '"'
            pos = pos + 2
          else
            pos = pos + 1
            break
          end
        else
          value = value .. line:sub(pos, pos)
          pos = pos + 1
        end
      end
    else
      -- Simple field
      local endPos = line:find(",", pos) or (#line + 1)
      value = line:sub(pos, endPos - 1)
      pos = endPos
    end
    
    table.insert(fields, value)
    
    if line:sub(pos, pos) == "," then
      pos = pos + 1
    else
      break
    end
  end
  
  return fields
end

-- Parse CSV file
function parseCSVFile(filename)
  local lines = readFileLines(filename)
  if #lines == 0 then
    return nil
  end
  
  local headers = parseCSVLine(lines[1])
  local data = {}
  
  for i = 2, #lines do
    local values = parseCSVLine(lines[i])
    local row = {}
    
    for j, header in ipairs(headers) do
      row[header] = values[j]
    end
    
    table.insert(data, row)
  end
  
  return data, headers
end

local employees, headers = parseCSVFile("data.csv")

print("Parsed " .. #employees .. " employees:")
for i, emp in ipairs(employees) do
  print(string.format("  %d. %s (%s) - %s, %s", 
    i, emp.Name, emp.Age, emp.Job, emp.City))
end

-- 4. DATA FILTERING AND ANALYSIS
print("\n4. Data Analysis")
print("-" .. string.rep("-", 40))

-- Filter employees by age
function filterByAge(employees, minAge, maxAge)
  local result = {}
  for _, emp in ipairs(employees) do
    local age = tonumber(emp.Age)
    if age >= minAge and age <= maxAge then
      table.insert(result, emp)
    end
  end
  return result
end

local youngEmployees = filterByAge(employees, 20, 27)
print("Employees aged 20-27:")
for _, emp in ipairs(youngEmployees) do
  print("  - " .. emp.Name .. " (" .. emp.Age .. ")")
end

-- Average age
function calculateAverageAge(employees)
  local total = 0
  for _, emp in ipairs(employees) do
    total = total + tonumber(emp.Age)
  end
  return total / #employees
end

print("\nAverage age:", string.format("%.1f", calculateAverageAge(employees)))

-- Group by city
function groupByCity(employees)
  local groups = {}
  for _, emp in ipairs(employees) do
    local city = emp.City
    if not groups[city] then
      groups[city] = {}
    end
    table.insert(groups[city], emp)
  end
  return groups
end

local byCity = groupByCity(employees)
print("\nEmployees by city:")
for city, emps in pairs(byCity) do
  print("  " .. city .. ": " .. #emps .. " employee(s)")
end

-- 5. LOG FILE ANALYSIS
print("\n5. Log File Analysis")
print("-" .. string.rep("-", 40))

-- Create sample log file
local logData = [[2026-01-15 10:00:00 INFO Application started
2026-01-15 10:00:15 DEBUG Loading configuration
2026-01-15 10:00:20 INFO Database connected
2026-01-15 10:01:00 WARNING High memory usage: 85%
2026-01-15 10:02:30 ERROR Failed to process request
2026-01-15 10:02:31 DEBUG Retrying operation
2026-01-15 10:02:35 INFO Request processed successfully
2026-01-15 10:05:00 WARNING Connection timeout
2026-01-15 10:05:10 ERROR Database connection lost]]

writeTextFile("application.log", logData)
print("✓ Created application.log")

-- Parse log entry
function parseLogEntry(line)
  local date, time, level, message = line:match("(%d+%-%d+%-%d+) (%d+:%d+:%d+) (%w+) (.+)")
  
  if date then
    return {
      date = date,
      time = time,
      level = level,
      message = message,
      raw = line
    }
  end
  
  return nil
end

-- Analyze log file
function analyzeLogFile(filename)
  local lines = readFileLines(filename)
  local stats = {
    total = 0,
    byLevel = {},
    errors = {},
    warnings = {}
  }
  
  for _, line in ipairs(lines) do
    local entry = parseLogEntry(line)
    if entry then
      stats.total = stats.total + 1
      
      -- Count by level
      stats.byLevel[entry.level] = (stats.byLevel[entry.level] or 0) + 1
      
      -- Collect errors and warnings
      if entry.level == "ERROR" then
        table.insert(stats.errors, entry)
      elseif entry.level == "WARNING" then
        table.insert(stats.warnings, entry)
      end
    end
  end
  
  return stats
end

local logStats = analyzeLogFile("application.log")

print("Log Statistics:")
print("  Total entries:", logStats.total)
print("\nBreakdown by level:")
for level, count in pairs(logStats.byLevel) do
  print(string.format("  %s: %d", level, count))
end

print("\nErrors found:")
for i, error in ipairs(logStats.errors) do
  print(string.format("  [%s] %s", error.time, error.message))
end

-- 6. APPEND TO FILE
print("\n6. Appending to Files")
print("-" .. string.rep("-", 40))

function appendToFile(filename, content)
  local file, err = io.open(filename, "a")
  if not file then
    return false, "Cannot open file: " .. err
  end
  
  file:write(content)
  file:close()
  return true
end

appendToFile("application.log", "\n2026-01-15 10:10:00 INFO System healthy")
print("✓ Appended to application.log")

-- 7. DATA EXPORT
print("\n7. Exporting Data")
print("-" .. string.rep("-", 40))

-- Export to custom format
function exportToText(employees, filename)
  local file = io.open(filename, "w")
  if not file then
    return false
  end
  
  file:write("EMPLOYEE REPORT\n")
  file:write("=" .. string.rep("=", 50) .. "\n\n")
  
  for i, emp in ipairs(employees) do
    file:write(string.format("%d. %s\n", i, emp.Name))
    file:write(string.format("   Age: %s\n", emp.Age))
    file:write(string.format("   Job: %s\n", emp.Job))
    file:write(string.format("   City: %s\n", emp.City))
    file:write("\n")
  end
  
  file:close()
  return true
end

exportToText(employees, "employee_report.txt")
print("✓ Created employee_report.txt")

-- 8. WORD COUNT UTILITY
print("\n8. Word Count Utility")
print("-" .. string.rep("-", 40))

function wordCount(filename)
  local file = io.open(filename, "r")
  if not file then
    return nil
  end
  
  local lines = 0
  local words = 0
  local chars = 0
  
  for line in file:lines() do
    lines = lines + 1
    chars = chars + #line
    
    -- Count words
    for word in line:gmatch("%S+") do
      words = words + 1
    end
  end
  
  file:close()
  
  return {
    lines = lines,
    words = words,
    chars = chars
  }
end

local stats = wordCount("data.csv")
print("Word count for data.csv:")
print(string.format("  Lines: %d", stats.lines))
print(string.format("  Words: %d", stats.words))
print(string.format("  Characters: %d", stats.chars))

-- Cleanup
print("\n=== Cleaning up demo files ===")
os.remove("data.csv")
os.remove("application.log")
os.remove("employee_report.txt")
print("✓ Demo files removed")

print("\n=== End of File Processing Examples ===")
