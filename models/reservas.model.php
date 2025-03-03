<?php

require_once __DIR__ . '/../config/Conexion.php';

class ReservasModel
{
    private $conn;

    public function __construct()
    {
        $this->conn = Conexion::conectar();
    }

    public function todos()
    {
        $query = "SELECT * FROM reservas";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }
}
?>