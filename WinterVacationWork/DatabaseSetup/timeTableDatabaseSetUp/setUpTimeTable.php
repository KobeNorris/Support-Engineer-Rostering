<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$sql = "CREATE TABLE primaryEngineer (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME)";

$sql = $sql."CREATE TABLE secondEngineer (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME)";

$sql = $sql."CREATE TABLE escalationManager (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME)";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up employee deployment Success"
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>