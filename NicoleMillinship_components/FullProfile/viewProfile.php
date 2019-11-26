<?php
require_once('connectionTest.php');
$employeeID = $_GET['employees'];
$query = "SELECT * FROM employee WHERE WorkID = '$employeeID'"; 
$employeeRecord = mysqli_query($connect, $query);

$query2 = "SELECT * FROM holiday 
            WHERE HolidayStartDate > CURDATE() 
            AND WorkID = '$employeeID'";
$query3 = "SELECT * FROM deployment 
            WHERE DeploymentStartDate > CURDATE() 
            AND WorkID = '$employeeID'";

$eRow = mysqli_fetch_assoc($employeeRecord);
?>

<!DOCTYPE html>
<html>
    <head>
        <title>View Profile</title>
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
    </head>
    <body>
        <div>
            <?php $profilePics = "uploads/";
            if($eRow['ProfilePicture'])
                $profilePics .= $eRow['ProfilePicture'];
            else
                $profilePics .= "defaultImage.png";
            echo "<img id=profilePic src=$profilePics>"; ?> 
        </div>
        <br>
        <form action="editProfile.php" method="get">
            <input type="submit" value="Edit Profile">
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
            Future Holidays:
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
            Future Deployments:
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
    </body>
</html>

<?php
session_start();
$_SESSION['employeeID'] = $employeeID;
?>