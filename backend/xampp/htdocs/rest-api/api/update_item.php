<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/item.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$asset = new Item($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set user property values
    $asset->id = $data->item;
    $asset->assetName = $data->name;
    $asset->assetDetails = $data->details;
    $asset->assetPurchaseDate = $data->acquisition_date;
    $asset->assetActive = $data->statusD;

// update the user record
if ($asset->update()) {

    $asset = array(
        "id" => $asset->id,
        "assetName" => $asset->assetName,
        "assetDetails" => $asset->assetDetails,
        "assetPurchaseDate" => $asset->assetPurchaseDate,
        "assetActive" => $asset->assetActive   
    );
    // set response code
    http_response_code(200);

    // response in json format
    echo json_encode(
        array(
            "message" => "Item was updated."
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