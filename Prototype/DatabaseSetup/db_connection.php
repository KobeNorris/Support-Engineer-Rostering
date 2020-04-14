<?php
function PDOProvider(){
    $dsn = 'mysql:host=localhost;dbname=rosteringsystem';
    $user = 'team35';
    $password = 'team35';

    $dbh = new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    return $dbh;
}
?>