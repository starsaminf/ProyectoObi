<?php
	error_reporting(E_ALL);
  ini_set('display_errors', true);

/**
 * Insertar una nueva meta en la base de datos
      idOlimpiada        SERIAL PRIMARY KEY,
 */

if($_SERVER['REQUEST_METHOD']==='POST' && empty($_POST)) {
   $_POST = json_decode(file_get_contents('php://input'),true); 
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require 'DB/DB_Olimpiada.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Olimpiada::getAll($_POST['idAdmin']);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["OLimpiadas"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'Error al cargar las Olimpiadas')
					);
				}
	}
	if($_POST['_metod']=='getAllPublic'){
			$retorno = DB_Olimpiada::getAllPublic();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["olimpiadas"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'Error al cargar las OLimpiadas')
					);
				}
	}
	/*

	    Nombre          VARCHAR(50) NOT NULL,
    Descripcion     VARCHAR(100),
    Baner           VARCHAR(50),
    Convocatoria    VARCHAR(50),
    FechaIni        DATE,
    FechaFin        DATE,
    Estado          VARCHAR(10),
    idAdmin         SERIAL NOT NULL,
    */
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Olimpiada::Insert(
				$_POST['Nombre'],
				$_POST['Baner'],
				$_POST['Descripcion'],
				$_POST['Convocatoria'],
				$_POST['FechaIni'],
				$_POST['FechaFin'],
				$_POST['Estado'],
				$_POST['idAdmin']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'La Olimpiada se creo correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo crear la nueva OLimpiada')
					);
				}
	}
	if($_POST['_metod']=='Update'){
			$retorno = DB_Olimpiada::Update(
				$_POST['idOLimpiada'],
				$_POST['Nombre'],
				$_POST['Baner'],
				$_POST['Descripcion'],
				$_POST['Convocatoria'],
				$_POST['FechaIni'],
				$_POST['FechaFin'],
				$_POST['Estado'],
				$_POST['idAdmin']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Los cambios se guardaron correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo guardar los cambios')
					);
				}
	}


	if($_POST['_metod']=='Delete'){
			$retorno = DB_Olimpiada::Delete(
				$_POST['idOlimpiada'],
				$_POST['idAdmin']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino la Olimpiada')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar la idOlimpiada')
					);
				}
	}
}