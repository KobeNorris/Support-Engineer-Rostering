<?php
include_once("db_connection.php");

switch ($_POST['action']) {
    case 'get':
        getEmployeeInfo();
        break;

    default:
        # code...
        break;
}

function getEmployeeInfo(){
    $profileList = array();
    $sql = "SELECT * FROM employee_profile;";
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

?>