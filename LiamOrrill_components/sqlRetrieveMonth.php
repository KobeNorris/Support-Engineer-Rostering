<?php
function sqlMonthData(){
include 'db_connection.php';
$conn = openCon();
$jsonFile = file_get_contents('getMonthData.json');
$dataMonth = json_decode($jsonFile,true);
   var_dump($dataMonth);
$dataCount = count($dataMonth['working_id']);
if($dataCount > 0){
  for($i = 0;$i < $dataCount;$i++){
      echo $dataCount;
  }
}


//$sql = "SELECT * FROM entireArchive WHERE start = '".$dataMonth[0]->working_id."' and end = '".$monthData->endDate."'";
//$stmt = $conn->query($sql);
//while($row = $stmt->fetch_assoc()){
//    $data[] = array('working_id' => $row['working_id'], 'Role' => $row['role'], 'Start' =>$row['start'],'end' => $row['end']);
//}
//$response = $data;
closeCon($conn);
//return json_encode($response);
}

sqlMonthData();




?>
