function buildEmployeeDeployment() {
    var html = "";
    for (var deploymentCounter = 0; deploymentCounter < deploymentList.length; deploymentCounter++) {
        html += "<tr><td colspan=\"4\"></td><td colspan=\"2\">"
            + deploymentList[deploymentCounter]["start_date"]
            + "</td><td colspan=\"2\">"
            + deploymentList[deploymentCounter]["end_date"]
            + "</td><td colspan=\"2\"><button onclick=\"deleteDeployment(event)\">delete</button></td></tr>";
    }
    document.getElementById("deploymentTimetable").innerHTML = html;
}

function buildEmployeeHoliday() {
    var html = "";
    for (var holidayCounter = 0; holidayCounter < holidayList.length; holidayCounter++) {
        html += "<tr><td colspan=\"4\"></td><td colspan=\"2\">"
            + holidayList[holidayCounter]["start_date"]
            + "</td><td colspan=\"2\">"
            + holidayList[holidayCounter]["end_date"]
            + "</td><td colspan=\"2\"><button onclick=\"deleteHoliday(event)\">delete</button></td></tr>";
    }
    document.getElementById("holidayTimetable").innerHTML = html;
}