
require('dotenv').config();
const createPool = require('../db/sqlServer/connectionSqlServerMig');

const port = parseInt(process.env.PORT_MIG, 10);
const dbHost = process.env.DB_HOST_MIG;
const dbUser = process.env.DB_USER_MIG;
const dbPass = process.env.DB_PASS_MIG;

console.log("Port: ", port);
console.log("Host: ", dbHost);
console.log("User: ", dbUser);
console.log("Pass: ", dbPass);

const poolMig = createPool(dbHost, port, dbUser, dbPass, 'Mig_PadronProveedores');



const getproveedores = async ( numProveedores ) => {
    try {
        console.log("Obteniendo los proveedores JSON...")
        await poolMig.connect();
        const request = poolMig.request();
        const result = await request.query(`SELECT
            (
                SELECT
                    cp.*,
                    proveedor_giro = (
                        SELECT
                            pg.estatus,
                            cg.idgiro,
                            cg.nom_giro
                        FROM
                            proveedor_giro pg
                        JOIN
                            cat_giroscomer cg
                        ON
                            pg.idgiro = cg.idgiro
                        WHERE
                            pg.num_prove = cp.num_prove
                        FOR JSON PATH
                    ),
                    d_prove = (
                        SELECT *,
                        d_girosref = (
                            SELECT 
                                dg.no_ref,
                                dg.idgiro,
                                cg.nom_giro
                            FROM 
                                d_girosref dg
                            JOIN 
                                cat_giroscomer cg 
                            ON 
                                dg.idgiro = cg.idgiro
                            WHERE 
                                dg.num_prove = cp.num_prove
                            FOR JSON PATH
                        )
                        FROM 
                            d_prove dp
                        WHERE 
                            dp.num_prove = cp.num_prove
                        ORDER BY dp.no_ref
                        FOR JSON PATH
                    )
                FROM
                    cat_prove cp
                WHERE 
                    cp.num_prove IN (${numProveedores})
                ORDER BY cp.num_prove
                FOR JSON PATH
            ) AS Proveedores`);
        // const proveedores = JSON.stringify(result.recordset[0].Proveedores,null, 2);
        const proveedores = JSON.parse(result.recordset[0].Proveedores);

        // poolMig.close();
        return proveedores;
    } catch (error) {
        console.error(error);
    } finally {
        if ( poolMig ){
            await poolMig.close();
        }
    }
}

const getTotalProveedores = async (num_prove = null) => {
    console.log("Obteniendo el total de proveedores...");
    try {
        await poolMig.connect();
        const request = poolMig.request();
        
        let query = `SELECT COUNT(*) AS total FROM cat_prove`;

        // Condicionalmente agregar la cláusula WHERE si num_prove está definido
        if (num_prove) {
            query += ` WHERE num_prove > ${num_prove} --Esta línea se agrega solo si llega a haber algún problema, poder continuar desde el proveedor que se quedó`;
        }

        const result = await request.query(query);
        return result.recordset[0].total;
    } catch (error) {
        console.error(error);
    } finally {
        if (poolMig) {
            await poolMig.close();
        }
    }
}



const getNumProveedores = async (OFFSET = 0, NUMROWS = 500, num_prove = null) => {
    console.log("Obteniendo los proveedores Page");
    try {
        await poolMig.connect();
        const request = poolMig.request();
        
        let query = `WITH PageData AS (
                        SELECT 
                            cp.num_prove
                        FROM 
                            cat_prove cp`;

        // Condicionalmente agregar la cláusula WHERE si num_prove está definido
        if (num_prove) {
            query += `  WHERE cp.num_prove > ${num_prove} `; //Esta línea se agrega solo si llega a haber algún problema, poder continuar desde el proveedor que se quedó
        }

        query += `)
                  SELECT *
                  FROM PageData
                  ORDER BY (SELECT NULL)
                  OFFSET ${OFFSET} ROWS FETCH NEXT ${NUMROWS} ROWS ONLY`;

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error(error);
    } finally {
        if (poolMig) {
            await poolMig.close();
        }
    }
}


module.exports = {
    getproveedores,
    getTotalProveedores,
    getNumProveedores
}