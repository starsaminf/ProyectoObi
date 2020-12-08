<?php
	error_reporting(E_ALL);
  	ini_set('display_errors', true);

require 'DB/DB_Admin.php';
require 'Auth.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if( $_SERVER['REQUEST_METHOD']==='POST' && empty($_POST) ) {
	if(!empty($_SERVER['HTTP_AUTHORIZATION'])){
		$token = $_SERVER['HTTP_AUTHORIZATION'];
		try {
			/*$token = Auth::SignIn([
		        'idAdmin' 		=> 	1,
		        'puesto' 	=> 'ADMIN',
		        'T'			=> '1234567'
		    ]);
			echo $token;
			echo"\n";
			echo Auth::Check($token);
			echo "<br/>";
			if(Auth::Check($token)){
				echo "nop";
			}else{
				echo "seee";
			}*/
			$data = Auth::GetData($token);
			$decoded_array = (array) $data;
			$minutos = Auth::GetHoraExpiracion($token);
			echo "Vida del token :\n".$minutos."\n";
			if($minutos <=40){
				echo "el token expirara en ".$minutos;
			}
			//echo "Decode:\n" . print_r($decoded_array, true) . "\n";
	        /*if(!empty($decoded_array['idAdmin'])){
	            echo "existe";
	        }else{
	            echo "no existe";
	        }*/
		} catch (Firebase\JWT\ExpiredException $e) {
			echo "Expiro el token";// estado 3
		} catch(Firebase\JWT\SignatureInvalidException $e){
			echo "el token no existe";// estado 4
		}catch(Firebase\JWT\BeforeValidException $e){
			echo "el token no existe2";// estado 4
		}catch(Firebase\JWT\DomainException $e){
			echo "el token no existe2";// estado 4
		}catch(Exception $e){
			echo $e;//estado 4
		}

	}else{
		if (!empty($_POST['_metod'])) {
			if($_POST['_metod']=='Login'){
				$retorno = DB_Admin::Login(
					$_POST['UserName'],
					$_POST['Password']
				);
				if($retorno) {

					$array = (array)$retorno;
					$token = Auth::SignIn([
				        'idAdmin' 		=> 	$array['idadmin'],
				        'puesto' 	=> 'ADMIN',
				        'T'			=> '1234567'
				    ]);

			        $datos["estado"] 	= 1;
					$datos["usuario"] 	= $retorno;
					$datos["token"] 	= $token;
					print json_encode($datos);
				} else {
					print json_encode(
						array(
							'estado' => 2,
							'mensaje' => 'Nombre de usuario o contraseña incorectos')
					);
				}
			}
		}
		//unica Opcion Inciar Sesion
	}
}
else{

}