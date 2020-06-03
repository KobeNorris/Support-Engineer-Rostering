setStartDateMin();

//set new holiday/deployment to have a start date of at least the current date
function setStartDateMin(dateToChange) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById(dateToChange).setAttribute("min", today);
}

//set new holiday/deployment's end date to later than the value the start date is set to
function setEndDateMin(val, dateToChange) {
    var date = val.split("-");
    day = date[2];
    month = date[1];
    year = date[0];
    startDateVal = year +"-"+ month +"-"+ day;
    document.getElementById(dateToChange).setAttribute("min", startDateVal);
} 