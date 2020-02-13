<?php
require_once('connectionTest.php');
$employeeID = $_GET['employees'];
$query = "SELECT * FROM employee WHERE WorkID = '$employeeID'"; 
$employeeRecord = mysqli_query($connect, $query);

$query2 = "SELECT * FROM holiday 
            WHERE HolidayEndDate > CURDATE() 
            AND WorkID = '$employeeID'
            ORDER BY HolidayStartDate";
$query3 = "SELECT * FROM deployment 
            WHERE DeploymentEndDate > CURDATE() 
            AND WorkID = '$employeeID'
            ORDER BY DeploymentStartDate";

$eRow = mysqli_fetch_assoc($employeeRecord);
?>

<!DOCTYPE html>
<html>
    <head>
        <title>View Profile</title>
        <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin = "anonymous">
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
    </head>
    <body>
        <br>
        <div class="profileCard">
        <div class="pictureBox">
            <?php $profilePics = "uploads/";
            if($eRow['ProfilePicture'])
                $profilePics .= $eRow['ProfilePicture'];
            else
                $profilePics .= "defaultImage.png";
            echo "<img id=profilePic src=$profilePics>"; ?> 
        </div>

        <form action="editProfile.php" method="get">
            <input type="submit" value="Edit Profile" style="margin-top:10px; margin-bottom:10px">
        </form>
        <p>
            Employee Name: 
            <?php echo $eRow['FirstName'];?> 
            <?php echo $eRow['Surname'];?>
        </p>
        
        <p>
            Work ID: 
            <?php echo $eRow['WorkID'];?> 
        </p>

        <p>
            Email Address: 
            <?php echo $eRow['EmailAddress'];?> 
        </p>

        <p>
            Telephone Number: 
            <?php echo $eRow['TelephoneNumber'];?> 
        </p>

        <p>
            Current Job Role: 
            <?php echo $eRow['CurrentJobRole'];?> 
        </p>

        <p>
            Slack ID: 
            <?php echo $eRow['SlackID'];?> 
        </p>

        <p>
            Status: 
            <?php if ($eRow['Status'] == 0)
                echo "Inactive";
            else
                echo "Active";
            ?> 
        </p>

        <p>
            <div class="futureText">Future Holidays: </div>
            <table align="center">
                <?php $holidays = mysqli_query($connect, $query2);
                if(mysqli_num_rows($holidays)!=0) {
                    echo "<tr>"; 
                    echo "<th> Start Date </th>";
                    echo "<th> End Date </th>";
                    echo "</tr>";
                }
                else {
                    echo "None";
                }
                while ($hRow = mysqli_fetch_array($holidays)) {
                    echo "<tr>";
                    echo "<td>" . $hRow['HolidayStartDate'] . "</td>";
                    echo "<td>" . $hRow['HolidayEndDate'] . "</td>"; 
                    echo "</tr>";
                }
                ?>
            </table>
        </p>

        <p>
            <div class="futureText">Future Deployments: </div>
            <table align="center">                    
                <?php $deployments = mysqli_query($connect, $query3);
                if(mysqli_num_rows($deployments)!=0) {
                    echo "<tr>"; 
                    echo "<th> Start Date </th>";
                    echo "<th> End Date </th>";
                    echo "</tr>";
                }
                else {
                    echo "None";
                }
                while ($hRow = mysqli_fetch_array($deployments)) {
                    echo "<tr>";
                    echo "<td>" . $hRow['DeploymentStartDate'] . "</td>";
                    echo "<td>" . $hRow['DeploymentEndDate'] . "</td>"; 
                    echo "</tr>";
                }
                ?>
            </table>
        </p>
        </div>
    </body>
</html>

<?php
session_start();
$_SESSION['employeeID'] = $employeeID;
?>