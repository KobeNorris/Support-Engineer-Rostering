<?php
include('conn.php');
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "select * from members where username = '$username' and password = MD5('$password')";
$user_query = mysqli_query($conn,$sql) or die('mysql query error');
$rows=mysqli_num_rows($user_query);
if ($rows == 1){
    session_start();
    $_SESSION['username'] = $username;
    echo $username,' welcome! into <a href="center.html">Admin center </a><br />';
    echo 'click hear <a href="index.html?action=logout">logout</a><br />';
    exit;
} else {
    header('refresh:3; url=index.html');
	echo "User name or password error, the system will jump to the login interface in 3 seconds, please fill in the login information again!";
	exit;
}
?>