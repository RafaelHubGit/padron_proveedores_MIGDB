
const { mail } = require( '../helpers/filtroMail' );

const registros = [
    "serviciosakj@live.com.mx                                                                                                                                                                                ",
    "jomco@prodigy.net.mx                                                                                                                                                                                    ",
    "espejosparavigilancia@hotmail.com; info@espejosautobuses.com                                                                                                                                            ",
    "carlos@7kat.com                                                                                                                                                                                         ",
    "fernandaromeroaraujo@gmail.com                                                                                                                                                                          ",
    "mti_relojeschecadores@hotmail.com                                                                                                                                                                       ",
    "aanaya@teletec.com.mx; aledesma@teletec.com.mx; kanaya@teletec.com.mx                                                                                                                                   ",
    "cylim@live.com.mx; vaccylim@gmail.com                                                                                                                                                                   ",
    "",
    "miralles@dssmexico.com                                                                                                                                                                                  ",
    "administracion@vozyvoto.com; lorena_mahi@hotmail.com                                                                                                                                                    ",
    "araceligenis@gilsama.com                                                                                                                                                                                ",
    "dpventas@cicovisa.com.mx                                                                                                                                                                                ",
    "isaac.hernandez@axity.com                                                                                                                                                                               ",
    "licitacion@colorcassettes.com.mx                                                                                                                                                                        ",
    "tallerhugo@eninfinitum.com                                                                                                                                                                              ",
    "platvipol@prodigy.net.mx                                                                                                                                                                                ",
    "emo_vtas_gob@yahoo.com.mx   "
];

registros.forEach( registro => {

    // console.log(ext);

    const mails = mail( registro ) ;

    console.log( mails );


});