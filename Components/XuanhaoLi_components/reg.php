<?php
include('conn.php');
$reguser = $_POST['reguser'];
$regpwd = $_POST['regpwd'];
$regfn = $_POST['regfn'];
$regln = $_POST['regln'];
$regemail = $_POST['regemail'];
$regage = $_POST['regage'];
$regsql = "insert into members (username,password,firstname,lastname,email,age) values ('$reguser',MD5('$regpwd'),'$regfn','$regln','$regemail','$regage')";
$user_query = mysqli_query($conn,$regsql) or die('mysql query error');
echo $reguser,"registered successfully","<br>";
echo 'Return to the login page<a href="index.html">login</a>';
mysqli_close($conn);
?>