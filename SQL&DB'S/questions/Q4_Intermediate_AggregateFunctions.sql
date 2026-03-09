-- Question 4 (Intermediate): Aggregate Functions - COUNT, AVG, SUM
-- Write SQL queries to:
-- 1. Count the total number of employees
-- 2. Calculate the average salary
-- 3. Find the total salary expense
-- Table: employees (id, name, age, department, salary)

-- Expected output: Statistical summaries of employee data

-- Solution:

-- 1. Count total employees
SELECT COUNT(*) AS total_employees FROM employees;

-- 2. Average salary
SELECT AVG(salary) AS average_salary FROM employees;

-- 3. Total salary expense
SELECT SUM(salary) AS total_salary_expense FROM employees;

-- Combined query:
SELECT 
    COUNT(*) AS total_employees,
    AVG(salary) AS average_salary,
    SUM(salary) AS total_salary_expense,
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary
FROM employees;
