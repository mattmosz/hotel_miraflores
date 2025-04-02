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

    public function uno($id_usuario)
    {
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

    public function insertar($nombre_usuario, $apellido_usuario, $usuario, $correo_usuario, $clave_usuario, $direccion_usuario, $telefono_usuario, $rol_usuario, $foto_usuario, $estado_usuario)
    {
        $query = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, usuario, correo_usuario, clave_usuario, direccion_usuario, telefono_usuario, verify_usuario, rol_usuario, foto_usuario, estado_usuario) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            error_log("Error al preparar la consulta: " . $this->conn->error);
            return false;
        }

        $hashed_password = password_hash($clave_usuario, PASSWORD_BCRYPT);
        $verify_usuario = 0; // Valor predeterminado para verify_usuario

        $stmt->bind_param("sssssssssss", $nombre_usuario, $apellido_usuario, $usuario, $correo_usuario, $hashed_password, $direccion_usuario, $telefono_usuario, $verify_usuario, $rol_usuario, $foto_usuario, $estado_usuario);

        if ($stmt->execute()) {
            return true;
        } else {
            error_log("Error al ejecutar la consulta: " . $stmt->error);
            return false;
        }
    }

    public function loginAdmin($correo_usuario, $clave_usuario)
    {
        $query = "SELECT * FROM usuarios WHERE correo_usuario = ? AND rol_usuario = 1";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            error_log("Error al preparar la consulta: " . $this->conn->error);
            return null;
        }

        $stmt->bind_param("s", $correo_usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result || $result->num_rows === 0) {
            error_log("Usuario no encontrado o no es administrador.");
            return null;
        }

        $usuario = $result->fetch_assoc();

        // Verificar la contraseña ingresada con el hash almacenado
        if (password_verify($clave_usuario, $usuario['clave_usuario'])) {
            // Contraseña correcta, devolver los datos del usuario
            return $usuario;
        } else {
            // Contraseña incorrecta
            error_log("Contraseña incorrecta para el usuario: $correo_usuario");
            return null;
        }
    }

    public function getTotalClientes(){
        $query = "SELECT COUNT(*) as total FROM usuarios WHERE rol_usuario = 2";
        $result = mysqli_query($this->conn, $query);
        $row = mysqli_fetch_assoc($result);
        return $row['total'];
    }
}
