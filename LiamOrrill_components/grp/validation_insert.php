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
        $sql = "INSERT INTO entireArchive(working_id, role, start,end) VALUES ('".$_POST["id"]."','".$_POST["role"]."','".$_POST["start"]."','".$_POST["end"]."')";
        if($conn->query($sql) === TRUE){
            echo "Entry successfully added to archive";
        } else {
          echo "Entry has not been added to database";
        }



$sql = "SELECT * FROM entirearchive /*WHERE start = $start AND end  = $end*/";
$stmt = $conn->query($sql);
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
$response['dataA'] = $data;
$fp = fopen('data.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);
}




    closeCon($conn);
?>
