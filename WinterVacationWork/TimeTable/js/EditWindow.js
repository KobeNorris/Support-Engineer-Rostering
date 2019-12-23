checkRepeat();

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

function popWindow(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var editWindow = document.getElementById('editWindow');
    document.getElementById('jobRoleSelection')[getRoleIndex(obj.getAttribute('role'))].selected = true;
    document.getElementById('inputStartDate').value = obj.getAttribute('start');
    document.getElementById('inputEndDate').value = obj.getAttribute('end');
    document.getElementById('modal').style.display = "block";
    editWindow.style.display = "block";
}

function hideWindow() {
    document.getElementById('modal').style.display = "none";
    document.getElementById('editWindow').style.display = "none";
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