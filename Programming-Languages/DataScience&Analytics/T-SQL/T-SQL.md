# 🗄️ T-SQL — Microsoft SQL Server Programming

> *"T-SQL: The Language of Microsoft's Data Platform"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is T-SQL Used For?](#what-is-t-sql-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [T-SQL vs PL/SQL](#t-sql-vs-plsql)
7. [Who Should Learn T-SQL?](#who-should-learn-t-sql)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Setup & Tools](#setup--tools)
    - [Basic Queries](#basic-queries)
    - [Variables & Data Types](#variables--data-types)
    - [Control Flow](#control-flow)
    - [Stored Procedures](#stored-procedures)
    - [Functions](#functions)
    - [Common Table Expressions (CTEs)](#common-table-expressions-ctes)
    - [Window Functions](#window-functions)
    - [Triggers](#triggers)
    - [Error Handling](#error-handling)
    - [Transactions](#transactions)
    - [Dynamic SQL](#dynamic-sql)
    - [Indexes & Query Optimization](#indexes--query-optimization)
    - [Best Practices](#best-practices)

---

## Introduction

**T-SQL** (Transact-SQL) is Microsoft's proprietary extension to the SQL standard, used with **Microsoft SQL Server**, **Azure SQL Database**, **Azure SQL Managed Instance**, and **Azure Synapse Analytics**. It adds procedural programming constructs — variables, loops, conditionals, error handling, stored procedures — on top of standard SQL's declarative model.

Introduced in 1989 (co-developed by Microsoft and Sybase), T-SQL has evolved into a feature-rich server-side language tightly integrated with the Microsoft data and cloud platform.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | Microsoft & Sybase (originally) |
| **First Released** | 1989 (in SQL Server 1.0) |
| **Current Version** | SQL Server 2022 / Azure SQL |
| **Platform** | SQL Server, Azure SQL, Azure Synapse |
| **Standard** | Microsoft-specific extension of ANSI SQL |
| **License** | Proprietary (free Developer Edition available) |

### Why T-SQL Exists

SQL alone is declarative — it describes *what* to retrieve, not *how* to process it step by step. T-SQL adds:
- **Procedural logic** (IF/WHILE/CASE) inside the database
- **Stored procedures** for reusable, secure operations
- **Error handling** (TRY/CATCH) for reliable transaction processing
- **Advanced analytics** (window functions, CTEs, PIVOT)

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Stored Procedures** | Named, precompiled programs stored and executed in SQL Server |
| **Functions** | Scalar, inline table-valued, and multi-statement table-valued |
| **CTEs** | Common Table Expressions for readable, recursive queries |
| **Window Functions** | ROW_NUMBER, RANK, LAG, LEAD, running totals |
| **TRY/CATCH** | Structured exception handling |
| **Transactions** | Full ACID support with SAVEPOINT |
| **Triggers** | DML (INSERT/UPDATE/DELETE) and DDL triggers |
| **Dynamic SQL** | `EXEC` and `sp_executesql` for runtime query building |
| **JSON Support** | Native JSON parsing and generation (SQL Server 2016+) |
| **Temporal Tables** | Built-in history tracking (SQL Server 2016+) |
| **Columnstore Indexes** | Massively parallel analytics on large tables |
| **Azure Integration** | Seamless with Azure Data Factory, Power BI, Synapse |

---

## What is T-SQL Used For?

### 🏢 Enterprise Applications
- Line-of-business applications in .NET + SQL Server stacks
- ERP systems (Microsoft Dynamics)
- CRM systems (Dynamics 365)

### 📊 Business Intelligence & Data Warehousing
- **SSRS** (SQL Server Reporting Services) — reports
- **SSAS** (SQL Server Analysis Services) — OLAP cubes
- **SSIS** (SQL Server Integration Services) — ETL pipelines
- **Power BI** — connects natively to SQL Server

### ☁️ Azure Cloud Data Platform
- **Azure SQL Database** — fully managed SQL Server in the cloud
- **Azure SQL Managed Instance** — near-full SQL Server compatibility
- **Azure Synapse Analytics** — data warehousing at scale

### 🏦 Finance & Banking (Microsoft Ecosystem)
- Transaction processing systems
- Regulatory reporting
- Risk analytics

### 🏥 Healthcare
- Electronic Health Records (EHR) on SQL Server
- Claims and billing systems
- HL7 data processing pipelines

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Deep Microsoft Integration** | Native to .NET, Azure, Power BI, SSRS, SSIS |
| **Azure SQL** | Fully managed, globally distributed, serverless options |
| **Excellent Tooling** | SQL Server Management Studio (SSMS), Azure Data Studio, VS Code |
| **SSMS Execution Plans** | Visual query plan analysis for optimization |
| **Temporal Tables** | Built-in change tracking / time-travel queries |
| **JSON & XML** | Native `FOR JSON`, `OPENJSON`, `FOR XML` support |
| **Row-Level Security** | Built-in data access policies |
| **Always Encrypted** | Column-level encryption without app changes |
| **Free Developer Edition** | Full features, free for development/testing |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **SQL Server Only** | Not portable to Oracle, PostgreSQL, MySQL |
| **Licensing Costs** | SQL Server Enterprise can be expensive |
| **No Packages** | No equivalent to Oracle's powerful package construct |
| **Windows-Centric History** | Linux support added in 2017 but feels secondary |
| **Limited Procedural Power** | Less expressive than PL/SQL for complex DB logic |
| **Proprietary Extensions** | T-SQL dialects differ from ANSI SQL |

---

## T-SQL vs PL/SQL

| Feature | T-SQL (SQL Server) | PL/SQL (Oracle) |
|---------|-------------------|-----------------|
| **Platform** | SQL Server / Azure SQL | Oracle Database |
| **Error Handling** | `TRY … CATCH` | `EXCEPTION WHEN … THEN` |
| **Packages** | ❌ None | ✅ Powerful package system |
| **Dynamic SQL** | `sp_executesql` (more secure) | `EXECUTE IMMEDIATE` |
| **JSON support** | ✅ Built-in (2016+) | ✅ Built-in (12c+) |
| **Cloud** | Azure SQL (native) | Oracle Cloud |
| **IDE** | SSMS, Azure Data Studio | SQL Developer, SQL*Plus |
| **CTEs** | ✅ Full ANSI support | ✅ Full ANSI support |
| **Window Functions** | ✅ Full support | ✅ Full support |
| **Licensing** | Developer Edition free | XE free, Enterprise costly |

---

## Who Should Learn T-SQL?

### ✅ Perfect For:
- **.NET / C# developers** working with SQL Server backends
- **Database administrators** managing SQL Server instances
- **Power BI / SSRS report developers**
- **Data engineers** building Azure Data Factory pipelines
- **Business analysts** querying corporate SQL Server databases

### 💡 Consider PL/SQL Instead If:
- Your organization runs Oracle Database
- You work with Oracle ERP products

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Microsoft Docs** | [learn.microsoft.com/sql/t-sql](https://learn.microsoft.com/en-us/sql/t-sql/) |
| **SQL Server Developer Edition** | Free at [microsoft.com/sql-server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) |
| **SSMS Download** | [aka.ms/ssmsfullsetup](https://aka.ms/ssmsfullsetup) |
| **Book** | *T-SQL Fundamentals* — Itzik Ben-Gan (definitive reference) |
| **Book** | *T-SQL Querying* — Itzik Ben-Gan |

---

## User Guide

---

### Setup & Tools

#### Option 1: SQL Server Developer Edition (Free, Windows/Linux)

```powershell
# Download free from:
# https://www.microsoft.com/en-us/sql-server/sql-server-downloads
# Choose "Developer" edition

# On Linux (Ubuntu):
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/22.04/mssql-server-2022.list)"
sudo apt-get install -y mssql-server
sudo /opt/mssql/bin/mssql-conf setup
```

#### Option 2: Docker (Fastest Setup)

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest

docker run -e "ACCEPT_EULA=Y" \
           -e "MSSQL_SA_PASSWORD=YourStrong!Password" \
           -p 1433:1433 \
           --name sql-server \
           -d mcr.microsoft.com/mssql/server:2022-latest
```

#### Option 3: Azure SQL Database (Cloud — Free Tier Available)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search for **SQL Database** → Create
3. Choose **Free serverless** tier for development
4. Connect with **Azure Data Studio** or **SSMS**

#### SQL Server Management Studio (SSMS) — GUI Tool

Download from: [aka.ms/ssmsfullsetup](https://aka.ms/ssmsfullsetup)

Connect dialog:
- **Server name**: `localhost` or `.\SQLEXPRESS`
- **Authentication**: SQL Server Authentication
- **Login**: `sa`
- **Password**: (your SA password)

#### Azure Data Studio (Cross-Platform IDE)

Download from: [github.com/microsoft/azuredatastudio](https://github.com/microsoft/azuredatastudio/releases)  
Supports Windows, macOS, Linux.

---

### Basic Queries

```sql
-- Create a database
CREATE DATABASE CompanyDB;
USE CompanyDB;

-- Create a table
CREATE TABLE Employees (
    EmployeeID   INT           IDENTITY(1,1) PRIMARY KEY,
    FirstName    NVARCHAR(50)  NOT NULL,
    LastName     NVARCHAR(50)  NOT NULL,
    DepartmentID INT,
    Salary       DECIMAL(10,2),
    HireDate     DATE          DEFAULT GETDATE(),
    IsActive     BIT           DEFAULT 1
);

-- Insert rows
INSERT INTO Employees (FirstName, LastName, DepartmentID, Salary)
VALUES
    ('Alice',   'Smith',   10, 75000),
    ('Bob',     'Johnson', 20, 85000),
    ('Charlie', 'Brown',   10, 65000);

-- SELECT with filtering and sorting
SELECT
    EmployeeID,
    FirstName + ' ' + LastName AS FullName,
    Salary,
    HireDate
FROM Employees
WHERE Salary > 70000
ORDER BY Salary DESC;

-- UPDATE
UPDATE Employees
SET Salary = Salary * 1.10
WHERE DepartmentID = 10;

-- DELETE
DELETE FROM Employees WHERE IsActive = 0;

-- Aggregate functions
SELECT
    DepartmentID,
    COUNT(*)        AS HeadCount,
    AVG(Salary)     AS AvgSalary,
    MAX(Salary)     AS MaxSalary,
    MIN(Salary)     AS MinSalary,
    SUM(Salary)     AS TotalPayroll
FROM Employees
GROUP BY DepartmentID
HAVING COUNT(*) > 1
ORDER BY TotalPayroll DESC;
```

---

### Variables & Data Types

```sql
-- Declare and assign variables
DECLARE @Name       NVARCHAR(100) = 'Alice';
DECLARE @Age        INT           = 30;
DECLARE @Salary     DECIMAL(10,2) = 75000.50;
DECLARE @HireDate   DATE          = GETDATE();
DECLARE @IsActive   BIT           = 1;

-- SET vs SELECT assignment
SET @Name = 'Bob';
SELECT @Salary = Salary FROM Employees WHERE EmployeeID = 1;

-- Print for debugging
PRINT 'Name: ' + @Name;
PRINT 'Salary: ' + CAST(@Salary AS VARCHAR);

-- Common T-SQL Data Types
-- INT, BIGINT, SMALLINT, TINYINT
-- DECIMAL(p,s), FLOAT, REAL, MONEY
-- NVARCHAR(n), VARCHAR(n), CHAR(n), NCHAR(n), NVARCHAR(MAX)
-- DATE, TIME, DATETIME, DATETIME2, DATETIMEOFFSET
-- BIT (boolean), UNIQUEIDENTIFIER (GUID)
-- VARBINARY(MAX) (binary), XML, JSON (stored as NVARCHAR)

-- NEWID() for GUIDs
DECLARE @Id UNIQUEIDENTIFIER = NEWID();
PRINT CAST(@Id AS VARCHAR(36));
```

---

### Control Flow

#### IF / ELSE

```sql
DECLARE @Score INT = 85;
DECLARE @Grade NVARCHAR(2);

IF @Score >= 90
    SET @Grade = 'A';
ELSE IF @Score >= 80
    SET @Grade = 'B';
ELSE IF @Score >= 70
    SET @Grade = 'C';
ELSE
    SET @Grade = 'F';

PRINT 'Grade: ' + @Grade;
```

#### CASE Expression

```sql
SELECT
    EmployeeID,
    FirstName,
    Salary,
    CASE
        WHEN Salary >= 100000 THEN 'Senior'
        WHEN Salary >= 70000  THEN 'Mid-Level'
        ELSE                       'Junior'
    END AS SalaryBand
FROM Employees;
```

#### WHILE Loop

```sql
DECLARE @Counter INT = 1;
DECLARE @Sum     INT = 0;

WHILE @Counter <= 10
BEGIN
    SET @Sum = @Sum + @Counter;
    SET @Counter = @Counter + 1;

    -- BREAK exits the loop; CONTINUE skips to the next iteration
    IF @Counter = 8 BREAK;
END;

PRINT 'Sum: ' + CAST(@Sum AS VARCHAR);
```

---

### Stored Procedures

```sql
-- Create a stored procedure with input and output parameters
CREATE OR ALTER PROCEDURE usp_GiveRaise
    @EmployeeID  INT,
    @PercentRaise DECIMAL(5,2),
    @NewSalary   DECIMAL(10,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;  -- suppress "X rows affected" messages

    IF NOT EXISTS (SELECT 1 FROM Employees WHERE EmployeeID = @EmployeeID)
    BEGIN
        RAISERROR('Employee ID %d not found.', 16, 1, @EmployeeID);
        RETURN;
    END;

    UPDATE Employees
    SET Salary = Salary * (1 + @PercentRaise / 100)
    OUTPUT INSERTED.Salary INTO @NewSalary    -- capture new value
    WHERE EmployeeID = @EmployeeID;

    -- Simpler approach:
    SELECT @NewSalary = Salary FROM Employees WHERE EmployeeID = @EmployeeID;

    PRINT 'New salary: ' + CAST(@NewSalary AS VARCHAR);
END;
GO

-- Execute the procedure
DECLARE @ResultSalary DECIMAL(10,2);

EXEC usp_GiveRaise
    @EmployeeID   = 1,
    @PercentRaise = 10,
    @NewSalary    = @ResultSalary OUTPUT;

PRINT 'Returned salary: ' + CAST(@ResultSalary AS VARCHAR);
```

---

### Functions

#### Scalar Function

```sql
CREATE OR ALTER FUNCTION dbo.fn_GetFullName
(
    @EmployeeID INT
)
RETURNS NVARCHAR(200)
AS
BEGIN
    DECLARE @FullName NVARCHAR(200);

    SELECT @FullName = FirstName + ' ' + LastName
    FROM Employees
    WHERE EmployeeID = @EmployeeID;

    RETURN ISNULL(@FullName, 'Unknown');
END;
GO

-- Use in a query
SELECT EmployeeID, dbo.fn_GetFullName(EmployeeID) AS FullName
FROM Employees;
```

#### Inline Table-Valued Function (Best Performance)

```sql
CREATE OR ALTER FUNCTION dbo.fn_GetDepartmentEmployees
(
    @DepartmentID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT EmployeeID, FirstName, LastName, Salary
    FROM Employees
    WHERE DepartmentID = @DepartmentID
);
GO

-- Use like a table
SELECT * FROM dbo.fn_GetDepartmentEmployees(10)
ORDER BY Salary DESC;
```

---

### Common Table Expressions (CTEs)

CTEs make complex queries readable and enable recursion.

#### Basic CTE

```sql
WITH HighEarners AS (
    SELECT EmployeeID, FirstName, LastName, Salary
    FROM Employees
    WHERE Salary > 80000
),
DeptTotals AS (
    SELECT DepartmentID, SUM(Salary) AS TotalSalary
    FROM Employees
    GROUP BY DepartmentID
)
SELECT
    e.FirstName,
    e.LastName,
    e.Salary,
    d.TotalSalary AS DeptTotal
FROM HighEarners e
JOIN DeptTotals d ON e.DepartmentID = d.DepartmentID;  -- Note: need DepartmentID in HighEarners
```

#### Recursive CTE (Hierarchy / Tree)

```sql
-- Org chart: find all employees under a given manager
WITH OrgChart AS (
    -- Anchor member: start with the top manager
    SELECT EmployeeID, FirstName, ManagerID, 0 AS Level
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive member: get direct reports
    SELECT e.EmployeeID, e.FirstName, e.ManagerID, oc.Level + 1
    FROM Employees e
    INNER JOIN OrgChart oc ON e.ManagerID = oc.EmployeeID
)
SELECT EmployeeID, FirstName, Level
FROM OrgChart
ORDER BY Level, EmployeeID;
```

---

### Window Functions

Window functions operate across a "window" of related rows without collapsing them into groups.

```sql
SELECT
    EmployeeID,
    FirstName,
    DepartmentID,
    Salary,

    -- Ranking
    ROW_NUMBER() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS RowNum,
    RANK()       OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS Rank,
    DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY Salary DESC) AS DenseRank,
    NTILE(4)     OVER (ORDER BY Salary DESC)                            AS Quartile,

    -- Aggregates as windows
    AVG(Salary) OVER (PARTITION BY DepartmentID)         AS DeptAvgSalary,
    SUM(Salary) OVER (PARTITION BY DepartmentID)         AS DeptTotalSalary,
    SUM(Salary) OVER (ORDER BY HireDate ROWS UNBOUNDED PRECEDING) AS RunningTotal,

    -- Offset functions
    LAG(Salary,  1) OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS PrevSalary,
    LEAD(Salary, 1) OVER (PARTITION BY DepartmentID ORDER BY HireDate) AS NextSalary

FROM Employees;
```

---

### Triggers

#### DML Trigger (AFTER INSERT/UPDATE)

```sql
CREATE TABLE EmployeeAudit (
    AuditID     INT          IDENTITY(1,1) PRIMARY KEY,
    Action      VARCHAR(10),
    EmployeeID  INT,
    OldSalary   DECIMAL(10,2),
    NewSalary   DECIMAL(10,2),
    ChangedBy   NVARCHAR(100),
    ChangedAt   DATETIME2 DEFAULT SYSDATETIME()
);
GO

CREATE OR ALTER TRIGGER trg_Employee_SalaryAudit
ON Employees
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO EmployeeAudit (Action, EmployeeID, OldSalary, NewSalary, ChangedBy)
    SELECT
        CASE WHEN d.EmployeeID IS NULL THEN 'INSERT' ELSE 'UPDATE' END,
        COALESCE(i.EmployeeID, d.EmployeeID),
        d.Salary,          -- old value (from deleted pseudo-table)
        i.Salary,          -- new value (from inserted pseudo-table)
        SYSTEM_USER
    FROM inserted i
    FULL OUTER JOIN deleted d ON i.EmployeeID = d.EmployeeID;
END;
GO
```

#### DDL Trigger (Prevent Schema Changes)

```sql
CREATE OR ALTER TRIGGER trg_PreventDrop
ON DATABASE
FOR DROP_TABLE, ALTER_TABLE
AS
BEGIN
    PRINT 'Schema changes are not allowed in production!';
    ROLLBACK;
END;
GO
```

---

### Error Handling

T-SQL uses `TRY … CATCH` blocks — the modern replacement for `@@ERROR` checking.

```sql
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Employees SET Salary = Salary * 1.10 WHERE DepartmentID = 10;

    -- Intentional divide-by-zero for demo
    DECLARE @Test INT = 1 / 0;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    -- Capture error details
    DECLARE @ErrorMsg    NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSev    INT            = ERROR_SEVERITY();
    DECLARE @ErrorState  INT            = ERROR_STATE();
    DECLARE @ErrorLine   INT            = ERROR_LINE();
    DECLARE @ErrorProc   NVARCHAR(200)  = ERROR_PROCEDURE();

    PRINT 'Error in: '   + ISNULL(@ErrorProc, 'Ad-hoc');
    PRINT 'Line: '       + CAST(@ErrorLine AS VARCHAR);
    PRINT 'Severity: '   + CAST(@ErrorSev  AS VARCHAR);
    PRINT 'Message: '    + @ErrorMsg;

    -- Re-raise as a custom error
    THROW 50001, 'Salary update failed. See error log.', 1;
END CATCH;
```

#### Custom Errors with THROW vs RAISERROR

```sql
-- THROW (SQL Server 2012+, preferred)
THROW 50001, 'Custom error message', 1;

-- RAISERROR (older, still common)
RAISERROR('Custom error: %s', 16, 1, 'details here');
```

---

### Transactions

```sql
BEGIN TRANSACTION;

DECLARE @FromAccount INT = 1001;
DECLARE @ToAccount   INT = 1002;
DECLARE @Amount      DECIMAL(10,2) = 500.00;

BEGIN TRY
    -- Deduct from sender
    UPDATE BankAccounts
    SET Balance = Balance - @Amount
    WHERE AccountID = @FromAccount;

    -- Check for negative balance
    IF (SELECT Balance FROM BankAccounts WHERE AccountID = @FromAccount) < 0
        THROW 50010, 'Insufficient funds.', 1;

    -- Credit receiver
    UPDATE BankAccounts
    SET Balance = Balance + @Amount
    WHERE AccountID = @ToAccount;

    COMMIT TRANSACTION;
    PRINT 'Transfer successful.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    THROW;  -- re-raise the exception
END CATCH;
```

---

### Dynamic SQL

```sql
DECLARE @TableName   NVARCHAR(128) = N'Employees';
DECLARE @DeptID      INT           = 10;
DECLARE @SQL         NVARCHAR(1000);
DECLARE @Params      NVARCHAR(200);

-- ALWAYS use sp_executesql with parameters — never string concatenation for user input
SET @SQL    = N'SELECT * FROM ' + QUOTENAME(@TableName) +
              N' WHERE DepartmentID = @DeptID ORDER BY Salary DESC';
SET @Params = N'@DeptID INT';

EXEC sp_executesql @SQL, @Params, @DeptID = @DeptID;
```

> ⚠️ **Never** build dynamic SQL with raw string concatenation of user input — use `sp_executesql` with parameters to prevent SQL injection.

---

### Indexes & Query Optimization

```sql
-- Clustered Index (physical sort order of the table — one per table)
CREATE CLUSTERED INDEX IX_Employees_EmployeeID ON Employees(EmployeeID);

-- Nonclustered Index (logical pointer — many per table)
CREATE NONCLUSTERED INDEX IX_Employees_Dept_Salary
    ON Employees(DepartmentID, Salary DESC)
    INCLUDE (FirstName, LastName);   -- covering index

-- View the execution plan in SSMS
-- Press Ctrl+M to enable "Include Actual Execution Plan"
SELECT * FROM Employees WHERE DepartmentID = 10;

-- Check index usage stats
SELECT
    OBJECT_NAME(ix.object_id)          AS TableName,
    ix.name                            AS IndexName,
    ixu.user_seeks,
    ixu.user_scans,
    ixu.user_lookups,
    ixu.user_updates
FROM sys.dm_db_index_usage_stats ixu
JOIN sys.indexes ix
    ON ixu.object_id = ix.object_id
    AND ixu.index_id = ix.index_id
WHERE OBJECT_NAME(ix.object_id) = 'Employees';

-- Missing index hints
SELECT *
FROM sys.dm_db_missing_index_details
WHERE database_id = DB_ID();
```

---

### Best Practices

#### 1. Always Use `SET NOCOUNT ON` in Procedures

```sql
CREATE OR ALTER PROCEDURE usp_MyProc AS
BEGIN
    SET NOCOUNT ON;  -- Prevents "N rows affected" noise from O/Rs
    -- ...
END;
```

#### 2. Use `sp_executesql` for All Dynamic SQL

```sql
-- NEVER do this (SQL injection risk):
SET @SQL = 'SELECT * FROM Users WHERE Name = ''' + @UserInput + '''';

-- ALWAYS do this:
SET @SQL = 'SELECT * FROM Users WHERE Name = @Name';
EXEC sp_executesql @SQL, N'@Name NVARCHAR(100)', @Name = @UserInput;
```

#### 3. Use Appropriate Data Types

```sql
-- BAD: VARCHAR for IDs that never have characters
UserID VARCHAR(50)

-- GOOD: INT or BIGINT for numeric IDs, UNIQUEIDENTIFIER for GUIDs
UserID INT IDENTITY(1,1)
UserID UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID()
```

#### 4. Avoid `SELECT *` in Production Code

```sql
-- BAD
SELECT * FROM Employees;

-- GOOD: explicit columns (prevents breakage when schema changes)
SELECT EmployeeID, FirstName, LastName, Salary FROM Employees;
```

#### 5. Use CTEs Over Nested Subqueries for Readability

```sql
-- BAD: nested subqueries
SELECT * FROM (SELECT * FROM (SELECT ...)) AS a;

-- GOOD: named CTEs
WITH StepOne AS (...), StepTwo AS (... FROM StepOne)
SELECT * FROM StepTwo;
```

#### 6. Handle NULLs Explicitly

```sql
-- NULL comparisons use IS NULL / IS NOT NULL, not = NULL
WHERE Column IS NULL
WHERE Column IS NOT NULL

-- Use ISNULL() or COALESCE() to substitute defaults
SELECT ISNULL(MiddleName, '') AS MiddleName FROM Employees;
SELECT COALESCE(Phone, Mobile, Email, 'No contact') AS ContactInfo FROM Customers;
```

#### 7. Use Schema Prefixes on All Objects

```sql
-- BAD: relies on default schema resolution (slow + risky)
SELECT * FROM Employees;

-- GOOD: fully qualified
SELECT * FROM dbo.Employees;
EXEC dbo.usp_GiveRaise @EmployeeID = 1, @PercentRaise = 10;
```

#### 8. Prefer `DATETIME2` over `DATETIME`

```sql
-- DATETIME has 3ms accuracy and no timezone info
HireDate DATETIME

-- DATETIME2 has 100ns accuracy and is ANSI-compliant
HireDate DATETIME2(0)   -- 0 = second precision; 7 = 100ns precision

-- DATETIMEOFFSET for timezone-aware timestamps
CreatedAt DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()
```

---

## Summary

| Use T-SQL When | Consider Alternatives When |
|----------------|---------------------------|
| Your DB is SQL Server / Azure SQL | Oracle environment → **PL/SQL** |
| .NET / Microsoft ecosystem stack | PostgreSQL → **pgSQL / plpgsql** |
| Power BI / SSRS reporting | Analytical scale → **BigQuery / Snowflake** |
| Azure cloud data platform | NoSQL workloads → MongoDB, Cosmos DB |
| Windows / Active Directory integration | First-time SQL learner → pure ANSI SQL first |

---

## Next Steps

1. **[PL/SQL](../PL-SQL/PL-SQL.md)** — Oracle's equivalent procedural extension
2. **SSMS Execution Plans** — learn to read and optimize query plans
3. **Microsoft Certified: Azure Database Administrator Associate** — DP-300 exam

---

*Last Updated: February 20, 2026*
