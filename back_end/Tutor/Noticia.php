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

require 'DB/DB_Noticia.php';
require 'DB/DB_Autentificar.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Noticia::getAll($_POST['idAdmin']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay noticias que mostrar')
					);
				}
	}
	
	if($_POST['_metod']=='getAllPublic'){
			$retorno = DB_Noticia::getAllPublic();
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay noticias que mostrar')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Noticia::Insert(
				$_POST['Titulo'],
				$_POST['SubTitulo'],
				$_POST['Contenido'],
				$_POST['idAdmin']
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
	if($_POST['_metod']=='Update'){
			$retorno = DB_Noticia::Update(
				$_POST['idNoticia'],
				$_POST['Titulo'],
				$_POST['SubTitulo'],
				$_POST['Contenido'],
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
			$retorno = DB_Noticia::Delete(
				$_POST['idNoticia'],
				$_POST['idAdmin']
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