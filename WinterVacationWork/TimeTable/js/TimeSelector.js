/**
 * Time selector manipulation methods collection
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
var currentDay = currentTime.getDate();

var currentWeekDay = currentTime.getDay();
var year = currentYear;
var month = currentMonth;

var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var yearChecker = /^\d{4}$/;

/**
 * Refresh the time selector with current data
 */
function refreshTimeSelector() {
    month = currentTime.getMonth();
    year = currentTime.getFullYear();
    document.getElementById("timeSelectorMonth").innerHTML = monthNameList[month];
    document.getElementById("timeSelectorYear").value = year;
    getMonthData();
}

/**
 * Add one month to current date data
 */
function addOneMonth() {
    currentTime.setDate(1);
    currentTime.setMonth(currentTime.getMonth() + 1);
    refreshTimeSelector();
    buildTimeTable();
}

/**
 * Deduct one month from current date data
 */
function deductOneMonth() {
    currentTime.setDate(1);
    currentTime.setMonth(currentTime.getMonth() - 1);
    refreshTimeSelector();
    buildTimeTable();
}

/**
 * Set current date data to selected target year
 * @param {*} selectedYear Target year
 */
function setYear(selectedYear) {
    if (!yearChecker.test(selectedYear)) {
        console.log("Bugs!" + selectedYear + "\n");
        document.getElementById("timeSelectorYear").value = year;
        return;
    }
    currentTime.setFullYear(selectedYear);
    refreshTimeSelector();
    buildTimeTable();
}