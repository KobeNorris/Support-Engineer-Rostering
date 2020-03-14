function requestLeaveRequest() {
    var url = "./php/login.php";
    var data = "action=match&targetWorking_id=" + targetBlock.getAttribute('working_id');

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Succeed")
                sendLeaveRequest();
            else if (responseText == "Failed")
                alert("No permission, try correct account");
            else if (responseText == "Not log in")
                popLoginWindow();
            else
                console.log(responseText);
        }
    )
}

function sendLeaveRequest() {
    // var startDate = "2019-12-31";
    // var endDate = "2020-01-06";
    // var targetWorking_id = "scykw1";
    // var jobRole = "PrimeryEngineer";

    // var name = "Kejia Wu";
    var targetStartDate = targetBlock.getAttribute('start_date');
    var targetEndDate = targetBlock.getAttribute('end_date');
    var targetWorking_id = targetBlock.getAttribute('working_id');
    var targetJobRole = targetBlock.getAttribute('job_role');

    // console.log(targetStartDate + " " + targetEndDate + " " + targetWorking_id + " " + targetJobRole);

    var name = targetBlock.innerHTML;
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
        url: './php/sendEmail.php',
        method: 'POST',
        dataType: 'json',
        data: {
            name: name,
            email: email,
            subject: subject,
            body: body
        }, success: function (response) {
            if (response.status == "success")
                alert('Email Has Been Sent!');
            else {
                alert('Please Try Again!');
                console.log(response);
            }
        }
    });
}