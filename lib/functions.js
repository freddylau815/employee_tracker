const db = require('../db/connection')

async function viewAllEmployees() {
    try {
        const [employees] = await db.query('SELECT * FROM employees');
        console.log(employees)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees }