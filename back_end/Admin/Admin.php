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
require 'Auth.php';
//SIEMPRE SERA POST
if (!empty($_POST['_metod'])$$!empty($_SERVER['HTTP_AUTHORIZATION'])) {
	try {
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
	} catch (Firebase\JWT\ExpiredException $e) {
		echo "Expiro el token";// estado 3
	} catch(Firebase\JWT\SignatureInvalidException $e){
		echo "el token no existe";// estado 4
	}catch(Firebase\JWT\BeforeValidException $e){
		echo "el token no existe2";// estado 4
	}catch(Exception $e){
		echo $e;//estado 4
	}
}