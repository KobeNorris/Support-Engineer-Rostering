<?php
include "db_connection.php";
$conn = openCon();
$sql = "CREATE DATABASE timetable";
if($conn->query($sql) === TRUE){
  echo "Database created successfully with the name timetable";
}else{
  echo "Error creating database:" . $conn->error;
}
//closes connection
closeCon($conn);
?>
