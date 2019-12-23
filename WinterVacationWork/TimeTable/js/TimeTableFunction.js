var currentWeekDay;

// This function delivers the greatest day within present month
function getMonthGreatestDate(year, month) {
    var d = new Date(year, month + 1, 0);
    return d.getDate();
}

// This function delivers the greatest day within last month
function getLastMonthGreatestDate(year, month) {
    if (month == 0) {
        year--;
        month = 11;
    }
    var d = new Date(year, month, 0);
    return d.getDate();
}

//This function get the weekday of the first day of present month
function getMonthBeginWeekDay() {
    var temp = currentWeekDay + (7 - currentDay % 7) + 1;
    if (temp > 6) {
        temp -= 7;
    }

    return temp;
}

function editTimeTable(event) {
    document.getElementById("")
}

// // This function gets the data of present month's roster plan
// function getMonthData() {
//     var xmlhttp;
//     var monthData;

//     if (window.XMLHttpRequest)
//         xmlhttp = new XMLHttpRequest();
//     else
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     xmlhttp.open("GET", "./TimeTable.php", true);
//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             monthData = eval(xmlhttp.responseText);
//             updateRoster(monthData);
//         }
//     }
//     // xmlhttp.open("GET", "./TimeTable.php", true);
//     // xmlhttp.open("POST", "./TimeTable.php", true);
//     // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send();
// }

// //This function will update present roster plan to the backend 
// function updateRoster(monthData) {
//     // console.log(sundayList);
//     for (var weekIndex = 0; weekIndex < monthData.length; monthData++) {

//     }
// }