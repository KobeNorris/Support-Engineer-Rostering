/**
 * Encapsulation of all HTML build in methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
 * Build Employee Table of Admin Interface
 */
function buildEmployeeTable() {
    var html = "";
    var status;
    for (var index = 0; index < employeeInfo.length; index++) {
        if (employeeInfo[index]["status"]) {
            status = "Active";
        } else {
            status = "Inactive";
        }
        html += "<tr><td>"
            + employeeInfo[index]["name"] + "</td><td>"
            + status + "</td><td>"
            + employeeInfo[index]["working_id"] + "</td>"
            //+ "<td>" + employeeInfo[index]["group_id"] + "</td>"
            + "<td><button class=\"btn btn-secondary\" onclick=\"jumpToTargetProfile(event)\">view</botton></td>"
            + "<td><button class=\"btn btn-secondary\">report</button></td>"
            + "<td><button class=\"btn btn-secondary\" onclick=\"deleteEmployee(event)\">delete</botton></td>"
            + "</tr>";
    }
    document.getElementById("employeeTable").innerHTML = html;
}
