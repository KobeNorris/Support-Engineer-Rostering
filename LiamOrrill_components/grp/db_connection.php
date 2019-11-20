<?php
function openCon(){
  $dbhost = "localhost";
  $dbuser = "team35";
  $dbpass = "team35";
  $db = "timetable";
  $conn = new mysqli($dbhost,$dbuser,$dbpass,$db) or die("Connection failed %d\n".$conn->error);
  return $conn;
}
function closeCon($conn){
  $conn->close();
}
?>
