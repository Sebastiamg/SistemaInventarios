<?php
// required headers
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
die();
}

// required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));  
// set user property values
    $user->id = $data->id;
    $user->name = $data->name;
    $user->details = $data->details;
    $user->email = $data->email;
    $user->active = $data->active;
    // $user->password = $data->password;

// update the user record
if ($user->update()) {

    $asset = array(
        "id" => $user->id,
        "name" => $user->name,
        "details" => $user->details,
        "email" => $user->email,  
        "active" => $user->active
    );
    // set response code
    http_response_code(200);

    // response in json format
    echo json_encode(
        array(
            "message" => "User Updated"
        )
    );
}

// message if unable to update user
else {
    // set response code
    http_response_code(401);

    // show error message
    echo json_encode(array("message" => "Unable to update asset."));
}
?>