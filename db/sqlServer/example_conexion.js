// Importar el módulo mssql
const sql = require('mssql');

// Crear una conexión a la base de datos
const config = {
  // server: '10.68.2.200',
  server: 'proveedores_new_db_sqlServer',
  port: 1433,
  user: 'sa',
  password: 'contraseña_segura2024',
  database: 'master',
  options: {
    enableArithAbort: true,
    encrypt: false, // Desactivar el cifrado SSL/TLS
    trustServerCertificate: true // Confiar en el certificado del servidor, incluso si no es válido
  },
  pool: {
    max: 10, // número máximo de conexiones en el pool
    min: 0, // número mínimo de conexiones iniciales
    idleTimeoutMillis: 30000 // tiempo máximo que una conexión puede permanecer inactiva en el pool (en milisegundos)
  }
};

// Crear un nuevo pool de conexiones
const pool = new sql.ConnectionPool(config);

// Conectar a la base de datos
pool.connect().then(() => {
  console.log('Conectado con éxito.');

  // Realizar una consulta
  return pool.request().query('SELECT * FROM cat_prove');
}).then(result => {
  console.log(result.recordset);
}).catch(error => {
  console.error('Error al conectar o al realizar la consulta:', error);
});
