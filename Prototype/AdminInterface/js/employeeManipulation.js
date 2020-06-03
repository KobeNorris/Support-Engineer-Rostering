/**
 * Manipulation towards employee personal information
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
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
        var data = "action=create&working_id=" + newWorking_id + "&password=" + newPassword;

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    getEmployeeInfo();
                    hideCreateEmployeeWindow();
                }
                else
<<<<<<< HEAD
                    alert(responseText);
=======
                    popWarningWindow(responseText);
                // alert(responseText);
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
            if (responseText == "Success")
                getEmployeeInfo();
            else
<<<<<<< HEAD
                alert(responseText);
=======
                popWarningWindow(responseText);
            // alert(responseText);
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
        alert("Wrong password check");
=======
        popWarningWindow("Wrong password check");
        // alert("Wrong password check");
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        flag = false;
    }

    if (newWorking_id == "") {
<<<<<<< HEAD
        alert("Working_id could not be empty");
=======
        popWarningWindow("Working_id could not be empty");
        // alert("Working_id could not be empty");
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        flag = false;
    }

    if (newPassword == "") {
<<<<<<< HEAD
        alert("Password could not be empty");
=======
        popWarningWindow("Password could not be empty");
        // alert("Password could not be empty");
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        flag = false;
    }

    return flag;
}