<?php
/**
 * Usuamos para encriptar  y desencriptar valores
 * para mayor seguridad.
 */
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
?>