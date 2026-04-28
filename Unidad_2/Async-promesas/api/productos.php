<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

//Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_2";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Error de conexión a la base de datos: " . $conn->connect_error]));
}

//Metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id){
            $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $producto = $result->fetch_assoc();
            echo json_encode($producto);
        } else {
            $result = $conn->query("SELECT * FROM productos");
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
    break;   

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'];
        $precio = $input['precio'];
        $description = $input['description'];
        $stmt = $conn->prepare("INSERT INTO productos (id, nombre, precio, description) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $id, $nombre, $precio, $description);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Producto creado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el producto: " . $stmt->error]);
        }
    break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'];
        $nombre = $input['nombre'];
        $precio = $input['precio'];
        $description = $input['description'];
        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, precio = ?, description = ? WHERE id = ?");
        $stmt->bind_param("ssss", $nombre, $precio, $description, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Producto actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el producto: " . $stmt->error]);
        }
    break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
            $stmt->bind_param("s", $id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Producto eliminado exitosamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar el producto: " . $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID del producto no proporcionado"]);
        }
    break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
$conn->close();
?>
