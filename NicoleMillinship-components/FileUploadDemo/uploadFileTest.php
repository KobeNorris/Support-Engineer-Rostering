
<!DOCTYPE html>
<html>
    <head>
        <title>Upload File Test</title>
    </head>
    <body>
        <div>
            <img id="profilePicture" style="display: block; margin-left: auto; margin-right: auto; width:15%; height:15%" src="uploads/defaultImage.png" />
            <p style="text-align: center">Employee Name</p>
        </div>
    
        <form action="upload.php" method="post" style="text-align: center">
            Select image to upload:
            <input id="imageUpload" type="file" name="fileToUpload" placeholder="Photo" required="" capture>
            <input type="submit" value="Upload Image" name="submitImage">
        </form>
    </body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</html>

<?php

$target_dir = "uploads/"; //the directory where the file will be placed
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); //the path of the file
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); //file extension

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    //if file isn't an image
    if($check == false) {
        $uploadOk = 0;
    }
    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists. <br>";
        $uploadOk = 0;
    }

    // Check file size is less than 500kb
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        echo "Sorry, your file is too large. <br>";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed. <br>";
        $uploadOk = 0;
    }

    // Error message if the file can't be uploaded
    if ($uploadOk == 0) {
        echo "Error - Your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file. Please try again.";
        }
    }
}

?>
