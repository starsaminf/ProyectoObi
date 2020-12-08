<?php

require 'Auth.php';
require 'php_jwt/src/ExpiredException.php';


        $token = Auth::SignIn([
        'idAdmin' 		=> 	1,
        'puesto' 	=> 'Eduardo',
        'hora'		=>	time()
    ]);

        echo  $token."<br/>";
    	try {
    		$data = Auth::GetData($token);
    		
            $decoded_array = (array) $data;
            if(!empty($decoded_array['idAdmin'])){
                echo "existe";
            }else{
                echo "no existe";
            }
			//echo "Decode:\n" . print_r($decoded_array['id'], true) . "\n";	
    	} catch (\Firebase\JWT\ExpiredException $e) {
    		echo "Error en el Login";
    	}

?>