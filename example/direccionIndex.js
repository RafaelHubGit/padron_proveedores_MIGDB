const fs = require('fs');
const { estados, entidadLocal, colonia, codigoPostal } = require('../helpers/filtroDireccion');


const archivoJson = './cat_prove_202404081418_domicilio.json';

const datos = fs.readFileSync( archivoJson, 'utf8' );

const objJson = JSON.parse( datos );


const direcJson = [];
objJson.cat_prove.forEach(( dir, idx ) => {

    console.log( "direccion : ", dir.domicilio );

    const direccion = dir.domicilio;

    // NOTA!!!
    // Se debe eir haciendo el filtro y separando la informaicon en el orden que esta 
    // estado, entidad, colonia, cp, y calle 
    const estadoC = estados( direccion );
    const entidadLoc = entidadLocal( estadoC.direccion );
    const coloniaC = colonia( entidadLoc.direccion );
    const cpC = codigoPostal( coloniaC.direccion );
    const calleC = cpC.direccion;

    const dirJson = {
        "estado": estadoC.estado,
        "entidadLoc": entidadLoc.entidad,
        "colonia": coloniaC.colonia, 
        "cp": cpC.cp, 
        "calle": calleC
    }

    console.log( dirJson );
});

// fs.readFile(filePath, 'utf8', (err, data) => {


//     if ( err ) {
//         console.log('Error al leer el archivo: ', err);
//         return;
//     }


//     modifiedData = data.replace(regex, ' ');

//     fs.writeFile(filePath, modifiedData, 'utf8', ( err ) => {

//         if ( err ) {
//             console.error('Error al escribir en el archivo: ', err);
//             return;
//         }

//         console.log('Archivo modificado y guardado');
//     });

// });
