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

require 'DB/DB_Nota.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Nota::getAll($_POST['idParticipante'],$_POST['idEtapa'],$_POST['idNivel']);
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'error' => $retorno,
							'mensaje' => 'Error al cargar las notas')
					);
				}
	}
	if($_POST['_metod']=='getById'){
			$retorno = DB_Nota::getById(
				$_POST['idGrupo'],
				$_POST['idEtapa']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'val' 	 => $retorno)
					);
				} else {
					print json_encode(
						array(
							'estado'  => 2,
							'mensaje' => 'No Existe La nota')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Nota::Insert(
				$_POST['idParticipante'],
				$_POST['idEtapa'],
				$_POST['idNivel'],
				$_POST['Nota'],
				$_POST['Observaciones'],
				$_POST['Puesto']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'La nota se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar la nueva Nota')
					);
				}
	}
	if($_POST['_metod']=='InsertAll'){
			$retorno = DB_Nota::InsertAll(
				$_POST['idNivel'],
				$_POST['idEtapa'],
				$_POST['Datos']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Las Notas se registraron de Forma Exitosa')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo registrar las notas, Verifique que todos los espacios estan completados y de forma adecuada')
					);
				}
	}
	if($_POST['_metod']=='Update'){
			$retorno = DB_Nota::Update(
				$_POST['idNota'],
				$_POST['idParticipante'],
				$_POST['idEtapa'],
				$_POST['idNivel'],
				$_POST['Nota'],
				$_POST['Observaciones'],
				$_POST['Puesto']
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
			$retorno = DB_Nota::Delete(
				$_POST['idNota']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino la Nota')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar la nota')
					);
				}
	}
}