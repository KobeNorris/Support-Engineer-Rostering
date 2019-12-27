var newHolidayStart_date;
var newHolidayEnd_date;
var holidayList = [];

function upLoadHoliday() {
    newHolidayStart_date = document.getElementById("newHolidayStart_date").value;
    newHolidayEnd_date = document.getElementById("newHolidayEnd_date").value;

    if (checkLoadDeployment()) {
        var url = "./php/timeManagement.php";
        var data = "target=holiday&action=upload&start_date=" + newHolidayStart_date
            + "&end_date=" + newHolidayEnd_date + "&working_id=" + targetWorking_id

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    getEmployeeHoliday();
                    document.getElementById("newHolidayStart_date").value = "";
                    document.getElementById("newHolidayEnd_date").value = "";
                }
            }
        );
    }
}

function getEmployeeHoliday() {
    var url = "./php/timeManagement.php";
    var data = "target=holiday&action=refresh&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            holidayList = JSON.parse(responseText);
            buildEmployeeHoliday();
        }
    );
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

    var url = "./php/timeManagement.php";
    var data = "target=holiday&action=delete&start_date=" + newHolidayStart_date
        + "&end_date=" + newHolidayEnd_date + "&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                getEmployeeHoliday();
            else
                console.log(responseText);
        }
    );
}