const moment = require('moment');

const {getCat_prove, getD_prove, getProveedor_giro, getCat_suspendido, getPrv_inhabi, getDGirosref } = require('./getOldData');
const { returnDireccionJson } = require('./helpers/filtroDireccion');
const { insertGeneric } = require('./insertNewData');
const { returnExtensionesTelefonosFnc } = require('./helpers/filtroTelefonos');
const { getMails } = require( './helpers/filtroMail' );
const { getPersonas } = require( './helpers/filtroPersonas' );
const { getNotaSuspencion } = require('./helpers/filtroNotas');


async function startMigration () {
    const startTime = performance.now();

    //Obtiene la info de catProve
    const cat_prove = await getCat_prove();

    //Recorre la informacion obtenida
    for ( const proveedor of cat_prove ){
        const dataProveedor = formatDataForTableProveedores( proveedor );
        const idProveedor = await insertGeneric( dataProveedor,'idProveedor', 'proveedores' ); 

        const direccionJson = returnDireccionJson( proveedor.domicilio );
        let idDomicilio = null;
        if ( direccionJson ){
            idDomicilio = await insertGeneric( 
                formatDataDirecciones( direccionJson, dataProveedor.fecha_registro, dataProveedor.usuario_registra ),
                'iddomicilio',
                'domicilio' 
            );

            direccionJson.id = idDomicilio;
        }



        const idrefrendo = await insertarRefrendo({
            numero_refrendo: proveedor.numrefrendo,
            fecha_refrendo: (proveedor.fecrefrendo ? moment(proveedor.fecrefrendo).format('YYYY-MM-DD') : null),
            fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
            usuario_registra: 'migracion'
        });
            

            


        // Este se hace aqui ya que la demas informacion no vendria de cat_prove, si no de d_prove
        const datos_proveedores1 = {
            idProveedor , //debe de recibirlo la funcion para ingresarlo
            idrefrendo,
            iddomicilio: idDomicilio,
            rfc: (proveedor.refeca_prov || 'sin informacion'),
            razon_social: proveedor.razon_social,
            observaciones: proveedor.nota,
            sitio_web: proveedor.webprov,
            activo: 1,
            usuario_registra: 'migracion', //A QUI SE USA "MIGRACION" YA QUE NO EXISTE ESTE CAMPO EN LA INFORMACION ANTIGUA,,
            fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'))
        };
        // inserta la info en datos proveedores
        const idDatoProveedor = await insertGeneric(datos_proveedores1,'iddatos_proveedores', "datos_proveedores");
        

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

        // obtiene la info del giro
        const idProveedorGiroA = await getProveedor_giro( proveedor.num_prove );
        const idGirosArr = idProveedorGiroA.map( data => data.idgiro );
        await insertaProveedorGirosIntermedia( idGirosArr, idDatoProveedor, 1 ); //inserta el giro comercial



        const notaSuspencion = getNotaSuspencion( proveedor.representante );
        if ( proveedor.fecini || proveedor.fecsuspini ){
            await insertGeneric(
                formatJustificacionProveedorInactivo(proveedor, idProveedor, notaSuspencion ),
                'idproveedores_estado',
                'justificacion_proveedor_inactivo'
            );
        }
        


        // Si numrefrendo es null, se sabe que no hay info en d_prove y terminamos con el registro
        if ( !proveedor.numrefrendo ){
            continue; 
        }



        
        // AQUI EMPIZA TODO LO DE D_PROVE

        const D_PROVES = await getD_prove( proveedor.num_prove );
        
        //Obtiene las direcciones, el id y el refrendo para ser insertado en la tabla datos_proveedores
        if ( !D_PROVES ){
            continue;
        }
        
        let direccionesFiltradas = await procesarDireccionesYAsignarIds( D_PROVES, direccionJson, proveedor.num_prove );

        /*Obtiene la informacion de los representantes para insertarlos*/
        const representaLegalFiltrado = await procesarRepresentantesYAsignarIds( D_PROVES, 'legal', representantesInttermedia );
        const representaVentasFiltrado = await procesarRepresentantesYAsignarIds( D_PROVES, 'ventas', representantesInttermedia );

        
        for ( const d_prove of D_PROVES ){

            // INSERTA EL REFRENDO
            const idrefrendoDProve = await insertarRefrendo({
                numero_refrendo: d_prove.no_ref,
                fecha_refrendo: d_prove.fecharef,
                fecha_registro: d_prove.fechacam,
                usuario_registra: 'migracion'
            });

            // Obtiene la direccion que debe llevar ese registro 
            const direccionToInsert = direccionesFiltradas.find( dir => dir.refrendos.includes( d_prove.no_ref ) );


            // inserta la info en datos proveedores
            const datos_proveedores2 = {
                idProveedor , //debe de recibirlo la funcion para ingresarlo
                idrefrendo: idrefrendoDProve,
                iddomicilio: direccionToInsert.id,
                rfc: (proveedor.refeca_prov || 'sin informacion'), //ya que d_prove no tiene este dato, se toma de proveedor
                razon_social: d_prove.razon_social,
                observaciones: proveedor.nota, // Ya que d_prove no tiene este campo se toma de proveedor
                sitio_web: proveedor.webprov, // Ya que d_prove no tiene este campo se toma de proveedor
                activo: 0, // Se pone 0 ya que son los registros pasados
                usuario_registra: d_prove.cve_usuario || 'migracion',
                fecha_registro: moment(d_prove.fechacam || new Date()).format('YYYY-MM-DD')
            };
            const idDatoProveedor2 = await insertGeneric(datos_proveedores2,'iddatos_proveedores', "datos_proveedores");
        
            //Obtiene el arreglo de ids de los representantes 
            const representantesTOInsert = [...representaLegalFiltrado, ...representaVentasFiltrado]
            .filter(rep => rep.refrendos.includes(d_prove.no_ref))
            .map(rep => rep.id);
            console.log("REPRESENTANTES!!! : ", representantesTOInsert);
            for ( const idRepresentantes of representantesTOInsert ){
                // inserta los proveedores en la tabla intermedia
                await insertGeneric({
                    idRepresentantes,
                    iddatos_proveedores : idDatoProveedor2,
                    activo: 1
                },'iddatos_prove_representantes', 'datos_prove_representantes')
            }

            // NOTA!!!!
            // Los contactos van duplicados de los registros anteriores, ya que no hay info adicional en la bd antigua 
            // contactosArr se toma de mas arriba ya que se duplica la info aquio 
            (contactosArr.length !== 0 ? await insertaContactoIntermedia( 
                contactosArr.map( c => c.id ), 
                idDatoProveedor2, // se debe cambiar el id !!!!
                1 ) : null);



            
            // INSERTA GIROS COMERCIALES 
            const d_girosref = await getDGirosref( proveedor.num_prove );
            const idGirosArr = d_girosref.filter( giro => giro.no_ref === d_prove.no_ref ).map( giro => giro.idgiro );
            for ( const id of idGirosArr ){
                await insertGeneric( {
                    iddatos_proveedores : idDatoProveedor2,
                    idgiros_comerciales: id,
                    activo: 1
                } ,'idproveedores_comerciales','proveedores_giros_comerciales')
            }

        }

    };
    console.log('sale del pedul');
    
    const endTime = performance.now();
    const timeInSeconds = (endTime - startTime) / 1000; // Convertir milisegundos a segundos
    console.log(`Tiempo transcurrido ${timeInSeconds} en segundos.`);

}

function formatDataForTableProveedores ( proveedor ) {
    return {
        numero_proveedor: proveedor.num_prove,
        fecha_alta: proveedor.fecalta,
        tiene_documentos: proveedor.documentos === "Y" ? 1 : 0,
        es_repse: proveedor.repse === "Y" ? 1 : 0,
        fecha_repse: proveedor.fecrepse,
        tipo_proveedor: proveedor.tipoprove,
        //idestado_proveedor: proveedor.estatus === "A"? 1 : 0, //esto tiene que salir 
        activo: proveedor.estatus === "A"? 1 : 0,
        usuario_registra: 'migracion', //A QUI SE USA "MIGRACION" YA QUE NO EXISTE ESTE CAMPO EN LA INFORMACION ANTIGUA,
        fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'))
    }
}

function formaDatadatosProveedoredFromCatProve ( idProveedor, idrefrendo, iddomicilio, proveedor ) {
    return {
        idProveedor, //debe de recibirlo la funcion para ingresarlo
        idrefrendo,
        iddomicilio,
        rfc: proveedor.refeca_prov,
        razon_social: proveedor.razon_social,
        observaciones: proveedor.nota,
        sitio_web: proveedor.webprov,
        activo: 1, //se pone 1 ya que la info viene de catProve asi que es la info que esta activa para ese proveedor
        usuario_registra: 'migracion',
        fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'))
    }
}

function formatDataDirecciones ( direccionJson, fecha_registro, usuario_registra ) {
    return {
        ...direccionJson,
        fecha_registro,
        usuario_registra: (usuario_registra) ? usuario_registra: 'migracion'
    }
}

function formatDataRefrendo ( numero_refrendo, fecha_refrendoV, fecha_registroV, usuario_registraV ) {
    return {
        numero_refrendo,
        fecha_refrendo: (fecha_refrendoV ? moment(fecha_refrendoV).format('YYYY-MM-DD') : null),
        fecha_registro: (fecha_registroV ? moment(fecha_registroV).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
        usuario_registra: (usuario_registraV ? usuario_registraV : 'migracion')
    }
}

function formatJustificacionProveedorInactivo ( proveedor, idProveedor, observacion ) {
    /*
    Estados proveedor 
    1. prueba
    2. ddddd
    3, Publicado en el DOF
    4. SSSSS
    */

    if ( !proveedor.fecini && !proveedor.fecsuspini ){
        return null;
    }

    const idEstado = null;

    if ( proveedor.fecini ) {

        const idestado_proveedor = proveedor.idinhabi === 1 ? 3 : 4;
        return {
            idProveedor, 
            idestado_proveedor,
            observacion,
            fecha_inicio: moment(proveedor.fecini || new Date('1900-01-01')).format('YYYY-MM-DD'),
            fecha_fin: moment(proveedor.fecfin || new Date('1900-01-01')).format('YYYY-MM-DD'),
            fecha_diario_oficial_federacion: (proveedor.fecpub ? moment(proveedor.fecpub).format('YYYY-MM-DD') : null ),
            fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD') ),
            usuario_registra: 'migracion'
        }

    } else if ( proveedor.fecsuspini ) {
        const idestado_proveedor = proveedor.idsuspendido === 1 ? 1 : 2;
        return {
            idProveedor, 
            idestado_proveedor,
            observacion,
            fecha_inicio: (proveedor.fecsuspini ? moment(proveedor.fecsuspini).format('YYYY-MM-DD') : null ),
            fecha_fin: (proveedor.fecsuspfin ? moment(proveedor.fecsuspfin).format('YYYY-MM-DD') : null ),
            fecha_diario_oficial_federacion: null,
            fecha_registro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD') ),
            usuario_registra: 'migracion'
        }
    }

}







async function insertaRepresentantes(representantes, tipo_representante) {
    if (representantes.length === 0) {
        return [];
    }

    const idRepresentantes = [];

    // Usar un bucle for...of para manejar correctamente las promesas
    for (const representante of representantes) {
        const representanteJson = {
            tipo_representante,
            nombre: representante
        };

        const idRepresentante = await insertGeneric(representanteJson,'idrepresentantes', "representantes");

        const dataRepresentante = {
            nombre: representante,
            id: idRepresentante,
            tipo_representante
        };
        idRepresentantes.push(dataRepresentante);
    }

    return idRepresentantes;
}

async function insertarRefrendo(refrendoJson) {
    if (!refrendoJson.numero_refrendo) {
        return null;
    }

    const datosRefrendo = {
        numero_refrendo: refrendoJson.numero_refrendo,
        fecha_refrendo: refrendoJson.fecha_refrendo ? moment(refrendoJson.fecha_refrendo).format('YYYY-MM-DD') : null,
        fecha_registro: refrendoJson.fecha_registro ? moment(refrendoJson.fecha_registro).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        usuario_registra: 'migracion'
    };

    const idrefrendo = await insertGeneric(datosRefrendo,'idrefrendo', 'refrendo');
    return idrefrendo;
}


async function insertaDatosProveRepresentantes ( representantesArr, idDatosProveedores, activo ) {
    if (representantesArr.length === 0) {
        return [];
    }
    let idxReturn = []
    for (const representante of representantesArr ) {
        const datosProveJson = {
            idrepresentantes: representante.id,
            iddatos_proveedores : idDatosProveedores,
            activo
        }

        const idRepresentante = await insertGeneric(datosProveJson,'iddatos_prove_representantes', "datos_prove_representantes");

        const representanteDataJson = {
            ...representante,
            ...datosProveJson,
            idIntermedia: idRepresentante
        }
        idxReturn.push( representanteDataJson );
    }
    return idxReturn;
}

async function insertaContacto ( contactos, tipoContacto  ){
// Tipo contacto 
// 1. telefono
// 2. extension 
// 3. mail

    if ( contactos.length === 0 ){
        return [];
    }
    const idxData = [];
    for (const contacto of contactos){
        const id = await insertGeneric( {
            idcat_tipo_contacto: tipoContacto,
            detalle_contacto: contacto,
            notas: ""
        },'idcontacto', 'contacto' );

        idxData.push({
            id,
            contacto
        });
    }

    return idxData;

}

async function insertaContactoIntermedia ( idxContactos, iddatos_proveedores, activo = 1 ) {

    for ( const idcontacto of idxContactos ) {
        const idx = await insertGeneric( {
            iddatos_proveedores,
            idcontacto,
            activo
        },'iddatos_proveedores_contacto', 'datos_proveedores_contacto')
    }

}

async function insertaProveedorGirosIntermedia ( idGirosArr, iddatos_proveedores, activo = 1 ) {

    const idx = [];

    if ( idGirosArr.length === 0 ){
        return idx;
    }

    for ( const idgiros_comerciales of idGirosArr ){
        const datajSON = {
            iddatos_proveedores,
            idgiros_comerciales,
            activo
        }
        const id = await insertGeneric(datajSON,'idproveedores_comerciales', 'proveedores_giros_comerciales')
        idx.push( id );

    }
    return idx;
}

async function procesarDireccionesYAsignarIds ( dProveArr, direccionProveedor, num_prove ) {
    
    /*
    1. Evaluar las direcciones que estan dentro del arreglo (Que no sean iguales)
    2. De las direcciones que quedaron, evaluarlas con la direccion del proveedor
    3. Si alguna es igual a la del proveedor solo se insertara en la intermedia 
        Si son diferentes, se inserta en direcciones y en la intermedia
    */

    // Crear un mapa para contar las apariciones de cada dirección
    const mapaDirecciones = new Map();

    // Llenar el mapa con las direcciones y sus referencias
    dProveArr.forEach(prove => {
        const { no_ref: ref, domici: direccion, fechacam, cve_usuario } = prove;
        const direccionJson = returnDireccionJson(direccion); // Convierte el direccion a JSON
        const direccionFormated = formatDataDirecciones( direccionJson, fechacam, cve_usuario )
        const calle = direccionFormated.calle; // Accede al campo 'calle' dentro del JSON

        if (!mapaDirecciones.has(calle)) {
            mapaDirecciones.set(calle, { refrendos: [ref], direccion: direccionFormated , insertar: "" });
        } else {
            mapaDirecciones.get(calle).refrendos.push(ref);
        }
    });

    // Procesar para determinar la acción de inserción
    const promesas = Array.from(mapaDirecciones.values()).map( async item => {
        // Comparar con direccionPrincipal (suponiendo que es un objeto JSON)
        item.insertar = "intermedia";
        if (item.direccion.calle === direccionProveedor.calle) {
            //Si es igual solo agrega el id de la direccion ya existente en la bd
            item.id = direccionProveedor.id;
        } else {
            //si son diferentes inserta la nueva direccion 
            item.id = await insertGeneric( item.direccion ,'iddomicilio', 'domicilio');
        }

        return item;
    });

    const resultado = await Promise.all( promesas );
    // console.log(resultado, num_prove);
    
    return resultado;
}

async function procesarRepresentantesYAsignarIds ( dProveArr, tipo_representanteV = "legal",  representantesProveedor ) {

    //Si no trae informacion quiere decir que no hay algo que insertar en intermedia ya que no tiene representantes
    // if ( !representantesDProve.length ){
    //     return [];
    // }

    // Crear un mapa para contar las apariciones de cada dirección
    const mapaRepresentantes = new Map();

    //const representantesDProveFilteredArr = representantesDProve.map( rep => getPersonas( rep ) ).flat();

    // Llenar el mapa con los representantes y sus refrendos
    dProveArr.forEach(prove => {
        const { no_ref: ref } = prove;

        let representantesArr = tipo_representanteV === "legal" ?
                                                prove.rep_legal : prove.rep_ventas; 
        if ( !representantesArr ) return;

        representantesArr = getPersonas( representantesArr ).flat();

        for ( const nombre of representantesArr ){
        //for ( const nombre of representantesDProveFilteredArr ){
            const representanteFormated = {
                tipo_representante: tipo_representanteV,
                nombre
            }
            if (!mapaRepresentantes.has(nombre)) {
                mapaRepresentantes.set(nombre, { refrendos: [ref], representante: representanteFormated, insertar: "" });
            } else {
                // Obtener el array de refrendos para este nombre
                let refrendos = mapaRepresentantes.get(nombre).refrendos;
    
                // Solo agregar ref si no está ya en el array
                if (!refrendos.includes(ref)) {
                    refrendos.push(ref);
                }
            }
        }

    });

    // Arreglo de nombres principales de representantes
    let nombresPrincipales = (!representantesProveedor) ? [] :  representantesProveedor.filter( repre => repre.tipo_representante.toLowerCase() === tipo_representanteV.toLowerCase() );
    // console.log("representantesProveedor : ", representantesProveedor);

    // Procesar para determinar la acción de inserción
    const promesas = Array.from(mapaRepresentantes.values()).map(async item => {
        // Determinar si el nombre está en el arreglo de nombres principales
        const nombreEncontrado = nombresPrincipales.find( p => p.nombre === item.representante.nombre ); //Busca el nombre en los nombres principales 
        if ( nombreEncontrado ) {
            // Si es igual solo agrega el id del representante ya existente en la BD
            item.insertar = "intermedia";
            // Aquí necesitas una forma de obtener el ID existente, ajusta según tu lógica de datos
            item.id = nombreEncontrado.idrepresentantes;
        } else {
            // Si son diferentes inserta el nuevo representante
            item.insertar = "completo";
            item.id = await insertGeneric(item.representante,'idrepresentantes', 'representantes');
        }

        return item;
    });

    const resultado = await Promise.all( promesas );

    // console.log("resultados : ", resultado);
    return resultado;
}


startMigration();

