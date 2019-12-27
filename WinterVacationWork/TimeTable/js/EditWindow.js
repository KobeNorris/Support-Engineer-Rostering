//Whether editor want to treat this event as repeatable event
function checkRepeat() {
    var inputs = $('#repeatAttribute input');

    var targetButton = document.getElementById("enableRepeatButton");
    if (targetButton.status == 'disabled') {
        targetButton.innerHTML = 'Disable weekly repeat';
        targetButton.status = 'enabled';
        document.getElementById("repeatAttribute").style.color = 'black';
        inputs.each(function () {
            this.disabled = false;
        });
    }
    else {
        targetButton.innerHTML = 'Enable weekly repeat';
        targetButton.status = 'disabled';
        document.getElementById("repeatAttribute").style.color = 'grey';
        inputs.each(function () {
            this.disabled = true;
        });
    }
}

function getRoleIndex(targetRole) {
    var iTemp;
    for (iTemp = 0; iTemp < roleList.length; iTemp++) {
        if (roleList[iTemp] == targetRole) {
            break;
        }
    }
    return iTemp
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

    document.getElementById('jobRoleSelection')[getRoleIndex(obj.getAttribute('role'))].selected = true;
    document.getElementById('inputStartDate').value = obj.getAttribute('start');
    document.getElementById('inputEndDate').value = obj.getAttribute('end');
    document.getElementById('modal').style.display = "block";
    editWindow.style.display = "block";
}

function popWindowEC(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var editWindow = document.getElementById('editWindow');

    document.getElementById('inputWorking_id').value = obj.getAttribute('working_id');
    document.getElementById('modal').style.display = "block";
    editWindow.style.display = "block";
}

function hideWindow() {
    document.getElementById('modal').style.display = "none";
    document.getElementById('editWindow').style.display = "none";
}