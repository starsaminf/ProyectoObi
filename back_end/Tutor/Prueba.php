<?php
	error_reporting(E_ALL);
  	ini_set('display_errors', true);

require 'Auth.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
if( $_SERVER['REQUEST_METHOD']==='POST' && empty($_POST) && !empty($_SERVER['HTTP_AUTHORIZATION'])) {
	$token = $_SERVER['HTTP_AUTHORIZATION'];
	
	if(Verificar($token)){
		echo $token;
		$_POST = json_decode(file_get_contents('php://input'),true); 
	}else{
		echo "Token no valido";
		//token no valido
	}
}
else{
	echo "NO tiene token";
	//no tiene token
}

