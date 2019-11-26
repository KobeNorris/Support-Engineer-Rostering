var day, month, year;

function checkDates() {
    var date = $('#startDate').val().split("-");
    alert("here");
    day = date[2];
    month = date[1];
    year = date[0];
    alert(day + month + year);
    startDateVal = year +"-"+ month +"-"+ day;
    document.getElementById("endDate").setAttribute("min", startDateVal);
}

function triggerClick(){
    document.querySelector('#profileImage').click();
    
}

function displayImage(e){
    if (e.files[0]){
        var reader = new FileReader();
        reader.onload = function(e){
            document.querySelector('#profileDisplay').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(e.files[0]);
    }
}

function editName() {
    document.getElementById('num').readOnly=false;
};