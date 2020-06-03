/**
 * Ecapsulation of page navigators
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
*  Navigator jumps to the time table page
*/
function jumpToTimeTable() {
    window.location.href = "../TimeTable/TimeTable.html";
}

/**
 *  Navigator jumps to the admin interface
 */
function jumpToAdminInterface() {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin")
                window.location.href = "../AdminInterface/AdminInterface.html";
<<<<<<< HEAD
            else
                alert("No permission");
=======
            else {
                popWarningWindow("No permission");
                // alert("No permission");
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        }
    )
}

/**
 * Method to log out of the system
 */
function logout() {
    var url = "./php/login.php";
    var data = "action=logout";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                jumpToTimeTable();
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