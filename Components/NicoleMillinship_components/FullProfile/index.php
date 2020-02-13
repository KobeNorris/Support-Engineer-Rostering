<?php
require_once('connectionTest.php');
$query = "SELECT WorkID FROM employee ORDER BY WorkID ASC";
$ids = mysqli_query($connect, $query);
?>

<head>
    <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
</head>
<div class="indexForm">
<form class="selectEmployee" action="viewProfile.php" method="get">
    <select name="employees">
        <option value="">Select an Employee:</option>
    <?php
    while($rows = $ids->fetch_assoc()) {
        $idOption = $rows['WorkID'];
        echo "<option value='$idOption'>$idOption</option>";
    }
    ?>
    </select>
    <input type="submit">
</form>
</div>
