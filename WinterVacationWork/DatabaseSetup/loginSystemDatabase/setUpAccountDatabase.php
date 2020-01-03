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

    echo "Set up account database Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>