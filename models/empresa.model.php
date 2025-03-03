<?php

require_once __DIR__ . '/../config/Conexion.php';

class EmpresaModel
{
    private $conn;

    public function __construct()
    {
        $this->conn = Conexion::conectar();
    }

    public function todos()
    {
        $query = "SELECT * FROM empresa";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }
}
?>