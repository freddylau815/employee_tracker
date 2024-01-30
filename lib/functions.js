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
        message: "Please enter the name of department you'd like to add"
    }
   ]
   // Wait for answer 
    const { departmentName } = await inquirer.prompt(addDepQuestion)
    
    const query = `
        INSERT INTO departments (dep_name) VALUES (?);
    `
    await db.promise().query(query, departmentName);

  
      console.log('Department has been added!')
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
        message: "Please enter the name of new role"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "Please enter the salary of new role"
    },
    {
        type: "input",
        name: "roleDepartment",
        message: "Please enter the department of new role"
    }
   ]
   // Wait for answer 
    const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt(addDepQuestion)

    // Grab department name with id 
    const departmentQuery = `
    SELECT id FROM departments WHERE dep_name = (?);
    `

    const [department] = await db.promise().query(departmentQuery, roleDepartment)

    const departmentId = department[0].id;

    const query = `
        INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);
    `

    const rolesParams = [roleTitle, roleSalary, departmentId]
    
    await db.promise().query(query, rolesParams);

  
      console.log('Role has been added!')
      setTimeout(askQuestion, 2000);
    } catch (err) {
      console.log(err);
    }
  }
  

module.exports = { askQuestion };
