<?php
include_once("db_connection.php");

// getEmployeeReport();
switch ($_POST['action']) {
    case 'getReportData':
        getEmployeeReport();
        break;

    case 'getEmployeeInfo':
        getEmployeeInfo();
        break;

    default:
        echo "Undefined action ".$_POST['action'];
        break;
}

function getEmployeeReport(){
    $year = $_POST['year'];
    $month = $_POST['month'];
    $working_id = $_POST['working_id'];

    switch ($_POST['job_role']) {
        case 'PrimaryEngineer':
            $job_role = "primary_engineer";
            break;

        case 'SecondaryEngineer':
            $job_role = "secondary_engineer";
            break;

        case 'EscalationManager':
            $job_role = "escalation_manager";
            break;
        
        default:
            echo "Undefined job role :".$_POST['job_role'];
            break;
    }

    // $year = "2019";
    // $month = "12";
    // $working_id = "scykw1";
    // $job_role = "primary_engineer";

    $start_date = date("Y-m-d",strtotime($year."-".$month."-00"));
    $end_date = date("Y-m-d",strtotime("+1 day", strtotime("+1 month",strtotime($start_date))));

    $sql = "SELECT * FROM ".$job_role." WHERE working_id = \"".$working_id.
    "\" AND (( start_date > \"".$start_date."\" AND start_date < \"".$end_date.
    "\") OR ( end_date > \"".$start_date."\" AND end_date < \"".$end_date."\"));";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $report = array();
        for($index_date = date("Y-m-d",strtotime("+1 day", strtotime($start_date))); $index_date < $end_date; $index_date = date("Y-m-d",strtotime("+1 day", strtotime($index_date)))){
            $block = array();
            $block['date'] = $index_date;
            $block['onDuty'] = "N";
            array_push($report, $block);
        }

        while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            for($index_date = $row['start_date']; $index_date <= $row['end_date']; $index_date = date("Y-m-d",strtotime("+1 day", strtotime($index_date)))){
                if($index_date > $start_date && $index_date < $end_date){
                    $date = date("d", strtotime($index_date));
                    $report[$date - 1]["onDuty"] = "Y";
                }
            }
        }

        echo json_encode($report);
        
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function getEmployeeInfo(){
    $working_id = $_POST['working_id'];

    $sql = "SELECT * FROM employee_profile WHERE working_id =\"".$working_id."\";";

    try{
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $employeeProfile = array();
        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        $employeeProfile['name'] = $row['name'];
        $employeeProfile['working_id'] = $row['working_id'];
        $employeeProfile['phone_number'] = $row['phone_number'];
        $employeeProfile['group_id'] = $row['group_id'];

        echo json_encode($employeeProfile);
        
    }catch(PDOException $error){
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}
?>