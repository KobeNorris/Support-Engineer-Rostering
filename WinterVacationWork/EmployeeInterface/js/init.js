initPage();

function initPage() {
    var url = "./php/Login.php";
    var data = "action=getWorkingId";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText != "Fail") {
                targetWorking_id = responseText;
                refreshEmployePicture();
                refreshEmployeProfile();
                getEmployeeDeployment();
                getEmployeeHoliday();
            } else {
                window.location.href = "../TimeTable/TimeTable.html";
            }
        }
    );
}