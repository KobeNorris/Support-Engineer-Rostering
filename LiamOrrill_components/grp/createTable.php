<?php
include "db_connection.php";
$conn = openCon();

$sql = "CREATE TABLE primaryEng (
unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
working_id VARCHAR(11) NOT NULL,
role VARCHAR(20) NOT NULL,
start DATE,
end   DATE)";

if($conn->query($sql) === TRUE){
    echo "Table Primary made successfully<br>";
}else{
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE secondaryEng (
  unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  working_id VARCHAR(11) NOT NULL,
  role VARCHAR(20) NOT NULL,
  start DATE,
  end   DATE)";

if($conn->query($sql) === TRUE){
    echo "Table Secondary made successfully<br>";
}else{
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE escalationManager (
  unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  working_id VARCHAR(11) NOT NULL,
  role VARCHAR(20) NOT NULL,
  start DATE,
  end   DATE)";

if($conn->query($sql) === TRUE){
    echo "Table EscalationManager made successfully<br>";
}else{
    echo "Error creating table: " . $conn->error;
}


$sql = "CREATE TABLE monthlyTimetable(
  unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  working_id VARCHAR(11) NOT NULL,
  role VARCHAR(20) NOT NULL,
  start DATE,
  end   DATE
)";

if($conn->query($sql) === TRUE){
    echo "Table EscalationManager made successfully<br>";
}else{
    echo "Error creating table: " . $conn->error;
}

$sql = "CREATE TABLE entireArchive (
  unique_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  working_id VARCHAR(11) NOT NULL,
  role VARCHAR(20) NOT NULL,
  start DATE,
  end   DATE
)";

if($conn->query($sql) === TRUE){
    echo "Table Entire Archive made successfully<br>";
}else{
    echo "Error creating table: " . $conn->error;
}

closeCon($conn);
?>
