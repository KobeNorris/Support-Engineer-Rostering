var weekNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var roleList = ["PrimaryEngineer", "SecondaryEngineer", "EscalationManager"];

// This method builds up the employee category
function buildEmployeeList() {
    var html = "";

    for (var groupIndex = 0; groupIndex < groupList.length; groupIndex++) {
        html += "<div id=\"" + groupList[groupIndex] + "\" onclick=\"checkNameList(event)\">" + groupList[groupIndex] + "</div>";
        html += "<div id=\"" + groupList[groupIndex] + "NameList\" class=\"employeeNameList\" style=\"display: none;\">";
        var List = nameList[groupList[groupIndex]];
        if (List != null) {
            for (var iCountNameList = 0; iCountNameList < List.length; iCountNameList++) {
                html += "<div working_id=\"" + List[iCountNameList]['working_id'] + "\" "
                    + "job_role=\"" + List[iCountNameList]['job_role'] + "\" "
                    + "onclick=\"openEditWindow(event, \'employeeCategory\')\">"
                    + List[iCountNameList]['name'] + "</div>";
            }
        }
        html += "</div>";
    }

    document.getElementById("employeeCategory").innerHTML = html;
}


// This method will rebuild the entire time table accroding to present date information
// and demonstrate it to the user.

function buildTimeTable() {
    currentWeekDay = currentTime.getDay();
    Year = currentTime.getFullYear();
    Month = currentTime.getMonth();
    // Day = currentTime.getDate();
    var weekday = getMonthBeginWeekDay(Year, Month);
    var numOfTotalDay = getMonthGreatestDate(Year, Month);
    var numOFLastTotalDay = getLastMonthGreatestDate(Year, Month);
    var totalDayCounter = 0 - weekday;
    // console.log(weekday);
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
        }
        timeTable += "</tr>";

        // Demonstrate the job roles allocation during one week period
        var SunToMon, TueToSat, SunToMonClass, TueToSatClass;
        for (var jobRoleCounter = 0; jobRoleCounter < 3; jobRoleCounter++) {
            SunToMon = monthData[3 * weekCounter + jobRoleCounter];
            TueToSat = monthData[3 * weekCounter + jobRoleCounter + 3];
            SunToMonClass = (SunToMon.working_id == "" ? "emptyJobBlock" : roleList[jobRoleCounter]);
            TueToSatClass = (TueToSat.working_id == "" ? "emptyJobBlock" : roleList[jobRoleCounter]);

            timeTable += "<tr>";
            timeTable += "<td colspan=\"2\" class=\"JobBlock\">";
            timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter +
                "-0\" class=\"" + SunToMonClass + "JobBlock\"" +
                "working_id=\"" + SunToMon.working_id + "\" " +
                "job_role=\"" + SunToMon.job_role + "\" " +
                "start_date=\"" + SunToMon.start_date + "\" " +
                "end_date=\"" + SunToMon.end_date + "\" " +
                "onclick=\"openEditWindow(event, \'timeTable\')\"" +
                ">&nbsp&nbsp" + SunToMon.name + "</div></td>";
            timeTable += "<td colspan=\"5\" class=\"JobBlock\">";
            timeTable += "<div id=\"" + weekCounter + "-" + jobRoleCounter +
                "-0\" class=\"" + TueToSatClass + "JobBlock\"" +
                "working_id=\"" + TueToSat.working_id + "\" " +
                "job_role=\"" + TueToSat.job_role + "\" " +
                "start_date=\"" + TueToSat.start_date + "\" " +
                "end_date=\"" + TueToSat.end_date + "\" " +
                "onclick=\"openEditWindow(event, \'timeTable\')\"" +
                ">&nbsp&nbsp" + TueToSat.name + "</div></td>";
            timeTable += "</tr>";
        }
        timeTable += "</tbody>";
    }

    // Insert the data structure into the HTML file
    document.getElementById("timeTable").innerHTML = timeTable;
}