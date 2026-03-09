-- Question 1 (Beginner): Select All Records from a Table
-- Write a SQL query to retrieve all records from the 'employees' table.
-- The table has columns: id, name, age, department, salary

-- Expected output: All rows and columns from employees table

-- Solution:
SELECT * FROM employees;

-- Alternative (specify columns for better practice):
SELECT id, name, age, department, salary FROM employees;
