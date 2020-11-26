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
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay olimpiadas que mostrar')
					);
				}
	}
	if($_POST['_metod']=='getAllPublic'){
			$retorno = DB_Olimpiada::getAllPublic();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'NO hay olimpiadas que mostrar')
					);
				}
	}

	if($_POST['_metod']=='Insert'){
			$retorno = DB_Olimpiada::Insert(
				$_POST['Nombre'],
				$_POST['Descripcion'],
				'pre',//estado = pre
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
				$_POST['idOlimpiada'],
				$_POST['Nombre'],
				$_POST['Descripcion'],
				$_POST['FechaIni'],
				$_POST['FechaFin'],
				$_POST['FechaLimiteEdad'],
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
	if($_POST['_metod']=='UpdateSimple'){
			$retorno = DB_Olimpiada::UpdateSimple(
				$_POST['idOlimpiada'],
				$_POST['Nombre'],
				$_POST['Descripcion'],
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
							'mensaje' => 'No se pudo Eliminar la Olimpiada: puede que este en uso')
					);
				}
	}


	if($_POST['_metod']=='getById'){
			$retorno = DB_Olimpiada::getById(
				$_POST['idOlimpiada']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'val' => $retorno)
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Encontrar la Olimpiada')
					);
				}
	}
		if($_POST['_metod']=='CrearEtapas'){
			$retorno = DB_Olimpiada::CrearEtapas(
				$_POST['idOlimpiada']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Las etapas se agregaron correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar las etapas')
					);
				}
	}
}