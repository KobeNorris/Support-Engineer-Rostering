<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$profileList = array();
// $working_id = $_POST['working_id'];
$working_id = "scykw1";

$sql = "SELECT * FROM employee_profile WHERE working_id = \"".$working_id."\";";

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        $profile = array();
        $profile['name'] = $row['name'];
        $profile['slack_id'] = $row['slack_id'];
        $profile['group_id'] = $row['group_id'];
        $profile['email'] = $row['email'];
        $profile['phone_number'] = $row['phone_number'];
        $profile['status'] = $row['status'];
        $profile['working_id'] = $row['working_id'];
        $profile['account_type'] = $row['account_type'];
        array_push($profileList, $profile);
    }

    echo json_encode($profileList);
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>