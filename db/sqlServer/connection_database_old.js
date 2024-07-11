// Importar el módulo mssql
const sql = require('mssql');

// Configurar los parámetros de la conexión
const config = {
    server: 'proveedores_old_db_sqlServer',
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

// Exportar el pool de conexiones
module.exports = pool;
