const moment = require('moment');

const { getTotalProveedores, getNumProveedores, getproveedores } = require('./services/getDataMigration');
const { formatDataForTableProveedores, insertarRefrendo, insertaContactoIntermedia, formatJustificacionProveedorInactivo, insertaDatosProveRepresentantes, procesarDireccionesYAsignarIds, formatDataDirecciones, returnColumnasAuditoria, insertaContacto, insertaRepresentantes, insertaProveedorGirosIntermedia, procesarRepresentantesYAsignarIds } = require('./helpers/format/formatDataToInsert');
const { returnDireccionJson } = require('./helpers/filtroDireccion');
const { insertGeneric } = require('./insertNewData');
const { returnExtensionesTelefonosFnc } = require('./helpers/filtroTelefonos');
const { getMails } = require('./helpers/filtroMail');
const { getPersonas } = require('./helpers/filtroPersonas');
const { getNotaSuspencion } = require('./helpers/filtroNotas');



async function startMigration() {
    const startTime = performance.now();
    for await (const bloqueProveedores of getProveedoresConcatenados( )) {

        const proveedores = await getproveedores(bloqueProveedores);

        // const proveedores = await getproveedores(4860,4861,4863,4870,4873,4877);
        // const proveedores = await getproveedores(4860,4861,4863,4870,4873,4877 );
        const proveedoresStr =  JSON.stringify(proveedores, null, 2);
        const proveedoresJson = JSON.parse(proveedoresStr);

        for (const proveedor of proveedoresJson) {

            // console.log(proveedor.d_prove);
            // proveedor.d_prove.forEach(element => {
            //     console.log(element.d_girosref);
            // });
            // return;

            const dataProveedor = formatDataForTableProveedores(proveedor);
            // Insertar GenProveedores
            const IdGenProveedor = await insertGeneric(dataProveedor, 'IdGenProveedor', 'GenProveedores');

            let IdGenDomicilio = null;
            let direccionJson = [];
            if ( proveedor.domicilio ){
                direccionJson = returnDireccionJson( proveedor.domicilio );
                // Insertar Direccion
                if ( direccionJson ){
                    IdGenDomicilio = await insertGeneric( 
                        formatDataDirecciones( direccionJson, dataProveedor.FechaRegistro, dataProveedor.IdUsuarioAlta ),
                        'IdGenDomicilio',
                        'GenDomicilio' 
                    );
                    direccionJson.id = IdGenDomicilio;
                }
            }


            // Refrendo
            const IdGenRefrendo = await insertarRefrendo({
                NumeroRefrendo: proveedor.numrefrendo,
                FechaRefrendo: (proveedor.fecrefrendo ? moment(proveedor.fecrefrendo).format('YYYY-MM-DD') : null)
            });


            // Este se hace aqui ya que la demas informacion no vendria de cat_prove, si no de d_prove
            const datos_proveedores1 = {
                IdGenProveedor , //debe de recibirlo la funcion para ingresarlo
                IdGenRefrendo,
                IdGenDomicilio,
                RFC: (proveedor.refeca_prov || 'sin informacion'),
                RazonSocial: proveedor.razon_social,
                Observaciones: proveedor.nota,
                SitioWeb: proveedor.webprov,
                TieneDocumentos: proveedor.documentos === "Y" ? 1 : 0,
                EsRepse: proveedor.repse === "Y" ? 1 : 0,
                FechaRepse: proveedor.fecrepse,
                FechaRegistro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
                ...returnColumnasAuditoria(0,
                                            proveedor.fecalta ? moment(proveedor.fecalta).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                            0,
                                            proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                            1
                )
            };

            // inserta la info en datos proveedores
            const idDatoProveedor = await insertGeneric(datos_proveedores1,'IdGenDatosProveedores', "GenDatosProveedores");
        
            //Obtiene la informacion del contacto 
            const { extensiones, telefonos } = returnExtensionesTelefonosFnc( `${proveedor.telefono}, ${proveedor.fax}, ${proveedor.celular}` );
            const dataInsertedTelefonos = await insertaContacto( telefonos, 1 );
            const dataInsertedExtensiones = await insertaContacto( extensiones, 2 );
            const mailsData = getMails( proveedor.mailprov ); // Obtiene el filtro de los mails 
            const dataInsertedMail = await insertaContacto( mailsData, 3 );

            const contactosArr = [ ...dataInsertedTelefonos, ...dataInsertedExtensiones, ...dataInsertedMail ]; //Agrupa los 3 arreglos de los contactos
            // inserta la informacion en la tabla intermedia de contactos
            (contactosArr.length !== 0 ? await insertaContactoIntermedia( 
            contactosArr.map( c => c.id ), 
            idDatoProveedor, 
            1 ) : null);


            // obtiene la info filtrada
            const representaLegal = getPersonas( proveedor.representante );
            const representaVentas = getPersonas( proveedor.represenvtas );

            //inserta la info en representantes
            const representaVentasInserted = await insertaRepresentantes( representaVentas, 'Ventas' );
            const representaLegalInserted = await insertaRepresentantes( representaLegal, 'Legal' );
        
            //INSERTA LA INFO EN REPRESENTAMTES INTERMEDIA 
            const representantesInsertedArr = [
                ...representaLegalInserted,
                ...representaVentasInserted
            ]; //se juntan los datos
            const representantesInttermedia = await insertaDatosProveRepresentantes ( representantesInsertedArr, idDatoProveedor, 1 ); //se inserta la info en la intermedia


            const idGirosArr = proveedor.proveedor_giro.map( data => data.idgiro );
            await insertaProveedorGirosIntermedia( idGirosArr, idDatoProveedor, 1 ); //inserta el giro comercial


            const notaSuspencion = getNotaSuspencion( proveedor.representante );
            if ( proveedor.fecini || proveedor.fecsuspini ){
                await insertGeneric(
                    formatJustificacionProveedorInactivo(proveedor, IdGenProveedor, notaSuspencion ),
                    'IdGenProveedoresEstado',
                    'GenJustificacionProveedorInactivo'
                );
            }


            // Si numrefrendo es null, se sabe que no hay info en d_prove y terminamos con el registro
            if ( !proveedor.numrefrendo ){
                continue; 
            }

            
            // AQUI EMPIZA TODO LO DE D_PROVE

            const D_PROVES = proveedor.d_prove;

            //Obtiene las direcciones, el id y el refrendo para ser insertado en la tabla datos_proveedores
            if ( !D_PROVES ){
                continue;
            }

            let direccionesFiltradas = [];
            if ( direccionJson.length !== 0 ){
                direccionesFiltradas = await procesarDireccionesYAsignarIds( D_PROVES, direccionJson, proveedor.num_prove );
            }

             /*Obtiene la informacion de los representantes para insertarlos*/
            const representaLegalFiltrado = await procesarRepresentantesYAsignarIds( D_PROVES, 'legal', representantesInttermedia );
            const representaVentasFiltrado = await procesarRepresentantesYAsignarIds( D_PROVES, 'ventas', representantesInttermedia );


            for ( const d_prove of D_PROVES ){

                // INSERTA EL REFRENDO
                const idrefrendoDProve = await insertarRefrendo({
                    NumeroRefrendo: d_prove.no_ref,
                    FechaRefrendo: d_prove.fecharef
                });
    
                // Obtiene la direccion que debe llevar ese registro 
                let direccionToInsert = 0;
                if ( direccionesFiltradas.length !== 0 ){
                    direccionToInsert = direccionesFiltradas.find( dir => dir.refrendos.includes( d_prove.no_ref ) );
                }
    
    
                // inserta la info en datos proveedores
                const datos_proveedores2 = {
                    IdGenProveedor , //debe de recibirlo la funcion para ingresarlo
                    IdGenRefrendo: idrefrendoDProve,
                    IdGenDomicilio: direccionToInsert.id,
                    RFC: (proveedor.refeca_prov || 'sin informacion'), //ya que d_prove no tiene este dato, se toma de proveedor
                    RazonSocial: d_prove.razon_social,
                    Observaciones: proveedor.nota, // Ya que d_prove no tiene este campo se toma de proveedor
                    SitioWeb: proveedor.webprov, // Ya que d_prove no tiene este campo se toma de proveedor
                    TieneDocumentos: proveedor.documentos === "Y" ? 1 : 0,
                    EsRepse: proveedor.repse === "Y" ? 1 : 0,
                    FechaRepse: proveedor.fecrepse,
                    FechaRegistro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
                    ...returnColumnasAuditoria(0,
                                                proveedor.fecalta ? moment(proveedor.fecalta).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                                0,
                                                proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                                1
                    )
                };
                const idDatoProveedor2 = await insertGeneric(datos_proveedores2,'IdGenDatosProveedores', "GenDatosProveedores");
            
                //Obtiene el arreglo de ids de los representantes 
                console.log("REPRESENTANTES FILTRADOS!!!!!!!!!!!!!!! : ", representaLegalFiltrado, representaVentasFiltrado);
                const representantesTOInsert = [...representaLegalFiltrado, ...representaVentasFiltrado]
                .filter(rep => rep.refrendos.includes(d_prove.no_ref))
                .map(rep => rep.id);
                console.log("REPRESENTANTES!!! : ", representantesTOInsert);
                for ( const idRepresentantes of representantesTOInsert ){

                    console.log("ID REPRESENTANTE : ", idRepresentantes);
                    // inserta los proveedores en la tabla intermedia
                    await insertGeneric({
                        IdGenRepresentantes: idRepresentantes,
                        IdGenDatosProveedores : idDatoProveedor2,
                        ...returnColumnasAuditoria()
                    },'IdDatosProveRepresentantes', 'DatosProveedores_Representantes')
                       
                }
    
                // NOTA!!!!
                // Los contactos van duplicados de los registros anteriores, ya que no hay info adicional en la bd antigua 
                // contactosArr se toma de mas arriba ya que se duplica la info aquio 
                (contactosArr.length !== 0 ? await insertaContactoIntermedia( 
                    contactosArr.map( c => c.id ), 
                    idDatoProveedor2, // se debe cambiar el id !!!!
                    1 ) : null);
    
    
    
                
                // INSERTA GIROS COMERCIALES 
                const d_girosref = d_prove.d_girosref;
                const idGirosArr = d_girosref.filter( giro => giro.no_ref === d_prove.no_ref ).map( giro => giro.idgiro );
                for ( const id of idGirosArr ){
                    await insertGeneric( {
                        IdGenDatosProveedores : idDatoProveedor2,
                        IdCatGirosComerciales: id,
                        ...returnColumnasAuditoria()
                    } ,'IdProveedoresGirosComerciales','Proveedores_GirosComerciales')
                }
    
            }
            
        }
    }
    console.log('sale del pedul');
    
    const endTime = performance.now();
    const timeInSeconds = (endTime - startTime) / 1000; // Convertir milisegundos a segundos
    console.log(`Tiempo transcurrido ${timeInSeconds} en segundos.`);

}

async function* getProveedoresConcatenados(blockSize = 500) {

    const desdeProveedor = 6179; //Este debe de cambiar al numero de proveedor desde el que se quiere continuar

    const totalProveedores = await getTotalProveedores(desdeProveedor);
    // const totalProveedores = 20;

    for (let offset = 0; offset < totalProveedores; offset += blockSize) {
        const proveedores = await getNumProveedores(offset, blockSize, desdeProveedor);
        const numProveList = proveedores.map(proveedor => proveedor.num_prove).join(',');
        yield numProveList; // Devuelve el bloque actual como una cadena separada por comas
    }
}


startMigration();