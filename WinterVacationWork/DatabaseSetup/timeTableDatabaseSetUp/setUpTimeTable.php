<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$sql = "CREATE TABLE primary_engineer (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME);";

$sql = $sql."CREATE TABLE secondary_engineer (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME);";

$sql = $sql."CREATE TABLE escalation_manager (
    unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start DATETIME,
    end   DATETIME);";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up time tables Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>