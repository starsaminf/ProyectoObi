<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
namespace Firebase\JWT;
class JWTError      
{
	public static function InvalidArgumentException($mensaje)
    {
        $datos["error"] 	= 1;
        $datos["tipo"] 		= "InvalidArgumentException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }
    public static function UnexpectedValueException($mensaje)
    {
        $datos["error"] 	= 2;
        $datos["tipo"] 		= "UnexpectedValueException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }
    public static function SignatureInvalidException($mensaje)
    {
        $datos["error"] 	= 3;
        $datos["tipo"] 		= "SignatureInvalidException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }

    public static function BeforeValidException($mensaje)
    {
        $datos["error"] 	= 4;
        $datos["tipo"] 		= "BeforeValidException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }

    public static function ExpiredException($mensaje)
    {
        $datos["error"] 	= 5;
        $datos["tipo"] 		= "ExpiredException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }

    public static function DomainException($mensaje)
    {
        $datos["error"] 	= 6;
        $datos["tipo"] 		= "DomainException";
		$datos["mensaje"] 	= $mensaje;
		print json_encode($datos);
    }

}
?>