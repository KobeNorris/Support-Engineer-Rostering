var weekNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

refreshTimeTable();

function refreshTimeTable() {
    currentWeekDay = currentTime.getDay();
    Year = currentTime.getFullYear();
    Month = currentTime.getMonth();
    Day = currentTime.getDate();
    var weekday = getMonthBeginWeekDay();
    var numOfTotalDay = getMonthGreatestDate(Year, Month);
    var numOFLastTotalDay = getLastMonthGreatestDate(Year, Month);
    var totalDayCounter = 0 - weekday;
    var dayCounter;

    var blockClass;
    var timeTable;

    timeTable = "<tr class=\"weekDayBlockRow\">\n";
    for (var counter = 0; counter < 7; counter++) {
        timeTable += "<td>" + weekNameList[counter] + "</td>\n";
    }
    timeTable += "</tr>\n";

    for (weekCounter = 0; weekCounter < 6; weekCounter++) {
        timeTable += "<tr class=\"normalDayBlockRow\">\n";

        for (var weekDayCounter = 0; weekDayCounter < 7; weekDayCounter++) {
            var blockID = weekCounter + "-" + weekDayCounter;
            if (totalDayCounter < 0) {
                blockClass = "blockedTimeTableBlock";
                dayCounter = ++totalDayCounter + numOFLastTotalDay;
            }
            else if (totalDayCounter >= numOfTotalDay) {
                blockClass = "blockedTimeTableBlock";
                dayCounter = ++totalDayCounter - numOfTotalDay;
            }
            else if (currentYear > Year || (currentYear == Year && (currentMonth > Month || (currentMonth == Month && currentDay > totalDayCounter)))) {
                blockClass = "passedTableBlock";
                dayCounter = ++totalDayCounter;
            }
            else {
                blockClass = "emptyTimeTableBlock";
                dayCounter = ++totalDayCounter;
            }

            // totalDayCounter++;
            timeTable += "<td id=\"" + blockID + "\" class=\"" + blockClass + "\">\n" +
                "<table class=\"innerTable\">" +
                "<tbody>" +
                "<tr><td>" + dayCounter + "</td></tr>" +
                "<tr id=\"" + blockID + "-1\"" + " class=\"primeryBlock\"><td></td></tr>" +
                "<tr id=\"" + blockID + "-2\"" + " class=\"secondaryBlock\"><td></td></tr>" +
                "<tr id=\"" + blockID + "-3\"" + " class=\"escalaterBlock\"><td></td></tr>" +
                "</tbody>" +
                "</table>" +
                "</td>"
        }

        timeTable += "</tr>";
    }

    console.log(timeTable);
    document.getElementById("timeTable").innerHTML = timeTable;
    loadPerson();
}

function getMonthGreatestDate(year, month) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

function getLastMonthGreatestDate(year, month) {
    if (month == 0) {
        year--;
        month = 11;
    }
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

function loadPerson() {
    document.getElementById("1-2-1").innerHTML = "<td>" + "Kobe Noriss WU" + "</td>";
}