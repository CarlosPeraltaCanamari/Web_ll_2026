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
            $stmt = $conn->prepare("SELECT * FROM mascotas WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $mascota = $result->fetch_assoc();
            echo json_encode($mascota);
        } else {
            $result = $conn->query("SELECT * FROM mascotas");
            $mascotas = [];
            while ($row = $result->fetch_assoc()) {
                $mascotas[] = $row;
            }
            echo json_encode($mascotas);
        }
    break;   

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'];
        $tipo = $input['tipo'];
        $raza = $input['raza'];
        $edad = $input['edad'];
        $dueno = $input['dueno'];
        $stmt = $conn->prepare("INSERT INTO mascotas (id, nombre, tipo, raza, edad, dueno) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $id, $nombre, $tipo, $raza, $edad, $dueno);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Mascota creada exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear la mascota: " . $stmt->error]);
        }
    break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'];
        $nombre = $input['nombre'];
        $tipo = $input['tipo'];
        $raza = $input['raza'];
        $edad = $input['edad'];
        $dueno = $input['dueno'];
        $stmt = $conn->prepare("UPDATE mascotas SET nombre = ?, tipo = ?, raza = ?, edad = ?, dueno = ? WHERE id = ?");
        $stmt->bind_param("ssssss", $nombre, $tipo, $raza, $edad, $dueno, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Mascota actualizada exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar la mascota: " . $stmt->error]);
        }
    break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM mascotas WHERE id = ?");
            $stmt->bind_param("s", $id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Mascota eliminada exitosamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar la mascota: " . $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID de la mascota no proporcionado"]);
        }
    break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
$conn->close();
?>
