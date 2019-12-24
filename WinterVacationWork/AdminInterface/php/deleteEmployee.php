<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$working_id = $_POST['working_id'];

$sql = "DELETE FROM employee_holiday WHERE working_id=\"".$working_id."\";";
$sql = $sql."DELETE FROM employee_deployment WHERE working_id=\"".$working_id."\";";
$sql = $sql."DELETE FROM account WHERE working_id=\"".$working_id."\";";
$sql = $sql."DELETE FROM employee_profile WHERE working_id=\"".$working_id."\";";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    
    echo "Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>