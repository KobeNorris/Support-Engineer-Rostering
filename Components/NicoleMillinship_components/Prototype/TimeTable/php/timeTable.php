<?php
include_once("./db_connection.php");
include_once("./normalTimeTableAction.php");
include_once("./repeatTimeTableAction.php");

$roleList = ['PrimaryEngineer','SecondaryEngineer','EscalationManager'];
$tableList = ['primary_engineer','secondary_engineer','escalation_manager'];

switch ($_POST['action']) {
    case 'get':
        getTimeTableOfMonth();
        break;
    
    case 'normalInsert':
        normalInsert();
        break;

    case 'normalDelete':
        normalDelete();
        break;

    case 'getRepeatTask':
        getRepeatTask();
        break;

    case 'repeatInsert':
        repeatInsert();
        break;

    case 'repeatDelete':
        repeatDelete();
        break;

    default:
        echo 'Unidentified action '.$_POST['action'];
        break;
}

function getTimeTableOfMonth(){
    global $roleList, $tableList;

    $group_id = $_POST['group_id'];

    $date = strtotime($_POST['firstDate']);
    $date = strtoTime("-5 day", $date);
    $startDate = array(7);
    $endDate = array(7);
    $monthData = array(21);

    for($weekCounter = 0; $weekCounter < 7; $weekCounter++){
        $tempStart = date("Y-m-d", $date);
        $tempEnd = date("Y-m-d", strtoTime("+6 day", $date));
        $date = strtoTime("+1 week", $date);

        $startDate[$weekCounter] = $tempStart;
        $endDate[$weekCounter] = $tempEnd;

        for($roleIndex = 0; $roleIndex < 3; $roleIndex++){
            $block = array();
            $block['name'] = "";
            $block['working_id'] = "";
            $block['job_role'] = $roleList[$roleIndex];
            $block['start_date'] = $startDate[$weekCounter];
            $block['end_date'] = $endDate[$weekCounter];
            $monthData[$weekCounter * 3 + $roleIndex] = $block;
        }
    }

    $sql_tail = " WHERE a.group_id=\"".$group_id."\" AND (".
                "(start_date=\"".$startDate[0]."\" AND end_date=\"".$endDate[0]."\") OR ".
                "(start_date=\"".$startDate[1]."\" AND end_date=\"".$endDate[1]."\") OR ".
                "(start_date=\"".$startDate[2]."\" AND end_date=\"".$endDate[2]."\") OR ".
                "(start_date=\"".$startDate[3]."\" AND end_date=\"".$endDate[3]."\") OR ".
                "(start_date=\"".$startDate[4]."\" AND end_date=\"".$endDate[4]."\") OR ".
                "(start_date=\"".$startDate[5]."\" AND end_date=\"".$endDate[5]."\") OR ".
                "(start_date=\"".$startDate[6]."\" AND end_date=\"".$endDate[6]."\"))".
                "ORDER BY start_date ASC;";

    for($job_roleCounter = 0; $job_roleCounter < 3; $job_roleCounter++){
        $sql = "SELECT * FROM employee_profile AS a INNER JOIN ".$tableList[$job_roleCounter]." AS b ON a.working_id = b.working_id".$sql_tail;

        try {
            $dbh=PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();
            
            $row_flag = true;
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $newWeekCounter = 0;
                while($row['start_date'] != $monthData[3 * $newWeekCounter + $job_roleCounter]['start_date']." 00:00:00"){
                    $newWeekCounter++;
                    if($newWeekCounter >= 7){
                        $row_flag = false;
                        echo "error: row.start_date = ".$row['start_date'];
                        break;
                    }
                }
                if($row_flag){
                    $monthData[3 * $newWeekCounter + $job_roleCounter]['name'] = $row['name'];
                    $monthData[3 * $newWeekCounter + $job_roleCounter]['working_id'] = $row['working_id'];
                }
            }
        } catch (PDOException $error) {
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        }
    }

    echo json_encode($monthData);
}

function getNumOfEmployeeWithSameJobInOneGroup($group_id, $job_role){
    $sql = "SELECT COUNT(working_id) FROM employee_profile WHERE group_id=\"".$group_id."\" AND job_role=\"".$job_role."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        if($row['COUNT(working_id)'] > 2)
            return $row['COUNT(working_id)'] - 2;
        else
            return 0;
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function getJobRole($working_id){
    $sql = "SELECT * FROM employee_profile WHERE working_id=\"".$working_id."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
                    
        return $row['job_role'];
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function getJobRoleIndex($job_role){
    global $roleList;

    for($iTemp = 0; $iTemp < sizeof($roleList); $iTemp++){
        if($job_role == $roleList[$iTemp])
            break;
    }

    return $iTemp;
}
?>