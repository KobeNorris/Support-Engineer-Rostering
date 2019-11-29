<?php include 'processForm.php'?>
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
                <form action = "profpic.php" method = "post" enctype = "multipart/form-data">
                    <h3 class = "text-center">Employee Profile</h3>    
                    <?php if(!empty($msg)): ?>
                        <div class = "alert <?php echo $css_class;?>">
                        <?php echo $msg; ?>

                        </div>
                    <?php endif;?>
                    
                    <div class = "form-group text-center">
                        <img src= "images/placeholder.png" onclick = "triggerClick()" id = "profileDisplay"/>
                        <label for = "profileImage">Profile Image</label>
                        <input type = "file" name = "profileImage" onchange = "displayImage(this)" id="profileImage" style = "display: none;">
                    </div>
                    <div class = "form-group">
                        <label for = "num">Phone Number</label>
                        <textarea name = "num" id = "num" class = "form-control"></textarea>
                    </div>
                    <div class = "form-group">
                        <label for = "empID">Employee ID</label>
                        <textarea name = "empID" id = "empID" class = "form-control"></textarea>
                    </div>
                    <div class = "form-group">
                        <label for = "stackID">Stack ID</label>
                        <textarea name = "stackID" id = "stackID" class = "form-control"></textarea>
                    </div>
                    <div class = "form-group">
                        <label for = "email">Email</label>
                        <textarea name = "email" id = "email" class = "form-control"></textarea>
                    </div>
                    <div class = "form-group">
                        <button type = "submit" name = "save-user" class = "btn btn-primary btn-block">Save User</button>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src = "scriptprof.js"></script>
</body>

</html>