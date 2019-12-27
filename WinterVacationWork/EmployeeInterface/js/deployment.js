var newDeploymentStart_date;
var newDeploymentEnd_date;
var deploymentList = [];

function upLoadDeployment() {
    newDeploymentStart_date = document.getElementById("newDeploymentStart_date").value;
    newDeploymentEnd_date = document.getElementById("newDeploymentEnd_date").value;

    if (checkLoadDeployment()) {
        var url = "./php/timeManagement.php";
        var data = "target=deployment&action=upload&start_date=" + newDeploymentStart_date
            + "&end_date=" + newDeploymentEnd_date + "&working_id=" + targetWorking_id;

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    getEmployeeDeployment();
                    document.getElementById("newDeploymentStart_date").value = "";
                    document.getElementById("newDeploymentEnd_date").value = "";
                }
            }
        );
    }
}

function getEmployeeDeployment() {
    var url = "./php/timeManagement.php";
    var data = "target=deployment&action=refresh&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            deploymentList = JSON.parse(responseText);
            buildEmployeeDeployment();
        }
    );
}

function checkLoadDeployment() {
    if (newDeploymentStart_date == "" || newDeploymentEnd_date == "") {
        alert("Blank space detected");
        return false;
    } else if (newDeploymentStart_date > newDeploymentEnd_date) {
        alert("Wrong time")
        return false;
    }

    return true;
}

function deleteDeployment(event) {
    event = event ? event : window.event;
    var obj = (event.srcElement ? event.srcElement : event.target).parentElement.parentElement;

    newDeploymentStart_date = obj.children[1].innerHTML;
    newDeploymentEnd_date = obj.children[2].innerHTML;


    var url = "./php/timeManagement.php";
    var data = "target=deployment&action=delete&start_date=" + newDeploymentStart_date
        + "&end_date=" + newDeploymentEnd_date + "&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (xmlhttp.responseText == "Success")
                getEmployeeDeployment();
            else
                console.log(xmlhttp.responseText);
        }
    );
}