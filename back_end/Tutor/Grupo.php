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

require 'DB/DB_Grupo.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getAll($_POST['idOlimpiada'], $_POST['idTutor'], $_POST['idNivel']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun Grupo')
					);
				}
	}
	if($_POST['_metod']=='getGrupoConNotas'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getGrupoConNotas($_POST['idNivel'], $_POST['idEtapa']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun Grupo')
					);
				}
	}
	if($_POST['_metod']=='getGrupoConNotasCondicionado'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getGrupoConNotasCondicionado($_POST['idNivel'], $_POST['idEtapa']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun Grupo')
					);
				}
	}
	if($_POST['_metod']=='getGrupoConNotasCondicionadoTutor'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getGrupoConNotasCondicionadoTutor($_POST['idTutor'],$_POST['idNivel'], $_POST['idEtapa']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun Grupo')
					);
				}
	}
		if($_POST['_metod']=='getAllAdmin'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getAllAdmin($_POST['idNivel']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningun Grupo')
					);
				}
	}
	if($_POST['_metod']=='getAllEstudiantesDeGrupo'){
		//$idOlimpiada,$idTutor,$idNivel
			$retorno = DB_Grupo::getAllEstudiantesDeGrupo( $_POST['idGrupo']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'NO se encontro ningunestudiante en el grupo')
					);
				}
	}
	if($_POST['_metod'] == 'getAprobadosPorEtapa'){
		$retorno = DB_Grupo::getAprobadosPorEtapa($_POST['idNivel'],$_POST['idEtapaAnt'],$_POST['idEtapa']);
		if ($retorno) {
            $datos["estado"] = 1;
            $datos["ret"] = $retorno;
			$datos["val"] = $retorno;
			print json_encode($datos);
		} else {
			print json_encode(
				array(
					'estado' => 2,
					'mensaje' => 'NO se encontro ningunestudiante en el grupo')
			);
		}
	}

	if($_POST['_metod']=='Insert'){
			$retorno = DB_Grupo::Insert(
				$_POST['idNivel'],
				$_POST['idTutor'],
				$_POST['idOlimpiada'],
				$_POST['Nombre'],
				$_POST['Sie']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'val'=>$retorno,
							'mensaje' => 'El Grupo se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo crear el Grupo')
					);
				}
	}

	if($_POST['_metod']=='Update'){
			$retorno = DB_Grupo::Update(
				$_POST['idGrupo'],
				$_POST['Nombre']
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
			$retorno = DB_Grupo::Delete(
				$_POST['idGrupo']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el Grupo')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar el Grupo')
					);
				}
	}
}