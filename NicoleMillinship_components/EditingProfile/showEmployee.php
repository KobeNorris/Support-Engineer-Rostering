<?php
require_once('connectionTest.php');
$query = "SELECT * FROM employee"; 
$employeeRecord = mysqli_query($connect, $query);
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Employee Profile</title>
        <link rel="stylesheet" type="text/css" href="employeeStylesheet.css">
    </head>
    <body>
        
        <?php while ($row = mysqli_fetch_array($employeeRecord)) { ?>
            <div>
                <img id="profilePicture" src="uploads/defaultImage.png">
            </div>
            <p>
                Employee Name:
                <?php echo $row['FirstName'];?> 
                <?php echo $row['Surname'];?>
            </p>
            
            <p>
                Work ID:
                <?php echo $row['WorkID'];?> 
            </p>

            <p>
                Email Address:
                <?php echo $row['EmailAddress'];?> 
            </p>

            <p>
                Telephone Number:
                <?php echo $row['TelephoneNumber'];?> 
            </p>

            <p>
                Current Job Role:
                <?php echo $row['CurrentJobRole'];?> 
            </p>

            <p>
                Slack ID: 
                <?php echo $row['SlackID'];?> 
            </p>

            <p>
                Status: 
                <?php if ($row['SlackID'] == 0)
                    echo "Inactive";
                else
                    echo "Active";
                ?> 
            </p>

            <p>[List of future holidays here]</p>
            <p>[List of future deployments here]</p>

        <?php }; ?>

    </body>
</html>