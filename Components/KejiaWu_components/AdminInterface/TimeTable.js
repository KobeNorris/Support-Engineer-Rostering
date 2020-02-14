// Description:     This file contians functions to set up the timetable for the adminstrator
//                  interface.
// Writer:          Kejia Wu
// Reliance:        None

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
            // weekDayCounter = 0;
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
    passData();
    getMonthData();
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
    /*
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../../LiamOrrill_components/data.json');
      xhr.responseType = 'json';
      xhr.onload = function(e) {
        if (this.status == 200) {
          console.log('response', this.response); // JSON response
        }
      };
      xhr.send();*/
    var xmlhttp;
    var monthData;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('response', this.response); // JSON response
            monthData = JSON.parse(xmlhttp.responseText);
            document.getElementById("Demo").innerHTML = monthData[0].end;
            /*var dateNumber = monthData[0].Start;
            dateNumber = dateNumber.slice(8,10);
            if(dateNumber < 10){
              dateNumber = dateNumber.slice(1);
            }*/
            document.getElementById("Demo").innerHTML = dateNumber;

            for (var weekIndex = 0; weekIndex < monthData.length; weekIndex++) {

                var dateNumber = monthData[weekIndex].Start;
                dateNumber = dateNumber.slice(8, 10);
                if (dateNumber < 10) {
                    dateNumber = dateNumber.slice(1);
                }
                //for(var dayIndex = 0; dayIndex < 7; dayIndex++)
                if (monthData[weekIndex].Role == "primary" && dateNumber > 2 && dateNumber < 10 /*&&  document.getElementById("")   == dateNumber*/) {
                    document.getElementById("0-0-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-0-0").innerHTML = monthData[weekIndex].working_id;
                }
                if (monthData[weekIndex].Role == "Secondary" && dateNumber > 2 && dateNumber < 10) {
                    document.getElementById("0-1-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-1-0").innerHTML = monthData[weekIndex].working_id;

                }
                if (monthData[weekIndex].Role == "manager" && dateNumber > 2 && dateNumber < 10) {
                    document.getElementById("0-2-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-2-0").innerHTML = monthData[weekIndex].working_id;
                }


                if (monthData[weekIndex].Role == "primary" && dateNumber > 2 && dateNumber < 10 /*&&  document.getElementById("")   == dateNumber*/) {
                    document.getElementById("1-0-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-0-0").innerHTML = monthData[weekIndex].working_id;
                }
                if (monthData[weekIndex].Role == "Secondary" && dateNumber > 2 && dateNumber < 10) {
                    document.getElementById("0-1-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-1-0").innerHTML = monthData[weekIndex].working_id;

                }
                if (monthData[weekIndex].Role == "manager" && dateNumber > 2 && dateNumber < 10) {
                    document.getElementById("0-2-1").innerHTML = monthData[weekIndex].working_id;
                    document.getElementById("1-2-0").innerHTML = monthData[weekIndex].working_id;
                }
                //document.getElementById("Demo").innerHTML = year;





                document.getElementById("Demo").innerHTML = "loop" + weekIndex;
                //document.getElementById("Demo").innerHTML = year;





            }
        }
    }

    xmlhttp.open('GET', "../../LiamOrrill_components/data.json", true);
    xmlhttp.send();
    updateRoster(monthData);
}

//This function will update present roster plan to the backend 
function updateRoster(monthData) {
    console.log(sundayList);
    for (var weekIndex = 0; weekIndex < monthData.length; monthData++) {


        function passData() {
            // Create our XMLHttpRequest object
            var tableData = document.getElementById("0-0-Date").innerHTML;
            var month = currentTime.getMonth();
            var year = currentTime.getFullYear();
            var xhr = new XMLHttpRequest();
            //  var tableData = document.getElementById("0-0-Date").innerHTML;
            xhr.onload = function () {
                const serverResponse = document.getElementById("Demo");
                serverResponse.innerHTML = this.responseText;
            }
            var d = 12
            xhr.open("POST", "TimeTable.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(encodeURIComponent(year + "-" + month + "-" + tableData));
        }
    }
}