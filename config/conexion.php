<?php

class Conexion {
    public static function conectar() {
        $host = 'localhost';
        $user = 'root';
        $password = '';
        $database = 'reservas_hotel';

        $conn = mysqli_connect($host, $user, $password, $database);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        return $conn;
    }
}
?>