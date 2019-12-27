initPage()

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