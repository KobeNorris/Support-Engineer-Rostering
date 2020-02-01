var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
var currentDay = currentTime.getDate();

var currentWeekDay = currentTime.getDay();
var Year = currentYear;
var Month = currentMonth;
var Day = currentDay;

var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var yearChecker = /^\d{4}$/;
// var yearChecker = /^-?[0~9]+$/;

refreshTimeSelecter();

function refreshTimeSelecter() {
    Month = currentTime.getMonth();
    Year = currentTime.getFullYear();
    document.getElementById("timeSelecterMonth").innerHTML = monthNameList[Month];
    document.getElementById("timeSelecterYear").value = Year;
}

function addOneMonth() {
    currentTime.setMonth(currentTime.getMonth() + 1);
    refreshTimeSelecter();
    refreshTimeTable();
}

function deductOneMonth() {
    currentTime.setMonth(currentTime.getMonth() - 1);
    refreshTimeSelecter();
    refreshTimeTable();
}

function setYear(selectedYear) {
    if (!yearChecker.test(selectedYear)) {
        console.log("Bugs!" + selectedYear + "\n");
        document.getElementById("timeSelecterYear").value = Year;
        return;
    }
    currentTime.setFullYear(selectedYear);
    refreshTimeSelecter();
    refreshTimeTable();
}