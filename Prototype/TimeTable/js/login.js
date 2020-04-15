/**
 * Login system manipulation methods colletion
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

/**
 * Pop up the login window
 */
function popLoginWindow() {
    document.getElementById("loginFrame").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

/**
 * Hide the login system
 */
function hideLoginWindow() {
    document.getElementById("loginFrame").style.display = "none";
    document.getElementById("modal").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

/**
 * Sent out the username and password and check them in backend
 */
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = "./php/login.php";
    var data = "action=login&working_id=" + username + "&password=" + password;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                hideLoginWindow();
            } else {
                popWarningWindow("Wrong username or password");
            }
        }
    )
}