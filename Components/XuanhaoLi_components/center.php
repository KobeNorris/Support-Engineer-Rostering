<?php
include('conn.php');
$reguser = $_POST['reguser'];
$regfn = $_POST['regfn'];
$regln = $_POST['regln'];
$regemail = $_POST['regemail'];
$regage = $_POST['regage'];

$sql = "SELECT firstname, lastname, email, age FROM members where username='$reguser'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
/*if ($regpwd==''){
  $regpwd=$row["password"];
}*/
if ($regfn==''){
  $regfn=$row["firstname"];
}
if ($regln==''){
  $regln=$row["lastname"];
}
if ($regemail==''){
  $regemail=$row["email"];
}
if ($regage==''){
  $regage=$row["age"];
}

$sql = "UPDATE members SET firstname = '$regfn', lastname='$regln', email='$regemail', age='$regage' WHERE username='$reguser'";

$user_query = mysqli_query($conn,$sql) or die('mysql query error');
echo $reguser," Changed successfully","<br>";
echo 'Return to the login page<a href="index.html">login</a><br />';
mysqli_close($conn);
?>