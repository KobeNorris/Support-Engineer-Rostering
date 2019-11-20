<?php
require_once('connectionTest.php');
$query = "SELECT * FROM employee"; 
$employeeRecord = mysqli_query($connect, $query);

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
        
        <?php while ($eRow = mysqli_fetch_array($employeeRecord)) { ?>
            <div>
                <?php $profilePics = "uploads/";
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
                while ($hRow = mysqli_fetch_array($holidays)) {
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