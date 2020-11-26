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
        $consulta = "select pp.*, col.nombre as nombre_col
        from (select g.*, COALESCE(n.c,0) as p
from Grupo g 
left join (select idgrupo, count(rude) as c
    from integrante_de
    group by idGrupo) n
ON n.idgrupo=g.idgrupo) as pp , Colegio col
where pp.idTutor=? AND 
pp.idNivel=? AND pp.idOlimpiada= ?   AND col.sie=pp.sie";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idTutor, $idNivel, $idOlimpiada));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllAdmin($idNivel)
    {
        $consulta = "select pp.*, col.nombre as nombre_col from (select z.*,t.nombre as tut from (select h.* from (select pp.*
        from (select g.*, COALESCE(n.c,0) as p
from Grupo g 
left join (select idgrupo, count(rude) as c
    from integrante_de
    group by idGrupo) n
ON n.idgrupo=g.idgrupo) as pp
where pp.idNivel=? ) h where h.p>0) z, Tutor t where z.idTutor = t.idTutor) pp, colegio col
where pp.Sie=col.Sie
ORDER BY pp.idGrupo";
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
    public static function getGrupoConNotas($idNivel, $idEtapa){
        $consulta="
select pp.*, COALESCE(n.puesto, 0) as puesto,COALESCE(n.estado, '')as estado ,COALESCE(n.observaciones, '') as observaciones
from (
select g.idGrupo, g.nombre ,c.nombre as col
from Grupo g, Colegio c
where g.sie = c.sie AND
g.idGrupo IN (
    select h.idGrupo
    from (
    select gg.idGrupo,count(i.rude) as n
    from  Grupo gg ,Integrante_de i
    where i.idGrupo = gg.idGrupo and gg.idNivel = ?
    group by gg.idGrupo) h
    where h.n>=1 
)) pp
LEFT JOIN (
SELECT *
FROM Nota 
WHERE idetapa=?
)n ON (pp.idGrupo = n.idGrupo)
        ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idNivel,$idEtapa));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getGrupoConNotasCondicionado($idNivel, $idEtapa){
        $consulta="select pepillo.*
from (select pp.*, COALESCE(n.puesto, 0) as puesto,COALESCE(n.estado, '')as estado ,COALESCE(n.observaciones, '') as observaciones
from (
select g.idGrupo, g.nombre ,c.nombre as col
from Grupo g, Colegio c
where g.sie = c.sie AND
g.idGrupo IN (
    select h.idGrupo
    from (
    select gg.idGrupo,count(i.rude) as n
    from  Grupo gg ,Integrante_de i
    where i.idGrupo = gg.idGrupo and gg.idNivel = ?
    group by gg.idGrupo) h
    where h.n>=1 
)) pp
LEFT JOIN (
SELECT *
FROM Nota 
WHERE idetapa=?
)n ON (pp.idGrupo = n.idGrupo)) pepillo
where pepillo.idgrupo in ( select x.idGrupo from nota x where x.idEtapa =? and x.estado = 'Aprobado')
        ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idNivel,$idEtapa,($idEtapa-1)));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
    public static function getGrupoConNotasCondicionadoTutor($idTutor,$idNivel, $idEtapa){
        $consulta="select pepillo.*
from (select pp.*, COALESCE(n.puesto, 0) as puesto,COALESCE(n.estado, '')as estado ,COALESCE(n.observaciones, '') as observaciones
from (
select g.idGrupo, g.nombre ,c.nombre as col
from Grupo g, Colegio c
where g.sie = c.sie AND
g.idGrupo IN (
    select h.idGrupo
    from (
    select gg.idGrupo,count(i.rude) as n
    from  Grupo gg ,Integrante_de i
    where i.idGrupo = gg.idGrupo and gg.idNivel = ? and gg.idTutor = ?
    group by gg.idGrupo) h
    where h.n>=1 
)) pp
LEFT JOIN (
SELECT *
FROM Nota 
WHERE idetapa=?
)n ON (pp.idGrupo = n.idGrupo)) pepillo
where pepillo.idgrupo in ( select x.idGrupo from nota x where x.idEtapa =? and x.estado = 'Aprobado')
        ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idNivel,$idTutor, $idEtapa,($idEtapa-1)));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e;
        }
    }

    public static function getAllEstudiantesDeGrupo($idGrupo)
    {
        $consulta = "select e.*
            from estudiante e,integrante_de i, grupo g
            where e.rude = i.rude AND i.idGrupo=g.idGrupo and g.idGrupo=?";
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

    public static function getAprobadosPorEtapa($idNivel, $idEtapa)
    {
        $consulta = "select g.*,t.nombre as tut, c.nombre as nombre_col,c.sie
        from Grupo g, Nota n, Tutor t ,colegio c
        where g.idGrupo = n.idGrupo and n.idNivel= ? and n.idEtapa = ? and n.estado = 'Aprobado' and g.idTutor = t.idTutor and c.sie=g.sie
        ";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idNivel, $idEtapa));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e;
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
        $idOlimpiada,
        $Nombre,
        $Sie
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Grupo ( " .
            " idNivel," .
            " idTutor," .
            " idOlimpiada," .
            " Nombre," .
            " Sie)" .
            " VALUES( ?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $idNivel,
                    $idTutor,
                    $idOlimpiada,
                    $Nombre,
                    $Sie
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