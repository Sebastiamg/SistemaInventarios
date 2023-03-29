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
include_once 'objects/catalog.php'; //función que crea nuevo usuario
 
// get database connection
$database = new Database(); //variable de la clase Database
$db = $database->getConnection(); //variable con acceso a su función conexion
 
// instantiate product object
$catalog = new Catalog($db);  //variable con la calse usuario y el acceso a la conexion como parametro
 
// get posted data
$data = json_decode(file_get_contents("php://input"));  ///??
// echo $data;
// set product property values
$catalog->id = $data->item;
$catalog->idCatalog = $data->idCatalog;   //---------------
$catalog->catalogDetailName = $data->catalogDetailName;

// create the user
if(
    !empty($catalog->id) &&
    !empty($catalog->idCatalog) &&
    !empty($catalog->catalogDetailName) &&
    $catalog->create()
){
 
    // set response code
    http_response_code(200);
 
    // display message: user was created
    echo json_encode(array("message" => "catalog was created."));
}
 
// message if unable to create user
else{
 
    // set response code
    http_response_code(400);
 
    // display message: unable to create user
    echo json_encode(array("message" => "Unable to create catalog."));
}
?>