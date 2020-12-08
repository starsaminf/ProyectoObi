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

require 'DB/DB_Nivel.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Nivel::getAll($_POST['idOlimpiada']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no se encontro ningun nivel')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Nivel::Insert(
				$_POST['Nombre'],
				$_POST['Descripcion'],
				$_POST['LimiteEdad'],
				$_POST['LimitePorGrupo'],
				$_POST['idOlimpiada']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'El Nivel se agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar el nuevo Nivel')
					);
				}
	}


	    /*
    idNivel         SERIAL PRIMARY KEY,
    Nombre          VARCHAR(100),
    Descripcion     VARCHAR(100),
    idOlimpiada     SERIAL NOT NULL,
*/
	if($_POST['_metod']=='Update'){
			$retorno = DB_Nivel::Update(
				$_POST['idNivel'],
				$_POST['Nombre'],
				$_POST['Descripcion'],
				$_POST['LimiteEdad'],
				$_POST['LimitePorGrupo']
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
			$retorno = DB_Nivel::Delete(
				$_POST['idNivel']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el Nivel')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar el Nivel')
					);
				}
	}
}