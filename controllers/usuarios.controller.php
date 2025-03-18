<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

require_once __DIR__ . '/../models/usuarios.model.php'; 
error_reporting(0);
$usuarios = new UsuariosModel();

switch ($_GET['op']) {
    case 'todos': 
        $datos = $usuarios->todos();
        header('Content-Type: application/json');
        echo json_encode($datos);
        break;

    case 'login':
        header('Content-Type: application/json');
        $correo_usuario = $_GET['correo_usuario'] ?? null;
        $clave_usuario = $_GET['clave_usuario'] ?? null;
        
        // Log para verificar los parámetros recibidos
        error_log("Parámetros recibidos: correo_usuario=$correo_usuario, clave_usuario=$clave_usuario");
        
        if (!$correo_usuario || !$clave_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $datos = $usuarios->login($correo_usuario, $clave_usuario);
        if ($datos === null) {
            error_log("Error: La consulta SQL devolvió null.");
            echo json_encode(['error' => 'Error en la consulta SQL']);
            break;
        }
        
        echo json_encode($datos);
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Invalid operation"));
        break;
}
?>