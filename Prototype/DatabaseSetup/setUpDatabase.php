<?php
include_once("./db_connection.php");

$host="localhost";
$user = 'team35';
$password = 'team35';
$sql = "CREATE DATABASE RosteringSystem;";

try {
    $dbh = new PDO("mysql:host=$host", $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up database Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

require_once('employeeDatabase/setUpEmployeeProfileDatabase.php');
require_once('employeeDatabase/setUpEmployeeHolidayDatabase.php');
require_once('employeeDatabase/setUpEmployeeDeploymentDatabase.php');

require_once('loginSystemDatabase/setUpAccountDatabase.php');

require_once('timeTableDatabase/setUpTimeTableDatabase.php');
require_once('timeTableDatabase/setUpRepeatableTaskDatabase.php');
?>