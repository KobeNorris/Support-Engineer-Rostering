<?php
include "db_connection.php";
$conn = openCon();

$sql = "DELETE FROM monthlytimetable";
if($conn->query($sql) === TRUE){
  echo "successfully deleted ddata from monthlytimetable";
}else{
  echo "Failed to add to the archive<br>";
}
$sql = "INSERT INTO monthlytimetable (working_id, role, start,end)
SELECT working_id,role,start,end FROM primaryeng WHERE role = 'primary'";
if($conn->query($sql) === TRUE){
  echo "successfully added to monthlytimetable ";
}else{
  echo "Failed to add to the archive <br>";
}
$sql = "INSERT INTO monthlytimetable (working_id, role, start,end)
SELECT working_id,role,start,end FROM secondaryeng WHERE role = 'secondary'";
if($conn->query($sql) === TRUE){
  echo "successfully added to monthlytimetable";
}else{
  echo "Failed to add to the archive<br>";
}
$sql = "INSERT INTO monthlytimetable (working_id, role, start,end)
SELECT working_id,role,start,end FROM escalationmanager WHERE role = 'manager'";
if($conn->query($sql) === TRUE){
  echo "successfully added to monthlytimetable";
}else{
  echo "Failed to add to the archive<br>";
}
closeCon($conn);
?>
