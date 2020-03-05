function popReportEditionWindow(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;
    targetWorking_id = obj.children[2].innerHTML;

    obj = document.getElementById('reportEditionTable');
    obj.style.display = "block";
}

function reportDownloadRequest() {
    // TODO check blocks

    var period = document.getElementById('reportTargetPeriod').value;

    targetJobRole = document.getElementById('reportTargetJobRole').value;
    payment = document.getElementById('reportTargetPayment').value;
    targetYear = period.split("-")[0];
    targetMonth = period.split("-")[1];

    getReport();
    hideReportEditionWindow();
}

function hideReportEditionWindow() {
    // TODO clear blocks
    var obj = document.getElementById('reportEditionTable');
    obj.style.display = "none";
}