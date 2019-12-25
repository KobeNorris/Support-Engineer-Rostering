startLogin();

function startLogin() {
    document.getElementById("loginFrame").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

function closeLogin() {
    document.getElementById("loginFrame").style.display = "none";
    document.getElementById("modal").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success") {
                closeLogin();
            } else {
                document.getElementById("loginWarning").innerHTML = "Wrong username or password";
            }
        }
    }

    xmlhttp.open("POST", "./php/login.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("working_id=" + username + "&password=" + password);
}