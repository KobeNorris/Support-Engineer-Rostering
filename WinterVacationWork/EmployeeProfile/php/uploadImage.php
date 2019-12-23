<?php
$base64_image_content = $_POST["targetImage"];
$working_id = $_POST["working_id"];
$path = "../Image/";

if(preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
    $type = $result[2];
    $new_file = $path;
    if(!file_exists($new_file)){
        mkdir($new_file, 0700);
    }
    $new_file = $new_file.$working_id.".{$type}";    
    if (file_put_contents($new_file, base64_decode(str_replace($result[1], '',str_replace(' ','+',$base64_image_content))))){
        deleteOriginalImage($working_id, $type);
        echo "Success";
    }else{
        echo "Fail 2";
    }
}else{
    echo "Fail 1";
}

function deleteOriginalImage($fileName, $fileType){
    $JPGFile = "../Image/".$fileName.".jpg";
    $PNGFile = "../Image/".$fileName.".png";
    $GIFFile = "../Image/".$fileName.".gif";
    $JPEGFile = "../Image/".$fileName.".jpeg";

    if(file_exists($JPGFile) && "jpg" != $fileType)
        unlink($JPGFile);
    else if(file_exists($PNGFile) && "png" != $fileType)
        unlink($PNGFile);
    else if(file_exists($GIFFile) && "gif" != $fileType)
        unlink($GIFFile);
    else if(file_exists($JPEGFile) && "jpeg" != $fileType)
        unlink($JPEGFile);
}
?>