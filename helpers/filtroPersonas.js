

function getPersonas ( registro ) {

    if ( !registro ){
        return [];
    }

    const regexSuspenciones = /\*+.*/gim;
    const regexNoPersonas = /(?:,|-| \/ | Y\/O | O | U | Y |\s{3,10}|;)/gim;

    const regexPersonas = /([A-Z])\w+/gim;


    if ( !regexPersonas.test( registro ) ){//Valida que existan palabras
        return [];
    }

    // Primero quita todas las suspenciones o datos adicionales
    let registroSinSuspenciones = registro;
    if ( registroSinSuspenciones ) {
        registroSinSuspenciones = registro.replace(regexSuspenciones, '').trim();
    }
    
    // Obtiene a las personas
    const personas = registroSinSuspenciones.split( regexNoPersonas );

    // Si se cuela un registro con "" lo quita y retorna lo demas
    return personas.filter(persona => persona.trim() !== "");

}

module.exports = { getPersonas };