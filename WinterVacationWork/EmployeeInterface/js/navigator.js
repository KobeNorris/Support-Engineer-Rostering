/**
 * Ecapsulation of page navigators
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
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
            else
                alert("No permission");
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
            else
                alert(responseText);
        }
    )
}