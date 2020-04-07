<?php
include_once("./db_connection.php");

isset($_SESSION) OR session_start();

$action = $_POST['action'];

switch ($_POST['action']) {
    case 'login':
        login();
        break;
    
    case 'check':
        checkLogin();
        break;

    case 'logout':
        session_destroy();
        echo "Success";
        break;

    case 'getWorkingId':
        if(isset($_SESSION['targetWorking_id']))
            echo $_SESSION['targetWorking_id'];
        else
            echo "Fail";
        break;

    default:
        echo "Wrong instruction ".$_POST['action'];
        break;
}

function login(){
    $working_id = $_POST['working_id'];
    $userPassword = $_POST['password'];
    
    $sql = "SELECT (password) FROM account WHERE working_id=\"".$working_id."\";";
    
    try {
        $dbh = PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
            
        if($row != null && implode($row) == $userPassword){
            $_SESSION['working_id'] = $working_id;
            $_SESSION['password'] = $userPassword;
            echo "Success";
        }else{
            echo "Fail";
        }
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function checkLogin(){
    $sql = "SELECT (password) FROM account WHERE working_id=\"".$_SESSION['working_id']."\";";

    try {
        $dbh = PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);
            
        if($row != null && implode($row) == $_SESSION['password']){
            checkAccountType();
        }else{
            echo "Fail";
        }
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function checkAccountType(){
    $sql = "SELECT (account_type) FROM employee_profile WHERE working_id=\"".$_SESSION['working_id']."\";";

    try {
        $dbh = PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
            
        echo implode($row);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}
?>