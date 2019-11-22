<?php include 'processForm.php';
$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);
$users = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang = "en">

<head>
    <meta charset = "UTF-8">
    <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin = "anonymous">
    <link rel = "stylesheet" href = "styleprof.css">
    <title>Profile Picture Upload</title>
</head>

<body>
    <div class = "container">
        <div class = "row">
            <div class = "col-4 offset-md-4 form-div">
            <table class = "table table-bordered">
                <thead>
                    <th>Profile Image</th>
                    <th>Number</th>
                </thead>
                <tbody>
                    <?php foreach($users as $user): ?>
                    <tr>
                        <td>
                        <img src = "images/<?php echo $user['profile_image'];?>" width = "80"/>
                        </td>

                        <td>
                        <?php echo $user['num']; ?>

                        </td>

                </tr>
                <?php endforeach; ?>          
                </tbody>

            </table>

                
            </div>
        </div>
    </div>

</body>

</html>