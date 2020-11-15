<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';

class DB_Nivel
{

    public static function getAll($idOlimpiada)
    {
        $consulta = "SELECT * from Nivel where idOlimpiada = ?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idOlimpiada));
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
    public static function getById($idNivel)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Nivel
                             WHERE idNivel = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idNivel));
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
        $idNivel,
        $Nombre,
        $Descripcion,
        $LimiteEdad,
        $Tipo
    )
    {
        $consulta = "UPDATE Nivel SET Nombre = ?, Descripcion = ?,LimiteEdad = ?,Tipo = ?  WHERE idNivel = ? ;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                $cmd->execute(array($Nombre, $Descripcion, $LimiteEdad, $Tipo,$idNivel));
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
        $Descripcion,
        $LimiteEdad,
        $Tipo,
        $idOlimpiada
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Nivel ( " .
            " Nombre," .
            " Descripcion," .
            " LimiteEdad," .
            " Tipo," .
            " idOLimpiada)" .
            " VALUES( ?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Nombre,
                    $Descripcion,
                    $LimiteEdad,
                    $Tipo,
                    $idOlimpiada
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
    public static function delete($idNivel)
    {
        try {
            $comando = "DELETE FROM Nivel WHERE idNivel=?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idNivel));
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>