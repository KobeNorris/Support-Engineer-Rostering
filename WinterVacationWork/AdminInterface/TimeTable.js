var weekNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var jobRoleList = ["primary", "secondary", "escalater"]
var sundayList = [];

refreshTimeTable();
getMonthData();

// This method will rebuild the entire time table accroding to present date information
// and demonstrate it to the user.
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
    var weekDayCounter;

    var blockClass;
    var timeTable;

    // Construct the weekdays in the first role
    timeTable = "<tr class=\"weekDayBlockRow\">";
    for (var counter = 0; counter < 7; counter++) {
        timeTable += "<td>" + weekNameList[counter] + "</td>";
    }
    timeTable += "</tr>";

    // Contruct specific date of the timetable and demonstrate its status: Last month? Next month?
    for (weekCounter = 0; weekCounter < 6; weekCounter++) {
        timeTable += "<tbody class = \"dayTbody\"><tr class=\"normalDayBlockRow\">";
        for (weekDayCounter = 0; weekDayCounter < 7; weekDayCounter++) {

            var blockID = weekCounter + "-" + weekDayCounter + "-Date";
            ++totalDayCounter
            // Days from last month
            if (totalDayCounter <= 0) {
                blockClass = "blockedTimeTableBlock";
                dayCounter = totalDayCounter + numOFLastTotalDay;
            }
            // Days form next month
            else if (totalDayCounter > numOfTotalDay) {
                blockClass = "blockedTimeTableBlock";
                dayCounter = totalDayCounter - numOfTotalDay;
            }
            // Days past && within this month
            else if (currentYear > Year || (currentYear == Year && (currentMonth > Month || (currentMonth == Month && currentDay > totalDayCounter)))) {
                blockClass = "passedTableBlock";
                dayCounter = totalDayCounter;
            }
            // Days in the future && with in this month
            else {
                blockClass = "emptyTimeTableBlock";
                dayCounter = totalDayCounter;
            }
            timeTable += "<td id=\"" + blockID + "\" class=\"" + blockClass + "\">&nbsp"
                + dayCounter
                + "</td>";

            if (weekDayCounter == 0) {
                if (dayCounter < 10)
                    sundayList.push(Year + "-" + Month + "-0" + dayCounter);
                else
                    sundayList.push(Year + "-" + Month + "-" + dayCounter);
            }
        }
        timeTable += "</tr>";

        // Demonstrate the job roles allocation during one week period
        for (var jobRoleCounter = 0; jobRoleCounter < 3; jobRoleCounter++) {
            timeTable += "<tr class=\"" + jobRoleList[jobRoleCounter] + "JobBlockRow\">";
            weekDayCounter = 0;
            if (0) {
                timeTable += "<td colspan=\"2\" class=\"JobBlock\">";
            } else {
                timeTable += "<td colspan=\"2\" class=\"JobBlock\">";
                timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter + "-0\" class=\"" + jobRoleList[jobRoleCounter] + "JobBlock\"></div></td>";
            }
            if (0) {
                timeTable += "<td colspan=\"5\" class=\"JobBlock\">";
            } else {
                timeTable += "<td colspan=\"5\" class=\"JobBlock\">";
                timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter + "-1\" class=\"" + jobRoleList[jobRoleCounter] + "JobBlock\"></div></td>";
            }
            timeTable += "</tr>";
        }

        timeTable += "</tbody>";
    }

    // Insert the data structure into the HTML file 
    // console.log(timeTable);
    document.getElementById("timeTable").innerHTML = timeTable;
    // loadPerson();
}

// This function delivers the greatest day within present month
function getMonthGreatestDate(year, month) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

// This function delivers the greatest day within last month
function getLastMonthGreatestDate(year, month) {
    if (month == 0) {
        year--;
        month = 11;
    }
    var d = new Date(year, month, 0);
    return d.getDate();
}

//This function get the weekday of the first day of present month
function getMonthBeginWeekDay() {
    var temp = currentWeekDay + (7 - currentDay % 7) + 1;
    if (temp > 6) {
        temp -= 7;
    }

    return temp;
}

// This function gets the data of present month's roster plan
function getMonthData() {
    var xmlhttp;
    var monthData;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open("GET", "./TimeTable.php", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            monthData = eval(xmlhttp.responseText);
            updateRoster(monthData);
        }
    }
    // xmlhttp.open("GET", "./TimeTable.php", true);
    // xmlhttp.open("POST", "./TimeTable.php", true);
    // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

//This function will update present roster plan to the backend 
function updateRoster(monthData) {
    console.log(sundayList);
    for (var weekIndex = 0; weekIndex < monthData.length; monthData++) {

    }
}