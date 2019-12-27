function jumpToProfile() {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin" || responseText == "employee")
                setTargetWorkingId();
            else {
                console.log(responseText);
                popLoginWindow();
            }
        }
    )
}

function setTargetWorkingId() {
    var url = "./php/setTarget.php";
    var data = "target=self";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                window.location.href = "../EmployeeInterface/employeeInterface.html";
            else
                alert(responseText);
        }
    )
}