const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    port: 3307,
    user: 'admin', 
    password: '123456',
    database: 'proveedores',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();