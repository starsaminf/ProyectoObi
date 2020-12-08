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

require 'DB/DB_Estudiante.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Estudiante::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay Estudiantes que mostrar')
					);
				}
	}if($_POST['_metod']=='getAllEstudiantesDeTutor'){
			$retorno = DB_Estudiante::getAllEstudiantesDeTutor(
				$_POST['idOlimpiada'],
				$_POST['idTutor']
			);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay Estudiantes que mostrar')
					);
				}
	}
	if($_POST['_metod']=='getAllEstudiantesDeOlimpiada'){
			$retorno = DB_Estudiante::getAllEstudiantesDeOlimpiada(
				$_POST['idOlimpiada']
			);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay Estudiantes que mostrar')
					);
				}
	}
	if($_POST['_metod']=='getAll_Por_Tutor_y_Olimpiada'){
			$retorno = DB_Estudiante::getAll_Por_Tutor_y_Olimpiada($_POST['idOlimpiada'], $_POST['idTutor']);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay Estudiantes que mostrar')
					);
				}
	}
	if($_POST['_metod']=='getVerificar'){
			$retorno = DB_Estudiante::getVerificar($_POST['idOlimpiada'], $_POST['idTutor'], $_POST['Rude']);
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'no hay Estudiantes que mostrar')
					);
				}
	}
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Estudiante::Insert(
				$_POST['Rude'],
				$_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Celular'],
				$_POST['FechaNac'],
				$_POST['Genero'],
				$_POST['Ci'],
				$_POST['Correo']

			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'El estudiante se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo registrar el Estudiante')
					);
				}
	}
	if($_POST['_metod']=='Update'){
			$retorno = DB_Estudiante::Update(
				$_POST['Rude'],
				$_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Celular'],
				$_POST['FechaNac'],
				$_POST['Genero'],
				$_POST['Ci'],
				$_POST['Correo']
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
			$retorno = DB_Estudiante::getById(
				$_POST['idOlimpiada'],
				$_POST['Rude']
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
							'mensaje' => 'No se Encontrol al Estudiante')
					);
				}
	}
	if($_POST['_metod']=='Delete'){
			$retorno = DB_Estudiante::Delete(
				$_POST['idEstudiante']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el Estudiante')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar el Estudiante')
					);
				}
	}
}