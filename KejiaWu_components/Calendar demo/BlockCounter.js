var numberOfPastDay;
var numberOfComingDay;
var blockClass;

refreshBlockCounter()

function refreshBlockCounter() {
    for (var iCountWeek = 0; iCountWeek < weekCounter; iCountWeek++) {
        for (var iCountDay = 0; iCountDay < 7; iCountDay++) {
            numberOfPastDay = 0;
            numberOfComingDay = 0;
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