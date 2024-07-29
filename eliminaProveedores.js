
const createPool = require('./db/sqlServer/connectionSqlServerMig');
const poolMig = createPool('10.68.2.200', 1434, 'sa', 'contraseña_segura2024', 'PadronProveedores');

const eliminarProveedoresSeleccionados = async (numProveedores) => {
    try {
        await poolMig.connect();
        const request = poolMig.request();
        
        // Generar una lista de proveedores para usar en la cláusula IN
        const proveedoresList = numProveedores.join(',');

        const deleteQuery = `
            DELETE FROM Proveedores_GirosComerciales WHERE IdGenDatosProveedores IN (SELECT IdGenDatosProveedores FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM GenRepresentantes WHERE IdGenRepresentantes IN (SELECT IdGenRepresentantes FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM GenRefrendo WHERE IdGenRefrendo IN (SELECT IdGenRefrendo FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList});
            DELETE FROM GenContacto WHERE IdGenContacto IN (SELECT IdGenContacto FROM DatosProveedores_Contacto WHERE IdGenDatosProveedores IN (SELECT IdGenDatosProveedores FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList})));
            DELETE FROM DatosProveedores_Contacto WHERE IdGenDatosProveedores IN (SELECT IdGenDatosProveedores FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM Documentos WHERE IdGenDatosProveedores IN (SELECT IdGenDatosProveedores FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM GenDomicilio WHERE IdGenDomicilio IN (SELECT IdGenDomicilio FROM GenDatosProveedores WHERE IdGenProveedor IN (${proveedoresList}));
            DELETE FROM GenJustificacionProveedorInactivo WHERE IdGenProveedor IN (${proveedoresList});
            DELETE FROM GenProveedores WHERE IdGenProveedor IN (${proveedoresList});
        `;

        await request.query(deleteQuery);
        console.log('Proveedores eliminados correctamente.');
    } catch (error) {
        console.error('Error eliminando proveedores:', error);
    } finally {
        if (poolMig) {
            await poolMig.close();
        }
    }
};


const eliminaProveedores = async () => {
    //const proveedoresAEliminar = [1, 2, 3, 4, 5]; // NumeroProveedores a eliminar
    eliminarProveedoresSeleccionados(proveedoresAEliminar);
}


eliminaProveedores();