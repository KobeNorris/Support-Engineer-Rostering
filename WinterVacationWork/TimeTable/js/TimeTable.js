var monthData;
var firstDate;
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
        month = 12;
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

function datePHPToJS(time) {
    var date = new Date(parseInt(time) * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';

    return Y + M + D;
}

function getFirstDate() {
    currentWeekDay = currentTime.getDay();
    Year = currentTime.getFullYear();
    Month = currentTime.getMonth();
    Day = currentTime.getDate();

    if (getMonthBeginWeekDay() != 0) {
        if (Month == 0) {
            Year--;
            Month = 12;
        }
        Day = getLastMonthGreatestDate(Year, Month) - getMonthBeginWeekDay() + 1;
        firstDate = Year + "-" + Month + "-" + Day;
    }
    else
        firstDate = Year + "-" + Month + "-" + "01";
}

// This function gets the data of present month's roster plan
function getMonthData() {
    getFirstDate();
    var url = "./php/timeTable.php";
    var data = "action=get&firstDate=" + firstDate;

    AJAX.post(url, data,
        function (responseText) {
            console.log(responseText);
            monthData = JSON.parse(responseText);
            buildTimeTable();
        }
    )
}