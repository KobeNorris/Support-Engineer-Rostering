/**
 * Ecapsulation of page navigators
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
 * Navigator jumps to the time table
 */
function jumpToTimeTable() {
    window.location.href = "../TimeTable/TimeTable.html";
}

/**
 * Navigator jumps to the taget employee profile
 * @param {*event} event The event triggered by user's action
 */
function jumpToTargetProfile(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;
    var targetWorking_id = obj.children[2].innerHTML;

    var url = "./php/setTarget.php";
    var data = "target=other&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                window.location.href = "../EmployeeInterface/employeeInterface.html";
            else
<<<<<<< HEAD
                alert(responseText);
=======
                popWarningWindow(responseText);
            // alert(responseText);
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        }
    )
}