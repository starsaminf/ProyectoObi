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

require 'DB/DB_Etapa.php';
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Etapa::getAll($_POST['idOlimpiada']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no se encontro ninguna etapa')
					);
				}
	}

//SIEMPRE SERA POST
    /*

    idEtapa         SERIAL PRIMARY KEY,
    Nombre          VARCHAR(100),
    Descripcion     VARCHAR(100),
    FechaIni        DATE,
    FechaFin        DATE,
    Tipo            VARCHAR(10),
    idOlimpiada     SERIAL NOT NULL,

    */
	if($_POST['_metod']=='Update'){
			$retorno = DB_Etapa::Update(
				$_POST['idEtapa'],
				$_POST['Nombre'],
				$_POST['Descripcion'],
				$_POST['FechaIni'],
				$_POST['FechaFin']
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

	if($_POST['_metod']=='getById'){
			$retorno = DB_Etapa::getById(
				$_POST['tipo'],
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
							'mensaje' => 'NO se encontro la Etapa')
					);
				}
	}

	if($_POST['_metod']=='Delete'){
			$retorno = DB_Etapa::Delete(
				$_POST['idEtapa']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino la etapa')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo eliminar la etapa')
					);
				}
	}
}