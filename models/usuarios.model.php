<?php

require_once __DIR__ . '/../config/Conexion.php';

class UsuariosModel
{
    private $conn;

    public function __construct()
    {
        $this->conn = Conexion::conectar();
    }

    public function todos()
    {
        $query = "SELECT * FROM usuarios";
        $result = mysqli_query($this->conn, $query);
        return $result;
    }

    public function login($correo_usuario, $clave_usuario)
    {
        $query = "SELECT * FROM usuarios WHERE correo_usuario = ?";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
        error_log("Error al preparar la consulta: " . $this->conn->error);
        return null;
        }

        $stmt->bind_param("s", $correo_usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result || $result->num_rows === 0) {
            error_log("Usuario no encontrado o error en la consulta.");
            return null;
        }

        $usuario = $result->fetch_assoc();

        // Verificar la contraseña ingresada con el hash almacenado
        if (password_verify($clave_usuario, $usuario['clave_usuario'])) {
            // Contraseña correcta, devolver los datos del usuario
            return $usuario;
        } else {
            // Contraseña incorrecta
            return null;
        }
    }

    public function uno($id_usuario) {
        $query = "SELECT nombre_usuario, apellido_usuario FROM usuarios WHERE id_usuario = ?";
        $stmt = $this->conn->prepare($query);
    
        if (!$stmt) {
            error_log("Error al preparar la consulta: " . $this->conn->error);
            return null;
        }
    
        $stmt->bind_param("i", $id_usuario);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows > 0) {
            return $result->fetch_assoc(); 
        } else {
            return null; 
        }
    }

}
?>