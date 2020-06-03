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
<<<<<<< HEAD
    var status;
    for (var index = 0; index < employeeInfo.length; index++) {
        if (employeeInfo[index]["status"]) {
=======
    var groups = [];
    var lastGroup = "";

    //Get the different groups employees are in and store them in groups
    for (var index = 0; index < employeeInfo.length; index++) {
        if (employeeInfo[index]["group_id"] != lastGroup && employeeInfo[index]["group_id"] != "") {
            groups.push(employeeInfo[index]["group_id"]);
            lastGroup = employeeInfo[index]["group_id"];
        }
    }
    // console.log(employeeInfo);

    for (var index = 0; index < groups.length; index++) {
        html += "<button id='groupButton' onclick=\"buildGroupEmployees('" + groups[index] + "')\">" + groups[index] + "</button>";
    }
    html += "<button id='groupButton' onclick=\"buildGroupEmployees('Other')\">Other</button>";
    document.getElementsByClassName("groupNavigationBar")[0].innerHTML = html;

    buildGroupEmployees(groups[0]);
}

/**
 * Display all the employees from a particular group
 * @param {string} group - The group to display
 */
function buildGroupEmployees(group) {
    var status;
    var html = "";

    for (var index = 0; index < employeeInfo.length; index++) {
        // if employee isn't in this group, move to the next employee
        if (employeeInfo[index]["group_id"] != group.toString()) {
            // console.log(group.toString() + " " + employeeInfo[index]["group_id"]);
            if (group.toString() != "Other" || employeeInfo[index]["group_id"] != "") {
                continue;
            }
        }

        if (employeeInfo[index]["status"] == 1) {
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
            status = "Active";
        } else {
            status = "Inactive";
        }
<<<<<<< HEAD
=======
        //Put the current employee's info into the employee table
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        html += "<tr><td>"
            + employeeInfo[index]["name"] + "</td><td>"
            + status + "</td><td>"
            + employeeInfo[index]["working_id"] + "</td>"
<<<<<<< HEAD
            //+ "<td>" + employeeInfo[index]["group_id"] + "</td>"
            + "<td><button onclick=\"jumpToTargetProfile(event)\">view</botton></td>"
            + "<td><button>report</button></td>"
            + "<td><button onclick=\"deleteEmployee(event)\">delete</botton></td>"
            + "</tr>";
    }
    document.getElementById("employeeTable").innerHTML = html;
=======
            + "<td><button onclick=\"jumpToTargetProfile(event)\">view</botton></td>"
            + "<td><button onclick=\"popReportEditionWindow(event)\">report</button></td>"
            + "<td><button onclick=\"deleteEmployee(event)\">delete</botton></td>"
            + "</tr>";
    }
    document.getElementById("employeeTableBody").innerHTML = html;
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
}