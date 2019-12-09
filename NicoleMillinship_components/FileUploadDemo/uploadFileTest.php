<!-- 
    This file is a demonstration of how an employee might change their profile picture.
    The user clicks on the browse button and selects a file. This file is set as the new profile picture preview image.
    When they click on 'Upload Image', the file they've uploaded is validated and either accepted/rejected
 -->

<!DOCTYPE html>
<html>
    <head>
        <title>Upload File Test</title>
        <link rel="stylesheet" type="text/css" href="uploadFileStyles.css">
        <script src="upload.js"></script>
    </head>
    <body>
        <div>
            <img id="profilePicture" src="uploads/defaultImage.png" />
            <p>[Employee Name here]</p>

        </div>
    
        <form action="uploadFileTest.php" method="post" style="text-align: center" enctype="multipart/form-data">
            Select image to upload:
            <label for="fileToUpload" id="browse">
                <i id="browseOverlay"></i>Browse...
            </label>
            <!-- When the user has selected a file from pressing browse, run readURL() from upload.js -->
            <input id="fileToUpload" type="file" name="fileToUpload" placeholder="Profile Picture" onchange="readURL()" required="">
            <input type="submit" value="Upload Image" name="submitImage">
        </form> 
    </body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</html>

<?php
//All uploaded image files are saved in the 'uploads' folder
$target_dir = "uploads/";
//The path of the file, including the uploaded file's file name, e.g uploads/img1.png
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); 
//Whether this file passes all validation checks
$uploadOk = 1;
//Get the file extension of the uploaded file (e.g png, txt etc.)
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); 
//If the Upload Image button has been pressed
if(isset($_POST["submitImage"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);

    //If getimagesize returns false, you know the file can't be an image
    if($check == false) {
        $uploadOk = 0;
    }

    //Check file size is less than 500kb
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        echo "Sorry, your file is too large. <br>";
        $uploadOk = 0;
    }

    //Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Sorry, only JPG, JPEG, & PNG files are allowed. <br>";
        $uploadOk = 0;
    }

    //If the checks have been passed, try to upload the file into the uploads folder
    if ($uploadOk == 1 && move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    }
    else
        echo "Sorry, your file was not uploaded. Please try again.";
}
?>