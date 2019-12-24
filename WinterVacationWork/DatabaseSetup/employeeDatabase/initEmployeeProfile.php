<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$strJsonFileContents = json_decode(file_get_contents("./employeeProfile.json"), true);
$sql = "INSERT INTO employee_profile (name, working_id, slack_id, email, group_id, phone_number, account_type, status) VALUES ";
for($blockCounter = 0; $blockCounter < sizeof($strJsonFileContents); $blockCounter++){
    $sql = $sql."(\"".$strJsonFileContents[$blockCounter]["name"].
    "\", \"".$strJsonFileContents[$blockCounter]["working_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["slack_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["email"].
    "\", \"".$strJsonFileContents[$blockCounter]["group_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["phone_number"].
    "\", \"".$strJsonFileContents[$blockCounter]["account_type"].
    "\", ".$strJsonFileContents[$blockCounter]["status"].")";
    if($blockCounter < sizeof($strJsonFileContents) - 1)
        $sql = $sql.",";
    else
        $sql  = $sql.";";
}
try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Initialise employee profile Success"
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>