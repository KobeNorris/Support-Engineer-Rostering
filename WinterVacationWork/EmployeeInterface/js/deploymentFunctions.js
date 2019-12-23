var newDeploymentStart_date;
var newDeploymentEnd_date;
var deploymentList = [];

getEmployeeDeployment();

function upLoadDeployment() {
    newDeploymentStart_date = document.getElementById("newDeploymentStart_date").value;
    newDeploymentEnd_date = document.getElementById("newDeploymentEnd_date").value;

    if (checkLoadDeployment()) {
        var xmlhttp;

        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText == "Success") {
                    getEmployeeDeployment();
                    document.getElementById("newDeploymentStart_date").value = "";
                    document.getElementById("newDeploymentEnd_date").value = "";
                }
            }
        }

        xmlhttp.open("POST", "./php/timeManagement.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("target=deployment&action=upload&start_date=" + newDeploymentStart_date + "&end_date=" + newDeploymentEnd_date + "&working_id=" + working_id);
    }
}

function refreshEmployeeDeployment() {
    var html = "";
    for (var deploymentCounter = 0; deploymentCounter < deploymentList.length; deploymentCounter++) {
        html += "<tr><td colspan=\"4\"></td><td colspan=\"2\">"
            + deploymentList[deploymentCounter]["start_date"]
            + "</td><td colspan=\"2\">"
            + deploymentList[deploymentCounter]["end_date"]
            + "</td><td colspan=\"2\"><button onclick=\"deleteDeployment(event)\">delete</button></td></tr>";
    }
    document.getElementById("deploymentTimetable").innerHTML = html;
}

function getEmployeeDeployment() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            deploymentList = JSON.parse(xmlhttp.responseText);
            refreshEmployeeDeployment();
        }
    }

    xmlhttp.open("POST", "./php/timeManagement.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("target=deployment&action=refresh&working_id=" + working_id);
}

function checkLoadDeployment() {
    if (newDeploymentStart_date == "" || newDeploymentEnd_date == "") {
        alert("Blank space detected");
        return false;
    } else if (newDeploymentStart_date > newDeploymentEnd_date) {
        alert("Wrong time")
        return false;
    }

    return true;
}

function deleteDeployment(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    newDeploymentStart_date = obj.children[1].innerHTML;
    newDeploymentEnd_date = obj.children[2].innerHTML;

    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success")
                getEmployeeDeployment();
            else
                console.log(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", "./php/timeManagement.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("target=deployment&action=delete&start_date=" + newDeploymentStart_date + "&end_date=" + newDeploymentEnd_date + "&working_id=" + working_id);
}