<?php
function repeatInsert(){
    $block = json_decode($_POST['block']);

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
    global $tableList;

    $flag = true;
    $repeat_time = 0;

    while($block->start_date < $tardetStart && $block->start_date < $tardetEnd){
        $repeat_time++;
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
            }catch(PDOException $error){
                echo 'SQL Query:'.$sql.'</br>';
                echo 'Connection failed:'.$error->getMessage();
            }
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

            echo "Success";
            // echo $sql;
        }catch(PDOException $error){
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        } 
    }
}

function repeatDelete(){
    $block = json_decode($_POST['block']);

    //Check empty
    foreach($block as $key => $value){
        if($value == ""){
            echo $key." is emptied";
            return false;
        }
    }

    $sql =  "SELECT COUNT(*) FROM repeat_task WHERE ".
            "working_id=\"".$block->working_id."\" AND ".
            "group_id=\"".$block->group_id."\" AND ".
            "job_role=\"".$block->job_role."\" AND ".
            "start_date=\"".$block->start_date." 00:00:00\" AND ".
            "end_date=\"".$block->end_date." 00:00:00\" AND ".
            "repeat_interval=\"".$block->interval."\" AND ".
            "repeat_time=\"".$block->endValue."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if($row['COUNT(*)'] != 1)
            echo "Failed: ".$row['COUNT(*)']." blocks has been found";
        else{
            $initStart = $block->start_date;
            $initEnd = $block->end_date;

            $tardetStart = $block->start_date;
            $tardetEnd = $block->end_date;
            for($iTemp = 0; $iTemp < $block->endValue * $block->interval; $iTemp++){
                $tardetStart = date("Y-m-d", strtotime("+1 week", strtotime($tardetStart)));
                $tardetEnd = date("Y-m-d", strtotime("+1 week", strtotime($tardetEnd)));
            }

            repeatDeleteAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd);
        }
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    } 
}

function repeatDeleteAction($block, $initStart, $initEnd, $tardetStart, $tardetEnd){
    global $tableList;

    while($block->start_date < $tardetStart && $block->start_date < $tardetEnd){
        $sql =  "DELETE FROM ".$tableList[getJobRoleIndex($block->job_role)]." WHERE ".
                "working_id=\"".$block->working_id."\" AND ".
                "group_id=\"".$block->group_id."\" AND ".
                "start_date=\"".$block->start_date."\" AND ".
                "end_date=\"". $block->end_date."\";";

        try{
            $dbh=PDOProvider();
            $stmt=$dbh->prepare($sql);
            $stmt->execute();
        }catch(PDOException $error){
            echo 'SQL Query:'.$sql.'</br>';
            echo 'Connection failed:'.$error->getMessage();
        }

        $block->start_date = date("Y-m-d", strtotime("+".$block->interval." week", strtotime($block->start_date)));
        $block->end_date = date("Y-m-d", strtotime("+".$block->interval." week", strtotime($block->end_date)));
    }

    $sql =  "DELETE FROM repeat_task WHERE ".
            "working_id=\"".$block->working_id."\" AND ".
            "group_id=\"".$block->group_id."\" AND ".
            "job_role=\"".$block->job_role."\" AND ".
            "start_date=\"".$initStart." 00:00:00\" AND ".
            "end_date=\"".$initEnd." 00:00:00\" AND ".
            "repeat_interval=\"".$block->interval."\" AND ".
            "repeat_time=\"".$block->endValue."\";";

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

function getRepeatTask(){
    $block = json_decode($_POST['block']);
    $sql =  "SELECT * FROM repeat_task WHERE ".
            "working_id=\"".$block->working_id."\" AND ".
            "job_role=\"".$block->job_role."\" AND ".
            "group_id=\"".$block->group_id."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
        
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            // echo json_encode($row);
            $initStart = date("Y-m-d", strtotime($row['start_date']));
            $initEnd = date("Y-m-d", strtotime($row['end_date']));

            $tardetStart = $initStart;
            $tardetEnd = $initEnd;
            for($iTemp = 0; $iTemp < $row["repeat_time"]; $iTemp++){
                if($tardetStart == $block->start_date && $tardetEnd == $block->end_date){
                    $block->start_date = $initStart;
                    $block->end_date = $initEnd;
                    $block->interval = $row["repeat_interval"];
                    $block->end = "Time";
                    $block->endValue = $row["repeat_time"];
                    echo json_encode($block);
                    return true;
                }
                $tardetStart = date("Y-m-d", strtotime("+".$row["repeat_interval"]." week", strtotime($tardetStart)));
                $tardetEnd = date("Y-m-d", strtotime("+".$row["repeat_interval"]." week", strtotime($tardetEnd)));
            }
        }

        return false;
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}
?>