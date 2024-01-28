const mysql = require('mysql2/promise')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'company_db'
  })
  
  module.exports = connection;