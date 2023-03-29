<?php
// 'user' object
class Catalog {

    // database connection and table name
    private $conn;
    private $table_name = "hsbcatalogoptions";     //------Table name-------

    // object properties
    public $id;
    public $idCatalog;
    public $catalogDetailName;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create new user record
    function create() {

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
            SET
                id = :id,
                idCatalog = :idCatalog,
                catalogDetailName = :catalogDetailName";

        // prepare the query
        $stmt = $this->conn->prepare($query); //la prepara para ponerlo en la bd

        // sanitize --------- quita las etiquetas html y tranforma caracteres a codigo html
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->idCatalog = htmlspecialchars(strip_tags($this->idCatalog));
        $this->catalogDetailName = htmlspecialchars(strip_tags($this->catalogDetailName));

        // bind the values ----- reemplaza o vincula los parametros(:id) por las variables de la clase  
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':idCatalog', $this->idCatalog);
        $stmt->bindParam(':catalogDetailName', $this->catalogDetailName);

        // // hash the password before saving to database ------------Encripta? la contraseña
        // $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        // $stmt->bindParam(':password', $password_hash);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
// ---------------------
    // check if given email exist in the database
    // function emailExists()
    // {

    //     // query to check if email exists
    //     $query = "SELECT id, catalog
    //         FROM " . $this->table_name . "
    //         WHERE email = ?
    //         LIMIT 0,1";

    //     // prepare the query
    //     $stmt = $this->conn->prepare($query);

    //     // sanitize
    //     $this->email = htmlspecialchars(strip_tags($this->email));

    //     // bind given email value
    //     $stmt->bindParam(1, $this->email);

    //     // execute the query
    //     $stmt->execute();

    //     // get number of rows
    //     $num = $stmt->rowCount();

    //     // if email exists, assign values to object properties for easy access and use for php sessions
    //     if ($num > 0) {

    //         // get record details / values
    //         $row = $stmt->fetch(PDO::FETCH_ASSOC);

    //         // assign values to object properties
    //         $this->id = $row['id'];
    //         $this->name = $row['name'];
    //         $this->details = $row['details'];
    //         $this->password = $row['password'];

    //         // return true because email exists in the database
    //         return true;
    //     }

    //     // return false if email does not exist in the database
    //     return false;
    // }



    // update a user record
    public function update(){

        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
            SET
            idCatalog = :idCatalog,
            catalogDetailName = :catalogDetailName
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->idCatalog = htmlspecialchars(strip_tags($this->idCatalog));
        $this->catalogDetailName = htmlspecialchars(strip_tags($this->catalogDetailName));

        // bind the values from the form
        $stmt->bindParam(':idCatalog', $this->idCatalog);
        $stmt->bindParam(':catalogDetailName', $this->catalogDetailName);

        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':catalogDetailName', $this->catalogDetailName);
        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>