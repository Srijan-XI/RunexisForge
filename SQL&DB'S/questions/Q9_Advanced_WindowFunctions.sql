-- Question 9 (Advanced): Window Functions (Ranking)
-- Write a SQL query to rank employees by salary within each department.
-- Table: employees (id, name, age, department, salary)

-- Expected output: Employees with rank based on salary per department

-- Solution using RANK():
SELECT 
    id,
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM employees
ORDER BY department, salary_rank;

-- Alternative using ROW_NUMBER() (no ties):
SELECT 
    id,
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM employees
ORDER BY department, salary_rank;

-- Using DENSE_RANK() (consecutive ranks even with ties):
SELECT 
    id,
    name,
    department,
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
FROM employees
ORDER BY department, salary_rank;

-- Find top 3 highest paid employees per department:
WITH RankedEmployees AS (
    SELECT 
        id,
        name,
        department,
        salary,
        RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank
    FROM employees
)
SELECT * FROM RankedEmployees
WHERE salary_rank <= 3
ORDER BY department, salary_rank;
