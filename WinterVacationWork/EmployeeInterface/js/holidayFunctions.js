var newHolidayStart_date;
var newHolidayEnd_date;
var holidayList = [];

getEmployeeHoliday();

function upLoadHoliday() {
    newHolidayStart_date = document.getElementById("newHolidayStart_date").value;
    newHolidayEnd_date = document.getElementById("newHolidayEnd_date").value;

    if (checkLoadHoliday()) {
        var xmlhttp;

        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText == "Success") {
                    getEmployeeHoliday();
                    document.getElementById("newHolidayStart_date").value = "";
                    document.getElementById("newHolidayEnd_date").value = "";
                }
            }
        }

        xmlhttp.open("POST", "./php/timeManagement.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("target=holiday&action=upload&start_date=" + newHolidayStart_date + "&end_date=" + newHolidayEnd_date + "&working_id=" + targetWorking_id);
    }
}

function refreshEmployeeHoliday() {
    var html = "";
    for (var holidayCounter = 0; holidayCounter < holidayList.length; holidayCounter++) {
        html += "<tr><td colspan=\"4\"></td><td colspan=\"2\">"
            + holidayList[holidayCounter]["start_date"]
            + "</td><td colspan=\"2\">"
            + holidayList[holidayCounter]["end_date"]
            + "</td><td colspan=\"2\"><button onclick=\"deleteHoliday(event)\">delete</button></td></tr>";
    }
    document.getElementById("holidayTimetable").innerHTML = html;
}

function getEmployeeHoliday() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            holidayList = JSON.parse(xmlhttp.responseText);
            refreshEmployeeHoliday();
        }
    }

    xmlhttp.open("POST", "./php/timeManagement.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("target=holiday&action=refresh&working_id=" + targetWorking_id);
}

function checkLoadHoliday() {
    if (newHolidayStart_date == "" || newHolidayEnd_date == "") {
        alert("Blank space detected");
        return false;
    } else if (newHolidayStart_date > newHolidayEnd_date) {
        alert("Wrong time")
        return false;
    }

    return true;
}

function deleteHoliday(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    newHolidayStart_date = obj.children[1].innerHTML;
    newHolidayEnd_date = obj.children[2].innerHTML;

    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success")
                getEmployeeHoliday();
            else
                console.log(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", "./php/timeManagement.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("target=holiday&action=delete&start_date=" + newHolidayStart_date + "&end_date=" + newHolidayEnd_date + "&working_id=" + targetWorking_id);
}