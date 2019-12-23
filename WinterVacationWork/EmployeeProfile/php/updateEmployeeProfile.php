<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$employeeProfile = json_decode($_POST['employeeProfile']);
$original_working_id = $_POST['working_id'];

$sql = "UPDATE employee_profile SET name = \"".$employeeProfile[0]->name."\", working_id = \"".$employeeProfile[0]->working_id."\", slack_id = \"".$employeeProfile[0]->slack_id."\", email = \"".$employeeProfile[0]->email."\", group_id = \"".$employeeProfile[0]->group_id."\", phone_number = \"".$employeeProfile[0]->phone_number."\", status = ".$employeeProfile[0]->status." WHERE working_id = \"".$original_working_id."\";";

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
?>