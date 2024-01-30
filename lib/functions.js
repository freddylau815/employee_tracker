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
        message: "Please add the name of department"
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
  

module.exports = { askQuestion };
