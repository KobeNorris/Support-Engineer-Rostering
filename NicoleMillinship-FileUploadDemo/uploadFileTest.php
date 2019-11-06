
<!DOCTYPE html>
<html>
    <head>
        <title>Upload File Test</title>
        <link rel="stylesheet" type="text/css" href="uploadFileStyles.css">
        <script> 
            function readURL() {
                var input = document.getElementById("fileToUpload");
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = function (e) {
                        $('#profilePicture').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
        </script>
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
            <input id="fileToUpload" type="file" name="fileToUpload" placeholder=z"Profile Picture" onchange="readURL()" required="">
            <input type="submit" value="Upload Image" name="submitImage">
        </form> 
    </body>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</html>

<?php
$target_dir = "uploads/"; //the directory where the file will be placed
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); //the path of the file, including its file name
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); //get the file extension of uploaded image

if(isset($_POST["submitImage"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);

    //if file isn't an image
    if($check == false) {
        $uploadOk = 0;
    }

    // Check file size is less than 500kb
    if ($_FILES["fileToUpload"]["size"] > 500000) {
        echo "Sorry, your file is too large. <br>";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Sorry, only JPG, JPEG, & PNG files are allowed. <br>";
        $uploadOk = 0;
    }

    // Error message if the file can't be uploaded
    if ($uploadOk == 1 && move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    }
    else
        echo "Sorry, your file was not uploaded. Please try again.";

}

?>
