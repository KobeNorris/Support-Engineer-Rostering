<?php
$conn=mysqli_connect('127.0.0.1','root','','tarena',3306);
if (mysqli_connect_errno($conn)) 
{	 
    echo "connect to SQL failed: " . mysqli_connect_error(); 
} 
?>