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

require 'DB/DB_Integrante_de.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Integrante_de::Insert(
				$_POST['idGrupo'],
				$_POST['idEstudiante']
				
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'el participante se registro correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo registrar al participante')
					);
				}
	}

	if($_POST['_metod']=='Delete'){
			$retorno = DB_Integrante_de::Delete(
				$_POST['idGrupo'],
				$_POST['idEstudiante']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'estado2' => $retorno,
							'mensaje' => 'Se elimino la participacion')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'estado2' => $retorno,
							'mensaje' => 'No se pudo Eliminar la participacion')
					);
				}
	}
}