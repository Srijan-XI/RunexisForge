# 🗄️ PL/SQL — Oracle Database Programming

> *"PL/SQL: Where SQL Meets Power, Logic Meets Data"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is PL/SQL Used For?](#what-is-plsql-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [PL/SQL vs T-SQL](#plsql-vs-t-sql)
7. [Who Should Learn PL/SQL?](#who-should-learn-plsql)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Setup & Tools](#setup--tools)
    - [PL/SQL Block Structure](#plsql-block-structure)
    - [Variables & Data Types](#variables--data-types)
    - [Control Flow](#control-flow)
    - [Cursors](#cursors)
    - [Stored Procedures](#stored-procedures)
    - [Functions](#functions)
    - [Packages](#packages)
    - [Triggers](#triggers)
    - [Exception Handling](#exception-handling)
    - [Transactions](#transactions)
    - [Collections](#collections)
    - [Dynamic SQL](#dynamic-sql)
    - [Best Practices](#best-practices)

---

## Introduction

**PL/SQL** (Procedural Language / Structured Query Language) is Oracle Corporation's proprietary procedural extension to SQL. It was introduced in 1991 and allows developers to write full programs — loops, conditions, variables, exception handling — that execute directly inside the Oracle Database engine.

Unlike standard SQL (which is declarative), PL/SQL is **procedural**: you describe *how* to achieve a result step by step, combining the power of SQL's set-based operations with procedural constructs.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | Oracle Corporation |
| **First Released** | 1991 (Oracle 6) |
| **Current Version** | PL/SQL in Oracle Database 21c / 23ai |
| **Based On** | Ada programming language (structured blocks) |
| **Platform** | Oracle Database (on-prem & Oracle Cloud) |
| **Standard** | Oracle-specific (not ANSI standard) |

### Why PL/SQL Exists

Oracle needed a way to:
- Run complex **business logic inside the database** (avoiding round-trips)
- Group SQL statements into **reusable, secured** programs
- Handle **errors gracefully** without crashing the entire transaction
- Enforce **complex data rules** via triggers

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Block Structure** | Code organized into DECLARE / BEGIN / EXCEPTION / END blocks |
| **Tight SQL Integration** | SQL statements embedded natively — no connectors needed |
| **Stored Procedures** | Precompiled, named programs stored in the database |
| **Functions** | Return a single value; usable in SQL queries |
| **Packages** | Logical grouping of procedures, functions, variables |
| **Triggers** | Auto-execute on DML events (INSERT, UPDATE, DELETE) |
| **Cursors** | Iterate over multi-row query results |
| **Exception Handling** | Structured error handling with named exceptions |
| **Collections** | Varrays, nested tables, associative arrays |
| **Dynamic SQL** | Build and execute SQL strings at runtime (EXECUTE IMMEDIATE) |
| **Object Types** | User-defined object types with methods |
| **Bulk Operations** | BULK COLLECT / FORALL for high-performance DML |

---

## What is PL/SQL Used For?

### 🏦 Banking & Financial Systems
- Real-time transaction processing
- Fraud detection rules (triggers)
- Account balance calculations
- Oracle FLEXCUBE (banking platform) runs on PL/SQL

### 🏢 Enterprise Resource Planning (ERP)
- **Oracle E-Business Suite** — heavily PL/SQL-based
- **Oracle PeopleSoft** — HR, payroll, financials
- Custom business rule enforcement

### 🏥 Healthcare
- Hospital information systems
- Patient record management
- Billing and claims processing

### 🛍️ Retail & E-Commerce
- Inventory management
- Order processing pipelines
- Pricing engine rules

### 📊 Data Warehousing & ETL
- Extract, Transform, Load pipelines
- Complex data aggregation
- Oracle Data Integrator integration

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Server-Side Execution** | Logic runs in the DB, eliminating network round-trips |
| **Performance** | Bulk operations (FORALL/BULK COLLECT) process millions of rows efficiently |
| **Security** | Grant EXECUTE on a procedure without exposing underlying tables |
| **Encapsulation** | Packages group related logic for clean APIs |
| **Error Handling** | Structured exceptions prevent silent failures |
| **Oracle Integration** | Works natively with all Oracle features (Partitioning, RAC, Advanced Queuing) |
| **Portability within Oracle** | Code runs identically across Oracle versions and platforms |
| **ACID Compliance** | Full transaction support with COMMIT / ROLLBACK / SAVEPOINT |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **Oracle-Only** | Not portable to PostgreSQL, MySQL, SQL Server |
| **Licensing Costs** | Oracle Database is expensive |
| **Debugging** | Limited IDE support compared to application-level languages |
| **Version Control** | Stored objects in DB are harder to version-control than files |
| **Learning Curve** | Package/cursor/bulk operation patterns are complex |
| **Not for General Computing** | Poor for CPU-heavy logic; use Java/Python for that |

---

## PL/SQL vs T-SQL

| Feature | PL/SQL (Oracle) | T-SQL (SQL Server) |
|---------|-----------------|-------------------|
| **Platform** | Oracle Database | Microsoft SQL Server / Azure SQL |
| **Block syntax** | `BEGIN … END;` with DECLARE section | `BEGIN … END` (no mandatory DECLARE block) |
| **Packages** | ✅ Yes (powerful) | ❌ No |
| **Cursors** | Explicit + Implicit | Explicit + FETCH-based |
| **Error handling** | `EXCEPTION WHEN … THEN` | `TRY … CATCH` |
| **Dynamic SQL** | `EXECUTE IMMEDIATE` | `EXEC` / `sp_executesql` |
| **NULL handling** | Standard SQL NULLs | Same + `ISNULL()` |
| **Community** | Enterprise / Oracle shops | Microsoft / Azure ecosystems |

---

## Who Should Learn PL/SQL?

### ✅ Perfect For:
- **Oracle Database developers** and DBAs
- **Backend developers** working with Oracle ERP systems
- **Data engineers** building Oracle-based ETL pipelines
- **Financial / banking sector** technology teams
- **Anyone maintaining legacy Oracle codebases**

### 💡 Consider T-SQL Instead If:
- Your stack is Microsoft / Azure / .NET
- You work with SQL Server or Azure SQL Database

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Oracle Documentation** | [docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/](https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/) |
| **Oracle Live SQL** | [livesql.oracle.com](https://livesql.oracle.com) — free browser sandbox |
| **Oracle Dev Gym** | [devgym.oracle.com](https://devgym.oracle.com) — quizzes and workouts |
| **Book** | *Oracle PL/SQL Programming* — Steven Feuerstein (the definitive reference) |

---

## User Guide

---

### Setup & Tools

#### Option 1: Oracle Live SQL (Zero Install — Recommended for Learning)

Go to [livesql.oracle.com](https://livesql.oracle.com), create a free account, and run PL/SQL directly in your browser.

#### Option 2: Oracle Database Express Edition (Free, Local)

```bash
# Download Oracle Database 21c XE (Express Edition) — free
# https://www.oracle.com/database/technologies/xe-downloads.html

# On Linux (RHEL/Oracle Linux):
sudo rpm -ivh oracle-database-xe-21c-1.0-1.x86_64.rpm
sudo /etc/init.d/oracle-xe-21c configure
```

#### Option 3: Docker (Fastest Local Setup)

```bash
# Pull Oracle XE image
docker pull gvenzl/oracle-xe:21-slim

# Run container
docker run -d \
  --name oracle-xe \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=MyPassword123 \
  gvenzl/oracle-xe:21-slim

# Connect using SQLPlus
docker exec -it oracle-xe sqlplus system/MyPassword123@//localhost:1521/XE
```

#### SQL Developer (GUI Tool — Free)

Download from [oracle.com/tools/downloads/sqldev-downloads.html](https://www.oracle.com/tools/downloads/sqldev-downloads.html)

Configure connection:
- **Hostname**: localhost
- **Port**: 1521
- **Service Name**: XE
- **Username**: system
- **Password**: (your password)

---

### PL/SQL Block Structure

Every PL/SQL program is a **block** with this structure:

```sql
DECLARE
    -- Variable declarations (optional)
    v_message VARCHAR2(100);
BEGIN
    -- Executable statements (required)
    v_message := 'Hello, PL/SQL!';
    DBMS_OUTPUT.PUT_LINE(v_message);
EXCEPTION
    -- Error handling (optional)
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/
```

> **Important**: Run `SET SERVEROUTPUT ON;` before using `DBMS_OUTPUT.PUT_LINE` in SQLPlus / SQL Developer.

#### Block Types

| Type | Description | Stored in DB? |
|------|-------------|--------------|
| **Anonymous Block** | One-time execution, not named | ❌ No |
| **Stored Procedure** | Named block, called by name | ✅ Yes |
| **Function** | Named block, returns a value | ✅ Yes |
| **Package** | Collection of procedures & functions | ✅ Yes |
| **Trigger** | Auto-fires on table events | ✅ Yes |

---

### Variables & Data Types

```sql
DECLARE
    -- Scalar types
    v_name      VARCHAR2(100)   := 'Alice';
    v_age       NUMBER(3)       := 30;
    v_salary    NUMBER(10, 2)   := 75000.50;
    v_hired     DATE            := SYSDATE;
    v_active    BOOLEAN         := TRUE;
    v_count     PLS_INTEGER     := 0;      -- faster integer for PL/SQL logic

    -- %TYPE: inherit a column's datatype
    v_emp_name  employees.first_name%TYPE;

    -- %ROWTYPE: inherit an entire row's structure
    v_emp_row   employees%ROWTYPE;

    -- Constants
    c_max_retries CONSTANT NUMBER := 5;

BEGIN
    -- Assign values
    SELECT first_name, last_name
    INTO v_emp_name, v_name
    FROM employees
    WHERE employee_id = 100;

    -- Fetch a full row
    SELECT * INTO v_emp_row
    FROM employees
    WHERE employee_id = 100;

    DBMS_OUTPUT.PUT_LINE('Employee: ' || v_emp_row.first_name || ' ' || v_emp_row.last_name);
    DBMS_OUTPUT.PUT_LINE('Department: ' || v_emp_row.department_id);
END;
/
```

---

### Control Flow

#### IF / ELSIF / ELSE

```sql
DECLARE
    v_score NUMBER := 85;
    v_grade VARCHAR2(2);
BEGIN
    IF v_score >= 90 THEN
        v_grade := 'A';
    ELSIF v_score >= 80 THEN
        v_grade := 'B';
    ELSIF v_score >= 70 THEN
        v_grade := 'C';
    ELSE
        v_grade := 'F';
    END IF;

    DBMS_OUTPUT.PUT_LINE('Grade: ' || v_grade);
END;
/
```

#### CASE Expression

```sql
DECLARE
    v_day   NUMBER := TO_NUMBER(TO_CHAR(SYSDATE, 'D'));
    v_name  VARCHAR2(20);
BEGIN
    v_name := CASE v_day
        WHEN 1 THEN 'Sunday'
        WHEN 2 THEN 'Monday'
        WHEN 3 THEN 'Tuesday'
        WHEN 4 THEN 'Wednesday'
        WHEN 5 THEN 'Thursday'
        WHEN 6 THEN 'Friday'
        WHEN 7 THEN 'Saturday'
        ELSE 'Unknown'
    END;

    DBMS_OUTPUT.PUT_LINE('Today is: ' || v_name);
END;
/
```

#### Loops

```sql
DECLARE
    v_i NUMBER := 1;
BEGIN
    -- Basic LOOP
    LOOP
        DBMS_OUTPUT.PUT_LINE('Loop: ' || v_i);
        v_i := v_i + 1;
        EXIT WHEN v_i > 5;
    END LOOP;

    -- WHILE LOOP
    v_i := 1;
    WHILE v_i <= 3 LOOP
        DBMS_OUTPUT.PUT_LINE('While: ' || v_i);
        v_i := v_i + 1;
    END WHILE;

    -- FOR LOOP (implicit counter)
    FOR i IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('For: ' || i);
    END LOOP;

    -- Reverse FOR LOOP
    FOR i IN REVERSE 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Reverse: ' || i);
    END LOOP;
END;
/
```

---

### Cursors

Cursors let you process query results **row by row**.

#### Implicit Cursors (SELECT INTO)

```sql
DECLARE
    v_name VARCHAR2(100);
BEGIN
    SELECT first_name || ' ' || last_name
    INTO v_name
    FROM employees
    WHERE employee_id = 100;

    DBMS_OUTPUT.PUT_LINE('Employee: ' || v_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found.');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple employees found.');
END;
/
```

#### Explicit Cursors

```sql
DECLARE
    CURSOR c_employees IS
        SELECT employee_id, first_name, salary
        FROM employees
        WHERE department_id = 50
        ORDER BY salary DESC;

    v_emp c_employees%ROWTYPE;
BEGIN
    OPEN c_employees;

    LOOP
        FETCH c_employees INTO v_emp;
        EXIT WHEN c_employees%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE(
            v_emp.employee_id || ' - ' ||
            v_emp.first_name  || ' - $' ||
            v_emp.salary
        );
    END LOOP;

    CLOSE c_employees;
END;
/
```

#### Cursor FOR Loop (Simpler Syntax)

```sql
BEGIN
    FOR emp IN (SELECT employee_id, first_name, salary
                FROM employees
                WHERE department_id = 50) LOOP

        DBMS_OUTPUT.PUT_LINE(emp.first_name || ': $' || emp.salary);
    END LOOP;
END;
/
```

---

### Stored Procedures

Stored procedures are named, reusable PL/SQL programs. They do not return a value (use functions for that).

#### Create a Procedure

```sql
CREATE OR REPLACE PROCEDURE give_raise (
    p_employee_id  IN  employees.employee_id%TYPE,
    p_percent      IN  NUMBER,
    p_new_salary   OUT employees.salary%TYPE
)
IS
    v_current_salary employees.salary%TYPE;
BEGIN
    SELECT salary
    INTO v_current_salary
    FROM employees
    WHERE employee_id = p_employee_id;

    p_new_salary := v_current_salary * (1 + p_percent / 100);

    UPDATE employees
    SET salary = p_new_salary
    WHERE employee_id = p_employee_id;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Raise applied. New salary: $' || p_new_salary);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'Employee ID ' || p_employee_id || ' not found.');
END give_raise;
/
```

#### Call the Procedure

```sql
DECLARE
    v_new_salary employees.salary%TYPE;
BEGIN
    give_raise(
        p_employee_id => 100,
        p_percent     => 10,
        p_new_salary  => v_new_salary
    );
    DBMS_OUTPUT.PUT_LINE('New salary: $' || v_new_salary);
END;
/
```

---

### Functions

Functions are like procedures but **must return a value** and can be used in SQL queries.

```sql
CREATE OR REPLACE FUNCTION get_full_name (
    p_employee_id IN employees.employee_id%TYPE
)
RETURN VARCHAR2
IS
    v_full_name VARCHAR2(200);
BEGIN
    SELECT first_name || ' ' || last_name
    INTO v_full_name
    FROM employees
    WHERE employee_id = p_employee_id;

    RETURN v_full_name;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'Unknown Employee';
END get_full_name;
/
```

Use in SQL:

```sql
-- Call directly in a query
SELECT employee_id, get_full_name(employee_id) AS full_name
FROM employees
WHERE department_id = 50;
```

Use in PL/SQL:

```sql
DECLARE
    v_name VARCHAR2(200);
BEGIN
    v_name := get_full_name(100);
    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name);
END;
/
```

---

### Packages

A **Package** is the most powerful PL/SQL construct — it groups related procedures, functions, types, and variables into a single named unit with a public API.

#### Package Specification (Public Interface)

```sql
CREATE OR REPLACE PACKAGE employee_pkg AS

    -- Public type
    TYPE t_emp_record IS RECORD (
        id     employees.employee_id%TYPE,
        name   VARCHAR2(200),
        salary employees.salary%TYPE
    );

    -- Public constants
    c_max_salary CONSTANT NUMBER := 500000;

    -- Public procedure signatures
    PROCEDURE hire_employee(
        p_first_name    IN VARCHAR2,
        p_last_name     IN VARCHAR2,
        p_department_id IN NUMBER,
        p_salary        IN NUMBER
    );

    FUNCTION get_department_headcount(p_dept_id IN NUMBER) RETURN NUMBER;

END employee_pkg;
/
```

#### Package Body (Implementation)

```sql
CREATE OR REPLACE PACKAGE BODY employee_pkg AS

    -- Private helper (not in spec = not accessible outside)
    FUNCTION validate_salary(p_salary IN NUMBER) RETURN BOOLEAN IS
    BEGIN
        RETURN p_salary BETWEEN 0 AND c_max_salary;
    END;

    PROCEDURE hire_employee(
        p_first_name    IN VARCHAR2,
        p_last_name     IN VARCHAR2,
        p_department_id IN NUMBER,
        p_salary        IN NUMBER
    ) IS
    BEGIN
        IF NOT validate_salary(p_salary) THEN
            RAISE_APPLICATION_ERROR(-20010, 'Salary out of range.');
        END IF;

        INSERT INTO employees (first_name, last_name, department_id, salary, hire_date)
        VALUES (p_first_name, p_last_name, p_department_id, p_salary, SYSDATE);

        COMMIT;
    END hire_employee;

    FUNCTION get_department_headcount(p_dept_id IN NUMBER) RETURN NUMBER IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count
        FROM employees
        WHERE department_id = p_dept_id;
        RETURN v_count;
    END;

END employee_pkg;
/
```

Use the package:

```sql
BEGIN
    employee_pkg.hire_employee('John', 'Doe', 50, 60000);
END;
/

SELECT employee_pkg.get_department_headcount(50) FROM dual;
```

---

### Triggers

Triggers automatically execute PL/SQL code **before or after DML events** on a table.

#### Row-Level Trigger (BEFORE INSERT)

```sql
CREATE OR REPLACE TRIGGER trg_employee_audit
BEFORE INSERT OR UPDATE OR DELETE ON employees
FOR EACH ROW
DECLARE
    v_action VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_action := 'INSERT';
    ELSIF UPDATING THEN
        v_action := 'UPDATE';
    ELSE
        v_action := 'DELETE';
    END IF;

    INSERT INTO employee_audit_log (
        action, employee_id, changed_by, changed_at,
        old_salary, new_salary
    ) VALUES (
        v_action,
        COALESCE(:NEW.employee_id, :OLD.employee_id),
        USER,
        SYSDATE,
        :OLD.salary,
        :NEW.salary
    );
END;
/
```

#### Statement-Level Trigger

```sql
CREATE OR REPLACE TRIGGER trg_prevent_weekend_changes
BEFORE INSERT OR UPDATE OR DELETE ON employees
BEGIN
    IF TO_CHAR(SYSDATE, 'DY') IN ('SAT', 'SUN') THEN
        RAISE_APPLICATION_ERROR(-20020, 'Data changes not allowed on weekends.');
    END IF;
END;
/
```

---

### Exception Handling

```sql
DECLARE
    v_salary employees.salary%TYPE;
    e_salary_too_high EXCEPTION;
    PRAGMA EXCEPTION_INIT(e_salary_too_high, -20050);
BEGIN
    SELECT salary INTO v_salary
    FROM employees
    WHERE employee_id = 999;  -- non-existent

    IF v_salary > 200000 THEN
        RAISE e_salary_too_high;
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found. SQLCODE: ' || SQLCODE);

    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple rows returned unexpectedly.');

    WHEN e_salary_too_high THEN
        DBMS_OUTPUT.PUT_LINE('Salary exceeds maximum allowed.');

    WHEN OTHERS THEN
        -- Always log unexpected errors
        DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM);
        DBMS_OUTPUT.PUT_LINE('Error code: ' || SQLCODE);
        ROLLBACK;
        RAISE;  -- re-raise to propagate upward
END;
/
```

#### Custom Application Errors

```sql
-- Define a range: -20000 to -20999 is reserved for user-defined errors

PROCEDURE check_budget(p_dept_id IN NUMBER, p_amount IN NUMBER) IS
    v_budget NUMBER;
BEGIN
    SELECT budget INTO v_budget FROM departments WHERE department_id = p_dept_id;

    IF p_amount > v_budget THEN
        RAISE_APPLICATION_ERROR(
            -20100,
            'Amount $' || p_amount || ' exceeds department budget of $' || v_budget
        );
    END IF;
END;
/
```

---

### Transactions

```sql
BEGIN
    SAVEPOINT before_transfer;

    UPDATE accounts SET balance = balance - 1000 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 1000 WHERE account_id = 2;

    -- Verify no negative balance
    DECLARE
        v_balance NUMBER;
    BEGIN
        SELECT balance INTO v_balance FROM accounts WHERE account_id = 1;
        IF v_balance < 0 THEN
            ROLLBACK TO before_transfer;
            RAISE_APPLICATION_ERROR(-20200, 'Insufficient funds.');
        END IF;
    END;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transfer complete.');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
```

---

### Collections

```sql
DECLARE
    -- Associative Array (index-by table)
    TYPE t_salary_map IS TABLE OF NUMBER INDEX BY VARCHAR2(100);
    v_salaries t_salary_map;

    -- Nested Table
    TYPE t_name_list IS TABLE OF VARCHAR2(100);
    v_names t_name_list := t_name_list();

    -- VARRAY (fixed max size)
    TYPE t_top5 IS VARRAY(5) OF NUMBER;
    v_top_salaries t_top5 := t_top5();
BEGIN
    -- Associative Array usage
    v_salaries('Alice') := 75000;
    v_salaries('Bob')   := 85000;
    DBMS_OUTPUT.PUT_LINE('Alice: ' || v_salaries('Alice'));

    -- Nested Table usage
    v_names.EXTEND(3);
    v_names(1) := 'Alice';
    v_names(2) := 'Bob';
    v_names(3) := 'Charlie';
    FOR i IN 1 .. v_names.COUNT LOOP
        DBMS_OUTPUT.PUT_LINE(v_names(i));
    END LOOP;
END;
/
```

#### BULK COLLECT & FORALL (High Performance)

```sql
DECLARE
    TYPE t_id_list  IS TABLE OF employees.employee_id%TYPE;
    TYPE t_sal_list IS TABLE OF employees.salary%TYPE;

    v_ids     t_id_list;
    v_salaries t_sal_list;
BEGIN
    -- Bulk fetch into collections (single round-trip to DB)
    SELECT employee_id, salary
    BULK COLLECT INTO v_ids, v_salaries
    FROM employees
    WHERE department_id = 50;

    -- Bulk update using FORALL (single round-trip)
    FORALL i IN 1 .. v_ids.COUNT
        UPDATE employees
        SET salary = v_salaries(i) * 1.05
        WHERE employee_id = v_ids(i);

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Updated ' || SQL%ROWCOUNT || ' employees.');
END;
/
```

---

### Dynamic SQL

```sql
DECLARE
    v_table_name    VARCHAR2(30) := 'EMPLOYEES';
    v_column        VARCHAR2(30) := 'SALARY';
    v_dept_id       NUMBER       := 50;
    v_avg_sal       NUMBER;
    v_sql           VARCHAR2(500);
BEGIN
    -- Build SQL string dynamically
    v_sql := 'SELECT AVG(' || v_column || ') FROM ' || v_table_name
             || ' WHERE department_id = :dept_id';

    -- Execute with bind variable (prevents SQL injection)
    EXECUTE IMMEDIATE v_sql
        INTO v_avg_sal
        USING v_dept_id;

    DBMS_OUTPUT.PUT_LINE('Average salary: $' || ROUND(v_avg_sal, 2));
END;
/
```

---

### Best Practices

#### 1. Always Use Bind Variables in Dynamic SQL

```sql
-- BAD: SQL injection risk
v_sql := 'SELECT * FROM users WHERE name = ''' || p_name || '''';

-- GOOD: parameterized
v_sql := 'SELECT * FROM users WHERE name = :name';
EXECUTE IMMEDIATE v_sql USING p_name;
```

#### 2. Use BULK COLLECT / FORALL for Large Data Sets

```sql
-- BAD: row-by-row (slow for large data)
FOR emp IN (SELECT employee_id FROM employees) LOOP
    UPDATE employees SET salary = salary * 1.1 WHERE employee_id = emp.employee_id;
END LOOP;

-- GOOD: bulk operation
FORALL i IN 1..v_emp_ids.COUNT
    UPDATE employees SET salary = salary * 1.1 WHERE employee_id = v_emp_ids(i);
```

#### 3. Use %TYPE and %ROWTYPE for Column References

```sql
-- BAD: hard-coded datatype that breaks if column changes
v_name VARCHAR2(50);

-- GOOD: anchored to the column definition
v_name employees.first_name%TYPE;
```

#### 4. Always Handle Exceptions Explicitly

```sql
-- Always handle NO_DATA_FOUND and TOO_MANY_ROWS for SELECT INTO
EXCEPTION
    WHEN NO_DATA_FOUND THEN ...
    WHEN TOO_MANY_ROWS THEN ...
    WHEN OTHERS THEN
        -- Log, then optionally re-raise
        log_error(SQLCODE, SQLERRM);
        RAISE;
```

#### 5. Use Packages to Organize Code

- Put related procedures and functions in packages
- Keep the spec minimal (public API only)
- Put implementation details in the body
- Use package-level variables for session-state caching

#### 6. Commit Rarely and at the Right Level

```sql
-- BAD: committing inside a loop (breaks transaction atomicity)
FOR i IN 1..100 LOOP
    UPDATE ...; COMMIT;
END LOOP;

-- GOOD: commit once at the end
FORALL i IN 1..100 UPDATE ...;
COMMIT;
```

#### 7. Avoid Hardcoding Values

```sql
-- BAD
IF v_status = 1 THEN ...

-- GOOD: use named constants in a package
IF v_status = status_pkg.c_active THEN ...
```

---

## Summary

| Use PL/SQL When | Consider Alternatives When |
|-----------------|---------------------------|
| Working with Oracle Database | Your DB is SQL Server → **T-SQL** |
| Complex server-side business logic | Simple CRUD apps → ORM in Python/Java |
| Oracle ERP (E-Business Suite, PeopleSoft) | Portability is required → **PostgreSQL pgSQL** |
| High-volume bulk data operations | Non-Oracle cloud → **Azure SQL / BigQuery** |
| Strong transaction & audit requirements | Modern event-driven architecture → application code |

---

## Next Steps

1. **[T-SQL](../T-SQL/T-SQL.md)** — Microsoft's SQL Server equivalent
2. **Oracle SQL Developer** — Explore stored objects visually
3. **Oracle Certification** — OCA/OCP Database Developer track

---

*Last Updated: February 20, 2026*
