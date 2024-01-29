const fs = require('fs')
const inquirer = require('inquirer')
const {viewAllEmployees} = require('./lib/functions')
// const db = require('./db/connection')

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
        console.log(answerObj.task)
        switch (answerObj.task) {
            case 'View all departments': 
                // vieAllDep();
                console.log('ALL DEPS')
                break;
            case 'View all roles': 
                viewllRoles();
                break;
            case 'View all employees': 
                viewAllEmployees();
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