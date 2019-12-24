<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$strJsonFileContents = json_decode(file_get_contents("./account.json"), true);
$sql = "INSERT INTO account (working_id, password) VALUES ";
for($blockCounter = 0; $blockCounter < sizeof($strJsonFileContents); $blockCounter++){
    $sql = $sql."(\"".$strJsonFileContents[$blockCounter]["working_id"].
    "\", ".$strJsonFileContents[$blockCounter]["password"].")";
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

    echo "Initialise account database Success"
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>