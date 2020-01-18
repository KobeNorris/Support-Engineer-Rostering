/**
 * Page initialization methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

initPage()

/**
 * Check the log in state of current user
 */
function initPage() {
    var url = "./php/Login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                getEmployeeInfo();
            } else {
                window.location.href = "../TimeTable/TimeTable.html";
            }
        }
    );
}