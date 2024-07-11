// const db_old = require('./db/mysql/connection_database_old');
const db_old = require('./db/sqlServer/connection_database_old');



async function getCat_prove () {
  try {
    await db_old.connect();
    // return [rows, fields] = await db_old.request().query( 'SELECT * FROM cat_prove ORDER BY num_prove desc ' );
    result = await db_old.request().query( 'SELECT * FROM cat_prove ORDER BY num_prove desc ' );
    return result.recordset;
    // return [rows, fields] = await db_old.request().query( `SELECT cp.*
    //                                               FROM cat_prove cp
    //                                               JOIN d_prove dp 
    //                                               ON dp.num_prove = cp.num_prove
    //                                               LIMIT 20` );

    // return [rows, fields] = await db_old.request().query( 'SELECT * FROM cat_prove where fecini is not null ORDER BY num_prove desc ' );
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  } finally {
    await db_old.close();
  }
}

// async function getD_prove ( numProveedor ) {
//   try {
//   return [rows, fields] = await db_old.request().query( 
//           `SELECT * FROM d_prove WHERE num_prove = ? `,
//           [numProveedor]
//           );
//   } catch ( error ){
//     console.error('Error en la consulta:', error.message);
//   }
// }

async function getD_prove ( numProveedor ) {
  try {
    await db_old.connect();
    result = await db_old.request().query( `SELECT * FROM d_prove WHERE num_prove = ${numProveedor} ` );
    return result.recordset;
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  }finally {
    await db_old.close();
  }
}

async function getProveedor_giro ( numProveedor ) {
  try {
    await db_old.connect();
    result = await db_old.request().query( `SELECT * FROM proveedor_giro WHERE num_prove = ${numProveedor} `);
    return result.recordset;
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  }finally {
    await db_old.close();
  }
}

async function getCat_suspendido ( numProveedor ) {
  try {
    await db_old.connect();
    result = await db_old.request().query( `SELECT * FROM d_prove WHERE num_prove = ${numProveedor} `);
    return result.recordset;
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  }finally {
    await db_old.close();
  }
}

async function getPrv_inhabi ( numProveedor ) {
  try {
    await db_old.connect();
    result = await db_old.request().query( `SELECT * FROM d_prove WHERE num_prove = ${numProveedor} `);
    return result.recordset;
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  }finally {
    await db_old.close();
  }
}

async function getDGirosref ( numProveedor ){
  try {
    await db_old.connect();
    result = await db_old.request().query( `SELECT * FROM d_girosref WHERE num_prove = ${numProveedor} `);
    return result.recordset;
  } catch ( error ){
    console.error('Error en la consulta:', error.message);
  }finally {
    await db_old.close();
  }
}


// async function obtenerDatos() {
//     try {
//       const [rows, fields] = await db_old.request().query('SELECT * FROM cat_prove LIMIT 200');
//       console.log(rows);
//     } catch (error) {
//       console.error('Error en la consulta:', error.message);
//     }
//   }
  
  

module.exports = {getCat_prove, getD_prove, getProveedor_giro, getCat_suspendido, getPrv_inhabi, getDGirosref }
  