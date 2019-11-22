<?php
include "db_connection.php";
$conn = openCon();
echo "successfully connected to database";
closeCon($conn);
?>
