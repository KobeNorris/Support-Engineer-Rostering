<?php
include_once("./db_connection.php");
$groupList = ['PrimaryEngineer','SecondaryEngineer','EscalationManager'];
$tableList = ['primary_engineer','secondary_engineer','escalation_manager'];


switch ($_POST['action']) {
    case 'get':
        getTimeTableOfMonth();
        break;
    
    case 'insert':
        insertBlockIntoTimeTable();
        break;

    default:
        # code...
        break;
}

function getTimeTableOfMonth(){
    global $groupList, $tableList;

    // $date = strtotime("2019-12-01");
    // $date = strtotime("2019-10-27");
    $date = strtotime($_POST['firstDate']);

    $group_id = "Customer Nottingham";
    $date = strtoTime("-5 day", $date);

    $monthData = array();

    for($weekCounter = 0; $weekCounter < 7; $weekCounter++){
        $tempStart = date("Y-m-d", $date);
        $tempEnd = date("Y-m-d", strtoTime("+6 day", $date));
        $date = strtoTime("+1 week", $date);

        for($index = 0; $index < sizeof($groupList); $index++){
            $block = array();
            $sql = "SELECT * FROM ".$tableList[$index]." WHERE group_id=\"".$group_id.
            "\" AND (start=\"".$tempStart."\" AND end=\"".$tempEnd."\");";

            try {
                $dbh=PDOProvider();
                $stmt=$dbh->prepare($sql);
                $stmt->execute();
            
                $row=$stmt->fetch(PDO::FETCH_ASSOC);
                $block['working_id'] = $row['working_id'];
                $block['job_role'] = $groupList[$index];
                $block['start_date'] = date("Y-m-d", strtoTime($tempStart))."";
                $block['end_date'] = date("Y-m-d", strtoTime($tempEnd))."";
            } catch (PDOException $error) {
                echo 'SQL Query:'.$sql.'</br>';
                echo 'Connection failed:'.$error->getMessage();
            }

            // if($block['working_id'] == null)
            //     $block['name'] = "";
            // else{
            //     $sql = "SELECT * FROM employee_profile WHERE working_id=\"".$block['working_id']."\";";
            // }
            $sql = "SELECT * FROM employee_profile WHERE working_id=\"".$block['working_id']."\";";

            try {
                $dbh=PDOProvider();
                $stmt=$dbh->prepare($sql);
                $stmt->execute();
            
                $row=$stmt->fetch(PDO::FETCH_ASSOC);
                $block['name'] = $row['name'];
            } catch (PDOException $error) {
                echo 'SQL Query:'.$sql.'</br>';
                echo 'Connection failed:'.$error->getMessage();
            }

            array_push($monthData, $block);
        }
    }
    echo json_encode($monthData);
}

function insertBlockIntoTimeTable(){
    $block = json_decode($_POST['block']);
}
?>