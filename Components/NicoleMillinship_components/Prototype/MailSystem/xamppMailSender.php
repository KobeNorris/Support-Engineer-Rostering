<!-- Follow the instruction on https://www.youtube.com/watch?v=9W644cyDyNM -->
<?php
$sub = "sender@email.com";
$msg = "Hello world";
$rec = "receiver@email.com";
try {
    mail($rec, $sub, $msg);
    echo "Success";
}catch(Exception $e){
    echo "Failed ".$e;   
}
?>