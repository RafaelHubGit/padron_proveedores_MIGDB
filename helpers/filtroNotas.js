

function getNotaSuspencion ( registro ) {
    const regexSuspenciones = /\*+.*/gim;

    if ( regexSuspenciones.test( registro ) ) {
        const registroSuspenciones = registro.match(regexSuspenciones).map(parte => parte.trim());
        return registroSuspenciones[0];
    }

    return "";
}


module.exports = { getNotaSuspencion };