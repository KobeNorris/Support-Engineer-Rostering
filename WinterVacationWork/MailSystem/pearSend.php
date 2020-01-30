<?php
require_once ('./pearMailComponents/Mail.php');

$params = array();
$params["host"] = "smtp.163.com"; // capitalone ?
$params["port"] = 25;
$params["auth"] = true;
$params["username"] = "kobewu522@163.com";
$params["password"] = "Kobewkj990522$";
// $params["localhost"]
$params["timeout"] = 5; // second
$params["verp"] = true; // Apply AERP when email address is invalid
// $params["debug"]
// $params["persist"]
// $params["pipelining"]

$recipients = "969074817@qq.com";

$headers = array();
$headers ['From'] = 'test@servage.net';
$headers ['To'] = 'test2@servage.net';
$headers ['Subject'] = 'Test heading';

$body = "Just a test";

$mail_object = Mail :: factory ('smtp', $params);

$mail_object-> send ($recipients, $headers, $body);

echo($mail_object::$error)
?>