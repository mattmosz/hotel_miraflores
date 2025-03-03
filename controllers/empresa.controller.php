<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

require_once __DIR__ . '/../models/empresa.model.php'; 
error_reporting(0);
$empresa = new EmpresaModel();

switch ($_GET['op']) {
    case 'todos': 
        $datos = array();
        $datos = $empresa->todos();
        $todos = array();
        while ($row = mysqli_fetch_array($datos)) {
            $todos[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($todos);
        break;

    default:
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Invalid operation"));
        break;
}
?>