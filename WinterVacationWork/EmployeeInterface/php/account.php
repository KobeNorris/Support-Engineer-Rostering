<?php
include_once("db_connection.php");

isset($_SESSION) or session_start();

switch ($_POST["action"]) {
    case "changePassword":
        changePassword();
        break;

    case "checkPermission":
        checkPermission();
        break;

    default:
        # code...
        break;
}

function changePassword(){
    $sql = "SELECT (password) FROM account WHERE working_id=\"".$_SESSION['working_id']."\";";

    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        if(implode($row) == $_POST['oldPassword'])
            updatePassword();
        else
            echo "Wrong password";
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function updatePassword(){
    $sql = "UPDATE account SET password = \"".$_POST['newPassword']."\" WHERE working_id=\"".$_SESSION['working_id']."\";";

    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $_SESSION['password'] = $_POST['newPassword'];
    
        echo "Success";
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function checkPermission(){
    if($_SESSION['targetWorking_id'] == $_SESSION['working_id'])
        echo "Success";
    else
        echo "Fail";
}
?>