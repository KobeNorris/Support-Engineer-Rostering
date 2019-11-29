<?php
include 'TimeTable.js';
function getMaxAndMinDates(){
  if (isset($_POST['phpEventId'])) {
    $earlyDate = $_POST['phpEventId'];//numOfTotalDay;
    //$maxDate = numOFLastTotalDay;
    echo "<br><br>".$earlyDate . "<br><br>";
  //  echo $maxDate;
}else {
  echo "Didnt work<br><br>";
}
 print_R($_POST);
}
function getMonthData(){
    $monthData = array();
    $weekDate['workingID'] = "scykw1";
    $weekDate['jobRole'] = "Primary";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/10/22 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/10/28 00:00:00"));
    array_push($monthData, $weekDate);
    $weekDate['workingID'] = "scykw2";
    $weekDate['jobRole'] = "Secondary";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/10/22 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/10/28 00:00:00"));
    array_push($monthData, $weekDate);
    $weekDate['workingID'] = "scykw3";
    $weekDate['jobRole'] = "Escalator";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/10/22 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/10/28 00:00:00"));\
    array_push($monthData, $weekDate);

    $weekDate['workingID'] = "scyxl1";
    $weekDate['jobRole'] = "Primary";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/11/29 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/11/4 00:00:00"));
    array_push($monthData, $weekDate);
    $weekDate['workingID'] = "scyxl2";
    $weekDate['jobRole'] = "Secondary";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/11/29 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/11/4 00:00:00"));
    array_push($monthData, $weekDate);
    $weekDate['workingID'] = "scyxl3";
    $weekDate['jobRole'] = "Escalator";
    $weekDate['startDate'] = date('Y-m-d H:i:s', strtotime("2019/11/29 00:00:00"));
    $weekDate['endDate'] =  date('Y-m-d H:i:s', strtotime("2019/11/4 00:00:00"));
    array_push($monthData, $weekDate);
//var_dump($monthData);
  //  return json_encode($monthData);

}

getMonthData();

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <script type="text/javascript" src="TimeTable.js"></script>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <h1 id="heading">hello</h1>
<script>refreshTimeTable();</script>
<?php getMaxAndMinDates(); ?>
  </body>
</html>
