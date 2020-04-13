/**
 * Employee profile related methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var targetWorking_id;
var employeeProfile;

/**
 * Get the employee profile data from database and refresh current page's employee profile
 * according to the data
 */
function refreshEmployeProfile() {
    var url = "./php/employeeProfile.php";
    var data = "action=get&targetWorking_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            employeeProfile = JSON.parse(responseText);
            document.getElementById("name").value = employeeProfile[0]["name"];
            document.getElementById("working_id").value = employeeProfile[0]["working_id"];
            document.getElementById("account_type").value = employeeProfile[0]["account_type"];
            document.getElementById(employeeProfile[0]["job_role"] + "Option").setAttribute("selected", "true");
            document.getElementById("slack_id").value = employeeProfile[0]["slack_id"];
            document.getElementById("group_id").value = employeeProfile[0]["group_id"];
            document.getElementById("email").value = employeeProfile[0]["email"];
            document.getElementById("phone_number").value = employeeProfile[0]["phone_number"];

            if (employeeProfile[0]["status"] == 1)
                document.getElementById("status").checked = true;
            else
                document.getElementById("status").checked = false;
        }
    );
}

/**
 * Check user's login status and release corresponding modification accesses
 */
function editEmployeeProfile() {
    document.getElementById("name").disabled = false;
    document.getElementById("slack_id").disabled = false;
    document.getElementById("group_id").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("phone_number").disabled = false;
    document.getElementById("profileEditButton").innerHTML = "<button class=\"btn btn-secondary\" onclick=\"updateEmployeeProfile()\">Update</button>";

    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                document.getElementById("status").disabled = false;
                document.getElementById("working_id").disabled = false;
                document.getElementById("account_type").disabled = false;
                document.getElementById("job_role").disabled = false;
            }
            else if (responseText == "employee") {
                //TODO employee special settings ?
            }
            else
                console.log(responseText);
        }
    );
}

/**
 * Update the employee data package according to user's login status
 */
function updateEmployeeProfile() {
    employeeProfile[0]["name"] = document.getElementById("name").value;
    employeeProfile[0]["slack_id"] = document.getElementById("slack_id").value;
    employeeProfile[0]["group_id"] = document.getElementById("group_id").value;
    employeeProfile[0]["email"] = document.getElementById("email").value;
    employeeProfile[0]["phone_number"] = document.getElementById("phone_number").value;

    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin") {
                employeeProfile[0]["working_id"] = document.getElementById("working_id").value;

                if (document.getElementById("status").checked)
                    employeeProfile[0]["status"] = 1;
                else
                    employeeProfile[0]["status"] = 0;

                employeeProfile[0]["account_type"] = document.getElementById("account_type").value;
                employeeProfile[0]["job_role"] = document.getElementById("job_role").value;
                console.log(employeeProfile[0]);
                sendEmployeeProfile();
            }
            else if (responseText == "employee") {
                //TODO employee special settings ?
                sendEmployeeProfile();
            }
            else
                console.log(responseText);
        }
    );

    document.getElementById("name").disabled = true;
    document.getElementById("slack_id").disabled = true;
    document.getElementById("group_id").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("phone_number").disabled = true;
    document.getElementById("status").disabled = true;
    document.getElementById("working_id").disabled = true;
    document.getElementById("account_type").disabled = true;
    document.getElementById("job_role").disabled = true;

    document.getElementById("profileEditButton").innerHTML = "<button class=\"btn btn-secondary\" onclick=\"editEmployeeProfile()\">Edit</button>";
}

/**
 * Update current employee data package to the database
 */
function sendEmployeeProfile() {
    var url = "./php/employeeProfile.php";
    var data = "action=update&employeeProfile=" + JSON.stringify(employeeProfile)
        + "&&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                refreshEmployeProfile();
            else
                console.log(responseText);
        }
    );
}

/**
 * Image process
 */
var targetImage;

/**
 * Upload taget image with corresponding image id
 *
 * @param {*} elementId Target image id
 */
function upLoadImage(elementId) {
    var input = document.getElementById(elementId);
    // console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (imageObj) {
            targetImage = imageObj.target.result;
            sendImageToPHP(targetImage)
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Refresh current page's employee picture
 */
function refreshEmployePicture() {
    var url = "./php/avatar.php";
    var data = "action=search&working_id=" + targetWorking_id;
    var picture = document.getElementById("profilePic");

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "default")
                picture.style.backgroundImage = "url(./Image/default.png)"
            else
                picture.style.backgroundImage = "url(./Image/" + targetWorking_id + "." + responseText + ")";
        }
    );
}

/**
 * Upload target image to the database
 *
 * @param {*} targetImage Target image
 */
function sendImageToPHP(targetImage) {
    var url = "./php/avatar.php";
    var data = "action=upload&targetImage=" + targetImage + "&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                location.reload();
            else if (responseText == "Fail 1")
                alert("Wrong file type");
            else
                alert(responseText);
        }
    );
}
