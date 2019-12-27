function popCreateEmployeeWindow() {
    document.getElementById("createEmployeeWindow").style.display = "block";
}

function hideCreateEmployeeWindow() {
    document.getElementById("createEmployeeWindow").style.display = "none";
    document.getElementById("newWorking_id").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("checkPassword").value = "";
}