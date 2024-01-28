const fs = require('fs')
const inquirer = require('inquirer')
const db = require('./db/connection')
// const questions = require('')

const question =[
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

function init() {
    inquirer.prompt(question).then((answerObj) => {
        console.log(answerObj.tasks)
        switch (answerObj.task) {
            case 'View all departments': 
                vieAllDep();
                break;
            case 'View all roles': 
                vieAllRoles();
                break;
            case 'View all employees': 
                vieAllEmployees();
                break;
            case 'Add a department': 
                addDep();
                break;
            case 'Add a role': 
                addRole();
                break;
            case 'Add an employee': 
                addEmployee();
                break;
            case 'Update an employee role': 
                updateEmployeeRole();
                break;
        }
       
    })
}

init()