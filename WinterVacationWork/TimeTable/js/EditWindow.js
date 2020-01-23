/**
 * Edit window related methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

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

/**
 * Handle the open edit window request:
 *      1. From time table: Load target period and working id if
 *      possible;
 *      2. From employee category: Load target employee's working id
 *
 * @param {*} event 
 * @param {*} parent 
 */
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

/**
 * Pop up edit window from time table
 * @param {*} event 
 */
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

/**
 * Pop up edit window from employee category
 * @param {*} event 
 */
function popWindowEC(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;

    document.getElementById('jobRoleSelection').innerHTML = obj.getAttribute('job_role');
    document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    getRepeatTask();

    document.getElementById('modal').style.display = "block";
    document.getElementById('editWindow').style.display = "block";
}

/**
 * Hide the edit window and clean current value
 */
function hideWindow() {
    document.getElementById('inputWorking_id').value = "";
    document.getElementById('inputStartDate').value = "";
    document.getElementById('inputEndDate').value = "";
    cleanRepeatTask();

    document.getElementById('modal').style.display = "none";
    document.getElementById('editWindow').style.display = "none";
}

/**
 * Single schedule period upload
 */
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

/**
 * Single schedule period delete
 */
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

/**
 * Create single schedule data block
 */
function createNormalBlock() {
    var block = new Object();
    block['group_id'] = group_id;
    block['job_role'] = document.getElementById("jobRoleSelection").innerHTML;
    block['working_id'] = document.getElementById("inputWorking_id").value;
    block['start_date'] = document.getElementById("inputStartDate").value;
    block['end_date'] = document.getElementById("inputEndDate").value;

    return block;
}

/**
 * Repeatable schedule period upload
 */
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

/**
 * Repeatable schedule period delete
 */
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

/**
 * Create repeatable schedule data block
 */
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

/**
 * Get the data of current repeatable schedule task if it exists
 */
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

/**
 * Clean the repeatable task's data kept in the edit window
 */
function cleanRepeatTask() {
    document.getElementById("inputRepeatInterval").value = "";
    document.getElementById("yearEnd").checked = true;
    document.getElementById("inputTimeEnd").value = "";
    document.getElementById("inputDateEnd").value = "";
}