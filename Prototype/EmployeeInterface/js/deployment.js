/**
 * Encapsulation of deployment related methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var newDeploymentStart_date;
var newDeploymentEnd_date;
var deploymentList = [];

/**
 * Upload new deployment period to database
 */
function upLoadDeployment() {
    newDeploymentStart_date = document.getElementById("newDeploymentStart_date").value;
    newDeploymentEnd_date = document.getElementById("newDeploymentEnd_date").value;

    if (checkLoadDeployment()) {
        var url = "./php/timeManagement.php";
        var data = "target=deployment&action=upload&start_date=" + newDeploymentStart_date
            + "&end_date=" + newDeploymentEnd_date + "&working_id=" + targetWorking_id;

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    getEmployeeDeployment();
                    document.getElementById("newDeploymentStart_date").value = "";
                    document.getElementById("newDeploymentEnd_date").value = "";
                }
            }
        );
    }
}

/**
 * Get employee deployment from database
 */
function getEmployeeDeployment() {
    var url = "./php/timeManagement.php";
    var data = "target=deployment&action=refresh&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            deploymentList = JSON.parse(responseText);
            buildEmployeeDeployment();
        }
    );
}

/**
 * Check blank space and wrong time order of deployment period
 */
function checkLoadDeployment() {
    if (newDeploymentStart_date == "" || newDeploymentEnd_date == "") {
        popWarningWindow("Blank space detected");
        // alert("Blank space detected");
        return false;
    } else if (newDeploymentStart_date > newDeploymentEnd_date) {
        popWarningWindow("Wrong time");
        // alert("Wrong time");
        return false;
    }

    return true;
}

/**
 * Delete selected employee deployment from database
 */
function deleteDeployment(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    newDeploymentStart_date = obj.children[1].innerHTML;
    newDeploymentEnd_date = obj.children[2].innerHTML;


    var url = "./php/timeManagement.php";
    var data = "target=deployment&action=delete&start_date=" + newDeploymentStart_date
        + "&end_date=" + newDeploymentEnd_date + "&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                getEmployeeDeployment();
            else
                console.log(xmlhttp.responseText);
        }
    );
}