-------------------------------------------------
-- Creamos labase de datos
-------------------------------------------------

CREATE DATABASE ioidb;

--------------------------------------------------
-- creamos todas las tablas que necesitamos 
--
--------------------------------------------------
CREATE TABLE Usuario(
	idUsuario       SERIAL PRIMARY KEY,
	Username		VARCHAR(30) NOT NULL UNIQUE,
	Pasword			VARCHAR(60) NOT NULL,
	Correo			VARCHAR(64) NOT NULL,
	UsuarioAutentificado VARCHAR(10),
	Token			VARCHAR(64)
);
CREATE TABLE Admin (
	idAdmin         SERIAL PRIMARY KEY,
	idUsuario			SERIAL NOT NULL,
	foreign   key   (idUsuario)   references  Usuario ON DELETE CASCADE
);

CREATE TABLE Distrito(
	idDistrito		SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30) NOT NULL,
	Departamento	VARCHAR(5) NOT NULL,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Colegio(
	idColegio		SERIAL PRIMARY KEY,
	Sie 			INTEGER	NOT NULL UNIQUE,
	Nombre          VARCHAR(30) NOT NULL,
	Zona 			VARCHAR(30),
	Direccion 		VARCHAR(30),
	Latitud			DOUBLE PRECISION,
	Longitud		DOUBLE PRECISION,
	idDistrito		SERIAL NOT NULL,
	foreign   key   (idDistrito)   references  Distrito ON DELETE CASCADE
);

CREATE TABLE Noticia (
	idNoticia		SERIAL PRIMARY KEY,
	Titulo			VARCHAR(50),
	subTitulo		VARCHAR(50),
	contenido		TEXT,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Olimpiada(
	idOlimpiada		SERIAL PRIMARY KEY,
	Nombre          VARCHAR(50) NOT NULL,
	descripcion     VARCHAR(100),
	Baner           VARCHAR(50),
	Convocatoria    VARCHAR(50),
	FechaIni		DATE,
	FechaFin		DATE,
	estado			VARCHAR(10),
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE MaterialDeApoyo(
	idMaterial		SERIAL PRIMARY KEY,
	Titulo          VARCHAR(100),
	subTitulo		VARCHAR(300),
	Tipo 			VARCHAR(10),
	Archivo			VARCHAR(300),
	Fecha 			DATE,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Nivel(
	idNivel			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(100),
	Descripcion		VARCHAR(100),
	Modo			VARCHAR(10),
	MaxGrupo		INTEGER,
	idOlimpiada		SERIAL NOT NULL,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Etapa(
	idEtapa			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(100),
	Descripcion		VARCHAR(100),
	FechaIni		DATE,
	FechaFin		DATE,
	Tipo			VARCHAR(10),
	idOlimpiada		SERIAL NOT NULL,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Sugerencia_para(
	idMaterial 		SERIAL	NOT NULL,
	idNivel 		SERIAL 	NOT NULL,
	foreign   key   (idMaterial)   references  MaterialDeApoyo ON DELETE CASCADE,
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE
);

CREATE TABLE Profesor(
	idProfesor		SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30),
	ApPaterno		VARCHAR(30),
	ApMaterno		VARCHAR(30),
	Ci 				VARCHAR(10),
	CiComplemento	VARCHAR(5),
	idUsurio			SERIAL NOT NULL,
	foreign   key   (idUsurio)   references  Usuario ON DELETE CASCADE
);

CREATE TABLE Tutor(
	idTutor			SERIAL PRIMARY KEY,
	idProfesor		SERIAL,
	idColegio		SERIAL,
	idOlimpiada		SERIAL,
	Fecha 			DATE,
	foreign   key   (idProfesor)   references  Profesor ON DELETE CASCADE,
	foreign   key   (idColegio)   references  Colegio ON DELETE CASCADE,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Estudiante(
	idEstudiante	SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30),
	ApPaterno		VARCHAR(30),
	ApMaterno		VARCHAR(30),
	FechaNac		DATE,
	Rude			VARCHAR(20),
	Ci 				VARCHAR(10),
	CiComplemento	VARCHAR(5),
	idUsurio		SERIAL NOT NULL,
	foreign   key   (idUsurio)   references  Usuario ON DELETE CASCADE
);

CREATE TABLE Grupo(
	idGrupo			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(20) NOT NULL,
	idTutor 		SERIAL NOT NULL,
	idNivel			SERIAL NOT NULL,
	foreign   key   (idTutor)   references  Tutor ON DELETE CASCADE,
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE
);

CREATE TABLE Pertenece(
	idGrupo			SERIAL,
	idEstudiante	SERIAL,
	foreign   key   (idGrupo)   references  Grupo ON DELETE CASCADE,
	foreign   key   (idEstudiante)   references  Estudiante ON DELETE CASCADE
);

CREATE TABLE Participa(
	idGrupo			SERIAL,
	idEtapa			SERIAL,
	Nota 			DOUBLE	PRECISION,
	Observaciones	VARCHAR(30),
	Puesto			INTEGER,
	foreign   key   (idGrupo)   references  Grupo ON DELETE CASCADE,
	foreign   key   (idEtapa)   references  Etapa ON DELETE CASCADE
);

--------------------------------------------------
-- Insertamos datos a la base de datos
--------------------------------------------------

INSERT INTO USUARIO(Username, Pasword, Correo) VALUES ('vico','e21adc4050ba60abbe67e168f31f994e','vicovillca@hotmail.com');
INSERT INTO USUARIO(Username, Pasword, Correo) VALUES ('juan','e21adc4050ba60abbe67e168f31f994e','vicovillca@hotmail.com');
INSERT INTO USUARIO(Username, Pasword, Correo) VALUES ('maria','e21adc4050ba60abbe67e168f31f994e','vicovillca@hotmail.com');
