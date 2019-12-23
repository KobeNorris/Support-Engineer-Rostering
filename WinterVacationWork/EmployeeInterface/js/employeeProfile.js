var working_id = "scykw1";
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
                document.getElementById("profilePic").style.backgroundImage = "url(./Image/" + working_id + "." + xmlhttp.responseText + ")";
        }
    }

    xmlhttp.open("POST", "./php/getEmployeePicture.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("working_id=" + working_id);
}

function refreshEmployeProfile() {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            employeeProfile = JSON.parse(xmlhttp.responseText);
            document.getElementById("name").value = employeeProfile[0]["name"];
            document.getElementById("working_id").value = working_id;
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
    xmlhttp.send("working_id=" + working_id);
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
        document.getElementById("working_id").disabled = false;
    }

}

function updateEmployeeProfile() {
    employeeProfile[0]["name"] = document.getElementById("name").value;
    employeeProfile[0]["slack_id"] = document.getElementById("slack_id").value;
    employeeProfile[0]["group_id"] = document.getElementById("group_id").value;
    employeeProfile[0]["email"] = document.getElementById("email").value;
    employeeProfile[0]["phone_number"] = document.getElementById("phone_number").value;
    if (true) {
        employeeProfile[0]["working_id"] = document.getElementById("working_id").value;
        employeeProfile[0]["status"] = (document.getElementById("status").checked);
    }

    sendEmployeeProfile();

    document.getElementById("name").disabled = true;
    document.getElementById("slack_id").disabled = true;
    document.getElementById("group_id").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("phone_number").disabled = true;
    document.getElementById("status").disabled = true;
    document.getElementById("working_id").disabled = true;

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
    xmlhttp.send("employeeProfile=" + JSON.stringify(employeeProfile) + "&&working_id=" + working_id);
}