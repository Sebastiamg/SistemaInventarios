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
include_once 'objects/item.php'; //función que crea nuevo usuario
 
// get database connection
$database = new Database(); //variable de la clase Database
$db = $database->getConnection(); //variable con acceso a su función conexion
 
// instantiate product object
$asset = new Item($db);  //variable con la calse usuario y el acceso a la conexion como parametro
 
// get posted data
$data = json_decode(file_get_contents("php://input"));  ///??
// echo $data;
// set product property values
$asset->id = $data->item;
$asset->assetName = $data->name;
$asset->assetDetails = $data->details;    //---------------
$asset->assetPurchaseDate = $data->acquisition_date;
$asset->assetActive = $data->statusD;

// create the user
if(
    !empty($asset->id) &&
    !empty($asset->assetName) &&
    !empty($asset->assetDetails) &&
    !empty($asset->assetPurchaseDate) &&
    !empty($asset->assetActive) &&
    $asset->create()
){
 
    // set response code
    http_response_code(200);
 
    // display message: user was created
    echo json_encode(array("message" => "Item was created."));
}
 
// message if unable to create user
else{
 
    // set response code
    http_response_code(400);
 
    // display message: unable to create user
    echo json_encode(array("message" => "Unable to create user."));
}
?>