const {askQuestion} = require('./lib/functions')
// const db = require('./db/connection')

function init () {
    console.log('Welcome to Employee Tracker!')
    askQuestion()
}

init()