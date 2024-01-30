const inquirer = require("inquirer");
const db = require("../db/connection");
const path = require("path");

const question = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  },
];

function askQuestion() {
  inquirer.prompt(question).then((answerObj) => {
    console.log(answerObj.task);
    switch (answerObj.task) {
      case "View all departments":
        vieAllDep();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDep();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
    }
  });
}

// VIEW FUNCTIONS -------------------------------

async function vieAllDep() {
  try {
    const query = `  
    SELECT
        departments.id,
        departments.dep_name
    FROM departments;
        `;
    const [departments] = await db.promise().query(query);

    console.table(departments);
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

async function viewAllRoles() {
  try {
    const query = `  
      SELECT 
            roles.id,
            roles.title,
            roles.salary,
            departments.dep_name
      FROM roles
        JOIN departments
            ON roles.department_id = departments.id;
          `;
    const [roles] = await db.promise().query(query);

    console.table(roles);
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

async function viewAllEmployees() {
  try {
    const query = `
    SELECT 
        employees.id,
        employees.first_name,
        employees.last_name,
        roles.title,
        departments.dep_name,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
        JOIN roles
            ON employees.role_id = roles.id
        JOIN departments
            ON roles.department_id = departments.id
        LEFT JOIN employees manager
            ON employees.manager_id = manager.id;
        `;
    const [employees] = await db.promise().query(query);

    console.table(employees);
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

// ADD FUNCTIONS -------------------------------

async function addDep() {
  try {
    // Make new prompt for additions of new values
    const addDepQuestion = [
      {
        type: "input",
        name: "departmentName",
        message: "Please enter the name of department you'd like to add",
      },
    ];
    // Wait for answer
    const { departmentName } = await inquirer.prompt(addDepQuestion);

    const query = `
        INSERT INTO departments (dep_name) VALUES (?);
    `;
    await db.promise().query(query, departmentName);

    console.log("Department has been added!");
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

async function addRole() {
  try {
    // Make new prompt for additions of new values
    const addDepQuestion = [
      {
        type: "input",
        name: "roleTitle",
        message: "Please enter the name of new role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please enter the salary of new role",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Please enter the department of new role",
      },
    ];
    // Wait for answer
    const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt(
      addDepQuestion
    );

    // Grab department name with id
    const departmentQuery = `
    SELECT id FROM departments WHERE dep_name = (?);
    `;
    // Selected the correct department based on name enetered equalled dep_name
    const [department] = await db
      .promise()
      .query(departmentQuery, roleDepartment);

    // Now that we got that row let's take that ID property
    const departmentId = department[0].id;

    // Now we got the id based off the name we can INSERT INTO with correct values
    const query = `
        INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);
    `;

    const rolesParams = [roleTitle, roleSalary, departmentId];

    await db.promise().query(query, rolesParams);

    console.log("Role has been added!");
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee() {
  try {
    // Make new prompt for additions of new values
    const addEmployeeQuestion = [
      {
        type: "input",
        name: "employeeFirstName",
        message: "Please enter employee's first name",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "Please enter employee's last name",
      },
      {
        type: "input",
        name: "employeeRole",
        message: "Please enter employee's title role",
      },
      {
        type: "input",
        name: "employeeManager",
        message: "Please enter employee's manager",
      },
    ];

    const {
      employeeFirstName,
      employeeLastName,
      employeeRole,
      employeeManager,
    } = await inquirer.prompt(addEmployeeQuestion);

    const roleQuery = `
      SELECT id FROM roles WHERE title = (?);
      `;

    const [role] = await db.promise().query(roleQuery, employeeRole);

    const roleId = role[0].id;
    //--------------------------------
    const managerQuery = `
      SELECT id FROM employees WHERE first_name = (?) AND last_name (?);
      `;

    const [manager] = await db.promise().query(roleQuery, employeeManager);

    let managerId = null;
    if (manager.length > 0) {
      managerId = manager[0].id;
    }
    //--------------------------------
    const query = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);
      `;

    const employeeParams = [
      employeeFirstName,
      employeeLastName,
      roleId,
      managerId,
    ];

    await db.promise().query(query, employeeParams);

    console.log("Employee has been added!");
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

// UPDATE FUNCTION -------------------------------

async function updateEmployeeRole() {
  try {
    // Get names 
    const employeeNameQuery = `SELECT CONCAT (first_name, ' ', last_name) AS employee_name, id FROM employees;`
    const[employeeNames] = await db.promise().query(employeeNameQuery) 
    const selectEmployee = [
      {
        type: "list",
        name: "employee_id",
        message: "Please select employee to update",
        choices: employeeNames.map(({ id, employee_name }) => ({
            name: employee_name,
            value: id

        }))
      }
    ];

    const { employee_id } = await inquirer.prompt(selectEmployee);


    const { selectedRole } = await inquirer.prompt([
        {
            type:"input",
            name: "selectedRole",
            message: "Please enter employee's new role"
        }
        
    ]);
//--------------
    const roleQuery = `
      SELECT id FROM roles WHERE title = (?);
      `;

    const [role] = await db.promise().query(roleQuery, selectedRole);

    const roleId = role[0].id;
//--------------

//--------------

    const query = `
        UPDATE employees SET role_id = (?) WHERE id = (?);
      `;

    const employeeParams = [roleId, employee_id]

    const data = await db.promise().query(query, employeeParams);
    
    console.log("Employee has been updated!");
    setTimeout(askQuestion, 2000);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { askQuestion };
