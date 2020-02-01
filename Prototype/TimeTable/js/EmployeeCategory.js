/**
 * Employee category manipulation methods collection
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var groupList = ["Customer Nottingham", "Grow", "Customer London"];
var submenuListFrame = ["CustomerNSubmenuFrame", "GrowSubmenuFrame", "CustomerLSubmenuFrame"];
var nameList;
var currentGroup = groupList[0];

/**
 * Check the status of each group's name list,
 * ensuer only one name list could be display simultaneously
 * @param {*} event 
 */
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

/**
 * Get current employee name list
 */
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