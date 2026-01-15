# Kql

## Introduction

## What is KQL?

Kusto Query Language (KQL) is a powerful query language used to explore, analyze, and visualize data in Azure services. Originally developed for Azure Data Explorer (formerly known as Kusto), KQL has become the primary query language across numerous Microsoft Azure services and applications.

KQL is designed to be easy to read and write, with a syntax that flows naturally from left to right, making it intuitive for both beginners and experienced data analysts. It enables users to perform complex data analysis with simple, readable queries.

## Where is KQL Used?

KQL is the query language of choice across multiple Azure and Microsoft services:

### 1. **Azure Monitor Logs**

Query and analyze logs from Azure resources, applications, and infrastructure.

### 2. **Azure Application Insights**

Analyze application telemetry, performance metrics, and user behavior.

### 3. **Azure Sentinel**

Security Information and Event Management (SIEM) for threat detection and investigation.

### 4. **Azure Data Explorer (ADX)**

Big data analytics platform for real-time analysis of large volumes of data.

### 5. **Microsoft Defender**

Advanced threat protection and security analytics.

### 6. **Azure Resource Graph**

Query Azure resource metadata and configurations at scale.

### 7. **Log Analytics**

Centralized logging and monitoring for cloud and on-premises environments.

### 8. **Microsoft 365 Defender**

Security analytics for Microsoft 365 environment.

## Why Learn KQL?

### 1. **Cloud Monitoring and Observability**

KQL is essential for monitoring Azure infrastructure, applications, and services. It enables real-time insights into system performance, availability, and health.

### 2. **Security and Threat Hunting**

Security professionals use KQL to detect threats, investigate incidents, and perform advanced security analytics in Azure Sentinel and Microsoft Defender.

### 3. **Troubleshooting and Diagnostics**

Quickly identify and resolve issues by querying logs, metrics, and traces across distributed systems.

### 4. **Business Intelligence**

Analyze operational data, user behavior, and business metrics to drive data-driven decisions.

### 5. **Cost Optimization**

Query Azure resource usage and billing data to identify cost-saving opportunities.

### 6. **Compliance and Auditing**

Track and report on compliance requirements by querying audit logs and activity data.

### 7. **Career Advancement**

KQL skills are highly valued for roles in:

- Cloud Engineers
- DevOps Engineers
- Site Reliability Engineers (SRE)
- Security Analysts
- Data Analysts
- Azure Administrators

## Key Features

### 1. **Intuitive Syntax**

KQL uses a pipeline-based syntax where data flows from left to right through operators:

```kql
TableName
| where TimeGenerated > ago(1h)
| summarize count() by Category
```bash

### 2. **Rich Data Types**

Supports various data types including:

- Numeric (int, long, real, decimal)
- String
- DateTime
- TimeSpan
- Boolean
- Dynamic (JSON-like)
- Arrays and objects

### 3. **Powerful Operators**

- **Filtering**: `where`, `take`, `sample`
- **Aggregation**: `summarize`, `count`, `avg`, `sum`, `min`, `max`
- **Transformation**: `extend`, `project`, `parse`
- **Time-based**: `bin`, `ago`, `datetime`
- **Joins**: `join`, `union`, `lookup`
- **Visualization**: `render` (charts, graphs, maps)

### 4. **Time Intelligence**

Built-in functions for time-series analysis:

- Time binning and bucketing
- Rolling aggregations
- Time-based filtering
- Trend analysis

### 5. **Advanced Analytics**

- Statistical functions
- Machine learning integration
- Anomaly detection
- Pattern recognition
- Geospatial analysis

### 6. **Performance Optimization**

- Query optimization recommendations
- Parallel processing
- Caching mechanisms
- Efficient data sampling

## KQL vs SQL: Key Differences

| Aspect | KQL | SQL |
|--------|-----|-----|
| **Syntax Flow** | Left-to-right pipeline | Declarative clauses |
| **Primary Use** | Log and time-series data | Relational databases |
| **Filtering** | `\| where` | `WHERE` |
| **Aggregation** | `\| summarize` | `GROUP BY` |
| **Selection** | `\| project` | `SELECT` |
| **Case Sensitivity** | Case-sensitive | Varies by implementation |
| **Time Functions** | Rich built-in support | Limited, vendor-specific |
| **JSON Support** | Native dynamic type | JSON functions (newer versions) |

## Common Use Cases

### 1. **Log Analysis**

```kql
// Find errors in the last hour
AppExceptions
| where TimeGenerated > ago(1h)
| summarize ErrorCount = count() by ExceptionType
| order by ErrorCount desc
```bash

### 2. **Performance Monitoring**

```kql
// CPU usage over time
Perf
| where CounterName == "% Processor Time"
| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 5m)
| render timechart
```bash

### 3. **Security Investigation**

```kql
// Failed login attempts
SigninLogs
| where ResultType != 0
| summarize FailedAttempts = count() by UserPrincipalName
| where FailedAttempts > 5
```text

### 4. **Resource Optimization**

```kql
// Identify underutilized VMs
Perf
| where CounterName == "% Processor Time"
| summarize AvgCPU = avg(CounterValue) by Computer
| where AvgCPU < 10
```text

### 5. **Application Insights**

```kql
// Slowest requests
requests
| where duration > 1000
| summarize RequestCount = count() by name
| top 10 by RequestCount desc
```text

## The KQL Philosophy

KQL is designed around several core principles:

### **1. Readability First**

Queries read like natural language pipelines, making them easy to understand and maintain.

### **2. Data Flow Model**

Data flows through a series of transformations, each operator processing and passing results to the next.

### **3. Schema-on-Read**

Flexible schema handling allows querying semi-structured and unstructured data.

### **4. Performance by Default**

Automatic optimizations ensure queries run efficiently on large datasets.

### **5. Interactive Exploration**

Designed for ad-hoc analysis and iterative query development.

## KQL Architecture

### **Tables**

Data is organized in tables, each containing rows and columns with strongly-typed data.

### **Operators**

Operators process data in a pipeline:

- **Tabular operators**: Transform tabular data (where, summarize, join)
- **Scalar operators**: Work with individual values (+, -, *, /)
- **Scalar functions**: Return single values (ago(), now(), strlen())
- **Aggregation functions**: Compute over sets (count(), avg(), sum())

### **Pipeline**

The pipe (`|`) operator chains operations:

```kql
Source
| Operator1
| Operator2
| Operator3
```text

## Getting Started

### **Access KQL Query Environments**

1. **Azure Portal**
   - Navigate to Log Analytics workspace
   - Open "Logs" blade
   - Start writing KQL queries

2. **Azure Data Explorer Web UI**
   - Visit [dataexplorer.azure.com](https://dataexplorer.azure.com)
   - Connect to your cluster
   - Run queries in the query editor

3. **Kusto Explorer Desktop App**
   - Download from [Microsoft](https://aka.ms/ke)
   - Connect to Azure Data Explorer clusters
   - Advanced query development features

4. **VS Code Extension**
   - Install "Kusto" extension
   - Write and test KQL queries locally

### **First Query**

```kql
// Simple query to see recent events
Event
| take 10
```text

### **Basic Analysis**

```kql
// Count events by severity
Event
| summarize count() by EventLevelName
| render piechart
```text

## Learning Path

### **Beginner**

- Understand table structure
- Learn basic operators: `where`, `take`, `project`
- Work with time filters: `ago()`, `between()`
- Simple aggregations: `count()`, `sum()`

### **Intermediate**

- Complex filtering with `where`
- Data transformation: `extend`, `parse`
- Grouping and aggregation: `summarize`
- Joining data: `join`, `union`
- Time-series analysis: `bin()`, `make-series`

### **Advanced**

- Advanced analytics functions
- Machine learning integration
- Query optimization techniques
- Custom functions
- Complex visualizations
- Geospatial queries

## Best Practices

### 1. **Filter Early**

Apply `where` filters as early as possible to reduce data processed.

### 2. **Use Time Ranges**

Always specify time ranges to limit data scanned.

### 3. **Project Only Needed Columns**

Use `project` to select only required columns.

### 4. **Understand Your Schema**

Know your table structure and data types.

### 5. **Use Comments**

Document complex queries with comments (`//` or `/* */`).

### 6. **Test Incrementally**

Build queries step by step, testing each operator.

## Resources and Tools

### **Documentation**

- [Official KQL Documentation](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [KQL Quick Reference](https://docs.microsoft.com/azure/data-explorer/kql-quick-reference)

### **Learning Resources**

- Microsoft Learn KQL modules
- Azure Data Explorer tutorials
- KQL cheat sheets and guides

### **Practice Environments**

- [Azure Data Explorer Demo Environment](https://dataexplorer.azure.com/clusters/help/databases/Samples)
- Log Analytics demo workspace
- Application Insights sample data

### **Community**

- Azure Data Explorer Community
- Microsoft Tech Community
- Stack Overflow (`kusto` and `kql` tags)

## Conclusion

Kusto Query Language is an essential skill for anyone working with Azure services, cloud infrastructure, security operations, or data analytics in the Microsoft ecosystem. Its intuitive syntax, powerful capabilities, and widespread adoption across Azure services make it a valuable tool for modern cloud professionals.

Whether you're monitoring applications, investigating security incidents, analyzing business data, or optimizing cloud costs, KQL provides the flexibility and power to extract meaningful insights from your data quickly and efficiently.

The combination of ease of use, performance, and integration with Azure's ecosystem makes KQL an indispensable language for cloud-native operations and analytics.

---

**Ready to start querying?** Jump to the **User Guide** section below for detailed syntax, operators, and examples, or dive into the [Practice Questions](Questions/) to learn by doing!

---

## User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Query Structure](#basic-query-structure)
3. [Fundamental Operators](#fundamental-operators)
4. [Filtering Data](#filtering-data)
5. [Data Transformation](#data-transformation)
6. [Aggregation and Grouping](#aggregation-and-grouping)
7. [Time-Based Analysis](#time-based-analysis)
8. [Joins and Unions](#joins-and-unions)
9. [Advanced Functions](#advanced-functions)
10. [Visualization](#visualization)
11. [Best Practices](#best-practices)
12. [Common Patterns](#common-patterns)

---

## Getting Started

### Access KQL Query Environments

#### 1. Azure Portal - Log Analytics

```bash
1. Sign in to Azure Portal (portal.azure.com)
2. Navigate to your Log Analytics workspace
3. Click "Logs" in the left menu
4. Start writing queries in the query editor
```bash

#### 2. Azure Data Explorer Web UI

```bash
1. Visit https://dataexplorer.azure.com
2. Sign in with your Azure credentials
3. Connect to a cluster
4. Select a database and start querying
```bash

#### 3. Kusto Explorer (Desktop Application)

```bash
1. Download from https://aka.ms/ke
2. Install and launch the application
3. Add connection to your cluster
4. Enhanced IDE for advanced query development
```bash

#### 4. VS Code Extension

```bash
1. Install "Kusto" extension in VS Code
2. Configure cluster connections
3. Write and execute queries directly in VS Code
```bash

### Your First Query

```kql
// Display 10 rows from any table
Event
| take 10
```bash

---

## Basic Query Structure

KQL queries follow a **pipeline pattern** where data flows from left to right:

```kql
TableName
| operator1
| operator2
| operator3
```bash

### Key Components

1. **Table Name**: The source of data
2. **Pipe (`|`)**: Connects operators in the pipeline
3. **Operators**: Transform, filter, or aggregate data
4. **Comments**: `//` for single line, `/* */` for multi-line

### Example

```kql
// Get error events from the last hour
Event
| where TimeGenerated > ago(1h)
| where EventLevelName == "Error"
| project TimeGenerated, Computer, EventID, RenderedDescription
```bash

---

## Fundamental Operators

### 1. **take** / **limit**

Returns a specified number of rows (same functionality, different names).

```kql
Event
| take 100

// Same as
Event
| limit 100
```bash

### 2. **project**

Selects specific columns to include in the result.

```kql
Event
| project TimeGenerated, Computer, EventLevelName, EventID
```text

### 3. **project-away**

Excludes specific columns from the result.

```kql
Event
| project-away TenantId, SourceSystem, MG
```text

### 4. **project-rename**

Renames columns.

```kql
Event
| project-rename Timestamp = TimeGenerated, Machine = Computer
```text

### 5. **extend**

Adds new calculated columns without removing existing ones.

```kql
Event
| extend DayOfWeek = dayofweek(TimeGenerated)
| extend HourOfDay = hourofday(TimeGenerated)
```text

### 6. **distinct**

Returns unique values from specified columns.

```kql
Event
| distinct Computer
```text

### 7. **sort** / **order**

Sorts results by one or more columns.

```kql
Event
| sort by TimeGenerated desc

// Same as
Event
| order by TimeGenerated desc

// Multiple columns
Event
| order by EventLevelName asc, TimeGenerated desc
```text

### 8. **top**

Returns top N rows based on a specified column.

```kql
Event
| top 10 by TimeGenerated desc
```text

---

## Filtering Data

### **where** Operator

Filters rows based on conditions.

#### Basic Comparisons

```kql
// Equality
Event
| where EventLevelName == "Error"

// Not equal
Event
| where EventLevelName != "Information"

// Numeric comparisons
Perf
| where CounterValue > 90

// Multiple conditions (AND)
Event
| where EventLevelName == "Error" and Computer == "Server01"

// Multiple conditions (OR)
Event
| where EventLevelName == "Error" or EventLevelName == "Warning"
```text

#### String Operations

```kql
// Contains (case-insensitive)
Event
| where RenderedDescription contains "failed"

// Starts with
Event
| where Computer startswith "SQL"

// Ends with
Event
| where Computer endswith "prod"

// Case-sensitive contains
Event
| where RenderedDescription contains_cs "Failed"

// Matches regex
Event
| where Computer matches regex "^SQL[0-9]+"

// In list
Event
| where EventLevelName in ("Error", "Warning", "Critical")

// Has any (word boundary match)
Event
| where RenderedDescription has "error"
```text

#### Null Checks

```kql
// Is null
Event
| where isempty(Computer)

// Is not null
Event
| where isnotempty(Computer)
```text

---

## Data Transformation

### **parse** Operator

Extracts data from strings.

```kql
Event
| where RenderedDescription has "user"
| parse RenderedDescription with * "user " Username " " *
| project TimeGenerated, Username
```text

### **parse-where**

Parse with filtering (only returns successfully parsed rows).

```kql
Event
| parse-where RenderedDescription with * "error code: " ErrorCode:int
| project TimeGenerated, ErrorCode
```text

### **extract**

Extracts data using regular expressions.

```kql
Event
| extend IpAddress = extract(@"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})", 1, RenderedDescription)
| where isnotempty(IpAddress)
```text

### **split**

Splits string into array.

```kql
Event
| extend Parts = split(RenderedDescription, " ")
| extend FirstWord = Parts[0]
```text

### **strcat** / String Concatenation

Combines strings.

```kql
Event
| extend FullInfo = strcat(Computer, ": ", EventLevelName)
```text

### **replace** / **replace_string**

Replaces occurrences in strings.

```kql
Event
| extend CleanDescription = replace(@"\d+", "X", RenderedDescription)
```text

---

## Aggregation and Grouping

### **summarize** Operator

Groups and aggregates data.

#### Basic Aggregations

```kql
// Count all rows
Event
| summarize count()

// Count by group
Event
| summarize count() by EventLevelName

// Multiple groups
Event
| summarize count() by EventLevelName, Computer

// Multiple aggregations
Event
| summarize EventCount = count(), Computers = dcount(Computer) by EventLevelName
```text

#### Common Aggregation Functions

```kql
Perf
| summarize 
    RowCount = count(),
    AvgValue = avg(CounterValue),
    MinValue = min(CounterValue),
    MaxValue = max(CounterValue),
    SumValue = sum(CounterValue),
    StdDev = stdev(CounterValue),
    Percentile95 = percentile(CounterValue, 95)
    by Computer
```text

#### String Aggregations

```kql
Event
| summarize 
    Computers = make_set(Computer),        // Unique values as array
    AllComputers = make_list(Computer),    // All values as array
    FirstComputer = any(Computer)          // Any one value
    by EventLevelName
```text

#### Time-based Aggregations

```kql
Event
| summarize 
    FirstEvent = min(TimeGenerated),
    LastEvent = max(TimeGenerated),
    EventCount = count()
    by Computer
```text

---

## Time-Based Analysis

### Time Filters

#### **ago()** - Relative time from now

```kql
// Last hour
Event
| where TimeGenerated > ago(1h)

// Last 24 hours
Event
| where TimeGenerated > ago(24h)

// Last 7 days
Event
| where TimeGenerated > ago(7d)

// Last 30 days
Event
| where TimeGenerated > ago(30d)
```text

#### **between()** - Time range

```kql
Event
| where TimeGenerated between(ago(2h) .. ago(1h))

// Specific dates
Event
| where TimeGenerated between(datetime(2024-01-01) .. datetime(2024-01-31))
```text

#### **now()** - Current time

```kql
Event
| extend HoursAgo = (now() - TimeGenerated) / 1h
```text

### Time Bucketing with **bin()**

Groups time values into intervals:

```kql
// 5-minute buckets
Event
| summarize count() by bin(TimeGenerated, 5m)

// Hourly buckets
Event
| summarize count() by bin(TimeGenerated, 1h)

// Daily buckets
Event
| summarize count() by bin(TimeGenerated, 1d)
```text

### Time Series with **make-series**

Creates time series with uniform time intervals:

```kql
Event
| make-series EventCount = count() default = 0 
    on TimeGenerated 
    from ago(7d) to now() 
    step 1h
    by EventLevelName
```text

### Date/Time Functions

```kql
Event
| extend 
    Year = getyear(TimeGenerated),
    Month = getmonth(TimeGenerated),
    Day = dayofmonth(TimeGenerated),
    Hour = hourofday(TimeGenerated),
    DayOfWeek = dayofweek(TimeGenerated),
    WeekOfYear = week_of_year(TimeGenerated)
| project TimeGenerated, Year, Month, Day, Hour, DayOfWeek
```text

---

## Joins and Unions

### **join** Operator

Combines rows from two tables based on matching values.

#### Inner Join (default)

```kql
Event
| where EventLevelName == "Error"
| join (
    Heartbeat
    | distinct Computer
) on Computer
```text

#### Join Kinds

```kql
// Inner join (only matching rows)
Table1 | join kind=inner Table2 on Key

// Left outer (all from left, matching from right)
Table1 | join kind=leftouter Table2 on Key

// Right outer (all from right, matching from left)
Table1 | join kind=rightouter Table2 on Key

// Full outer (all from both)
Table1 | join kind=fullouter Table2 on Key

// Left anti (rows in left NOT in right)
Table1 | join kind=leftanti Table2 on Key

// Right anti (rows in right NOT in left)
Table1 | join kind=rightanti Table2 on Key

// Left semi (rows in left that HAVE match in right)
Table1 | join kind=leftsemi Table2 on Key
```text

#### Example

```kql
let Errors = Event
    | where EventLevelName == "Error"
    | summarize ErrorCount = count() by Computer;
let Performance = Perf
    | where CounterName == "% Processor Time"
    | summarize AvgCPU = avg(CounterValue) by Computer;
Errors
| join kind=inner (Performance) on Computer
| project Computer, ErrorCount, AvgCPU
```text

### **union** Operator

Combines rows from multiple tables:

```kql
// Union two tables
union Event, Syslog
| take 100

// Union with specific columns
union 
    (Event | project TimeGenerated, Computer, Source = "Event"),
    (Syslog | project TimeGenerated, Computer, Source = "Syslog")

// Union multiple tables
union Event, Syslog, Heartbeat
| summarize count() by Type
```text

---

## Advanced Functions

### Dynamic/JSON Functions

```kql
// Parse JSON
Event
| extend Details = parse_json(RenderedDescription)
| extend ErrorCode = Details.errorCode
| extend Message = Details.message

// Access array elements
Event
| extend Tags = parse_json(Tags)
| extend FirstTag = Tags[0]

// Expand array to rows
Event
| extend Tags = parse_json(Tags)
| mv-expand Tag = Tags
```text

### String Functions

```kql
Event
| extend 
    Length = strlen(Computer),
    Upper = toupper(Computer),
    Lower = tolower(Computer),
    Substring = substring(Computer, 0, 3),
    Trimmed = trim(@"\s", Computer),
    Reversed = reverse(Computer)
```text

### Mathematical Functions

```kql
Perf
| extend 
    RoundedValue = round(CounterValue, 2),
    CeilingValue = ceiling(CounterValue),
    FloorValue = floor(CounterValue),
    AbsValue = abs(CounterValue),
    PowerValue = pow(CounterValue, 2),
    SquareRoot = sqrt(CounterValue),
    LogValue = log10(CounterValue)
```text

### Conditional Logic

```kql
// case function
Event
| extend Severity = case(
    EventLevelName == "Error", "High",
    EventLevelName == "Warning", "Medium",
    "Low"
)

// iif function (ternary operator)
Event
| extend IsError = iif(EventLevelName == "Error", "Yes", "No")
```text

### Statistical Functions

```kql
Perf
| summarize 
    Average = avg(CounterValue),
    StdDev = stdev(CounterValue),
    Variance = variance(CounterValue),
    P50 = percentile(CounterValue, 50),
    P95 = percentile(CounterValue, 95),
    P99 = percentile(CounterValue, 99)
    by Computer
```text

---

## Visualization

### **render** Operator

Creates visualizations from query results.

#### Time Charts

```kql
Event
| summarize count() by bin(TimeGenerated, 1h)
| render timechart
```text

#### Bar Chart

```kql
Event
| summarize count() by EventLevelName
| render barchart
```text

#### Column Chart

```kql
Event
| summarize count() by Computer
| top 10 by count_
| render columnchart
```text

#### Pie Chart

```kql
Event
| summarize count() by EventLevelName
| render piechart
```text

#### Area Chart

```kql
Perf
| where CounterName == "% Processor Time"
| summarize avg(CounterValue) by bin(TimeGenerated, 5m)
| render areachart
```text

#### Line Chart

```kql
Perf
| summarize avg(CounterValue) by bin(TimeGenerated, 5m), Computer
| render linechart
```text

#### Scatter Chart

```kql
Perf
| summarize AvgCPU = avg(CounterValue) by Computer
| extend RandomValue = rand()
| render scatterchart with (xcolumn=AvgCPU, ycolumn=RandomValue)
```text

---

## Best Practices

### 1. **Filter Early and Often**

Apply filters as early as possible to reduce data processed.

```kql
// Good - filter first
Event
| where TimeGenerated > ago(1h)
| where EventLevelName == "Error"
| summarize count() by Computer

// Bad - filter late
Event
| summarize count() by Computer, EventLevelName
| where EventLevelName == "Error"
```text

### 2. **Always Use Time Filters**

Limit the time range to avoid scanning unnecessary data.

```kql
// Always specify time range
Event
| where TimeGenerated > ago(24h)
| where EventLevelName == "Error"
```text

### 3. **Project Only Needed Columns**

Reduce data transfer by selecting only required columns.

```kql
// Good
Event
| project TimeGenerated, Computer, EventID

// Bad (returns all columns)
Event
```text

### 4. **Use `let` Statements for Reusability**

Define variables and subqueries for cleaner code.

```kql
let timeRange = 24h;
let errorEvents = Event
    | where TimeGenerated > ago(timeRange)
    | where EventLevelName == "Error";
errorEvents
| summarize count() by Computer
```text

### 5. **Leverage `summarize` Instead of `distinct`**

When counting unique values, `dcount()` is more efficient.

```kql
// Better
Event
| summarize UniqueComputers = dcount(Computer)

// Works but less efficient for large datasets
Event
| distinct Computer
| count
```text

### 6. **Use `take` for Quick Exploration**

When exploring data, use `take` to limit results.

```kql
Event
| take 100
```text

### 7. **Comment Your Queries**

Document complex logic for future reference.

```kql
// Get error events from production servers in the last hour
let prodServers = dynamic(["PROD-SQL01", "PROD-WEB01"]);
Event
| where TimeGenerated > ago(1h)  // Last hour only
| where Computer in (prodServers)  // Production servers only
| where EventLevelName == "Error"  // Errors only
```text

### 8. **Avoid Wildcards When Possible**

Use specific column names instead of wildcards.

```kql
// Good
Event
| project TimeGenerated, Computer, EventLevelName

// Avoid
Event
| project *
```text

---

## Common Patterns

### Pattern 1: Top N by Category

```kql
Event
| where TimeGenerated > ago(24h)
| summarize count() by Computer
| top 10 by count_ desc
```text

### Pattern 2: Trend Analysis

```kql
Event
| where TimeGenerated > ago(7d)
| summarize count() by bin(TimeGenerated, 1h), EventLevelName
| render timechart
```text

### Pattern 3: Error Rate Calculation

```kql
Event
| summarize 
    TotalEvents = count(),
    ErrorEvents = countif(EventLevelName == "Error")
| extend ErrorRate = (ErrorEvents * 100.0) / TotalEvents
```text

### Pattern 4: Comparing Time Periods

```kql
let current = Event
    | where TimeGenerated > ago(1h)
    | summarize CurrentCount = count();
let previous = Event
    | where TimeGenerated between(ago(2h) .. ago(1h))
    | summarize PreviousCount = count();
current
| extend Previous = toscalar(previous)
| extend PercentChange = ((CurrentCount - Previous) * 100.0) / Previous
```text

### Pattern 5: Finding Anomalies

```kql
Perf
| where TimeGenerated > ago(7d)
| where CounterName == "% Processor Time"
| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 1h)
| extend Average = avg(AvgCPU), StdDev = stdev(AvgCPU)
| extend IsAnomaly = abs(AvgCPU - Average) > (2 * StdDev)
| where IsAnomaly
```text

### Pattern 6: Pivoting Data

```kql
Event
| summarize count() by EventLevelName, Computer
| evaluate pivot(EventLevelName)
```text

### Pattern 7: Rolling Aggregations

```kql
Perf
| where TimeGenerated > ago(24h)
| where CounterName == "% Processor Time"
| sort by TimeGenerated asc
| serialize
| extend MovingAvg = row_avg(CounterValue, 10)
```text

### Pattern 8: Correlation Analysis

```kql
let HighCPU = Perf
    | where CounterName == "% Processor Time"
    | where CounterValue > 80
    | distinct Computer;
Event
| where Computer in (HighCPU)
| where EventLevelName == "Error"
| summarize count() by Computer
```text

---

## Quick Reference

### Time Units

- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours
- `d` - days

### Comparison Operators

- `==` - equals
- `!=` - not equals
- `>`, `>=` - greater than (or equal)
- `<`, `<=` - less than (or equal)
- `in` - in list
- `!in` - not in list
- `contains` - contains substring
- `startswith` - starts with
- `endswith` - ends with
- `matches regex` - regex match

### Logical Operators

- `and` - logical AND
- `or` - logical OR
- `not` - logical NOT

### Aggregation Functions

- `count()` - count rows
- `dcount()` - distinct count
- `avg()` - average
- `sum()` - sum
- `min()` - minimum
- `max()` - maximum
- `stdev()` - standard deviation
- `variance()` - variance
- `percentile()` - percentile
- `make_list()` - array of all values
- `make_set()` - array of unique values

---

## Resources

### Official Documentation

- [KQL Quick Reference](https://docs.microsoft.com/azure/data-explorer/kql-quick-reference)
- [KQL Language Reference](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [Azure Monitor Log Queries](https://docs.microsoft.com/azure/azure-monitor/logs/log-query-overview)

### Practice Environments

- [Azure Data Explorer Demo](https://dataexplorer.azure.com/clusters/help/databases/Samples)
- [Log Analytics Demo Workspace](https://portal.azure.com/#blade/Microsoft_Azure_Monitoring_Logs/DemoLogsBlade)

### Learning Paths

- [Microsoft Learn - KQL Modules](https://docs.microsoft.com/learn/paths/kusto-query-language/)
- [Pluralsight KQL Courses](https://www.pluralsight.com)
- [KQL Café (YouTube)](https://aka.ms/KQLCafe)

---

**Next Step**: Practice with the [Questions](Questions/) to master KQL through hands-on exercises!

