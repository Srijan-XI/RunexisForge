-- Question 5 (Intermediate): GROUP BY with HAVING
-- Write a SQL query to find departments with more than 5 employees
-- and display the department name along with the employee count.
-- Table: employees (id, name, age, department, salary)

-- Expected output: Departments with > 5 employees, showing department name and count

-- Solution:
SELECT 
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY employee_count DESC;

-- Alternative with average salary per department:
SELECT 
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY employee_count DESC;
