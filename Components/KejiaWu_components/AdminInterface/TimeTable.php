<?php
include 'TimeTable.js';
//include '../../LiamOrrill_components/get6weeks.php';
if (isset($_POST)) {
  foreach($_POST as $key => $value) {
    $earlyDate = $key;
    }
}
function getMonthData($earlyDate){
    echo "<br><h1/> " . $earlyDate . "<br>";
$earlyDate = preg_replace('/[&nbsp;]/', '', $earlyDate);
$fileMonth = fopen('../../LiamOrrill_components/getMonthData.json', 'w');
fwrite($fileMonth,  json_encode($earlyDate));
fclose($fileMonth);
  //  return json_encode($earlyDate);
}
getMonthData($earlyDate);
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
<?php  echo $earlyDate; // getMaxAndMinDates() ?>
  </body>
</html>
