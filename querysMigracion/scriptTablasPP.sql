USE [PadronProveedores]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenRepresentantes]') AND type in (N'U'))
ALTER TABLE [dbo].[GenRepresentantes] DROP CONSTRAINT IF EXISTS [CK__GenRepres__TipoR__6D0D32F4]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Documentos]') AND type in (N'U'))
ALTER TABLE [dbo].[Documentos] DROP CONSTRAINT IF EXISTS [CK__Documentos__Tipo__5AEE82B9]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Proveedores_GirosComerciales]') AND type in (N'U'))
ALTER TABLE [dbo].[Proveedores_GirosComerciales] DROP CONSTRAINT IF EXISTS [GirosComercialesInter]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Proveedores_GirosComerciales]') AND type in (N'U'))
ALTER TABLE [dbo].[Proveedores_GirosComerciales] DROP CONSTRAINT IF EXISTS [DatosProveedoresInter]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenJustificacionProveedorInactivo]') AND type in (N'U'))
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] DROP CONSTRAINT IF EXISTS [FK_GenJustificacionProveedorInactivo_GenProveedores]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenJustificacionProveedorInactivo]') AND type in (N'U'))
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] DROP CONSTRAINT IF EXISTS [FK_GenJustificacionProveedorInactivo_CatEstadosProveedores]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDatosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDatosProveedores] DROP CONSTRAINT IF EXISTS [RefrendoDatosProveedor]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDatosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDatosProveedores] DROP CONSTRAINT IF EXISTS [FiscalesProveedores]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDatosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDatosProveedores] DROP CONSTRAINT IF EXISTS [DatosProveedoresDomicilio]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenContacto]') AND type in (N'U'))
ALTER TABLE [dbo].[GenContacto] DROP CONSTRAINT IF EXISTS [ContactoCatTipoContacto]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Proveedores_GirosComerciales]') AND type in (N'U'))
ALTER TABLE [dbo].[Proveedores_GirosComerciales] DROP CONSTRAINT IF EXISTS [DF__Proveedor__Activ__1EA48E88]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenRepresentantes]') AND type in (N'U'))
ALTER TABLE [dbo].[GenRepresentantes] DROP CONSTRAINT IF EXISTS [DF__GenRepres__Activ__6E01572D]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenRefrendo]') AND type in (N'U'))
ALTER TABLE [dbo].[GenRefrendo] DROP CONSTRAINT IF EXISTS [DF__GenRefren__Activ__0B91BA14]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenProveedores] DROP CONSTRAINT IF EXISTS [DF__GenProvee__Activ__05D8E0BE]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenJustificacionProveedorInactivo]') AND type in (N'U'))
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] DROP CONSTRAINT IF EXISTS [DF__GenJustif__Activ__31B762FC]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDomicilio]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDomicilio] DROP CONSTRAINT IF EXISTS [DF__GenDomici__Activ__08B54D69]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDatosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDatosProveedores] DROP CONSTRAINT IF EXISTS [DF__GenDatosP__Activ__0F624AF8]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenDatosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[GenDatosProveedores] DROP CONSTRAINT IF EXISTS [DF__GenDatosP__Tiene__0E6E26BF]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GenContacto]') AND type in (N'U'))
ALTER TABLE [dbo].[GenContacto] DROP CONSTRAINT IF EXISTS [DF__GenContac__Activ__17F790F9]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Documentos]') AND type in (N'U'))
ALTER TABLE [dbo].[Documentos] DROP CONSTRAINT IF EXISTS [DF__Documento__Activ__5BE2A6F2]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DatosProveedores_Contacto]') AND type in (N'U'))
ALTER TABLE [dbo].[DatosProveedores_Contacto] DROP CONSTRAINT IF EXISTS [DF__DatosProv__Activ__5FB337D6]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DatosProveedores_Representantes]') AND type in (N'U'))
ALTER TABLE [dbo].[DatosProveedores_Representantes] DROP CONSTRAINT IF EXISTS [DF__DatosProv__Activ__01142BA1]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CatTipoContacto]') AND type in (N'U'))
ALTER TABLE [dbo].[CatTipoContacto] DROP CONSTRAINT IF EXISTS [DF__CatTipoCo__Activ__151B244E]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CatGirosComerciales]') AND type in (N'U'))
ALTER TABLE [dbo].[CatGirosComerciales] DROP CONSTRAINT IF EXISTS [DF__CatGirosC__Activ__1BC821DD]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CatEstadosProveedores]') AND type in (N'U'))
ALTER TABLE [dbo].[CatEstadosProveedores] DROP CONSTRAINT IF EXISTS [DF__CatEstado__Activ__236943A5]
GO
/****** Object:  Table [dbo].[Proveedores_GirosComerciales]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[Proveedores_GirosComerciales]
GO
/****** Object:  Table [dbo].[GenRepresentantes]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenRepresentantes]
GO
/****** Object:  Table [dbo].[GenRefrendo]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenRefrendo]
GO
/****** Object:  Table [dbo].[GenProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenProveedores]
GO
/****** Object:  Table [dbo].[GenJustificacionProveedorInactivo]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenJustificacionProveedorInactivo]
GO
/****** Object:  Table [dbo].[GenDomicilio]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenDomicilio]
GO
/****** Object:  Table [dbo].[GenDatosProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenDatosProveedores]
GO
/****** Object:  Table [dbo].[GenContacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[GenContacto]
GO
/****** Object:  Table [dbo].[Documentos]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[Documentos]
GO
/****** Object:  Table [dbo].[DatosProveedores_Contacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[DatosProveedores_Contacto]
GO
/****** Object:  Table [dbo].[DatosProveedores_Representantes]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[DatosProveedores_Representantes]
GO
/****** Object:  Table [dbo].[CatTipoContacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[CatTipoContacto]
GO
/****** Object:  Table [dbo].[CatGirosComerciales]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[CatGirosComerciales]
GO
/****** Object:  Table [dbo].[CatEstadosProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
DROP TABLE IF EXISTS [dbo].[CatEstadosProveedores]
GO
/****** Object:  Table [dbo].[CatEstadosProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatEstadosProveedores](
	[IdCatEstadoProveedor] [int] IDENTITY(1,1) NOT NULL,
	[EstadoProveedor] [varchar](50) NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCatEstadoProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatGirosComerciales]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatGirosComerciales](
	[IdCatGirosComerciales] [int] IDENTITY(1,1) NOT NULL,
	[GiroComercial] [varchar](200) NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCatGirosComerciales] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CatTipoContacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatTipoContacto](
	[IdCatTipoContacto] [int] IDENTITY(1,1) NOT NULL,
	[DescripcionContacto] [varchar](100) NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
    [FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
    [IdUsuarioModificacion] [int] NULL DEFAULT 0,
    [FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
    [Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCatTipoContacto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DatosProveedores_Representantes]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DatosProveedores_Representantes](
	[IdDatosProveRepresentantes] [int] IDENTITY(1,1) NOT NULL,
	[IdGenRepresentantes] [int] NOT NULL,
	[IdGenDatosProveedores] [int] NOT NULL,
	[Notas] [text] NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDatosProveRepresentantes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DatosProveedores_Contacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DatosProveedores_Contacto](
	[IdDatosProveedoresContacto] [int] IDENTITY(1,1) NOT NULL,
	[IdGenDatosProveedores] [int] NOT NULL,
	[IdGenContacto] [int] NOT NULL,
	[Notas] [text] NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDatosProveedoresContacto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Documentos]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documentos](
	[IdDocumentos] [int] IDENTITY(1,1) NOT NULL,
	[IdGenDatosProveedores] [int] NOT NULL,
	[NombreDocumento] [varchar](255) NOT NULL,
	[Tipo] [varchar](20) NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDocumentos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenContacto]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenContacto](
	[IdGenContacto] [int] IDENTITY(1,1) NOT NULL,
	[IdCatTipoContacto] [int] NOT NULL,
	[DetalleContacto] [varchar](255) NULL,
	[Notas] [text] NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenContacto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenDatosProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenDatosProveedores](
	[IdGenDatosProveedores] [int] IDENTITY(1,1) NOT NULL,
	[IdGenProveedor] [int] NOT NULL,
	[IdGenRefrendo] [int] NULL,
	[IdGenDomicilio] [int] NULL,
	[RFC] [varchar](255) NOT NULL,
	[RazonSocial] [varchar](255) NULL,
	[Observaciones] [varchar](255) NULL,
	[SitioWeb] [varchar](100) NULL,
	[TieneDocumentos] [bit] NOT NULL,
	[EsRepse] [bit] NOT NULL,
	[FechaRepse] [datetime] NULL,
	[FechaRegistro] [datetime] NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenDatosProveedores] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenDomicilio]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenDomicilio](
	[IdGenDomicilio] [int] IDENTITY(1,1) NOT NULL,
	[Calle] [varchar](255) NOT NULL,
	[Colonia] [varchar](255) NOT NULL,
	[CodigoPostal] [int] NOT NULL,
	[Estado] [varchar](200) NOT NULL,
	[EntidadLocal] [varchar](255) NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenDomicilio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenJustificacionProveedorInactivo]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenJustificacionProveedorInactivo](
	[IdGenProveedoresEstado] [int] IDENTITY(1,1) NOT NULL,
	[IdGenProveedor] [int] NOT NULL,
	[IdCatEstadoProveedor] [int] NOT NULL,
	[Observacion] [varchar](255) NULL,
	[FechaInicio] [date] NOT NULL,
	[FechaFin] [date] NOT NULL,
	[FechaDiarioOficialFederacion] [date] NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenProveedoresEstado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenProveedores]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenProveedores](
	[IdGenProveedor] [int] IDENTITY(1,1) NOT NULL,
	[NumeroProveedor] [int] NOT NULL,
	[TipoProveedor] [char](1) NULL,
	[FechaRegistro] [date] NOT NULL,
	[IdUsuarioAlta] [int] NULL,
	[FechaAlta] [datetime] NULL,
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenRefrendo]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenRefrendo](
	[IdGenRefrendo] [int] IDENTITY(1,1) NOT NULL,
	[NumeroRefrendo] [int] NOT NULL,
	[FechaRefrendo] [date] NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenRefrendo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenRepresentantes]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenRepresentantes](
	[IdGenRepresentantes] [int] IDENTITY(1,1) NOT NULL,
	[TipoRepresentante] [varchar](20) NOT NULL,
	[Nombre] [varchar](255) NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdGenRepresentantes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proveedores_GirosComerciales]    Script Date: 23/07/2024 01:09:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedores_GirosComerciales](
	[IdProveedoresGirosComerciales] [int] IDENTITY(1,1) NOT NULL,
	[IdGenDatosProveedores] [int] NOT NULL,
	[IdCatGirosComerciales] [int] NOT NULL,
	[IdUsuarioAlta] [int] NOT NULL DEFAULT 0,
	[FechaAlta] [datetime] NOT NULL DEFAULT GETDATE(),
	[IdUsuarioModificacion] [int] NULL DEFAULT 0,
	[FechaModificacion] [datetime] NULL DEFAULT GETDATE(),
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdProveedoresGirosComerciales] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CatEstadosProveedores] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[CatGirosComerciales] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[CatTipoContacto] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[DatosProveedores_Representantes] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[DatosProveedores_Contacto] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Documentos] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenContacto] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenDatosProveedores] ADD  DEFAULT ((0)) FOR [TieneDocumentos]
GO
ALTER TABLE [dbo].[GenDatosProveedores] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenDomicilio] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenProveedores] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenRefrendo] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenRepresentantes] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Proveedores_GirosComerciales] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[GenContacto]  WITH CHECK ADD  CONSTRAINT [ContactoCatTipoContacto] FOREIGN KEY([IdCatTipoContacto])
REFERENCES [dbo].[CatTipoContacto] ([IdCatTipoContacto])
GO
ALTER TABLE [dbo].[GenContacto] CHECK CONSTRAINT [ContactoCatTipoContacto]
GO
ALTER TABLE [dbo].[GenDatosProveedores]  WITH CHECK ADD  CONSTRAINT [DatosProveedoresDomicilio] FOREIGN KEY([IdGenDomicilio])
REFERENCES [dbo].[GenDomicilio] ([IdGenDomicilio])
GO
ALTER TABLE [dbo].[GenDatosProveedores] CHECK CONSTRAINT [DatosProveedoresDomicilio]
GO
ALTER TABLE [dbo].[GenDatosProveedores]  WITH CHECK ADD  CONSTRAINT [FiscalesProveedores] FOREIGN KEY([IdGenProveedor])
REFERENCES [dbo].[GenProveedores] ([IdGenProveedor])
GO
ALTER TABLE [dbo].[GenDatosProveedores] CHECK CONSTRAINT [FiscalesProveedores]
GO
ALTER TABLE [dbo].[GenDatosProveedores]  WITH CHECK ADD  CONSTRAINT [RefrendoDatosProveedor] FOREIGN KEY([IdGenRefrendo])
REFERENCES [dbo].[GenRefrendo] ([IdGenRefrendo])
GO
ALTER TABLE [dbo].[GenDatosProveedores] CHECK CONSTRAINT [RefrendoDatosProveedor]
GO
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo]  WITH CHECK ADD  CONSTRAINT [FK_GenJustificacionProveedorInactivo_CatEstadosProveedores] FOREIGN KEY([IdCatEstadoProveedor])
REFERENCES [dbo].[CatEstadosProveedores] ([IdCatEstadoProveedor])
GO
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] CHECK CONSTRAINT [FK_GenJustificacionProveedorInactivo_CatEstadosProveedores]
GO
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo]  WITH CHECK ADD  CONSTRAINT [FK_GenJustificacionProveedorInactivo_GenProveedores] FOREIGN KEY([IdGenProveedor])
REFERENCES [dbo].[GenProveedores] ([IdGenProveedor])
GO
ALTER TABLE [dbo].[GenJustificacionProveedorInactivo] CHECK CONSTRAINT [FK_GenJustificacionProveedorInactivo_GenProveedores]
GO
ALTER TABLE [dbo].[Proveedores_GirosComerciales]  WITH CHECK ADD  CONSTRAINT [DatosProveedoresInter] FOREIGN KEY([IdGenDatosProveedores])
REFERENCES [dbo].[GenDatosProveedores] ([IdGenDatosProveedores])
GO
ALTER TABLE [dbo].[Proveedores_GirosComerciales] CHECK CONSTRAINT [DatosProveedoresInter]
GO
ALTER TABLE [dbo].[Proveedores_GirosComerciales]  WITH CHECK ADD  CONSTRAINT [GirosComercialesInter] FOREIGN KEY([IdCatGirosComerciales])
REFERENCES [dbo].[CatGirosComerciales] ([IdCatGirosComerciales])
GO
ALTER TABLE [dbo].[Proveedores_GirosComerciales] CHECK CONSTRAINT [GirosComercialesInter]
GO
ALTER TABLE [dbo].[Documentos]  WITH CHECK ADD CHECK  (([Tipo]='repse' OR [Tipo]='documento'))
GO
ALTER TABLE [dbo].[GenRepresentantes]  WITH CHECK ADD CHECK  (([TipoRepresentante]='ventas' OR [TipoRepresentante]='legal'))
GO
