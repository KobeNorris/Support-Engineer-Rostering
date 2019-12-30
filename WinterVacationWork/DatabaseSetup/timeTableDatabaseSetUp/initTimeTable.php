<?php
$dsn = 'mysql:host=localhost;dbname=rosteringsystem';
$user = 'team35';
$password = 'team35';

$strJsonFileContents = json_decode(file_get_contents("./timeTable.json"), true);
$PE_flag = false;
$SE_flag = false;
$EM_flag = false;
$PE_sql = "INSERT INTO primary_engineer (working_id, group_id, start_date, end_date) VALUES ";
$SE_sql = "INSERT INTO secondary_engineer (working_id, group_id, start_date, end_date) VALUES ";
$EM_sql = "INSERT INTO escalation_manager (working_id, group_id, start_date, end_date) VALUES ";

for($index = 0; $index < sizeof($strJsonFileContents); $index++){
    switch ($strJsonFileContents[$index]['job_role']) {
        case 'PrimaryEngineer':
            if($PE_flag)
                $PE_sql = $PE_sql.", ";
            else
                $PE_flag = true;
            $PE_sql = $PE_sql."(\"".$strJsonFileContents[$index]['working_id'].
            "\", \"".$strJsonFileContents[$index]['group_id'].
            "\", \"".$strJsonFileContents[$index]['start_date'].
            "\", \"".$strJsonFileContents[$index]['end_date'].
            "\")";
            break;
        
        case 'SecondaryEngineer':
            if($SE_flag)
                $SE_sql = $SE_sql.", ";
            else
                $SE_flag = true;
            $SE_sql = $SE_sql."(\"".$strJsonFileContents[$index]['working_id'].
            "\", \"".$strJsonFileContents[$index]['group_id'].
            "\", \"".$strJsonFileContents[$index]['start_date'].
            "\", \"".$strJsonFileContents[$index]['end_date'].
            "\")";
            break;

        case 'EscalationManager':
            if($EM_flag)
                $EM_sql = $EM_sql.", ";
            else
                $EM_flag = true;
            $EM_sql = $EM_sql."(\"".$strJsonFileContents[$index]['working_id'].
            "\", \"".$strJsonFileContents[$index]['group_id'].
            "\", \"".$strJsonFileContents[$index]['start_date'].
            "\", \"".$strJsonFileContents[$index]['end_date'].
            "\")";
            break;

        default:
            # code...
            break;
    }
}

$PE_sql = $PE_sql.";";
$SE_sql = $SE_sql.";";
$EM_sql = $EM_sql.";";

$sql = $PE_sql.$SE_sql.$EM_sql;
// echo $sql;

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo "Initialise employee profile Success";
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
?>