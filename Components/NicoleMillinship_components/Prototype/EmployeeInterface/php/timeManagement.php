<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$target = $_POST["target"];
$action = $_POST["action"];
$working_id = $_POST["working_id"];

if($action == "upload")
    upload();
else if($action == "delete")
    delete();
else if($action == "refresh")
    refresh();


function upload(){
    global $target, $dsn, $user, $password, $working_id;

    $start_date = $_POST["start_date"];
    $end_date = $_POST["end_date"];

    $sql = "INSERT INTO employee_".$target." VALUES (\"".$working_id."\", \"".$start_date."\", \"".$end_date."\");";

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
}


function delete(){
    global $target, $dsn, $user, $password, $working_id;

    $start_date = $_POST["start_date"];
    $end_date = $_POST["end_date"];
    
    $sql = "DELETE FROM employee_".$target." WHERE working_id=\"".$working_id."\" AND start_date=\"".$start_date."\" AND end_date=\"".$end_date."\";";
    
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
}

function refresh(){
    global $target, $dsn, $user, $password, $working_id;

    $holidayList = array();
    
    $sql = "SELECT * FROM employee_".$target." WHERE working_id =\"".$working_id."\";";
    
    try {
        $dbh=new PDO($dsn,$user,$password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
    
        while ($row=$stmt->fetch(PDO::FETCH_ASSOC))
            array_push($holidayList, $row);

        echo json_encode($holidayList);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}
?>