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

    public function uno($id)
    {
        $query = "SELECT * FROM reservas WHERE id = $id";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }

    public function disponibilidad($fecha_inicio, $fecha_salida, $id_habitacion) {
        $query = "SELECT * FROM reservas WHERE (fecha_inicio BETWEEN ? AND ? OR fecha_salida BETWEEN ? AND ?) AND id_habitacion = ?";
        $stmt = $this->conn->prepare($query);
    
        if (!$stmt) {
            error_log("Error al preparar la consulta: " . $this->conn->error);
            return null;
        }
    
        $stmt->bind_param("ssssi", $fecha_inicio, $fecha_salida, $fecha_inicio, $fecha_salida, $id_habitacion);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if (!$result) {
            error_log("Error al ejecutar la consulta: " . $stmt->error);
            return null;
        }
    
        return $result;
    }
}
?>