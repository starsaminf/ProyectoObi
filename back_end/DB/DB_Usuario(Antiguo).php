<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Usuario
{

    public static function getAll()
    {
        $consulta = "SELECT * from Usuario";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }


    /**
     * consultar usuario por Id de Usuario
     *
     * @param $idUsuario identificador del Usuario
     * @return Usuario al que le pertenece el $IdUsuario
     */
    public static function getById($idUsuario)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Usuario
                             WHERE idUsuario = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idUsuario));
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
        $idUsuario,
        $UserName,
        $Password,
        $Correo
    )
    {
        $consulta = "UPDATE usuario SET UserName = ?, Pasword = ?, Correo = ? WHERE idUsuario = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array($UserName, $Password,$Correo,$idUsuario));
                return $cmd;
            } catch (PDOException $e) {
                
                return false;
            }
        
    }

    /**
     * Inserta un nuevo usuario
     *
     * @param $UserName identificador del nombre de usuario
     * @param $Pasword identificador de la ontraseña del usuario
     * @param $Correo identificador del correo del usuario
     * @return bool Respuesta de la eliminación
     */
    public static function insert(
        $UserName,
        $Pasword,
        $Correo
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        $P = encriptar($Pasword);
        // Sentencia INSERT
        $comando = "INSERT INTO usuario ( " .
            " UserName," .
            " Pasword," .
            " Correo," .
            " usuarioautentificado)" .
            " VALUES( ?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $UserName,
                    $P,
                    $Correo,
                    "false"
                )
            );
            
            return $sentencia;
        }catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Eliminar el punto con el identificador especificado
     *
     * @param $idPunto identificador del Punto
     * @return bool Respuesta de la eliminación
     */
    public static function delete($idUsuario)
    {
        $comando = "DELETE FROM Usuario WHERE idUsuario=?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($idUsuario));
    }

    /**
     * Verifica si el usuario y la contraseña para el inicio de sesion
     *
     * @param $idUsuario identificador del Usuario
     * @return bool Respuesta de la eliminación
     */
    public static function Login($usuario, $pasword)
    {
        $resp= encriptar($pasword);
        $consulta = "SELECT idUsuario, UserName, Correo, UsuarioAutentificado, token from Usuario where Username = ? and Pasword = ?";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($usuario, $resp));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>