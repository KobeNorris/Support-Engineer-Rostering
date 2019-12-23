<?php
$JPGFile = "../Image/".$_POST["working_id"].".jpg";
$PNGFile = "../Image/".$_POST["working_id"].".png";
$GIFFile = "../Image/".$_POST["working_id"].".gif";
$JPEGFile = "../Image/".$_POST["working_id"].".jpeg";

if(file_exists($JPGFile))
    echo "jpg";
else if(file_exists($PNGFile))
    echo "png";
else if(file_exists($GIFFile))
    echo "gif";
else if(file_exists($JPEGFile))
    echo "jpeg";
else
    echo "default";
?>