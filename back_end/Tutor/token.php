<?php

require 'Auth.php';


        $token = Auth::SignIn([
        'id' 		=> 	1,
        'puesto' 	=> 'Eduardo',
        'hora'		=>	time()
    ]);

        echo  $token."<br/>";
        $token2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDczMjI5NzEsImF1ZCI6IjIwNGY0NzhhYWFkN2YzZjcwMjQzNjdmsdsdzk2MWRlZTBlOGY5NGIxYjkiLCJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRWR1YXJkbyJ9fQ.BKcyjHc8IccEtpb8e8_Wqk4opFkIvgotpe6XobDR7_Q";
    	
    	try {
    		$data = Auth::GetData($token);
    		$decoded_array = (array) $data;
			echo "Decode:\n" . print_r($decoded_array['id'], true) . "\n";	
    	} catch (Exception $e) {
    		echo "Error en el Login";
    	}

?>