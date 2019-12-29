<?php
include_once("./db_connection.php");
$roleList = ['PrimaryEngineer','SecondaryEngineer','EscalationManager'];
$tableList = ['primary_engineer','secondary_engineer','escalation_manager'];
$GLOBALS['job_role'] = "";


// switch ($_POST['action']) {
//     case 'get':
//         getTimeTableOfMonth();
//         break;
    
//     case 'normalInsert':
//         insertBlockIntoTimeTable();
//         break;

//     default:
//         # code...
//         break;
// }

getTimeTableOfMonth();

// insertBlockIntoTimeTable();

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

    $group_id = "CustomerNottingham";

    $date = strtotime("2019-11-24");
    // $date = strtotime($_POST['firstDate']);
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

        echo $sql;
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
    global $tableList;

    $block = json_decode($_POST['block']);

    if(check($block)){
        if($GLOBALS['job_role'] == ""){
            echo "Database error";
            return false;
        }else{
            $sql =  "INSERT INTO ".$tableList[getJobRoleIndex($GLOBALS['job_role'])]." (working_id, group_id, start, end) VALUES (\"".
                    $block->working_id."\", \"".
                    $block->group_id."\", \"".
                    $block->start_date."\", \"".
                    $block->end_date."\");";

            try{
                $dbh=PDOProvider();
                $stmt=$dbh->prepare($sql);
                $stmt->execute();

                echo "Success";
            }catch(PDOException $error){
                echo 'SQL Query:'.$sql.'</br>';
                echo 'Connection failed:'.$error->getMessage();
            }
        }
    }else{
        return false;
    }
}

function check($block){
    global $roleList, $tableList;

    //Status
    $profile_sql = "SELECT * FROM employee_profile WHERE working_id=\"".$block->working_id."\";";
    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($profile_sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        if(!$row['status']){
            echo "The employee is inactive";
            return false;
        }else{
            $GLOBALS['job_role'] = $row['job_role'];
        }
    }catch(PDOException $error){
        echo 'SQL Query:'.$profile_sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }

    //Holiday
    $prevDay = date("Y-m-d",strtotime("-1 day",strtotime($block->start_date)));
    $holiday_sql =  "SELECT * FROM employee_holiday WHERE working_id=\"".$block->working_id."\" ".
                    "AND (( start_date>=\"".$prevDay."\" AND start_date<=\"".$block->end_date."\") ".
                    "OR ( end_date>=\"".$prevDay."\" AND end_date<=\"".$block->end_date."\"));";
    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($holiday_sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        if($row != null){
            echo "The employee's holiday from ".$row['start_date']." to ".$row['end_date'];
            return false;
        }
    }catch(PDOException $error){
        echo 'SQL Query:'.$holiday_sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }

    //Deployment
    $deployment_sql =   "SELECT * FROM employee_holiday WHERE working_id=\"".$block->working_id."\" ".
                        "AND (( start_date>=\"".$block->start_date."\" AND start_date<=\"".$block->end_date."\") ".
                        "OR ( end_date>=\"".$block->start_date."\" AND end_date<=\"".$block->end_date."\"));";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($deployment_sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
                    
        if($row != null){
            echo "The employee's holiday from ".$row['start_date']." to ".$row['end_date'];
            return false;
        }
    }catch(PDOException $error){
        echo 'SQL Query:'.$deployment_sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }

    //TimeTable
    $employeeNum = getNumOfEmployeeWithSameJobInOneGroup($block->group_id, $GLOBALS['job_role']);
    if($employeeNum >= 2){
        $employeeNum = $employeeNum - 2;
    }else{
        $employeeNum = 0;
    }
    $newStart = date("Y-m-d",strtotime("-".$employeeNum." week",strtotime($block->start_date)));
    $newEnd = date("Y-m-d",strtotime("+".$employeeNum." week",strtotime($block->end_date)));
    $timeTable_sql =    "SELECT * FROM ".$tableList[getJobRoleIndex($GLOBALS['job_role'])]." WHERE group_id=\"".$block->group_id."\" ".
                        "AND (( start>=\"".$newStart."\" AND start<=\"".$newEnd."\") ".
                        "OR ( end>=\"".$newStart."\" AND end<=\"".$newEnd."\"));";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($timeTable_sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
                    
        if($row != null){
            if($row['start'] == $block->start_date." 00:00:00"){
                echo "Position occupied by ".$block->working_id;
            }else{
                echo "The employee is over working";
            } 
            return false;
        }
    }catch(PDOException $error){
        echo 'SQL Query:'.$timeTable_sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }

    return true;
}

function getNumOfEmployeeWithSameJobInOneGroup($group_id, $job_role){
    $sql = "SELECT COUNT(working_id) FROM employee_profile WHERE group_id=\"".$group_id."\" AND job_role=\"".$job_role."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
                    
        return $row['COUNT(working_id)'];
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function getJobRoleIndex($group_id){
    global $roleList;

    for($iTemp = 0; $iTemp < sizeof($roleList); $iTemp++){
        if($group_id == $roleList[$iTemp])
            break;
    }

    return $iTemp;
}
?>