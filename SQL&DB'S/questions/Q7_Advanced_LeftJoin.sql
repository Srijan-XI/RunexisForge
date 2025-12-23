-- Question 7 (Advanced): LEFT JOIN
-- Write a SQL query to retrieve all departments and the number of employees in each,
-- including departments with zero employees.
-- Tables: 
--   employees (id, name, age, department_id, salary)
--   departments (id, department_name, location)

-- Expected output: All departments with employee count (including 0)

-- Solution:
SELECT 
    d.department_name,
    d.location,
    COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.department_name, d.location
ORDER BY employee_count DESC;

-- Alternative with department details:
SELECT 
    d.id AS department_id,
    d.department_name,
    d.location,
    COUNT(e.id) AS employee_count,
    COALESCE(AVG(e.salary), 0) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.department_name, d.location
ORDER BY employee_count DESC;
