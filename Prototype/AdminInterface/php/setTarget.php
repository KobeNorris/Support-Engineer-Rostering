<?php
include_once("./db_connection.php");

isset($_SESSION) OR session_start();

if($_POST['target'] == 'self'){
    $_SESSION['targetWorking_id'] = $_SESSION['working_id'];
    echo "Success";
}
elseif($_POST['target'] == 'other'){
    $_SESSION['targetWorking_id'] = $_POST['working_id'];
    echo "Success";
}
else
    echo "Wrong instruction ".$_POST['target'];
?>