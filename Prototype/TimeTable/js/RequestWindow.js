/**
 * Request windows manipulation methods collection
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var targetBlock = null;

/**
 * Pop up the request window and set current event object
 * @param {*} event 
 */
function popRequestWindow(event) {
    event = event ? event : window.event;
    targetBlock = event.srcElement ? event.srcElement : event.target;

    document.getElementById("modal").style.display = "block";
    document.getElementById("requestWindow").style.display = "block";
}

/**
 * Hide the request window
 */
function hideRequestWindow() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("requestWindow").style.display = "none";
}

/**
 * TODO To develop the mail system
 */
<<<<<<< HEAD
function requestLeave() { }
=======
function requestLeave() {
    requestLeaveRequest();
    hideRequestWindow();
}
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e

/**
 * Request to edit schedule
 */
function requestEdit() {
<<<<<<< HEAD
    // openEditWindow(targetBlock, "timeTable");
    openEditWindow(targetBlock);
=======
    openEditWindow();
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
    hideRequestWindow();
}