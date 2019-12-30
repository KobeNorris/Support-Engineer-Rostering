<?php
include_once("./db_connection.php");
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

    case 'repeatInsert':
        repeatInsert();
        break;

    default:
        # code...
        break;
}

function getTimeTableOfMonth(){
    global $roleList, $tableList;

    $group_id = "Customer Nottingham";

    // $date = strtotime("2019-12-01");
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

function normalInsert(){
    global $tableList;

    $block = json_decode($_POST['block']);
    // (Object)$block = new stdClass;
    // $block->working_id = "scykw1";
    // $block->group_id = "Customer Nottingham";
    // $block->start_date = "2020-01-14";
    // $block->end_date = "2020-01-20";

    if(normalCheck($block)){
        $sql =  "INSERT INTO ".$tableList[getJobRoleIndex($block->job_role)].
                " (working_id, group_id, start_date, end_date) VALUES (\"".
                $block->working_id."\", \"".
                $block->group_id."\", \"".
                $block->start_date."\", \"".
                $block->end_date."\");";

        try{
            $dbh=PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();

            echo "Success";
            return true;
        }catch(PDOException $error){
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        }
    }else{
        return false;
    }
}

function normalCheck($block){
    global $roleList, $tableList;

    //Check empty
    foreach($block as $key => $value){
        if($value == ""){
            echo $key." is emptied";
            return false;
        }
    }

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
        }else if($row['job_role'] != $block->job_role){
            echo "The employee's correct job role is ".$row['job_role'];
            return false;
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
    if(date("Y-m-d",strtotime("+6 day",strtotime($block->start_date))) != $block->end_date){
        echo "Wrong time interval".$block->start_date." ".$block->end_date;
        return false;
    }else if(date("w", strtotime($block->start_date)) != 2){
        echo "Wrong weekday";
        return false;
    }


    $employeeNum = getNumOfEmployeeWithSameJobInOneGroup($block->group_id, $block->job_role);
    // echo $employeeNum;
    if($employeeNum >= 2){
        $employeeNum = $employeeNum - 2;
    }else{
        $employeeNum = 0;
    }
    $newStart = date("Y-m-d",strtotime("-".$employeeNum." week",strtotime($block->start_date)));
    $newEnd = date("Y-m-d",strtotime("+".$employeeNum." week",strtotime($block->end_date)));
    $timeTable_sql =    "SELECT * FROM ".$tableList[getJobRoleIndex($block->job_role)]." WHERE group_id=\"".$block->group_id."\" ".
                        "AND working_id=\"".$block->working_id."\" ".
                        "AND (( start_date>=\"".$newStart."\" AND start_date<=\"".$newEnd."\") ".
                        "OR ( end_date>=\"".$newStart."\" AND end_date<=\"".$newEnd."\"));";

    // echo $timeTable_sql;



    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($timeTable_sql);
        $stmt->execute();
                    
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if($row != null){
            if($row['start_date'] == $block->start_date." 00:00:00" && $row['end_date'] == $block->end_date." 00:00:00")
                echo "Position occupied by ".$block->working_id;
            else
                echo "The employee is over working";
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

function getJobRoleIndex($job_role){
    global $roleList;

    for($iTemp = 0; $iTemp < sizeof($roleList); $iTemp++){
        if($job_role == $roleList[$iTemp])
            break;
    }

    return $iTemp;
}

function normalDelete(){
    global $tableList;

    $block = json_decode($_POST['block']);

    $sql =  "DELETE FROM ".$tableList[getJobRoleIndex(getJobRole($block->working_id))].
            " WHERE working_id=\"".$block->working_id."\"".
            " AND group_id=\"".$block->group_id."\"".
            " AND start_date=\"".$block->start_date."\"".
            " AND end_date=\"".$block->end_date."\";";

    // echo $sql;

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

function repeatInsert(){
    $block = json_decode($_POST['block']);
    // (Object)$block = new stdClass;
    // $block->working_id = "scykw1";
    // $block->job_role = "PrimaryEngineer";
    // $block->group_id = "Customer Nottingham";
    // $block->start_date = "2020-01-14";
    // $block->end_date = "2020-01-20";
    // $block->interval = "2"; //Bigger than 0
    // $block->end = "Year";
    // // $block->endValue = "";
    // // $block->endValue = "5";
    // $block->endValue = "2020-05-01";

    //Check empty
    foreach($block as $key => $value){
        if($value == ""){
            echo $key." is emptied";
            return false;
        }
    }

    switch($block->end){
        case 'Year':
            yearRepeat($block);
            break;

        case 'Time':
            timeRepeat($block);
            break;
        
        case 'Date':
            dateRepeat($block);
            break;

        default:
            echo "Database error";
    }
}

function yearRepeat($block){
    $initStart = date("Y-m-d", strtotime($block->start_date));
    $initEnd = date("Y-m-d", strtotime($block->end_date));

    $tardetStart = date("Y-m-d", strtotime("+1 year", strtotime($block->start_date)));
    $tardetEnd = date("Y-m-d", strtotime("+1 year", strtotime($block->end_date)));

    repeatInsertAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd);
}

function timeRepeat($block){
    $initStart = $block->start_date;
    $initEnd = $block->end_date;

    $tardetStart = $block->start_date;
    $tardetEnd = $block->end_date;
    for($iTemp = 0; $iTemp < $block->endValue * $block->interval; $iTemp++){
        $tardetStart = date("Y-m-d", strtotime("+1 week", strtotime($tardetStart)));
        $tardetEnd = date("Y-m-d", strtotime("+1 week", strtotime($tardetEnd)));
    }

    repeatInsertAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd);
}

function dateRepeat($block){
    $initStart = $block->start_date;
    $initEnd = $block->end_date;

    $tardetStart = $block->endValue;
    $tardetEnd = $block->endValue;

    repeatInsertAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd);
}

function repeatInsertAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd){
    $flag = true;
    $repeat_time = 0;

    while($block->start_date < $tardetStart && $block->start_date < $tardetEnd){
        $repeat_time++;
        if(normalCheck($block)){
            // $sql =  "INSERT INTO ".$tableList[getJobRoleIndex($block->job_role)].
            //         " (working_id, group_id, start_date, end_date) VALUES (\"".
            //         $block->working_id."\", \"".
            //         $block->group_id."\", \"".
            //         $block->start_date."\", \"".
            //         $block->end_date."\");";

            // try{
            //     $dbh=PDOProvider();
            //     $stmt=$dbh->prepare($sql);
            //     $stmt->execute();
            // }catch(PDOException $error){
            //     echo 'SQL Query:'.$sql.'</br>';
            //     echo 'Connection failed:'.$error->getMessage();
            // }
            echo "Success";
        }else{
            repeatDelete();
            $flag = false;
            break;
        }

        $block->start_date = date("Y-m-d", strtotime("+".$block->interval." week", strtotime($block->start_date)));
        $block->end_date = date("Y-m-d", strtotime("+".$block->interval." week", strtotime($block->end_date)));
    }
    if($flag){
        $sql =  "INSERT INTO repeat_task".
        " (working_id, group_id, job_role, start_date, end_date, repeat_interval, repeat_time) VALUES (\"".
        $block->working_id."\", \"".
        $block->group_id."\", \"".
        $block->job_role."\", \"".
        $initStart."\", \"".
        $initEnd."\", \"".
        $block->interval."\", \"".
        $repeat_time."\");";

        try{
            $dbh=PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();

            echo "Final Success";
        }catch(PDOException $error){
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        } 
    }
}
?>