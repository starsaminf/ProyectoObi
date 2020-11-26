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
    public static function getAllEstudiantesDeTutor(
        $idOlimpiada,
        $idTutor
    ){
        $consulta = "select a.idEstudiante,a.rude, (a.apPaterno||' '||a.apMaterno||' '||a.Nombre) as nombre,(date_part('year',age(o.FechaLimiteEdad, a.fechaNac))::int) as edad, a.m as ngrupos
            from (select e.*,COALESCE(n.c,0) as m
            from Estudiante e
            left join (select p.idEstudiante,count(p.idgrupo) as c
                from integrante_de p
                group by p.idEstudiante
            ) n on n.idEstudiante= e.idEstudiante
            ) a, Olimpiada o
            where a.idOlimpiada = ? and a.idtutor =?
            and o.idOlimpiada=a.idOlimpiada;
        ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idOlimpiada,$idTutor));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e;
        }
    }
    public static function getAll_Por_Tutor_y_Olimpiada($idOlimpiada, $idTutor)
    {
        $consulta = "SELECT * from Estudiante where idOlimpiada= ? AND idTutor= ? ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idOlimpiada, $idTutor));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e;
        }
    }
     public static function getVerificar(
        $idOlimpiada,
        $idTutor,
        $Rude
    )
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Estudiante
                             WHERE idTutor = ? and idOlimpiada = ? and Rude =?";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idTutor, $idOlimpiada, $Rude));
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
        $Celular,
        $FechaNac,        
        $Genero,         
        $Ci,             
        $Correo 
    )
    {

        $consulta = "UPDATE Estudiante SET ";
        $consulta = $consulta ." Nombre = ?,";
        $consulta = $consulta ." ApPaterno = ?,";
        $consulta = $consulta ." ApMaterno = ?,";
        $consulta = $consulta ." Celular = ?,";
        $consulta = $consulta ." FechaNac = ?,";
        $consulta = $consulta ." Genero = ?,";
        $consulta = $consulta ." Ci = ?,";
        $consulta = $consulta ." Correo = ? ";
        $consulta = $consulta ." WHERE Rude = ?;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                
                $cmd->execute(array(
                    $Nombre,
                    $ApPaterno,
                    $ApMaterno,
                    $Celular,
                    $FechaNac,
                    $Genero,
                    $Ci,
                    $Correo,
                    $Rude));
                return $cmd;
            } catch (PDOException $e) {
                
                return false;
            }
        
    }
    public static function getById($idOlimpiada, $rude)
    {
        // Consulta de la meta
        $consulta = "select a.*
            from (select e.*,COALESCE(n.c,0) as m
            from Estudiante e
            left join (select p.rude,count(p.idgrupo) as c
                from integrante_de p, Grupo ol
                where ol.idGrupo=p.idGrupo AND ol.idOLimpiada = ?
                group by p.rude
            ) n on n.rude= e.rude
            ) a
            where a.rude = ?
";

        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idOlimpiada,$rude));
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;
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
        $Celular,
        $FechaNac,        
        $Genero,         
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
            " Celular," .
            " FechaNac," .
            " Genero," .
            " Ci," .
            " Correo)" .
            " VALUES( ?,?,?,?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $Rude,
                    $Nombre,
                    $ApPaterno,
                    $ApMaterno,      
                    $Celular,
                    $FechaNac,        
                    $Genero,         
                    $Ci,             
                    $Correo 
                )
            );
            
            return $sentencia;
        }catch (PDOException $e) {
            return false;
        }
    }

    public static function delete($idEstudiante)
    {
        try {
            $comando = "DELETE FROM Estudiante WHERE idEstudiante=?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute(array($idEstudiante));
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