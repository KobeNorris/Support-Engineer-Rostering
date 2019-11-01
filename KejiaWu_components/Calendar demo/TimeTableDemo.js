var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
var currentDay = currentTime.getDate();

var currentWeekDay = currentTime.getDay();
var Year = currentYear;
var Month = currentMonth;
var Day = currentDay;

var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



refreshTimeSelecter();

function refreshTimeSelecter() {
    Month = currentTime.getMonth();
    Year = currentTime.getFullYear();
    document.getElementById("timeSelecter.Month").innerHTML = monthNameList[Month];
    document.getElementById("timeSelecter.Year").innerHTML = Year;
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



refreshTimeTable();

function refreshTimeTable() {
    currentWeekDay = currentTime.getDay();
    Year = currentTime.getFullYear();
    Month = currentTime.getMonth();
    Day = currentTime.getDate();
    var weekday = getMonthBeginWeekDay();
    var numOfTotalDay = getMonthGreatestDate(Year, Month);
    var totalDayCounter = 0 - weekday;

    var blockClass;
    var timeTable;

    timeTable = "<tr class=\"\">\n";
    for (var counter = 0; counter < 7; counter++) {
        timeTable += "<td>" + weekNameList[counter] + "</td>\n";
    }
    timeTable += "</tr>\n";

    for (var weekCounter = 0; totalDayCounter < numOfTotalDay; weekCounter++) {
        timeTable += "<tr class=\"\">\n";

        for (var weekDayCounter = 0; weekDayCounter < 7; weekDayCounter++) {
            if ((totalDayCounter < 0) || totalDayCounter >= numOfTotalDay) {
                blockClass = "blockedTimeTableBlock";
            }
            else if (currentYear > Year || (currentYear == Year && (currentMonth > Month || (currentMonth == Month && currentDay > totalDayCounter)))) {
                blockClass = "passedTableBlock";
            }
            else {
                blockClass = "emptyTimeTableBlock";
            }

            totalDayCounter++;
            timeTable += "<td id=\"\" class=\"" + blockClass + "\">" + totalDayCounter + "</td>\n";
        }

        timeTable += "</tr>\n";
    }

    document.getElementById("timeTable").innerHTML = timeTable;
}

function getMonthGreatestDate(year, month) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

function getMonthBeginWeekDay() {
    var temp = currentWeekDay + (7 - currentDay % 7) + 1;
    if (temp > 6) {
        temp -= 7;
    }

    return temp;
}