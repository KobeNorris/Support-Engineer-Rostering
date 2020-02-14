<?php
// include_once("../db_connection.php");

$sql = "CREATE TABLE primary_engineer (
    -- unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start_date DATETIME,
    end_date   DATETIME);";

$sql = $sql."CREATE TABLE secondary_engineer (
    -- unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start_date DATETIME,
    end_date   DATETIME);";

$sql = $sql."CREATE TABLE escalation_manager (
    -- unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    -- role VARCHAR(40) NOT NULL,
    start_date DATETIME,
    end_date   DATETIME);";

try {
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up time tables Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>