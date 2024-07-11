

// Para utilizar estas funciones, se debe aplicar primero las extensiones y despues los telefonos utilizando el registro que 
// devuelve de las extensiones al telefono

function extensionesFnc ( registro ) {

      const regexExtension = /\b((?:EXTENSION|EXTS? ?):?\.?\s*)(\d{1,5})(?:,\s*\d{1,5})*(?:\s*y\s*\d{1,5})*(?:\s*--?\s*\d{1,5})*(?:\s*\/\s*\d{1,5})*\b/gim;

    if ( regexExtension.test( registro ) ) {
        let extensiones = registro.match(regexExtension).map( ext => ext.match( /\d{1,5}/g ) );
        registro = registro.replace(regexExtension, '').trim();

        //const extensionesArr = extensiones.map( ext => ext.match( /\d{1,5}/g ) );

        return { registro, extensiones: extensiones[0] };
    } 

    return { registro, extensiones: [] };
}

function telefonosFnc ( registro ) {

    const regexTel = /(\(?\d{1,4}\)?[\s-]?){2,5}\d+/gim;

    if ( regexTel.test( registro ) ) {
        let telefonos = registro.match( regexTel ).map( tel => tel.replace( /\D/g, "" ) );

        return telefonos;
    }

    return [];

}

function returnExtensionesTelefonosFnc ( data ) {

    const { registro, extensiones } = extensionesFnc(data) ;

    const telefonos = telefonosFnc( registro );

    return { extensiones, telefonos }

}


module.exports = { returnExtensionesTelefonosFnc, extensionesFnc, telefonosFnc };