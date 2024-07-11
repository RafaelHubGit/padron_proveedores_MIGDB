// Importar el módulo mysql
const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // o la IP del servidor de la base de datos
  port: 3307,
  user: 'admin', // tu nombre de usuario en la base de datos
  password: '123456', // tu contraseña
  database: 'proveedores' // el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    return console.error('Error al conectar: ' + error.stack);
  }
  console.log('Conectado con el identificador ' + connection.threadId);
});

// Realizar una consulta
connection.query('SELECT * FROM cat_prove', (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

// Cerrar la conexión
connection.end();
