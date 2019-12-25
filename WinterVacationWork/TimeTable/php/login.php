<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

isset($_SESSION) OR session_start();
// echo(isset($_SESSION) ? "true" : "false");

$working_id = $_POST['working_id'];
$userPassword = $_POST['password'];

// $working_id = "scykw1";
// $userPassword = "";


$sql = "SELECT (password) FROM account WHERE working_id=\"".$working_id."\";";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
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
?>