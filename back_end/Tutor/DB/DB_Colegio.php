<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Colegio
{

    public static function getAll()
    {
        $consulta = "select c.*, d.nombre as nd, d.departamento as dd from Colegio c, Distrito d where c.idDistrito = d.idDistrito order by c.Sie desc";
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
    public static function getAllSimple()
    {
        $consulta = "select c.sie,(c.nombre||'('||d.nombre ||'-'|| d.departamento||')') as nombre from Colegio  c, Distrito d where c.idDistrito = d.idDistrito";
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
    public static function getAllDistrito($idDistrito)
    {
        $consulta = "SELECT * from Colegio where idDistrito = ?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idDistrito));
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
    public static function getById($Sie)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Colegio
                             WHERE Sie = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($Sie));
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
        $Sie,
        $Nombre,
        $Zona,
        $Direccion,
        $idDistrito
    )
    {
        $consulta = "UPDATE Colegio SET Nombre = ?, Zona = ?, Direccion = ?,idDistrito = ?  WHERE Sie = ? ";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                            $Nombre,
                            $Zona,
                            $Direccion,
                            $idDistrito,
                            $Sie
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
        $Sie,
        $Nombre,
        $Zona,
        $Direccion,
        $idDistrito
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Colegio ( " .
            " Sie," .
            " Nombre," .
            " Zona," .
            " Direccion," .
            " idDistrito)" .
            " VALUES( ?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Sie,
                    $Nombre,
                    $Zona,
                    $Direccion,
                    $idDistrito
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
    public static function delete($Sie)
    {
        try {
            $comando = "DELETE FROM Colegio WHERE Sie=? ";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idSie));
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>