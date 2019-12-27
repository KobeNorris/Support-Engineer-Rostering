function popLoginWindow() {
    document.getElementById("loginFrame").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

function hideLoginWindow() {
    document.getElementById("loginFrame").style.display = "none";
    document.getElementById("modal").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

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
                document.getElementById("loginWarning").innerHTML = "Wrong username or password";
            }
        }
    )
}