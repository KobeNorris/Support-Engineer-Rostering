<?php
include_once("db_connection.php");

switch ($_POST['action']) {
    case 'create':
        createEmployee();
        break;

    case 'delete':
        deleteEmployee();
        break;

    case 'get':
        getEmployeeInfo();
        break;

    default:
        # code...
        break;
}

function createEmployee(){
    $working_id = $_POST['working_id'];
    $employeePassword = $_POST['password'];

    checkDuplicate($working_id, $employeePassword);
}

function deleteEmployee(){
    $working_id = $_POST['working_id'];

    $sql = "DELETE FROM employee_holiday WHERE working_id=\"".$working_id."\";";
    $sql = $sql."DELETE FROM employee_deployment WHERE working_id=\"".$working_id."\";";
    $sql = $sql."DELETE FROM account WHERE working_id=\"".$working_id."\";";
    $sql = $sql."DELETE FROM employee_profile WHERE working_id=\"".$working_id."\";";

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

function getEmployeeInfo(){
    $profileList = array();

<<<<<<< HEAD
    $sql = "SELECT * FROM employee_profile;";
=======
    $sql = "SELECT * FROM employee_profile ORDER BY group_id;";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
            $profile = array();
            $profile['name'] = $row['name'];
            $profile['group_id'] = $row['group_id'];
            $profile['status'] = $row['status'];
            $profile['working_id'] = $row['working_id'];
            array_push($profileList, $profile);
        }

        echo json_encode($profileList);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function checkDuplicate($working_id, $employeePassword){

    $sql = "SELECT COUNT(*) FROM employee_profile WHERE working_id=\"".$working_id."\";";

    try {
        $dbh=PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        
        if(implode($row) == "0"){
            uploadEmployee($working_id, $employeePassword);
        }else{
            echo "duplicate working_id";
        }
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

function uploadEmployee($working_id, $employeePassword){

    $sql = "INSERT INTO account VALUES (\"".$working_id."\", \"".$employeePassword."\");";
<<<<<<< HEAD
    $sql =  $sql."INSERT INTO employee_profile (working_id, status, account_type) VALUES (\"".$working_id."\", \"".false."\", \"employee\");";
=======
    $sql =  $sql."INSERT INTO employee_profile (working_id, status, account_type, group_id) VALUES (\"".$working_id."\", \"".false."\", \"employee\", \"\");";
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
    
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