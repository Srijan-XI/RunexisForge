-- Question 6 (Intermediate): INNER JOIN
-- Write a SQL query to retrieve employee names along with their department names.
-- Tables: 
--   employees (id, name, age, department_id, salary)
--   departments (id, department_name, location)

-- Expected output: Employee name with corresponding department name

-- Solution:
SELECT 
    e.name AS employee_name,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- With additional columns:
SELECT 
    e.id,
    e.name AS employee_name,
    e.age,
    e.salary,
    d.department_name,
    d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY d.department_name, e.name;
