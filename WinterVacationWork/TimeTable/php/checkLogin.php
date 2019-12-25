<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

isset($_SESSION) OR session_start();

$sql = "SELECT (password) FROM account WHERE working_id=\"".$_SESSION['working_id']."\";";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
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

function checkAccountType(){
    global $dsn, $user, $password;

    $sql = "SELECT (account_type) FROM employee_profile WHERE working_id=\"".$_SESSION['working_id']."\";";

    try {
        $dbh=new PDO($dsn,$user,$password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
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