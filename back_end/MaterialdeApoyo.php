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

require 'DB/DB_MaterialdeApoyo.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_MaterialdeApoyo::getAll($_POST['idAdmin']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'No hay material de Apoyo')
					);
				}
	}
	if($_POST['_metod']=='getAllPublico'){
			$retorno = DB_MaterialdeApoyo::getAllPublico();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'No hay material de apoyo')
					);
				}
	}
	if($_POST['_metod']=='getAllPublic'){
			$retorno = DB_MaterialdeApoyo::getAllPublic();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay material de apoyo')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_MaterialdeApoyo::Insert(
				$_POST['Titulo'],
				$_POST['SubTitulo'],
				$_POST['Tipo'],
				$_POST['Archivo'],
				$_POST['idAdmin']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'El material de apoyo se agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar el material de apoyo')
					);
				}
	}
	if($_POST['_metod']=='Update'){
			$retorno = DB_MaterialdeApoyo::Update(
				$_POST['idMaterial'],
				$_POST['Titulo'],
				$_POST['SubTitulo'],
				$_POST['Tipo'],
				$_POST['Archivo'],
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
			$retorno = DB_MaterialdeApoyo::Delete(
				$_POST['idMaterialDeApoyo'],
				$_POST['idAdmin']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el material de apoyo')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se puede eliminar el material de apoyo')
					);
				}
	}
}