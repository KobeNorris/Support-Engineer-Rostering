//Whether editor want to treat this event as repeatable event
function checkRepeat() {
    var inputs = $('#repeatAttribute input');

    var targetButton = document.getElementById("enableRepeatButton");
    if (targetButton.status == 'disabled') {
        targetButton.innerHTML = 'Disable weekly repeat';
        targetButton.status = 'enabled';
        document.getElementById("repeatAttribute").style.color = 'black';
        document.getElementById("EWUpload").onclick = repeatUploadInfo;
        document.getElementById("EWDelete").onclick = repeatDeleteInfo;
        inputs.each(function () {
            this.disabled = false;
        });
    }
    else {
        targetButton.innerHTML = 'Enable weekly repeat';
        targetButton.status = 'disabled';
        document.getElementById("repeatAttribute").style.color = 'grey';
        document.getElementById("EWUpload").onclick = normalUploadInfo;
        document.getElementById("EWDelete").onclick = normalDeleteInfo;
        inputs.each(function () {
            this.disabled = true;
        });
    }
}

function openEditWindowTT(event) {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin")
                popWindowTT(event);
            else if (responseText == "employee")
                alert("No access permission ");
            else
                popLoginWindow();
        }
    )
}

function openEditWindowEC(event) {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin")
                popWindowEC(event);
            else if (responseText == "employee")
                alert("No access permission ");
            else
                popLoginWindow();
        }
    )
}

function popWindowTT(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var editWindow = document.getElementById('editWindow');

    if (obj.getAttribute('working_id') == "null")
        document.getElementById('inputWorking_id').value = "";
    else
        document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    document.getElementById('jobRoleSelection').innerHTML = obj.getAttribute('job_role');
    document.getElementById('inputStartDate').value = obj.getAttribute('start_date');
    document.getElementById('inputEndDate').value = obj.getAttribute('end_date');

    document.getElementById('modal').style.display = "block";
    editWindow.style.display = "block";
}

function popWindowEC(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var editWindow = document.getElementById('editWindow');

    document.getElementById('jobRoleSelection').innerHTML = obj.getAttribute('job_role');
    document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    document.getElementById('modal').style.display = "block";
    editWindow.style.display = "block";
}

function hideWindow() {
    document.getElementById('modal').style.display = "none";
    document.getElementById('editWindow').style.display = "none";

    document.getElementById('inputWorking_id').value = "";
    document.getElementById('inputStartDate').value = "";
    document.getElementById('inputEndDate').value = "";
}

function normalUploadInfo() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;

    var url = "./php/timeTable.php";
    var data = "action=normalInsert&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                getMonthData();
                hideWindow();
            }
            else
                alert(responseText);
        }
    );
}

function normalDeleteInfo() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;

    // console.log(block);

    var url = "./php/timeTable.php";
    var data = "action=normalDelete&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                getMonthData();
                hideWindow();
            }
            else
                alert(responseText);
        }
    );
}

function repeatUploadInfo() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;
    block['interval'] = document.getElementById("inputRepeatInterval").value;
    if (document.getElementById("yearEnd").checked == true)
        block['end'] = "Year";
    else if (document.getElementById("timeEnd").checked == true) {
        block['end'] = "Time";
        block['endValue'] = document.getElementById("inputEndTime").value;
    }
    else if (document.getElementById("dateEnd").checked == true) {
        block['end'] = "Date";
        block['endValue'] = document.getElementById("inputEndDate").value;
    }

    console.log(block);

    var url = "./php/timeTable.php";
    var data = "action=repeatInsert&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                getMonthData();
                hideWindow();
            }
            else
                // alert(responseText);
                console.log(responseText);
        }
    );
}

function repeatDeleteInfo() {
}