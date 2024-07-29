// Importar el módulo mssql
const sql = require('mssql');

// Función para obtener los parámetros de conexión desde los argumentos de la función
function getConfig(server, port, user, password, database) {
    return {
        server: server || 'localhost',
        port: port || 1433,
        user: user || 'sa',
        password: password || 'pass',
        database: database || 'Mig_PadronProveedores',
        options: {
            enableArithAbort: true,
            encrypt: false, // Desactivar el cifrado SSL/TLS
            trustServerCertificate: true // Confiar en el certificado del servidor, incluso si no es válido
        },
        pool: {
            max: 50, // número máximo de conexiones en el pool
            min: 0, // número mínimo de conexiones iniciales
            idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar conexiones inactivas
            acquireTimeoutMillis: 30000 // Tiempo de espera para adquirir una conexión del pool
        }
    };
}

// Función para crear un nuevo pool de conexiones
function createPool(server, port, user, password, database) {
    const config = getConfig(server, port, user, password, database);
    const pool = new sql.ConnectionPool(config);
    return pool;
}

// Exportar la función createPool
module.exports = createPool;
