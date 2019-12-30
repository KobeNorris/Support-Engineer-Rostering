var groupList = ["Customer Nottingham", "Grow", "Customer London"];
var submenuListFrame = ["CustomerNSubmenuFrame", "GrowSubmenuFrame", "CustomerLSubmenuFrame"];
var nameList;
var currentGroup = groupList[0];

function checkNameList(event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    var targetObj = document.getElementById(obj.id + "NameList");

    if (targetObj.style.display == 'none') {
        targetObj.style.display = 'block';
        for (var iTemp = 0; iTemp < groupList.length; iTemp++) {
            if (groupList[iTemp] != obj.id)
                document.getElementById(groupList[iTemp] + "NameList").style.display = "none";
            else {
                document.getElementById("tableTitle").innerHTML = groupList[iTemp];
                group_id = groupList[iTemp];
                currentGroup = groupList[iTemp];
            }
        }
    }
    else
        targetObj.style.display = 'none';

    getMonthData();
}

function getNameList() {
    var url = "./php/getInfo.php";
    var data = "action=name";

    AJAX.post(url, data,
        function (responseText) {
            nameList = JSON.parse(responseText);
            buildEmployeeList();
        }
    )
}