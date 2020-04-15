<?php
// include_once("../db_connection.php");

$sql="CREATE TABLE employee_deployment (".
    "working_id VARCHAR(255) NOT NULL,".
    "start_date DATE NOT NULL,".
    "end_date DATE NOT NULL".
    ");";

try {
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up employee deployment Success\n";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>
