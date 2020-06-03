/**
 * Manipulation towards create employee window
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
* Pop up warning window
*/
function popWarningWindow(warningMessage) {
    document.getElementById("warningMessage").innerHTML = warningMessage;
    document.getElementById("warningWindow").style.display = "block";
}

/**
 * Hide warning window
 */
function hideWarningWindow() {
    document.getElementById("warningWindow").style.display = "none";
}