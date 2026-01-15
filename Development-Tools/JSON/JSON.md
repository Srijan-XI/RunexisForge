# JSON

## Introduction

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight, text-based, language-independent data interchange format. It's easy for humans to read and write, and easy for machines to parse and generate. JSON is built on two universal data structures: objects (key-value pairs) and arrays (ordered lists).

---

## Why Use JSON?

- **🌐 Universal**: Supported by virtually every programming language
- **📝 Human-Readable**: Simple syntax that's easy to understand
- **🚀 Lightweight**: Minimal syntax overhead compared to XML
- **🔄 Web Standard**: Native support in JavaScript and REST APIs
- **📦 Data Exchange**: Perfect for API responses and configuration files
- **🎯 Simple Structure**: Only six data types to learn

---

## Key Features

### 1. **Simple Data Types**

```json
{
  "string": "Hello World",
  "number": 42,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {"nested": "value"}
}
```

### 2. **Nested Structures**

```json
{
  "user": {
    "name": "John Doe",
    "age": 30,
    "addresses": [
      {
        "type": "home",
        "city": "New York"
      },
      {
        "type": "work",
        "city": "Boston"
      }
    ]
  }
}
```

### 3. **Language Independent**

- Works with Python, Java, C#, JavaScript, PHP, Ruby, and more
- Standard parsers available in all major languages

---

## Common Use Cases

### API Communication

```json
{
  "request": {
    "method": "GET",
    "endpoint": "/api/users/123"
  },
  "response": {
    "status": 200,
    "data": {
      "id": 123,
      "username": "johndoe"
    }
  }
}
```

### Configuration Files

```json
{
  "app": {
    "name": "MyApp",
    "version": "1.0.0",
    "settings": {
      "debug": false,
      "port": 8080
    }
  }
}
```

### Data Storage

```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "inStock": true
    },
    {
      "id": 2,
      "name": "Mouse",
      "price": 29.99,
      "inStock": false
    }
  ]
}
```

---

## JSON vs XML

| Feature | JSON | XML |
|---------|------|-----|
| **Syntax** | Simpler, less verbose | More verbose, with tags |
| **Data Types** | Native support | String-based |
| **Arrays** | Native array notation | Requires wrapper elements |
| **File Size** | Smaller | Larger |
| **Parsing** | Faster | Slower |
| **Comments** | Not supported | Supported |

---

## JSON Syntax Rules

1. **Data in name/value pairs**: `"key": "value"`
2. **Commas separate data**: `{"a": 1, "b": 2}`
3. **Curly braces for objects**: `{...}`
4. **Square brackets for arrays**: `[...]`
5. **Double quotes for strings**: `"text"`
6. **No trailing commas**: Last item has no comma
7. **Keys must be strings**: Always in double quotes

---

## Data Types in JSON

### Primitive Types

- **String**: `"Hello World"`
- **Number**: `42`, `3.14`, `-10`, `1.5e10`
- **Boolean**: `true`, `false`
- **Null**: `null`

### Complex Types

- **Object**: `{"key": "value"}`
- **Array**: `[1, 2, 3, "four"]`

---

## Popular JSON Tools

### Validation & Formatting

- **JSONLint**: Online JSON validator
- **Prettier**: Code formatter with JSON support
- **jq**: Command-line JSON processor

### Editors

- **VS Code**: Excellent JSON support with IntelliSense
- **Postman**: API testing with JSON
- **JSON Editor Online**: Web-based editor

### Libraries by Language

- **JavaScript**: `JSON.parse()`, `JSON.stringify()`
- **Python**: `json` module
- **Java**: Jackson, Gson
- **C#**: Newtonsoft.Json, System.Text.Json
- **Go**: `encoding/json`

---

## Real-World Applications

1. **REST APIs**: Primary data format for web services
2. **Configuration**: Package.json, settings.json
3. **NoSQL Databases**: MongoDB, CouchDB use JSON-like formats
4. **Message Queues**: RabbitMQ, Kafka message formats
5. **Mobile Apps**: Data exchange between app and server
6. **Web Development**: AJAX responses, state management

---

## Security Considerations

⚠️ **Important Security Notes**:

- Never use `eval()` to parse JSON (use proper parsers)
- Validate JSON schema before processing
- Sanitize user-generated JSON data
- Be aware of JSON injection attacks
- Set proper Content-Type headers (`application/json`)
- Limit JSON payload size to prevent DoS attacks

---

## JSON Schema

Define structure and validation rules:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "number",
      "minimum": 0
    }
  },
  "required": ["name", "age"]
}
```

---

## Best Practices

1. **✅ Use Consistent Naming**: camelCase or snake_case
2. **✅ Keep It Flat**: Avoid deep nesting when possible
3. **✅ Validate Data**: Use JSON Schema for validation
4. **✅ Pretty Print**: Format for readability in development
5. **✅ Minify in Production**: Remove whitespace for smaller size
6. **✅ Use Appropriate Types**: Don't store numbers as strings
7. **✅ Document Your Schema**: Maintain clear documentation

---

## Learning Resources

### Official Documentation

- [JSON.org](https://www.json.org/) - Official JSON specification
- [ECMA-404](https://www.ecma-international.org/publications/standards/Ecma-404.htm) - JSON Data Interchange Format

### Tutorials & Guides

- [MDN Web Docs - Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- [W3Schools JSON Tutorial](https://www.w3schools.com/js/js_json_intro.asp)

### Tools

- [JSONLint](https://jsonlint.com/) - JSON Validator
- [JSON Schema](https://json-schema.org/) - Schema specification

---

## Next Steps

Ready to start working with JSON? Jump to the **User Guide** section below for practical examples, parsing techniques, and language-specific implementations.

---

**Happy JSON coding! 🎯📦**

---

## User Guide

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

- JSONLint: <https://jsonlint.com>
- JSON Formatter: <https://jsonformatter.org>

### Command Line (jq)

```
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

