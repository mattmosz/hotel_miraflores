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

    public function getTotalHabitaciones() {
        $query = "SELECT COUNT(*) as total FROM habitaciones";
        $result = mysqli_query($this->conn, $query);
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            return $row['total'];
        } else {
            return 0; // En caso de error, devolver 0
        }
    }
}
?>