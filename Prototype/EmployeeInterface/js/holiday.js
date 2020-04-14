/**
 * Encapsulation of holiday related methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var newHolidayStart_date;
var newHolidayEnd_date;
var holidayList = [];

/**
 * Upload new holiday period to database
 */
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

/**
 * Get employee holiday from database
 */
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

/**
 * Check blank space and wrong time order of holiday period
 */
function checkLoadHoliday() {
    if (newHolidayStart_date == "" || newHolidayEnd_date == "") {
        popWarningWindow("Blank space detected");
        // alert("Blank space detected");
        return false;
    } else if (newHolidayStart_date > newHolidayEnd_date) {
        popWarningWindow("Wrong time");
        // alert("Wrong time")
        return false;
    }

    return true;
}

/**
 * Delete selected employee holiday from database
 */
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