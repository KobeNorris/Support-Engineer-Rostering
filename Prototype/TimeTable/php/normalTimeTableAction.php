<?php
function normalInsert(){
    global $tableList;

    $block = json_decode($_POST['block']);
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
    $employeeNum = getNumOfEmployeeWithSameJobInOneGroup($block->group_id, $block->job_role);
    if(date("Y-m-d",strtotime("+6 day",strtotime($block->start_date))) != $block->end_date){
        echo "Wrong time interval".$block->start_date." ".$block->end_date;
        return false;
    }else if(date("w", strtotime($block->start_date)) != 2){
        echo "Wrong weekday";
        return false;
    }
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

function normalDelete(){
    global $tableList;

    $block = json_decode($_POST['block']);
    $sql =  "DELETE FROM ".$tableList[getJobRoleIndex(getJobRole($block->working_id))].
            " WHERE working_id=\"".$block->working_id."\"".
            " AND group_id=\"".$block->group_id."\"".
            " AND start_date=\"".$block->start_date."\"".
            " AND end_date=\"".$block->end_date."\";";
        
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
?>