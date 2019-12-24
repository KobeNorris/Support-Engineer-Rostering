<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$profileList = array();

$sql = "SELECT * FROM employee_profile;";
try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        $profile = array();
        $profile['name'] = $row['name'];
        $profile['group_id'] = $row['group_id'];
        $profile['status'] = $row['status'];
        $profile['working_id'] = $row['working_id'];
        array_push($profileList, $profile);
    }

    echo json_encode($profileList);
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>