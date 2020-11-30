<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_MaterialdeApoyo
{

    public static function getAll($idAdmin)
    {
        $consulta = "SELECT * from MaterialdeApoyo where idAdmin = ?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idAdmin));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
    public static function getAllPublico()
    {
        $consulta = "SELECT * from MaterialdeApoyo";
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
    public static function getAllPublic()
    {
        $consulta = "SELECT * from MaterialdeApoyo ";
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
    public static function getById($idMaterialdeApoyo)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM MaterialdeApoyo
                             WHERE idMaterial = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idMaterialdeApoyo));
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
        $idMaterialdeApoyo,
        $Titulo,
        $SubTitulo,
        $Tipo,
        $Archivo,
        $idAdmin
    )
    {

        $consulta = "UPDATE MaterialdeApoyo SET Titulo = ?, SubTitulo = ?, Tipo = ?, Archivo=?  WHERE idMaterial = ?  AND idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                $cmd->execute(array($Titulo, $SubTitulo, $Tipo, $Archivo, $idMaterialdeApoyo, $idAdmin));
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
        $Titulo,
        $SubTitulo,
        $Tipo,
        $Archivo,
        $idAdmin
    )
    {
        date_default_timezone_set('America/La_Paz');
        $Fecha = date('Y/m/d h:i:s a', time());
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO MaterialdeApoyo ( " .
            " Titulo," .
            " SubTitulo," .
            " Tipo," .
            " Archivo," .
            " Fecha," .
            " idAdmin)" .
            " VALUES( ?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Titulo,
                    $SubTitulo,
                    $Tipo,
                    $Archivo,
                    $Fecha,
                    $idAdmin
                )
            );
            
            return $sentencia;
        }catch (PDOException $e) {
            return $e;
        }
    }

    /**
     * Eliminar el punto con el identificador especificado
     *
     * @param $idPunto identificador del Punto
     * @return bool Respuesta de la eliminación
     */
    public static function delete($idMaterialdeApoyo,$idAdmin)
    {
        try {
            $comando = "DELETE FROM MaterialdeApoyo WHERE idMaterial=? AND idAdmin = ?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idMaterialdeApoyo, $idAdmin));
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>