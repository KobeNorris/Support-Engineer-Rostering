var employeeInfo;
var newWorking_id;
var newPassword;
var checkPassword;


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

function createNewEmployee() {
    newWorking_id = document.getElementById("newWorking_id").value;
    newPassword = document.getElementById("newPassword").value;
    checkPassword = document.getElementById("checkPassword").value;

    if (checkInput()) {
        var xmlhttp;

        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText == "Success")
                    getEmployeeInfo();
                else
                    alert(xmlhttp.responseText);
            }
        }

        xmlhttp.open("POST", "./php/createEmployee.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("working_id=" + newWorking_id + "&password=" + newPassword);
    }
}

function deleteEmployee(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    var targetWorking_id = obj.children[2].innerHTML;
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success")
                getEmployeeInfo();
            else
                alert(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", "./php/deleteEmployee.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("working_id=" + targetWorking_id);
}

function generateReport(event) {

}

function checkInput() {
    var flag = true;

    if (checkPassword != newPassword) {
        alert("Wrong password check");
        flag = false;
    }

    if (newWorking_id == "") {
        alert("Working_id could not be empty");
        flag = false;
    }

    if (newPassword == "") {
        alert("Password could not be empty");
        flag = false;
    }

    return flag;
}