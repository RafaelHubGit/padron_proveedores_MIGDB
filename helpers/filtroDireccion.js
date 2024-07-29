
function returnDireccionJson ( direccion ) {

    if ( direccion === null ){
        return null;
    }

    const estadoC = estados( direccion );
    const entidadLoc = entidadLocal( estadoC.direccion );
    const coloniaC = colonia( entidadLoc.direccion );
    const cpC = codigoPostal( coloniaC.direccion );
    const calleC = cpC.direccion;

    return {
        "Estado": estadoC.estado,
        "EntidadLocal": entidadLoc.entidad,
        "Colonia": coloniaC.colonia, 
        "CodigoPostal": (/^\d+$/).test(cpC.cp) ? cpC.cp : 0, 
        "Calle": calleC
    }
}

function estados ( direccion ) {
    const estados = [
        "AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CAMPECHE", "CHIAPAS",
        "CHIHUAHUA", "CIUDAD DE MEXICO", "COAHUILA", "COLIMA", "DURANGO", "GUANAJUATO",
        "GUERRERO", "HIDALGO", "JALISCO", "MEXICO", "MICHOACAN", "MORELOS", "NAYARIT",
        "NUEVO LEON", "OAXACA", "PUEBLA", "QUERETARO", "QUINTANA ROO", "SAN LUIS POTOSI",
        "SINALOA", "SONORA", "TABASCO", "TAMAULIPAS", "TLAXCALA", "VERACRUZ", "YUCATAN",
        "ZACATECAS"
      ];

      const estado = estados.find( estado => {

        const regexCol = /(?<=(\sCOLONIA|\sCOL(\s|\.|,)|\sFRACCIONAMIENTO)).*/gim;
        const estadoFilt = estado.match( regexCol );

        console.log("Direccion  : ", direccion );

        return direccion?.toUpperCase().includes( estadoFilt ) 
    
        }) || "CIUDAD DE MEXICO";

      nuevaDireccion = direccion.replace(estado, "");

      return { direccion: nuevaDireccion.trim(), estado };
}


function entidadLocal ( direccion ) {
    const entidades = [
        "Alvaro Obregon","Azcapotzalco","Benito Juarez","Coyoacan","Cuajimalpa de Morelos","Cuauhtemoc",
        "Gustavo A. Madero","Iztacalco","Iztapalapa","La Magdalena Contreras","Miguel Hidalgo","Milpa Alta",
        "Tlahuac","Tlalpan","Venustiano Carranza","Xochimilco"
      ].map(entidad => entidad.toUpperCase());

      const direccionUpper = direccion.toUpperCase();
      const regexEntidadLocal = /(?<=(DELEGACION|DELEGACIÓN|DELEG\.|ALCALDIA|MUNICIPIO))(.+?)(?= CP| CODIGO POSTAL| C\.P|$)/gim;
      const regexEntidadLocalTitulo = /((DELEGACION|DELEGACIÓN|DELEG\.|ALCALDIA|MUNICIPIO))(.+?)(?= CP| CODIGO POSTAL| C\.P|$)/gim;


    if ( regexEntidadLocalTitulo.test( direccionUpper ) ) {
        let entidad = direccion.match(regexEntidadLocal);
        direccion = direccion.replace(regexEntidadLocalTitulo, '').trim();
        return { direccion, entidad: entidad[0].trim() };
    } else {
        let entidad = entidades.find(ent => direccionUpper.includes(ent));

        if (entidad) {
            direccion = direccion.replace(new RegExp(entidad, "gi"), '').trim();
            return { direccion, entidad };
        }
    }
    
    return { direccion, entidad:"" };
}


// se tiene que hacer como el de arriba, solo que se va a tener que hacer dos validaciones 
// la primera va a ser de pura colonia, colonia col. etc... 
// y si en todo caso no encuentra lo tendra que hacer con fraccionamiento
// ya que si se trata de hacer todo junto, en algunos casos que la calle es con "fraccionamiento"
// va a tomar esa parte antes de llegar a la colonia
function colonia ( direccion ) {

    const direccionUpper = direccion.toUpperCase();

    const regexColonia = /(?<=(\sCOLONIA|\sCOL(\s|\.|,))).*?(?=(DELEG|ALCALD|CP|C\.P|CODIGO POSTAL))/gim;
    const regextColoniaTitulo = /((\sCOLONIA|\sCOL(\s|\.|,))).*?(?=(DELEG|ALCALD|CP|C\.P|CODIGO POSTAL))/gim;

    const regexFraccion = /(?<=(\sFRACCIONAMIENTO)).*?(?=(DELEG|ALCALD|CP|C\.P|CODIGO POSTAL))/gim;
    const regexFraccionTitulo = /((\sFRACCIONAMIENTO)).*?(?=(DELEG|ALCALD|CP|C\.P|CODIGO POSTAL))/gim;

    if ( regextColoniaTitulo.test( direccionUpper ) ) {
        let colonia = direccionUpper.match( regexColonia );
        const direccion = direccionUpper.replace( regextColoniaTitulo, '' ).trim();
        return { direccion, colonia: colonia[0].trim() };
    } else {
        if ( regexFraccionTitulo.test( direccionUpper ) ) {
            let fraccion = direccionUpper.match( regexFraccion );
            const direccion = direccionUpper.replace( regexFraccionTitulo, '' ).trim();
            return { direccion, colonia: fraccion[0].trim() };
        }
    }

    return { direccion, colonia: "" }
}

function codigoPostal ( direccion ) {

    const direccionUpper = direccion.toUpperCase();

    const regexCp = /(?<=(CP|C\.P\.|CODIGO POSTAL).)(\d+)/gim;
    const regexCpTitulo = /((CP|C\.P\.|CODIGO POSTAL).)(\d+)/gim;

    if ( regexCpTitulo.test( direccionUpper ) ) {
        let cp = direccionUpper.match( regexCp );
        const direc = direccionUpper.replace( regexCpTitulo, '' ).trim();

        return { direccion: direc, cp: cp[0].trim() }
    }

    return { direccion: direccionUpper, cp:"" }
}

module.exports =  { returnDireccionJson, estados, entidadLocal, colonia, codigoPostal };