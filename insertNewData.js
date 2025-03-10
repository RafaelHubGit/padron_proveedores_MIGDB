// const db_new = require('./db/mysql/connection_database_new');
// const db_new = require('./db/sqlServer/connection_database_new');

const { pool } = require('mssql');
require('dotenv').config();
const createPool = require('./db/sqlServer/connectionSqlServerMig');

const port = parseInt(process.env.PORT_NEW, 10);
const dbHost = process.env.DB_HOST_NEW;
const dbUser = process.env.DB_USER_NEW;
const dbPass = process.env.DB_PASS_NEW;



const poolMig = createPool(dbHost, port, dbUser, dbPass, 'PadronProveedores');

// Debido a que la info se va a recibir como json, se puede crear un insert generico en lugar de uno por uno
async function insertGeneric ( data, idName, tableName ) {
    try {

        await poolMig.connect();
        const request = poolMig.request();

        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((key, index) => `@param${index}`).join(', ');
        const values = Object.values(data);

        // Obtener una conexión del pool
        //const poolConnection = await db_new.connect();

        // Crear una solicitud a partir de la conexión del pool
        //const request = poolConnection.request();

        // Construir la consulta SQL con parámetros
        // const query = `INSERT INTO proveedores.${tableName} (${columns}) VALUES (${placeholders})`;
        const query = `INSERT INTO ${tableName} (${columns}) OUTPUT INSERTED.${idName} AS id VALUES (${placeholders})`;


        // Asignar valores a los parámetros
        Object.keys(data).forEach((key, index) => {
            console.log(`Asignando valor ${values[index]} al parámetro @param${index}`);
            request.input(`param${index}`, values[index]);
        });

        console.log('Ejecutando la siguiente consulta SQL:' , query);

        // Ejecutar la consulta
        const result = await request.query(query);

        // Obtener el ID insertado (si es aplicable)
        const insertedId = result.recordset[0].id;

        console.log(`ID de ${tableName} insertado: ${insertedId}`);

        // console.log("EL PUTO RESULTASDO : ", result.recordset); 
        return insertedId;

    }catch ( error ) {
        console.error('Error : ', error);
        throw error;
    } finally {
        // Cerrar la conexión al pool de conexiones
        if ( poolMig ){
            await poolMig.close();
        }
    }
}


module.exports = { insertGeneric }