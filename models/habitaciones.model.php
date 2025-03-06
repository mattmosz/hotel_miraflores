<?php

require_once __DIR__ . '/../config/Conexion.php'; 

class HabitacionesModel {
    private $conn;

    public function __construct() {
        $this->conn = Conexion::conectar();
    }

    public function todos() {
        $query = "SELECT * FROM habitaciones";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }

    public function uno($id) {
        $query = "SELECT * FROM habitaciones WHERE id_habitacion = $id";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }
}
?>