<?php
// include_once("../db_connection.php");

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
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

<<<<<<< HEAD
    echo "Set up reapeat_task table Success";
=======
    echo "Set up reapeat_task table Success\n";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>