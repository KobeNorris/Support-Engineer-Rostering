<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$working_id = $_POST['working_id'];
$employeePassword = $_POST['password'];

checkDuplicate();

function checkDuplicate(){
    global $dsn, $user, $password, $working_id;

    $sql = "SELECT COUNT(*) FROM employee_profile WHERE working_id=\"".$working_id."\";";

    try {
        $dbh=new PDO($dsn,$user,$password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        
        if(implode($row) == "0"){
            uploadEmployee();
        }else{
            echo "duplicate working_id";
        }
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function uploadEmployee(){
    global $dsn, $user, $password, $working_id, $employeePassword;

    $sql = "INSERT INTO account VALUES (\"".$working_id."\", \"".$employeePassword."\");";
    $sql =  $sql."INSERT INTO employee_profile (working_id, status) VALUES (\"".$working_id."\", \"".false."\");";
    
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

?>