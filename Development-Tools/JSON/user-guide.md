# JSON User Guide

Complete guide to working with JSON across different programming languages and platforms.

---

## Table of Contents
1. [Basic JSON Structure](#basic-json-structure)
2. [Working with JSON in Different Languages](#working-with-json-in-different-languages)
3. [JSON Validation](#json-validation)
4. [Common Operations](#common-operations)
5. [Advanced Techniques](#advanced-techniques)
6. [Troubleshooting](#troubleshooting)

---

## Basic JSON Structure

### Simple Object
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "isStudent": false,
  "address": null
}
```

### Array of Objects
```json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

### Nested Structure
```json
{
  "company": {
    "name": "TechCorp",
    "founded": 2010,
    "departments": [
      {
        "name": "Engineering",
        "employees": 50
      },
      {
        "name": "Marketing",
        "employees": 20
      }
    ]
  }
}
```

---

## Working with JSON in Different Languages

### JavaScript

#### Parsing JSON
```javascript
// String to Object
const jsonString = '{"name": "John", "age": 30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // "John"

// Object to String
const person = { name: "Jane", age: 25 };
const json = JSON.stringify(person);
console.log(json); // '{"name":"Jane","age":25}'

// Pretty print with indentation
const prettyJson = JSON.stringify(person, null, 2);
```

#### Error Handling
```javascript
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error("Invalid JSON:", error.message);
}
```

### Python

#### Basic Operations
```python
import json

# String to Dictionary
json_string = '{"name": "John", "age": 30}'
data = json.loads(json_string)
print(data['name'])  # John

# Dictionary to String
person = {"name": "Jane", "age": 25}
json_string = json.dumps(person)

# Pretty print
pretty_json = json.dumps(person, indent=2)
print(pretty_json)
```

#### File Operations
```python
# Read from file
with open('data.json', 'r') as file:
    data = json.load(file)

# Write to file
with open('output.json', 'w') as file:
    json.dump(data, file, indent=2)
```

#### Custom Encoding
```python
from datetime import datetime
import json

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {"timestamp": datetime.now()}
json_string = json.dumps(data, cls=DateTimeEncoder)
```

### Java

#### Using Jackson
```java
import com.fasterxml.jackson.databind.ObjectMapper;

// Parse JSON
ObjectMapper mapper = new ObjectMapper();
String jsonString = "{\"name\":\"John\",\"age\":30}";
Person person = mapper.readValue(jsonString, Person.class);

// Convert to JSON
Person person = new Person("Jane", 25);
String json = mapper.writeValueAsString(person);

// Pretty print
String prettyJson = mapper.writerWithDefaultPrettyPrinter()
                          .writeValueAsString(person);
```

#### Using Gson
```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

// Parse JSON
Gson gson = new Gson();
Person person = gson.fromJson(jsonString, Person.class);

// Convert to JSON
String json = gson.toJson(person);

// Pretty print
Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
String prettyJson = prettyGson.toJson(person);
```

### C# (.NET)

#### Using System.Text.Json
```csharp
using System.Text.Json;

// Parse JSON
string jsonString = "{\"name\":\"John\",\"age\":30}";
Person person = JsonSerializer.Deserialize<Person>(jsonString);

// Convert to JSON
Person person = new Person { Name = "Jane", Age = 25 };
string json = JsonSerializer.Serialize(person);

// Pretty print
var options = new JsonSerializerOptions { WriteIndented = true };
string prettyJson = JsonSerializer.Serialize(person, options);
```

#### Using Newtonsoft.Json
```csharp
using Newtonsoft.Json;

// Parse JSON
Person person = JsonConvert.DeserializeObject<Person>(jsonString);

// Convert to JSON
string json = JsonConvert.SerializeObject(person);

// Pretty print
string prettyJson = JsonConvert.SerializeObject(person, Formatting.Indented);
```

### PHP

```php
<?php
// Parse JSON
$jsonString = '{"name":"John","age":30}';
$data = json_decode($jsonString);
echo $data->name; // John

// As associative array
$array = json_decode($jsonString, true);
echo $array['name']; // John

// Convert to JSON
$person = ['name' => 'Jane', 'age' => 25];
$json = json_encode($person);

// Pretty print
$prettyJson = json_encode($person, JSON_PRETTY_PRINT);
?>
```

### Go

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    // Parse JSON
    jsonString := `{"name":"John","age":30}`
    var person Person
    json.Unmarshal([]byte(jsonString), &person)
    
    // Convert to JSON
    person := Person{Name: "Jane", Age: 25}
    jsonBytes, _ := json.Marshal(person)
    
    // Pretty print
    prettyJson, _ := json.MarshalIndent(person, "", "  ")
    fmt.Println(string(prettyJson))
}
```

### Ruby

```ruby
require 'json'

# Parse JSON
json_string = '{"name":"John","age":30}'
data = JSON.parse(json_string)
puts data['name'] # John

# Convert to JSON
person = {name: 'Jane', age: 25}
json = JSON.generate(person)

# Pretty print
pretty_json = JSON.pretty_generate(person)
puts pretty_json
```

---

## JSON Validation

### Online Validators
- JSONLint: https://jsonlint.com
- JSON Formatter: https://jsonformatter.org

### Command Line (jq)
```bash
# Validate JSON file
jq empty data.json

# Pretty print
jq '.' data.json

# Extract specific field
jq '.users[0].name' data.json

# Filter array
jq '.users[] | select(.age > 25)' data.json
```

### JSON Schema Validation

**Schema Definition** (`schema.json`):
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "age"]
}
```

**JavaScript Validation** (using ajv):
```javascript
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('./schema.json');
const validate = ajv.compile(schema);

const data = {
  name: "John Doe",
  age: 30,
  email: "john@example.com"
};

const valid = validate(data);
if (!valid) {
  console.log(validate.errors);
}
```

---

## Common Operations

### Merging JSON Objects

**JavaScript**:
```javascript
const obj1 = {name: "John", age: 30};
const obj2 = {age: 31, city: "New York"};

// Spread operator
const merged = {...obj1, ...obj2};

// Object.assign()
const merged2 = Object.assign({}, obj1, obj2);
```

**Python**:
```python
dict1 = {"name": "John", "age": 30}
dict2 = {"age": 31, "city": "New York"}

# Using unpacking (Python 3.9+)
merged = dict1 | dict2

# Using update
merged = dict1.copy()
merged.update(dict2)
```

### Filtering Arrays

**JavaScript**:
```javascript
const data = {
  "users": [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
    {"name": "Charlie", "age": 35}
  ]
};

// Filter users over 25
const filtered = data.users.filter(user => user.age > 25);
```

**Python**:
```python
data = {
    "users": [
        {"name": "Alice", "age": 25},
        {"name": "Bob", "age": 30},
        {"name": "Charlie", "age": 35}
    ]
}

# Filter users over 25
filtered = [user for user in data['users'] if user['age'] > 25]
```

### Deep Copying

**JavaScript**:
```javascript
// Simple deep clone
const deepClone = JSON.parse(JSON.stringify(original));

// Using structuredClone (modern browsers)
const deepClone2 = structuredClone(original);
```

**Python**:
```python
import copy

# Deep copy
deep_clone = copy.deepcopy(original)
```

---

## Advanced Techniques

### Streaming Large JSON Files

**Python** (using ijson):
```python
import ijson

with open('large_file.json', 'r') as file:
    objects = ijson.items(file, 'users.item')
    for obj in objects:
        process(obj)
```

**Node.js** (using JSONStream):
```javascript
const JSONStream = require('JSONStream');
const fs = require('fs');

fs.createReadStream('large_file.json')
  .pipe(JSONStream.parse('users.*'))
  .on('data', (data) => {
    console.log(data);
  });
```

### Custom Serialization

**Python**:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def to_json(self):
        return json.dumps(self.__dict__)
    
    @staticmethod
    def from_json(json_str):
        data = json.loads(json_str)
        return Person(data['name'], data['age'])
```

**JavaScript**:
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  toJSON() {
    return {
      name: this.name,
      age: this.age,
      type: 'Person'
    };
  }
  
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new Person(data.name, data.age);
  }
}
```

---

## Troubleshooting

### Common Errors

#### 1. **Trailing Commas**
❌ **Wrong**:
```json
{
  "name": "John",
  "age": 30,
}
```

✅ **Correct**:
```json
{
  "name": "John",
  "age": 30
}
```

#### 2. **Single Quotes**
❌ **Wrong**:
```json
{'name': 'John'}
```

✅ **Correct**:
```json
{"name": "John"}
```

#### 3. **Unquoted Keys**
❌ **Wrong**:
```json
{name: "John"}
```

✅ **Correct**:
```json
{"name": "John"}
```

#### 4. **Comments**
❌ **Wrong** (JSON doesn't support comments):
```json
{
  // This is a comment
  "name": "John"
}
```

✅ **Workaround** (use a special key):
```json
{
  "_comment": "This is metadata",
  "name": "John"
}
```

### Debugging Tips

1. **Use a Validator**: Always validate with JSONLint
2. **Check Encoding**: Ensure UTF-8 encoding
3. **Escape Special Characters**: Use `\` for quotes and backslashes
4. **Watch for BOM**: Remove Byte Order Mark if present
5. **Test with Small Samples**: Debug with minimal JSON first

---

## Best Practices Checklist

- ✅ Use double quotes for strings
- ✅ No trailing commas
- ✅ Validate JSON structure
- ✅ Use consistent key naming conventions
- ✅ Keep nesting levels reasonable (max 3-4 levels)
- ✅ Handle errors gracefully
- ✅ Use JSON Schema for validation
- ✅ Minify in production
- ✅ Pretty print for development
- ✅ Document your JSON structure

---

## Quick Reference

### Data Types
| Type | Example |
|------|---------|
| String | `"Hello"` |
| Number | `42`, `3.14` |
| Boolean | `true`, `false` |
| Null | `null` |
| Array | `[1, 2, 3]` |
| Object | `{"key": "value"}` |

### Escape Sequences
| Sequence | Meaning |
|----------|---------|
| `\"` | Double quote |
| `\\` | Backslash |
| `\/` | Forward slash |
| `\b` | Backspace |
| `\f` | Form feed |
| `\n` | Newline |
| `\r` | Carriage return |
| `\t` | Tab |
| `\uXXXX` | Unicode character |

---

## Additional Resources

### Tools
- **jq**: Command-line JSON processor
- **Postman**: API testing with JSON
- **VS Code**: JSON editing with IntelliSense

### Documentation
- [JSON.org](https://www.json.org/)
- [MDN JSON Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [JSON Schema](https://json-schema.org/)

---

**Happy JSON processing! 🚀📊**
