 SELECT
    p.idProveedor,
    p.numero_proveedor ,
    p.fecha_alta ,
    p.tiene_documentos ,
    p.es_repse ,
    p.fecha_repse ,
    p.tipo_proveedor ,
    p.activo,
    DatosProveedores = (
        SELECT 
 			        dp.iddatos_proveedores,
 			        dp.idProveedor ,
 			        dp.idrefrendo ,
 			        dp.iddomicilio ,
 			        dp.rfc ,
 			        dp.razon_social ,
 			        dp.observaciones ,
 			        dp.sitio_web ,
 			        dp.activo,
 			        Refrendo = (
    				        SELECT 
       					        r.idrefrendo ,
       					        r.numero_refrendo ,
       					        r.fecha_refrendo
    				        FROM 
       					        proveedores.refrendo r 
    				        WHERE 
       					        r.idrefrendo = dp.idrefrendo
    				        AND 
       					        r.idrefrendo IS NOT NULL
    				        FOR JSON PATH
 			        ),
 			        Domicilio = (
    				        SELECT
       					        d.iddomicilio ,
       					        d.calle ,
       					        d.colonia ,
       					        d.codigo_postal ,
       					        d.estado ,
       					        d.entidad_local
    				        FROM 
       					        proveedores.domicilio d 
    				        WHERE 
       					        d.iddomicilio = dp.iddomicilio
    				        FOR JSON PATH
 			        ),
 			        Representantes = (
    				        SELECT 
       					        r.nombre,
       					        r.tipo_representante,
       					        dpr.activo,
       					        dpr.iddatos_proveedores
    				        FROM 
       					        proveedores.representantes r
    				        LEFT JOIN
       					        proveedores.datos_prove_representantes dpr 
    				        ON
       					        r.idrepresentantes = dpr.idrepresentantes
    				        WHERE 
       					        dpr.iddatos_proveedores = dp.iddatos_proveedores
                ORDER BY r.tipo_representante, r.nombre, dpr.activo
    				        FOR JSON PATH
 			        ),
 			        Contacto = (
    				        SELECT 
                    dpc.iddatos_proveedores_contacto,
       					        c.detalle_contacto,
                    c.notas,
       					        ctc.descripcion_contacto,
       					        dpc.iddatos_proveedores,
                    dpc.activo
    				        FROM 
       					        proveedores.contacto c 
    				        LEFT JOIN 
       					        proveedores.datos_proveedores_contacto dpc 
    				        ON
       					        c.idcontacto = dpc.idcontacto
    				        LEFT JOIN 
       					        proveedores.catalogo_tipo_contacto ctc 
    				        ON ctc.idcatalogo_tipo_contacto = c.idcat_tipo_contacto
    				        WHERE 
       					        dpc.iddatos_proveedores = dp.iddatos_proveedores
                ORDER BY 
                    ctc.descripcion_contacto, c.detalle_contacto, dpc.activo
    				        FOR JSON PATH
 			        ),
 			        GirosComerciales = (
    				        SELECT 
       					        gc.giro_comercial,
       					        pgc.activo,
       					        pgc.iddatos_proveedores,
                    pgc.idgiros_comerciales
    				        FROM
       					        proveedores.giros_comerciales gc 
    				        LEFT JOIN 
       					        proveedores.proveedores_giros_comerciales pgc 
    				        ON
       					        pgc.idgiros_comerciales = gc.idgiros_comerciales
    				        WHERE 
       					        pgc.iddatos_proveedores = dp.iddatos_proveedores
    				        FOR JSON PATH
 			        ),
 			        Inactivo = (
    				        SELECT 
       					        cep.estado_proveedor,
                    cep.idestado_proveedor,
       					        jpi.observacion,
       					        jpi.fecha_inicio,
       					        jpi.fecha_fin ,
       					        jpi.fecha_diario_oficial_federacion 
    				        FROM 
       					        proveedores.justificacion_proveedor_inactivo jpi 
    				        LEFT JOIN 
       					        proveedores.catalogo_estados_proveedores cep 
    				        ON 
       					        jpi.idestado_proveedor = cep.idestado_proveedor
    				        WHERE 
       					        jpi.idProveedor = p.idProveedor
    				        FOR JSON PATH
 			        )
        FROM 
 			        proveedores.datos_proveedores dp 
        WHERE 
 			        dp.idProveedor = p.idProveedor
        FOR JSON PATH
    )
FROM 
    proveedores.proveedores p 
WHERE 
    p.numero_proveedor = @NumProveedor
ORDER BY 
    p.idProveedor
FOR JSON path, ROOT('Proveedores')