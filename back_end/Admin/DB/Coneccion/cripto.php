<?php

  function encriptar($texto){
    $cadena="";
      for($i=0;$i<strlen($texto);$i++)
    {           
      if(is_numeric($texto[$i]))
        $cadena = $cadena.(((int)($texto[$i]+1))%10);
      else
        $cadena = $cadena.$texto[$i];
    }
      return $cadena;
  };
  function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  } 
?>