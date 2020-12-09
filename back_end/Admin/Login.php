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
if (!empty($_POST['_metod'])) {
	if($_POST['_metod']=='Login'){
			$retorno = DB_Admin::Login(
				$_POST['UserName'],
				$_POST['Password']
			);
			if($retorno) {
				$token = Auth::SignIn([
			        'idAdmin' 		=> 	$retorno[0]['idadmin'],
			        'puesto' 		=> 'ADMIN',
			        'T'				=> 'asdfgsdg'
			    ]);
				$retorno2 = DB_Admin::updateToken(
					$retorno[0]['idadmin'],
					$token
				);
				if($retorno2){
					$datos["estado"] 	= 1;
					$datos["Token"] 	= $token;
					$datos["val"] 		= $retorno[0];
					print json_encode($datos);
				}else{
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'Nombre de usuario o contraseña incorectoooos')
					);
				}
			} else {
				print json_encode(
					array(
						'estado' => 2,
						'mensaje' => 'Nombre de usuario o contraseña incorectos')
				);
			}
	}
}