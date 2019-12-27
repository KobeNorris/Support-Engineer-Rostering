function jumpToTimeTable() {
    window.location.href = "../TimeTable/TimeTable.html";
}

function jumpToAdminInterface() {
    var url = "./php/login.php";
    var data = "action=check";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "admin")
                window.location.href = "../AdminInterface/AdminInterface.html";
            else
                alert("No permission");
        }
    )
}

function logout() {
    var url = "./php/login.php";
    var data = "action=logout";

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success")
                jumpToTimeTable();
            else
                alert(responseText);
        }
    )
}