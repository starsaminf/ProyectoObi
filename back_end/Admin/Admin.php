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

require 'DB/DB_Admin.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='getAll'){
			$retorno = DB_Admin::getAll();
			if ($retorno) {
		            $datos["estado"] = 1;
					$datos["val"] = $retorno;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'retorno' => $retorno,
							'mensaje' => 'Error al encontrar el administrador')
					);
				}
	}
	if($_POST['_metod']=='Login'){
			$retorno = DB_Admin::Login(
				$_POST['UserName'],
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
	if($_POST['_metod']=='Insert'){
			$retorno = DB_Admin::Insert(
				$_POST['UserName'],
				$_POST['Password'],
				$_POST['Correo']
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
			$retorno = DB_Admin::Update(
				$_POST['idAdmin'],
				$_POST['UserName'],
				$_POST['Password'],
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
}