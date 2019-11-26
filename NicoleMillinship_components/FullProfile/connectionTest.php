<?php 
    $connect = new mysqli("localhost", "root", "GRP1", "rostering");
    if ($connect->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }
?>