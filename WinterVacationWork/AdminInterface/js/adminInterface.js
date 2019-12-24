var employeeInfo;

getEmployeeInfo();

function getEmployeeInfo() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            employeeInfo = JSON.parse(xmlhttp.responseText);
            buildEmployeeTable();
        }
    }

    xmlhttp.open("POST", "./php/getEmployeeInfo.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}