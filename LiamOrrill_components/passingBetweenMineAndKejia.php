<?php
    include '../KejiaWu_components/AdminInterface/TimeTable.php';
    include 'sqlRetrieveMonth.php';
    $dataMonth = getMonthData();
    $fileMonth = fopen('getMonthData.json', 'w');
    fwrite($fileMonth, $dataMonth);
    fclose($fileMonth);

    $monthDataSQL = sqlMonthData();
    $monthSQL = fopen('sqlMonth.json', 'w');
    fwrite($monthSQL, $monthDataSQL);
    fclose($monthSQL);



?>
