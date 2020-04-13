/**
 * Password related methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var oldPassword;
var newPassword;
var checkPassword;

/**
 * Check the log in state and pop up the password modification window
 */
function popPasswordWindow() {
<<<<<<< HEAD
    document.getElementById("passwordWindow").style.display = "block";
    document.getElementById("modal").style.display = "block";
=======
    var url = "./php/account.php"
    var data = "action=checkPermission";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                document.getElementById("changePasswordWindow").style.display = "block";
            else {
                popWarningWindow("No permission" + responseText);
                // alert("No permission" + responseText);
            }
        }
    );
>>>>>>> a44b64766782f68bad8ff7f53457cf490c20bb00
}

/**
 * Hide the password modification window and clean the data
 */
function hidePasswordWindow() {
<<<<<<< HEAD
    document.getElementById("passwordWindow").style.display = "none";
      document.getElementById("modal").style.display = "none";
=======
    document.getElementById("changePasswordWindow").style.display = "none";
>>>>>>> a44b64766782f68bad8ff7f53457cf490c20bb00
    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("checkPassword").value = "";
}

/**
 * Check blank space and double correctness
 */
function checkNewPassword() {
    var flag = true;

    oldPassword = document.getElementById("oldPassword").value;
    newPassword = document.getElementById("newPassword").value;
    checkPassword = document.getElementById("checkPassword").value;

    if (oldPassword == "" || newPassword == "" || checkPassword == "") {
        popWarningWindow("Blank space detected");
        // alert("Blank space detected");
        flag = false;
    } else if (newPassword != checkPassword) {
        popWarningWindow("Different new passwords");
        // alert("Different new passwords");
        flag = false;
    }

    return flag;
}

/**
 * Update the old password with new password
 */
function updatePassword() {

    if (checkNewPassword()) {
        var url = "./php/account.php"
        var data = "action=changePassword&oldPassword=" + oldPassword
            + "&newPassword=" + newPassword;

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success")
                    hidePasswordWindow();
                else {
                    popWarningWindow(responseText);
                    // alert(responseText);
                }
            }
        );
    }
}
