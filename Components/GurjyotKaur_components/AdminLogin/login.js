// Get reference to the dialog box
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the dialog box, it closes
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}