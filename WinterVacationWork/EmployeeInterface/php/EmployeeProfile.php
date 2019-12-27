<?php
include_once("./db_connection.php");

switch ($_POST['action']) {
    case 'get':
        getEmployeeProfile();
        break;

    case 'update':
        updateEmployeeProfile();
        break;
    
    default:
        # code...
        break;
}

function getEmployeeProfile(){
    $profileList = array();
    $working_id = $_POST['targetWorking_id'];

    $sql = "SELECT * FROM employee_profile WHERE working_id = \"".$working_id."\";";

    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
            $profile = array();
            $profile['name'] = $row['name'];
            $profile['slack_id'] = $row['slack_id'];
            $profile['group_id'] = $row['group_id'];
            $profile['email'] = $row['email'];
            $profile['phone_number'] = $row['phone_number'];
            $profile['status'] = $row['status'];
            $profile['working_id'] = $row['working_id'];
            $profile['account_type'] = $row['account_type'];
            array_push($profileList, $profile);
        }

        echo json_encode($profileList);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function updateEmployeeProfile(){
    $employeeProfile = json_decode($_POST['employeeProfile']);
    $old_working_id = $_POST['working_id'];

    $sql = "UPDATE employee_profile SET name = \"".$employeeProfile[0]->name."\", working_id = \"".$employeeProfile[0]->working_id."\", slack_id = \"".$employeeProfile[0]->slack_id."\", email = \"".$employeeProfile[0]->email."\", group_id = \"".$employeeProfile[0]->group_id."\", phone_number = \"".$employeeProfile[0]->phone_number."\", status = ".$employeeProfile[0]->status." WHERE working_id = \"".$old_working_id."\";";

    if($employeeProfile[0]->working_id != $old_working_id){
        if(isset($_SESSION['working_id'])){
            $sql = $sql."UPDATE employee_holiday SET working_id = \"".$employeeProfile[0]->working_id." WHERE working_id = \"".$old_working_id."\";";
            $sql = $sql."UPDATE employee_deployment SET working_id = \"".$employeeProfile[0]->working_id." WHERE working_id = \"".$old_working_id."\";";
            $sql = $sql."UPDATE account SET working_id = \"".$employeeProfile[0]->working_id." WHERE working_id = \"".$old_working_id."\";";
            
            $_SESSION['targetWorking_id'] = $employeeProfile[0]->working_id;
        }
    }

    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        echo "Success";
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}
?>