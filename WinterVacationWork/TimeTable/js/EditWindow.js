//Whether editor want to treat this event as repeatable event
function checkRepeat() {
    var inputs = $('#repeatAttribute input');

    var targetButton = document.getElementById("enableRepeatButton");
    if (targetButton.status == 'disabled') {
        targetButton.innerHTML = 'Disable weekly repeat';
        targetButton.status = 'enabled';
        document.getElementById("repeatAttribute").style.color = 'black';
        document.getElementById("EWUpload").onclick = repeatUpload;
        document.getElementById("EWDelete").onclick = repeatDelete;
        inputs.each(function () {
            this.disabled = false;
        });
    }
    else {
        targetButton.innerHTML = 'Enable weekly repeat';
        targetButton.status = 'disabled';
        document.getElementById("repeatAttribute").style.color = 'grey';
        document.getElementById("EWUpload").onclick = normalUpload;
        document.getElementById("EWDelete").onclick = normalDelete;
        inputs.each(function () {
            this.disabled = true;
        });
    }
}

function openEditWindow(event, parent) {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                if (parent == "timeTable")
                    popWindowTT(event);
                else if (parent == "employeeCategory")
                    popWindowTT(event);
                else
                    alert("Wrong parent -> " + parent);
            }
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

    if (obj.getAttribute('working_id') == "null")
        document.getElementById('inputWorking_id').value = "";
    else
        document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    document.getElementById('jobRoleSelection').innerHTML = obj.getAttribute('job_role');
    document.getElementById('inputStartDate').value = obj.getAttribute('start_date');
    document.getElementById('inputEndDate').value = obj.getAttribute('end_date');
    getRepeatTask();

    document.getElementById('modal').style.display = "block";
    document.getElementById('editWindow').style.display = "block";
}

function popWindowEC(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;

    document.getElementById('jobRoleSelection').innerHTML = obj.getAttribute('job_role');
    document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    getRepeatTask();

    document.getElementById('modal').style.display = "block";
    document.getElementById('editWindow').style.display = "block";
}

function hideWindow() {
    document.getElementById('inputWorking_id').value = "";
    document.getElementById('inputStartDate').value = "";
    document.getElementById('inputEndDate').value = "";
    clearRepeatTask();

    document.getElementById('modal').style.display = "none";
    document.getElementById('editWindow').style.display = "none";
}

function normalUpload() {
    var block = createNormalBlock();
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

function normalDelete() {
    var block = createNormalBlock();
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

function createNormalBlock() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;

    return block;
}

function repeatUpload() {
    var block = createRepeatBlock();
    var url = "./php/timeTable.php";
    var data = "action=repeatInsert&block=" + JSON.stringify(block);

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

function repeatDelete() {
    var block = createRepeatBlock();
    var url = "./php/timeTable.php";
    var data = "action=repeatDelete&block=" + JSON.stringify(block);

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

function createRepeatBlock() {
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
        block['endValue'] = document.getElementById("inputTimeEnd").value;
    }
    else if (document.getElementById("dateEnd").checked == true) {
        block['end'] = "Date";
        block['endValue'] = document.getElementById("inputDateEnd").value;
    }

    return block;
}

function getRepeatTask() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;
    block['interval'] = "";
    block['end'] = "";
    block['endValue'] = "";

    var url = "./php/timeTable.php";
    var data = "action=getRepeatTask&block=" + JSON.stringify(block);

    AJAX.post(url, data,
        function (responseText) {
            if (responseText != "") {
                block = JSON.parse(responseText);
                document.getElementById("inputStartDate").value = block['start_date'];
                document.getElementById("inputEndDate").value = block['end_date'];
                document.getElementById("inputRepeatInterval").value = block['interval'];
                document.getElementById("timeEnd").checked = true;
                document.getElementById("inputTimeEnd").value = block['endValue'];
            }
        }
    );
}

function clearRepeatTask() {
    document.getElementById("inputRepeatInterval").value = "";
    document.getElementById("yearEnd").checked = true;
    document.getElementById("inputTimeEnd").value = "";
    document.getElementById("inputDateEnd").value = "";
}