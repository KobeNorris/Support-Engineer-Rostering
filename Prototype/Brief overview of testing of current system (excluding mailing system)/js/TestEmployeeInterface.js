var employeeProfile;

function accessProfile() {
    var url = "../EmployeeInterface/php/employeeProfile.php";
    var data = "action=get&targetWorking_id=" + "scykw1";

    AJAX.post(url, data,
        function (responseText) {
            employeeProfile = JSON.parse(responseText);
            document.getElementById("AP").innerHTML = "Success";
            updateProfile();
        }
    );
}

function updateProfile() {

    var url = "../EmployeeInterface/php/employeeProfile.php";
    var data = "action=update&employeeProfile=" + JSON.stringify(employeeProfile)
        + "&&working_id=" + "scykw1";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("UP").innerHTML = "Success";
                updatePassword();
            }
            else {
                document.getElementById("UP").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function updatePassword() {
    if (true) {
        var url = "../EmployeeInterface/php/account.php"
        var data = "action=changePassword&oldPassword=" + "1234"
            + "&newPassword=" + "1234";

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    document.getElementById("CP").innerHTML = "Success";
                    updateHoliday();
                }
                else {
                    document.getElementById("CP").innerHTML = "Failed";
                    console.log(responseText);
                }
            }
        );
    }
}

function updateHoliday() {
    newHolidayStart_date = "2020-09-08";
    newHolidayEnd_date = "2020-09-13";

    if (true) {
        var url = "../EmployeeInterface/php/timeManagement.php";
        var data = "target=holiday&action=upload&start_date=" + newHolidayStart_date
            + "&end_date=" + newHolidayEnd_date + "&working_id=" + "scykw1";

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    document.getElementById("UH").innerHTML = "Success";
                    deleteHoliday();
                } else {
                    document.getElementById("UH").innerHTML = "Failed";
                    console.log(responseText);
                }
            }
        );
    }
}

function deleteHoliday() {
    newHolidayStart_date = "2020-09-08";
    newHolidayEnd_date = "2020-09-13";

    var url = "../EmployeeInterface/php/timeManagement.php";
    var data = "target=holiday&action=delete&start_date=" + newHolidayStart_date
        + "&end_date=" + newHolidayEnd_date + "&working_id=" + "scykw1";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("DH").innerHTML = "Success";
                updateDeployment();
            } else {
                document.getElementById("DH").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function updateDeployment() {
    newDeploymentStart_date = "2020-09-08";
    newDeploymentEnd_date = "2020-09-13";

    if (true) {
        var url = "../EmployeeInterface/php/timeManagement.php";
        var data = "target=deployment&action=upload&start_date=" + newDeploymentStart_date
            + "&end_date=" + newDeploymentEnd_date + "&working_id=" + "scykw1";

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    document.getElementById("UD").innerHTML = "Success";
                    deleteDeployment();
                } else {
                    document.getElementById("UD").innerHTML = "Failed";
                    console.log(responseText);
                }
            }
        );
    }
}

function deleteDeployment() {
    newDeploymentStart_date = "2020-09-08";
    newDeploymentEnd_date = "2020-09-13";

    var url = "../EmployeeInterface/php/timeManagement.php";
    var data = "target=deployment&action=delete&start_date=" + newDeploymentStart_date
        + "&end_date=" + newDeploymentEnd_date + "&working_id=" + "scykw1";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("DD").innerHTML = "Success";
                accessAdminInterface();
            } else {
                document.getElementById("DD").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function accessAdminInterface() {
    var url = "../EmployeeInterface/php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                document.getElementById("AAI").innerHTML = "Success";
                finishEI();
            }
            else {
                document.getElementById("AAI").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    )
}

function logout() {
    var url = "../EmployeeInterface/php/login.php";
    var data = "action=logout";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("logout").innerHTML = "Success";
            }
            else {
                document.getElementById("logout").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    )
}

function finishEI() {
    EIFinish = true;
    if (TTFinish && AIFinish) {
        logout();
        // alert("All tests passed");
    }
}