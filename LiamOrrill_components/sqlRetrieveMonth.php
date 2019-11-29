<?php
session_start();
function sqlMonthData(){
include 'db_connection.php';
$conn = openCon();
$jsonFile = file_get_contents('getMonthData.json');
$dataMonth = json_decode($jsonFile,true);
   var_dump($dataMonth);

echo "<br><br>";
$mostRecent= 0;
$maxStart  =0;
$earliestDate = 0;
foreach($dataMonth as $key=>$date){
        $endDate = $date['endDate'];
        if ($endDate > $mostRecent) {
           $mostRecent = $endDate;
        }
        $start = $date['startDate'];
        if ($start > $maxStart) {
           $maxStart = $start;
        }
}
foreach ($dataMonth as $key => $value) {
        $start = $value['startDate'];
        if($start < $maxStart){
          $earliestDate = $start;
        }
}

//array_push($minMaxDates, $earliestDate,$mostRecent);
$_SESSION['minDate'] = $earliestDate;
$_SESSION['maxDate'] = $mostRecent;

echo $mostRecent . "<br>";

echo $earliestDate . "<br>";



/*foreach($dataMonth as $key=>$val){
  //echo $val["workingID"]."<br />" . $val["startDate"]."<br />" . $val["endDate"]."<br />" . $val["jobRole"]."<br />";
  //echo "<br><br>";

  array_push($block, $val['workingID'],$val['jobRole'],$val['startDate'],$val['endDate']);
}
  array_push($workingIDList, $block);
  */
foreach ($dataMonth as $key => $value) {
  echo $value["workingID"]."<br />" . $value["startDate"]."<br />" . $value["endDate"]."<br />" . $value["jobRole"]."<br />";
  echo "<br><br>";
}

closeCon($conn);

}
sqlMonthData();




?>
