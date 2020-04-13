function sendRequest() {
    var startDate = "2019-12-31";
    var endDate = "2020-01-06";
    var targetWorking_id = "scykw1";
    var jobRole = "PrimeryEngineer";

    var name = "Kejia Wu";
    var email = "null";
    var subject = "Leave request from " + name;
    var body = name + " requests a leave from " + startDate + " to " + endDate
        + "<br> Working ID: " + targetWorking_id + "<br> Job role: " + jobRole;

    $.ajax({
        url: 'sendEmail.php',
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

function isNotEmpty(caller) {
    if (caller.val() == "") {
        caller.css('border', '1px solid red');
        return false;
    } else
        caller.css('border', '');

    return true;
}