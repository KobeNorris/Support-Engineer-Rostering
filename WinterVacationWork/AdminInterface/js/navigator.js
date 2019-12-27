function jumpToTimeTable() {
    window.location.href = "../TimeTable/TimeTable.html";
}

function jumpToTargetProfile(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;
    var targetWorking_id = obj.children[2].innerHTML;

    var url = "./php/setTarget.php";
    var data = "target=other&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                window.location.href = "../EmployeeInterface/employeeInterface.html";
            else
                alert(responseText);
        }
    )
}