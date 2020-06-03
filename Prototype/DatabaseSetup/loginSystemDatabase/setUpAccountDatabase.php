<?php
// include_once("../db_connection.php");

$sql="CREATE TABLE account (".
    "working_id VARCHAR(255) NOT NULL UNIQUE,".
    "password VARCHAR(255) NOT NULL".
    ");";

try {
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

<<<<<<< HEAD
    echo "Set up account database Success";
=======
    echo "Set up account database Success\n";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>
