<?php
include_once("./db_connection.php");
$roleList = ['PrimaryEngineer','SecondaryEngineer','EscalationManager'];
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
    global $roleList, $tableList;

    // // $date = strtotime("2019-12-01");
    // // $date = strtotime("2019-10-27");
    // $date = strtotime($_POST['firstDate']);

    // $group_id = "Customer Nottingham";
    // $date = strtoTime("-5 day", $date);

    // $monthData = array();

    // for($weekCounter = 0; $weekCounter < 7; $weekCounter++){
    //     $tempStart = date("Y-m-d", $date);
    //     $tempEnd = date("Y-m-d", strtoTime("+6 day", $date));
    //     $date = strtoTime("+1 week", $date);

    //     for($index = 0; $index < sizeof($roleList); $index++){
    //         $block = array();
    //         $sql = "SELECT * FROM ".$tableList[$index]." WHERE group_id=\"".$group_id.
    //         "\" AND (start=\"".$tempStart."\" AND end=\"".$tempEnd."\");";

    //         try {
    //             $dbh=PDOProvider();
    //             $stmt=$dbh->prepare($sql);
    //             $stmt->execute();
            
    //             $row=$stmt->fetch(PDO::FETCH_ASSOC);
    //             $block['working_id'] = $row['working_id'];
    //             $block['job_role'] = $roleList[$index];
    //             $block['start_date'] = date("Y-m-d", strtoTime($tempStart))."";
    //             $block['end_date'] = date("Y-m-d", strtoTime($tempEnd))."";
    //         } catch (PDOException $error) {
    //             echo 'SQL Query:'.$sql.'</br>';
    //             echo 'Connection failed:'.$error->getMessage();
    //         }
            
    //         $sql = "SELECT * FROM employee_profile WHERE working_id=\"".$block['working_id']."\";";

    //         try {
    //             $dbh=PDOProvider();
    //             $stmt=$dbh->prepare($sql);
    //             $stmt->execute();
            
    //             $row=$stmt->fetch(PDO::FETCH_ASSOC);
    //             $block['name'] = $row['name'];
    //         } catch (PDOException $error) {
    //             echo 'SQL Query:'.$sql.'</br>';
    //             echo 'Connection failed:'.$error->getMessage();
    //         }

    //         array_push($monthData, $block);
    //     }
    // }

    $group_id = "Customer Nottingham";

    // $date = strtotime("2019-11-24");
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
                "(start=\"".$startDate[0]."\" AND end=\"".$endDate[0]."\") OR ".
                "(start=\"".$startDate[1]."\" AND end=\"".$endDate[1]."\") OR ".
                "(start=\"".$startDate[2]."\" AND end=\"".$endDate[2]."\") OR ".
                "(start=\"".$startDate[3]."\" AND end=\"".$endDate[3]."\") OR ".
                "(start=\"".$startDate[4]."\" AND end=\"".$endDate[4]."\") OR ".
                "(start=\"".$startDate[5]."\" AND end=\"".$endDate[5]."\") OR ".
                "(start=\"".$startDate[6]."\" AND end=\"".$endDate[6]."\"))".
                "ORDER BY start ASC;";

    for($job_roleCounter = 0; $job_roleCounter < 3; $job_roleCounter++){
        $sql = "SELECT * FROM employee_profile AS a INNER JOIN ".$tableList[$job_roleCounter]." AS b ON a.working_id = b.working_id".$sql_tail;

        try {
            $dbh=PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();
            
            $row_flag = true;
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $newWeekCounter = 0;
                while($row['start'] != $monthData[3 * $newWeekCounter + $job_roleCounter]['start_date']." 00:00:00"){
                    $newWeekCounter++;
                    if($newWeekCounter >= 7){
                        $row_flag = false;
                        echo "error: row.start = ".$row['start'];
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

function insertBlockIntoTimeTable(){
    // $block = json_decode($_POST['block']);
}
?>