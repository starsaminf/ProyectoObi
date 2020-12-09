-------------------------------------------------
-- Creamos labase de datos
-------------------------------------------------

CREATE DATABASE ioidb;

--------------------------------------------------
-- creamos todas las tablas que necesitamos 
--
--------------------------------------------------

CREATE TABLE Admin (
	idAdmin         SERIAL PRIMARY KEY,
	UserName		VARCHAR(30) NOT NULL UNIQUE,
	Password		VARCHAR(60) NOT NULL,
	Correo			VARCHAR(64) NOT NULL,
	Token			TEXT
);

CREATE TABLE Distrito(
	idDistrito		SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30) NOT NULL,
	Departamento	VARCHAR(15) NOT NULL,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Colegio(
	Sie 			VARCHAR(30)	PRIMARY KEY,
	Nombre          VARCHAR(30) NOT NULL,
	Zona 			VARCHAR(100),
	Direccion 		VARCHAR(100),
	idDistrito		SERIAL NOT NULL,
	foreign   key   (idDistrito)   references  Distrito ON DELETE CASCADE
);

CREATE TABLE Noticia (
	idNoticia		SERIAL PRIMARY KEY,
	Titulo			TEXT,
	SubTitulo		VARCHAR(200),
	Contenido		TEXT,
	Fecha    		DATE,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Olimpiada(
	idOlimpiada		SERIAL PRIMARY KEY,
	Nombre          VARCHAR(50) NOT NULL,
	Descripcion     TEXT,
	FechaIni		DATE,
	FechaFin		DATE,
	FechaLimiteEdad	DATE,
	Estado			VARCHAR(30),
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE MaterialDeApoyo(
	idMaterial		SERIAL PRIMARY KEY,
	Titulo          VARCHAR(200),
	SubTitulo		VARCHAR(300),
	Tipo 			VARCHAR(30),
	Archivo			VARCHAR(300),
	Fecha 			DATE,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Nivel(
	idNivel			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(100),
	Descripcion		TEXT,
	LimiteEdad		INTEGER,
	LimitePorGrupo	INTEGER,	/*Grupal o Individual*/
	idOlimpiada		SERIAL NOT NULL,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Etapa(
	idEtapa			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(100),
	Descripcion		TEXT,
	FechaIni		DATE,
	FechaFin		DATE,
	Tipo			VARCHAR(30),
	idOlimpiada		SERIAL NOT NULL,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Sugerencia_para(
	idMaterial 		SERIAL	NOT NULL,
	idNivel 		SERIAL 	NOT NULL,
	foreign   key   (idMaterial)   references  MaterialDeApoyo ON DELETE CASCADE,
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE
);

CREATE TABLE Tutor(
	idTutor			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(100),
	ApPaterno		VARCHAR(30),
	ApMaterno		VARCHAR(30),
	Ci 				VARCHAR(15),
	Correo 			VARCHAR(50) UNIQUE,
	Celular 		VARCHAR(10),
	Password		VARCHAR(64),
	token			TEXT
);

CREATE TABLE Estudiante(
	Rude			VARCHAR(30)	PRIMARY KEY,
	Nombre			VARCHAR(100),
	ApPaterno		VARCHAR(50),
	ApMaterno		VARCHAR(50),
	Celular			VARCHAR(50),
	FechaNac		DATE,
	Genero			VARCHAR(50),
	Ci 				VARCHAR(50),
	Correo 			VARCHAR(50)
);

CREATE TABLE Grupo(
	idGrupo			SERIAL PRIMARY KEY,
	idNivel 		SERIAL NOT NULL,
	idTutor 		SERIAL NOT NULL,
	idOlimpiada		SERIAL NOT NULL,
	Sie	  			VARCHAR(30),
	Nombre			Varchar(50),
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE,
	foreign   key   (Sie)   references  Colegio ON DELETE CASCADE,
	foreign   key   (idTutor)   references  Tutor ON DELETE CASCADE,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE
);

CREATE TABLE Integrante_de(
	Rude			VARCHAR(30) NOT NULL,
	idGrupo			SERIAL NOT NULL,
	foreign   key   (Rude)   references  Estudiante ,
	foreign   key   (idGrupo)   references  Grupo ON DELETE CASCADE
);

CREATE TABLE Nota(
	idEtapa  	 	SERIAL NOT NULL,
	idNivel			Serial NOT NULL,
	idGrupo			SERIAL NOT NULL,
	Puntos			INTEGER,
	Estado  		VARCHAR(30),
	Observaciones	VARCHAR(30),
	foreign   key   (idEtapa)   references  Etapa ,
	foreign   key   (idNivel)   references  Nivel ,
	foreign   key   (idGrupo)   references  Grupo ON DELETE CASCADE
);

--------------------------------------------------
-- Insertamos datos a la base de datos
--------------------------------------------------

-- UserName: 	vico
-- Password: 	123456
-- 1encriptado:	e10adc3949ba59abbe56e057f20f883e
-- 2encriptado:	e21adc4050ba60abbe67e168f31f994e

/*
INSERT INTO Admin(UserName, Password, Correo,Token) VALUES ('vico','e21adc4050ba60abbe67e168f31f994e','vicovillca@hotmail.com','');


*/
