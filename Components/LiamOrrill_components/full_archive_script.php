<?php
include "db_connection.php";
$conn = openCon();
$sql = "INSERT INTO entirearchive (working_id, role, start,end)
SELECT  working_id, role, start,end FROM monthlytimetable";
if($conn->query($sql) === TRUE){
  echo "successfully added to archive";
}else{
  echo "Failed to add to the archive";
}
closeCon($conn);
?>
