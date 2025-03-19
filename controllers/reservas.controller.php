<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

require_once __DIR__ . '/../models/reservas.model.php'; 
error_reporting(0);
$reservas = new ReservasModel();

switch ($_GET['op']) {
    case 'todos': 
        $datos = $reservas->todos();
        header('Content-Type: application/json');
        echo json_encode($datos);
        break;
    
    case 'disponibilidad':
        header('Content-Type: application/json');
        $fecha_inicio = $_GET['fechaInicio'] ?? null;
        $fecha_salida = $_GET['fechaSalida'] ?? null; // Cambiado a $fecha_salida
        $id_habitacion = $_GET['habitacionId'] ?? null;
        
        // Log para verificar los parámetros recibidos
        error_log("Parámetros recibidos: fechaInicio=$fecha_inicio, fechaSalida=$fecha_salida, habitacionId=$id_habitacion");
        
        if (!$fecha_inicio || !$fecha_salida || !$id_habitacion) { // Cambiado a $fecha_salida
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $datos = $reservas->disponibilidad($fecha_inicio, $fecha_salida, $id_habitacion); // Cambiado a $fecha_salida
        if ($datos === null) {
            error_log("Error: La consulta SQL devolvió null.");
            echo json_encode(['error' => 'Error en la consulta SQL']);
            break;
        }
        
        $disponible = $datos->num_rows === 0;
        echo json_encode(['disponible' => $disponible]);
        break;
    
    case 'insertar':
        header('Content-Type: application/json');

        // Obtener los datos enviados desde el cliente
        $fecha_inicio = $_POST['fecha_inicio'] ?? null;
        $fecha_salida = $_POST['fecha_salida'] ?? null;
        $id_habitacion = $_POST['id_habitacion'] ?? null;
        $id_usuario = $_POST['id_usuario'] ?? null;

        // Validar que todos los parámetros estén presentes
        if (!$fecha_inicio || !$fecha_salida || !$id_habitacion || !$id_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }

        // Insertar la reserva
        $resultado = $reservas->insertar($fecha_inicio, $fecha_salida, $id_habitacion, $id_usuario);

        if ($resultado) {
            echo json_encode(['success' => true, 'data' => $resultado]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se pudo insertar la reserva']);
        }
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Invalid operation"));
        break;
}
?>