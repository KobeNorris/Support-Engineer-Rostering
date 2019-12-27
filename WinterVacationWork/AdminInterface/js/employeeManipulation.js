/**
 * Manipulation towards employee personal information
 * @version 1.0
 * @author Kejia Wu (kobenorriswu@gmail.com)
 * All rights are reserved.
 */

var employeeInfo;
var newWorking_id;
var newPassword;
var checkPassword;

/**
 * Get employee data from database
 */
function getEmployeeInfo() {
    var url = "./php/employeeManipulation.php";
    var data = "action=get";

    AJAX.post(url, data,
        function (responseText) {
            employeeInfo = JSON.parse(responseText);
            buildEmployeeTable();
        }
    );
}

/**
 * Create employee data and put it into database
 */
function createNewEmployee() {
    newWorking_id = document.getElementById("newWorking_id").value;
    newPassword = document.getElementById("newPassword").value;
    checkPassword = document.getElementById("checkPassword").value;

    if (checkInput()) {
        var url = "./php/employeeManipulation.php";
        var data = "action=createt&working_id=" + newWorking_id + "&password=" + newPassword;

        AJAX.post(url, data,
            function (responseText) {
                if (xmlhttp.responseText == "Success") {
                    getEmployeeInfo();
                    hideCreateEmployeeWindow();
                }
                else
                    alert(xmlhttp.responseText);
            }
        );
    }
}

/**
 * Delete employee data from database
 */
function deleteEmployee(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    var targetWorking_id = obj.children[2].innerHTML;

    var url = "./php/employeeManipulation.php";
    var data = "action=delete&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (xmlhttp.responseText == "Success")
                getEmployeeInfo();
            else
                alert(xmlhttp.responseText);
        }
    );
}

/**
 * Generate report of employee data from database
 */
function generateReport(event) {

}

/**
 * Check the user inputs from the frontend
 */
function checkInput() {
    var flag = true;

    if (checkPassword != newPassword) {
        alert("Wrong password check");
        flag = false;
    }

    if (newWorking_id == "") {
        alert("Working_id could not be empty");
        flag = false;
    }

    if (newPassword == "") {
        alert("Password could not be empty");
        flag = false;
    }

    return flag;
}