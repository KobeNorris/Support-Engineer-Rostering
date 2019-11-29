<?php
function sqlMonthData(){
include 'db_connection.php';
$conn = openCon();
$jsonFile = file_get_contents('getMonthData.json');
$dataMonth = json_decode($jsonFile,true);
   var_dump($dataMonth);

$escalatorTimetable = array();
$primaryTimetable = array();
$secondaryTimetable = array();
$block = array();
$workingIDList = array();
echo "<br><br>";

foreach($dataMonth as $key=>$val){
  echo $val["workingID"]."<br />" . $val["startDate"]."<br />" . $val["endDate"]."<br />" . $val["jobRole"]."<br />";
  echo "<br><br>";

  array_push($block, $val['workingID'],$val['jobRole'],$val['startDate'],$val['endDate']);
}
  array_push($workingIDList, $block);



for ($count=0; $count < sizeof($workingIDList) ; $count++) {
  echo $workingIDList[$count][$count];
}

closeCon($conn);
/*echo "<br><br><br>";
for ($count=0; $count <sizeof($workingIDList) ; $count++) {
    echo "<br><br>";
    echo implode("",$workingIDList[$count]);
}
echo "<br><br><br><br>";#
for ($count=0; $count <sizeof($workingIDList) ; $count++) {
echo implode("",$workingIDList[$count]);
}#*/
}


//$sql = "SELECT * FROM entireArchive WHERE start = '".$dataMonth[0]->working_id."' and end = '".$monthData->endDate."'";
//$stmt = $conn->query($sql);
//while($row = $stmt->fetch_assoc()){
//    $data[] = array('working_id' => $row['working_id'], 'Role' => $row['role'], 'Start' =>$row['start'],'end' => $row['end']);
//}
//$response = $data;

//return json_encode($response);

sqlMonthData();




?>
