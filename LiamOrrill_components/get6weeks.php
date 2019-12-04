
<?php
/*include "db_connection.php";
$conn = openCon();
$start = $_SESSION['minDate'];
$startEnd = date("Y-m-d h:i:s", strtotime("$start +6 weeks"));
$end = $_SESSION['maxDate'];*/
$earlyDate = file_get_contents("getMonthData.json");
$earlyDate = json_decode($earlyDate);
$earlyDate = date("Y-m-d ", strtotime("$earlyDate +1 month")); 
$earlyEnd = date("Y-m-d ", strtotime("$earlyDate +6 week"));


// $result1 = $earlyDate->format('Y-m-d H:i:s');
 //$result2 = $earlyEnd->format('Y-m-d H:i:s');

echo "<br>" . $earlyDate . "<br>" . $earlyEnd . "<br>";

include "db_connection.php";
$conn = openCon();

$sql = "SELECT * FROM entirearchive WHERE start between '$earlyDate' AND '$earlyEnd' ORDER BY start";
$stmt = $conn->query($sql);
$row = $stmt->fetch_assoc();
if($row > 0){
  echo "more than one row found<br>";
}
else{
  echo "no rows found<br>";
}

echo "<br>";

while($row = $stmt->fetch_assoc()){
    $data[] = array('working_id' => $row['working_id'], 'Role' => $row['role'], 'Start' =>$row['start'],'end' => $row['end']);
}
echo '<br><br><br>
<table width="80%" border="1" id="display">
 <thead>
  <tr>
    <th width="10%">ID</th>
    <th width="10%">Role</th>
    <th width="10%">start</th>
    <th width="15%">end</th>
  </tr>
</thead>';
foreach($data as $archiveD){
        echo "<tr class = \"row\"><td>" . $archiveD['working_id'] . "</td><td>" . $archiveD['Role'] . "</td><td>" . $archiveD['Start'] . "</td><td>" . $archiveD['end'] . "</tr>";
}
echo "Working here";
$response = $data;
$fp = fopen('data.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);


    closeCon($conn);
?>
