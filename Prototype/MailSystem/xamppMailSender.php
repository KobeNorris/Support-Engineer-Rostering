<?php
$sub = "kobenorriswu@gmail.com";
$msg = "Hello world";
$rec = "scykw1@nottingham.ac.uk";
try {
    mail($rec, $sub, $msg);
    echo "Success";
}catch(Exception $e){
    echo "Failed ".$e;   
}
?>