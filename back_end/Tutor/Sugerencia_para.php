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

require 'DB/DB_Sugerencia_para.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Sugerencia_para::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No hay sugerencias que mostrar')
					);
				}
	}
	if($_POST['_metod']=='getRecomendaciones'){
			$retorno = DB_Sugerencia_para::getRecomendaciones($_POST['idNivel']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No hay sugerencias que mostrar')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Sugerencia_para::Insert(
				$_POST['idMaterial'],
				$_POST['idNivel']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'La sugerencias se registro correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo registrar la sugerencia')
					);
				}
	}

	if($_POST['_metod']=='Delete'){
			$retorno = DB_Sugerencia_para::Delete(
				$_POST['idMaterial'],
				$_POST['idNivel']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino cancelo la sugerencia')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo cancelar la sugerencia')
					);
				}
	}
}