var targetWorking_id = "scykw1";
var employeeProfile;

refreshEmployePicture();
refreshEmployeProfile();

function refreshEmployePicture() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "default")
                document.getElementById("profilePic").style.backgroundImage = "url(./Image/default.png)"
            else
                document.getElementById("profilePic").style.backgroundImage = "url(./Image/" + targetWorking_id + "." + xmlhttp.responseText + ")";
        }
    }

    xmlhttp.open("POST", "./php/getEmployeePicture.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("targetWorking_id=" + targetWorking_id);
}

function refreshEmployeProfile() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // console.log(xmlhttp.responseText);
            employeeProfile = JSON.parse(xmlhttp.responseText);
            document.getElementById("name").value = employeeProfile[0]["name"];
            document.getElementById("working_id").value = employeeProfile[0]["working_id"];
            document.getElementById("account_type").value = employeeProfile[0]["account_type"];
            document.getElementById("slack_id").value = employeeProfile[0]["slack_id"];
            document.getElementById("group_id").value = employeeProfile[0]["group_id"];
            document.getElementById("email").value = employeeProfile[0]["email"];
            document.getElementById("phone_number").value = employeeProfile[0]["phone_number"];
            if (employeeProfile[0]["status"])
                document.getElementById("status").checked = true;
            else
                document.getElementById("status").checked = false;
        }
    }

    xmlhttp.open("POST", "./php/getEmployeeProfile.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("targetWorking_id=" + targetWorking_id);
}

function editEmployeeProfile() {
    document.getElementById("name").disabled = false;
    document.getElementById("slack_id").disabled = false;
    document.getElementById("group_id").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("phone_number").disabled = false;
    document.getElementById("profileEditButton").innerHTML = "<button onclick=\"updateEmployeeProfile()\">Update</button>";

    if (true) {
        document.getElementById("status").disabled = false;
        document.getElementById("targetWorking_id").disabled = false;
        document.getElementById("account_type").disabled = false;
    }

}

function updateEmployeeProfile() {
    employeeProfile[0]["name"] = document.getElementById("name").value;
    employeeProfile[0]["slack_id"] = document.getElementById("slack_id").value;
    employeeProfile[0]["group_id"] = document.getElementById("group_id").value;
    employeeProfile[0]["email"] = document.getElementById("email").value;
    employeeProfile[0]["phone_number"] = document.getElementById("phone_number").value;
    if (true) {
        employeeProfile[0]["targetWorking_id"] = document.getElementById("targetWorking_id").value;
        employeeProfile[0]["account_type"] = document.getElementById("account_type").value;
        employeeProfile[0]["status"] = (document.getElementById("status").checked);
    }

    sendEmployeeProfile();

    document.getElementById("name").disabled = true;
    document.getElementById("slack_id").disabled = true;
    document.getElementById("group_id").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("phone_number").disabled = true;
    document.getElementById("status").disabled = true;
    document.getElementById("targetWorking_id").disabled = true;
    document.getElementById("account_type").disabled = true;

    document.getElementById("profileEditButton").innerHTML = "<button onclick=\"editEmployeeProfile()\">Edit</button>";
}

function sendEmployeeProfile() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success")
                refreshEmployeProfile();
        }
    }

    xmlhttp.open("POST", "./php/updateEmployeeProfile.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("employeeProfile=" + JSON.stringify(employeeProfile) + "&&targetWorking_id=" + targetWorking_id);
}