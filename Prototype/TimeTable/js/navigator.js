/**
 * Ecapsulation of page navigators
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
 * Navigator jumps to the specific employee profile according 
 * to target working id
 */
function jumpToProfile() {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin" || responseText == "employee")
                setTargetWorkingId();
            else {
                console.log(responseText);
                popLoginWindow();
            }
        }
    )
}

/**
 * Set current target working id
 */
function setTargetWorkingId() {
    var url = "./php/setTarget.php";
    var data = "target=self";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                window.location.href = "../EmployeeInterface/employeeInterface.html";
<<<<<<< HEAD
            else
                alert(responseText);
=======
            else {
                popWarningWindow(responseText);
                // alert(responseText);
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        }
    )
}