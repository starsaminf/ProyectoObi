<?php
require 'php_jwt/src/JWT.php';
require 'DB/Coneccion/Database.php';
class Auth
{
    private static $secret_key = 'Sdw1s9x8@';
    private static $encrypt = ['HS256'];
    private static $aud = null;
    
    public static function Login($UserName, $Password)
    {
        $resp= encriptar($Password);
        $consulta = "SELECT idAdmin, UserName, Correo from Admin where UserName = ? and Password = ?";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($UserName, $resp));
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    
    public static function SignIn($data)
    {
        $time = time();
        
        $token = array(
            'exp' => $time + (60*60),
            'aud' => self::Aud(),
            'data' => $data
        );

        return JWT::encode($token, self::$secret_key);
    }
    
    public static function Check($token)
    {
        if(empty($token))
        {
            throw new Exception("Invalid token supplied.");
        }
        
        $decode = JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        );
        
        if($decode->aud !== self::Aud())
        {
            throw new Exception("Invalid user logged in.");
        }
    }
    
    public static function GetData($token)
    {
        return JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        )->data;
    }
    public static function GetHoraExpiracion($token)
    {
        $segundos = (JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        )->exp-time());

        return floor(($segundos / 60) % 60);
    }
    
    private static function Aud()
    {
        $aud = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
        
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        
        return sha1($aud);
    }
}