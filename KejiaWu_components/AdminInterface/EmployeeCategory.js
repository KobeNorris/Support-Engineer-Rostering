var submenuList = ["CustomerN_submenu", "Grow_submenu", "CustomerL_submenu"];
var submenuListFrame = ["CustomerNSubmenuFrame", "GrowSubmenuFrame", "CustomerLSubmenuFrame"];
var CustomerN_EmployeeList = ["James Smith", "Kobe Wu", "Tang Tang", "Liam Orrill", "Gurjyot", "Nicole", "Xuanhao Li"]
setUpEmployeeList("CustomerN_submenu");
setUpEmployeeList("Grow_submenu");
setUpEmployeeList("CustomerL_submenu");

// function showEmployeeList(menuName) {
//     var state = document.getElementById(menuName).style.display;
//     if (state == 'block') {
//         document.getElementById(menuName).setAttribute('style', 'display: none;');
//     }
//     else {
//         for (var iTemp = 0; iTemp < 3; iTemp++) {
//             if (subMenuList[iTemp] == menuName) {
//                 document.getElementById(menuName).setAttribute('style', 'display: block;');
//             } else {
//                 document.getElementById(submenuListFrame[iTemp]).setAttribute('style', 'display: none;');
//             }
//         }
//     }
// }

function setUpEmployeeList(submenuListName) {
    var employeeList = "";
    for (var iTemp = 0; iTemp < CustomerN_EmployeeList.length; iTemp++) {
        employeeList += "<li onclick=\"popInfo(\'" + submenuListName + "\')\">" + CustomerN_EmployeeList[iTemp] + "</li>";
    }
    document.getElementById(submenuListName).innerHTML = employeeList;
}

function popInfo(menuName) {
    // document.getElementById(menuName).setAttribute('style', 'display: block;');
    document.getElementById(subMenuList[0]).setAttribute('style', 'display: block;');
    // alert("Yes");
}