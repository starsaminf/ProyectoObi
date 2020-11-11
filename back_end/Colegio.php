<?php
	error_reporting(E_ALL);
  ini_set('display_errors', true);

/**
 * Insertar una nueva meta en la base de datos
 */

if($_SERVER['REQUEST_METHOD']==='POST' && empty($_POST)) {
   $_POST = json_decode(file_get_contents('php://input'),true); 
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require 'DB/DB_Colegio.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Colegio::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun colegio')
					);
				}
	}
	if($_POST['_metod']=='getAllDistrito'){
			$retorno = DB_Colegio::getAllDistrito($_POST['idDistrito']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'Error al encontrar los colegios del distrito')
					);
				}
	}

	if($_POST['_metod']=='Insert'){
			$retorno = DB_Colegio::Insert(
				$_POST['Sie'],
				$_POST['Nombre'],
				$_POST['Zona'],
				$_POST['Direccion'],
				$_POST['Latitud'],
				$_POST['Longitud'],
				$_POST['idDistrito']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'r'=>$retorno,
							'mensaje' => 'El Colegio se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo crear el Colegio')
					);
				}
	}

	if($_POST['_metod']=='Update'){
			$retorno = DB_Colegio::Update(
				$_POST['idColegio'],
				$_POST['Sie'],
				$_POST['Nombre'],
				$_POST['Zona'],
				$_POST['Direccion'],
				$_POST['Latitud'],
				$_POST['Longitud'],
				$_POST['idDistrito']
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
			$retorno = DB_Colegio::Delete(
				$_POST['idColegio']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el Colegio')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar el Colegio')
					);
				}
	}
}