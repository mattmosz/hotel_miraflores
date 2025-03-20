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

    public function insertar($fecha_inicio, $fecha_salida, $id_habitacion, $id_usuario)
    {
        // Calcular el número de días entre las fechas
        $fechaInicio = new DateTime($fecha_inicio);
        $fechaSalida = new DateTime($fecha_salida);
        $dias = $fechaInicio->diff($fechaSalida)->days;

        // Obtener el precio por noche de la habitación
        $queryPrecio = "SELECT precio_noche FROM habitaciones WHERE id_habitacion = ?";
        $stmtPrecio = $this->conn->prepare($queryPrecio);

        if (!$stmtPrecio) {
            error_log("Error al preparar la consulta para obtener el precio: " . $this->conn->error);
            return null;
        }

        $stmtPrecio->bind_param("i", $id_habitacion);
        $stmtPrecio->execute();
        $resultPrecio = $stmtPrecio->get_result();

        if (!$resultPrecio || $resultPrecio->num_rows === 0) {
            error_log("No se encontró el precio de la habitación.");
            return null;
        }

        $habitacion = $resultPrecio->fetch_assoc();
        $precio_noche = $habitacion['precio_noche'];

        // Calcular el total de la reserva
        $total_reserva = $precio_noche * $dias;

        // Generar número de reserva
        $numero_reserva = $this->generarNumeroReserva();

        // Insertar la reserva con estado_reserva = 1
        $query = "INSERT INTO reservas (total_reserva, numero_reserva, fecha_inicio, fecha_salida, id_habitacion, id_usuario, estado_reserva) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            error_log("Error al preparar la consulta para insertar la reserva: " . $this->conn->error);
            return null;
        }

        $estado_reserva = 1; // Estado predeterminado
        $stmt->bind_param("dsssiii", $total_reserva, $numero_reserva, $fecha_inicio, $fecha_salida, $id_habitacion, $id_usuario, $estado_reserva);

        if ($stmt->execute()) {
            return [
                'id_reserva' => $this->conn->insert_id,
                'numero_reserva' => $numero_reserva,
                'total_reserva' => $total_reserva,
                'estado_reserva' => $estado_reserva
            ];
        } else {
            error_log("Error al ejecutar la consulta para insertar la reserva: " . $stmt->error);
            return null;
        }
    }

    private function generarNumeroReserva()
    {
        return substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, 10);
    }
}
?>