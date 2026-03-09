-- Question 3 (Beginner): Order Results
-- Write a SQL query to retrieve all employees ordered by their salary in descending order.
-- Table: employees (id, name, age, department, salary)

-- Expected output: All employees sorted by salary (highest to lowest)

-- Solution:
SELECT * FROM employees
ORDER BY salary DESC;

-- For ascending order (lowest to highest):
SELECT * FROM employees
ORDER BY salary ASC;

-- Multiple column sorting (by department, then salary):
SELECT * FROM employees
ORDER BY department ASC, salary DESC;
