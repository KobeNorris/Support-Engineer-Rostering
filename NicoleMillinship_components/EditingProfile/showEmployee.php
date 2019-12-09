<!-- 
    This file demonstrates what a user would see when they view someone's profile. 
    It includes the details for every user stored in the database (although in practice you'd only be looking at one person's details).
    The employee table contains the personal details for each employee, including the file name of their profile picture. 
    The holiday and deployment tables contain each employee's holiday and deployment dates
 -->

<?php
require_once('connectionTest.php');
//Get every record in the employee table 
$query = "SELECT * FROM employee";
$employeeRecords = mysqli_query($connect, $query);

//Get the holidays and deployments which are in the future
$query2 = "SELECT * FROM holiday WHERE HolidayStartDate > CURDATE()";
$query3 = "SELECT * FROM deployment WHERE DeploymentStartDate > CURDATE()";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Employee Profile</title>
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
    </head>
    <body>
        <!-- Get each employee record from employee and store it in $eRow -->
        <?php while ($eRow = mysqli_fetch_array($employeeRecords)) { ?>
            <div>
                <!-- Profile pictures are stored in the uploads folder -->
                <?php $profilePics = "uploads/";
                //Add the file name to the file path, so the image can be loaded
                $profilePics .= $eRow['ProfilePicture'];
                echo "<img id=profilePic src=$profilePics>"; ?> 
            </div>
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
                <tr> 
                    <th> Start Date </th>
                    <th> End Date </th>
                </tr>
                <?php $holidays = mysqli_query($connect, $query2);
                //Get each record in the holidays table
                while ($hRow = mysqli_fetch_array($holidays)) {
                    // If the employee associated with this holiday record is the same as the current employee (i.e work ids are the same)
                    if ($eRow['WorkID'] == $hRow['WorkID']) {
                        echo "<tr>";
                        echo "<td>" . $hRow['HolidayStartDate'] . "</td>";
                        echo "<td>" . $hRow['HolidayEndDate'] . "</td>"; 
                        echo "</tr>";
                    }
                }
                ?>
                </table>
            </p>

            <p>
                <!-- Same code as Future holidays -->
                Future Deployments:
                <table align="center">
                    <tr> 
                        <th> Start Date </th>
                        <th> End Date </th>
                    </tr>
                    <?php $deployments = mysqli_query($connect, $query3);
                    while ($hRow = mysqli_fetch_array($deployments)) {
                        if ($eRow['WorkID'] == $hRow['WorkID']) {
                            $isEmpty = false;
                            echo "<tr>";
                            echo "<td>" . $hRow['DeploymentStartDate'] . "</td>";
                            echo "<td>" . $hRow['DeploymentEndDate'] . "</td>"; 
                            echo "</tr>";
                        }
                    }
                    ?>
                </table>
            </p>
        <?php }; ?>
    </body>
</html>