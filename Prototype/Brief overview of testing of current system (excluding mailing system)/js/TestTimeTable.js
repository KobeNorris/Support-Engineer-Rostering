/**
 * Timetable Page
 */
var TTFinish, EIFinish, AIFinish;

function runTest() {

    TTFinish = false;
    EIFinish = false;
    AIFinish = false;

    document.getElementById("login").innerHTML = "";
    document.getElementById("INT").innerHTML = "";
    document.getElementById("DNT").innerHTML = "";
    document.getElementById("IRT").innerHTML = "";
    document.getElementById("DRT").innerHTML = "";
    document.getElementById("RL").innerHTML = "";
    document.getElementById("SM").innerHTML = "";
    document.getElementById("AEI").innerHTML = "";
    document.getElementById("AP").innerHTML = "";
    document.getElementById("UP").innerHTML = "";
    document.getElementById("CP").innerHTML = "";
    document.getElementById("UH").innerHTML = "";
    document.getElementById("DH").innerHTML = "";
    document.getElementById("UD").innerHTML = "";
    document.getElementById("DD").innerHTML = "";
    document.getElementById("AAI").innerHTML = "";
    document.getElementById("logout").innerHTML = "";
    document.getElementById("CE").innerHTML = "";
    document.getElementById("DE").innerHTML = "";
    document.getElementById("AEC").innerHTML = "";
    document.getElementById("AEI2").innerHTML = "";
    document.getElementById("ATI").innerHTML = "";
    document.getElementById("GR").innerHTML = "";

    login();
}

function login() {

    var username = "scykw1";
    var password = "1234";

    var url = "../TimeTable/php/login.php";
    var data = "action=login&working_id=" + username + "&password=" + password;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("login").innerHTML = "Success";
                insertNormalTask();
                accessProfile();
                createEmployee();
            } else {
                document.getElementById("login").innerHTML = "Failed";
            }
        }
    )
}

function createNormalBlock() {
    var block = new Object();
    block['group_id'] = "Customer Nottingham";
    block['job_role'] = "PrimaryEngineer";
    block['working_id'] = "scykw1";
    block['start_date'] = "2020-04-28";
    block['end_date'] = "2020-05-04";

    return block;
}

function insertNormalTask() {
    var block = createNormalBlock();
    var url = "../TimeTable/php/timeTable.php";
    var data = "action=normalInsert&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("INT").innerHTML = "Success";
                deleteNormalTask();
            }
            else {
                document.getElementById("INT").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function deleteNormalTask() {
    var block = createNormalBlock();
    var url = "../TimeTable/php/timeTable.php";
    var data = "action=normalDelete&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("DNT").innerHTML = "Success";
                insertRepeatTask();
            }
            else {
                document.getElementById("DNT").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function createRepeatBlock() {
    var block = new Object();
    block['group_id'] = "Customer Nottingham";
    block['job_role'] = "PrimaryEngineer";
    block['working_id'] = "scykw1";
    block['start_date'] = "2020-04-28";
    block['end_date'] = "2020-05-04";
    block['interval'] = "2";
    block['end'] = "Time";
    block['endValue'] = "27";

    return block;
}

function insertRepeatTask() {
    var block = createRepeatBlock();
    var url = "../TimeTable/php/timeTable.php";
    var data = "action=repeatInsert&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("IRT").innerHTML = "Success";
                deleteRepeatTask();
            }
            else {
                document.getElementById("IRT").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function deleteRepeatTask() {
    var block = createRepeatBlock();
    var url = "../TimeTable/php/timeTable.php";
    var data = "action=repeatDelete&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("DRT").innerHTML = "Success";
                requestLeave();
            }
            else {
                document.getElementById("DRT").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    );
}

function requestLeave() {
    var url = "../TimeTable/php/login.php";
    var data = "action=match&targetWorking_id=" + "scykw1";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Succeed") {
                document.getElementById("RL").innerHTML = "Success";
                sendLeaveRequest();
            }
            else {
                document.getElementById("RL").innerHTML = "Failed";
                console.log(responseText);
            }
        }
    )
}

function sendLeaveRequest() {
    var targetStartDate = "Testing";
    var targetEndDate = "Testing";
    var targetWorking_id = "Testing";
    var targetJobRole = "Testing";

    var name = "Testing";
    var email = "null";
    var subject = "Leave request from -" + name;
    var body = name + " requests a leave from " + targetStartDate + " to " + targetEndDate
        + "<br> Working ID: " + targetWorking_id + "<br> Job role: " + targetJobRole;

    var url = "./php/sendEmail.php";
    var data = "name=" + name +
        "&email=" + email +
        "&subject=" + subject +
        "&body=" + body;

    $.ajax({
        url: '../TimeTable/php/sendEmail.php',
        method: 'POST',
        dataType: 'json',
        data: {
            name: name,
            email: email,
            subject: subject,
            body: body
        }, success: function (response) {
            if (response.status == "success") {
                document.getElementById("SM").innerHTML = "Success";
                jumpToProfile();
            }
            else {
                document.getElementById("SM").innerHTML = "Failed";
                console.log(response);
            }
        }
    });
}

function jumpToProfile() {
    var url = "../TimeTable/php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin" || responseText == "employee") {
                document.getElementById("AEI").innerHTML = "Success";
                finishTT();
            }
            else {
                document.getElementById("AEI").innerHTML = "Failed";
                console.log(response);
            }
        }
    )
}

function finishTT() {
    TTFinish = true;
    if (EIFinish && AIFinish) {
        logout();
        // alert("All tests passed");
    }
}