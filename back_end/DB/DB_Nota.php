<?php
/**
 * Representa el la estructura de los Usuarios
 * almacenados en la base de datos
 */
require 'Coneccion/Database.php';
require 'Coneccion/cripto.php';
class DB_Nota
{

    public static function getAll($idParticipante, $idEtapa, $idNivel)
    {
        $consulta = "SELECT idNota, Nota, Observaciones, Puesto from Nota where idParticipante = ? and idEtapa = ? AND idNivel = ?";
        try {
            // Preparar sentencia
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            // Ejecutar sentencia preparada
            $comando->execute(array($idParticipante, $idEtapa, $idNivel));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

        public static function getAllporGrupo($idGrupo)
    {
        $consulta = "SELECT * from nota where idGrupo=?";
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
    public static function getById($idGrupo,$idEtapa)
    {
        // Consulta de la meta
        $consulta = "SELECT *
                             FROM Nota
                             WHERE idGrupo = ? AND idEtapa= ?";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($idGrupo,$idEtapa));
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
         /*

    idNota          SERIAL PRIMARY KEY,
    idParticipante  SERIAL NOT NULL,
    idEtapa         SERIAL NOT NULL,
    idNivel         SERIAL NOT NULL,
    Nota            DOUBLE  PRECISION,
    Observaciones   VARCHAR(30),
    Puesto          INTEGER,
*/
    public static function update(
        $idNota,
        $idParticipante,
        $idEtapa,
        $idNivel,
        $Nota,
        $Observaciones,
        $Puesto
    )
    {
        $consulta = "UPDATE Nota SET idParticipante = ?, idEtapa = ?, idNivel = ?, Nota = ?, Observaciones = ?, Puesto = ?  WHERE idNota = ? ;";
            $cmd = Database::getInstance()->getDb()->prepare($consulta);
            try {
                $cmd->execute(array(
                    $idParticipante,
                    $idEtapa,
                    $idNivel,
                    $Nota,
                    $Observaciones,
                    $Puesto,
                    $idNota
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
        $idParticipante,
        $idEtapa,
        $idNivel,
        $Nota,
        $Observaciones,
        $Puesto
    )
    {
        //encriptamos la contraseña para guardar en la base de datos
        //$pasword = substr( md5(microtime()), 1, 20);
        // Sentencia INSERT
        $comando = "INSERT INTO Nota ( " .
            " idParticipante," .
            " idEtapa," .
            " idNivel," .
            " Nota," .
            " Observaciones," .
            " Puesto)" .
            " VALUES( ?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        try{
            $sentencia->execute(
                array(
                    $idParticipante,
                    $idEtapa,
                    $idNivel,
                    $Nota,
                    $Observaciones,
                    $Puesto
                )
            );
            
            return $sentencia;
        }catch (PDOException $e) {
            return false;
        }
    }
    public static function InsertAll(
        $idNivel,
        $idEtapa,
        $datos
    ){
         try {
            $comando = "DELETE FROM Nota WHERE idEtapa=? AND idNivel = ?";
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            $sentencia->execute(array($idEtapa, $idNivel));
            $pieces = explode(";", $datos);
            //recorremos el vector
             $comando = "INSERT INTO Nota ( " .
            " idEtapa," .
            " idNivel," .
            " idGrupo," .
            " puesto," .
            " estado," .
            " Observaciones)" .
            " VALUES";
            $sw=1;
            foreach ($pieces as $valor){
                $pieces2 = explode(",", $valor);
                
                if($sw==1){
                    
                    
                }else{
                    
                    if($sw==2){
                        if(count($pieces2)==4)
                        $comando = $comando . "(".$idEtapa.",".$idNivel.",".$pieces2[0].",".$pieces2[1].",'".$pieces2[2]."','".$pieces2[3]."')";
                    }else{
                        if(count($pieces2)==4)
                            $comando = $comando . ",(".$idEtapa.",".$idNivel.",".$pieces2[0].",".$pieces2[1].",'".$pieces2[2]."','".$pieces2[3]."')";
                    }
                    
                }
                $sw=$sw+1;

            }
            $sentencia = Database::getInstance()->getDb()->prepare($comando);
            return $sentencia->execute();
            
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Eliminar el punto con el identificador especificado
     *
     * @param $idPunto identificador del Punto
     * @return bool Respuesta de la eliminación
     */
}
?>