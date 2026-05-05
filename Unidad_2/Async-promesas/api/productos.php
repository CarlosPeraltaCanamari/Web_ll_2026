<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$servername = "ASUS";
$dbname = "web_2";


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
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
                $stmt->execute([$id]);
                $producto = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($producto ?: ["message" => "Producto no encontrado"]);
            } else {
                $stmt = $conn->query("SELECT * FROM productos");
                $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($productos);
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'] ?? uniqid();
            $nombre = $input['nombre'] ?? '';
            $precio = $input['precio'] ?? '';
            $description = $input['description'] ?? '';

            $stmt = $conn->prepare("INSERT INTO productos (id, nombre, precio, description) VALUES (?, ?, ?, ?)");
            $stmt->execute([$id, $nombre, $precio, $description]);

            http_response_code(201);
            echo json_encode(["message" => "Producto creado exitosamente", "id" => $id]);
            break;

        case 'PUT':
            $input = json_decode(file_get_contents("php://input"), true);
            $id = $input['id'] ?? null;
            $nombre = $input['nombre'] ?? '';
            $precio = $input['precio'] ?? '';
            $description = $input['description'] ?? '';

            if ($id) {
                $stmt = $conn->prepare("UPDATE productos SET nombre = ?, precio = ?, description = ? WHERE id = ?");
                $stmt->execute([$nombre, $precio, $description, $id]);
                echo json_encode(["message" => "Producto actualizado exitosamente"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "ID del producto no proporcionado"]);
            }
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(["message" => "Producto eliminado exitosamente"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "ID del producto no proporcionado"]);
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