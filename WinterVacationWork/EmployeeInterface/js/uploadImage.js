var targetImage;

function upLoadImage(elementId) {
    var input = document.getElementById(elementId);
    // console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (imageObj) {
            targetImage = imageObj.target.result;
            // console.log(targetImage);
            sendImageToPHP(targetImage)
            // document.getElementById("profilePic").style.backgroundImage = imageObj.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function sendImageToPHP(targetImage) {
    var xmlhttp;

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Success")
                location.reload();
            else if (xmlhttp.responseText == "Fail 1")
                alert("Wrong file type");
            else
                alert("Database error");
        }
    }

    xmlhttp.open("POST", "./php/uploadImage.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("targetImage=" + targetImage + "&working_id=" + working_id);
}