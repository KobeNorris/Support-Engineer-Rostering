var groupList = ["CustomerNottingham", "Grow", "CustomerLondon"];
var submenuListFrame = ["CustomerNSubmenuFrame", "GrowSubmenuFrame", "CustomerLSubmenuFrame"];
var nameList = ["James Smith", "Kobe Wu", "Tang Tang", "Liam Orrill", "Gurjyot", "Nicole", "Xuanhao Li", "James Smith", "Kobe Wu", "Tang Tang", "Liam Orrill", "Gurjyot", "Nicole", "Xuanhao Li", "James Smith", "Kobe Wu", "Tang Tang", "Liam Orrill", "Gurjyot", "Nicole", "Xuanhao Li"]

setUpEmployeeList();

function setUpEmployeeList() {
    var employeeList = "";

    for (var iTemp = 0; iTemp < groupList.length; iTemp++) {
        employeeList += "<div id=\"" + groupList[iTemp] + "\" onclick=\"checkNameList(event)\">" + groupList[iTemp] + "</div>";
        employeeList += "<div id=\"" + groupList[iTemp] + "NameList\" class=\"employeeNameList\" style=\"display: none;\">"
        for (var iCountNameList = 0; iCountNameList < nameList.length; iCountNameList++) {
            employeeList += "<div>" + nameList[iCountNameList] + "</div>";
        }
        employeeList += "</div>";
    }

    document.getElementById("employeeCategory").innerHTML = employeeList;
}

function checkNameList(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var targetObj = document.getElementById(obj.id + "NameList");
    if (targetObj.style.display == 'none') {
        targetObj.style.display = 'block';
        for (var iTemp = 0; iTemp < groupList.length; iTemp++) {
            if (groupList[iTemp] != obj.id)
                document.getElementById(groupList[iTemp] + "NameList").style.display = "none";
        }
    }
    else
        targetObj.style.display = 'none';
}