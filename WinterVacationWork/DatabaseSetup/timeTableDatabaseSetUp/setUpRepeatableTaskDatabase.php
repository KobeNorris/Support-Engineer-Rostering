<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$sql = "CREATE TABLE repeat_task (
    working_id VARCHAR(40) NOT NULL,
    group_id VARCHAR(40) NOT NULL,
    job_role VARCHAR(40) NOT NULL,
    start_date DATETIME,
    end_date   DATETIME,
    repeat_interval int,
    repeat_time int
    );";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Set up reapeat_task table Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>