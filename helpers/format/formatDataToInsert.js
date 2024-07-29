const moment = require('moment');
const { insertGeneric } = require('../../insertNewData');
const { returnDireccionJson } = require('../filtroDireccion');
const { getPersonas } = require('../filtroPersonas');


async function insertarRefrendo(refrendoJson) {
    if (!refrendoJson.numero_refrendo) {
        return null;
    }

    const datosRefrendo = {
        NumeroRefrendo: refrendoJson.NumeroRefrendo,
        FechaRefrendo: refrendoJson.FechaRefrendo ? moment(refrendoJson.FechaRefrendo).format('YYYY-MM-DD') : null,
        ...returnColumnasAuditoria()
    };

    const idrefrendo = await insertGeneric(datosRefrendo,'IdGenRefrendo', 'GenRefrendo');
    return idrefrendo;
}

// async function insertaContacto ( contactos, tipoContacto  ){
//     // Tipo contacto 
//     // 1. telefono
//     // 2. extension 
//     // 3. mail
    
//     if ( contactos.length === 0 ){
//         return [];
//     }
//     const idxData = [];
//     for (const contacto of contactos){
//         const id = await insertGeneric( {
//             IdCatTipoContacto: tipoContacto,
//             DetalleContacto: contacto,
//             Notas: "",
//             ...returnColumnasAuditoria()
//         },'IdGenContacto', 'GenContacto' );

//         idxData.push({
//             id,
//             contacto
//         });
//     }

//     return idxData;
// }

async function insertaContacto(contactos, tipoContacto) {
    // Tipo contacto 
    // 1. telefono
    // 2. extension 
    // 3. mail
    
    if (contactos.length === 0) {
        return [];
    }

    const promises = contactos.map(contacto => {
        return insertGeneric({
            IdCatTipoContacto: tipoContacto,
            DetalleContacto: contacto,
            Notas: "",
            ...returnColumnasAuditoria()
        }, 'IdGenContacto', 'GenContacto').then(id => ({
            id,
            contacto
        }));
    });

    const idxData = await Promise.all(promises);
    return idxData;
}



// async function insertaContactoIntermedia ( idxContactos, iddatos_proveedores, activo = 1 ) {

//     for ( const idcontacto of idxContactos ) {
//         const idx = await insertGeneric( {
//             IdGenDatosProveedores: iddatos_proveedores,
//             IdGenContacto: idcontacto,
//             Notas: "",
//             Activo: activo,
//         },'IdDatosProveedoresContacto', 'DatosProveedores_Contacto' );
//     }

// }
async function insertaContactoIntermedia(idxContactos, iddatos_proveedores, activo = 1) {
    if (idxContactos.length === 0) {
        return [];
    }

    const promises = idxContactos.map(idcontacto => {
        return insertGeneric({
            IdGenDatosProveedores: iddatos_proveedores,
            IdGenContacto: idcontacto,
            Notas: "",
            Activo: activo
        }, 'IdDatosProveedoresContacto', 'DatosProveedores_Contacto');
    });

    const idx = await Promise.all(promises);
    return idx;
}



// async function insertaRepresentantes(representantes, tipo_representante) {
//     if (representantes.length === 0) {
//         return [];
//     }

//     const idRepresentantes = [];

//     // Usar un bucle for...of para manejar correctamente las promesas
//     for (const representante of representantes) {
//         const representanteJson = {
//             TipoRepresentante: tipo_representante,
//             Nombre: representante,
//             ...returnColumnasAuditoria()
//         };

//         const idRepresentante = await insertGeneric(representanteJson,'IdGenRepresentantes', "GenRepresentantes");

//         const dataRepresentante = {
//             Nombre: representante,
//             IdGenRepresentantes: idRepresentante,
//             TipoRepresentante: tipo_representante
//         };
//         idRepresentantes.push(dataRepresentante);
//     }

//     return idRepresentantes;
// }
async function insertaRepresentantes(representantes, tipo_representante) {
    if (representantes.length === 0) {
        return [];
    }

    const promises = representantes.map(async representante => {
        const representanteJson = {
            TipoRepresentante: tipo_representante,
            Nombre: representante,
            ...returnColumnasAuditoria()
        };

        const idRepresentante = await insertGeneric(representanteJson, 'IdGenRepresentantes', 'GenRepresentantes');

        return {
            Nombre: representante,
            IdGenRepresentantes: idRepresentante,
            TipoRepresentante: tipo_representante
        };
    });

    const idRepresentantes = await Promise.all(promises);
    return idRepresentantes;
}



// async function insertaDatosProveRepresentantes ( representantesArr, idDatosProveedores, activo ) {
//     if (representantesArr.length === 0) {
//         return [];
//     }
//     let idxReturn = []
//     for (const representante of representantesArr ) {
//         const datosProveJson = {
//             IdGenRepresentantes: representante.IdGenRepresentantes,
//             IdGenDatosProveedores : idDatosProveedores,
//             Notas: "",
//             ...returnColumnasAuditoria( undefined, undefined, undefined, undefined, activo)
//         }

//         const idRepresentante = await insertGeneric(datosProveJson,'IdDatosProveRepresentantes', "DatosProveedores_Representantes");

//         const representanteDataJson = {
//             ...representante,
//             ...datosProveJson,
//             idIntermedia: idRepresentante
//         }
//         idxReturn.push( representanteDataJson );
//     }
//     return idxReturn;
// }
async function insertaDatosProveRepresentantes(representantesArr, idDatosProveedores, activo) {
    if (representantesArr.length === 0) {
        return [];
    }

    const promises = representantesArr.map(async representante => {
        const datosProveJson = {
            IdGenRepresentantes: representante.IdGenRepresentantes,
            IdGenDatosProveedores: idDatosProveedores,
            Notas: "",
            ...returnColumnasAuditoria(undefined, undefined, undefined, undefined, activo)
        };

        const idRepresentante = await insertGeneric(datosProveJson, 'IdDatosProveRepresentantes', 'DatosProveedores_Representantes');

        return {
            ...representante,
            ...datosProveJson,
            idIntermedia: idRepresentante
        };
    });

    const idxReturn = await Promise.all(promises);
    return idxReturn;
}


// async function insertaProveedorGirosIntermedia ( idGirosArr, iddatos_proveedores, activo = 1 ) {

//     const idx = [];

//     if ( idGirosArr.length === 0 ){
//         return idx;
//     }

//     for ( const idgiros_comerciales of idGirosArr ){
//         const datajSON = {
//             IdGenDatosProveedores :iddatos_proveedores,
//             IdCatGirosComerciales :idgiros_comerciales,
//             activo
//         }
//         const id = await insertGeneric(datajSON,'IdProveedoresGirosComerciales', 'Proveedores_GirosComerciales')
//         idx.push( id );

//     }
//     return idx;
// }
async function insertaProveedorGirosIntermedia(idGirosArr, iddatos_proveedores, activo = 1) {
    if (idGirosArr.length === 0) {
        return [];
    }

    const promises = idGirosArr.map(idgiros_comerciales => {
        const dataJSON = {
            IdGenDatosProveedores: iddatos_proveedores,
            IdCatGirosComerciales: idgiros_comerciales,
            Activo: activo
        };
        return insertGeneric(dataJSON, 'IdProveedoresGirosComerciales', 'Proveedores_GirosComerciales');
    });

    const idx = await Promise.all(promises);
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
            item.id = await insertGeneric( item.direccion ,'IdGenDomicilio', 'GenDomicilio');
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
                TipoRepresentante: tipo_representanteV,
                Nombre: nombre
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
    let nombresPrincipales = (!representantesProveedor) ? [] :  representantesProveedor.filter( repre => repre.TipoRepresentante.toLowerCase() === tipo_representanteV.toLowerCase() );
    // console.log("representantesProveedor : ", representantesProveedor);

    // Procesar para determinar la acción de inserción
    const promesas = Array.from(mapaRepresentantes.values()).map(async item => {
        // Determinar si el nombre está en el arreglo de nombres principales
        const nombreEncontrado = nombresPrincipales.find( p => p.Nombre === item.representante.Nombre ); //Busca el nombre en los nombres principales 
        if ( nombreEncontrado ) {
            // Si es igual solo agrega el id del representante ya existente en la BD
            item.insertar = "intermedia";
            // Aquí necesitas una forma de obtener el ID existente, ajusta según tu lógica de datos
            item.id = nombreEncontrado.IdGenRepresentantes;
        } else {
            // Si son diferentes inserta el nuevo representante
            item.insertar = "completo";
            item.id = await insertGeneric(item.representante,'IdGenRepresentantes', 'GenRepresentantes');
        }

        return item;
    });

    const resultado = await Promise.all( promesas );

    // console.log("resultados : ", resultado);
    return resultado;
}


function formatDataForTableProveedores ( proveedor ) {
    return {
        NumeroProveedor: proveedor.num_prove,
        TipoProveedor: proveedor.tipoprove,
        FechaRegistro: (proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
        // Campos de auditoría
        ...returnColumnasAuditoria(undefined,
                                    proveedor.fecalta ? moment(proveedor.fecalta).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                    undefined,
                                    proveedor.fecact ? moment(proveedor.fecact).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
                                    proveedor.estatus === "A"? 1 : 0
        )
        // IdUsuarioAlta: 'migracion', //A QUI SE USA "MIGRACION" YA QUE NO EXISTE ESTE CAMPO EN LA INFORMACION ANTIGUA,
        // FechaAlta: (proveedor.fecalta ? moment(proveedor.fecalta).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')),
        // IdUsuarioModificacion: 'migracion', //A QUI SE USA "MIGRACION" YA QUE NO EXISTE ESTE CAMPO EN LA INFORMACION ANTIGUA,
        // FechaModificacion: proveedor.fecact,
        // Activo: proveedor.estatus === "A"? 1 : 0,
        //tiene_documentos: proveedor.documentos === "Y" ? 1 : 0,
        //es_repse: proveedor.repse === "Y" ? 1 : 0,
        //fecha_repse: proveedor.fecrepse,
        //idestado_proveedor: proveedor.estatus === "A"? 1 : 0, //esto tiene que salir 
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
    // TODO : Revisar cuales son los usuarios que |||registran las direcciones y agregarlos
    return {
        ...direccionJson,
        ...returnColumnasAuditoria( undefined, fecha_registro, undefined, undefined, undefined, undefined)
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
            IdGenProveedor :idProveedor, 
            IdCatEstadoProveedor: idestado_proveedor,
            Observacion: observacion,
            FechaInicio: moment(proveedor.fecini || new Date('1900-01-01')).format('YYYY-MM-DD'),
            FechaFin: moment(proveedor.fecfin || new Date('1900-01-01')).format('YYYY-MM-DD'),
            FechaDiarioOficialFederacion: (proveedor.fecpub ? moment(proveedor.fecpub).format('YYYY-MM-DD') : null ),
            ...returnColumnasAuditoria()
        }

    } else if ( proveedor.fecsuspini ) {
        const idestado_proveedor = proveedor.idsuspendido === 1 ? 1 : 2;
        return {
            IdGenProveedor :idProveedor, 
            IdCatEstadoProveedor: idestado_proveedor,
            Observacion: observacion,
            FechaInicio: moment(proveedor.fecini || new Date('1900-01-01')).format('YYYY-MM-DD'),
            FechaFin: moment(proveedor.fecfin || new Date('1900-01-01')).format('YYYY-MM-DD'),
            FechaDiarioOficialFederacion: null,
            ...returnColumnasAuditoria()
        }
    }

}

function returnColumnasAuditoria ( IdUsuarioAlta = 0, 
                                    FechaAlta = moment().format('YYYY-MM-DD'), 
                                    IdUsuarioModificacion = 0, 
                                    FechaModificacion = moment().format('YYYY-MM-DD'),
                                    Activo = 1) {
    return {
        IdUsuarioAlta,
        FechaAlta,
        IdUsuarioModificacion,
        FechaModificacion,
        Activo
    }
}


module.exports = {
    insertarRefrendo,
    insertaContacto,
    insertaContactoIntermedia,
    insertaRepresentantes,
    insertaDatosProveRepresentantes,
    insertaProveedorGirosIntermedia,
    procesarDireccionesYAsignarIds,
    procesarRepresentantesYAsignarIds,
    formatDataForTableProveedores,
    formaDatadatosProveedoredFromCatProve,
    formatDataDirecciones,
    formatDataRefrendo,
    formatJustificacionProveedorInactivo,
    returnColumnasAuditoria
}