-- Question 8 (Advanced): Subquery
-- Write a SQL query to find employees who earn more than the average salary.
-- Table: employees (id, name, age, department, salary)

-- Expected output: Employees with salary > average salary

-- Solution using subquery:
SELECT 
    id,
    name,
    department,
    salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- Alternative with difference from average:
SELECT 
    id,
    name,
    department,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS above_average
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- Using subquery in FROM clause:
SELECT 
    e.name,
    e.salary,
    avg_sal.average_salary,
    e.salary - avg_sal.average_salary AS difference
FROM employees e
CROSS JOIN (SELECT AVG(salary) AS average_salary FROM employees) avg_sal
WHERE e.salary > avg_sal.average_salary
ORDER BY e.salary DESC;
