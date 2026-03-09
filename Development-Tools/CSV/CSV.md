# CSV

## Introduction

## What is CSV?

**CSV (Comma-Separated Values)** is a simple, plain-text file format used to store tabular data. Each line represents a data record, and each record consists of one or more fields separated by commas. CSV is one of the most widely used formats for data exchange due to its simplicity and universal support.

---

## Why Use CSV?

- **📊 Simple & Universal**: Supported by every spreadsheet and database tool
- **🚀 Lightweight**: Plain text format with minimal overhead
- **👁️ Human-Readable**: Easy to view and edit in any text editor
- **🔄 Interoperable**: Works across all programming languages and platforms
- **💾 Efficient**: Small file size, fast parsing
- **📈 Data Science**: Standard format for datasets in machine learning

---

## Basic CSV Structure

### Simple CSV Example

```csv
Name,Age,City,Country
John Doe,30,New York,USA
Jane Smith,25,London,UK
Bob Johnson,35,Toronto,Canada
Alice Williams,28,Sydney,Australia
```

### With Headers

```csv
product_id,product_name,price,quantity,in_stock
101,Laptop,999.99,50,true
102,Mouse,29.99,200,true
103,Keyboard,79.99,150,true
104,Monitor,299.99,75,false
```

---

## Key Features

### 1. **Column Headers** (First Row)

```csv
FirstName,LastName,Email,PhoneNumber
John,Doe,john@example.com,555-0100
Jane,Smith,jane@example.com,555-0101
```

### 2. **Quoted Fields** (Handle Commas)

```csv
Name,Address,City
"Doe, John","123 Main St, Apt 4B",New York
"Smith, Jane","456 Oak Ave",London
```

### 3. **Escaped Quotes**

```csv
Title,Description
"The ""Great"" Gatsby","A novel by F. Scott Fitzgerald"
"Alice's Adventures","A book with a quote: ""We're all mad here"""
```

### 4. **Different Delimiters**

```csv
// Tab-separated (TSV)
Name Age City
John 30 New York

// Semicolon-separated
Name;Age;City
John;30;New York

// Pipe-separated
Name|Age|City
John|30|New York
```

---

## CSV Syntax Rules

1. **Comma Delimiter**: Fields separated by commas (or other delimiter)
2. **One Record Per Line**: Each line is a new record
3. **Optional Header**: First row often contains column names
4. **Quote Fields with Commas**: Use double quotes
5. **Escape Quotes**: Use double quotes (`""`) inside quoted fields
6. **Consistent Columns**: Each row should have same number of fields
7. **UTF-8 Encoding**: Recommended for international characters

---

## Common Use Cases

### 1. **Data Export/Import**

```csv
// Excel to Database
order_id,customer_name,order_date,total_amount,status
1001,John Doe,2024-01-15,250.00,completed
1002,Jane Smith,2024-01-16,180.50,pending
1003,Bob Johnson,2024-01-16,420.75,completed
```

### 2. **Configuration Files**

```csv
server_name,ip_address,port,environment
web-server-1,192.168.1.10,80,production
web-server-2,192.168.1.11,80,production
db-server-1,192.168.1.20,3306,production
```

### 3. **Log Files**

```csv
timestamp,level,message,user
2024-12-24T10:30:00,INFO,User login successful,johndoe
2024-12-24T10:31:15,WARNING,Failed login attempt,unknown
2024-12-24T10:32:00,ERROR,Database connection failed,system
```

### 4. **Machine Learning Datasets**

```csv
feature1,feature2,feature3,target
0.5,1.2,3.4,positive
0.3,0.9,2.1,negative
0.8,1.5,4.2,positive
```

---

## CSV vs Other Formats

| Feature | CSV | JSON | XML |
|---------|-----|------|-----|
| **Structure** | Tabular | Hierarchical | Hierarchical |
| **Readability** | High | Medium | Low |
| **File Size** | Small | Medium | Large |
| **Data Types** | Text only | Native types | Text-based |
| **Nested Data** | No | Yes | Yes |
| **Comments** | No | No | Yes |
| **Metadata** | Limited (headers) | Good | Excellent |
| **Parsing Speed** | Fast | Medium | Slow |
| **Use Case** | Flat data, spreadsheets | APIs, config files | Documents, complex data |

---

## Popular CSV Tools

### Spreadsheet Applications

- **Microsoft Excel**: Industry standard
- **Google Sheets**: Cloud-based
- **LibreOffice Calc**: Open-source alternative
- **Apple Numbers**: macOS spreadsheet app

### Command-Line Tools

- **csvkit**: Python CSV toolkit
- **xsv**: Fast CSV command-line toolkit (Rust)
- **awk**: Text processing
- **sed**: Stream editor
- **miller**: CSV/JSON/TSV processor

### Programming Libraries

- **Python**: `csv`, `pandas`
- **JavaScript**: `csv-parser`, `papaparse`
- **Java**: `OpenCSV`, `Apache Commons CSV`
- **C#**: `CsvHelper`, `FileHelpers`
- **R**: `read.csv()`, `readr`

### Online Tools

- **CSV Lint**: Online validator
- **CSV to JSON Converter**: Format converter
- **Mr. Data Converter**: Multi-format converter

---

## CSV Variations

### TSV (Tab-Separated Values)

```tsv
Name Age City Country
John Doe 30 New York USA
Jane Smith 25 London UK
```

### PSV (Pipe-Separated Values)

```csv
Name|Age|City|Country
John Doe|30|New York|USA
Jane Smith|25|London|UK
```

### Fixed-Width Format

```
Name          Age City         Country
John Doe       30 New York     USA
Jane Smith     25 London       UK
```

---

## Special Cases

### Empty Fields

```csv
Name,Age,City,Country
John Doe,30,,USA
Jane Smith,,London,UK
,25,Toronto,Canada
```

### Multiline Fields

```csv
Name,Address,City
"John Doe","123 Main St
Apt 4B",New York
"Jane Smith","456 Oak Avenue",London
```

### Unicode and Special Characters

```csv
Name,City,Country,Note
José García,Madrid,España,café
李明,北京,中国,你好
Müller,München,Deutschland,Grüße
```

---

## Security Considerations

⚠️ **CSV Security Issues**:

1. **CSV Injection**: Leading `=`, `+`, `-`, `@` can execute formulas

   ```csv
   // Dangerous!
   Name,Formula
   John,=1+1
   Jane,=cmd|'/c calc'!A1
   ```

2. **Sanitize Input**: Escape or remove formula characters

   ```csv
   // Safe
   Name,Formula
   John,'=1+1
   Jane,"'=cmd|'/c calc'!A1"
   ```

3. **Validate Data**: Check for expected patterns
4. **Limit File Size**: Prevent memory exhaustion
5. **Encoding Issues**: Always use UTF-8
6. **SQL Injection**: Sanitize before database import

---

## Best Practices

### File Creation

1. **✅ Include Headers**: Always use descriptive column names
2. **✅ Consistent Delimiters**: Stick to commas (or chosen delimiter)
3. **✅ Quote When Needed**: Quote fields containing delimiters
4. **✅ Use UTF-8 Encoding**: Support international characters
5. **✅ One Record Per Line**: Don't break records
6. **✅ Consistent Data Types**: Keep column types consistent
7. **✅ Handle Missing Data**: Use empty fields or NULL

### Data Quality

1. **✅ Validate Data**: Check for expected format
2. **✅ Trim Whitespace**: Remove leading/trailing spaces
3. **✅ Consistent Date Format**: Use ISO 8601 (YYYY-MM-DD)
4. **✅ Escape Special Characters**: Properly quote/escape
5. **✅ No Binary Data**: CSV is for text
6. **✅ Document Format**: Provide data dictionary

---

## Character Encoding

### Common Encoding Issues

**UTF-8 (Recommended)**:

```csv
Name,City
José,São Paulo
李明,北京
```

**UTF-8 with BOM** (Excel compatibility):

```
(BOM: EF BB BF)Name,City
José,São Paulo
```

**ASCII** (Limited characters):

```csv
Name,City
Jose,Sao Paulo
```

---

## CSV Gotchas

### Problem 1: Leading Zeros

```csv
// Excel removes leading zeros
OrderID,ZipCode
001,00501
002,00544

// Solution: Quote or use text format
OrderID,ZipCode
"001","00501"
"002","00544"
```

### Problem 2: Large Numbers

```csv
// Excel converts to scientific notation
ID,PhoneNumber
1,12345678901234

// Solution: Quote numbers
ID,PhoneNumber
1,"12345678901234"
```

### Problem 3: Date Format

```csv
// Excel auto-converts dates
Name,Date
John,2024-01-15
Jane,3/15/2024

// Solution: Use consistent ISO format
Name,Date
John,2024-01-15
Jane,2024-03-15
```

---

## Real-World Applications

1. **Data Analysis**: pandas, R, Excel
2. **Database Import/Export**: MySQL, PostgreSQL, MongoDB
3. **ETL Pipelines**: Data warehousing
4. **Machine Learning**: Training datasets
5. **Report Generation**: System logs, analytics
6. **Configuration**: Application settings
7. **Open Data**: Government datasets, research data
8. **E-commerce**: Product catalogs, order exports

---

## CSV Best Tool for

| Use Case | Recommended Tool |
|----------|------------------|
| Quick viewing | Excel, Google Sheets |
| Command-line processing | csvkit, xsv |
| Data analysis | Python pandas, R |
| Large files | csvkit, xsv, streaming parsers |
| Data cleaning | OpenRefine, pandas |
| Format conversion | miller, csvkit |
| Validation | csvlint, great_expectations |

---

## Learning Resources

### Documentation

- [RFC 4180](https://tools.ietf.org/html/rfc4180) - CSV Format Specification
- [csvkit Documentation](https://csvkit.readthedocs.io/)
- [pandas CSV Guide](https://pandas.pydata.org/docs/user_guide/io.html#csv-text-files)

### Tutorials

- [CSV Guide on Wikipedia](https://en.wikipedia.org/wiki/Comma-separated_values)
- [Python CSV Tutorial](https://realpython.com/python-csv/)
- [Excel CSV Best Practices](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba)

### Tools

- [csvkit](https://csvkit.readthedocs.io/) - Command-line CSV toolkit
- [xsv](https://github.com/BurntSushi/xsv) - Fast CSV toolkit
- [Online CSV Editor](https://www.convertcsv.com/csv-viewer-editor.htm)

---

## Quick Tips

💡 **Pro Tips**:

- Use TSV for data with many commas
- Always test CSV with target application
- Keep a data dictionary
- Use consistent null representation
- Compress large CSV files (gzip)
- Stream large files instead of loading all
- Validate before importing to database

---

## Next Steps

Ready to work with CSV files? Jump to the **User Guide** section below for practical examples, parsing techniques, and language-specific implementations.

---

**Happy CSV processing! 📊📝**

---

## User Guide

Comprehensive guide to working with CSV files across different programming languages and platforms.

---

## Table of Contents

1. [Reading CSV Files](#reading-csv-files)
2. [Writing CSV Files](#writing-csv-files)
3. [Data Manipulation](#data-manipulation)
4. [Command-Line Tools](#command-line-tools)
5. [Advanced Techniques](#advanced-techniques)
6. [Troubleshooting](#troubleshooting)

---

## Reading CSV Files

### Python

#### Using csv module

```python
import csv

# Basic reading
with open('data.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)  # Skip header
    for row in csv_reader:
        print(row)

# Using DictReader (recommended)
with open('data.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        print(row['Name'], row['Age'])

# Custom delimiter
with open('data.tsv', 'r') as file:
    csv_reader = csv.reader(file, delimiter='\t')
    for row in csv_reader:
        print(row)
```

#### Using pandas (recommended for data analysis)

```python
import pandas as pd

# Basic read
df = pd.read_csv('data.csv')
print(df.head())

# With options
df = pd.read_csv('data.csv',
                 sep=',',
                 encoding='utf-8',
                 header=0,
                 index_col=0,
                 parse_dates=['date_column'],
                 na_values=['NA', 'null', ''])

# Read large files in chunks
for chunk in pd.read_csv('large_file.csv', chunksize=10000):
    process(chunk)

# Read specific columns
df = pd.read_csv('data.csv', usecols=['Name', 'Age', 'City'])

# Skip rows
df = pd.read_csv('data.csv', skiprows=[0, 2, 3])
```

### JavaScript (Node.js)

#### Using csv-parser

```javascript
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    results.push(row);
  })
  .on('end', () => {
    console.log('CSV file parsed');
    console.log(results);
  });

// With custom delimiter
fs.createReadStream('data.tsv')
  .pipe(csv({ separator: '\t' }))
  .on('data', (row) => console.log(row));
```

#### Using papaparse

```javascript
const Papa = require('papaparse');
const fs = require('fs');

const file = fs.readFileSync('data.csv', 'utf8');

Papa.parse(file, {
  header: true,
  complete: function(results) {
    console.log(results.data);
  },
  error: function(error) {
    console.error(error);
  }
});

// Streaming large files
fs.createReadStream('large_file.csv')
  .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, {header: true}))
  .on('data', (row) => console.log(row));
```

### JavaScript (Browser)

```javascript
// Using File API
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const csv = e.target.result;
    const rows = csv.split('\n');
    const data = rows.map(row => row.split(','));
    console.log(data);
  };
  
  reader.readAsText(file);
});

// Using papaparse
Papa.parse(file, {
  header: true,
  complete: function(results) {
    console.log(results.data);
  }
});
```


### Java

#### Using OpenCSV

```java
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import java.io.FileReader;
import java.util.List;

public class CSVExample {
    public static void main(String[] args) throws Exception {
        // Basic reading
        try (CSVReader reader = new CSVReader(new FileReader("data.csv"))) {
            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                for (String cell : nextLine) {
                    System.out.print(cell + " ");
                }
                System.out.println();
            }
        }
        
        // Read all at once
        try (CSVReader reader = new CSVReader(new FileReader("data.csv"))) {
            List<String[]> allData = reader.readAll();
            for (String[] row : allData) {
                System.out.println(Arrays.toString(row));
            }
        }
        
        // Skip header
        try (CSVReader reader = new CSVReaderBuilder(new FileReader("data.csv"))
                .withSkipLines(1)
                .build()) {
            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                // Process data
            }
        }
    }
}
```

#### Using Apache Commons CSV

```java
import org.apache.commons.csv.*;
import java.io.*;

Reader in = new FileReader("data.csv");
Iterable<CSVRecord> records = CSVFormat.DEFAULT
    .withHeader("Name", "Age", "City")
    .withFirstRecordAsHeader()
    .parse(in);

for (CSVRecord record : records) {
    String name = record.get("Name");
    String age = record.get("Age");
    String city = record.get("City");
    System.out.println(name + ", " + age + ", " + city);
}
```

### C# (.NET)

#### Using CsvHelper

```csharp
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.IO;
using System.Collections.Generic;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string City { get; set; }
}

// Read CSV
using (var reader = new StreamReader("data.csv"))
using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
{
    var records = csv.GetRecords<Person>();
    foreach (var record in records)
    {
        Console.WriteLine($"{record.Name}, {record.Age}, {record.City}");
    }
}

// Read without class mapping
using (var reader = new StreamReader("data.csv"))
using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
{
    csv.Read();
    csv.ReadHeader();
    while (csv.Read())
    {
        var name = csv.GetField("Name");
        var age = csv.GetField<int>("Age");
        Console.WriteLine($"{name}, {age}");
    }
}
```

### PHP

```php
<?php
// Read CSV
$file = fopen('data.csv', 'r');

// Skip header
$header = fgetcsv($file);

while (($row = fgetcsv($file)) !== false) {
    print_r($row);
}

fclose($file);

// Read into associative array
$file = fopen('data.csv', 'r');
$header = fgetcsv($file);

while (($row = fgetcsv($file)) !== false) {
    $data = array_combine($header, $row);
    echo $data['Name'] . ', ' . $data['Age'] . "\n";
}

fclose($file);

// One-liner to read all
$data = array_map('str_getcsv', file('data.csv'));
?>
```

### R

```r
# Basic read
data <- read.csv("data.csv")
print(head(data))

# Using readr (faster, better)
library(readr)
data <- read_csv("data.csv")

# With options
data <- read_csv("data.csv",
                 col_names = TRUE,
                 col_types = cols(
                   Name = col_character(),
                   Age = col_integer()
                 ),
                 skip = 1)

# Read large files
data <- read_csv_chunked("large_file.csv",
                        DataFrameCallback$new(function(x, pos) x),
                        chunk_size = 10000)
```

---

## Writing CSV Files

### Python

#### Using csv module

```python
import csv

# Basic writing
data = [
    ['Name', 'Age', 'City'],
    ['John Doe', 30, 'New York'],
    ['Jane Smith', 25, 'London']
]

with open('output.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Using DictWriter
fieldnames = ['Name', 'Age', 'City']
data = [
    {'Name': 'John Doe', 'Age': 30, 'City': 'New York'},
    {'Name': 'Jane Smith', 'Age': 25, 'City': 'London'}
]

with open('output.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)

# Custom delimiter
with open('output.tsv', 'w', newline='') as file:
    writer = csv.writer(file, delimiter='\t')
    writer.writerows(data)
```

#### Using pandas

```python
import pandas as pd

# From DataFrame
df = pd.DataFrame({
    'Name': ['John Doe', 'Jane Smith'],
    'Age': [30, 25],
    'City': ['New York', 'London']
})

# Basic write
df.to_csv('output.csv', index=False)

# With options
df.to_csv('output.csv',
          index=False,
          encoding='utf-8',
          sep=',',
          quoting=csv.QUOTE_MINIMAL,
          date_format='%Y-%m-%d')

# Append to existing file
df.to_csv('output.csv', mode='a', header=False, index=False)
```

### JavaScript (Node.js)

```javascript
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'output.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'age', title: 'Age'},
    {id: 'city', title: 'City'}
  ]
});

const records = [
  {name: 'John Doe', age: 30, city: 'New York'},
  {name: 'Jane Smith', age: 25, city: 'London'}
];

csvWriter.writeRecords(records)
  .then(() => console.log('CSV file written'));

// Using papaparse
const Papa = require('papaparse');
const fs = require('fs');

const csv = Papa.unparse(records);
fs.writeFileSync('output.csv', csv);
```

---

### Java

```java
import com.opencsv.CSVWriter;
import java.io.FileWriter;

// Write CSV
try (CSVWriter writer = new CSVWriter(new FileWriter("output.csv"))) {
    String[] header = {"Name", "Age", "City"};
    writer.writeNext(header);
    
    String[] row1 = {"John Doe", "30", "New York"};
    String[] row2 = {"Jane Smith", "25", "London"};
    
    writer.writeNext(row1);
    writer.writeNext(row2);
}
```

### C #

```csharp
using CsvHelper;
using System.Globalization;

var records = new List<Person>
{
    new Person { Name = "John Doe", Age = 30, City = "New York" },
    new Person { Name = "Jane Smith", Age = 25, City = "London" }
};

using (var writer = new StreamWriter("output.csv"))
using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
{
    csv.WriteRecords(records);
}
```

---

## Data Manipulation

### Python pandas

```python
import pandas as pd

# Read CSV
df = pd.read_csv('data.csv')

# Basic operations
df.head()           # First 5 rows
df.tail()           # Last 5 rows
df.info()           # Column info
df.describe()       # Statistics

# Filtering
filtered = df[df['Age'] > 25]
filtered = df[df['City'] == 'New York']
filtered = df[(df['Age'] > 25) & (df['City'] == 'New York')]

# Selecting columns
subset = df[['Name', 'Age']]

# Sorting
sorted_df = df.sort_values('Age', ascending=False)

# Grouping
grouped = df.groupby('City')['Age'].mean()

# Adding columns
df['Full Name'] = df['First Name'] + ' ' + df['Last Name']

# Handling missing data
df.dropna()                    # Remove rows with NaN
df.fillna(0)                   # Fill NaN with 0
df['Age'].fillna(df['Age'].mean())  # Fill with mean

# Merging DataFrames
merged = pd.merge(df1, df2, on='ID')

# Export
df.to_csv('output.csv', index=False)
```

---

## Command-Line Tools

### csvkit

```
# Install
pip install csvkit

# View CSV
csvlook data.csv

# Get statistics
csvstat data.csv

# Query with SQL
csvsql --query "SELECT * FROM data WHERE age > 25" data.csv

# Convert formats
in2csv data.xlsx > data.csv
csvjson data.csv > data.json

# Clean data
csvclean data.csv

# Sort
csvsort -c age data.csv

# Filter columns
csvcut -c name,age,city data.csv

# Filter rows
csvgrep -c city -m "New York" data.csv

# Join CSVs
csvjoin -c id file1.csv file2.csv
```

### xsv (Rust-based, very fast)

```
# Install (various methods)
cargo install xsv

# Count records
xsv count data.csv

# View headers
xsv headers data.csv

# Select columns
xsv select name,age data.csv

# Search
xsv search -s city "New York" data.csv

# Sort
xsv sort -s age data.csv

# Statistics
xsv stats data.csv

# Frequency count
xsv frequency -s city data.csv

# Join
xsv join id file1.csv id file2.csv
```

### awk

```
# Print specific columns
awk -F',' '{print $1, $2}' data.csv

# Filter rows
awk -F',' '$2 > 25' data.csv

# Sum column
awk -F',' '{sum+=$2} END {print sum}' data.csv

# Add header
awk 'BEGIN {print "Name,Age"} {print}' data.csv
```

---

## Advanced Techniques

### Handling Large Files (Python)

```python
import pandas as pd

# Read in chunks
chunk_size = 10000
chunks = []

for chunk in pd.read_csv('large_file.csv', chunksize=chunk_size):
    # Process chunk
    processed = chunk[chunk['Age'] > 25]
    chunks.append(processed)

result = pd.concat(chunks, ignore_index=True)

# Streaming with csv module
import csv

with open('large_file.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        if int(row['Age']) > 25:
            process(row)
```

### Data Validation

```python
import pandas as pd

df = pd.read_csv('data.csv')

# Check for duplicates
duplicates = df[df.duplicated()]

# Check for missing values
missing = df.isnull().sum()

# Validate data types
df['Age'] = pd.to_numeric(df['Age'], errors='coerce')

# Validate ranges
invalid_ages = df[(df['Age'] < 0) | (df['Age'] > 150)]

# Custom validation
def validate_email(email):
    return '@' in email and '.' in email

df['Valid Email'] = df['Email'].apply(validate_email)
```

### CSV to Database

```python
import pandas as pd
import sqlite3

# Read CSV
df = pd.read_csv('data.csv')

# Write to SQLite
conn = sqlite3.connect('database.db')
df.to_sql('table_name', conn, if_exists='replace', index=False)

# MySQL
from sqlalchemy import create_engine
engine = create_engine('mysql://user:pass@localhost/dbname')
df.to_sql('table_name', engine, if_exists='append', index=False)
```

---

## Troubleshooting

### Common Issues

#### 1. **Encoding Errors**

```python
# Try different encodings
df = pd.read_csv('data.csv', encoding='utf-8')
df = pd.read_csv('data.csv', encoding='latin-1')
df = pd.read_csv('data.csv', encoding='cp1252')

# Detect encoding
import chardet
with open('data.csv', 'rb') as f:
    result = chardet.detect(f.read())
    print(result['encoding'])
```

#### 2. **Inconsistent Delimiters**

```python
# Auto-detect delimiter
df = pd.read_csv('data.csv', sep=None, engine='python')

# Multiple possible delimiters
import csv
with open('data.csv', 'r') as f:
    sample = f.read(1024)
    sniffer = csv.Sniffer()
    delimiter = sniffer.sniff(sample).delimiter
```

#### 3. **Quoted Fields**

```python
df = pd.read_csv('data.csv', quotechar='"', quoting=csv.QUOTE_ALL)
```

#### 4. **Extra Whitespace**

```python
df = pd.read_csv('data.csv', skipinitialspace=True)
df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
```

---

## Best Practices Checklist

- ✅ Always specify encoding (UTF-8)
- ✅ Use header row
- ✅ Quote fields with delimiters/newlines
- ✅ Escape quotes with double quotes
- ✅ Validate data before import
- ✅ Handle missing values explicitly
- ✅ Use pandas for complex operations
- ✅ Stream large files
- ✅ Test with sample data first
- ✅ Document your CSV structure

---

## Quick Reference

### Python CSV Module

```python
import csv

# Read
with open('file.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)

# Write
with open('file.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['col1', 'col2'])
    writer.writeheader()
    writer.writerow({'col1': 'val1', 'col2': 'val2'})
```

### Pandas Quick Reference

```python
import pandas as pd

# Read/Write
df = pd.read_csv('input.csv')
df.to_csv('output.csv', index=False)

# Operations
df.head()
df[df['col'] > 5]
df.groupby('col').mean()
df.sort_values('col')
```

---

**Happy CSV processing! 📊🚀**

