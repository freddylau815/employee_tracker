USE company_db;


-- Get All DEPARMENTS
SELECT
        departments.id,
        departments.dep_name
    FROM departments;


-- -- Get ALL EMPLOYEES
-- SELECT 
--         employees.id,
--         employees.first_name,
--         employees.last_name,
--         roles.title,
--         departments.dep_name,
--         -- Copy of EMPLOYEE 
--         CONCAT(manager.first_name, ' ', manager.last_name) AS manager
--     FROM employees
--         JOIN roles
--             ON employees.role_id = roles.id
--         JOIN departments
--             ON roles.department_id = departments.id
--         -- Table to the LEFT of this keyword (employees) Give me all of them even if employees.manager key is null
--         LEFT JOIN employees manager
--             ON employees.manager_id = manager.id;

        
-- -- Get EMPLOYEES by DEPARTMENT
--  SELECT
--         employees.first_name,
--         employees.last_name,
--         roles.title,
