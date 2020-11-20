<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';

class DB_Etapa
{

    public static function getAll($idOlimpiada)
    {
        $consulta = "SELECT * from Etapa where idOlimpiada = ?  order by tipo";
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
    public static function getAllTutor($idOlimpiada){
        date_default_timezone_set('America/La_Paz');
        $Fecha = date('Y/m/d h:i:s a', time());
        $consulta = "SELECT * , case  when (fechaIni <= ? and fechaFin >= ?) then '2'
                when (fechaIni > ?) then '1'
                when (fechaFin < ?) then '3'
                else '4'
            End  as es from Etapa where idOlimpiada = ?  order by tipo";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($Fecha,$Fecha,$Fecha,$Fecha,$idOlimpiada));
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
    public static function getById($idEtapa,$idOlimpiada)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Etapa
                             WHERE idEtapa = ? and idOlimpiada = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idEtapa, $idOlimpiada));
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
        $idEtapa,
        $Nombre,
        $Descripcion,
        $FechaIni,
        $FechaFin
    )
    {
        $consulta = "UPDATE Etapa SET Nombre = ?, Descripcion = ?, FechaIni = ?, FechaFin = ? WHERE idEtapa = ? ;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                $cmd->execute(array(
                    $Nombre,
                    $Descripcion,
                    $FechaIni,
                    $FechaFin,
                    $idEtapa
                ));
                return $cmd;
            } catch (PDOException $e) {
                
                return $e;
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
        $FechaIni,
        $FechaFin,
        $Tipo,
        $idOlimpiada
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Etapa ( " .
            " Nombre," .
            " Descripcion," .
            " FechaIni," .
            " FechaFin," .
            " Tipo," .
            " idOLimpiada)" .
            " VALUES( ?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Nombre,
                    $Descripcion,
                    $FechaIni,
                    $FechaFin,
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
    public static function delete($idEtapa)
    {
        try {
            $comando = "DELETE FROM Etapa WHERE idEtapa=?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idEtapa));
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>