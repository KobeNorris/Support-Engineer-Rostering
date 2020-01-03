var currentEvent;

function popRequestWindow(event) {
    currentEvent = event;
    document.getElementById("modal").style.display = "block";
    document.getElementById("requestWindow").style.display = "block";
}

function hideRequestWindow() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("requestWindow").style.display = "none";
}

function requestLeave() { }

function requestEdit() {
    openEditWindow(currentEvent, "timeTable");
    hideRequestWindow();
}