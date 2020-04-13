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
    document.getElementById("passwordWindow").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

/**
 * Hide the password modification window and clean the data
 */
function hidePasswordWindow() {
    document.getElementById("passwordWindow").style.display = "none";
      document.getElementById("modal").style.display = "none";
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
        alert("Blank space detected");
        flag = false;
    } else if (newPassword != checkPassword) {
        alert("Different new passwords");
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
                else
                    alert(responseText);
            }
        );
    }
}
