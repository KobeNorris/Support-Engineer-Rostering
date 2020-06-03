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
        getRepeatTask();
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
        if (targetBlock != null)
            getNormalTask();
    }
}

/**
 * Handle the open edit window request:
 *      1. From time table: Load target period and working id if
 *      possible;
 *      2. From employee category: Load target employee's working id
 *
<<<<<<< HEAD
 * @param {*} event 
 * @param {*} parent 
 */
function openEditWindow(event, parent) {
=======
 */
function openEditWindow() {
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                popWindow();
<<<<<<< HEAD
                // if (parent == "timeTable")
                //     popWindowTT(event);
                // else if (parent == "employeeCategory")
                //     popWindowEC(event);
                // else
                //     alert("Wrong parent -> " + parent);
            }
            else if (responseText == "employee")
                alert("No access permission ");
            else
                popLoginWindow();
=======
            }
            else if (responseText == "employee") {
                popWarningWindow("No access permission");
                // alert("No access permission ");
            }
            else if (responseText == "Not log in")
                popLoginWindow();
            else
                console.log(responseText);
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
        }
    )
}

function popWindow() {
    if (targetBlock.getAttribute('working_id') == "null")
        document.getElementById('inputWorking_id').value = "";
    else
        document.getElementById('inputWorking_id').value = targetBlock.getAttribute('working_id');
    document.getElementById('jobRoleSelection').innerHTML = targetBlock.getAttribute('job_role');
    document.getElementById('inputStartDate').value = targetBlock.getAttribute('start_date');
    document.getElementById('inputEndDate').value = targetBlock.getAttribute('end_date');
<<<<<<< HEAD
    // if (document.getElementById('inputWorking_id').innerHTML == "Disable weekly repeat") {
    //     alert("Hello");
    // }
    // // getRepeatTask();
=======
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e

    document.getElementById('modal').style.display = "block";
    document.getElementById('editWindow').style.display = "block";
}

/**
 * Pop up edit window from time table
 * @param {*} event 
 */
function popWindowTT() {
    if (targetBlock.getAttribute('working_id') == "null")
        document.getElementById('inputWorking_id').value = "";
    else
        document.getElementById('inputWorking_id').value = targetBlock.getAttribute('working_id');
    document.getElementById('jobRoleSelection').innerHTML = targetBlock.getAttribute('job_role');
    document.getElementById('inputStartDate').value = targetBlock.getAttribute('start_date');
    document.getElementById('inputEndDate').value = targetBlock.getAttribute('end_date');
<<<<<<< HEAD
    // if (document.getElementById('inputWorking_id').innerHTML == "Disable weekly repeat") {
    //     alert("Hello");
    // }
    // // getRepeatTask();
=======
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e

    document.getElementById('modal').style.display = "block";
    document.getElementById('editWindow').style.display = "block";
}

/**
 * Pop up edit window from employee category
 * @param {*} event 
 */
function popWindowEC(event) {
    console.log("From EC");
    document.getElementById('jobRoleSelection').innerHTML = targetBlock.getAttribute('job_role');
    document.getElementById('inputWorking_id').value = targetBlock.getAttribute('working_id');

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
 * Inser single schedule period info into the edit window
 */
function getNormalTask() {
<<<<<<< HEAD
    document.getElementById('inputWorking_id').value = targetBlock.getAttribute('working_id');
=======
    if (targetBlock.getAttribute('working_id') != "")
        document.getElementById('inputWorking_id').value = targetBlock.getAttribute('working_id');
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
    document.getElementById('inputStartDate').value = targetBlock.getAttribute('start_date');
    document.getElementById('inputEndDate').value = targetBlock.getAttribute('end_date');
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
<<<<<<< HEAD
            else
                alert(responseText);
=======
            else {
                popWarningWindow(responseText);
                // alert(responseText);
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
            else
                alert(responseText);
=======
            else {
                popWarningWindow(responseText);
                // alert(responseText);
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
            else
                alert(responseText);
=======
            else {
                popWarningWindow(responseText);
                // alert(responseText);
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
            else
                alert(responseText);
=======
            else {
                popWarningWindow(responseText);
                // alert(responseText);
            }
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
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
<<<<<<< HEAD
    document.getElementById("inputRepeatInterval").value = "";
    document.getElementById("yearEnd").checked = true;
    document.getElementById("inputTimeEnd").value = "";
    document.getElementById("inputDateEnd").value = "";
=======
    // document.getElementById("inputRepeatInterval").value = "";
    // document.getElementById("yearEnd").checked = true;
    // document.getElementById("inputTimeEnd").value = "";
    // document.getElementById("inputDateEnd").value = "";
    var inputs = $('#repeatAttribute input');
    var targetButton = document.getElementById("enableRepeatButton");

    targetButton.innerHTML = 'Enable weekly repeat';
    targetButton.status = 'disabled';
    document.getElementById("repeatAttribute").style.color = 'grey';
    document.getElementById("EWUpload").onclick = normalUpload;
    document.getElementById("EWDelete").onclick = normalDelete;
    inputs.each(function () {
        this.disabled = true;
    });
>>>>>>> c964a5366fef41695c60fbdd7871ddf2d2de8c1e
}