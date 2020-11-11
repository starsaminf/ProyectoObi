<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Estudiante
{

    public static function getAll()
    {
        $consulta = "SELECT * from Estudiante";
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
    public static function getById($Rude)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Estudiante
                             WHERE Rude = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idEstudiante));
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
        $Rude,
        $Nombre,
        $ApPaterno,
        $ApMaterno,
        $Genero,
        $FechaNac,
        $Ci,
        $Correo
    )
    {
        $consulta = "UPDATE Estudiante SET Nombre = ?, ApPaterno = ?, ApMaterno = ?,Genero = ?,FechaNac = ?, Ci = ?,Correo = ? WHERE Rude = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                    $Nombre,
                    $ApPaterno,
                    $ApMaterno,
                    $Genero,
                    $FechaNac,
                    $Ci,
                    $Correo,
                    $Rude));
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
        $Rude,
        $Nombre,
        $ApPaterno,
        $ApMaterno,
        $Genero,
        $FechaNac,
        $Ci,
        $Correo
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);

        // Sentencia INSERT
        $comando = "INSERT INTO Estudiante ( " .
            " Rude," .
            " Nombre," .
            " ApPaterno," .
            " ApMaterno," .
            " Genero," .
            " FechaNac," .
            " Ci," .
            " Correo)" .
            " VALUES( ?,?,?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Rude,
                    $Nombre,
                    $ApPaterno,
                    $ApMaterno,
                    $Genero,
                    $FechaNac,
                    $Ci,
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
    public static function delete($Rude)
    {
        try {
            $comando = "DELETE FROM Estudiante WHERE Rude=?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($Rude));
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
}
?>