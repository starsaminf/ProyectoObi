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
	Correo			VARCHAR(64) NOT NULL
);

CREATE TABLE Distrito(
	idDistrito		SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30) NOT NULL,
	Departamento	VARCHAR(15) NOT NULL,
	idAdmin			SERIAL NOT NULL,
	foreign   key   (idAdmin)   references  Admin ON DELETE CASCADE
);

CREATE TABLE Colegio(
	idColegio		SERIAL PRIMARY KEY,
	Sie 			VARCHAR(30)	NOT NULL UNIQUE,
	Nombre          VARCHAR(30) NOT NULL,
	Zona 			VARCHAR(100),
	Direccion 		VARCHAR(100),
	Latitud			DOUBLE PRECISION,
	Longitud		DOUBLE PRECISION,
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
	Baner           VARCHAR(50),
	Convocatoria    VARCHAR(50),
	FechaIni		DATE,
	FechaFin		DATE,
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
	Password		VARCHAR(64)
);

CREATE TABLE Estudiante(
	Rude			VARCHAR(20) PRIMARY KEY,
	Nombre			VARCHAR(100),
	ApPaterno		VARCHAR(30),
	ApMaterno		VARCHAR(30),
	Genero			VARCHAR(30),
	FechaNac		DATE,
	Ci 				VARCHAR(15),
	Correo 			VARCHAR(20) UNIQUE
);

CREATE TABLE Participante(
	idParticipante 	SERIAL PRIMARY KEY,
	idTutor 		SERIAL,
	idColegio		SERIAL,
	idOlimpiada		SERIAL,
	Rude			VARCHAR(20),
	Fecha 			DATE,
	foreign   key   (idTutor)   references  Tutor ON DELETE CASCADE,
	foreign   key   (idColegio)   references  Colegio ON DELETE CASCADE,
	foreign   key   (idOlimpiada)   references  Olimpiada ON DELETE CASCADE,
	foreign   key   (Rude)   references  Estudiante ON DELETE CASCADE
);

CREATE TABLE Participa(
	idNivel			SERIAL NOT NULL,
	idParticipante 	SERIAL NOT NULL,
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE,
	foreign   key   (idParticipante)   references  Participante 
);

CREATE TABLE Nota(
	idNota			SERIAL PRIMARY KEY,
	idParticipante 	SERIAL NOT NULL,
	idEtapa  	 	SERIAL NOT NULL,
	idNivel		 	SERIAL NOT NULL,
	Nota 			DOUBLE	PRECISION,
	Observaciones	VARCHAR(30),
	Puesto			INTEGER,
	foreign   key   (idParticipante)   references  Participante ,
	foreign   key   (idEtapa)   references  Etapa ON DELETE CASCADE,
	foreign   key   (idNivel)   references  Nivel ON DELETE CASCADE
);


--------------------------------------------------
-- Insertamos datos a la base de datos
--------------------------------------------------

-- UserName: 	vico
-- Password: 	123456
-- 1encriptado:	e10adc3949ba59abbe56e057f20f883e
-- 2encriptado:	e21adc4050ba60abbe67e168f31f994e

/*
INSERT INTO Admin(UserName, Password, Correo) VALUES ('vico','e21adc4050ba60abbe67e168f31f994e','vicovillca@hotmail.com');
INSERT INTO Distrito(Nombre, Departamento, idAdmin) VALUES ('Distrito 1','lpz',1);
INSERT INTO Colegio(Sie, Nombre, Zona, Direccion, Latitud, Longitud, idDistrito) 
VALUES ('SIe valor', 'Bolvia Mar', 'Z.Unificada Potosi','Atraz de la Planta', 16.232,18.434,1);
INSERT INTO TUTOR(Nombre, ApPaterno, ApMaterno, Ci, Correo, Celular, Password) 
VALUES ('juan','mamani','Quispe','9110020lp','juanhotmail.com','75121325','e10adc3949ba59abbe56e057f20f883e');
INSERT INTO Estudiante(Rude, Nombre, ApPaterno, ApMaterno, Genero, FechaNac, Ci, Correo)
VALUES ('123456567890','Maria','zegarra','Alvarado','F','12-12-12','123456','mariahotmail.com');
INSERT INTO Olimpiada (Nombre,Descripcion,Baner,Convocatoria,FechaIni,FechaFin,Estado,idAdmin)
VALUES ('Primera OLimpiada','Prueba','BAner','Cnasas','12-12-12','12-12-12','Iniciado',1);
INSERT (idTutor, idColegio, idOlimpiada, Rude, Fecha)
VALUES ('1','1','1','123456567890','12-12-12');
INSERT INTO Nivel (Nombre, Descripcion, idOlimpiada)
VALUES ('Nivel 0','Descripcion',1);

*/
