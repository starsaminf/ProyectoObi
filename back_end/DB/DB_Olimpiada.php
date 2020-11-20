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
        date_default_timezone_set('America/La_Paz');
        $Fecha = date('Y/m/d h:i:s a', time());

        $consulta = "SELECT idOlimpiada,nombre,descripcion,FechaIni,FechaFin,FechaLimiteEdad, case  when (fechaIni <= ? and fechaFin >= ?) then 'En Curso'
                when (fechaIni > ?) then 'falta para enpezar'
                when (fechaFin < ?) then 'termino'
                else 'En Planificacion'
            End  as estado from Olimpiada ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($Fecha, $Fecha, $Fecha, $Fecha));
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
    public static function getById($idOlimpiada)
    {
        // Consulta de la meta
        $consulta = "select o.*, p.n
from olimpiada o, (SELECT o.idolimpiada, count(etapa.idetapa) AS n
FROM Olimpiada o 
LEFT JOIN etapa ON(etapa.idolimpiada = o.idolimpiada)
GROUP BY o.idolimpiada) p
where o.idolimpiada = p.idolimpiada and o.idolimpiada=?";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idOlimpiada));
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;
        } catch (PDOException $e) {
            return $e;
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
        $idOlimpiada,
        $Nombre,
        $Baner,
        $Descripcion,
        $Convocatoria,
        $FechaIni,
        $FechaFin,
        $FechaLimiteEdad,
        $Estado,
        $idAdmin
    )
    {

        $consulta = "UPDATE Olimpiada SET Nombre = ?, Descripcion = ?, Baner = ?,Convocatoria = ?,FechaIni = ?,FechaFin= ?,FechaLimiteEdad= ?,Estado= ? WHERE idOlimpiada = ?  AND idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                    $Nombre,
                    $Descripcion,
                    $Baner,
                    $Convocatoria,
                    $FechaIni,
                    $FechaFin,
                    $FechaLimiteEdad,
                    $Estado,
                    $idOlimpiada, 
                    $idAdmin
                ));
                return $cmd;
            } catch (PDOException $e) {
                
                return false;
            }
        
    }
    public static function updateSimple(
        $idOlimpiada,
        $Nombre,
        $Descripcion,
        $idAdmin
    )
    {

        $consulta = "UPDATE Olimpiada SET Nombre = ?, Descripcion = ? WHERE idOlimpiada = ?  AND idAdmin = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                    $Nombre,
                    $Descripcion,
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
            " Estado," .
            " idAdmin)" .
            " VALUES( ?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Nombre,
                    $Descripcion,
                    $Estado,
                    $idAdmin
                )
            );
            
            return $sentencia;
        }catch (PDOException $e) {
            return false;
        }
    }
    public static function CrearEtapas(
        $idOlimpiada
    ){
        $comando = "INSERT INTO Etapa(Nombre, idOlimpiada) VALUES ('Etapa 1: Inscripciones',?);";
        /*INSERT INTO Etapa(Nombre, idOlimpiada) VALUES ('Etapa 2: Distrital',?);
        INSERT INTO Etapa(Nombre, idOlimpiada) VALUES ('Etapa 3: Departamental',?);
        INSERT INTO Etapa(Nombre, idOlimpiada) VALUES ('Etapa 4: Nacional',?);"*/
        try{
            $comando = "INSERT INTO Etapa(Nombre, idOlimpiada, tipo) VALUES ('Etapa 1: Inscripciones',?,'1');";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            $sentencia->execute(array($idOlimpiada));

            $comando = "INSERT INTO Etapa(Nombre, idOlimpiada, tipo) VALUES ('Etapa 2: Distrital',?,'2');";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            $sentencia->execute(array($idOlimpiada));

            $comando = "INSERT INTO Etapa(Nombre, idOlimpiada, tipo) VALUES ('Etapa 3: Departamental',?,'3');";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            $sentencia->execute(array($idOlimpiada));

            $comando = "INSERT INTO Etapa(Nombre, idOlimpiada, tipo) VALUES ('Etapa 4: Nacional',?,'4');";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            $sentencia->execute(array($idOlimpiada));
            return true;
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
        try{
            $comando = "DELETE FROM Olimpiada WHERE idOlimpiada=? AND idAdmin = ?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idOlimpiada, $idAdmin));
        }catch (PDOException $e) {
            return false;
        }
    }
}
?>