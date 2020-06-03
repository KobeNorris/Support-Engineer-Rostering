<?php
// include_once("../db_connection.php");

// $strJsonFileContents = json_decode(file_get_contents("./employeeProfile.json"), true);
$strJsonFileContents = json_decode(file_get_contents("./employeeDatabase/employeeProfile.json"), true);
$sql = "INSERT INTO employee_profile (name, working_id, slack_id, email, group_id, phone_number, account_type, job_role, status) VALUES ";
for($blockCounter = 0; $blockCounter < sizeof($strJsonFileContents); $blockCounter++){
    $sql = $sql."(\"".$strJsonFileContents[$blockCounter]["name"].
    "\", \"".$strJsonFileContents[$blockCounter]["working_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["slack_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["email"].
    "\", \"".$strJsonFileContents[$blockCounter]["group_id"].
    "\", \"".$strJsonFileContents[$blockCounter]["phone_number"].
    "\", \"".$strJsonFileContents[$blockCounter]["account_type"].
    "\", \"".$strJsonFileContents[$blockCounter]["job_role"].
    "\", ".$strJsonFileContents[$blockCounter]["status"].")";
    if($blockCounter < sizeof($strJsonFileContents) - 1)
        $sql = $sql.",";
    else
        $sql  = $sql.";";
}
try {
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

<<<<<<< HEAD
    echo "Initialise employee profile Success";
=======
    echo "Initialise employee profile Success\n";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>