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
error_reporting(E_ALL);
$reservas = new ReservasModel();
$op = $_GET['op'] ?? $_POST['op'] ?? null; // Obtener 'op' desde GET o POST
switch ($op) {
    case 'todos':
        header('Content-Type: application/json');
        $todasReservas = $reservas->getTodasReservas();
        echo json_encode($todasReservas); // Asegúrate de devolver un array
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
        error_log("📩 Datos recibidos en PHP: " . json_encode($_POST));
        
        // Obtener los datos enviados desde el cliente
        $fecha_inicio = $_POST['fecha_inicio'] ?? null;
        $fecha_salida = $_POST['fecha_salida'] ?? null;
        $id_habitacion = $_POST['id_habitacion'] ?? null;
        $id_usuario = $_POST['id_usuario'] ?? null;
        $total_reserva = $_POST['total_reserva'] ?? null;
        $numero_reserva = $_POST['numero_reserva'] ?? null;
        $estado_reserva = $_POST['estado_reserva'] ?? null;
        
        // Validar que todos los parámetros estén presentes
        if (!$fecha_inicio || !$fecha_salida || !$id_habitacion || !$id_usuario || !$total_reserva || !$numero_reserva) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        // Insertar la reserva
        $resultado = $reservas->insertar($fecha_inicio, $fecha_salida, $id_habitacion, $id_usuario, $total_reserva, $numero_reserva, $estado_reserva);
        
        if ($resultado) {
            echo json_encode(['success' => true, 'data' => $resultado]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se pudo insertar la reserva']);
        }
        break;

    case 'totalReservas':
        header('Content-Type: application/json');
        $total = $reservas->getTotalReservas();
        echo json_encode(['success' => true, 'total_reservas' => $total]);
        break;

    case 'reservasActivas':
        header('Content-Type: application/json');
        $reservasActivas = $reservas->getReservasActivas();
        echo json_encode($reservasActivas); 
        break;

    case 'reservasPorFechas':
        header('Content-Type: application/json');
        
        $fechaInicio = $_GET['fechaInicio'] ?? null;
        $fechaFin = $_GET['fechaFin'] ?? null;
        
        if (!$fechaInicio || !$fechaFin) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $reservasPorFecha = $reservas->getReservasPorFechas($fechaInicio, $fechaFin);
        
        if ($reservasPorFecha !== null) {
            echo json_encode($reservasPorFecha);
        } else {
            echo json_encode(['error' => 'No se encontraron reservas en el rango de fechas']);
        }
        break;

    case 'reservasPorUsuario':
        header('Content-Type: application/json');
        
        $id_usuario = $_GET['id_usuario'] ?? null;
        
        if (!$id_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $reservasPorUsuario = $reservas->getReservasPorUsuario($id_usuario);
        
        if ($reservasPorUsuario !== null) {
            echo json_encode($reservasPorUsuario);
        } else {
            echo json_encode(['error' => 'No se encontraron reservas para el usuario']);
        }
        break;

    case 'reservasPorUsuarioActivas':
        header('Content-Type: application/json');
        
        $id_usuario = $_GET['id_usuario'] ?? null;
        
        if (!$id_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $reservasPorUsuarioActivas = $reservas->getReservasPorUsuarioActivas($id_usuario);
        
        if ($reservasPorUsuarioActivas !== null) {
            echo json_encode($reservasPorUsuarioActivas);
        } else {
            echo json_encode(['error' => 'No se encontraron reservas activas para el usuario']);
        }
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Invalid operation"));
        break;
}
