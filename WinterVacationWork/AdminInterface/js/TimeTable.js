var weekNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var jobRoleList = ["primary", "secondary", "escalater"]
var sundayList = [];

refreshTimeTable();

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
        var SunToMon, TueToSat;
        for (var jobRoleCounter = 0; jobRoleCounter < 3; jobRoleCounter++) {
            SunToMon = monthData.dataA[3 * weekCounter + jobRoleCounter];
            TueToSat = monthData.dataA[3 * weekCounter + jobRoleCounter + 3];
            timeTable += "<tr class=\"" + jobRoleList[jobRoleCounter] + "JobBlockRow\">";
            if (SunToMon.working_id == "") {
                timeTable += "<td colspan=\"2\" class=\"JobBlock\" role=\"" + SunToMon.Role
                    + "\" start=\"" + SunToMon.start + "\" end=\"" + SunToMon.end + "\">";
            } else {
                timeTable += "<td colspan=\"2\" class=\"JobBlock\">";
                timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter +
                    "-0\" class=\"" + jobRoleList[jobRoleCounter] + "JobBlock\"role=\""
                    + SunToMon.Role + "\" start=\"" + SunToMon.start + "\" end=\""
                    + SunToMon.end + "\">&nbsp&nbsp" + SunToMon.working_id + "</div></td>";
            }
            if (TueToSat.working_id == "") {
                timeTable += "<td colspan=\"5\" class=\"JobBlock\" role=\"" + TueToSat.Role
                    + "\" start=\"" + TueToSat.start + "\" end=\"" + TueToSat.end + "\">";
            } else {
                timeTable += "<td colspan=\"5\" class=\"JobBlock\">";
                timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter +
                    "-0\" class=\"" + jobRoleList[jobRoleCounter] + "JobBlock\"role=\""
                    + TueToSat.Role + "\" start=\"" + TueToSat.start + "\" end=\""
                    + TueToSat.end + "\">&nbsp&nbsp" + TueToSat.working_id + "</div></td>";
            }
            timeTable += "</tr>";
        }

        timeTable += "</tbody>";
    }

    // Insert the data structure into the HTML file 
    // console.log(monthData.dataA);
    document.getElementById("timeTable").innerHTML = timeTable;
}