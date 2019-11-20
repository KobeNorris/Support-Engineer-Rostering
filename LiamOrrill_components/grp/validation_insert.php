<?php
$id = $_POST['id'];

$role = $_POST['role'];

$start = $_POST['start'];

$end = $_POST['end'];
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
      <p><?php echo $id; ?></p>
      <br>
      <p><?php echo $role; ?></p>
      <br>
      <p><?php echo $start; ?></p>
      <br>
      <p><?php echo $end; ?></p>
      <br>
      <p> <?php
      $datetime1 =  date_create($start);
      $datetime2 =  date_create($end);
      $difference =  date_diff($datetime1,$datetime2);
      echo $difference->format("%a days");
      ?> </p>

  </body>
</html>
<?php
    include "db_connection.php";
    $conn = openCon();
    $sql = "SELECT working_id
            FROM   primaryeng
            WHERE  working_id = '".$_POST['id']."'
            UNION ALL
            SELECT working_id
            FROM   secondaryeng
            WHERE  working_id = '".$_POST['id']."'
            UNION ALL
            SELECT working_id
            FROM   escalationmanager
            WHERE  working_id = '".$_POST['id']."'
            UNION ALL
            SELECT working_id
            FROM   entirearchive
            WHERE  working_id = '".$_POST['id']."'
            ";
    $stmt = $conn->query($sql);
    $row = $stmt->fetch_assoc();
    if ($row > 0) {
        echo "ID already in use";
    }
    else {
        if(strtoupper($_POST['role']) == "PRIMARY"){
          $sql = "INSERT INTO primaryeng(working_id, role, start,end) VALUES ('".$_POST["id"]."','".$_POST["role"]."','".$_POST["start"]."','".$_POST["end"]."')";
          if($conn->query($sql) === TRUE){
              echo "Entry successfully added to database";
          } else {
            echo "Entry has not been added to database";
          }
        }
        if(strtoupper($_POST['role']) == "SECONDARY"){
          $sql = "INSERT INTO secondaryeng(working_id, role, start,end) VALUES ('".$_POST["id"]."','".$_POST["role"]."','".$_POST["start"]."','".$_POST["end"]."')";
          if($conn->query($sql) === TRUE){
              echo "Entry successfully added to database";
          } else {
            echo "Entry has not been added to database";
          }
        }
        if(strtoupper($_POST['role']) == "MANAGER"){
          $sql = "INSERT INTO escalationmanager(working_id, role, start,end) VALUES ('".$_POST["id"]."','".$_POST["role"]."','".$_POST["start"]."','".$_POST["end"]."')";
          if($conn->query($sql) === TRUE){
              echo "Entry successfully added to database";
          } else {
            echo "Entry has not been added to database";
          }
        }
        $sql = "SELECT min(start) as s,max(end) as e  FROM escalationmanager
        UNION
        SELECT min(start) as s,max(end) as e  FROM primaryeng
        UNION
        SELECT min(start) as s,max(end) as e  FROM secondaryeng
        UNION
        SELECT min(start) as s,max(end) as e  FROM entirearchive
        ";
      $stmt = $conn->query($sql);
      while($row = $stmt->fetch_assoc()){
        $dates[] = array('Start' => $row['s'], 'End' => $row['e']);
      }
      echo '<table width="80%" border="1" id="display">
       <thead>
        <tr>
          <th width="10%">start</th>
          <th width="15%">end</th>
        </tr>
      </thead>';
      //echo '<tbody>'
      $lowestdate = strtotime($dates[0]['Start']);
      $longestdate = strtotime($dates[0]['End']);
      foreach ($dates as $date){
         echo "<tr class = \"row\"><td>" . $date['Start'] . "</td><td>" . $date['End'] . "</tr>";
         if(strtotime($date['Start']) < $lowestdate){
           $lowestdate = strtotime($date['Start']);
         }
         if(strtotime($date['End']) > $longestdate){
           $longestdate = strtotime($date['End']);
         }
     }
      echo "</thead>";
      echo "<p> latest date: " . date('Y-m-d', $lowestdate)   . "</p>";
      echo "<p>earliest date: " . date('Y-m-d', $longestdate) ."</p>";
    }
    closeCon($conn);
?>
