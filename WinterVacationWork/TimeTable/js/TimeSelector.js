var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
var currentDay = currentTime.getDate();

var currentWeekDay = currentTime.getDay();
var year = currentYear;
var month = currentMonth;

var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var yearChecker = /^\d{4}$/;

function refreshTimeSelector() {
    month = currentTime.getMonth();
    year = currentTime.getFullYear();
    document.getElementById("timeSelectorMonth").innerHTML = monthNameList[month];
    document.getElementById("timeSelectorYear").value = year;
    getMonthData();
}

function addOneMonth() {
    currentTime.setDate(1);
    currentTime.setMonth(currentTime.getMonth() + 1);
    refreshTimeSelector();
    buildTimeTable();
}

function deductOneMonth() {
    currentTime.setDate(1);
    currentTime.setMonth(currentTime.getMonth() - 1);
    refreshTimeSelector();
    buildTimeTable();
}

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