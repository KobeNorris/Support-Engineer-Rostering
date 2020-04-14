<?php
include_once("./db_connection.php");

$date = $_POST['presentDate'];

$sql = "DELETE from employee_holiday WHERE end_date < \"".$date."\";";
$sql = $sql."DELETE from employee_deployment WHERE end_date < \"".$date."\";";

try {
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
        
    echo 'Succeed';
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>