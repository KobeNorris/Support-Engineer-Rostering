<?php 
    $connect = new mysqli("mysql.cs.nott.ac.uk", "psynm6", "DBIdatabase1", "psynm6");
    if ($connect->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }
?>