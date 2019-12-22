<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$strJsonFileContents = json_decode(file_get_contents("employeeProfile.json"), true);
$sql = "INSERT INTO employee_profile (name, working_id, slack_id, email, group_id, phone_number, status) VALUES ";
for($blockCounter = 0; $blockCounter < sizeof($strJsonFileContents); $blockCounter++){
    $sql = $sql."(\"".$strJsonFileContents[$blockCounter]["name"].
    "\", \"".$strJsonFileContents[$blockCounter]["working_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["slack_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["email"].
    "\", \"".$strJsonFileContents[$blockCounter]["group_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["phone_number"].
    "\", ".$strJsonFileContents[$blockCounter]["status"].")";
    if($blockCounter < sizeof($strJsonFileContents) - 1)
        $sql = $sql.",";
    else
        $sql  = $sql.";";
}

echo($sql);
?>