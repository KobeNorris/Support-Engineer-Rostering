<?php
$msg = "";
$css_class = "";
require_once('connectionTest.php');
echo "Connected"."<br>";
if (isset($_POST['save-user'])){
    echo "<pre>", print_r($_FILES['profileImage']['name']), "</pre>";

    $num = $_POST['num'];
    $profileImageName = time() . '_'. $_FILES['profileImage']['name'];
    $target = 'images/' . $profileImageName;
    if (move_uploaded_file($_FILES['profileImage']['tmp_name'], $target)){
        $sql = "INSERT INTO users (profile_image, num) VALUES ('$profileImageName', '$num')";
        if (mysqli_query($conn, $sql)){
              $msg = "Image uploaded and saved";
              $css_class = "alert-success";
        }else{
          $msg = "Failed to save user";
          $css_class = "alert-danger";

        }
        $msg = "Successfully uploaded";  
        $css_class = "alert-success";
    } else{
      $msg = "Failed to upload";  
      $css_class = "alert-danger";


    }


}