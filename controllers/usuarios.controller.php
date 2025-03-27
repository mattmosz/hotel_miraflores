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

// Leer los datos enviados en el cuerpo de la solicitud
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$usuarios = new UsuariosModel();

$op = $data['op'] ?? $_GET['op'] ?? null;

switch ($op) {
    case 'todos': 
        $datos = $usuarios->todos();
        header('Content-Type: application/json');
        echo json_encode($datos);
        break;

    case 'login':
        header('Content-Type: application/json');
        $correo_usuario = $_GET['correo_usuario'] ?? null;
        $clave_usuario = $_GET['clave_usuario'] ?? null;
        
        if (!$correo_usuario || !$clave_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $datos = $usuarios->login($correo_usuario, $clave_usuario);
        if ($datos === null) {
            echo json_encode(['error' => 'Error en la consulta SQL']);
            break;
        }
        
        echo json_encode($datos);
        break;

    case 'uno':
        header('Content-Type: application/json');
        $id_usuario = $_GET['id_usuario'] ?? null;
        
        if (!$id_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
        
        $datos = $usuarios->uno($id_usuario);
        
        if ($datos) {
            echo json_encode($datos);
        } else {
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
        break;

    case 'insertar':
        header('Content-Type: application/json');
    
        // Obtener los datos enviados desde el cliente
        $nombre_usuario = $data['nombre_usuario'] ?? null;
        $apellido_usuario = $data['apellido_usuario'] ?? null;
        $usuario = $data['usuario'] ?? null;
        $correo_usuario = $data['correo_usuario'] ?? null;
        $clave_usuario = $data['clave_usuario'] ?? null;
        $direccion_usuario = $data['direccion_usuario'] ?? null;
        $telefono_usuario = $data['telefono_usuario'] ?? null;
        $rol_usuario = $data['rol_usuario'] ?? null;
        $foto_usuario = $data['foto_usuario'] ?? null;
        $estado_usuario = $data['estado_usuario'] ?? null;
    
        // Validar que todos los parámetros estén presentes
        if (!$nombre_usuario || !$apellido_usuario || !$usuario || !$correo_usuario || !$clave_usuario || !$direccion_usuario || !$telefono_usuario || !$rol_usuario || $estado_usuario === null) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }
    
        // Insertar el usuario
        $resultado = $usuarios->insertar($nombre_usuario, $apellido_usuario, $usuario, $correo_usuario, $clave_usuario, $direccion_usuario, $telefono_usuario, $rol_usuario, $foto_usuario, $estado_usuario);
    
        if ($resultado) {
            echo json_encode(['success' => true, 'message' => 'Usuario insertado correctamente']);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se pudo insertar el usuario']);
        }
        break;

    case 'loginAdmin':
        header('Content-Type: application/json');

        $correo_usuario = $_GET['correo_usuario'] ?? null;
        $clave_usuario = $_GET['clave_usuario'] ?? null;

        // Depurar los valores recibidos
        error_log("Correo recibido: $correo_usuario");
        error_log("Clave recibida: $clave_usuario");

        if (!$correo_usuario || !$clave_usuario) {
            echo json_encode(['error' => 'Faltan parámetros']);
            break;
        }

        $datos = $usuarios->loginAdmin($correo_usuario, $clave_usuario);
        if ($datos === null) {
            echo json_encode(['error' => 'Credenciales incorrectas o no tienes permisos de administrador']);
            break;
        }

        echo json_encode(['success' => true, 'admin_id' => $datos['id_usuario'], 'nombre' => $datos['nombre_usuario']]);
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Operación no válida']);
        break;
}
?>