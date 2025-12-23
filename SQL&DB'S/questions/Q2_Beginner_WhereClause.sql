-- Question 2 (Beginner): Filter Records with WHERE Clause
-- Write a SQL query to find all employees who work in the 'Sales' department.
-- Table: employees (id, name, age, department, salary)

-- Expected output: All employees where department = 'Sales'

-- Solution:
SELECT * FROM employees
WHERE department = 'Sales';

-- With specific columns:
SELECT id, name, age, salary
FROM employees
WHERE department = 'Sales';
