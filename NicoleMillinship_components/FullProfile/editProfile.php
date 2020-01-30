<?php
session_start();
$employeeID = $_SESSION['employeeID'];

require_once('connectionTest.php');
$query = "SELECT * FROM employee WHERE WorkID = '$employeeID'"; 
$employeeRecord = mysqli_query($connect, $query);
$employeeDetails = mysqli_fetch_assoc($employeeRecord);


if (isset($_POST['addHoliday'])) {
    $WorkID = $employeeDetails["WorkID"];
    $startDate = $_POST['hStartDate'];
    $endDate = $_POST['hEndDate'];
    echo $startDate;

    $query = "INSERT INTO holiday (WorkID, HolidayStartDate, HolidayEndDate)
                VALUES ($WorkID, '$startDate', '$endDate')";

    mysqli_query($connect, $query);
}

if (isset($_POST['addDeployment'])) {
    $WorkID = $employeeDetails["WorkID"];
    $startDate = $_POST['dStartDate'];
    $endDate = $_POST['dEndDate'];

    $query = "INSERT INTO deployment (WorkID, DeploymentStartDate, DeploymentEndDate)
                VALUES ($WorkID, '$startDate', '$endDate')";

    mysqli_query($connect, $query);
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Edit Profile</title>
        <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin = "anonymous">
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
        <script type="text/javascript" src="checkForm.js"></script>
        <script>
            function changeDMinDate(val) {
                changeMinDate(val, "dEndDate");
            }
            function changeHMinDate(val) {
                changeMinDate(val, "hEndDate");
            }

            function changeMinDate(val, dateToChange) {
                var date = val.split("-");
                day = date[2];
                month = date[1];
                year = date[0];
                startDateVal = year +"-"+ month +"-"+ day;
                document.getElementById(dateToChange).setAttribute("min", startDateVal);
            }
        </script>
    </head>
    <body>
        <form action="index.php" method="get">
            <input type="submit" value="Back" style="margin-top:10px; margin-bottom:10px">
        </form>
        <div class="profileCard">
        <h1> Change Details </h1>
            <form action = "#" method = "post">
                <div class="EditPic" style="margin-bottom:10px">
                    <?php $profilePics = "uploads/";
                        if($employeeDetails['ProfilePicture'])
                            $profilePics .= $employeeDetails['ProfilePicture'];
                        else
                            $profilePics .= "defaultImage.png";
                        echo "<img id='profileDisplay' name='profileDisplay' src=$profilePics onclick='triggerClick()'>"; 
                    ?>
                    <input type="file" name="profileImage" onchange ="displayImage(this)" id="profileImage" style ="display:none;">
                </div>

                First Name: 
                <?php 
                    $firstName = $employeeDetails['FirstName'];
                    echo "<input type='text' name='FirstName' value='$firstName' pattern='[a-zA-Z]+' required>"; 
                ?>
                <br><br>Surname: 
                <?php 
                    $Surname = $employeeDetails['Surname'];
                    echo "<input type='text' name='Surname' value='$Surname' pattern='[a-zA-Z]+' required>"; 
                ?>
                <br><br> Email Address:
                <?php 
                    $EmailAddress = $employeeDetails['EmailAddress'];
                    echo "<input type='text' name='EmailAddress' value='$EmailAddress' pattern='[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}' required>"; 
                ?>
                <br><br> Telephone Number:
                <?php 
                    $TelephoneNumber = $employeeDetails['TelephoneNumber'];
                    echo "<input type='text' name='TelephoneNumber' value='$TelephoneNumber' pattern='[0-9]{11}' required>"; 
                ?>
                <br>
                <input type="submit" name="editDetails" value="Save" style="margin-top:10px; margin-bottom:10px">
            </form>          

        <h2> Add a new holiday: </h2>
            <form action = "" method = "post">
                <?php 
                    $dateToday = date("Y-m-d");
                    echo "Start date: <input type='date' id='hStartDate' name='hStartDate' min ='$dateToday' onchange='changeHMinDate(this.value)' required>";
                ?>
                <br> <br>
                End date: <input type="date" id="hEndDate" name="hEndDate" required>
                <br><input type="submit" name="addHoliday" value="Add" style="margin-top:10px; margin-bottom:10px">
            </form> 
            
        <h2> Add a new deployment: </h2>
            <form action = "" method = "post">
                <?php 
                    $dateToday = date("Y-m-d");
                    echo "Start date: <input type='date' id='dStartDate' name='dStartDate' min='$dateToday' onchange='changeDMinDate(this.value)' required>";
                ?>
                <br> <br>
                End date: <input type="date" id="dEndDate" name="dEndDate" min="" required>
                <br><input type="submit" name="addDeployment" value="Add" style="margin-top:10px">
            </form>     
        </div> 
    </body>
</html>

<?php
$uploadOk = 1;

if(isset($_POST['editDetails']) && isset($_FILES['profileImage'])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["profileImage"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    $check = getimagesize($_FILES["profileImage"]["tmp_name"]);
    //if file isn't an image
    if($check == false) {
        $uploadOk = 0;
    }

    if ($_FILES["profileImage"]["size"] > 1000000) {
        echo "Sorry, your file is too large. <br>";
        $uploadOk = 0;
    }

    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Sorry, only JPG, JPEG, & PNG files are allowed. <br>";
        $uploadOk = 0;
    }
    
    if ($uploadOk == 1 && move_uploaded_file($_FILES["profileImage"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["profileImage"]["name"]). " has been uploaded.";
    }
    else
        echo "Sorry, your file was not uploaded. Please try again.";
}
if ($uploadOk == 1 && isset($_POST['editDetails'])) {
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
?>