const mysql = require('mysql');
const util = require('util');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Admin123',
    database: 'todo_app'
});

// Promisify pool query for async/await support
pool.query = util.promisify(pool.query);

module.exports = pool;
