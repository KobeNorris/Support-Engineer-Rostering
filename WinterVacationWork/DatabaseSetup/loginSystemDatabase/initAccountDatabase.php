<?php
// include_once("../db_connection.php");

// $strJsonFileContents = json_decode(file_get_contents("./account.json"), true);
$strJsonFileContents = json_decode(file_get_contents("./loginSystemDatabase/account.json"), true);
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
    $dbh=PDOProvider();
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Initialise account database Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>