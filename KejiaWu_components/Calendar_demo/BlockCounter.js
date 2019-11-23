var numberOfPastDay;
var numberOfComingDay;
var blockClass;
var weekCounter = 0;

refreshBlockCounter()

function refreshBlockCounter() {
    numberOfPastDay = 0;
    numberOfComingDay = 0;
    for (var iCountWeek = 0; iCountWeek < weekCounter; iCountWeek++) {
        for (var iCountDay = 0; iCountDay < 7; iCountDay++) {
            blockClass = document.getElementById(iCountWeek + "-" + iCountDay).className;
            switch (blockClass) {
                case "passedTableBlock":
                    numberOfPastDay++;
                    break;

                case "emptyTimeTableBlock":
                    numberOfComingDay++;
                    break;

                default:
                    break;
            }
        }
    }
    document.getElementById("pastday").innerHTML = numberOfPastDay;
    document.getElementById("comingday").innerHTML = numberOfComingDay;
}