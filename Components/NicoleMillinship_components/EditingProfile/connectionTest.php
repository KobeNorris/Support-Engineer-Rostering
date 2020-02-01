<!-- File that tries to connect to the database where the employee details are stored -->
<?php 
    $connect = new mysqli("localhost", "root", "GRP1", "rostering");
    if ($connect->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }
?>