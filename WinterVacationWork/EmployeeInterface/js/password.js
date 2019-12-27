var oldPassword;
var newPassword;
var checkPassword;

function popPasswordWindow() {
    var url = "./php/account.php"
    var data = "action=checkPermission";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                document.getElementById("passwordWindow").style.display = "block";
            else
                alert("No permission" + responseText);
        }
    );
}

function hidePasswordWindow() {
    document.getElementById("passwordWindow").style.display = "none";
    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("checkPassword").value = "";
}

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