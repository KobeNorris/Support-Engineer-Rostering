<?php
function PDOProvider(){
    $dsn = 'mysql:host=localhost;dbname=rostering';
    $user = 'root';
    $password = 'GRP1';

    $dbh = new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    return $dbh;
}
?>