<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Admin      
{



    /**
     * consultar usuario por Id de Usuario
     *
     * @param $idUsuario identificador del Usuario
     * @return Usuario al que le pertenece el $IdUsuario
     */
    public static function getById($Token)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Admin
                             WHERE Token = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($Token));
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;
        } catch (PDOException $e) {
            return false;
        }
    }


    /**
     * Modificar todos los datos del usuario 
     *
     * @param $idUsuario identificador del Usuario
     * @param $UserName nombre de usuario
     * @param $pasword:contraseña del usuario
     * @param $correo electronico de autentificacion
     * @return bool Respuesta de la eliminación
     */
    public static function update(
        $idAdmin,
        $UserName,
        $Password,
        $Correo
    )
    {

        $P = encriptar($Password);
        $consulta = "UPDATE Admin SET UserName = ?, Password = ?, Correo = ? WHERE idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array($UserName, $P,$Correo,$idAdmin));
                return $cmd;
            } catch (PDOException $e) {
                
                return false;
            }
        
    }

    public static function updateToken(
        $idAdmin,
        $Token
    )
    {
        $consulta = "UPDATE Admin SET Token = ? WHERE idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                $cmd->execute(array($Token, $idAdmin));
                return $cmd;
            } catch (PDOException $e) {
                return false;
            }
        
    }



    /**
     * Verifica si el usuario y la contraseña para el inicio de sesion
     *
     * @param $idUsuario identificador del Usuario
     * @return bool Respuesta de la eliminación
     */
    public static function Login($UserName, $Password)
    {
        $resp= encriptar($Password);
        $consulta = "SELECT idAdmin, UserName, Correo from Admin where UserName = ? and Password = ?";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($UserName, $resp));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>