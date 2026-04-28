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
        $id =$_GET['id'] ?? null;
        if ($id){
            $stmt = $conn->prepare("SELECT * FROM cliente WHERE id = ?"); //Consulta 
            $stmt->bind_param("s", $id); //Vincula el parámetro
            $stmt->execute(); //Ejecuta la consulta
            $result = $stmt->get_result(); //Obtiene el resultado
            $cliente = $result->fetch_assoc(); //Obtiene el cliente
            //En caso de pruebas, si el cliente no existe, se devuelve un error
            echo json_encode($cliente);
        } else {
            $result = $conn->query("SELECT * FROM cliente"); //Consulta
            $cliente=[];
            while ($row = $result->fetch_assoc()) {
                $cliente[] = $row;
            }

            //En caso de pruebas, si el cliente no existe, se devuelve un error
            echo json_encode($cliente);

        }
    break;   

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? uniqid(); //Genera un ID único si no se proporciona
        $nombre = $input['nombre'];
        $apellido = $input['apellido'];
        $email = $input['email'];
        $stmt = $conn->prepare("INSERT INTO cliente (id, nombre, apellido, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $id, $nombre, $apellido, $email);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Cliente creado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear el cliente: " . $stmt->error]);
        }
    break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'];
        $nombre = $input['nombre'];
        $apellido = $input['apellido'];
        $email = $input['email'];
        $stmt = $conn->prepare("UPDATE cliente SET nombre = ?, apellido = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssss", $nombre, $apellido, $email, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Cliente actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar el cliente: " . $stmt->error]);
        }
    break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM cliente WHERE id = ?");
            $stmt->bind_param("s", $id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Cliente eliminado exitosamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error al eliminar el cliente: " . $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID del cliente no proporcionado"]);
        }
    break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}
$conn->close();
?>