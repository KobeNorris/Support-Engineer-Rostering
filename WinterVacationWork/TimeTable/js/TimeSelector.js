var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
var currentDay = currentTime.getDate();

var currentWeekDay = currentTime.getDay();
var Year = currentYear;
var Month = currentMonth;
// var Day = currentDay;

var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var yearChecker = /^\d{4}$/;

function refreshTimeSelector() {
    Month = currentTime.getMonth();
    Year = currentTime.getFullYear();
    document.getElementById("timeSelectorMonth").innerHTML = monthNameList[Month];
    document.getElementById("timeSelectorYear").value = Year;
    getMonthData();
}

function addOneMonth() {
    // console.log("Before: " + currentTime.getMonth());
    currentTime.setDate(1);
    currentTime.setMonth(currentTime.getMonth() + 1);
    // console.log("After: " + currentTime.getMonth());
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
        document.getElementById("timeSelectorYear").value = Year;
        return;
    }
    currentTime.setFullYear(selectedYear);
    refreshTimeSelector();
    buildTimeTable();
}