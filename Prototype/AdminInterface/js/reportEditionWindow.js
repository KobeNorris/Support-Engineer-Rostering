/**
 * Manipulation towards create employee window
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

function popReportEditionWindow(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;
    targetWorking_id = obj.children[2].innerHTML;

    obj = document.getElementById('reportEditionWindow');
    obj.style.display = "block";
}

function checkEditionParameter() {
    if (document.getElementById('reportTargetPeriod').value == "") {
        popWarningWindow("Target period could not be empty");
        return false;
    }
    else if (document.getElementById('reportTargetPayment').value == "") {
        popWarningWindow("Target period could not be empty");
        return false;
    }
    else
        return true;
}

function reportDownloadRequest() {
    if (checkEditionParameter()) {
        var period = document.getElementById('reportTargetPeriod').value;

        targetJobRole = document.getElementById('reportTargetJobRole').value;
        payment = document.getElementById('reportTargetPayment').value;
        targetYear = period.split("-")[0];
        targetMonth = period.split("-")[1];

        getReport();
        hideReportEditionWindow();
    }
}

function hideReportEditionWindow() {
    var obj = document.getElementById('reportEditionWindow');
    obj.style.display = "none";

    document.getElementById('reportTargetPeriod').value = "";
    document.getElementById('reportTargetPayment').value = "";
}