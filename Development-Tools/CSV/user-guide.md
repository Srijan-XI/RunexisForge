# CSV User Guide

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

### C#

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

```bash
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

```bash
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

```bash
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
