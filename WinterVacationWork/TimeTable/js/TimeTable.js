/**
 * Time table manipulation methods collection
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var monthData;
var firstDate;
// var currentWeekDay;

// This function delivers the greatest day within present month
function getMonthGreatestDate(year, month) {
    // console.log("Greatest " + year + " " + (month + 1));
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

// This function delivers the greatest day within last month
function getLastMonthGreatestDate(year, month) {
    if (month == 0) {
        year--;
        month = 12;
    }
    var d = new Date(year, month, 0);
    return d.getDate();
}

//This function get the weekday of the first day of present month
function getMonthBeginWeekDay(year, month) {
    var d = new Date(year, month, 1);
    return d.getDay();
}

function getFirstDate() {
    currentWeekDay = currentTime.getDay();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth();

    if (getMonthBeginWeekDay(year, month) != 0) {
        if (month == 0) {
            year--;
            month = 12;
        }
        var day = getLastMonthGreatestDate(year, month) - getMonthBeginWeekDay(year, month) + 1;
        firstDate = year + "-" + month + "-" + day;
    }
    else
        firstDate = year + "-" + (month + 1) + "-" + "01";
}

// This function gets the data of present month's roster plan
function getMonthData() {
    getFirstDate();
    // console.log(firstDate);
    var url = "./php/timeTable.php";
    var data = "action=get&firstDate=" + firstDate + "&group_id=" + currentGroup;

    AJAX.post(url, data,
        function (responseText) {
            // console.log(responseText);
            monthData = JSON.parse(responseText);
            buildTimeTable();
        }
    )
}