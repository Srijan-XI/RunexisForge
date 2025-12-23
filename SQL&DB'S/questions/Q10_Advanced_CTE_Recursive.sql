-- Question 10 (Advanced): Common Table Expression (CTE) with Recursive Query
-- Write a SQL query using CTE to find the hierarchy of employees
-- (manager-subordinate relationship).
-- Table: employees (id, name, manager_id, department, salary)

-- Expected output: Employee hierarchy showing reporting structure

-- Solution using CTE:

-- Non-recursive CTE to calculate department statistics:
WITH DepartmentStats AS (
    SELECT 
        department,
        COUNT(*) AS employee_count,
        AVG(salary) AS avg_salary,
        MAX(salary) AS max_salary
    FROM employees
    GROUP BY department
)
SELECT 
    e.name,
    e.department,
    e.salary,
    ds.employee_count,
    ds.avg_salary,
    ds.max_salary
FROM employees e
JOIN DepartmentStats ds ON e.department = ds.department
WHERE e.salary > ds.avg_salary
ORDER BY e.department, e.salary DESC;

-- Recursive CTE for organizational hierarchy:
WITH RECURSIVE EmployeeHierarchy AS (
    -- Base case: Top-level managers (no manager)
    SELECT 
        id,
        name,
        manager_id,
        department,
        salary,
        0 AS level,
        CAST(name AS VARCHAR(1000)) AS hierarchy_path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: Employees with managers
    SELECT 
        e.id,
        e.name,
        e.manager_id,
        e.department,
        e.salary,
        eh.level + 1,
        CAST(eh.hierarchy_path || ' > ' || e.name AS VARCHAR(1000))
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
)
SELECT 
    id,
    REPEAT('  ', level) || name AS employee_name,
    department,
    salary,
    level AS hierarchy_level,
    hierarchy_path
FROM EmployeeHierarchy
ORDER BY hierarchy_path;

-- Find all subordinates of a specific manager:
WITH RECURSIVE Subordinates AS (
    -- Base case: Specific manager
    SELECT 
        id,
        name,
        manager_id,
        0 AS level
    FROM employees
    WHERE id = 1  -- Replace with specific manager ID
    
    UNION ALL
    
    -- Recursive case: Direct and indirect reports
    SELECT 
        e.id,
        e.name,
        e.manager_id,
        s.level + 1
    FROM employees e
    INNER JOIN Subordinates s ON e.manager_id = s.id
)
SELECT * FROM Subordinates
ORDER BY level, name;
