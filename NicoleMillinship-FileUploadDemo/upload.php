<?php

$target_dir = "uploads/"; //the directory where the file will be placed
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); //the path of the file
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); //file extension
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check == false) { //if file isn't an image
        $uploadOk = 0;
    }
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