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

require 'DB/DB_Tutor.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Tutor::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
		            $datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'Error al encontrar el administrador')
					);
				}
	}
	if($_POST['_metod']=='Login'){
			$retorno = DB_Tutor::Login(
				$_POST['Correo'],
				$_POST['Password']
			);
			if($retorno) {
		        $datos["estado"] = 1;
				$datos["usuario"] = $retorno;
				print json_encode($datos);
			} else {
				print json_encode(
					array(
						'estado' => 2,
						'mensaje' => 'Nombre de usuario o contraseña incorectos')
				);
			}
	}
/*
		idTutor			SERIAL PRIMARY KEY,
	Nombre			VARCHAR(30),
	ApPaterno		VARCHAR(30),
	ApMaterno		VARCHAR(30),
	Ci 				VARCHAR(10),
	Correo 			VARCHAR(20) UNIQUE,
	Celular 		VARCHAR(10),
	Password		VARCHAR(64)
*/
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Tutor::Insert(
				$_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Ci'],
				$_POST['Correo'],
				$_POST['Celular'],
				$_POST['Password']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'El usuario se Agrego correctamente')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo agregar el nuevo usuario')
					);
				}
	}
	if($_POST['_metod']=='Update'){
			$retorno = DB_Tutor::Update(
				$_POST['idTutor'],
				$_POST['Nombre'],
				$_POST['ApPaterno'],
				$_POST['ApMaterno'],
				$_POST['Ci'],
				$_POST['Correo'],
				$_POST['Celular'],
				$_POST['Password']
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
			$retorno = DB_Tutor::Delete(
				$_POST['idTutor']
			);
			if ($retorno) {
		            print json_encode(
						array(
							'estado' => 1,
							'mensaje' => 'Se elimino el Tutor')
					);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'No se pudo Eliminar el Tutor')
					);
				}
	}
}