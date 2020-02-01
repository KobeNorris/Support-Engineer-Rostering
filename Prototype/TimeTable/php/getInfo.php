<?php
include_once("./db_connection.php");

if($_POST['action'] = 'name')
    getNameList();
else if($_POST['action'] = 'group')
    getGroupList();

function getNameList(){
    $sql = "SELECT * FROM employee_profile ORDER BY group_id DESC, name DESC;";

    $employeeList = array();
    $currentGroup = null;

    try {
        $dbh = PDOProvider();
        $stmt=$dbh->prepare($sql);
        $stmt->execute();
    
        while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            if($row['group_id'] != $currentGroup){
                $currentGroup = $row['group_id'];
                $employeeList[$row['group_id']] = array();
            }
            $employeeInfo = array();
            $employeeInfo['name'] = $row['name'];
            $employeeInfo['working_id'] = $row['working_id'];
            $employeeInfo['group_id'] = $row['group_id'];
            $employeeInfo['job_role'] = $row['job_role'];
            array_push($employeeList[$row['group_id']], $employeeInfo);
        }
            
        echo json_encode($employeeList);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

// function getGroupList(){
//     $sql = "SELECT (group_id) FROM employee_profile ORDER BY group_id DESC;";

//     $groupList = array();

//     try {
//         $dbh = PDOProvider();
//         $stmt=$dbh->prepare($sql);
//         $stmt->execute();
    
//         while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
//             array_push($groupList, $row['group_id']);
//         }
            
//         echo json_encode($groupList);
//     } catch (PDOException $error) {
//         echo 'SQL Query:'.$sql.'</br>';
//         echo 'Connection failed:'.$error->getMessage();
//     }
// }
?>