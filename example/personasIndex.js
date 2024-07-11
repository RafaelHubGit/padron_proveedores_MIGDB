const { personas } = require('../helpers/filtroPersonas');



const registros = [
    "C.PORFIRIO RAMIREZ VEGA                                                                                                                                                                                 ",
    "**SUSPENSION POR DOS AÑOS*** NO CUMPLIO CON LA ENTREGA DE LOS BIENES ART 42 FRACCION I**",
    "CARDENAS VALTIERRA ALBERTO                                                                                                                                                                              ",
    "GRACIELA CERVANTES MONROY Y/O OSCAR CRESPO SANTIAGO",
    "MA.MAGDALENA SALAZAR, C. LUIS FERNANDEZ ",
    "ROSA LAURA HERNANDEZ HERNANDEZ / MIGUEL ANGEL PORRUA VENERO    ",
    "JOSE ALFREDO ORTIZ ANGELES   **SUSPENSION POR DOS AÑOS*** NO CUMPLIO CON LA ENTREGA DE LOS BIENES ART 42 FRACCION I**                                                                                   ",
    "C. HUMBERTO J. PATIÑO ",
    "ING. LEOPALDO CANO  ",
    "C. FRANCISCO A LA TORRE SILVA Y/O EDMUNDO DANTES  ",
    "SAUL ELIZONDO QUINTANILLA    CELIA LISSETE ELIZONDO JASSO    ",
    "C. GUILLERMO A. PEREZ IBERRI    ",
    "LUIS MIGUEL MARTINEZ ANZURES  -- LUIS ARMANDO CARRANZA CAMARENA -- JOSE RAFAEL MARTINEZ PUON   ",
    "JESUS TORRES CERVANTES - EDUARDO ROBLES GIL ORVAÑANOS  ",
    "LUIS MANUEL RODRIGUEZ MUÑOZ DE COTE Y/O RODRIGO RODRIGUEZ MUÑOZ DE COTE Y/O ALICIA MARGARITA MUÑOZ DE COTE SERRANO                                                                                      ",
    "JAIME KISEL WELCH Y SEBASTIAN CARDUCCI AVELEYRA (FIRMA MANCOMUNADA)  ",
    "",
    "RAUL MENDOZA GARCIA; EMMANUEL MENDOZA MORENO u YOLANDA MEDINA CASTRO   ",
    "MARCO ANTONIO SANCHEZ MAYA O ADRIANA ANAYA VERA O ENRIQUE CHAVEZ HERNANDEZ  ",
    "HOMERO I. SANTIAGO U. ",
    "",
    "LIC. VERÓNICA A.RODRIGUEZ M.   ",
    "C.P. ALEJANDRO MARCOS PIÑA TORRES    "
]

registros.forEach( registro => {

    // console.log(ext);

    const personasA = personas( registro ) ;

    console.log( personasA );


});