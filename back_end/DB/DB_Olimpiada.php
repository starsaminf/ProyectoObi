<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Olimpiada
{

    public static function getAll($idOlimpiada)
    {
        $consulta = "SELECT * from Olimpiada where idAdmin = ?";
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

    public static function getAllPublic()
    {
        $consulta = "SELECT * from Olimpiada ";
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
    public static function getById($idOLimpiada)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Olimpiada
                             WHERE idOlimpiada = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idOlimpiada));
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
        $idOLimpiada,
        $Nombre,
        $Descripcion,
        $Baner,
        $Convocatoria,
        $FechaIni,
        $FechaFin,
        $Estado,
        $idAdmin
    )
    {

        $consulta = "UPDATE Olimpiada SET Nombre = ?, Descripcion = ?, Baner = ?,Convocatoria = ?,FechaIni = ?,FechaFin= ?,Estado= ? WHERE idOLimpiada = ?  AND idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                    $Nombre,
                    $Descripcion,
                    $Baner,
                    $Convocatoria,
                    $FechaIni,
                    $FechaFin,
                    $Estado,
                    $idOlimpiada, 
                    $idAdmin
                ));
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
        $Baner,
        $Convocatoria,
        $FechaIni,
        $FechaFin,
        $Estado,
        $idAdmin
    )
    {

        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Olimpiada ( " .
            " Nombre," .
            " Descripcion," .
            " Baner," .
            " Convocatoria," .
            " FechaIni," .
            " FechaFin," .
            " Estado," .
            " idAdmin)" .
            " VALUES( ?,?,?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Nombre,
                    $Descripcion,
                    $Baner,
                    $Convocatoria,
                    $FechaIni,
                    $FechaFin,
                    $Estado,
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
    public static function delete($idOlimpiada,$idAdmin)
    {
        $comando = "DELETE FROM Olimpiada WHERE idOlimpiada=? AND idAdmin = ?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($idOlimpiada, $idAdmin));
    }
}
?>