<?php
session_start();
$employeeID = $_SESSION['employeeID'];

require_once('connectionTest.php');
$query = "SELECT * FROM employee WHERE WorkID = '$employeeID'"; 
$employeeRecord = mysqli_query($connect, $query);
$employeeDetails = mysqli_fetch_assoc($employeeRecord);

if (isset($_POST['editDetails'])) {
    $WorkID = $employeeDetails["WorkID"];
    
    $ProfilePicture = $_POST['profileImage'];
    $ProfilePicture = ltrim($ProfilePicture, 'uploads/');
    if($ProfilePicture == "")
        $ProfilePicture = $employeeDetails['ProfilePicture'];
    $FirstName = $_POST['FirstName'];
    $Surname = $_POST['Surname'];
    $EmailAddress = $_POST['EmailAddress'];
    $TelephoneNumber = $_POST['TelephoneNumber'];

    $query = "UPDATE employee
                SET ProfilePicture = '$ProfilePicture',
                FirstName = '$FirstName',
                Surname = '$Surname',
                EmailAddress = '$EmailAddress',
                TelephoneNumber = '$TelephoneNumber'
                WHERE WorkID = '$WorkID'";

    mysqli_query($connect, $query);
    header("Location: index.php");
    exit;
}
if (isset($_POST['addHoliday'])) {
    $WorkID = $employeeDetails["WorkID"];
    $startDate = $_POST['hStartDate'];
    $endDate = $_POST['hEndDate'];
    echo $startDate;

    $query = "INSERT INTO holiday
                VALUES ('$WorkID', '$startDate' '$endDate')";
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Edit Profile</title>
        <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin = "anonymous">
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
        <script type="text/javascript" src="checkForm.js"></script>
    </head>
    <body>
        <h1> Change Details </h1>
            <form action = "" method = "post">
                <div class="EditPic" style="margin-bottom:10px">
                    <?php $profilePics = "uploads/";
                        if($employeeDetails['ProfilePicture'])
                            $profilePics .= $employeeDetails['ProfilePicture'];
                        else
                            $profilePics .= "defaultImage.png";
                        echo "<img id='profileDisplay' name='profileDisplay' src=$profilePics onclick='triggerClick()'>"; 
                    ?>
                    <label id="editPic" for="profileImage"><i>Change Profile Picture here</i></label>
                    <input type="file" name="profileImage" onchange ="displayImage(this)" id="profileImage" style ="display:none;">
                </div>

                First Name: 
                <?php 
                    $firstName = $employeeDetails['FirstName'];
                    echo "<input type='text' name='FirstName' value='$firstName' pattern='[a-zA-Z]+'>"; 
                ?>
                <br><br>Surname: 
                <?php 
                    $Surname = $employeeDetails['Surname'];
                    echo "<input type='text' name='Surname' value='$Surname' pattern='[a-zA-Z]+'>"; 
                ?>
                <br><br> Email Address:
                <?php 
                    $EmailAddress = $employeeDetails['EmailAddress'];
                    echo "<input type='text' name='EmailAddress' value='$EmailAddress' pattern='[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}'>"; 
                ?>
                <br><br> Telephone Number:
                <?php 
                    $TelephoneNumber = $employeeDetails['TelephoneNumber'];
                    echo "<input type='text' name='TelephoneNumber' value='$TelephoneNumber' pattern='[0-9]{11}'>"; 
                ?>
                <br>
                <input type="submit" name="editDetails" value="Save" style="margin-top:10px; margin-bottom:10px">
            </form>          

        <h2> Add a new holiday: </h2>
            <form action = "" method = "post">
                <?php 
                    $dateToday = date("Y-m-d");
                    echo "Start date: <input type='date' id='startDate' name='hStartDate' min = '$dateToday' onchange='checkDates()'>";
                ?>
                <br> <br>
                End date: <input type="date" id="endDate" name="hEndDate" min="">
                <br><input type="submit" name="addHoliday" value="Add" style="margin-top:10px; margin-bottom:10px">
            </form> 
            
        <h2> Add a new deployment: </h2>
            <form action = "" method = "post">
                <?php 
                    $dateToday = date("Y-m-d");
                    echo "Start date: <input type='date' id='startDate' name='dStartDate' min = '$dateToday' onchange='checkDates()'>";
                ?>
                <br> <br>
                End date: <input type="date" id="endDate" name="dEndDate" min="">
                <br><input type="submit" name="addDeployment" value="Add" style="margin-top:10px">
            </form>           
    </body>
</html>