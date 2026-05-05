<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

//Datos de conexión a la base de datos SQL Server
$servername = "ASUS"; // Nombre del servidor según la imagen
$dbname = "web_2";

// Crear conexión usando Autenticación de Windows
try {
    $conn = new PDO("sqlsrv:Server=$servername;Database=$dbname;TrustServerCertificate=true");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexión a la base de datos: " . $e->getMessage()]));
}

//Metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];
try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM clientes WHERE id = ?");
                $stmt->execute([$id]);
                $cliente = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($cliente ?: ["message" => "Cliente no encontrado"]);
            } else {
                $stmt = $conn->query("SELECT * FROM clientes");
                $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($clientes);
            }
        break;   

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'] ?? uniqid();
            $nombre = $input['nombre'] ?? '';
            $email = $input['email'] ?? '';
            $telefono = $input['telefono'] ?? null; // Puede venir nulo
            $direccion = $input['direccion'] ?? null; // Puede venir nulo
            
            $stmt = $conn->prepare("INSERT INTO clientes (id, nombre, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$id, $nombre, $email, $telefono, $direccion]);
            
            http_response_code(201);
            echo json_encode(["message" => "Cliente creado exitosamente", "id" => $id]);
        break;

        case 'PUT':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'] ?? null;
            $nombre = $input['nombre'] ?? '';
            $email = $input['email'] ?? '';
            $telefono = $input['telefono'] ?? null;
            $direccion = $input['direccion'] ?? null;
            
            if ($id) {
                $stmt = $conn->prepare("UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?");
                $stmt->execute([$nombre, $email, $telefono, $direccion, $id]);
                echo json_encode(["message" => "Cliente actualizado exitosamente"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "ID del cliente no proporcionado"]);
            }
        break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $conn->prepare("DELETE FROM clientes WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(["message" => "Cliente eliminado exitosamente"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "ID del cliente no proporcionado"]);
            }
        break;

        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}

// Cerrar conexión
$conn = null;
?>
