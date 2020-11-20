<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Grupo
{

    public static function getAll($idOlimpiada,$idTutor,$idNivel)
    {
        $consulta = "select pp.*
        from (select g.*, COALESCE(n.c,0) as p
from Grupo g 
left join (select idgrupo, count(idestudiante) as c
    from integrante_de
    group by idGrupo) n
ON n.idgrupo=g.idgrupo) as pp
where pp.idTutor=? AND 
pp.idNivel=?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idTutor, $idNivel));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllAdmin($idNivel)
    {
        $consulta = "select z.*,t.nombre as tut from (select h.* from (select pp.*
        from (select g.*, COALESCE(n.c,0) as p
from Grupo g 
left join (select idgrupo, count(idestudiante) as c
    from integrante_de
    group by idGrupo) n
ON n.idgrupo=g.idgrupo) as pp
where pp.idNivel=? ) h where h.p>0) z, Tutor t where z.idTutor = t.idTutor";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idNivel));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllEstudiantesDeGrupo($idGrupo)
    {
        $consulta = "select e.*
            from estudiante e,integrante_de i, grupo g
            where e.idEstudiante = i.idEstudiante AND i.idGrupo=g.idGrupo and g.idGrupo=?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idGrupo));
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
    public static function getById($idGrupo)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Grupo
                             WHERE idGrupo = ?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idGrupo));
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
        $idGrupo,
        $Nombre
    )
    {
        $consulta = "UPDATE Grupo SET Nombre = ? WHERE idGrupo = ?";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                            $Nombre,
                            $idGrupo
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
        $idNivel,
        $idTutor,
        $Nombre
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Grupo ( " .
            " idNivel," .
            " idTutor," .
            " Nombre)" .
            " VALUES( ?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $idNivel,
                    $idTutor,
                    $Nombre
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
    public static function delete($idGrupo)
    {
        try {
            $comando = "DELETE FROM Grupo WHERE idGrupo=? ";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idGrupo));
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>