/**
 * Manipulation towards create employee window
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
 * Pop up create new employee window
 */
function popCreateEmployeeWindow() {
    document.getElementById("createEmployeeWindow").style.display = "block";
    document.getElementById("modal").style.display ="block";
}

/**
 * Hide create new employee window and clean remaining values
 */
function hideCreateEmployeeWindow() {
    document.getElementById("createEmployeeWindow").style.display = "none";
    document.getElementById("modal").style.display ="none";
    document.getElementById("newWorking_id").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("checkPassword").value = "";
}
