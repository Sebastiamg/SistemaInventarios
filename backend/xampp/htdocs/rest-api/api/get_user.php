<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD']; //metodo de la solicitud
if ($method == "OPTIONS") { //allow con metodos permitidos  
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}

// files needed to connect to database
include_once 'config/database.php'; //funcion que conecta a la bd
include_once 'objects/user.php'; //función que crea nuevo usuario

// get database connection
$database = new Database(); //variable de la clase Database
$db = $database->getConnection(); //variable con acceso a su función conexion

//select all rows
$sql = "SELECT id, name, email, details, active FROM hsbusers ORDER BY id";
$query = $db -> prepare($sql);
$query->execute();

while( $row = $query->fetch()){
    $array[] = array(
        "id" => $row["id"],
        "name" => $row["name"],
        "email" => $row["email"],
        "details" => $row["details"],  //LINEA ASSET DETAIL
        "active" => $row["active"]
    );
}

$json = json_encode($array);
echo $json;

?>