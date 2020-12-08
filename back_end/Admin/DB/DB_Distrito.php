<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Distrito
{

    public static function getAll()
    {
        $consulta = "select * from Distrito order by idDistrito desc";
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
    public static function getById($idDistrito)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Distrito
                             WHERE idDistrito = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idDistrito));
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
        $idDistrito,
        $Nombre,
        $Departamento,
        $idAdmin
    )
    {
        $consulta = "UPDATE Distrito SET Nombre = ?, Departamento = ?  WHERE idDistrito = ?  AND idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array($Nombre, $Departamento, $idDistrito, $idAdmin));
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
        $Nombre,
        $Departamento,
        $idAdmin
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Distrito ( " .
            " Nombre," .
            " Departamento," .
            " idAdmin)" .
            " VALUES( ?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Nombre,
                    $Departamento,
                    $idAdmin
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
    public static function delete($idDistrito,$idAdmin)
    {
        try{
            $comando = "DELETE FROM Distrito WHERE idDistrito=? AND idAdmin = ?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idDistrito, $idAdmin));
        }catch(PDOException $e){
            return false;
        }
        
    }
}
?>