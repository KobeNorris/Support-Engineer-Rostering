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

<<<<<<< HEAD
=======
    case 'match':
        checkMatch();
        break;

>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
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
=======
    if(isset($_SESSION['working_id'])){
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
    else{
        echo "Not log in";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
=======

function checkMatch(){
    if(isset($_SESSION['working_id'])){
        $sql = "SELECT (password) FROM account WHERE working_id=\"".$_SESSION['working_id']."\";";

        try {
            $dbh = PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();
    
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
                
            if($row != null && implode($row) == $_SESSION['password']){
                $targetWorking_id = $_POST['targetWorking_id'];
                if ($targetWorking_id == $_SESSION['working_id']){
                    echo 'Succeed';
                }else{
                    // echo 'Failed'.$_POST['targetWorking_id']." - ".$_SESSION['working_id'];
                    echo 'Failed';
                }
            }else{
                echo "Not log in";
            }
        } catch (PDOException $error) {
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        }
    }else{
        echo "Not log in";
    }
}
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
?>