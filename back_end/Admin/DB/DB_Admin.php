<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Admin      
{

    public static function getAll()
    {
        $consulta = "SELECT * from Admin";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e;
        }
    }


    /**
     * consultar usuario por Id de Usuario
     *
     * @param $idUsuario identificador del Usuario
     * @return Usuario al que le pertenece el $IdUsuario
     */
    public static function getById($idAdmin)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Admin
                             WHERE idAdmin = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idAdmin));
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
        $Password,
        $Correo
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        $P = encriptar($Password);
        // Sentencia INSERT
        $comando = "INSERT INTO Admin ( " .
            " UserName," .
            " Password," .
            " Correo)" .
            " VALUES( ?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $UserName,
                    $P,
                    $Correo
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
    public static function delete($idAdmin)
    {
        $comando = "DELETE FROM Admin WHERE idAdmin=?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($idAdmin));
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