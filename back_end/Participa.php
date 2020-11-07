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

require 'DB/DB_Participa.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Participa::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["MaterialdeApoyo"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'Error al cargar las noticias')
					);
				}
	}
	if($_POST['_metod']=='getAllEstudianteParticipa'){
			$retorno = DB_Participa::getEstudianteParticipa($_POST['idParticipante']);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["MaterialdeApoyo"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'Error al cargar las noticias')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Participa::Insert(
				$_POST['idNivel'],
				$_POST['idParticipante']
				
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'La noticia se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar la nueva Noticia')
					);
				}
	}

	if($_POST['_metod']=='Delete'){
			$retorno = DB_Participa::Delete(
				$_POST['idNivel'],
				$_POST['idParticipante']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino la noticia')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar la noticia')
					);
				}
	}
}