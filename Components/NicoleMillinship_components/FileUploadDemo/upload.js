// This function takes the file the user uploaded when clicking 'browse', and sets it as the profile picture preview image
function readURL() {
    var input = document.getElementById("fileToUpload");
    //If there is a file selected 
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#profilePicture').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}